import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import AlertDialogModal from "./AlertDialogModal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SortMenu from "./SortMenu";
import SimpleSnackbar from "./SimpleSnackbar";

function Tasks({ setTasks, tasks, onCompleteTaskClick, onDeleteTaskClick }) {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("status");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [tasksTemp, setTasksTemp] = useState(
    JSON.parse(localStorage.getItem("temp-tasks")) || []
  );

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setTasksTemp(tasks);

    if (taskToDelete !== null) {
      onDeleteTaskClick(taskToDelete);
      setTaskToDelete(null);
      setOpenDialog(false);
    }
  };

  const selectSortCriteria = (tasks, criteria) => {
    switch (criteria) {
      case "date":
        return [...tasks].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "status":
        return [...tasks].sort((a, b) => a.isCompleted - b.isCompleted);
      default:
        return tasks;
    }
  };

  const handleSortChange = (option) => {
    setSortCriteria(option);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
    setTasksTemp([]);
  };

  const undoAction = () => {
    setTasks(tasksTemp);
  };

  const sortedTasks = selectSortCriteria(tasks, sortCriteria);

  return (
    <>
      {console.log(tasks)}
      {console.log(tasksTemp)}
      <SimpleSnackbar
        message={"Tarefa arquivada"}
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        undoAction={undoAction}
      />

      <ul className="space-y-3 p-3 sm:p-6 bg-neutral-900 rounded-md shadow-lg">
        {tasks && tasks.length > 0 && (
          <>
            <div className="flex justify-end gap-2 items-center text-xs sm:text-sm md:text-base">
              <SortMenu
                handleSortChange={handleSortChange}
                sortCriteria={sortCriteria}
              />
            </div>

            <hr
              style={{
                borderColor: "#505050",
                borderWidth: "1px",
                opacity: 0.6,
              }}
            />
          </>
        )}

        {tasks == null || tasks.length === 0 ? (
          <p className="text-center text-neutral-500 text-xs sm:text-sm md:text-base lg:text-lg">
            Você não tem tarefas pendentes, comece uma nova.
          </p>
        ) : (
          sortedTasks.map((task) => (
            <li
              key={task.id}
              className="flex gap-2"
              style={{
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: task.isCompleted ? 0.5 : 1,
                transform: task.isCompleted ? "scale(0.98)" : "scale(1)",
              }}
            >
              {task.description ? (
                <Accordion
                  sx={{
                    width: "100%",
                    minWidth: "80%",
                    maxWidth: "100%",
                    bgcolor: "#262626",
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
                        bgcolor: "#2D2D2D",
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
                      <span
                        className="text-xs sm:text-sm"
                        style={{
                          textDecoration: task.isCompleted
                            ? "line-through"
                            : "none",
                          color: task.isCompleted ? "#6d6d6d" : "inherit",
                        }}
                      >
                        {task.title}
                      </span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      bgcolor: "#383838",
                      color: "gray",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      {task.description}
                    </Typography>
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
                      paddingBottom: "0.2em",
                    }}
                  >
                    <span
                      className="text-xs sm:text-sm"
                      style={{
                        textDecoration: task.isCompleted
                          ? "line-through"
                          : "none",
                        color: task.isCompleted ? "#6d6d6d" : "inherit",
                      }}
                    >
                      {task.title}
                    </span>
                  </Typography>
                </div>
              )}
              <button
                type="button"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "background-color 0.7s ease, border-color 0.7s ease",
                  border: "2px solid transparent",
                }}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                className={`bg-neutral-800 p-3 rounded-md flex items-center transition-colors duration-300 ${
                  hoveredTaskId === task.id ? "bg-red-500 border-white" : ""
                }`}
                onClick={() => {
                  handleDeleteClick(task.id);
                }}
              >
                <TrashIcon color="white" size={24} />
              </button>
            </li>
          ))
        )}
      </ul>

      <AlertDialogModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza de que deseja excluir esta tarefa?"
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
    </>
  );
}

export default Tasks;
