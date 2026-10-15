import { useCollection } from "./useCollection";
import type { Member } from "../types/content";

export const useMembers = () => useCollection<Member>("members");
