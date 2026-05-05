/*import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async ()=> {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary
*/

import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_SECRET_KEY?.trim(),
  });

  console.log("Cloudinary Configured:");
  console.log("Name:", process.env.CLOUDINARY_NAME);
  console.log("Key:", process.env.CLOUDINARY_API_KEY);
};

export default connectCloudinary;