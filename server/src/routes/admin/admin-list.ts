import { Router, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import AdminUser from "../../models/AdminUser.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.get("/", async (_req, res: Response) => {
  const admins = await AdminUser.find();

  return res.status(200).json(admins);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  // a malformed id would make mongoose throw, so reject it up front
  if (typeof id !== "string" || !isValidObjectId(id)) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid admin id");
  }

  try {
    const adminCount = await AdminUser.countDocuments();

    if (adminCount == 1) {
      return sendError(
        res,
        400,
        "BAD_REQUEST",
        "You cannot delete the last remaining Admin",
      );
    }

    const deleted = await AdminUser.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 404, "NOT_FOUND", "Admin not found");
    }

    return res
      .status(200)
      .json({ message: `Successfully deleted ${deleted.email}` });
  } catch {
    return sendError(res, 500, "INTERNAL_ERROR", "Unable to delete admin");
  }
});

export default router;
