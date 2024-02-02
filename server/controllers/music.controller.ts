import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


class MusicController {

    
    async getAll(req: any, res: any) {

    }



    // Метод для добавления музыки 
    async addMusic(req: any, res: any) {
        const { user_id, music_id } = req.body

        try {

            const user = await prisma.user.findUnique({
                where: { id: user_id}
            })            
            const music = await prisma.music.findUnique({
                where: { id: music_id}
            }) 

            
            await prisma.user_list_music.create({
                data: {
                    music: {connect: {id: music_id}},
                    basket: {connect: {user_id: user_id}}
                }
            })
            return res.status(200).json({message: 'Музыка успешно добавлена!'})

        } catch (e) {
            res.status(500).send({ message: 'Ошибка сервера: '+ e })
        }
    }

    // Метод для удаления музыки 
    async deleteMusic(req: any, res: any) {

        const { user_id, music_id } = req.body

        try {

            const user = await prisma.user.findUnique({
                where: { id: user_id}
            })            
            const music = await prisma.music.findUnique({
                where: { id: music_id}
            }) 

            
            await prisma.user_list_music.deleteMany({
                where: { music_id: music_id, basket: {user_id: user_id} },
              })
            return res.status(200).json({message: 'Музыка успешно удалена!'})

        } catch (e) {
            res.status(500).send({ message: 'Ошибка сервера: '+ e })
        }

    }
}
export default new MusicController()