import { CookieOptions } from "express";

export const ADMIN_COOKIE = "umsa_admin";
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches the JWT expiry

export const jwtSecret = () => process.env.JWT_SECRET || "dev-only-secret-change-me";

export const cookieOptions = (): CookieOptions => ({
  httpOnly: true, // JS can never read the token, so XSS can't steal the session
  sameSite: "lax", // not sent on cross-site POSTs
  secure: process.env.NODE_ENV === "production", // HTTPS-only in prod, plain http in dev
  path: "/",
});
