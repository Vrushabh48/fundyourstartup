import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {sign, verify} from 'jsonwebtoken'
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET is not defined in the environment variables');
})();

export const middleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const jwt = await req.headers['authorization'];
        if(!jwt){
            return res.status(401).json({
                message: "Invalid Access. Please Login."
            })
        }

        const token = jwt.split("")[1];
        const payload = await verify(token, JWT_SECRET);
        if(!payload){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        localStorage.set('userId', String(payload));
        console.log(payload);
        await next();
    } catch (error) {
        
    }
}