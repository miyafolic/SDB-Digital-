import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Apne Gmail ki ID Vercel env variables me dalein
    pass: process.env.EMAIL_PASS, // App password
  },
});

export async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: `"SDB Digital" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your SDB Digital Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 10px;">
        <h2>SDB Digital Email Verification</h2>
        <p>Your OTP code for account verification is:</p>
        <h1 style="color: #10b981; letter-spacing: 5px;">${otp}</h1>
        <p>This code is valid for 10 minutes.</p>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
}
