import express from "express";
import userRouter from "#/routes/user";
import imageRouter from "#/routes/image"
import  {PORT} from "#/utils/variable";
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
