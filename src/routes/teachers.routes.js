import { TeachersController } from "../controllers/index.js";
import { Router } from "express";
import Validators from '../middlewares/index.js'
import { authGuard, roleGuard } from "../middlewares/guard/index.js";

export const teachersRouter = Router()

teachersRouter.get('/getAll', TeachersController.getAll)
teachersRouter.get('/getOne', TeachersController.getOne)
teachersRouter.post('/create', authGuard, roleGuard('admin'), Validators.validateTeacher, TeachersController.create)
teachersRouter.put('/update/:id', authGuard, roleGuard('admin'), Validators.validateTeacher, TeachersController.update)
teachersRouter.delete('/delete/:id', authGuard, roleGuard('admin'), TeachersController.delete)