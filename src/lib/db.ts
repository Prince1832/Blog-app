import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = (global as any).mongoose || { conn: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGODB_URI);
  return cached.conn;
}

export default dbConnect;
