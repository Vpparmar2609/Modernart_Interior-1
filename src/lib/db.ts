import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null, bucket: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return { conn: cached.conn, bucket: cached.bucket as GridFSBucket };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Set up GridFS bucket
    if (!cached.bucket && cached.conn.connection.db) {
      cached.bucket = new mongoose.mongo.GridFSBucket(cached.conn.connection.db, {
        bucketName: 'uploads'
      });
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return { conn: cached.conn, bucket: cached.bucket as GridFSBucket };
}

export default connectToDatabase;
