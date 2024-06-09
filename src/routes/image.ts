import { deleteImage, getImages, getPrediction, getPredictionOfAllImages, imageUpload, updateImage } from "#/controllars/image";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { IndexValidation } from "#/utils/validationSchema";
import { Router } from "express";
const router = Router()

router.post('/imageUpload',mustAuth,fileParser,imageUpload);
router.delete('/deleteImage',mustAuth,validate(IndexValidation),deleteImage);
router.put("/updateImage", mustAuth, fileParser,validate(IndexValidation), updateImage);
router.get("/getImages", mustAuth, getImages);
router.post('/getPrediction',mustAuth,getPrediction) //get prediction of single image //and update database
router.post("/getPredictionOfAllImages", mustAuth, getPredictionOfAllImages); ////get prediction of all imagse //and update database
export default router;