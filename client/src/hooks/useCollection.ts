import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api } from "../lib/api";
import { ME_KEY } from "./useAuth";

// Every collection behaves the same way, so list + CRUD is generated once here
// rather than written out per resource.
export type Collection = "members" | "events" | "sponsors" | "gallery" | "faqs";

export const collectionKey = (name: Collection) => [name] as const;

export function useCollection<T>(name: Collection) {
  return useQuery({
    queryKey: collectionKey(name),
    queryFn: () => api.get<T[]>(`/${name}`).then((res) => res.data),
  });
}

function useInvalidate(name: Collection) {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: collectionKey(name) }),
    onError: (err: unknown) => {
      // session died mid-edit -> null the auth cache so AdminLayout redirects
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
    mutationFn: (id: string) => api.delete(`/admin/${name}/${id}`).then((res) => res.data),
    ...useInvalidate(name),
  });
}
