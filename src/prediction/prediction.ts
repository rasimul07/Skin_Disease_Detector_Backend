import tf from '@tensorflow/tfjs';
import Jimp from "jimp";
import { CLASS_NAMES_137 } from './classes';

//load model function
async function loadModel() {
    const model = await tf.loadLayersModel(
      "http://127.0.0.1:5789/10_class_MobileNet_tfjs_model/model.json"
    );
    return model;
}

export const prediction = async(imageUrl:string)=>{
  const model = await loadModel();
  const image = await Jimp.read(imageUrl);
  // console.log(image)

  // Resize the image if needed (optional)
  image.resize(224, 224);

  // Get the image dimensions
  const { width, height } = image.bitmap;

  // Create an array to hold the pixel data
  const imageData = new Uint8Array(width * height * 3);

  let index = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      imageData[index++] = pixel.r;
      imageData[index++] = pixel.g;
      imageData[index++] = pixel.b;
    }
  }

  // Create a tensor from the pixel data
  const imageTensor = tf.tensor3d(imageData, [height, width, 3]);

  // Normalize the image data to the range [0, 1]
  const normalizedImageTensor = imageTensor.div(tf.scalar(255)).expandDims();
  //   console.log(normalizedImageTensor.shape);
  const predict = model.predict(normalizedImageTensor) as tf.Tensor;
  // console.log(predict);
  const predictedClassIndex = (await predict.argMax(-1).data())[0];
  const predictedClass = CLASS_NAMES_137[predictedClassIndex];
  // console.log(predictedClass)
  return predictedClass;
}
// prediction("https://res.cloudinary.com/dm26zzeuq/image/upload/v1713366988/ztx12bqx3ia3wwjeddkc.jpg")
