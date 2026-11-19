import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}
