import { z } from "zod";

export const EventSchema = z.object({
    name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name is too long (50 characters max)"),

    description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description is too long (500 characters max)"),

    tag: z
    .string()
    .trim()
    .min(1, "Tag is required")
    .max(20, "Tag is too long (20 characters max)"),

    startsAt: z
    .coerce.date(),

    imageUrl: z
    .string()
    .trim()
    .max(65, "Link is too long (65 characters max)")
    .optional(),

    imagePublicId: z
    .string()
    .trim()
    .optional()

  
});

export type EventInput = z.infer<typeof EventSchema>;
