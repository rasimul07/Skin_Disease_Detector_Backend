import { RequestHandler } from "express";
import PasswordResetToken from "#/models/passwordResetToken";
import { verify, JwtPayload } from "jsonwebtoken";
import User from "#/models/user";
import { JWT_SECRET } from "#/utils/variables";

export const isValidPasswordResetToken: RequestHandler = async (
  req,
  res,
  next
) => {
  const { token, userId } = req.body;
  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token" });

  const matched = resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token" });

  next();
};

export const mustAuth: RequestHandler = async (req, res, next) => {
  // console.log(req.headers)
  const { authorization } = req.headers;
  const authorizationToken = authorization?.split("Bearer ")[1];
  if (!authorizationToken)
    return res.status(403).json({
      error: "Unauthorized request!!",
    });
  const payload = verify(authorizationToken, JWT_SECRET) as JwtPayload;
  const id = payload.userId;
  const user = await User.findOne({ _id: id, tokens: authorizationToken });
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    avatar: user.avatar?.url,
  };
  req.token = authorizationToken;
  next();
};

export const isVerified: RequestHandler = (req, res, next) => {
  if (!req.user.verified)
    return res.status(403).json({ error: "Please verify your email account!" });
  next();
};
