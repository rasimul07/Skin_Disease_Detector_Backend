import { Model, ObjectId, Schema, model, models } from "mongoose";

export interface PhotoDocument {
  owner: ObjectId;
  file: [{
    url: string;
    publicId: string;
  }];
}

const PhotoSchema = new Schema<PhotoDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    file: [{
      type: Object,
      url: String,
      publicId: String,
    }]
  },
  { timestamps: true }
);

const Photo = models.Photo || model("Photo", PhotoSchema); //this line means --> if i already have models.Audio we will use that if not the we will create new model
export default Photo as Model<PhotoDocument>;
