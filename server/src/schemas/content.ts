import { z } from "zod";

export const homeContentSchema = z.object({
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
});

export type HomeContentInput = z.infer<typeof homeContentSchema>;
