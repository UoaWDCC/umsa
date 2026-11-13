import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (_req, res) => {
  const db = mongoose.connection.db;
  if (mongoose.connection.readyState !== 1 || !db) {
    return res.status(503).json({ status: "unavailable", service: "umsa-api" });
  }

  try {
    await db.command({ ping: 1 }, { timeoutMS: 2000 });
    res.json({ status: "ok", service: "umsa-api" });
  } catch {
    res.status(503).json({ status: "unavailable", service: "umsa-api" });
  }
});

export default router;
