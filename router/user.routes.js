import { Router } from "express";
import {
    createUserCon,
    deleteUserCon ,
  getUserCon,
  getUserByIdCon,
  updateUserCon,

} from "../controller/index.js";
export const userRouter = Router();

export const useriRouter = Router();


useriRouter.get("/", getUserCon);
useriRouter.post("/", createUserCon);
useriRouter.get("/:id", getUserByIdCon);
useriRouter.put("/:id", updateUserCon);
useriRouter.delete("/:id", deleteUserCon );
