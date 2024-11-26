import { Router } from "express";
import { createHomeworkController, deleteHomeworkController, getAllHomeworkController, getByIdHomeworkController, searchHomeworkController, updateHomeworkController } from "../controllers/index.controller.js";
import { checkValidatioin } from "../middlewares/index.js";
import { homeworkSchema} from "../validations/index.js";

export const homeworkRouter = new Router();

homeworkRouter.post("/", checkValidatioin(homeworkSchema), createHomeworkController);
homeworkRouter.get("/", getAllHomeworkController);
homeworkRouter.get("/:id", getByIdHomeworkController);
homeworkRouter.get("/search", searchHomeworkController);
homeworkRouter.put("/:id", updateHomeworkController);
homeworkRouter.delete("/:id", deleteHomeworkController);
