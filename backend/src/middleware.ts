// Middleware file

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET is not defined in the environment variables');
})();

export const usermiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                message: "Invalid Access. Please Login."
            });
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, JWT_SECRET) as Record<string, any>;

        if (!payload) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Attach payload to req object
        req.payload = payload;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Auth Error."
        });
    }
};
