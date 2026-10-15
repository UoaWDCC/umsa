import { z } from "zod";

const text = z.string().trim().max(2000).default("");
const required = z.string().trim().min(1).max(200);
const url = z
  .union([
    z.literal(""),
    z
      .url()
      .refine(
        (value) => /^https?:\/\//.test(value),
        "Use an HTTP or HTTPS URL",
      ),
  ])
  .default("");
const date = z.iso.date();

export const collectionSchemas = {
  members: z.object({
    fullName: required,
    role: required,
    img: url,
    instagram: url,
    committee: z
      .enum([
        "presidents",
        "executives",
        "marketing",
        "publicRelations",
        "social",
        "cultural",
        "sports",
        "other",
      ])
      .default("other"),
    degree: text,
    ethnicity: text,
    mbti: text,
    favArtist: text,
    bio: text,
  }),
  events: z.object({
    eventName: required,
    eventImage: url,
    eventLink: url,
    eventDescription: text,
    eventDate: date,
    eventTag: z.enum(["Social", "Competition", "Cultural"]),
    location: text,
    album: text,
  }),
  sponsors: z.object({
    name: required,
    offer: required,
    detail: text,
    url,
    instagram: url,
    logo: url,
    region: z.enum([
      "Central",
      "East Auckland",
      "North Shore",
      "West Auckland",
    ]),
  }),
  gallery: z.object({
    src: url.refine((value) => value.length > 0, "Photo is required"),
    caption: required,
    album: required,
  }),
  faqs: z.object({
    question: required,
    answer: z.string().trim().min(1).max(5000),
  }),
};
