let currentId = 0
const tasks = [];

class Task {
  constructor(title, description, priority) {
    this.id = currentId;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
    this.priority = priority;
    currentId++;
  }

  static async create(title, description, priority) {
    console.log("hi1");
    const task = new Task(title, description, priority);
    console.log("hi");
    tasks.push(task);
    console.log("bye");
    return task;
  }

  static async get() {
    console.log(tasks);
    return tasks;
  }

  static async update(id, title, description, priority) {
    const task = tasks.find(t => t.id == id);
    if (!task) return null;
    task.title = title;
    task.description = description;
    task.priority = priority;
    return task;
  }

  static async delete(id) {
    const index = tasks.findIndex(t => t.id == id);
    
    if (index != -1) {
      return tasks.splice(index, 1)[0];
    }
    return null;
  }

  static async toggle(id) {
    const task = tasks.find(t => t.id == id);
    
    if (!task) return null;
    task.completed = !task.completed;
    return task;
  }
}

export default Task;