import { Router } from 'express'
import { authController } from '../controllers/index.js'
import { authGuard, roleGuard } from '../middlewares/index.js'


export const authRouter = express.Router()

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/profile', authGuard, roleGuard('admin'), authController.profile);




