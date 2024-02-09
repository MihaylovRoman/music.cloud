import { Router } from 'express';
import musicController from '../controllers/music.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router()

router.post('/add', authMiddleware, musicController.addMusicInBasket)
router.post('/delete', authMiddleware, musicController.deleteMusicFromBasket)
router.get('/musicUser', authMiddleware, musicController.getAllMusicUser)
router.get('/allMusic', authMiddleware, musicController.getAll)




export default router