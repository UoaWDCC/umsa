import mongoose, { Schema } from "mongoose";

const SiteRecordSchema = new Schema({
  resource: { type: String, required: true, enum: ["members", "events", "sponsors", "gallery", "faqs"], index: true },
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model("SiteRecord", SiteRecordSchema);
