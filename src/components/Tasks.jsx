import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import AlertDialogModal from "./AlertDialogModal";

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
            <li key={task.id} className="flex items-center gap-2">
              <button
                type="button"
                className="bg-neutral-800 text-white text-left p-0 sm:p-1 rounded-md w-full flex items-center hover:bg-neutral-700 transition-colors duration-300"
              >
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => onCompleteTaskClick(task.id)}
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
                <span
                  className={`ml-2 text-sm sm:text-base ${
                    task.isCompleted ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </span>
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                className="bg-neutral-800 p-2 sm:p-3 rounded-md flex items-center transition-colors duration-300"
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
