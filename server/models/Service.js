import mongoose from "mongoose";

// Company services shown on the public landing page; managed by Managers.
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    icon: { type: String, default: "" }, // icon name or image URL
    order: { type: Number, default: 0 }, // display order on the landing page
    isActive: { type: Boolean, default: true }, // hide without deleting
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Landing page query: active services sorted by order
serviceSchema.index({ isActive: 1, order: 1 });

export default mongoose.model("Service", serviceSchema);
