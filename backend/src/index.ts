import express, { Request, Response } from 'express';
import cors from 'cors';  
import zod from 'zod';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {sign, verify} from 'jsonwebtoken'
import { usermiddleware } from './middleware';
dotenv.config();

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

//prisma client
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());



const app = express();
app.use(express.json());
app.use(cors());

const port: number = 3000;

const JWT_SECRET: string = process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET is not defined in the environment variables');
})();


// Zod schema for validating signup body
const signupBody = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    phone: zod.string().min(10, "Phone number is required"),
    gender: zod.enum(['male', 'female', 'other']).optional(),
});

app.get('/', (req, res) => {
    res.send("Home Page");
});

// User signup route
app.post('/signup', async (req: Request,res: Response):Promise<any> => {
    const body =await req.body;
    const {success} = await signupBody.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Inputs! Please try again."
        })
    }
    try {
        const user = await prisma.user.create({
            data:{
                name: body.name,
                email: body.email,
                phone: body.phone,
                password: body.password,
                gender: body.gender
            }
        })
        const jwt = await sign({id: user.id}, JWT_SECRET);
        return res.json({
            token: jwt
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error during Signup"
        })
    }
});
//login body validation
const loginBody = zod.object({
    email: zod.string(),
    password: zod.string()
})

//login route
app.post('/login', async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    const {success} = loginBody.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Inputs"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if(!user){
        return res.status(400).json({
            message: "User Not Found."
        })
    }

    const jwt = await sign({id: user.id}, JWT_SECRET);
    return res.json({
        token: jwt
    })
})

//startup register body
const registerBody = zod.object({
    startupname: zod.string(),
    startupemail: zod.string(),
    password: zod.string(),
    founder: zod.string(),
    foundedin: zod.string(),
    stage: zod.string(),
    employees: zod.string(),
    sector: zod.string(),
    description: zod.string(),
    revenuemodel: zod.string(),
    profits: zod.string(),
    previousfunds: zod.string(),
    cashburnt: zod.string(),
    fundamount: zod.string(),
    valuation: zod.string(),
    equityratio: zod.string()
})

//startup register route
app.post('/startup-register', async (req: Request, res: Response): Promise<any> => {
    const body = await req.body;
    const {success} = await registerBody.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Inputs"
        })
    }
    try {
        const startup = await prisma.startup.create({
            data:{
                startupname: body.startupname,
                startupemail: body.startupemail,
                password: body.password,
                founder: body.founder,
                foundedin: body.foundedin,
                stage: body.stage,
                employees: body.employees,
                sector: body.sector,
                description: body.description,
                revenuemodel: body.revenuemodel,
                profits: body.profits,
                previousfunds: body.previousfunds,
                cashburnt: body.cashburnt,
                fundamount: body.fundamount,
                valuation: body.valuation,
                equityratio: body.equityratio
            }
        })
        const jwt = await sign({id: startup.id}, JWT_SECRET);
        return res.json({
            token: jwt
        })

    } catch (error) {
        return res.status(403).json({
            message: "Error occured during registration"
        })
    }
})

const startupLogin = zod.object({
    startupemail: zod.string(),
    password: zod.string()
})

//startup login
app.post('/startup-login', async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    const {success} = await startupLogin.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Invalid Inputs"
        })
    }
    const startup = await prisma.startup.findUnique({
        where: {
            startupemail: body.startupemail,
            password: body.password
        }
    })
    if(!startup){
        return res.status(400).json({
            message: "User Not Found."
        })
    }
    const jwt = await sign({id: startup.id}, JWT_SECRET);
    return res.json({
        token: jwt
    })
});

//to output the payload 
declare global {
    namespace Express {
        interface Request {
            payload?: Record<string, any>;  // Adjust the type as needed
        }
    }
}

app.get('/get-userdata', usermiddleware,async (req: Request, res: Response) => {
    const payload = req.payload;

    res.status(200).json({
        message: "Successfully retrieved payload",
        payload: payload  // Respond with the payload
    });
})

app.get('/get-startupdata', async (req: Request, res: Response)=> {
    try {
        const details = await prisma.startup.findMany();
        res.json({
            data: details
        })
    } catch (error) {
        
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
