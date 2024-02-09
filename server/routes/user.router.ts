import { Router } from 'express';
import usersController from '../controllers/users.controller';
import authMiddleware from '../middleware/auth.middleware';
import checkRoleMiddleware from '../middleware/checkRole.middleware';


const router = Router()

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth', authMiddleware, usersController.checkPass)

// Для админа
router.post('/deleteUser',checkRoleMiddleware("ADMIN"), usersController.deleteUser)
router.get('/getUsers',checkRoleMiddleware("ADMIN"), usersController.getAll)


export default router
