import axios, { isAxiosError } from "axios";
import { mockAdapter } from "../mocks/adapter";

// Local prototype: serve /api from in-memory fake data instead of the Express
// server, so nothing needs Mongo. Flip to false to talk to a real backend.
const USE_MOCK_API = true;

// one shared client for public AND admin requests
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send/receive the umsa_admin session cookie
  ...(USE_MOCK_API ? { adapter: mockAdapter } : {}),
});

export function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    // our server wraps errors as { error: { code, message } }
    return err.response?.data?.error?.message ?? err.message;
  }
  return "Something went wrong";
}
