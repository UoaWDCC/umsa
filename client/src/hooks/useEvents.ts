import { useCollection } from "./useCollection";
import type { EventRecord } from "../types/content";

export const useEvents = () => useCollection<EventRecord>("events");
