import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.ATLAS_URI || '';

  try {
    await mongoose.connect(uri);
    console.log('is the db connected?: yes');
  } catch (err) {
    console.error('is the db connected?: no', err);
    process.exit(1);
  }
};

export default connectDB;