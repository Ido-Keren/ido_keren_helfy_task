import React from "react";
import "../styles/TaskItem.css";

function TaskItem({ task, onStartEdit, onDelete, onToggleCompleted }) {
  return (
    <div className="card">
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </h3>
      <p>{task.description}</p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
      </p>

      <div className="buttonContainer">
        <button className="button" onClick={() => onToggleCompleted(task.id)}>
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button className="button" onClick={() => onStartEdit(task)}>
          Edit  
        </button>
        <button className="button-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}


export default TaskItem;
