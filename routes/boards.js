const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Board, validate } = require("../models/board");
const { User } = require("../models/user");
const { Task } = require("../models/task");

router.get("/", auth, async (req, res) => {
  res.send(await Board.find().sort("boardName"));
});

router.get("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).send("Board does not exist");
    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send("User does not exist");

    const board = new Board({
      userId: req.body.userId,
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

router.put("/:id", auth, async (req, res) => {
  /*const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);*/

  try {
    /*const user = await User.findById(req.userId);
    if (!user) return res.status(404).send("User does not exist");*/

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        /*userId: req.body.userId,
        },*/
        boardName: req.body.boardName,
      },
      { new: true }
    );
    if (!board) return res.status(404).send("Board does not exist");
    res.send(board);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).send("Board does not exist");

    await User.updateOne(
      { _id: board.userId },
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
