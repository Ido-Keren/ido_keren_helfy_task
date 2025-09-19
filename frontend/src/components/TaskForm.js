import React, { useState, useEffect } from "react";
import "../styles/TaskForm.css";

function TaskForm({ initialTask, onSubmit, onCancel, submitLabel = "Save" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setPriority(initialTask.priority || "medium");
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const payload = {
      title,
      description,
      priority,
      id: initialTask?.id,
      completed: initialTask?.completed,
    };
    await onSubmit?.(payload);
    if (!initialTask) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />
      <input
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="actions">
        <button type="submit" className="button">
          {submitLabel}
        </button>
        {onCancel && (  
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;


