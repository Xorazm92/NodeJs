import { Router } from 'express';
import * as userController from '../controllers/index.js'; 

const router = express.Router();


router.get('/', userController.getAllUsers);


router.get('/:userId', userController.getUserById);


router.post('/', userController.createUser);


router.put('/:userId', userController.updateUser);


router.delete('/:userId', userController.deleteUser);

export default router; 

