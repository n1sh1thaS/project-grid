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
  const { title, description, status } = props;
  const [openModal, setOpenModal] = useState(false);

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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="standard-basic"
              defaultValue={title}
              label="Title"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              defaultValue={description}
              label="Description"
              variant="standard"
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
                >
                  <FormControlLabel
                    value="To Do"
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
                    value="In Progress"
                    control={<Radio color="primary" />}
                    label="In Progress"
                  />
                  <FormControlLabel
                    value="Done"
                    control={<Radio color="success" />}
                    label="Done"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Box align="center">
              <IconButton sx={{ align: "left" }}>
                <DoneIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
