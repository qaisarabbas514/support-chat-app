import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true, maxlength: 4000 },
    readAt: { type: Date, default: null }, // null = unread by the recipient
  },
  { timestamps: true } // createdAt = message timestamp
);

// Load a conversation's history in order (and paginate efficiently)
messageSchema.index({ conversation: 1, createdAt: -1 });
// Count/mark unread messages in a conversation
messageSchema.index({ conversation: 1, readAt: 1 });

export default mongoose.model("Message", messageSchema);
