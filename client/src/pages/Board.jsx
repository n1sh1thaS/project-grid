import React, { useEffect, useState } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import BoardList from "../components/BoardList";
import BoardColumn from "../components/BoardColumn";
import EditBoardModal from "../components/EditBoardModal";
import {
  getBoardInfo,
  addBoard,
  removeBoard,
  putBoard,
} from "../services/board-service";
import {
  getTaskArrays,
  removeTask,
  postTask,
  putTask,
} from "../services/task-service";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/board.css";

const Board = () => {
  const [boardIds, setBoardIds] = useState([]);
  const [boardNames, setBoardNames] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(boardIds[0]);
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
    let alterBoardArrays = async () => {
      const { boardIdArr, boardNameArr } = await addBoard(
        boardName,
        boardIds,
        boardNames
      );
      setBoardIds([...boardIdArr]);
      setBoardNames([...boardNameArr]);
    };
    await alterBoardArrays();
  };

  let deleteBoard = async () => {
    await removeBoard(currentBoard);
    let editBoardIds = [...boardIds];
    let index = editBoardIds.indexOf(currentBoard);
    editBoardIds.splice(index, 1);
    setBoardIds(editBoardIds);
    let editBoardNames = [...boardNames];
    editBoardNames.splice(index, 1);
    setBoardNames(editBoardNames);
    setCurrentBoard(boardIds[0]);
  };

  let editBoard = async (newTitle) => {
    await putBoard(currentBoard, newTitle);
    let editBoardNames = [...boardNames];
    editBoardNames[boardIds.indexOf(currentBoard)] = newTitle;
    setBoardNames(editBoardNames);
    console.log(boardNames[boardIds.indexOf(currentBoard)]);
  };

  //fetch and set board info
  useEffect(() => {
    const fetchBoardInfo = async () => {
      const { boardIdArr, boardNameArr } = await getBoardInfo();
      setBoardIds(boardIdArr);
      setBoardNames(boardNameArr);
    };
    fetchBoardInfo();
  }, [boardNames]);

  //set current board
  useEffect(() => {
    const initializeBoards = async () => {
      const { boardIdArr } = await getBoardInfo();
      if (!boardIdArr.length) {
        await createBoard("Untitled");
        setBoardNames(["Untitled"]);
      }
    };
    initializeBoards();
  }, []);

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
          <NavBar showLogout />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={8}>
          <BoardList
            boardNames={boardNames}
            createBoard={createBoard}
            changeBoard={(index) => setCurrentBoard(boardIds[index])}
          />
        </Grid>
        <Grid item xs={12} sm={9} marginTop={8}>
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
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="To Do"
              boardId={currentBoard}
            />
            <BoardColumn
              borderColor="#1C2E4A"
              taskArr={inProg}
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="In Progress"
              boardId={currentBoard}
            />
            <BoardColumn
              borderColor="#023020"
              taskArr={done}
              taskActions={{ add: addTask, delete: deleteTask, edit: editTask }}
              category="Done"
              boardId={currentBoard}
            />
            <Box marginLeft={1}>
              <EditBoardModal
                onEdit={editBoard}
                title={boardNames[boardIds.indexOf(currentBoard)]}
              />
              <IconButton onClick={deleteBoard}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Board;
