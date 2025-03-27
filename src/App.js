import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  getAllTasks,
  getTasksByTitle,
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
  const [matchedTasks, setMatchedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
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

const handleSearchByTitle = async () => {
  const title = taskTitle.trim();
  if (!title) return;

  try {
    const response = await getTasksByTitle(title);
    setMatchedTasks(response.data);
    setTask(null);
  } catch (error) {
    setMatchedTasks([]);
    alert("No matching tasks found.");
  }
};

  const handleStatusUpdate = async (taskTitle, status) => {
    try {
      await updateTaskStatus(taskTitle, status);
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

        {/* Search Task by Title */}
        <TaskSearch
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          onFetch={handleSearchByTitle}
        />
{matchedTasks.length > 0 && (
  <div className="alert alert-info position-relative">
<button
  className="btn position-absolute top-0 end-0 m-2 p-1"
  style={{
    backgroundColor: "transparent",
    border: "none",
    color: "#000",
    fontSize: "1.25rem",
    lineHeight: "1",
  }}
  onClick={() => setMatchedTasks([])}
  aria-label="Clear results"
>
  <i className="bi bi-x-lg"></i>
</button>

    <strong>Matching Tasks:</strong>
    <ul className="mt-2">
      {matchedTasks.map((t) => (
        <li key={t.id}>
          <strong>ID:</strong> {t.id} <br />
          <strong>Title:</strong> {t.title} <br />
          <strong>Description:</strong> {t.description}
          <hr />
        </li>
      ))}
    </ul>
  </div>
)}

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
