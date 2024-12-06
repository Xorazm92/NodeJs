import { Router } from "express";
import userRouter from "./user.routes";
import taskRouter from "./tasks.routes";

const router = Router();


router.use("/user", userRouter);
router.use("/task", taskRouter);


export default router;
