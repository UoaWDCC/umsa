import axios, { isAxiosError } from "axios";

// one shared client for public AND admin requests
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send/receive the umsa_admin session cookie
});

export function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    // our server wraps errors as { error: { code, message } }
    return err.response?.data?.error?.message ?? err.message;
  }
  return "Something went wrong";
}
