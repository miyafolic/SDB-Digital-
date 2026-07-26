"use client";
import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Coins Add Karne Ka Function
  const handleWatchAd = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setLoading(true);

    try {
      // 1. Database me coins update karo
      const res = await fetch("/api/user/add-coins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, coinsToAdd: 100 }),
      });

      const data = await res.json();

      if (data.success) {
        setUser({ ...user, coins: data.coins });
        alert("🎉 Success! 100 Coins added to your account.");
      } else {
        alert("❌ Failed to add coins: " + data.message);
      }
    } catch (err) {
      alert("❌ Something went wrong while adding coins.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-md mx-auto bg-slate-900 min-h-screen text-slate-100 relative pb-24">
      <Header user={user} onLoginClick={() => setIsAuthOpen(true)} />

      <div className="p-4 space-y-4">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider">SDB DIGITAL CORE</p>
          <h1 className="text-2xl font-black mt-1">Watch Ads & Earn Cash</h1>
          <p className="text-xs mt-1 text-slate-100 opacity-90">
            1,000 Coins = ₹10 Real Money | Instant UPI Payouts
          </p>
          
          <button 
            onClick={handleWatchAd}
            disabled={loading}
            className="mt-4 px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition shadow-md disabled:opacity-50"
          >
            {loading ? "Processing..." : user ? "🎬 Watch Ad (+100 Coins)" : "Login to Start Earning →"}
          </button>
        </div>

        {/* User Balance Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">Total Balance</span>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-1">
              🪙 {user ? user.coins || 0 : 0}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium block mt-1">
              ≈ ₹{((user?.coins || 0) / 100).toFixed(2)} INR
            </span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">Payout Threshold</span>
            <div className="text-xl font-bold text-cyan-400 mt-1">
              1,000 🪙
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Min ₹10 Withdrawal
            </span>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={(userData) => setUser(userData)} 
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
