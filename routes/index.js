import { Router } from 'express';
import userRoutes from './users.routes.js';
import taskRoutes from './tasks.routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router; 



