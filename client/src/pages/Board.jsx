import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import BoardList from "../components/BoardList";
import BoardColumn from "../components/BoardColumn";
import axios from "axios";
import "../css/board.css";

const Board = () => {
  const [currentBoard, setCurrentBoard] = useState("");
  const [boardIds, setBoardIds] = useState([]);
  const [boardNames, setBoardNames] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [done, setDone] = useState([]);

  let deleteTask = async (taskId) => {
    const oldTasks = { toDo: [...toDo], inProg: [...inProg], done: [...done] };
    setToDo(toDo.filter((task) => task.id !== taskId));
    setInProg(inProg.filter((task) => task.id !== taskId));
    setDone(done.filter((task) => task.id !== taskId));

    await axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .catch((err) => {
        console.log("error deleting task", err);
        setToDo(oldTasks.toDo);
        setInProg(oldTasks.inProg);
        setDone(oldTasks.done);
      });
  };

  useEffect(() => {
    getBoardIds();
  }, []);

  useEffect(() => {
    if (boardIds.length > 0) setCurrentBoard(boardIds[0]);
  }, [boardIds]);

  useEffect(() => {
    if (currentBoard) {
      getTaskArrays();
    }
  }, [currentBoard]);

  const getBoardIds = async () => {
    await axios
      .get(`http://localhost:3000/api/users/${"669f0aa3646ee27c6499110a"}`)
      .then(async (res) => {
        const { data } = res;
        const boardIdArr = data.boardIds;
        setBoardIds(boardIdArr);
        let boardNameArr = [];
        for (let i = 0; i < boardIdArr.length; i++) {
          await getBoardName(boardIdArr[i], boardNameArr);
        }
        setBoardNames(boardNameArr);
      })
      .catch((err) => {
        console.log("Error fetching board id's", err);
      });
  };

  const getBoardName = async (boardId, boardNameArr) => {
    await axios
      .get(`http://localhost:3000/api/boards/${boardId}`)
      .then((res) => {
        const { data } = res;
        boardNameArr.push(data.boardName);
      })
      .catch((err) => {
        console.log("Error fetching board name", err);
      });
  };

  const getTaskArrays = async () => {
    await axios
      .get(`http://localhost:3000/api/boards/${currentBoard}`)
      .then(async (res) => {
        const { data } = res;
        const toDoIds = data.toDo;
        const inProgIds = data.inProgress;
        const doneIds = data.done;

        setToDo(await getTaskDetails(toDoIds));
        setInProg(await getTaskDetails(inProgIds));
        setDone(await getTaskDetails(doneIds));
      })
      .catch((err) => {
        console.log("Error fetching task arrays", err);
      });
  };

  const getTaskDetails = async (taskIds) => {
    let taskInfo = [];
    for (let i = 0; i < taskIds.length; i++) {
      await axios
        .get(`http://localhost:3000/api/tasks/${taskIds[i]}`)
        .then((res) => {
          const { data } = res;
          taskInfo.push({
            id: taskIds[i],
            title: data.title,
            description: data.description,
          });
        })
        .catch((err) => {
          console.log("Error fetching task details", err);
        });
    }
    return taskInfo;
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={8}>
          <BoardList boardNames={boardNames} />
        </Grid>
        <Grid item xs={12} sm={8} marginTop={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              marginLeft: 7,
              height: "100%",
            }}
          >
            <BoardColumn
              borderColor="#8B0000"
              taskArr={toDo}
              deleteTask={deleteTask}
            />
            <BoardColumn
              borderColor="#1C2E4A"
              taskArr={inProg}
              deleteTask={deleteTask}
            />
            <BoardColumn
              borderColor="#023020"
              taskArr={done}
              deleteTask={deleteTask}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Board;
