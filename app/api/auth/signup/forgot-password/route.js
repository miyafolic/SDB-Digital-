import connectToDatabase from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../../../../lib/nodemailer";

export async function POST(req) {
  try {
    const { action, email, otp, newPassword } = await req.json();
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ success: false, message: "User with this email does not exist" }, { status: 404 });
    }

    // Step A: Send OTP for Reset
    if (action === "send-otp") {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetToken = generatedOtp;
      user.resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      await user.save();

      await sendOtpEmail(email, generatedOtp);
      return Response.json({ success: true, message: "Password reset OTP sent to your email!" });
    }

    // Step B: Verify OTP & Reset Password
    if (action === "reset-password") {
      if (user.resetToken !== otp || user.resetTokenExpires < new Date()) {
        return Response.json({ success: false, message: "Invalid or expired OTP" }, { status: 400 });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      user.resetToken = null;
      user.resetTokenExpires = null;
      await user.save();

      return Response.json({ success: true, message: "Password reset successfully! Please login." });
    }

    return Response.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
