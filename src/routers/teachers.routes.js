import { Router } from "express";
import {
  createTeacherController,
  deleteTeacherController,
  getAllTeacherController,
  getByIdTeacherController,
  updateTeacherController,
} from "../controllers/index.controller.js";

export const teachersRouter = new Router();

teachersRouter.post("/", createTeacherController);
teachersRouter.get("/", getAllTeacherController);
teachersRouter.get("/:id", getByIdTeacherController);
teachersRouter.put("/:id", updateTeacherController);
teachersRouter.delete("/:id", deleteTeacherController);
