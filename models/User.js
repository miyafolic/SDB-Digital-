import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "User" },
    email: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    lastAdWatchedAt: { type: Date, default: null },
    dailyAdsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
