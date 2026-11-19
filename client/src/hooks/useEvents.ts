import { useCollection, useCreate, useUpdate, useRemove } from "./useCollection";
import type { EventRecord } from "../types/content";

export const useEvents = () => useCollection<EventRecord>("events");
export const useCreateEvent = () => useCreate<Omit<EventRecord, "id">>("events");
export const useUpdateEvent = () => useUpdate<EventRecord>("events");
export const useDeleteEvent = () => useRemove("events");