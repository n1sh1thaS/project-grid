const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Task, validate } = require("../models/task");
const { Board } = require("../models/board");

router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task does not exist");
    res.send(task);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const board = await Board.findById(req.body.boardId);
    if (!board) return res.status(404).send("Board does not exist");

    const task = new Task({
      boardId: req.body.boardId,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    await task.save();
    await Board.updateOne(
      { _id: board._id },
      { $addToSet: { [task.status]: task._id } }
    );
    res.send(task);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) return res.status(404).send("Task does not exist");

    //update and get new task
    let newTask = await Task.updateOne(
      { _id: req.params.id },
      {
        boardId: req.body.boardId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      }
    );
    newTask = await Task.findById(req.params.id);

    //update board
    if (req.body.status !== oldTask.status) {
      await Board.updateOne(
        { _id: oldTask.boardId },
        {
          $pull: {
            [oldTask.status]: oldTask.id,
          },
          $addToSet: { [req.body.status]: oldTask._id },
        }
      );
    }
    res.send(newTask);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.put("/status/:id", auth, async (req, res) => {
  try {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) return res.status(404).send("Task does not exist");
    if (req.body.status !== oldTask.status) {
      const newTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

      await Board.updateOne(
        { _id: oldTask.boardId },
        {
          $pull: {
            [oldTask.status]: oldTask.id,
          },
          $addToSet: { [newTask.status]: oldTask._id },
        }
      );
      return res.send(newTask);
    }

    res.send(oldTask);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task does not exist");

    await Board.updateOne(
      { _id: task.boardId },
      {
        $pull: {
          [task.status]: task.id,
        },
      }
    );
    res.send(task);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

module.exports = router;
