import { CourseController } from "../controllers/index.js";
import { Router } from "express";
import Validators from '../middlewares/index.js'
import { authGuard, roleGuard } from "../middlewares/guard/index.js";

export const courseRouter = Router()

courseRouter.get('/getAll', CourseController.getAll)
courseRouter.get('/getOne', CourseController.getOne)
courseRouter.post('/create', authGuard, roleGuard('admin'), CourseController.create)
courseRouter.put('/update/:id', authGuard, roleGuard('admin'), Validators.validateCourse, CourseController.update)
courseRouter.delete('/delete/:id', authGuard, roleGuard('admin'), CourseController.delete)