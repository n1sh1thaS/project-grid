const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const taskSchema = new mongoose.Schema({
  boardId: { type: String, required: true },
  title: { type: String, required: true, minlength: 1 },
  description: { type: String },
  status: {
    type: String,
    enum: ["toDo", "inProgress", "done"],
    default: "toDo",
  },
});

const Task = mongoose.model("Task", taskSchema);

function validate(task) {
  const schema = new Joi.object({
    boardId: Joi.objectId().required(),
    title: Joi.string().min(1).required(),
    description: Joi.string(),
    status: Joi.string().valid("toDo", "inProgress", "done"),
  });
  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.validate = validate;
