import { Router } from "express";
import {
  createCategoryCon,
  deleteCategoryCon,
  getByIdCategoryCon,
  getCategoryCon,
  updateCategoryCon,
} from "../controller/index.js";
export const userRouter = Router();

export const categoryRouter = Router();

categoryRouter.get("/", getCategoryCon);
categoryRouter.post("/", createCategoryCon);
categoryRouter.get("/:id", getByIdCategoryCon);
categoryRouter.put("/:id", updateCategoryCon);
categoryRouter.delete("/:id", deleteCategoryCon);
