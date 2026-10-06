import { Router } from "express";
import mongoose from "mongoose";
import { sendSuccess } from "../utils/apiResponse.js";

const router = Router();

// GET /api/health – quick check for Postman and Render's health check
router.get("/", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  sendSuccess(res, {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStates[mongoose.connection.readyState] || "unknown",
  }, "Server is healthy");
});

export default router;
