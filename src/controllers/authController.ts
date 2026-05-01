import { Request, Response } from "express";
import AuthService from "../services/authService";

export default class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const { userDetails, churchDetails } = req.body;
        try {
            const user = await AuthService.register(userDetails, churchDetails);
            res.status(201).json({ message: 'User registered successfully', userDetails: user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}