import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


class MusicController {

    // Метод для добавления музыки 
    async addMusicInBasket(req: any, res: any) {
        const { user_id, music_id } = req.body

        try {
            
            const user = await prisma.user.findUnique({
                where: { id: user_id }
            })
            const music = await prisma.music.findUnique({
                where: { id: music_id }
            })

            await prisma.user_list_music.create({
                data: {
                    music: { connect: { id: music_id } },
                    basket: { connect: { user_id: user_id } }
                }
            })
            return res.status(200).json({ message: 'Музыка успешно добавлена!' })

        } catch (e) {
            res.status(500).send({ message: 'Ошибка сервера: ' + e })
        }
    }
    async getAllMusicUser(req: any, res: any) {
        const { user_id } = req.body

        try {
            const fullBasketUser = await prisma.user_list_music.findMany({
                where: {
                    basket: { user_id: user_id },
                },
                include: {
                    music: true
                }
            })
            return res.status(200).json({ fullBasketUser })
        } catch (e) {
            res.status(500).send({ message: 'Ошибка сервера: ' + e })
        }
    }
    // Метод для удаления музыки 
    async deleteMusicFromBasket(req: any, res: any) {

        const { user_id, music_id } = req.body

        try {

            const user = await prisma.user.findUnique({
                where: { id: user_id }
            })
            const music = await prisma.music.findUnique({
                where: { id: music_id }
            })


            await prisma.user_list_music.deleteMany({
                where: { music_id: music_id, basket: { user_id: user_id } },
            })
            return res.status(200).json({ message: 'Музыка успешно удалена!' })

        } catch (e) {
            res.status(500).send({ message: 'Ошибка сервера: ' + e })
        }

    }

    async getAll(req:any, res:any){
        try {
            const allMusic = await prisma.all_music.findMany({
                select:{
                    music: {
                        select: {
                            id: true,
                            name:true,
                            playtime: true,
                            image: true,
                            url_music: true,
                        }
                    },
                    artist: {
                        select: {
                            artist: {
                                select: {
                                    id: true,
                                    nickname: true,
                                    image: true,
                                }
                            }
                        }
                    }
                }
            })
            
            res.status(200).json(allMusic)
        } catch (e) {
            res.status(404).json({message: "Музыка не найдена"})
        }

    }
    
}
export default new MusicController()