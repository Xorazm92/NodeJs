import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUser);


export default router;
