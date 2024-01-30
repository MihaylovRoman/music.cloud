import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const generateJwt = (id: any, login: string) => {
    return jwt.sign(
        {id, login}, 
        'key',
        {expiresIn: '7d'}

        )//////Здесь я остановился!
}


class UsersController {
    async getAll(req: any, res: any) {

        const Users = await prisma.user.findMany({
            select: {
                login: true,
                email: true,
            }
        })
        if (Users) {
            return res.status(200).json(Users)
        }
        return res.status(404).json({ message: 'Пользователей нет' })

    }

    async registration(req: any, res: any) {
        const { login, email, password } = req.body
        if (!login || !password || !email) return res.status(400).send({ message: 'Поля не заполнены' })

        try {

            const candidateLogin = await prisma.user.findUnique(
                {
                    where: {
                        login: login,
                    }
                })
            const candidateEmail = await prisma.user.findUnique(
                {
                    where: {
                        email: email,
                    }
                })
            if (!candidateLogin && !candidateEmail) {
                const checkUser = await prisma.user.create({
                    data: {
                        login: login,
                        email: email,
                        password: password
                    },
                })
                if (checkUser){
                    const hashPassword = await bcrypt.hash(password, 5)
                }
                    

            }
            else if (candidateLogin) {
                return res.status(404).json({ message: 'Пользователь с таким Логином существует' })
            }
            else if (candidateEmail) {
                return res.status(404).json({ message: 'Пользователь с таким Email существует' })
            }



        } catch (e) {
            res.status(400).send({ message: e })
        }
    }
    async login(req: any, res: any, next:any) {
        const { login, password } = req.body
        if (!login || !password) return res.status(400).send({ message: 'Поля не заполнены' })

        const User = await prisma.user.findUnique({
            where: {
                login: login,
            },
        })
        if(User) return next.status(500).send({message: 'Пользователь не найден'})
        
    }
    async deleteUser(req: any, res: any) {

    }
}
export default new UsersController()
