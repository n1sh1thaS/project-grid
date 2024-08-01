import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import BoardHeader from "./BoardHeader";
import TaskCard from "./TaskCard";
import "../css/board.css";

const BoardColumn = (props) => {
  const { borderColor, taskArr, taskActions, category, boardId } = props;
  const [dragEnter, setDragEnter] = useState(false);
  let status = "toDo";
  if (category === "In Progress") status = "inProgress";
  if (category === "Done") status = "done";
  //styles from boardCategory class

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    setDragEnter(false);
    const task = JSON.parse(e.dataTransfer.getData("taskData"));
    taskActions.edit(task.taskId, task.title, task.description, newStatus);
  };

  return (
    <Box
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={(e) => setDragEnter(true)}
      onDragLeave={(e) => setDragEnter(false)}
      className="boardCategory"
      sx={{
        borderTop: dragEnter
          ? `4px solid ${borderColor}`
          : `2px solid ${borderColor}`,
        borderBottom: dragEnter
          ? `4px solid ${borderColor}`
          : `2px solid ${borderColor}`,
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
  );
};

export default BoardColumn;
