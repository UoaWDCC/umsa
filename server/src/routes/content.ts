import { Router, Request, Response } from "express";
import HomeContent from "../models/HomeContent.js";
import { sendError } from "../utils/apiError.js";

export const HOME_DEFAULTS = {
  heading: "Welcome to Project UMSA!",
  subtitle: "to get started, go to the project team section and have a look :)",
};

const router = Router();

router.get("/home", async (_req: Request, res: Response) => {
  try {
    const doc = await HomeContent.findOne();
    res.json({
      heading: doc?.heading ?? HOME_DEFAULTS.heading,
      subtitle: doc?.subtitle ?? HOME_DEFAULTS.subtitle,
    });
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to fetch home content");
  }
});

export default router;
