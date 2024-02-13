import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express';
dotenv.config()
export interface AuthenticatedRequest extends Request {
    user?: any;
}
export const authenticateJwt = (req:AuthenticatedRequest,res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN', (err, user) => {
            if (err) {
                return res.status(300).json({ message: "Authentication Failed!!!!!!!!" });;
            }
            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

