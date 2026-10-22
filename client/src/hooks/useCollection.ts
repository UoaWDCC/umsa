import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api, publicReadOptions } from "../lib/api";
import { ME_KEY } from "./useAuth";

export type Collection = "members" | "events" | "sponsors" | "gallery" | "faqs";

export const collectionKey = (name: Collection) => [name] as const;

export function useCollection<T>(name: Collection) {
  return useQuery({
    ...publicReadOptions,
    queryKey: collectionKey(name),
    queryFn: ({ signal }) =>
      api.get<T[]>(`/${name}`, { timeout: 10000, signal }).then((res) => res.data),
  });
}

function useInvalidate(name: Collection) {
  const queryClient = useQueryClient();
  return {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: collectionKey(name) }),
    onError: (err: unknown) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        queryClient.setQueryData(ME_KEY, null);
      }
    },
  };
}

export function useCreate<T>(name: Collection) {
  return useMutation({
    mutationFn: (values: Partial<T>) =>
      api.post<T>(`/admin/${name}`, values).then((res) => res.data),
    ...useInvalidate(name),
  });
}

export function useUpdate<T extends { id: string }>(name: Collection) {
  return useMutation({
    mutationFn: ({ id, ...values }: Partial<T> & { id: string }) =>
      api.put<T>(`/admin/${name}/${id}`, values).then((res) => res.data),
    ...useInvalidate(name),
  });
}

export function useRemove(name: Collection) {
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/admin/${name}/${id}`).then((res) => res.data),
    ...useInvalidate(name),
  });
}
