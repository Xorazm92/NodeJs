import { Router } from "express";
import { createUserController, deleteUserController, getAllUserController, getByIdUserController, searchUserController, updateUserController } from "../controllers/index.controller.js";
import { checkValidatioin } from "../middlewares/index.js";
import { userSchema } from "../validations/index.js";

export const usersRouter = new Router()

usersRouter.post('/', checkValidatioin(userSchema), createUserController)
usersRouter.get('/', getAllUserController)
usersRouter.get('/search', searchUserController)
usersRouter.get('/:id', getByIdUserController)
usersRouter.put('/:id', updateUserController)
usersRouter.delete('/:id', deleteUserController)
