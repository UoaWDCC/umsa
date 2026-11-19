import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

const email = z.email("Enter a valid email address").transform((value) => value.toLowerCase());
const newPassword = z.string().max(72).regex(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/,
  "Use at least 10 characters, including a letter, number and special character",
);
const token = z.string().regex(/^[a-f0-9]{64}$/, "Invalid token");

export const adminEmailSchema = z.object({ to: email });
export const acceptInviteSchema = z.object({ rawToken: token, password: newPassword });
export const resetPasswordSchema = z.object({ token, newPassword });
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword,
});
