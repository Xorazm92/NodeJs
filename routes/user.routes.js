import express from 'express';
import { getUser, login, register } from '../controllers/user.controller.js';

export  const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/:id', getUser);



