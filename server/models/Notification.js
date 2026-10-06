import mongoose from "mongoose";

export const NOTIFICATION_TYPES = ["new_message", "new_ticket", "account_invite"];

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: NOTIFICATION_TYPES, required: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, default: "", trim: true, maxlength: 500 },
    link: { type: String, default: "" }, // frontend route to open on click
    // Related ids (conversationId, ticketId, ...) for the frontend
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Notification bell: a user's notifications, unread first / newest first
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
