import { useCollection } from "./useCollection";
import type { FaqItem, GalleryItem, Sponsor } from "../types/content";

export const useSponsors = () => useCollection<Sponsor>("sponsors");
export const useGallery = () => useCollection<GalleryItem>("gallery");
export const useFaqs = () => useCollection<FaqItem>("faqs");
