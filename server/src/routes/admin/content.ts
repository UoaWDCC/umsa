import { Router, Request, Response } from "express";
import HomeContent from "../../models/HomeContent.js";
import { validate } from "../../middleware/validate.js";
import { homeContentSchema, HomeContentInput } from "../../schemas/content.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.put(
  "/home",
  validate(homeContentSchema),
  async (req: Request, res: Response) => {
    try {
      const values = req.body as HomeContentInput;

      const doc = await HomeContent.findOneAndUpdate(
        {},
        { $set: values },
        { returnDocument: "after", upsert: true },
      );

      res.json({
        heading: doc.heading,
        subtitle: doc.subtitle,
        aboutHeading: doc.aboutHeading,
        aboutBody: doc.aboutBody,
        introVideoUrl: doc.introVideoUrl ?? "",
      });
    } catch {
      sendError(res, 500, "INTERNAL_ERROR", "Unable to save home content");
    }
  },
);

export default router;
