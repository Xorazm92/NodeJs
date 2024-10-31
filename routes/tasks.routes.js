import express from 'express';
import * as taskController from '../controllers/index.js'; 

const router = express.Router();


router.get('/', taskController.getAllTasks);


router.get('/:taskId', taskController.getTaskById);


router.post('/', taskController.createTask);


router.put('/:taskId', taskController.updateTask);


router.delete('/:taskId', taskController.deleteTask);

export default router; 

