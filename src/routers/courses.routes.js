import { Router } from "express";
import {
  createCoursesController,
  deleteCoursesController,
  getAllCoursesController,
  getByIdCoursesController,
  searchCoursesController,
  updateCoursesController,
} from "../controllers/index.controller.js";
import { checkValidatioin } from "../middlewares/index.js";
import { coursesSchema } from "../validations/index.js";

export const coursesRouter = new Router();

coursesRouter.post("/", checkValidatioin(coursesSchema), createCoursesController);
coursesRouter.get("/", getAllCoursesController);
coursesRouter.get("/:id", getByIdCoursesController);
coursesRouter.get("/search", searchCoursesController);
coursesRouter.put("/:id", updateCoursesController);
coursesRouter.delete("/:id", deleteCoursesController);
