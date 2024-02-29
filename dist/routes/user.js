"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET || "DEFAULT_TOKEN";
const Router = express_1.default.Router();
const hasUpperCase = (str) => str.split("").some((char) => char === char.toUpperCase());
const hasSpecialChar = (str) => [...str].some((char) => '!@#$%^&*()_-+={}[]|;:"<>,.?/'.includes(char));
const hasNumber = (str) => str.split("").some((char) => "0123456789".includes(char));
const userInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8)
        .max(25)
        .refine((password) => hasUpperCase(password), {
        message: "Password must contain at least one uppercase character",
    })
        .refine((password) => hasSpecialChar(password), {
        message: "Password must contain at least one special character",
    })
        .refine((password) => hasNumber(password), {
        message: "Password must contain at least one number",
    }),
});
exports.default = Router;
