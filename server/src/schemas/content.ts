import { z } from "zod";

// Accepts any normal YouTube link (watch, youtu.be, shorts, embed) and
// returns the embed URL the homepage iframe needs, or null if it isn't one.
export function toYouTubeEmbed(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.replace(/^(www\.|m\.)/, "");
  const [, kind, rest] = url.pathname.split("/");
  let id: string | null = null;
  if (host === "youtu.be") id = kind ?? null;
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (kind === "watch") id = url.searchParams.get("v");
    else if (["embed", "shorts", "live"].includes(kind ?? ""))
      id = rest ?? null;
  }

  return id && /^[A-Za-z0-9_-]{11}$/.test(id)
    ? `https://www.youtube.com/embed/${id}`
    : null;
}

export const homeContentSchema = z.object({
  introVideoUrl: z
    .string()
    .trim()
    .transform((value, ctx) => {
      if (value === "") return "";
      const embed = toYouTubeEmbed(value);
      if (!embed) {
        ctx.addIssue({
          code: "custom",
          message: "Paste a YouTube video link, e.g. https://youtu.be/…",
        });
        return z.NEVER;
      }
      return embed;
    })
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

export type HomeContentInput = z.infer<typeof homeContentSchema>;
