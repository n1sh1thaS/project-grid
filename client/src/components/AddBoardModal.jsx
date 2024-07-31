import React, { useState } from "react";
import { Modal, Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
const AddBoardModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const onSubmit = () => {};

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

export default AddBoardModal;
