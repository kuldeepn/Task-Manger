import React from "react";
import CardTask from "./CardTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropArea from "./DropArea";

const TaskName = ({
  title,
  task,
  handleDelete,
  taskFlag,
  editTask,
  setTask,
  iconStyle,
  color,
  setActiveCard,
  onDrop,
}) => {
  return (
    <div className="m-2 w-1/3">
      <h2 className="text-xl font-bold text-center">
        {title}
        <FontAwesomeIcon icon={iconStyle} className={`mx-2 ${color}`} />
      </h2>
      <DropArea onDrop={() => onDrop(title, 0)} />
      {task.map((task, index) => (
        <div key={task.id}>
          <CardTask
            task={task}
            handleDelete={handleDelete}
            taskFlag={taskFlag}
            editTask={editTask}
            setTask={setTask}
            setActiveCard={setActiveCard}
            index={index}
          />
          <DropArea onDrop={() => onDrop(title, index + 1)} />
        </div>
      ))}
    </div>
  );
};

export default TaskName;
