import { useEffect, useState } from "react";

const ToDoListDisplay = ({ createFlag }) => {
  const [displayData, setDisplayData] = useState(
    JSON.parse(localStorage.getItem("toDoList")) || []
  );

  console.log(createFlag);

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("toDoList")) || [];
    setDisplayData(newData);
  }, [createFlag]);

  const onDeleteClick = (taskId) => {
    const updatedData = displayData.filter((item) => item.id !== taskId);
    localStorage.setItem("toDoList", JSON.stringify(updatedData));
    setDisplayData(updatedData);
  };

  const onEditClick = (taskId) => {
    const updatedData = displayData.map((item) => {
      if (item.id === taskId) {
        return { ...item, editing: true };
      }
      return item;
    });
    setDisplayData(updatedData);
  };

  const onSaveClick = (taskId, editedTask) => {
    const updatedData = displayData.map((item) => {
      if (item.id === taskId) {
        return { ...item, task: editedTask, editing: false };
      }
      return item;
    });
    localStorage.setItem("toDoList", JSON.stringify(updatedData));
    setDisplayData([...updatedData]);
  };

  console.log(displayData);
  return (
    <>
      <div className="flex flex-col gap-4">
        {displayData.map((list, index) => {
          return (
            <div key={index}>
              {!list.editing ? (
                <div className="flex gap-2">
                  <p className="bg-slate-200 w-72 p-2 rounded-xl">
                    {list.task}
                  </p>
                  <button onClick={() => onEditClick(list.id)}>✏️</button>
                  <button onClick={() => onDeleteClick(list.id)}>🗑️</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={list.task}
                    onChange={(e) => {
                      const updatedData = displayData.map((item) => {
                        if (item.id === list.id) {
                          return { ...item, task: e.target.value };
                        }
                        return item;
                      });
                      setDisplayData(updatedData);
                    }}
                    className="border border-gray-500 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-950 w-96"
                  />
                  <button
                    onClick={() => onSaveClick(list.id, list.task)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 border border-blue-500 hover:border-transparent rounded h-88">
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToDoListDisplay;