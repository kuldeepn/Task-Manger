import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const InputForm = ({ setTask }) => {
  const [data, setFormData] = useState({
    task: "",
    status: "To Do",
    tag: "",
    id: "",
    isEditing: false,
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return { ...prev, [name]: value, id: uuidv4() };
    });
  };

  const selectTag = (event) => {
    const { name } = event.target;

    setFormData((prev) => {
      return { ...prev, tag: name };
    });
  };

  const formHandler = (event) => {
    event.preventDefault();
    setTask((prev) => {
      return [...prev, data];
    });
    setFormData({
      task: "",
      status: "To Do",
      tag: "",
    });
  };
  return (
    <div className="p-2 flex items-center justify-center shadow-lg">
      <form onSubmit={formHandler} className="w-[40%]">
        <input
          placeholder="Enter your task"
          name="task"
          className="p-3 mt-5 mb-5 bg-white/20 placeholder:text-gray-200 placeholder:font-normal w-full rounded-lg shadow-lg"
          onChange={changeHandler}
          value={data.task}
          required
        ></input>

        <div className="flex justify-between items-center">
          <div>
            <button
              className={`border px-1  mx-1 rounded-lg ${
                data.tag === "High Priority" ? "bg-red-500 text-white" : ""
              }`}
              onClick={selectTag}
              name="High Priority"
              type="button"
            >
              High Priority
            </button>
            <button
              className={`border px-1 rounded-lg ${
                data.tag === "Low Priority" ? "bg-green-500 text-white" : ""
              }`}
              name="Low Priority"
              onClick={selectTag}
              type="button"
            >
              Low Priority
            </button>
          </div>
          <div>
            <select
              className=" dark:text-black p-1 rounded-lg px-3 py-2"
              name="status"
              onChange={changeHandler}
              value={data.status}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button className="px-3 py-2 mx-2 bg-emerald-700 text-white rounded-lg">
              +Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
