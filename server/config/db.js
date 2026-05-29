// Connects to MongoDB Atlas using MONGODB_URI from environment.
import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set — running without database');
    return false;
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
  return true;
}
