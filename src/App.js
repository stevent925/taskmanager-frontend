import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "./service/TaskService";
import "./App.css";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import TaskSearch from "./components/TaskSearch";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setTasks(response.data);
  };

  const handleCreateTask = async () => {
    if (newTask.trim() === "") {
      setError("Title is required.");
      return;
    }
    try {
      await createTask({
        title: newTask,
        description: newDescription,
        priority,
      });
      setNewTask("");
      setNewDescription("");
      setError("");
      fetchTasks();
    } catch (err) {
      setError("Failed to create task.");
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleFetchTaskById = async () => {
    try {
      const response = await getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      setTask(null);
      alert("Task not found");
    }
  };

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (error) {
      setError("Failed to update task status.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          Task Manager
        </h1>

        {/* Search Task by ID */}
        <TaskSearch
          taskId={taskId}
          setTaskId={setTaskId}
          onFetch={handleFetchTaskById}
        />

        {/* Task Details */}
        {task && (
          <div className="alert alert-info">
            <strong>ID:</strong> {task.id} <br />
            <strong>Title:</strong> {task.title} <br />
            <strong>Description:</strong> {task.description}
          </div>
        )}

        {/* Create Task */}
        <TaskForm
          newTask={newTask}
          setNewTask={(value) => {
            setNewTask(value);
            if (error) setError("");
          }}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          priority={priority}
          setPriority={setPriority}
          error={error}
          onSubmit={handleCreateTask}
        />

        {/* All Tasks */}
        <h4 style={{ color: "white" }}>All Tasks</h4>
        <ul className="list-group">
          {[...tasks]
            .sort((a, b) => {
              const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
              return (
                (priorityOrder[b.priority] || 0) -
                (priorityOrder[a.priority] || 0)
              );
            })
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
