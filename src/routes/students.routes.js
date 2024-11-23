import { StudentsController } from "../controllers/index.js";
import { Router } from "express";
import Validators from '../middlewares/index.js'
import { authGuard, roleGuard } from "../middlewares/guard/index.js";

export const studentsRouter = Router()

studentsRouter.get('/getAll', StudentsController.getAll)
studentsRouter.get('/getOne', StudentsController.getOne)
studentsRouter.post('/create', authGuard, roleGuard('admin'), Validators.validateStudent, StudentsController.create)
studentsRouter.put('/update/:id', authGuard, roleGuard('admin'), Validators.validateStudent, StudentsController.update)
studentsRouter.delete('/delete/:id', authGuard, roleGuard('admin'), StudentsController.delete)