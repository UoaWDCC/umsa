import mongoose, { Document, Schema } from "mongoose";

export interface IHomeContentDocument extends Document {
  heading: string;
  subtitle: string;
  introVideoUrl?: string;
  aboutHeading: string;
  aboutBody: string;
}

const HomeContentSchema = new Schema<IHomeContentDocument>(
  {
    heading: { type: String, required: true },
    subtitle: { type: String, required: true },
    introVideoUrl: { type: String, default: "" },
    aboutHeading: { type: String, default: "WHAT IS UMSA?" },
    aboutBody: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model<IHomeContentDocument>(
  "HomeContent",
  HomeContentSchema,
);
