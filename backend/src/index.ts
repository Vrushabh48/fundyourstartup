import express, { Request, Response } from 'express';
import {z} from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
const port: number = 3000;

app.get("/",(req:Request, res: Response) => {
    return res.json({
        message: "Home Page"
    })
})

const signindata = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6)
});

app.post("/signin",async (req: Request, res: Response) => {
    const parseResult = signindata.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid Data!!" });
    }

    const { email, username, password } = parseResult.data;

    const user = await prisma.startup.create({
        email: email,
        username: username,
        password: password
    });
    console.log(user);
    return res.json({
        message: "Registered Successfully"
    })
});


app.listen(port,()=>{
    console.log(`Server is Listening to Port ${port}`);
})