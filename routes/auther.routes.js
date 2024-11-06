import { Router } from "express";
import {
  createAutheryCon,
  deleteAutherCon,
  getAutherCon,
  getByIdAutherCon,
  updateAutherCon,

} from "../controller/index.js";
export const userRouter = Router();

export const autherRouter = Router();


autherRouter.get("/", getAutherCon);
autherRouter.post("/", createAutheryCon);
autherRouter.get("/:id", getByIdAutherCon);
autherRouter.put("/:id", updateAutherCon);
autherRouter.delete("/:id", deleteAutherCon);
