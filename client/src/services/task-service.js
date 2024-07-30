import { tableSortLabelClasses } from "@mui/material";
import axios from "axios";

export const getTaskArrays = async (currentBoard) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/boards/${currentBoard}`
    );
    const { data } = response;
    const toDoIds = data.toDo;
    const inProgIds = data.inProgress;
    const doneIds = data.done;
    const toDoArr = await getTaskDetails(toDoIds);
    const inProgArr = await getTaskDetails(inProgIds);
    const doneArr = await getTaskDetails(doneIds);

    return { toDoArr, inProgArr, doneArr };
  } catch (err) {
    console.log("error fetching task information", err);
  }
};

const getTaskDetails = async (taskIds) => {
  try {
    let taskInfo = await Promise.all(
      taskIds.map(async (id) => {
        const response = await axios.get(
          `http://localhost:3000/api/tasks/${id}`
        );
        const { data } = response;
        return {
          id,
          title: data.title,
          description: data.description,
        };
      })
    );
    return taskInfo;
  } catch (err) {
    console.log("error fetching task details", err);
  }
};

export const removeTask = async (taskId, toDo, inProg, done) => {
  try {
    let editToDo = toDo.filter((task) => task.id !== taskId);
    let editInProg = inProg.filter((task) => task.id !== taskId);
    let editDone = done.filter((task) => task.id !== taskId);

    await axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .catch((err) => {
        editToDo = toDo;
        editInProg = inProg;
        editDone = done;
        console.log("axios error deleting task", err);
        return { editToDo, editInProg, editDone };
      });

    return { editToDo, editInProg, editDone };
  } catch (err) {
    console.log("error deleting task", err);
  }
};

export const postTask = async (task, toDo, inProg, done) => {
  try {
    let editToDo = [...toDo];
    let editInProg = [...inProg];
    let editDone = [...done];

    const result = await axios
      .post("http://localhost:3000/api/tasks", task)
      .catch((err) => {
        editToDo = toDo;
        editInProg = inProg;
        editDone = done;
        console.log("axios error adding task", err);
        return { editToDo, editInProg, editDone };
      });
    const { data } = result;
    const mapStatus = {
      toDo: editToDo,
      inProgress: editInProg,
      done: editDone,
    };
    mapStatus[task.status].push({
      id: data._id,
      title: data.title,
      description: data.description,
    });
    return { editToDo, editInProg, editDone };
  } catch (err) {
    console.log("error creating task", err);
  }
};

//export default { getTaskArrays, removeTask };
