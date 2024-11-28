/* eslint-disable react/prop-types */

import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  toggleComplete,
  deleteTask,
  startEditTask,
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={() => toggleComplete(task.id)}
          deleteTask={() => deleteTask(task.id)}
          startEditTask={() => startEditTask(task.id)}
        />
      ))}
    </ul>
  );
}
