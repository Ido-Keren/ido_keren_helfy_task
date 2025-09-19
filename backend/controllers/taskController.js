import Task from '../models/Task.js';

const getTasks = async (req, res) => {
    try {
        console.log("gettingTasks");
        const tasks = await Task.get();
        console.log(tasks);
        return res.status(200).json(tasks);
    }
    catch(error) {
        return res.status(404).json({"error": error})
    }
}

const addTask = async (req, res) => {
    
    try{
        console.log("addingTasks");
        const { title, description, priority } = req.body;

        if (!title) { return res.status(400).json({ error: 'Title is required' }) }
        if (!description) { return res.status(400).json({ error: 'description is required' }) }
        if (!priority) { return res.status(400).json({ error: 'priority is required' }) }
        
        if (priority != 'low' && priority != 'medium' && priority != 'high') {
            return res.status(403).json({ error: 'invalid priority' })
        }     
        
        const task = await Task.create(title, description, priority)
        return res.status(201).json(task);
    }
    catch(error) {
        return res.status(404).json({"error": error})
    }
}

const updateTask = async(req, res) => {
    try {
        console.log("updatingTask");
        const { id } = req.params;
        const { title, description, priority } = req.body;
        
        if (!id) { return res.status(400).json({ error: 'Id is required' }) }
        if (!title) { return res.status(400).json({ error: 'Title is required' }) }
        if (!description) { return res.status(400).json({ error: 'description is required' }) }
        if (!priority) { return res.status(400).json({ error: 'priority is required' }) }
        
        if (priority != 'low' && priority != 'medium' && priority != 'high') {
            return res.status(403).json({ error: 'invalid priority' })
        }     
        
        const task = await Task.update(id, title, description, priority);
        
        if (!task) {
            return res.status(404).json({ error: 'Id not found' })
        }
        
        return res.status(204);
    }
    catch(error) {
        return res.status(404).json({"error": error})
    }
}

const deleteTask = async(req, res) => {
    try {
        console.log("deletingTask");
        const { id } = req.params;
        
        if (!id) { return res.status(400).json({ error: 'Id is required' }) }     
        
        const task = await Task.delete(id);
        
        if (!task) {
            return res.status(404).json({ error: 'Id not found' })
        }
        
        return res.status(204);
    }
    catch(error) {
        return res.status(404).json({"error": error})
    }
}

const toggleStatus = async(req, res) => {
    try {
        console.log("togglingTask");
        const { id } = req.params;
        
        if (!id) { return res.status(400).json({ error: 'Id is required' }) }     
        
        const task = await Task.toggle(id);
        
        if (!task) {
            return res.status(404).json({ error: 'Id not found' })
        }
        
        return res.status(204);
    }
    catch(error) {
        return res.status(404).json({"error": error})
    }
}

export {getTasks, addTask, updateTask, deleteTask, toggleStatus}