const API_URL = "http://localhost:4000/api/tasks"; // adjust if needed

const taskService = {
  async createTask(data) {
    console.log("addingTask");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  async getTasks() {
    const res = await fetch(API_URL, { method: "GET"});
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async updateTask(data) {
    const res = await fetch(`${API_URL}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  async deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  },
  async toggleTask(id) {
    const res = await fetch(`${API_URL}/${id}/toggle`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle task");
    return res.json();
  },
};

export default taskService;
