import express, { Request, Response } from "express";
import db  from "./db";
import 'dotenv/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Church App API',
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})