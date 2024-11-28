/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

export default function TaskItem({
  task,
  toggleComplete,
  deleteTask,
  startEditTask,
}) {
  if (!task) return null;

  const priorityColors = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-green-200",
  };

  const bgColor = priorityColors[task.priority] || "bg-gray-200";
  const completedStyle = task.completed ? "bg-gray-300 opacity-50" : bgColor;

  return (
    <li
      className={`p-4 mb-4 rounded shadow-md transition-transform transform h-40
         hover:scale-105 ${completedStyle} flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-lg font-semibold mb-1">{task.title}</h2>
        <p className="text-sm text-gray-700 mb-2 mt-3 overflow-hidden text-ellipsis whitespace-nowrap">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          onClick={toggleComplete}
          variant="success"
          className={`text-xs px-3 py-1 rounded ${
            task.completed
              ? "bg-gray-500 hover:bg-gray-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {task.completed ? "Undo" : "Completed"}
        </Button>
        <Button
          onClick={startEditTask}
          variant="primary"
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-md transform hover:scale-110"
        >
          Edit
        </Button>
        <Button
          onClick={deleteTask}
          variant="danger"
          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
