import { Router } from "express";
import { createTask, deleteTask, getAllTask, getOneTask, updateTask } from "../controllers/tasks.controller";


const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.get("/:id", getOneTask);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
