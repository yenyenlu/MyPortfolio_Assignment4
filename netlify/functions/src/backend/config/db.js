import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri, { dbName: "Portfolio" });
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
