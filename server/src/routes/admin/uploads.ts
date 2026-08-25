import { Router, Request, Response } from "express";
import { sendError } from "../../utils/apiError.js";
import { validate } from "../../middleware/validate.js";
import { uploadSignatureSchema } from "../../schemas/upload.js";
import { cloudinaryConfig, signUpload } from "../../utils/cloudinary.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";

//  create a new router instance
const router = Router(); 

//  create a rule saying if incoming request is a post method and its path matches /signature
//  first run requireAdmin to check admin cookie to see if its the admin
//  after run the validate function with uploadSignatureSchema
//  after run the async arrow function with request and response
router.post("/signature", requireAdmin, validate(uploadSignatureSchema), async (req: Request, res: Response) => {
    try {
        //  get folder from req
        //  .body just grabs everything in the json that was sent by browser, in this case only folder
        const { folder } = req.body;
        //  get all the info from .env and also make sure env vars aren't ""
        const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
        if (!cloudName || !apiKey || !apiSecret) {
            return sendError(res, 500, "INTERNAL_ERROR", "Missing Cloudinary env vars");
        }

        //  import signUpload & run to get signature and timestamp
        const { signature, timestamp } = signUpload(folder);

        //  send json file back with everything the browser now needs to upload to cloudinary
        res.json({ signature, timestamp, folder, cloudName, apiKey });
    } catch {
        sendError(res, 500, "INTERNAL_ERROR", "Error during upload signature generation");
    }
});

export default router;
