import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



const generateJwt = (id: any, login: string) => {
    return jwt.sign(
        { id, login },
        'mokawaa',
        { expiresIn: '5d' })
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
        return res.status(500).json({ message: 'Пользователей нет' })

    }

    // Метод для регистрации
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

                const hashPassword = await bcrypt.hash(password, 5)

                const checkUser = await prisma.user.create({
                    data: {
                        login: login,
                        email: email,
                        password: hashPassword
                    },
                })

                const basket = await prisma.basket.create({
                    data: {
                        user_id: checkUser.id
                    }
                })

                const token = generateJwt(checkUser.id, checkUser.login)

                return res.json(token)


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

    // Метод для авторизации
    async login(req: any, res: any, next: any) {
        const { login, password } = req.body
        if (!login || !password) return res.status(400).send({ message: 'Поля не заполнены' })

        const User = await prisma.user.findUnique({
            where: {
                login: login,
            },
        })
        if (!User) return res.status(500).send({ message: 'Пользователь не найден' })


        let checkPassword = bcrypt.compareSync(password, User.password)
        if (!checkPassword) return res.status(500).json({ message: 'Неверный логин или пароль!' })

        const token = generateJwt(User.id, User.login)
        return res.json({ token })


    }

    // Проверка на авторизованность
    async checkPass(req: any, res: any) {
        const token = generateJwt(req.user.id, req.user.login)
        return res.json(token)
    }


    //Метод для удаления пользователя - ДОСТУП ТОЛЬКО У АДМИНА
    async deleteUser(req: any, res: any) {

        try {
            const user_id = parseInt(req.params.id)
            
            

        } catch (e) {
            res.status(500).json({ message: "Ошибка удаления: " + e })
        }
    }
}
export default new UsersController()
