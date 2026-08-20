import mongoose, { Document, Schema } from "mongoose";

export interface IHomeContentDocument extends Document {
  heading: string;
  subtitle: string;
}

const HomeContentSchema = new Schema<IHomeContentDocument>(
  {
    heading: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IHomeContentDocument>("HomeContent", HomeContentSchema);
