import React from "react";
import PriorityButtons from "./PriorityButtons";

function TaskForm({
  newTask,
  setNewTask,
  newDescription,
  setNewDescription,
  priority,
  setPriority,
  error,
  onSubmit,
}) {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
          maxLength={255}
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter task description"
            maxLength={500}
          />
          <small className="text-light">
            {500 - newDescription.length} characters remaining
          </small>
        </div>

        <PriorityButtons selectedPriority={priority} onSelect={setPriority} />
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-success w-100"
          onClick={onSubmit}
          disabled={!newTask.trim()}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
