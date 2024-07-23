const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 1 },
  email: { type: String, required: true, minlength: 1, unique: true },
  password: { type: String, required: true, minlength: 5 },
  boardIds: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = new Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;
