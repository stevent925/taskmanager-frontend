import React from "react";

function TaskSearch({ taskId, setTaskId, onFetch }) {
  return (
    <>
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
            onClick={onFetch}
            disabled={!taskId.trim()}
          >
            Get Task
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskSearch;
