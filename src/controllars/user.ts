import cloudinary from "#/cloud/clouldinary";
import { RequestWithFiles } from "#/middleware/fileParser";
import { formatProfile } from "#/utils/helper";
import { RequestHandler } from "express";
import User from '#/models/user'

export const updateProfile: RequestHandler = async (
  req: RequestWithFiles,
  res
) => {
  const avatar = req.files?.avatar;
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("something went wrong, user not found!");

  if (avatar) {
    //if there is already an avatar file, we want to remove that
    if (user.avatar?.publicId) {
      await cloudinary.uploader.destroy(user.avatar?.publicId);
    }
    //upload new avatar file
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      avatar.filepath,
      {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
      }
    );
    user.avatar = { url: secure_url, publicId: public_id };
  }
  await user.save();
  res.json({ profile: formatProfile(user) });
};


