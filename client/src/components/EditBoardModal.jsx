import React, { useState } from "react";
import { Modal, Box, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
const EditBoardModal = (props) => {
  const { title, onEdit } = props;
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    onEdit(newTitle);
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
                label="Title"
                variant="standard"
                defaultValue={title}
                onChange={(res) => setNewTitle(res.target.value)}
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

export default EditBoardModal;
