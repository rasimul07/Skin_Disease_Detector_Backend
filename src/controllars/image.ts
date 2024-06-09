import cloudinary from "#/cloud/clouldinary";
import { RequestWithFiles } from "#/middleware/fileParser";
import { RequestHandler } from "express";
import formidable from "formidable";
import User from "#/models/user";
import Photo from "#/models/photo";
import { prediction } from "#/prediction/prediction";
interface CreateImageRequest extends RequestWithFiles {
  body: {
    index: number;
  };
}
export const imageUpload: RequestHandler = async (
  req: RequestWithFiles,
  res
) => {
  const imageFile = req.files?.file as formidable.File;
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("something went wrong, user not found!");

  let url, publicId;
  const photo = await Photo.findOne({ owner: req.user.id });
  if (imageFile) {
    const photoRes = await cloudinary.uploader.upload(imageFile.filepath);

    if (!photo) {
      const file = [
        {
          url: photoRes.secure_url,
          publicId: photoRes.public_id,
          prediction:null
        },
      ];
      await Photo.create({
        owner: req.user.id,
        file,
      });
    } else {
      photo.file.unshift({
        url: photoRes.secure_url,
        publicId: photoRes.public_id,
        prediction: null,
      });
      await photo.save();
    }
    url = photoRes.secure_url;
    publicId = photoRes.public_id;
  }

  res.status(201).json({
    image: {
      url,
      publicId,
    },
  });
};

export const deleteImage: RequestHandler = async (req, res) => {
  const { index } = req.body;
  const ind = Number(index);
  const photo = await Photo.findOne({ owner: req.user.id });
  if (!photo) return res.status(400).json({ error: "No photos available!!" });
  if (photo) {
    const publicId = photo.file[ind].publicId;
    photo.file.splice(ind, 1);
    await photo.save();
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }
  res.status(200).json({ message: "Deleted successfully" });
};
export const updateImage: RequestHandler = async (
  req: CreateImageRequest,
  res
) => {
  const { index } = req.body;
  const ind = Number(index);
  const imageFile = req.files?.file as formidable.File;
  const photo = await Photo.findOne({ owner: req.user.id });
  if (!photo) return res.status(400).json({ error: "No photos available!!" });
  if (photo && imageFile) {
    const photoRes = await cloudinary.uploader.upload(imageFile.filepath, {
      width: 225,
      height: 225,
      // crop: "thumb",
      // gravity: "face",
    });
    let publicId;
    try {
      publicId = photo.file[ind].publicId;
    } catch (error) {
      return res.status(400).json({ error: "PublicId not found!!" });
    }
    photo.file.splice(ind, 1, {
      url: photoRes.secure_url,
      publicId: photoRes.public_id,
      prediction: null,
    });
    await photo.save();
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.status(200).json({ message: "Photo Update successfull" });
  } else {
    res.status(200).json({ error: "Photo Update unsuccessfull!!" });
  }
};

export const getImages: RequestHandler = async (req, res) => {
  const photo = await Photo.findOne({ owner: req.user.id });
  if(!photo){
    return res.status(200).json({ photos: [] });
  }
  res.status(200).json({ photos: photo.file });
};


export const getPrediction: RequestHandler = async (req, res) => {
  const {index} = req.body;
  try {
    const photos = await Photo.findOne({ owner: req.user.id });
    console.log(photos)
    if(photos){
      const photourl = photos.file[index].url;
      const publicId = photos.file[index].publicId;
      const predicted_class = await prediction(photourl);
       photos.file.splice(index, 1, {
         url: photourl,
         publicId,
         prediction: predicted_class,
       });
      await photos.save();
      res.status(200).json({predicted_class})
    }else{
      res.json({ error: "photos not found" });
    }
  } catch (error) {
    res.json({ error });
  }
};
export const getPredictionOfAllImages: RequestHandler = async (req, res) => {
  const { index } = req.body;
  try {
    const photos = await Photo.findOne({ owner: req.user.id });
    if (photos) {
      const photourl = photos.file[index].url;
      const predicted_class = await prediction(photourl);
      res.status(200).json({ predicted_class });
    } else {
      res.json({ error: "photo not found" });
    }
  } catch (error) {
    res.json({ error });
  }
};



