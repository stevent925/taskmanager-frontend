import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "./service/TaskService";
import "./App.css";

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#ff4d4d";
      case "MEDIUM":
        return "#ffc107";
      case "LOW":
        return "#4caf50";
      default:
        return "#ccc";
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
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              placeholder="Enter Task ID"
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={handleFetchTaskById}
              disabled={!taskId.trim()}
            >
              Get Task
            </button>
          </div>
        </div>

        {/* Task Details */}
        {task && (
          <div className="alert alert-info">
            <strong>ID:</strong> {task.id} <br />
            <strong>Title:</strong> {task.title} <br />
            <strong>Description:</strong> {task.description}
          </div>
        )}

        {/* Create Task */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter task title"
            />
            {error && <div className="text-danger mb-2">{error}</div>}
            <input
              type="text"
              className="form-control"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter task description"
            />

            {/* Priority Buttons */}
            <div className="mb-2">
              <label style={{ marginRight: "10px", color: "white" }}>
                Priority:
              </label>
              {["LOW", "MEDIUM", "HIGH"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`btn btn-sm me-2 ${
                    priority === level ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => setPriority(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={handleCreateTask}
              disabled={!newTask.trim()}
            >
              Add Task
            </button>
          </div>
        </div>

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
              <li
                key={task.id}
                className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center"
              >
                <div className="d-flex flex-column">
                  <strong>
                    {task.title}{" "}
                    {task.priority && (
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "normal",
                          color: getPriorityColor(task.priority),
                        }}
                      >
                        ({task.priority})
                      </span>
                    )}
                  </strong>
                  <br />
                  <small style={{ color: "#e0e0e0" }}>{task.description}</small>
                  <br />

                  {/* Display and Update Task Status */}
                  <div className="mt-2">
                    <strong>Status:</strong> {task.status}
                    <br />
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(task.id, "PENDING")}
                        className={`btn btn-sm ${task.status === "PENDING" ? "btn-info" : "btn-outline-info"}`}
                      >
                        PENDING
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(task.id, "IN_PROGRESS")
                        }
                        className={`btn btn-sm ${task.status === "IN_PROGRESS" ? "btn-warning" : "btn-outline-warning"}`}
                      >
                        IN PROGRESS
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(task.id, "COMPLETED")}
                        className={`btn btn-sm ${task.status === "COMPLETED" ? "btn-success" : "btn-outline-success"}`}
                      >
                        COMPLETED
                      </button>
                    </div>
                  </div>
                </div>
                {/* Delete Button */}
                <button
                  className="btn btn-sm btn-danger align-self-center"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
