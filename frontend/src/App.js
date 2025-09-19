import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import taskService from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    taskService.getTasks().then(setTasks).catch(console.error);
  }, []);

  const handleCreate = async (data) => {
    await taskService.createTask({
      title: data.title,
      description: data.description,
      priority: data.priority,
    });
    const latest = await taskService.getTasks();
    setTasks(latest);
  };

  const handleUpdate = async (data) => {
    await taskService.updateTask({
      id: data.id,
      title: data.title,
      description: data.description,
      priority: data.priority,
    });
    const latest = await taskService.getTasks();
    setTasks(latest);
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await taskService.deleteTask(id);
    const latest = await taskService.getTasks();
    setTasks(latest);
  };

  const handleToggleCompleted = async (id) => {
    await taskService.toggleTask(id);
    const latest = await taskService.getTasks();
    setTasks(latest);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {editingTask ? (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTask(null)}
          submitLabel="Update Task"
        />
      ) : (
        <TaskForm onSubmit={handleCreate} submitLabel="Add Task" />
      )}
      <TaskList
        tasks={tasks}
        onStartEdit={(task) => {
          // Open an inline TaskForm prefilled for editing
          setEditingTask(task);
        }}
        onDelete={handleDelete}
        onToggleCompleted={handleToggleCompleted}
      />
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} - {t.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
