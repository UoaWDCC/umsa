import { RequestHandler } from "express";
import { ZodType } from "zod";
import { sendError } from "../utils/apiError.js";

export const validate =
  (schema: ZodType): RequestHandler =>
    (req, res, next) => {
      // Express 5 leaves req.body undefined when no JSON body was sent
      const result = schema.safeParse(req.body ?? {});

      if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        return sendError(res, 400, "VALIDATION_ERROR", message);
      }

      req.body = result.data;
      next();
    };
