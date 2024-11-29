/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

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
      className={`p-4 mb-4 rounded shadow-md transition-transform transform h-48 w-72
       hover:scale-105 ${completedStyle} flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold mb-1">{task.title}</h2>
          <p className="text-sm text-gray-700 mb-2 mt-3 overflow-hidden text-ellipsis whitespace-nowrap">
            {task.description}
          </p>
          {/* Display Due Date */}
          {task.dueDate && (
            <p className="text-xs text-gray-500">
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="danger"
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-6 py-1 rounded"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this task? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteTask}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-2">
        <Button
          onClick={startEditTask}
          variant="primary"
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded shadow-md"
        >
          Update
        </Button>
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
      </div>
    </li>
  );
}
