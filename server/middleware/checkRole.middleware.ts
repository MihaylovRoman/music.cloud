import jwt from 'jsonwebtoken';
export default function (role:string) {
    return function(req: any, res: any, next: any){
        if(req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(401).json({message: "Вы не авторизованы"})
            }
            const decoded = jwt.verify(token, "mokawaa")
            
            if(decoded !== role){
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded



        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}