import { z } from "zod";

// client-side copy for instant validation
export const homeContentSchema = z.object({
  introVideoUrl: z
    .union([
      z.literal(""),
      z.url().refine((value) => {
        const url = new URL(value);
        return (
          url.protocol === "https:" &&
          ["www.youtube.com", "www.youtube-nocookie.com"].includes(
            url.hostname,
          ) &&
          /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname)
        );
      }, "Use a YouTube embed URL"),
    ])
    .optional(),

  heading: z
    .string()
    .trim()
    .min(1, "Heading is required")
    .max(200, "Heading is too long (200 characters max)"),
  subtitle: z
    .string()
    .trim()
    .min(1, "Subtitle is required")
    .max(500, "Subtitle is too long (500 characters max)"),
  aboutHeading: z
    .string()
    .trim()
    .min(1, "About heading is required")
    .max(200, "About heading is too long (200 characters max)"),
  aboutBody: z
    .string()
    .trim()
    .min(1, "About body is required")
    .max(1000, "About body is too long (1000 characters max)"),
});

export type HomeContentValues = z.infer<typeof homeContentSchema>;
