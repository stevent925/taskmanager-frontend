import React from "react";

function TaskStatusButtons({ currentStatus, onStatusChange, taskId }) {
  const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  return (
    <div className="mt-2">
      <strong>Status:</strong> {currentStatus}
      <br />
      <div className="d-flex gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(taskId, status)}
            className={`btn btn-sm ${
              currentStatus === status
                ? getButtonClass(status)
                : getOutlineButtonClass(status)
            }`}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}

// Optional: Style mapping for clarity
function getButtonClass(status) {
  switch (status) {
    case "PENDING":
      return "btn-info";
    case "IN_PROGRESS":
      return "btn-warning";
    case "COMPLETED":
      return "btn-success";
    default:
      return "btn-secondary";
  }
}

function getOutlineButtonClass(status) {
  switch (status) {
    case "PENDING":
      return "btn-outline-info";
    case "IN_PROGRESS":
      return "btn-outline-warning";
    case "COMPLETED":
      return "btn-outline-success";
    default:
      return "btn-outline-secondary";
  }
}

export default TaskStatusButtons;
