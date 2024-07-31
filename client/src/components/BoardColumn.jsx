import React from "react";
import { Box, Typography } from "@mui/material";
import BoardHeader from "./BoardHeader";
import TaskCard from "./TaskCard";
import "../css/board.css";

const BoardColumn = (props) => {
  const { borderColor, taskArr, taskActions, category, boardId } = props;
  let status = "toDo";
  if (category === "In Progress") status = "inProgress";
  if (category === "Done") status = "done";
  //styles from boardCategory class
  return (
    <>
      <Box
        className="boardCategory"
        sx={{
          borderTop: `2px solid ${borderColor}`,
          borderBottom: `2px solid ${borderColor}`,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          marginTop={2}
          marginBottom={3}
          sx={{ fontSize: 25 }}
        >
          <BoardHeader
            category={category}
            boardId={boardId}
            onAdd={taskActions.add}
          />
          {taskArr.map((task, index) => (
            <TaskCard
              key={index}
              taskId={task.id}
              taskActions={{
                delete: taskActions.delete,
                edit: taskActions.edit,
              }}
              title={task.title}
              description={task.description}
              status={status}
            />
          ))}
        </Typography>
      </Box>
    </>
  );
};

export default BoardColumn;
