import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAccount from '../models/UserAccount';
import ChurchAccount from '../models/ChurchAccount';
import EmailService from './emailService';

export default class AuthService {
    static async register(
        userDetails: { email: string; password: string; firstName: string; lastName: string; telephone: string; gender: string; dateOfBirth: string },
        churchDetails: { churchName: string; churchAddress: string }
    ): Promise<UserAccount> {
        return await ChurchAccount.transaction(async trx => {
            const existingChurch = await ChurchAccount.query(trx).findOne({ name: churchDetails.churchName });
            if (existingChurch) {
                throw new Error('Church with that name already exists');
            }
            const existingUser = await UserAccount.query(trx).findOne({ email: userDetails.email });
            if (existingUser) {
                throw new Error('User with that email already exists');
            }
            const church = await ChurchAccount.query(trx).insertAndFetch({ name: churchDetails.churchName, address: churchDetails.churchAddress } as any);
            const user = await UserAccount.query(trx).insert({
                church_id: church.id,
                email: userDetails.email,
                password_hash: await bcrypt.hash(userDetails.password, 10),
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                telephone: userDetails.telephone,
                gender: userDetails.gender,
                date_of_birth: userDetails.dateOfBirth,
            } as any);
            const result = await UserAccount.query(trx)
                .withGraphFetched('church')
                .findById(user.id);
            return result as UserAccount;
        });
    };

    static async login(email: string, password: string): Promise<{ user: UserAccount; token: string }> {
        const user = await UserAccount.query().findOne({ email }).withGraphFetched('church');
        if (!user) {
            throw new Error('Invalid user credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid user credentials');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as any);
        return { user, token };
    }

    static async forgotPassword(email: string): Promise<void> {
        const user = await UserAccount.query().findOne({ email });
        if (!user) {
            throw new Error('User with that email does not exist');
        }
        // Here you would typically generate a password reset token and send it to the user's email
        // For example:
        const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
        // Send email with reset link containing the token
        await EmailService.sendPasswordResetEmail(email, resetToken);
    }

    static async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as { userId: number };
            if (!decoded.userId) {
                throw new Error('Invalid token');
            }
            const user = await UserAccount.query().findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await UserAccount.query().patchAndFetchById(decoded.userId, { passwordHash: hashedPassword });
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                console.error('Reset token expired:', error);
                throw new Error('Reset token has expired');
            }

            if (error.name === 'JsonWebTokenError') {
                console.error('Invalid reset token:', error);
                throw new Error('Invalid reset token');
            }
            throw error;

        }
    }

}
