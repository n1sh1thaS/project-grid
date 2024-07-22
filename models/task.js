const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["to do", "in progress", "done"],
    default: "to do",
  },
});

const Task = mongoose.model("Task", taskSchema);

function validate(task) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string(),
  };
  return Joi.validate(task, schema);
}

module.exports.Task = Task;
module.exports.validate = validate;
