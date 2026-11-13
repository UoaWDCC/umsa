import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api, publicReadOptions } from "../lib/api";
import { ME_KEY } from "./useAuth";
import type { HomeContentValues } from "../schemas/content";

export const HOME_CONTENT_KEY = ["content", "home"] as const;

export function useHomeContent() {
  return useQuery({
    ...publicReadOptions,
    queryKey: HOME_CONTENT_KEY,
    queryFn: ({ signal }) =>
      api
        .get<HomeContentValues>("/content/home", { timeout: 10000, signal })
        .then((res) => res.data),
  });
}

export function useSaveHomeContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: HomeContentValues) =>
      api
        .put<HomeContentValues>("/admin/content/home", values)
        .then((res) => res.data),
    onSuccess: async (values) => {
      queryClient.setQueryData(HOME_CONTENT_KEY, values);
      await queryClient.invalidateQueries({ queryKey: HOME_CONTENT_KEY });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        // session died mid-edit -> nulls auth cache and AdminLayout redirects
        queryClient.setQueryData(ME_KEY, null);
      }
    },
  });
}
