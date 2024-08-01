import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddBoardModal from "./AddBoardModal";
const BoardList = (props) => {
  const { boardNames, createBoard, changeBoard } = props;

  return (
    <>
      <Box sx={{ borderRight: "2px solid black" }}>
        <Typography
          variant="h3"
          align="center"
          marginBottom={1}
          marginLeft={1}
          sx={{ fontSize: 23 }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            Your Boards
            <AddBoardModal onCreate={createBoard} />
          </Box>
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignContent="left"
          justifyItems="left"
          sx={{ fontSize: 20 }}
        >
          {boardNames.map((board, index) => (
            <Button
              onClick={() => changeBoard(index)}
              sx={{
                color: "black",
                justifyContent: "flex-start",
                marginLeft: 1,
                textTransform: "none",
                fontSize: 17,
                letterSpacing: "0.8px",
              }}
              key={index}
            >
              {board}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default BoardList;
