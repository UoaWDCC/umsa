import { Router, Request, Response } from "express";
import HomeContent from "../models/HomeContent.js";
import { sendError } from "../utils/apiError.js";

export const HOME_DEFAULTS = {
  heading: "WELCOME TO UMSA",
  subtitle: "The union of Malaysian students in Auckland.",
  aboutHeading: "WHAT IS UMSA?",
  aboutBody: "",
  introVideoUrl: "",
};

const router = Router();

router.get("/home", async (_req: Request, res: Response) => {
  try {
    const doc = await HomeContent.findOne();
    res.json({
      heading: doc?.heading ?? HOME_DEFAULTS.heading,
      subtitle: doc?.subtitle ?? HOME_DEFAULTS.subtitle,
      aboutHeading: doc?.aboutHeading ?? HOME_DEFAULTS.aboutHeading,
      aboutBody: doc?.aboutBody ?? HOME_DEFAULTS.aboutBody,
      introVideoUrl: doc?.introVideoUrl ?? HOME_DEFAULTS.introVideoUrl,
    });
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to fetch home content");
  }
});

export default router;
