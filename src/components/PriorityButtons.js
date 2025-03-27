import React from "react";

function PriorityButtons({ selectedPriority, onSelect }) {
  const levels = ["LOW", "MEDIUM", "HIGH"];

  return (
    <div className="mb-2 mt-2">
      <label style={{ marginRight: "10px", color: "white" }}>Priority:</label>
      {levels.map((level) => (
        <button
          key={level}
          type="button"
          className={`btn btn-sm me-2 ${
            selectedPriority === level ? "btn-primary" : "btn-outline-light"
          }`}
          onClick={() => onSelect(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
}

export default PriorityButtons;
