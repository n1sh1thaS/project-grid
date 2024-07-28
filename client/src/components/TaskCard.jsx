import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";

const TaskCard = (props) => {
  const { title, description } = props;
  return (
    <Box margin={2} sx={{ width: "97%" }}>
      <Card sx={{ background: "rgb(243 244 246)", width: "97%" }}>
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" align="left">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskCard;
