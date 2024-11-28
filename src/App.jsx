/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { toast } from "sonner";

function App({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask) => {
    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId
          ? { ...newTask, completed: task.completed, id: task.id }
          : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      toast.success("Task updated successfully!");
    } else {
      const updatedTasks = [
        ...tasks,
        { ...newTask, completed: false, id: Date.now() },
      ];
      setTasks(updatedTasks);
      toast.success("Task added successfully!");
    }
  };

  const startEditTask = (id) => {
    setEditTaskId(id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    toast.success("Task status updated!");
  };

  const filteredTasks = (tasks || [])
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.completed !== b.completed) {
        return a.completed - b.completed;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="p-8">
      <div className="flex mb-4 gap-5 w-full">
        <h1 className="text-violet-500 text-2xl font-bold mb-3">
          Task Management App
        </h1>
        {/* <h3 className="text-violet-500 text-2xl font-bold mb-3 ml-auto hidden md:block">
          Stay Lit 🔥 Stay Organized! 💻
        </h3> */}
      </div>

      <div className="flex mb-4 gap-5">
        <Input
          placeholder="Type for search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12"
        />

        <Select
          value={priorityFilter}
          onValueChange={(value) => setPriorityFilter(value)}
          className="w-full"
        >
          <SelectTrigger className="h-12">
            <span>
              {priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <TaskForm
            addTask={addTask}
            editTask={
              editTaskId !== null
                ? tasks.find((task) => task.id === editTaskId)
                : null
            }
          />
        </div>

        <div className="w-full md:w-2/3">
          <TaskList
            tasks={filteredTasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditTask={startEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
