import { z } from "zod";

export const uploadSignatureSchema = z.object({
     folder: z.enum(["umsa/gallery", "umsa/team", "umsa/events", "umsa/branding"]),
   });

   export type uploadSignatureInput = z.infer<typeof uploadSignatureSchema>;