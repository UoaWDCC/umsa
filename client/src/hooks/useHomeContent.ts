import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api } from "../lib/api";
import { ME_KEY } from "./useAuth";
import type { HomeContentValues } from "../schemas/content";

export const HOME_CONTENT_KEY = ["content", "home"] as const;

export function useHomeContent() {
  return useQuery({
    queryKey: HOME_CONTENT_KEY,
    queryFn: () => api.get<HomeContentValues>("/content/home").then((res) => res.data),
  });
}

export function useSaveHomeContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: HomeContentValues) =>
      api.put<HomeContentValues>("/admin/content/home", values).then((res) => res.data),
    // forces refetch so every render sees the new values
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HOME_CONTENT_KEY }),
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        // session died mid-edit -> nulls auth cache and AdminLayout redirects 
        queryClient.setQueryData(ME_KEY, null);
      }
    },
  });
}
