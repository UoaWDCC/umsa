import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../../models/AdminUser.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, LoginInput } from "../../schemas/auth.js";
import { sendError } from "../../utils/apiError.js";
import { loginRateLimit } from "../../middleware/rateLimit.js";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_MS,
  cookieOptions,
  jwtSecret,
} from "../../utils/adminSession.js";

const router = Router();
// dummy hash to throw off bad people >:)
const dummyHash = bcrypt.hash("ILOVEPROJECTUMSA123!!", 12);

router.post(
  "/login",
  loginRateLimit,
  validate(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as LoginInput;

      const user = await AdminUser.findOne({
        email: email.toLowerCase(),
      }).select("+passwordHash");
      if (user === null) {
        await bcrypt.compare(password, await dummyHash);
      }
      const ok =
        user !== null && (await bcrypt.compare(password, user.passwordHash));

      // Same message for unknown email and wrong password — never reveal which one it was
      if (!ok) {
        return sendError(
          res,
          401,
          "UNAUTHORIZED",
          "Incorrect email or password",
        );
      }

      const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret(), {
        expiresIn: "7d",
      });
      res.cookie(ADMIN_COOKIE, token, {
        ...cookieOptions(),
        maxAge: SESSION_MAX_AGE_MS,
      });
      res.json({ email: user.email });
    } catch {
      sendError(res, 500, "INTERNAL_ERROR", "Unable to log in");
    }
  },
);

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(ADMIN_COOKIE, cookieOptions());
  res.json({ ok: true });
});

router.get("/me", requireAdmin, (_req: Request, res: Response) => {
  res.json({ email: res.locals.admin.email });
});

export default router;
