import { tokenValidator } from "../../utils/tokenValidation.js";
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AdminUser from "../../models/AdminUser.js";

const router = Router();

router.post("/accept", async (req: Request, res: Response) => {
  const { rawToken, password } = req.body as {
    rawToken?: string;
    password?: string;
  };

  if (!rawToken || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const tokenDoc = await tokenValidator(rawToken);
    const email = tokenDoc.user_id;

    if (await AdminUser.findOne({ email: email })) {
      return res
        .status(409)
        .json({ error: "Duplicate Email - Email already exists as an Admin" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AdminUser.insertOne({
      email: email,
      passwordHash: hashedPassword,
    });

    await tokenDoc.updateOne({ $set: { is_revoked: true } });

    res.status(201).json({
      message: "Admin user registered successfully",
    });
  } catch {
    return res.status(401).json({ error: "Token Expired" });
  }
});

export default router;
