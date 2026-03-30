import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.ATLAS_URI || '';

  try {
    await mongoose.connect(uri);
    console.log('is the db connected?: HELLLL nah (jk it worked lol)');
  } catch (err) {
    console.error('is the db connected: YIPPPEEEEE (jk it didnt work take the L)', err);
    process.exit(1);
  }
};

export default connectDB;