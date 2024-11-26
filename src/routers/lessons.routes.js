import { Router } from "express";
import { createLessonsController, deleteLessonsController, getAllLessonsController, getByIdLessonsController, searchLessonsController, updateLessonsController } from "../controllers/index.controller.js";
import { checkValidatioin } from "../middlewares/index.js";
import { lessonSchema } from "../validations/index.js";

export const lessonsRouter = new Router();

lessonsRouter.post("/", checkValidatioin(lessonSchema), createLessonsController);
lessonsRouter.get("/", getAllLessonsController);
lessonsRouter.get("/:id", getByIdLessonsController);
lessonsRouter.get("/search", searchLessonsController);
lessonsRouter.put("/:id", updateLessonsController);
lessonsRouter.delete("/:id", deleteLessonsController);
