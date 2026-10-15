import mongoose, { Schema } from "mongoose";

const SubmissionSchema = new Schema({
  kind: { type: String, enum: ["contact", "membership"], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: String,
  year: String,
  status: { type: String, default: "new", enum: ["new", "reviewed"] },
}, { timestamps: true });
export default mongoose.model("Submission", SubmissionSchema);
