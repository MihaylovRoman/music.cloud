import express from 'express';
import cors from 'cors';
import router from './routes';



const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json())


app.use('/api', router)





const server = app.listen(PORT, () => {
    console.log('Server OK');
})
