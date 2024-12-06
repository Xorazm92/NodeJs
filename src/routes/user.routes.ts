import { Router } from "express";
import {
  getAllData,
  getOneData,
  createData,
  updateData,
  deleteData,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllData);
userRouter.get("/:id", getOneData);
userRouter.post("/", createData);
userRouter.put("/:id", updateData);
userRouter.delete("/:id", deleteData);

export default userRouter;
