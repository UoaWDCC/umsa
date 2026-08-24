import { v2 } from "cloudinary";

export const cloudinaryConfig = () => ({
     cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
     apiKey: process.env.CLOUDINARY_API_KEY || "",
     apiSecret: process.env.CLOUDINARY_API_SECRET || "",
   });

//generate signature when requested by the browser
export const signUpload = (folder:string) => {
    const timestamp = Math.round(Date.now() / 1000);
    const { apiSecret } = cloudinaryConfig();
    //signature, current timestamp and the folder hashed using the apiSecret
    const signature = v2.utils.api_sign_request({timestamp, folder}, apiSecret);
    
    return {signature, timestamp};
};
// ^the admin picks image file and folder, browser sends the chosen folder to the express backend
//  backend calls the signUpload function with the folder(string)
//  the time of request becomes timestamp(integer) + folder(string), hashed using apiSecret
//  this hashed string => the signature
//  signature and timestamp is returned to the browser
//  when the actual image file is sent to cloudinary, signature, timestamp, folder also sent
//  cloudinary rehashes timestamp and folder using apiSecret(cloudinary already has)
//  verify that sent and generated signature match, therefore nothing was tempered


export const destroyAsset = (publicId:string) => {
    return v2.uploader.destroy(publicId);
};
// ^when destroyAsset is called with the publicId
//  it passes that publicId straight to destroy function from v2 cloudinary
//  let cloudinary know what to delete