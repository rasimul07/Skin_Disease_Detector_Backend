import { Router } from "express";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIDValidation,
  updatePasswordSchema,
} from "#/utils/validationSchema";
import {
  create,
  generateForgetPasswordLink,
  grantValid,
  logOut,
  sendProfile,
  // sendProfile,
  sendVerificationToken,
  signIn,
  updatePassword,
} from "#/controllars/auth";
import { verifyEmail } from "#/controllars/auth";
import { isValidPasswordResetToken, mustAuth } from "#/middleware/auth";
const router = Router();

router.post("/create", validate(CreateUserSchema), create); //create new user and send to token to mail and save encrypt token to Database temporarily
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail); //verify user input token and Database token for the perticular user securely by using bcript // and delete the token from DB
router.post("/re-verify-email", sendVerificationToken); //to reVerify email //process similar to "/create" but this process only for valid user(already have account)
router.post("/forget-password", generateForgetPasswordLink); //generate random token using crypto and send it to user resistered mail
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPasswordResetToken,
  grantValid
); //used in script.js
router.post(
  "/update-password",
  validate(updatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
); //used in script.js
router.post("/sign-in", validate(SignInValidationSchema), signIn);
router.post("/log-out", mustAuth, logOut);
router.get("/is-auth", mustAuth, sendProfile);
export default router;
