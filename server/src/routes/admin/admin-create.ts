import { tokenValidator } from "../../utils/tokenValidation.js";
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AdminUser from "../../models/AdminUser.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.post("/accept", async (req: Request, res: Response) => {
  const { rawToken, password } = req.body as {
    rawToken?: string;
    password?: string;
  };

  if (!rawToken || !password) {
    return sendError(res, 400, "BAD_REQUEST", "Missing Fields");
  }

  try {
    const tokenDoc = await tokenValidator(rawToken);
    const email = tokenDoc.user_id;

    if (await AdminUser.findOne({ email: email })) {
      return sendError(
        res,
        409,
        "CONFLICT",
        "Duplicate Email - Email already exists as an Admin",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AdminUser.insertOne({
      email: email,
      passwordHash: hashedPassword,
    });

    await tokenDoc.updateOne({ $set: { is_revoked: true } });

    return res.status(201).json({
      message: "Admin user registered successfully",
    });
  } catch {
    return sendError(res, 401, "UNAUTHORIZED", "Token Expired");
  }
});

export default router;
