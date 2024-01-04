import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoListDisplay from "../DisplayList/DisplayList";
const InputForm = () => {
  const [toDoData, setToDoData] = useState("");
  const [createFlag, setCreateFlag] = useState(false);

  const onDataInput = (e) => {
    setToDoData(e.target.value);
  };

  const toDoDataObject = {
    id: uuidv4(),
    task: toDoData,
    completed: false,
  };

  const onButtonClick = () => {
    const existingData = JSON.parse(localStorage.getItem("toDoList")) || [];
    const newData = [...existingData, toDoDataObject];
    localStorage.setItem("toDoList", JSON.stringify(newData));
    setToDoData("");
    setCreateFlag(!createFlag);
  };

  //   console.log(toDoData);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center items-center gap-4">
        <div>
          <input
            placeholder="Enter your today's task"
            type="text"
            value={toDoData}
            onChange={onDataInput}
            className="border border-gray-500 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-950 w-96"
          />
        </div>
        <div>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 border border-blue-500 hover:border-transparent rounded h-8"
            onClick={onButtonClick}
            disabled={toDoData.trim() === ""}>
            Create
          </button>
        </div>
      </div>

      <ToDoListDisplay createFlag={createFlag} />
    </div>
  );
};

export default InputForm;
