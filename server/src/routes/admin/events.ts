import { Router, Request, Response } from "express";
import Events from "../../models/Event.js";
import { validate } from "../../middleware/validate.js";
import { EventSchema } from "../../schemas/event.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { sendError } from "../../utils/apiError.js";
import mongoose from "mongoose";

const router = Router();

router.post("/", requireAdmin, validate(EventSchema), async (req: Request, res: Response) => {
  try {
    const event = await Events.create(req.body);
    res.status(201).json(event);
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to create event");
  }
});

router.put("/:id", requireAdmin, validate(EventSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.isValidObjectId(id)){
            return sendError(res, 400, "BAD_REQUEST", "Invalid event id");
        }

        const event = await Events.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!event){
            return sendError(res, 404, "NOT_FOUND", "Event not found");
        }

        res.json(event);
    } catch {
        sendError(res, 500, "INTERNAL_ERROR", "Unable to update event");
    }
});

export default router;
