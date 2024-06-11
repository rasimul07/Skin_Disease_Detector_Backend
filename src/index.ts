import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import "./db";
const app = express();

import authRouter from "#/routes/auth";
import photoRouter from "#/routes/image";
import userRouter from "#/routes/user";
import { PORT } from "./utils/variables";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));
app.use("/auth", authRouter);
app.use("/photo", photoRouter);
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

//ssh -i 'Ai Skinify.pem' ubundu@ec2-16-171-112-238.eu-north-1.compute.amazonaws.com   //to cunnect your cloud ubuntu machine
