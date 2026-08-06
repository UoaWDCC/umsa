import mongoose, { Document, Schema } from "mongoose";

export interface IEventDocument extends Document {
  name: string;
  startsAt: Date;
  description: string;
  tag: string;
  link: string;
  imageUrl: string;
  imagePublicId: string;
}

const EventSchema = new Schema<IEventDocument>(
  {
    name:          { type: String, required: true },
    startsAt:      { type: Date,   required: true },
    description:   { type: String, required: true },
    tag:           { type: String, required: true },
    link:          { type: String },
    imageUrl:      { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IEventDocument>("Event", EventSchema);
