import express, { Request, Response } from "express";
import { resend } from "../utils/resend.js";
import { createSecureToken } from "../utils/token.js";
import { sendError } from "../utils/apiError.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { to, subject } = req.body;
  const rawToken = await createSecureToken(to, "create-admin-account");

  const url = new URL("http://localhost:5173/create-admin-account");
  url.searchParams.set("token", rawToken);

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html: `<a href="${url}">${url}</a>`,
    replyTo: "umsa@projects.wdcc.co.nz",
  });

  if (error) {
    return sendError(res, 500, "INTERNAL_ERROR", "Unable to send invite email");
  }

  res.status(200).json({ data });
});

export default router;
