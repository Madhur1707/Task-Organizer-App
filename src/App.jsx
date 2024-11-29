/* eslint-disable react/prop-types */
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
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
import { Button } from "./components/ui/button";

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
    <>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">Task Organizer App</h1>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>
      </header>

      <SignedOut>
        <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Task Organizer App
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Manage your tasks effortlessly. Sign in to get started!
          </p>
          <SignInButton mode="modal">
            <Button className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-violet-300">
              Get Started
            </Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="p-8 bg-gray-100">
          <div className="flex mb-4 gap-5 w-full">
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
                  {priorityFilter.charAt(0).toUpperCase() +
                    priorityFilter.slice(1)}
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
      </SignedIn>
    </>
  );
}

export default App;
