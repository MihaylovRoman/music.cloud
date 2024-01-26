import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
const prisma = new PrismaClient()
const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json())


app.post('/api', async (req, res) => {
    const {login, email, password} = req.body
    if(!login || !email || !password) 
    return res.status(400).send({message : "Поля не заполнены!"})


    try {

        const createdRow = await prisma.user.create({
            data: {
                login, email, password
            },
        })

        res.json(createdRow)
    } catch (e) {
        res.status(400).send({message: e})
    }
})

const server = app.listen(PORT, () => {
    console.log('Server OK');
})
