import { Router, Request, Response } from "express";
import Event from "../models/Event.js";
import { sendError } from "../utils/apiError.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ startsAt: -1});
    res.json(events);
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to fetch events");
  }
});

export default router;
