import mongoose, { Document, Schema } from "mongoose";

export interface IAdminUserDocument extends Document {
  email: string;
  passwordHash: string;
}

const AdminUserSchema = new Schema<IAdminUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // only the bcrypt hash is ever stored
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

export default mongoose.model<IAdminUserDocument>("AdminUser", AdminUserSchema);
