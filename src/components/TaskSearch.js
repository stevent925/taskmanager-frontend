import React from "react";

function TaskSearch({ taskTitle, setTaskTitle, onFetch }) {
  return (
    <>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Search by task title"
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-success w-100"
            onClick={onFetch}
            disabled={!taskTitle.trim()}
          >
            Get Task
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskSearch;
