import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddBoardModal from "./AddBoardModal";
const BoardList = (props) => {
  const { boardNames } = props;
  return (
    <>
      <Box sx={{ borderRight: "2px solid black" }}>
        <Typography
          variant="h3"
          align="center"
          marginBottom={3}
          marginLeft={1}
          sx={{ fontSize: 27 }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            Your Boards
            <AddBoardModal />
          </Box>
        </Typography>
        <Typography
          variant="body1"
          align="left"
          sx={{ fontSize: 20, marginLeft: 3 }}
        >
          {boardNames.map((board, index) => (
            <li key={index}>{board}</li>
          ))}
        </Typography>
      </Box>
    </>
  );
};

export default BoardList;
