import { validate } from "../middleware/validate.js";
import { adminEmailSchema } from "../schemas/auth.js";
import express, { Request, Response } from "express";
import { getResend } from "../utils/resend.js";
import { createSecureToken } from "../utils/token.js";
import { sendError } from "../utils/apiError.js";

const router = express.Router();

router.post("/", validate(adminEmailSchema), async (req: Request, res: Response) => {
  const resend = getResend();
  if (!resend) {
    return sendError(res, 503, "INTERNAL_ERROR", "Email is not configured");
  }
  const { to } = req.body;
  const rawToken = await createSecureToken(to, "create-admin-account");

  const url = new URL("/create-admin-account", process.env.CLIENT_ORIGIN || "http://localhost:5173");
  url.searchParams.set("token", rawToken);

  const { data, error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "UMSA <onboarding@resend.dev>",
    to,
    subject: "UMSA Admin Invitation",
    html: `<a href="${url}">${url}</a>`,
    replyTo: "umsa@projects.wdcc.co.nz",
  });

  if (error) {
    return sendError(res, 500, "INTERNAL_ERROR", "Unable to send invite email");
  }

  res.status(200).json({ data });
});

export default router;
