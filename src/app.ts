import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./db";
const app = express();
const PORT = process.env.PORT || 5789;

import authRouter from "#/routes/auth";
import photoRouter from "#/routes/image";
import userRouter from '#/routes/user';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'))
app.use("/auth", authRouter);
app.use("/photo", photoRouter);
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
