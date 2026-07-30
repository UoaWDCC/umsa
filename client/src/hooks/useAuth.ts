import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api } from "../lib/api";
import type { LoginValues } from "../schemas/auth";

// The ["auth", "me"] cache entry IS our auth state — every component that calls
// useMe() reads the same entry, and the login/logout mutations write to it.
// No AuthContext needed: react-query is already an app-wide store.
export const ME_KEY = ["auth", "me"] as const;

export interface Me {
  email: string;
}

export function useMe() {
  return useQuery({
    queryKey: ME_KEY,
    queryFn: async (): Promise<Me | null> => {
      try {
        const { data } = await api.get<Me>("/admin/auth/me");
        return data;
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          return null; // logged-out is a normal STATE, not an error
        }
        throw err;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: LoginValues) =>
      api.post<Me>("/admin/auth/login", values).then((res) => res.data),
    onSuccess: (me) => queryClient.setQueryData(ME_KEY, me),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("/admin/auth/logout"),
    // Nulling the cache entry makes AdminLayout redirect declaratively
    onSuccess: () => queryClient.setQueryData(ME_KEY, null),
  });
}
