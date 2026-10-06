import mongoose from "mongoose";

// One-to-one chat between two users.
const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      validate: [(v) => v.length === 2, "A conversation needs exactly 2 participants"],
    },
    // Sorted "idA_idB" string. The unique index guarantees only ONE
    // conversation per pair of users, even with simultaneous requests.
    participantsKey: { type: String, required: true, unique: true },
    lastMessage: {
      text: { type: String, default: "" },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date },
    },
    lastMessageAt: { type: Date, default: Date.now },
    // userId -> number of unread messages for that user
    unreadCounts: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

// Helper to build the key consistently: Conversation.buildKey(a, b)
conversationSchema.statics.buildKey = (a, b) =>
  [String(a), String(b)].sort().join("_");

// Chat list: a user's conversations, most recent first
conversationSchema.index({ participants: 1, lastMessageAt: -1 });

export default mongoose.model("Conversation", conversationSchema);
