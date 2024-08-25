"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import types
const JWT_SECRET = "jwtsecret";
const authmiddleware = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (!authheader || !authheader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Invalid Auth Token!"
        });
    }
    const token = authheader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({
            message: "Token verification failed"
        });
    }
};
exports.authmiddleware = authmiddleware;
