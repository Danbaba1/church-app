import nodemailer from 'nodemailer';


export default class EmailService {
    public static readonly transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    static async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You can reset your password using the following link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        };
        await EmailService.transporter.sendMail(mailOptions);
    }
}