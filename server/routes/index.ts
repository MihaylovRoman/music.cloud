import { Router } from 'express';
import userRouter from './user.router';
import musicRouter from './music.router';
import checkRoleMiddleware from '../middleware/checkRole.middleware';

const router = Router()


router.use('/user', userRouter)
router.use('/music', musicRouter)


export default router
