import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';  // Import types

const JWT_SECRET = "jwtsecret";  

interface AuthRequest extends Request {
    userId?: string | JwtPayload;
}

const authmiddleware = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const authheader: string | undefined = req.headers.authorization;

    if (!authheader || !authheader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Invalid Auth Token!"
        });
    }

    const token = authheader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; 

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Token verification failed"
        });
    }
};

export { authmiddleware };