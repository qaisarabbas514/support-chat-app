import mongoose from "mongoose";
import env from "./env.js";

// Connects to MongoDB Atlas. Exits the process if the connection fails,
// because the API is useless without a database.
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
