export * from "./auth.routes.js"
export * from "./profile.routes.js"
export * from "./debt.routes.js"

import express from "express";
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';
import { getDebts, createDebt, getDebt, updateDebt, deleteDebt } from '../controllers/debt.controller.js';
import { loginMiddleware, registerMiddleware } from '../middleware/auth.middleware.js'

export const authRouter = express.Router()
export const profileRouter = express.Router()
export const debtRouter = express.Router()

authRouter.post("/register", registerMiddleware, registerController)
authRouter.post("/login", loginMiddleware, loginController)
authRouter.get("/logout/:id", logoutController)

profileRouter.get("/:id", getProfile)
profileRouter.put("/:id", updateProfile)
profileRouter.delete("/:id", deleteProfile)

debtRouter.get("/", getDebts)
debtRouter.post("/", createDebt)
debtRouter.get("/:id", getDebt)
debtRouter.put("/:id", updateDebt)
debtRouter.delete("/:id", deleteDebt)