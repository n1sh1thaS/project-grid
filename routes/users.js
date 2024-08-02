const express = require("express");
const router = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");

router.get("/getUser", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User does not exist");
  const id = req.user._id;
  res.send({ user, id });
});

//for testing
router.get("/:id", async (req, res) => {
  res.send(await User.findById(req.params.id).select("-password"));
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(404).send("User already registered");

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateJWT();
    res.header("x-auth-token", token).send({ token, user });
  } catch (ex) {
    console.log(ex.message);
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.email });
  if (!user) return res.status(404).send("User not registered");
  const validPassword = await bcrypt.compare(req.password, user.password);
  if (!validPassword) return res.status(404).send("Incorrect password");
  const token = user.generateJWT();
  res.header("x-auth-token", token).send({ token, user });
});

module.exports = router;
