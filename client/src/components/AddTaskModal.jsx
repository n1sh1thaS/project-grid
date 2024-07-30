import React, { useState } from "react";
import {
  Modal,
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
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

const AddTaskModal = (props) => {
  const { status, boardId, onAdd } = props;
  const [openModal, setOpenModal] = useState(false);
  const [statusChoice, setStatusChoice] = useState(status);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const task = {
      boardId,
      title,
      description,
      status: statusChoice,
    };
    onAdd(task);
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
        <AddIcon fontSize="small" />
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
                label="Title"
                variant="standard"
                onChange={(res) => setTitle(res.target.value)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
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
                    onChange={(event) => {
                      setStatusChoice(event.target.value);
                    }}
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

export default AddTaskModal;
