import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const uri = process.env.ATLAS_URI?.trim() ?? "";
  if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
    console.error("ATLAS_URI is missing or invalid. Set a mongodb:// or mongodb+srv:// URL in server/.env, then restart the server.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName: process.env.MONGODB_DB_NAME });
    console.log("is the db connected?: yes");
  } catch (err) {
    console.error("is the db connected?: no", err);
    process.exit(1);
  }
};

export default connectDB;
