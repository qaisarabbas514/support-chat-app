import { Router } from "express";
import healthRoutes from "./healthRoutes.js";

// Central place to mount every feature router under /api.
// Phase 2+ will add: auth, users, services, tickets, conversations, notifications.
const router = Router();

router.use("/health", healthRoutes);

export default router;
