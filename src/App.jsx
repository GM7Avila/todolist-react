import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import TitleErrorModal from "./components/TitleErrorModal";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="w-screen h-screen bg-neutral-950 flex justify-center p-4 sm:p-6">
      <div className="w-[90vw] sm:w-[70vw] lg:w-[60vw] space-y-5">
        <h1 className="text-2xl sm:text-3xl text-blue-50 font-bold text-center mt-2 mb-10">
          <DoneOutlineIcon
            sx={{ color: "rgb(0, 120, 212)", marginRight: "10px" }}
          />
          ToDo List
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
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
