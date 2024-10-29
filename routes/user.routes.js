import express from 'express';
import {userController} from '../controllers/index.js';

export  const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/:id', userController.getUser);



