import express from 'express';
import { getTasks, addTask, updateTask, deleteTask, toggleStatus} from '../controllers/taskController.js';
const TaskRouter = express.Router();

TaskRouter.route("/")
    .get(getTasks)
    .post(addTask)

TaskRouter.route("/:id")
    .put(updateTask)
    .delete(deleteTask)

TaskRouter.route("/:id/toggle")
    .patch(toggleStatus)

export default TaskRouter;