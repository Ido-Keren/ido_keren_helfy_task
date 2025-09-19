import express from 'express';
import TaskRouter from './routes/task.js';
import cors from 'cors';
const app = express();
const PORT = 4000;

app.use(cors())
app.use(express.json())

app.use("/api/tasks", TaskRouter);

app.listen(PORT, () => {
    console.log("started server on port 4000");
})