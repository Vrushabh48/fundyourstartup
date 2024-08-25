import express,{Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {ParseStatus, z} from 'zod';
import { authmiddleware } from './middlewares/middleware';
const { PrismaClient } = require('@prisma/client')
const cors = require('cors');

const JWT_SECRET: string = "jwtsecret"
const prisma = new PrismaClient()

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(cors());

const profiledata = z.object({
    startupname: z.string(),
    teamsize: z.string(),
    
})

app.get("/startup/dashboard",authmiddleware, (req:Request, res:Response)=> {
    
})

const signindata = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string()
})

// Startup signin
app.post("/signinstartup", async (req: Request, res: Response) => {
    const parseResult = signindata.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }

    const { email, username, password } = parseResult.data;

    // Handle successful sign-in logic here
    const user = await prisma.startup.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    });
    
    console.log("User Created Successfully..");
    console.log(user);

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email },  // Payload data
        JWT_SECRET,             // Secret key from environment variables
        { expiresIn: '1h' }                  // Token expiry time
    );

    // Return token in response
    res.status(200).json({
        message: "Sign-in successful",
        token: token,
        redirectUrl: "/startup/dashboard"
    });
    
});

//Investor Siginin
app.post("/signininvestor", async (req: Request, res: Response) => {
    const parseResult = signindata.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }

    const { email, username, password } = parseResult.data;

    // Handle successful sign-in logic here
    const user = await prisma.investor.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    });
    
    console.log("User Created Successfully..");
    console.log(user);

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email },  // Payload data
        JWT_SECRET,             // Secret key from environment variables
        { expiresIn: '1h' }                  // Token expiry time
    );

    // Return token in response
    res.status(200).json({
        message: "Sign-in successful",
        token: token
    });
});

app.get("/home", authmiddleware, async (req: Request, res: Response) => {

})

app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`);
})