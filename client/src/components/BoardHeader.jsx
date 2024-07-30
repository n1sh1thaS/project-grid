import React from "react";
import { Box } from "@mui/material";
import AddTaskModal from "./AddTaskModal";

const BoardHeader = (props) => {
  const { category } = props;
  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1} display="flex" justifyContent="center" marginLeft={5}>
          {category}
        </Box>
        <AddTaskModal />
      </Box>
    </>
  );
};

export default BoardHeader;
