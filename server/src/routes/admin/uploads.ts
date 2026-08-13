import { Router, Request, Response } from "express";
import { sendError } from "../../utils/apiError.js";
import { validate } from "../../middleware/validate.js";
import { uploadSignatureSchema } from "../../schemas/upload.js";

const router = Router();

router.post("/signature", validate(uploadSignatureSchema), async (req: Request, res: Response) => {
    try {
        // get folder from req
        // get all the info from .env

        // import signUpload & run

        // return inside of res folder etc. -> check content.ts
    } catch {
        sendError(res, 500, "INTERNAL_ERROR", "Missing Cloudinary env vars");
    }
});

export default router;
