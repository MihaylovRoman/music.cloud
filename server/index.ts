import express from 'express';
import UsersController from './controllers/users.controller';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config()

const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json())


app.post('/registration', UsersController.registration)

app.post('/auth', UsersController.login)



const server = app.listen(PORT, () => {
    console.log('Server OK');
})
