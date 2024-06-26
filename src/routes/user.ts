import { updateProfile } from "#/controllars/user";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import Router from "express";
const router = Router();
router.put("/update-profile-picture", mustAuth, fileParser, updateProfile);
export default router;
