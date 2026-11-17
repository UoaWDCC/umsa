import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AdminUser from "../../models/AdminUser.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.put("/password", async (req: Request, res: Response) => {
  const currentUser = res.locals.admin;
  const email = currentUser.email;
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };
  const admin = await AdminUser.findOne({ email: email }).select(
    "+passwordHash",
  );

  if (!admin) {
    return sendError(res, 401, "UNAUTHORIZED", "Account no longer exists.");
  }

  const passwordHash = admin.passwordHash;
  if (!(await bcrypt.compare(currentPassword, passwordHash))) {
    return sendError(
      res,
      401,
      "UNAUTHORIZED",
      "Incorrect current password. Please try again",
    );
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await admin.updateOne({ passwordHash: newPasswordHash });

  return res.status(200).json({ message: "Successfully changed Password!" });
});

export default router;
