import express from "express";
import { deleteUserController, getUserController, loginController, registerController, updateUserController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/:id", updateUserController);
router.get("/me/:id", getUserController);
router.delete("/:id", deleteUserController);

export default router;
