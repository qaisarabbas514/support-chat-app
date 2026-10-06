import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const ROLES = ["manager", "support", "developer", "client"];
export const STAFF_ROLES = ["manager", "support", "developer"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true, // unique index
      lowercase: true,
      trim: true,
    },
    // select:false => never returned by queries unless you ask with .select("+password")
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ROLES, default: "client", required: true },
    avatar: { type: String, default: "" }, // image URL/path

    // Per-user theme, saved here and applied by the frontend after login
    themeSettings: {
      preset: { type: String, default: "light" }, // e.g. light | dark | ocean ...
      primaryColor: { type: String, default: "#2563eb" },
      secondaryColor: { type: String, default: "#64748b" },
      font: { type: String, default: "Inter" },
    },

    isActive: { type: Boolean, default: true }, // lets managers deactivate accounts
    lastSeen: { type: Date, default: null }, // updated when the socket disconnects
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // Forgot-password flow: store only a HASH of the emailed token
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// --- Indexes -----------------------------------------------------------
// User search by name within a role (chat list: search + role filter)
userSchema.index({ role: 1, name: 1 });
// Plain name index for prefix/regex searches across all roles
userSchema.index({ name: 1 });
// Text index for word-based search on name and email
userSchema.index({ name: "text", email: "text" });

// Hash the password whenever it is new or changed
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Usage: const ok = await user.comparePassword(plain)  (load with +password)
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Strip sensitive fields from any JSON output as a safety net
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
