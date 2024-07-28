import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Card, CardContent, CardActions, Typography, IconButton} from '@mui/material';

const TaskCard = () => {
  return (
    <Card sx={{ maxWidth: 345, background:'rgb(243 244 246)' }}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div" align='left'>
          Task Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Include description of task here 
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between'}}>
        <IconButton>
            <EditIcon fontSize="small"/>
        </IconButton>
        <IconButton>
            <DeleteIcon fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default TaskCard