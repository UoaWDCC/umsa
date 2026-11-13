import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { sendError } from "../utils/apiError.js";

const router = Router();
const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().trim().toLowerCase().max(254),
  message: z.string().trim().min(1).max(5000),
});
const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) =>
    sendError(
      res,
      429,
      "BAD_REQUEST",
      "Too many messages. Please try again later.",
    ),
});

router.post("/", limit, validate(schema), async (req, res) => {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) {
    return sendError(
      res,
      503,
      "INTERNAL_ERROR",
      "Email is unavailable. Please email umsa@projects.wdcc.co.nz directly.",
    );
  }
  const { name, email, message } = req.body as z.infer<typeof schema>;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["umsa@projects.wdcc.co.nz"],
        reply_to: email,
        subject: "UMSA website enquiry",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error("Contact email request failed:", response.status);
      return sendError(
        res,
        502,
        "INTERNAL_ERROR",
        "Unable to send your message. Please try again later or email umsa@projects.wdcc.co.nz directly.",
      );
    }
    const result = (await response.json()) as { id?: string };
    if (!result.id) throw new Error("Missing email ID");
    res.json({ ok: true });
  } catch {
    sendError(
      res,
      502,
      "INTERNAL_ERROR",
      "Unable to send your message. Please try again later or email umsa@projects.wdcc.co.nz directly.",
    );
  }
});

export default router;
