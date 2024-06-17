import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TaskName from "./components/TaskName";
import {
  faBarsProgress,
  faCircleCheck,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const oldTasks = localStorage.getItem("task");

const App = () => {
  const [theme, setTheme] = useState(null);
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  const configArray = [
    { title: "To Do", icon: faList, color: "text-yellow-400" },
    {
      title: "In Progress",
      icon: faBarsProgress,
      color: "text-blue-400",
    },
    {
      title: "Completed",
      icon: faCircleCheck,
      color: "text-green-400",
    },
  ];

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleDelete = (tasksId) => {
    const updatedTask = tasks.filter((task) => task.id !== tasksId);
    setTasks(updatedTask);
  };

  const taskFlag = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const editTask = (newTitle, id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, task: newTitle, isEditing: false } : task
      )
    );
  };

  const onDrop = (status, position) => {
    if (activeCard === null || activeCard === undefined) return;
    const taskToMove = tasks.find((task) => task.id === activeCard);
    const updatedTasks = tasks.filter((task) => task.id !== activeCard);

    const tasksByStatus = updatedTasks.filter((task) => task.status === status);
    const otherTasks = updatedTasks.filter((task) => task.status !== status);

    // Insert the task in the correct position
    tasksByStatus.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    // Merge back the tasks
    const finalTasks = [...tasksByStatus, ...otherTasks];

    setTasks(finalTasks);
    setActiveCard(null);
  };

  return (
    <div className="min-h-screen dark:bg-[#202124] dark:text-white">
      <Header />
      <div className="grid grid-flow-row">
        <InputForm setTask={setTasks} />
        <div className="flex justify-evenly mt-5 mx-10">
          {configArray.map((status, index) => (
            <TaskName
              title={status.title}
              task={tasks.filter((task) => task.status === status.title)}
              handleDelete={handleDelete}
              key={index}
              taskFlag={taskFlag}
              editTask={editTask}
              setTask={setTasks}
              iconStyle={status.icon}
              color={status.color}
              setActiveCard={setActiveCard}
              onDrop={onDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
