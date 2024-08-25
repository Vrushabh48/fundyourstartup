"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const middleware_1 = require("./middlewares/middleware");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const JWT_SECRET = "jwtsecret";
const prisma = new PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(cors());
app.get("/startup/dashboard", (req, res) => {
    res.json({
        message: "Home Page"
    });
});
const signindata = zod_1.z.object({
    email: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
// Startup signin
app.post("/signinstartup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signindata.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }
    const { email, username, password } = parseResult.data;
    // Handle successful sign-in logic here
    const user = yield prisma.startup.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    });
    console.log("User Created Successfully..");
    console.log(user);
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, // Payload data
    JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expiry time
    );
    // Return token in response
    res.status(200).json({
        message: "Sign-in successful",
        token: token,
        redirectUrl: "/startup/dashboard"
    });
}));
//Investor Siginin
app.post("/signininvestor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signindata.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }
    const { email, username, password } = parseResult.data;
    // Handle successful sign-in logic here
    const user = yield prisma.investor.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    });
    console.log("User Created Successfully..");
    console.log(user);
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, // Payload data
    JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expiry time
    );
    // Return token in response
    res.status(200).json({
        message: "Sign-in successful",
        token: token
    });
}));
app.get("/home", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`);
});
