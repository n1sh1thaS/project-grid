import React, { useState } from "react";
import { Box } from "@mui/material";
import AddTaskModal from "./AddTaskModal";

const BoardHeader = (props) => {
  const { category, boardId, onAdd } = props;
  let status = "toDo";
  if (category === "In Progress") status = "inProgress";
  if (category === "Done") status = "done";

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1} display="flex" justifyContent="center" marginLeft={5}>
          {category}
        </Box>
        <AddTaskModal status={status} boardId={boardId} onAdd={onAdd}/>
      </Box>
    </>
  );
};

export default BoardHeader;
