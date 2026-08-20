import { useCollection } from "./useCollection";
import type { EventRecord } from "../mocks/data";

export const useEvents = () => useCollection<EventRecord>("events");
