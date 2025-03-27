import React from "react";
import { getPriorityColor } from "../utils/utils";
import TaskStatusButtons from "./TaskStatusButtons";

function TaskItem({ task, onDelete, onStatusUpdate }) {
  return (
    <li className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
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

        <TaskStatusButtons
          currentStatus={task.status}
          onStatusChange={onStatusUpdate}
          taskId={task.id}
        />
      </div>

      <button
        className="btn btn-sm btn-danger align-self-center"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
