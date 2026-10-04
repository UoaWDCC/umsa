import express, { Request, Response } from "express";
import { resend } from "../utils/resend.js";
import { createSecureToken } from "../utils/token.js"


const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { to, subject, message } = req.body;
  const rawToken = await createSecureToken(to)

  const url = new URL("http://localhost:5173/")
  url.searchParams.set("token", rawToken)

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html: `<a href="${url}">${url}</a>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

export default router;