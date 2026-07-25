"use client";
import { useState } from "react";
import { X, Lock, Mail, User, KeyRound } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "otp" | "forgot" | "reset"
  const [formData, setFormData] = useState({ name: "", email: "", password: "", otp: "", newPassword: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      let endpoint = "";
      let payload = { ...formData };

      if (mode === "signup") {
        endpoint = "/api/auth/signup";
      } else if (mode === "otp") {
        endpoint = "/api/auth/verify-otp";
      } else if (mode === "login") {
        endpoint = "/api/auth/login";
      } else if (mode === "forgot") {
        endpoint = "/api/auth/forgot-password";
        payload = { action: "send-otp", email: formData.email };
      } else if (mode === "reset") {
        endpoint = "/api/auth/forgot-password";
        payload = { action: "reset-password", email: formData.email, otp: formData.otp, newPassword: formData.newPassword };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus(`✅ ${data.message}`);
        if (mode === "signup") {
          setMode("otp");
        } else if (mode === "otp") {
          setMode("login");
        } else if (mode === "forgot") {
          setMode("reset");
        } else if (mode === "reset") {
          setMode("login");
        } else if (mode === "login") {
          onAuthSuccess(data.user);
          onClose();
        }
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      setStatus("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl p-6 relative text-slate-100 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-center mb-1 text-emerald-400">
          {mode === "login" && "Welcome Back"}
          {mode === "signup" && "Create Account"}
          {mode === "otp" && "Verify Email OTP"}
          {mode === "forgot" && "Forgot Password"}
          {mode === "reset" && "Set New Password"}
        </h2>

        <p className="text-xs text-slate-400 text-center mb-5">
          {mode === "otp" || mode === "reset" ? `OTP sent to ${formData.email}` : "Enter your details to continue"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <div className="flex items-center bg-slate-800 rounded-xl px-3 border border-slate-700">
                <User className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

          {(mode === "login" || mode === "signup" || mode === "forgot" || mode === "reset") && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email Address</label>
              <div className="flex items-center bg-slate-800 rounded-xl px-3 border border-slate-700">
                <Mail className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={mode === "reset"}
                  required
                  className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

          {(mode === "login" || mode === "signup") && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-400">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="flex items-center bg-slate-800 rounded-xl px-3 border border-slate-700">
                <Lock className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

          {(mode === "otp" || mode === "reset") && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Enter 6-Digit OTP</label>
              <div className="flex items-center bg-slate-800 rounded-xl px-3 border border-slate-700">
                <KeyRound className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  name="otp"
                  placeholder="123456"
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-2.5 text-sm tracking-widest text-center font-mono focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode === "reset" && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">New Password</label>
              <div className="flex items-center bg-slate-800 rounded-xl px-3 border border-slate-700">
                <Lock className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 font-bold text-slate-950 rounded-xl text-sm transition disabled:opacity-50"
          >
            {loading ? "Processing..." : mode === "login" ? "Login" : mode === "signup" ? "Get OTP" : mode === "forgot" ? "Send Reset OTP" : mode === "reset" ? "Reset Password" : "Verify OTP"}
          </button>
        </form>

        {status && <p className="text-xs text-center mt-3 text-slate-300">{status}</p>}

        <div className="mt-4 text-center text-xs text-slate-400">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-emerald-400 font-bold">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Remember password?{" "}
              <button onClick={() => setMode("login")} className="text-emerald-400 font-bold">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
