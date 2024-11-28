/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function TaskForm({ addTask, editTask }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    if (editTask) {
      setNewTask(editTask);
    }
  }, [editTask]);

  const handleSubmit = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({ title: "", description: "", priority: "low" });
    }
  };

  return (
    <div className="mt-4 mb-4">
      <div className="flex flex-col w-full space-y-4">
        <Input
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full h-12"
        />
        <Textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full h-40"
        />
        <Select
          value={newTask.priority}
          onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
          className="w-full"
        >
          <SelectTrigger className="h-12">
            <span>
              {newTask.priority.charAt(0).toUpperCase() +
                newTask.priority.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleSubmit}
        variant="default"
        className="w-full h-12 mt-6"
      >
        {editTask ? "Update Task" : "Add Task"}
      </Button>
    </div>
  );
}
