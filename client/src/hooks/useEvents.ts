import { useCollection, useCreate, useUpdate, useRemove } from "./useCollection";
import type { EventRecord } from "../types/content";
import type { EventInput } from "../schemas/event"

export const useEvents = () => useCollection<EventRecord>("events");
export const useCreateEvent = () => useCreate<EventInput>("events");
export const useUpdateEvent = () => useUpdate<EventInput & { id: string }>("events");
export const useDeleteEvent = () => useRemove("events");