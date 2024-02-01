import { Router } from 'express';
import usersController from '../controllers/users.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router()

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth',authMiddleware, usersController.checkPass)

// Для админа
router.get('/', usersController.getAll)


export default router
