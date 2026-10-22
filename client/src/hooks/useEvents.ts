import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { EventInput } from "../schemas/event";

export interface EventRecord extends Omit<EventInput, "startsAt"> {
  _id: string;
  startsAt: string;
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get<EventRecord[]>("/events").then((res) => res.data),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EventInput) =>
      api.post<EventRecord>("/admin/events", data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: {id: string; data: EventInput}) =>
      api.put<EventRecord>(`/admin/events/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/admin/events/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
