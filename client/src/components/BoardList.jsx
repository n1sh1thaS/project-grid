import React from "react";
import { Box, Typography } from "@mui/material";

const BoardList = (props) => {
  const { boardNames } = props;
  return (
    <>
      <Box sx={{ borderRight: "2px solid black" }}>
        <Typography
          variant="h3"
          align="center"
          marginBottom={3}
          sx={{ fontSize: 30 }}
        >
          Your Boards
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
