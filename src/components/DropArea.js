import React from "react";
import { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDropArea, setShowDropArea] = useState(false);
  return (
    <div
      className={`${
        showDropArea
          ? "my-4 border border-gray-500 rounded-sm w-full min-h-28 text-center ease-in-out"
          : "opacity-0"
      }`}
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => {
        onDrop();
        setShowDropArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drope here
    </div>
  );
};

export default DropArea;
