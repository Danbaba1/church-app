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

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const { user, token } = await AuthService.login(email, password);
            res.status(200).json({ message: 'Login successful', userDetails: user, token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        try {
            await AuthService.forgotPassword(email);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        const { newPassword } = req.body;
        const token = req.query.token as string;
        try {
            await AuthService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successful' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}