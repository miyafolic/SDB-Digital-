import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../../../lib/nodemailer";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return Response.json({ success: false, message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (existingUser && !existingUser.isVerified) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
      });
    }

    await sendOtpEmail(email, otp);
    return Response.json({ success: true, message: "OTP sent to your email!" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
