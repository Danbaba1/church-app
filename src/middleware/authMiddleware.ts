import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserAccount from "../models/UserAccount";

export default class AuthMiddleware {
    static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as any;
            const user = await UserAccount.query().findById(decoded.userId).withGraphFetched('church');
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return;
            }
            req.user = user;
            next();
        } catch (err: any) {
            console.error('Token verification failed:', err);
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}