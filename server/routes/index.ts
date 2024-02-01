import { Router } from 'express';
import userRouter from './user.router';
import musicRouter from './music.router';

const router = Router()


router.use('/user', userRouter)
router.use('/music', musicRouter)


export default router
