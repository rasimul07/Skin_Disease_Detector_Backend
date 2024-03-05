import { updateProfile } from '#/controllars/auth';
import { mustAuth } from '#/middleware/auth';
import { fileParser } from '#/middleware/fileParser';
import Router from 'express';
const router = Router();
router.post("/update-profile-picture", mustAuth, fileParser, updateProfile);
export default router;
