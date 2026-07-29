import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health.js";
import contentRoutes from "./routes/content.js";
import adminAuthRoutes from "./routes/admin/auth.js";
import adminContentRoutes from "./routes/admin/content.js";
import { apiRateLimit } from "./middleware/rateLimit.js";
import { requireAdmin } from "./middleware/requireAdmin.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

// splitting

const app = express();

app.set("trust proxy", 1);

// security:
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || "1mb" }));
app.use(cookieParser());
app.use("/api", apiRateLimit);
app.use("/api/health", healthRoutes);

// endpoints -- add new endpoints below
app.use("/api/content", contentRoutes);

app.use("/api/admin/auth", adminAuthRoutes);
// every /api/admin/* route below requires a logged-in admin account
app.use("/api/admin", requireAdmin);
app.use("/api/admin/content", adminContentRoutes);

// fallbacks
app.use(notFound);
app.use(errorHandler);

export default app;
