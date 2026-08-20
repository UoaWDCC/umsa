import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";
import { sendError } from "../utils/apiError.js";
import { ADMIN_COOKIE, jwtSecret } from "../utils/adminSession.js";

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.[ADMIN_COOKIE];
  if (!token) {
    return sendError(res, 401, "UNAUTHORIZED", "Not logged in");
  }

  let payload: { sub: string; email: string };
  try {
    payload = jwt.verify(token, jwtSecret()) as { sub: string; email: string };
  } catch {
    return sendError(res, 401, "UNAUTHORIZED", "Session expired - please log in again");
  }

  const user = await AdminUser.findById(payload.sub);
  if (!user) {
    return sendError(res, 401, "UNAUTHORIZED", "Account no longer exists");
  }

  res.locals.admin = { id: user.id, email: user.email };
  next();
};
