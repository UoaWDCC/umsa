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
  /** the Figma photo wells are empty, so a member without a photo just gets one */
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
  eventDate: string; // ISO date — "done" is derived from this, never stored
  eventTag: EventTag;
  location: string;
  /** gallery album to send people to once the event has been and gone */
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
  /** the headline that goes on the ticket, e.g. "15% OFF" */
  offer: string;
  /** the conditions, shown when the ticket is opened; optional */
  detail?: string;
  /** left empty rather than guessed — an unverified link is worse than none */
  url?: string;
  instagram?: string;
  /** decorative demo logo — see DEMO_LOGOS */
  logo?: string;
  /* PLACEHOLDER. Nobody has confirmed which suburb these businesses trade in;
     these were assigned to demo the grouping and are editable in the admin. */
  region: Region;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  album: string;
};

export type FaqItem = { id: string; question: string; answer: string };
