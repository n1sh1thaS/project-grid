const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const boardSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: { type: String },
    }),
  },
  boardName: { type: String, required: true },
  toDo: { type: [String] },
  inProgress: { type: [String] },
  done: { type: [String] },
});

function validate(board) {
  const schema = {
    userId: Joi.objectId().required(),
    boardName: Joi.string().required(),
  };
  return Joi.validate(board, schema);
}

module.exports.Board = Board;
module.exports.validate = validate;
