import { Router } from 'express';
import musicController from '../controllers/music.controller';

const router = Router()

router.post('/add', musicController.addMusicInBasket)
router.post('/delete', musicController.deleteMusic)




export default router