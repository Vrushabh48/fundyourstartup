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
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get("/", (req, res) => {
    return res.json({
        message: "Home Page"
    });
});
const signindata = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6)
});
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signindata.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid Data!!" });
    }
    const { email, username, password } = parseResult.data;
    const user = yield prisma.startup.create({
        email: email,
        username: username,
        password: password
    });
    console.log(user);
    return res.json({
        message: "Registered Successfully"
    });
}));
app.listen(port, () => {
    console.log(`Server is Listening to Port ${port}`);
});
