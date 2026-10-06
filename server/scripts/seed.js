// Creates the FIRST Manager account from .env values.
// Run with:  npm run seed
// Safe to run repeatedly: it does nothing if that email already exists.
import env from "../config/env.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";

const seedManager = async () => {
  const { SEED_MANAGER_NAME, SEED_MANAGER_EMAIL, SEED_MANAGER_PASSWORD } = process.env;

  if (!SEED_MANAGER_EMAIL || !SEED_MANAGER_PASSWORD) {
    console.error("Set SEED_MANAGER_EMAIL and SEED_MANAGER_PASSWORD in .env first.");
    process.exit(1);
  }
  if (SEED_MANAGER_PASSWORD.length < 8) {
    console.error("SEED_MANAGER_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email: SEED_MANAGER_EMAIL.toLowerCase() });
  if (existing) {
    console.log(`Manager already exists (${existing.email}). Nothing to do.`);
  } else {
    // Password is hashed by the User model's pre-save hook
    await User.create({
      name: SEED_MANAGER_NAME || "Admin Manager",
      email: SEED_MANAGER_EMAIL,
      password: SEED_MANAGER_PASSWORD,
      role: "manager",
    });
    console.log(`Manager created: ${SEED_MANAGER_EMAIL}`);
  }

  await mongoose.disconnect();
};

seedManager().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
