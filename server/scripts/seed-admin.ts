import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "../src/models/AdminUser.js";

async function seedAdmin(): Promise<void> {
  const uri = process.env.ATLAS_URI;
  if (!uri) {
    throw new Error("ATLAS_URI is required to seed the admin account");
  }

  const email = (process.env.ADMIN_EMAIL || "umsa@projects.wdcc.co.nz").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) throw new Error("Set ADMIN_PASSWORD to at least 12 characters");
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, dbName: process.env.MONGODB_DB_NAME });
    await AdminUser.findOneAndUpdate(
      { email },
      { $set: { passwordHash } },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );
    console.log(`Admin account created or updated: ${email}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin().catch(() => {
  console.error("Unable to seed admin account. Check ATLAS_URI and database access.");
  process.exitCode = 1;
});
