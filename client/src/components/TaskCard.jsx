import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import EditTaskModal from "./EditTaskModal";

const TaskCard = (props) => {
  const { taskId, title, description, status, onDelete } = props;

  return (
    <Box margin={2} sx={{ width: "97%" }}>
      <Card sx={{ background: "rgb(243 244 246)", width: "97%" }}>
        <CardContent align="left">
          <Typography gutterBottom variant="body1" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <EditTaskModal
            title={title}
            description={description}
            status={status}
          />
          <IconButton
            onClick={() => {
              onDelete(taskId);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskCard;
