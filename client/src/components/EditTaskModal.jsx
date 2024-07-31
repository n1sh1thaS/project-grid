import React, { useState } from "react";
import {
  Modal,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

const EditTaskModal = (props) => {
  const { title, description, status, taskId, onEdit } = props;
  const [openModal, setOpenModal] = useState(false);
  const [statusEdit, setStatus] = useState(status);
  const [titleEdit, setTitle] = useState(title);
  const [descriptionEdit, setDescription] = useState(description);

  const onSubmit = async (event) => {
    event.preventDefault();
    onEdit(taskId, titleEdit, descriptionEdit, statusEdit);
    setOpenModal(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form onSubmit={onSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                id="standard-basic"
                defaultValue={title}
                label="Title"
                variant="standard"
                onChange={(res) => setTitle(res.target.value)}
              />
              <TextField
                id="standard-basic"
                defaultValue={description}
                label="Description"
                variant="standard"
                onChange={(res) => setDescription(res.target.value)}
              />
              <div>
                <FormControl sx={{ marginTop: 1 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={status}
                    onChange={(res) => setStatus(res.target.value)}
                  >
                    <FormControlLabel
                      value="toDo"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: red[400] },
                          }}
                        />
                      }
                      label="To Do"
                    />
                    <FormControlLabel
                      value="inProgress"
                      control={<Radio color="primary" />}
                      label="In Progress"
                    />
                    <FormControlLabel
                      value="done"
                      control={<Radio color="success" />}
                      label="Done"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Box align="center">
                <IconButton type="submit" sx={{ align: "left" }}>
                  <DoneIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
