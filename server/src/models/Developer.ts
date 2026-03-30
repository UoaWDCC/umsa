import mongoose, { Document, Schema } from 'mongoose';

export interface IDeveloperDocument extends Document {
  name: string;
  bio: string;
}

const DeveloperSchema = new Schema<IDeveloperDocument>(
  {
    name:      { type: String, required: true },
    bio:       { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDeveloperDocument>('Developer', DeveloperSchema);