import mongoose from "mongoose";

let cached = global.__MONGO_CONN__;
if (!cached) cached = global.__MONGO_CONN__ = { conn: null, promise: null };

export default async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI env var");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      // Mongoose v8 uses modern defaults; keep options minimal.
      serverSelectionTimeoutMS: 10000,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}