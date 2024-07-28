const express = require("express");
const router = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

router.get("/me", async (req, res) => {
  res.send(await User.findById(req.user._id).select("-password"));
});

router.post("/", async (req, res) => {
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

module.exports = router;
