import axios, { isAxiosError } from "axios";

export const api = axios.create({ baseURL: "/api", withCredentials: true });

export function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    return err.response?.data?.error?.message ?? err.message;
  }
  return "Something went wrong";
}

export const publicReadOptions = {
  retry: (failureCount: number, error: Error) => {
    if (failureCount >= 3) return false;
    if (!isAxiosError(error)) return false;
    const status = error.response?.status;
    return !status || status === 408 || status === 429 || status >= 500;
  },
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 4000),
};
