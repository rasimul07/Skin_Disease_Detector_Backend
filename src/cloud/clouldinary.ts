import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '#/utils/variable';
import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary;

// export const uploadOnCloudinary = async (localFilePath) =>{
//     try{
//        if(!localFilePath) return null;
//        const response = await cloudinary.uploader.upload(localFilePath,{
//         resource_type:'image'
//        })
//        return response;
//     }catch(error){
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation get failed
//         return null;
//     }
// }