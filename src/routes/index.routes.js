import { Router } from "express";
import adsRouter from "./ads.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/ads", adsRouter);
router.use("/users", userRouter);

export default router;
