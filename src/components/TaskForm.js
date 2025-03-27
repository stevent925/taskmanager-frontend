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
    <div className="row mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
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

<PriorityButtons
  selectedPriority={priority}
  onSelect={setPriority}
/>
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
