import { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TitleErrorModal from "./components/TitleErrorModal";
import { v4 as uuidv4 } from "uuid";
import { formatISO } from "date-fns";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(true);

  const addTaskRef = useRef(null);
  const focusInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onCompleteTaskClick = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const onDeleteTaskClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const onAddTaskSubmit = (title, description) => {
    if (!title.trim()) {
      setIsModalOpen(true);
      return;
    }

    const newTask = {
      id: uuidv4(),
      date: formatISO(new Date()),
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  };

  const scrollToAddTask = () => {
    if (addTaskRef.current) {
      const offset = -25;
      const topPosition =
        addTaskRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });

      if (focusInputRef.current) {
        focusInputRef.current();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsAddTaskVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    if (addTaskRef.current) {
      observer.observe(addTaskRef.current);
    }

    return () => {
      if (addTaskRef.current) {
        observer.unobserve(addTaskRef.current);
      }
    };
  }, []);

  return (
    <div className="w-screen min-h-screen bg-neutral-950 flex justify-center p-4 sm:p-6">
      <Fab
        color="primary"
        aria-label="add"
        onClick={scrollToAddTask}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          opacity: isAddTaskVisible ? 0 : 1,
          visibility: isAddTaskVisible ? "hidden" : "visible",
          transition: "opacity 0.5s ease, visibility 0.5s ease",
        }}
      >
        <AddIcon />
      </Fab>

      <div className="w-[90vw] sm:w-[70vw] lg:w-[60vw] space-y-5">
        <h1 className="text-2xl sm:text-3xl text-blue-50 font-bold text-center mt-2 mb-10">
          <DoneOutlineIcon
            sx={{ color: "rgb(0, 120, 212)", marginRight: "10px" }}
          />
          ToDo List
        </h1>

        <div ref={addTaskRef}>
          <AddTask
            onAddTaskSubmit={onAddTaskSubmit}
            focusInput={focusInputRef}
          />
        </div>

        <Tasks
          tasks={tasks}
          onCompleteTaskClick={onCompleteTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>

      <TitleErrorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
