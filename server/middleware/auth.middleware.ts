import jwt from 'jsonwebtoken';

export default function (req: any, res: any, next: any) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Вы не авторизованы.'})
        }

        // "mokawaa" - Секретный ключ
        const decoded = jwt.verify(token, 'mokawaa')
        req.user = decoded
        next()


    } catch (e) {
        res.status(401).json({ message: 'Вы не авторизованы.' })
    }
}