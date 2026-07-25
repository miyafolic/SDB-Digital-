import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // User khojo database me
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Match OTP and expiration
    if (user.otp !== otp) {
      return Response.json(
        { success: false, message: "Invalid OTP code" },
        { status: 400 }
      );
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      return Response.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify user & clear OTP
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return Response.json({
      success: true,
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
