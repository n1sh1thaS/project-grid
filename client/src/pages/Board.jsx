import React from 'react'
import NavBar from '../components/NavBar'
import {Grid, Typography, Box} from "@mui/material";
import TaskCard from '../components/TaskCard';
import "../css/board.css"
import { Task } from 'fawn';
const Board = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar/>
        </Grid>
        <Grid item xs={12} sm={2} marginTop={8}>
          <Box sx={{borderRight: '2px solid black'}}>
              <Typography variant="h3" align="center" marginBottom={3} sx={{fontSize: 30}}>
                Your Boards
              </Typography>
              <Typography variant="body1" align="left" marginLeft={4} sx={{fontSize: 20}}>
                <li>board 1</li>
                <li>board 2</li>
                <li>board 3</li>
              </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} marginTop={8}>
          <Box sx={{display: "flex", flexDirection: "row", gap: 3, alignItems: "center", marginLeft: 7, height: '100%'}}>
              <Box className="boardCategory" sx={{ borderTop: '2px solid #8B0000', borderBottom: '2px solid #8B0000'}}>
                  <Typography variant="h3" align="center" marginTop={2} marginBottom={3} sx={{fontSize: 25}}>
                    To Do
                    <TaskCard/>
                    <TaskCard/>
                  </Typography>
              </Box>
              <Box className="boardCategory" sx={{borderTop: '2px solid #1C2E4A', borderBottom: '2px solid #1C2E4A'}}>
                  <Typography variant="h3" align="center" marginTop={2} marginBottom={'175%'} sx={{fontSize: 25}}>
                    In Progress
                  </Typography>
              </Box>
              <Box className="boardCategory" sx={{borderTop: '2px solid #023020', borderBottom: '2px solid #023020'}}>
                  <Typography variant="h3" align="center" marginTop={2} marginBottom={'175%'}sx={{fontSize: 25}}>
                    Done
                  </Typography>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Board