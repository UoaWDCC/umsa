import { Router } from "express";
import { z } from "zod";
import { rateLimit } from "express-rate-limit";
import Submission from "../models/Submission.js";
import { validate } from "../middleware/validate.js";
import { sendError } from "../utils/apiError.js";

export const publicSubmissions = Router();
export const adminSubmissions = Router();
const limit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false,
  handler: (_req, res) => sendError(res, 429, "BAD_REQUEST", "Too many submissions. Please try again later.") });
const base = { name: z.string().trim().min(1).max(200), email: z.email().trim().toLowerCase().max(254) };
const schemas = {
  contact: z.object({ ...base, message: z.string().trim().min(1).max(5000) }),
  membership: z.object({ ...base, year: z.enum(["First year", "Second year", "Third year", "Fourth year+", "Postgrad"]) }),
};
for (const [kind, schema] of Object.entries(schemas)) {
  publicSubmissions.post(`/${kind}`, limit, validate(schema), async (req, res) => {
    await Submission.create({ ...req.body, kind });
    res.status(201).json({ ok: true });
  });
}
adminSubmissions.get("/submissions", async (_req, res) => {
  const records = await Submission.find().sort({ createdAt: -1 }).limit(200);
  res.json(records.map(record => ({ ...record.toObject(), id: record.id, _id: undefined, __v: undefined })));
});
