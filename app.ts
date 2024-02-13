import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL 
import userRouter from './routes/user'
const app = express();
app.use(express.json());
app.use('/user',userRouter)

export let conn:Promise<typeof mongoose>;
if(DATABASE_URL){
  conn = mongoose.connect(DATABASE_URL)
  console.log('connect server using mongoose successfully')
}else{
  console.log('server url undefined')
}
app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})