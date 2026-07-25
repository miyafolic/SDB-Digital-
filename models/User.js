import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
    coins: { type: Number, default: 0 },
    dailyAdsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
