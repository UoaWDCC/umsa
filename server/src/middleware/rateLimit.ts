import rateLimit from "express-rate-limit";
import { sendError } from "../utils/apiError.js";
import { Response } from "express";

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginRateLimit = rateLimit({
  // NOTE: CHANGE THIS TO 15 MINUTES LATER THIS IS
  // JUST SO I CAN TEST RATE LIMITING WITHOUT BEING BANNED FOR 15 MINUTES
  windowMs: 15,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (_req, res: Response) => {
    sendError(
      res,
      429,
      "TOO_MANY_REQUESTS",
      "Too many login attempts, try again later.",
    );
  },
});
