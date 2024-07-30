import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import BoardList from "../components/BoardList";
import BoardColumn from "../components/BoardColumn";
import axios from "axios";
import getBoardInfo from "../services/board-service";
import getTaskArrays from "../services/task-service";
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

  //fetch and set board info
  useEffect(() => {
    const fetchBoardInfo = async () => {
      const { boardIdArr, boardNameArr } = await getBoardInfo();
      setBoardIds(boardIdArr);
      setBoardNames(boardNameArr);
    };
    fetchBoardInfo();
  }, []);

  //set current board
  useEffect(() => {
    if (boardIds.length > 0) setCurrentBoard(boardIds[0]);
  }, [boardIds]);

  //fetch and set task info
  useEffect(() => {
    const fetchTaskInfo = async () => {
      if (currentBoard) {
        const { toDoArr, inProgArr, doneArr } = await getTaskArrays(
          currentBoard
        );
        setToDo(toDoArr);
        setInProg(inProgArr);
        setDone(doneArr);
      }
    };
    fetchTaskInfo();
  }, [currentBoard]);

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
              category="To Do"
            />
            <BoardColumn
              borderColor="#1C2E4A"
              taskArr={inProg}
              deleteTask={deleteTask}
              category="In Progress"
            />
            <BoardColumn
              borderColor="#023020"
              taskArr={done}
              deleteTask={deleteTask}
              category="Done"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Board;
