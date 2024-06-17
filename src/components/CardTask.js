import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import EditTaskForm from "./EditTaskForm";

const CardTask = ({
  handleDelete,
  taskFlag,
  editTask,
  task,
  setTask,
  setActiveCard,
  index,
}) => {
  const [currentTitle, setCurrentTitle] = useState(task.task);
  console.log(task);
  const labelClasses =
    task.tag === "High Priority"
      ? "bg-red-500 text-gray-300"
      : "bg-green-500 text-gray-300";

  const handleCancel = () => {
    setCurrentTitle(task.task);
    setTask((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, isEditing: false } : t))
    );
  };

  const handleEdittask = (newTitle, id) => {
    editTask(newTitle, id);
    setCurrentTitle(newTitle);
  };

  return (
    <div
      className="my-4 border border-gray-500 rounded-sm w-full min-h-28 cursor-grab active:opacity-70 active:border-gray-700"
      draggable
      onDragStart={() => setActiveCard(task.id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="flex justify-between m-2 p-2">
        {task.isEditing ? (
          <EditTaskForm
            task={{ task: currentTitle, id: task.id }}
            editTask={handleEdittask}
          />
        ) : (
          <p className="px-2 font-medium text-lg">{currentTitle}</p>
        )}
        <div className="flex-shrink-0">
          {task.isEditing ? (
            <FontAwesomeIcon
              icon={faXmark}
              onClick={handleCancel}
              className="cursor-pointer"
            />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                className="mx-2 cursor-pointer"
                onClick={() => taskFlag(task.id)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(task.id)}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
      <div className="m-2 p-2">
        {task.tag && (
          <label className={`px-1 py-0.5 mx-2 rounded-lg ${labelClasses} `}>
            {task.tag}
          </label>
        )}
      </div>
    </div>
  );
};

export default CardTask;
