import React, { useState } from "react";
import { Modal, Button, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditTaskModal = () => {
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default EditTaskModal;
