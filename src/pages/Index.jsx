import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Edit3 } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Todo App</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
            <ScrollArea className="h-64">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between mb-2 p-2 border rounded">
                  {editingTask === task.id ? (
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-grow mr-2"
                    />
                  ) : (
                    <span className="flex-grow">{task.text}</span>
                  )}
                  <div className="flex space-x-2">
                    {editingTask === task.id ? (
                      <Button onClick={() => saveTask(task.id)}>Save</Button>
                    ) : (
                      <Button variant="outline" onClick={() => editTask(task)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="text-center">
            <span className="text-gray-500">You have {tasks.length} tasks</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;