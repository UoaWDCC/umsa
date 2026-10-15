import axios, { isAxiosError } from "axios";

export const api = axios.create({ baseURL: "/api", withCredentials: true });

export function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    return err.response?.data?.error?.message ?? err.message;
  }
  return "Something went wrong";
}
