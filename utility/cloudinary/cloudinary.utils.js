// multer-storage-cloudinary

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";
import "dotenv/config";

    // Configure Cloudinary
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    // Create a CloudinaryStorage instance
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: "YelpCamp",
          formats: ["png","jpg","jpeg"],
          // transformation: [
          //   { width: 600,}]//it adjust the width also height during upload.
        },
      });


export const cloudinaryStorage = multer({ storage: storage });

export const deleteImages=async(imagesArray)=>{
  for(let filename of imagesArray){
    await cloudinary.uploader.destroy(filename, { invalidate: true });
  }
}