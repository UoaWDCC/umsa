import { v2 } from "cloudinary";

export const cloudinaryConfig = () => ({
     cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
     apiKey: process.env.CLOUDINARY_API_KEY || "",
     apiSecret: process.env.CLOUDINARY_API_SECRET || "",
   });

export const signUpload = (folder:string) => {
    const timeStamp = Math.round(Date.now() / 1000);
    const { apiSecret } = cloudinaryConfig();
    const signature = v2.utils.api_sign_request({timeStamp, folder}, apiSecret);
    
    return {signature, timeStamp};
};

export const destroyAsset = (publicId:string) => {
    return v2.uploader.destroy(publicId);
};