import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import BoardList from "../components/BoardList";
import BoardColumn from "../components/BoardColumn";
import { getBoardInfo, addBoard } from "../services/board-service";
import {
  getTaskArrays,
  removeTask,
  postTask,
  putTask,
} from "../services/task-service";
import "../css/board.css";

const Board = () => {
  const [currentBoard, setCurrentBoard] = useState("");
  const [boardIds, setBoardIds] = useState([]);
  const [boardNames, setBoardNames] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [done, setDone] = useState([]);

  let deleteTask = async (taskId) => {
    const { editToDo, editInProg, editDone } = await removeTask(
      taskId,
      toDo,
      inProg,
      done
    );
    setToDo(editToDo);
    setInProg(editInProg);
    setDone(editDone);
  };

  let addTask = async (task) => {
    let alterTaskArrays = async () => {
      const { editToDo, editInProg, editDone } = await postTask(
        task,
        toDo,
        inProg,
        done
      );
      console.log(editToDo);
      setToDo(editToDo);
      setInProg(editInProg);
      setDone(editDone);
    };
    await alterTaskArrays();
  };

  let editTask = async (taskId, titleEdit, descriptionEdit, statusEdit) => {
    let task = {
      boardId: currentBoard,
      title: titleEdit,
      description: descriptionEdit,
      status: statusEdit,
    };
    let alterTaskArrays = async () => {
      const { editToDo, editInProg, editDone } = await putTask(
        taskId,
        task,
        toDo,
        inProg,
        done
      );
      setToDo(editToDo);
      setInProg(editInProg);
      setDone(editDone);
    };
    await alterTaskArrays();
  };

  let createBoard = async (boardName) => {
    const board = {
      userId: "669f0aa3646ee27c6499110a",
      boardName,
    };
    let alterBoardArrays = async () => {
      const { boardIdArr, boardNameArr } = await addBoard(
        board,
        boardIds,
        boardNames
      );
      console.log(boardIdArr, boardNameArr);
      setBoardIds(boardIdArr);
      setBoardNames(boardNameArr);
      console.log(boardIds, boardNames);
    };
    await alterBoardArrays();
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
          <BoardList boardNames={boardNames} createBoard={createBoard} />
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
              //deleteTask={deleteTask}
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="To Do"
              boardId={currentBoard}
            />
            <BoardColumn
              borderColor="#1C2E4A"
              taskArr={inProg}
              //deleteTask={deleteTask}
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="In Progress"
              boardId={currentBoard}
            />
            <BoardColumn
              borderColor="#023020"
              taskArr={done}
              //deleteTask={deleteTask}
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="Done"
              boardId={currentBoard}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Board;
