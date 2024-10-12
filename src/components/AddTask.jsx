import AddIcon from "@mui/icons-material/Add";
import { useState, useRef } from "react";
import ErrorModal from "./TitleErrorModal";

function AddTask({ onAddTaskSubmit, focusInput }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleInputRef = useRef(null);

  const handleAddTask = () => {
    if (!title.trim()) {
      setIsModalOpen(true);
      return;
    }
    onAddTaskSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  focusInput.current = () => {
    titleInputRef.current.focus();
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 bg-neutral-900 rounded-md flex flex-col">
      <h2 className="text-xl sm:text-2xl text-slate-400">Nova Tarefa</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título*"
        className="p-2 sm:p-3 rounded-md bg-neutral-800 text-white placeholder:text-neutral-600 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        maxLength={30}
        ref={titleInputRef}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        className="p-2 sm:p-3 rounded-md bg-neutral-800 text-white placeholder:text-neutral-600 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <button
        type="button"
        className="bg-blue-500 rounded-md px-3 py-2 sm:px-4 sm:py-2 text-x sm:text-m md:text-base lg:text-lg font-medium text-neutral-100 transition-all duration-300"
        onClick={handleAddTask}
      >
        <AddIcon /> Adicionar
      </button>

      <ErrorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default AddTask;
