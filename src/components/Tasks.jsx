import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import AlertDialogModal from "./AlertDialogModal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Tasks({ tasks, onCompleteTaskClick, onDeleteTaskClick }) {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete !== null) {
      onDeleteTaskClick(taskToDelete);
      setTaskToDelete(null);
      setOpenDialog(false);
    }
  };

  return (
    <>
      <ul className="space-y-3 p-3 sm:p-6 bg-neutral-900 rounded-md shadow-lg">
        {tasks == null || tasks.length === 0 ? (
          <p className="text-center text-neutral-500 text-xs sm:text-sm md:text-base lg:text-lg">
            Você não tem tarefas pendentes, comece uma nova.
          </p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="flex gap-2">
              {task.description ? (
                <Accordion
                  sx={{
                    width: "100%",
                    minWidth: "80%",
                    maxWidth: "100%",
                    bgcolor: "transparent",
                    "& .MuiAccordionSummary-content": {
                      m: "0px !important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "gray" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      padding: 0,
                      borderRadius: "5px 5px 0 0",
                      bgcolor: "#262626",
                      color: "white",
                      ":hover": {
                        bgcolor: "#404040",
                      },
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={task.isCompleted}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => {
                        onCompleteTaskClick(task.id);
                      }}
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{ color: "rgb(255, 255, 255, 0.5)" }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleRoundedIcon
                          sx={{ color: "rgb(0, 120, 212)" }}
                        />
                      }
                    />
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "0.2em",
                        paddingBottom: "0.2em",
                      }}
                    >
                      {task.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      bgcolor: "#383838",
                      color: "gray",
                      wordWrap: "break-word", // Quebra a linha do texto quando necessário
                      overflowWrap: "break-word", // Garante que palavras grandes sejam quebradas
                      whiteSpace: "pre-wrap", // Mantém os espaços e quebras de linha
                      maxHeight: "200px", // Altura máxima para garantir que o Accordion não ultrapasse o limite
                      overflowY: "auto", // Adiciona scroll vertical quando o texto é muito grande
                    }}
                  >
                    <Typography>{task.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#262626",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  <Checkbox
                    checked={task.isCompleted}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => {
                      onCompleteTaskClick(task.id);
                    }}
                    icon={
                      <RadioButtonUncheckedIcon
                        sx={{ color: "rgb(255, 255, 255, 0.5)" }}
                      />
                    }
                    checkedIcon={
                      <CheckCircleRoundedIcon
                        sx={{ color: "rgb(0, 120, 212)" }}
                      />
                    }
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "0.2em",
                    }}
                  >
                    {task.title}
                  </Typography>
                </div>
              )}
              <button
                type="button"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                className="bg-neutral-800 p-3 rounded-md flex items-center transition-colors duration-300"
                onClick={() => handleDeleteClick(task.id)}
              >
                <TrashIcon
                  color={
                    hoveredTaskId === task.id ? "white" : "rgb(135, 58, 58)"
                  }
                />
              </button>
            </li>
          ))
        )}
      </ul>

      <AlertDialogModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default Tasks;
