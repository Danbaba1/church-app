import 'dotenv/config';
import express, { Request, Response } from "express";
import "./db";
import authRoutes from "./routes/authRoutes";


const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Church App API',
    })
})

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})