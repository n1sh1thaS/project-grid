const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Board, validate } = require("../models/board");
const { User } = require("../models/user");
const { Task } = require("../models/task");

router.get("/", async (req, res) => {
  res.send(await Board.find().sort("boardName"));
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).send("Board does not exist");
    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send("User does not exist");

    const board = new Board({
      user: {
        username: user.username,
      },
      boardName: req.body.boardName,
    });

    await board.save();
    await User.updateOne(
      { _id: req.body.userId },
      { $addToSet: { boardIds: board._id } }
    );
    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    /*const user = await User.findById(res.userId);
    if (!user) return res.status(404).send("User does not exist");*/

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        /*user: {
          username: user.username,
        },*/
        boardTitle: req.body.boardTitle,
      },
      { new: true }
    );
    if (!board) return res.status(404).send("Board does not exist");
    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).send("Board does not exist");

    await User.updateOne(
      { _id: board.user._id },
      {
        $pull: {
          boardIds: board._id,
        },
      }
    );

    const tasks = [...board.toDo, ...board.inProgress, ...board.done];
    for (let taskId of tasks) {
      await Task.findByIdAndDelete(taskId);
    }

    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

module.exports = router;
