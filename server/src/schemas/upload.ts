import { z } from "zod";

//  schema for valid upload request
export const uploadSignatureSchema = z.object({
     folder: z.enum(["umsa/gallery", "umsa/team", "umsa/events", "umsa/branding"]),
   });
// ^Defines the rule for valid upload request body
//   - Using object function, rule: request body must contain a folder field
//   - Using enum function, that folder value must be one of those 4 pre-determined strings

   export type UploadSignatureInput = z.infer<typeof uploadSignatureSchema>;