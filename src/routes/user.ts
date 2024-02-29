import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
import { z, ZodError } from "zod";
dotenv.config();
const secret = process.env.TOKEN_SECRET || "DEFAULT_TOKEN";
const Router = express.Router();

const hasUpperCase = (str: string) =>
  str.split("").some((char) => char === char.toUpperCase());
const hasSpecialChar = (str: string) =>
  [...str].some((char) => '!@#$%^&*()_-+={}[]|;:"<>,.?/'.includes(char));
const hasNumber = (str: string) =>
  str.split("").some((char) => "0123456789".includes(char));
const userInput = z.object({
  email: z.string().email(),
  password: z
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

// Router.post('/signup', async (req, res) => {
//   const result = userInput.safeParse(req.body)

//   if(result.success){
//       const email = req.body.email;
//       const password = req.body.password;
//       const user = await User.findOne({email});
//       if (user) {
//         res.status(201).json({massage: 'user Already exist'});
//       } else {
//         const obj = {
//           email,
//           password,
//         };
//         const newUser = new User(obj);
//         newUser.save();
//       }
//       const token = jwt.sign({email}, secret, {
//         algorithm: 'HS256',
//         expiresIn: '24h',
//       });
//       res
//         .status(200)
//         .json({massage: 'user account created sucessfully', token: token});

//     //     {
//     // "email":"rasimul29928@gmail.com",
//     // "password":"Rasimul1234%"
//     // }

//     // {
//     // "success": true,
//     // "data": {
//     //     "email": "rasimul29928@gmail.com",
//     //     "password": "Rasimul1234%"
//     // }
//     // }
//   }else{
// //     {
// //     "email":"rasimul",
// //     "password":"pass"
// // }
//     res.status(400).json(result)
//   }
// });

// Router.post('/signin', async (req, res) => {
//   const {email, password} = req.body;
//   const user = await User.findOne({email, password});
//   if (!user) {
//     res.status(201).json({massage: 'email or password incorrect'});
//   } else {
//     const token = jwt.sign({email}, secret, {
//       algorithm: 'HS256',
//       expiresIn: '24h',
//     });
//     res.status(200).json({massage: 'login sucessfully', token: token, email});
//   }
// });

// Router.get(
//   '/me',
//   authenticateJwt,
//   async (req: AuthenticatedRequest, res: Response) => {
//     res.status(200).json({email: req.user.email});
//   },
// );

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

// Router.post('/addImage', function(req, res) {
//   console.log(req); // the uploaded file object
//   res.sendStatus(200);
// });

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
export default Router;
