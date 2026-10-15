export const UMSA_LINKTREE = "https://linktr.ee/Umsanz";
export const EVENT_TAGS = ["Social", "Competition", "Cultural"] as const;
export type EventTag = (typeof EVENT_TAGS)[number];

export const COMMITTEE_ORDER = [
  "presidents",
  "executives",
  "marketing",
  "publicRelations",
  "social",
  "cultural",
  "sports",
  "other",
] as const;
export type CommitteeName = (typeof COMMITTEE_ORDER)[number];
export const COMMITTEE_LABELS: Record<CommitteeName, string> = {
  presidents: "Presidents",
  executives: "Executives",
  marketing: "Marketing",
  publicRelations: "Public Relations",
  social: "Social",
  cultural: "Cultural",
  sports: "Sports",
  other: "Other",
};

export type Member = {
  committee?: CommitteeName;
  id: string;
  fullName: string;
  role: string;

  img?: string;
  instagram: string;
  degree: string;
  ethnicity: string;
  mbti: string;
  favArtist: string;
  bio: string;
};

export type EventRecord = {
  id: string;
  eventName: string;
  eventImage: string;
  eventLink: string;
  eventDescription: string;
  eventDate: string;
  eventTag: EventTag;
  location: string;

  album?: string;
};

export const REGIONS = [
  "Central",
  "East Auckland",
  "North Shore",
  "West Auckland",
] as const;
export type Region = (typeof REGIONS)[number];

export type Sponsor = {
  id: string;
  name: string;

  offer: string;

  detail?: string;

  url?: string;
  instagram?: string;

  logo?: string;

  region: Region;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  album: string;
};

export type FaqItem = { id: string; question: string; answer: string };
