import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const AlertDialogModal = ({ open, onClose, onConfirm, setIsSnackbarOpen }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{
          bgcolor: "rgb(30, 30, 30)",
          color: "rgb(211, 211, 211)",
          borderColor: "rgb(80, 80, 80)",
          borderWidth: "1px",
        }}
      >
        <DialogTitle sx={{ color: "rgb(211, 211, 211)" }}>
          <WarningRoundedIcon sx={{ color: "rgb(211, 211, 211)" }} />
          Confirmação
        </DialogTitle>
        <Divider sx={{ bgcolor: "rgb(211, 211, 211)" }} />{" "}
        <DialogContent sx={{ color: "rgb(211, 211, 211)" }}>
          Você tem certeza que deseja excluir esta tarefa?
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              onConfirm();
              setIsSnackbarOpen(true);
            }}
          >
            Excluir
          </Button>
          <Button
            variant="plain"
            color="neutral"
            sx={{
              color: "rgb(211, 211, 211)",
              bgcolor: "rgb(100, 100, 100)",
              "&:hover": { bgcolor: "rgb(120, 120, 120)" },
            }}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default AlertDialogModal;
