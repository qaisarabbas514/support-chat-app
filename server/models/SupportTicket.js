import mongoose from "mongoose";

export const TICKET_STATUSES = ["open", "in_progress", "resolved", "closed"];

// Each staff reply; also emailed to the guest
const replySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Created by the public guest form (no login)
const supportTicketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: TICKET_STATUSES, default: "open" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    replies: [replySchema],
  },
  { timestamps: true }
);

// Admin panel: filter by status, newest first
supportTicketSchema.index({ status: 1, createdAt: -1 });
supportTicketSchema.index({ email: 1 });
supportTicketSchema.index({ assignedTo: 1 });

export default mongoose.model("SupportTicket", supportTicketSchema);
