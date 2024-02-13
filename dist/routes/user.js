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
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db/db");
const auth_1 = require("../auth/auth");
const zod_1 = require("zod");
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET || 'DEFAULT_TOKEN';
const Router = express_1.default.Router();
const hasUpperCase = (str) => str.split('').some(char => char === char.toUpperCase());
const hasSpecialChar = (str) => [...str].some(char => '!@#$%^&*()_-+={}[]|;:"<>,.?/'.includes(char));
const hasNumber = (str) => str.split('').some(char => '0123456789'.includes(char));
const userInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8)
        .max(25)
        .refine(password => hasUpperCase(password), {
        message: 'Password must contain at least one uppercase character',
    })
        .refine(password => hasSpecialChar(password), {
        message: 'Password must contain at least one special character',
    })
        .refine(password => hasNumber(password), {
        message: 'Password must contain at least one number',
    }),
});
Router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = userInput.safeParse(req.body);
    if (result.success) {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield db_1.User.findOne({ email });
        if (user) {
            res.status(201).json({ massage: 'user Already exist' });
        }
        else {
            const obj = {
                email,
                password,
            };
            const newUser = new db_1.User(obj);
            newUser.save();
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        res
            .status(200)
            .json({ massage: 'user account created sucessfully', token: token });
        //     {
        // "email":"rasimul29928@gmail.com",
        // "password":"Rasimul1234%"
        // }
        // {
        // "success": true,
        // "data": {
        //     "email": "rasimul29928@gmail.com",
        //     "password": "Rasimul1234%"
        // }
        // }
    }
    else {
        //     {
        //     "email":"rasimul",
        //     "password":"pass"
        // }
        res.status(400).json(result);
    }
}));
Router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.User.findOne({ email, password });
    if (!user) {
        res.status(201).json({ massage: 'email or password incorrect' });
    }
    else {
        const token = jsonwebtoken_1.default.sign({ email }, secret, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        res.status(200).json({ massage: 'login sucessfully', token: token, email });
    }
}));
Router.get('/me', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ email: req.user.email });
}));
// router.put('/updateUserInfo', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const userInfo = await User.findOneAndUpdate({ email, password }, req.body, { new: true });
//     res.status(200).json({ massage: "saved successfully" });
// })
// router.get('/getUserInfo', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const user = await User.findOne({ email, password });
//     res.status(200).json(user);
// })
// Router.post('/user/addImage', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const {imgString} = req.body;
//     // const userInfo = await User.findOneAndUpdate({ email, password }, req.body, { new: true });
//     const userInfo = await ImageData.findOne({ email, password });
//     console.log(userInfo);
//     userInfo.image.push(imgString)
//     userInfo.save()
//     res.status(200).json({ massage: "saved successfully" });
// })
Router.post('/addImage', function (req, res) {
    console.log(req); // the uploaded file object
    res.sendStatus(200);
});
// app.get('/user/getUserInfo', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const user = await ImageData.findOne({ email, password });
//     res.status(200).json(user);
// })
// app.delete('/user/deleteImgData', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const user = await ImageData.findOne({ email, password });
//     const {indexToDelete} = req.body;
//     user.image.splice(indexToDelete,1);
//     user.save();
//     res.status(200).json({ massage: "deleted successfully" });
// })
// app.put('/user/updateImgData', authenticateJwt, async (req, res) => {
//     const { email, password } = req.user;
//     const user = await ImageData.findOne({ email, password });
//     const { indexToUpdate,updatedString } = req.body;
//     user.image[indexToUpdate] = updatedString;
//     user.save();
//     res.status(200).json({ massage: "updated successfully" });
// })
exports.default = Router;
