import { AssigmentController } from "../controllers/index.js";
import { Router } from "express";
import Validators from '../middlewares/index.js'
import { authGuard, roleGuard } from "../middlewares/guard/index.js";

export const assigmentRouter = Router()

assigmentRouter.get('/getAll', AssigmentController.getAll)
assigmentRouter.get('/getOne', AssigmentController.getOne)
assigmentRouter.post('/create',authGuard, roleGuard('admin'), Validators.validateAssigment, AssigmentController.create)
assigmentRouter.put('/update/:id',authGuard, roleGuard('admin'), Validators.validateAssigment,  AssigmentController.update)
assigmentRouter.delete('/delete/:id', authGuard, roleGuard('admin'), AssigmentController.delete)