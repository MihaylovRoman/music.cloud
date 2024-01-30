import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class MusicController {
    async getAll(req: any, res: any) {

    }

    async addMusic(req: any, res: any) {
        const { author, name } = req.body

        try {

            const checkMusic = await prisma.music.findUnique({
                where: {
                    author: author,
                    name: name
                },
            })
            if (!checkMusic) return res.status(404).json({ message: 'Музыка не найдена' }) //

            return res.status(200).json({ message: 'Музыка не была добавлена' }) //


        } catch (e) {
            res.status(400).send({ message: e })
        }
    }
    async deleteMusic(req: any, res: any) {

    }
}
export default new MusicController()