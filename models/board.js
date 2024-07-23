const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const boardSchema = new mongoose.Schema({
  userId: { type: String },
  boardName: { type: String, minlength: 1, default: "Untitled Board" },
  toDo: { type: [String], default: [] },
  inProgress: { type: [String], default: [] },
  done: { type: [String], default: [] },
});

const Board = mongoose.model("Board", boardSchema);

function validate(board) {
  const schema = new Joi.object({
    userId: Joi.objectId().required(),
    boardName: Joi.string().min(1),
  });
  return schema.validate(board);
}

module.exports.Board = Board;
module.exports.validate = validate;
