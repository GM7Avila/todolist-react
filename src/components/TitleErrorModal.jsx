import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const TitleErrorModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          bgcolor: "rgb(30, 30, 30)",
          color: "rgb(211, 211, 211)",
          borderColor: "rgb(80, 80, 80)",
          borderWidth: "1px",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          s
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          Ops!
        </Typography>
        <Typography id="modal-desc" textColor="inherit">
          Campo 'Título' não pode estar em branco.
        </Typography>
      </Sheet>
    </Modal>
  );
};

export default TitleErrorModal;
