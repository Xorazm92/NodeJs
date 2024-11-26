import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  getAllStudentController,
  getByIdStudentController,
  updateStudentController,
} from "../controllers/index.controller.js";

export const studentsRouter = new Router();

studentsRouter.post("/", createStudentController);
studentsRouter.get("/", getAllStudentController);
studentsRouter.get("/:id", getByIdStudentController);
studentsRouter.put("/:id", updateStudentController);
studentsRouter.delete("/:id", deleteStudentController);
