import { deleteImage, imageUpload, updateImage } from "#/controllars/image";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { IndexValidation } from "#/utils/validationSchema";
import { Router } from "express";
const router = Router()

router.post('/imageUpload',mustAuth,fileParser,imageUpload);
router.delete('/deleteImage',mustAuth,validate(IndexValidation),deleteImage);
router.put("/updateImage", mustAuth, fileParser,validate(IndexValidation), updateImage);
export default router;