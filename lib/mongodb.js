import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongooseInstance) => {
          console.log("MongoDB Connected");
          return mongooseInstance;
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}
