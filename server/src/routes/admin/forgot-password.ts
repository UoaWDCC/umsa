import express, { Request, Response } from "express";
import { resend } from "../../utils/resend.js";
import { createSecureToken } from "../../utils/token.js";
import { sendError } from "../../utils/apiError.js";
import AdminUser from "../../models/AdminUser.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { to } = req.body;
  const url = new URL("http://localhost:5173/forgot-password");

  // same reply whether or not the email is an admin,
  // so this route can't be used to find out which emails are admins
  const genericReply = {
    message:
      "If that email has an admin account, a reset link has been sent.",
  };

  const existingAdmin = await AdminUser.findOne({ email: to });
  if (!existingAdmin) {
    return res.status(200).json(genericReply);
  }

  const token = await createSecureToken(to, "forgot-password");
  url.searchParams.set("token", token);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject: "UMSA Admin Password Reset",
    html: `<a href="${url}">Reset Password</a>`,
    replyTo: "umsa@projects.wdcc.co.nz",
  });

  if (error) {
    return sendError(res, 500, "INTERNAL_ERROR", "Unable to send invite email");
  }

  res.status(200).json(genericReply);
});

export default router;
