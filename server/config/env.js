// Loads .env once and exposes validated, typed config to the rest of the app.
// Import this file FIRST in server.js so process.env is populated everywhere.
import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required env variables: ${missing.join(", ")}`);
  process.exit(1);
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  // CLIENT_URL may hold several origins separated by commas (local + Vercel)
  clientOrigins: (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export default env;
