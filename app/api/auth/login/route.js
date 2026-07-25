import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 2. Check if user verified email OTP
    if (!user.isVerified) {
      return Response.json(
        { success: false, message: "Please verify your email OTP before logging in" },
        { status: 400 }
      );
    }

    // 3. Verify Password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 4. Return success with user data
    return Response.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        coins: user.coins || 0,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to login" },
      { status: 500 }
    );
  }
}
