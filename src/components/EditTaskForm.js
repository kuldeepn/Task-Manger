import React from "react";
import { useState } from "react";

const EditTaskForm = ({ task, editTask }) => {
  const [data, setFormData] = useState(task.task);

  const changeHandler = (e) => {
    setFormData(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();

    editTask(data, task.id);
  };

  return (
    <form onSubmit={handleForm} className="flex items-center w-full">
      <input
        placeholder="Enter your task"
        name="task"
        className="p-2 bg-white/20 placeholder:text-gray-200 placeholder:font-normal flex-grow rounded-lg shadow-lg"
        onChange={changeHandler}
        value={data}
        required
      ></input>
      <button
        type="submit"
        className="border px-3 py-1 mx-2 bg-blue-600 text-white rounded-lg"
      >
        Update
      </button>
    </form>
  );
};

export default EditTaskForm;
