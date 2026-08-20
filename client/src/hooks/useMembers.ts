import { useCollection } from "./useCollection";
import type { Member } from "../mocks/data";

export const useMembers = () => useCollection<Member>("members");
