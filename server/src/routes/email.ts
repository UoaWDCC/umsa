import express, { Request, Response } from "express";
import { resend } from "../utils/resend.js";

const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { to, subject, message } = req.body;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html: `<strong>${message}</strong>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

export default router;