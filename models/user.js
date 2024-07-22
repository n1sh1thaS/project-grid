const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 1, unique: true },
  email: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true, minlength: 5 },
});

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = {
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validate;
