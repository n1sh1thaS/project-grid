import axios from "axios";

const getTaskArrays = async (currentBoard) => {
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

export default getTaskArrays;
