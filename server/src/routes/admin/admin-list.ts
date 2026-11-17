import { Router, Request, Response } from "express";
import AdminUser from "../../models/AdminUser.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.get("/", async (_req, res: Response) => {
  const admins = await AdminUser.find();

  return res.status(200).json(admins);
});

router.delete("/delete", async (req: Request, res: Response) => {
  const { email } = req.body as {
    email: string;
  };

  if (!email) {
    return sendError(
      res,
      400,
      "BAD_REQUEST",
      "Invalid Submission - provide an email please",
    );
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

    const result = await AdminUser.deleteOne({ email: email.toLowerCase() });

    if (result.deletedCount == 0) {
      return sendError(res, 404, "NOT_FOUND", "Admin not found");
    }

    return res.status(200).json({ message: `Successfully deleted ${email}` });
  } catch {
    return sendError(res, 500, "INTERNAL_ERROR", "Unable to delete admin");
  }
});

export default router;
