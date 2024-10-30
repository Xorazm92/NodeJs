import express from 'express';
import { categoryController } from '../controllers/index.js';

export const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.delete('/:id', categoryController.deleteCategory);



