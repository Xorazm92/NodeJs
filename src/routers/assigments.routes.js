import { Router } from "express";
import { createAssigmentController, deleteAssigmentController, getAllAssigmentController, getByIdAssigmentController, updateAssigmentController } from "../controllers/index.controller.js";

export const assigmentsRouter = new Router();

assigmentsRouter.post("/", createAssigmentController);
assigmentsRouter.get("/", getAllAssigmentController);
assigmentsRouter.get("/:id", getByIdAssigmentController);
assigmentsRouter.put("/:id", updateAssigmentController);
assigmentsRouter.delete("/:id", deleteAssigmentController);
