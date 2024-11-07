import { Router } from "express";
import { getAdminCon, getAdminByIdCon, updateAdminCon, deleteAdminCon, createAdminCon  } from "../controller/index.js";

export const userRouter = Router();

export const adminRouter = Router();


adminRouter.get("/", getAdminCon);
adminRouter.post("/", createAdminCon);
adminRouter.get("/:id", getAdminByIdCon);
adminRouter.put("/:id", updateAdminCon );
adminRouter.delete("/:id", deleteAdminCon);