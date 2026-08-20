import { Router, Request, Response } from "express";
import HomeContent from "../../models/HomeContent.js";
import { validate } from "../../middleware/validate.js";
import { homeContentSchema, HomeContentInput } from "../../schemas/content.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.put("/home", validate(homeContentSchema), async (req: Request, res: Response) => {
  try {
    const { heading, subtitle } = req.body as HomeContentInput;

    const doc = await HomeContent.findOneAndUpdate(
      {},
      { heading, subtitle },
      { new: true, upsert: true },
    );

    res.json({ heading: doc.heading, subtitle: doc.subtitle });
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to save home content");
  }
});

export default router;
