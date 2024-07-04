import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
  } catch (error) {
    throw new Error('MongoDB connection failed');
  }
};