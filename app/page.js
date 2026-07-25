"use client";
import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Tv, Wallet, ShieldCheck, ArrowRight, PlayCircle, Zap } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [coins, setCoins] = useState(1250);
  const [watchingAd, setWatchingAd] = useState(false);
  const [adTimer, setAdTimer] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState("");

  // Ad Reward Logic
  const handleWatchAd = () => {
    setWatchingAd(true);
    setAdTimer(5);

    const interval = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setWatchingAd(false);
          setCoins((c) => c + 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Withdraw Logic
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (coins < 1000) {
      setWithdrawStatus("❌ Need at least 1,000 Coins (₹10) to withdraw.");
      return;
    }
    setWithdrawStatus("⏳ Processing withdrawal request...");
    
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiId, amountInRs: 10, coinsToDeduct: 1000 }),
      });
      const data = await res.json();
      if (data.success) {
        setCoins((c) => c - 1000);
        setWithdrawStatus(`✅ Success: ${data.message}`);
        setUpiId("");
      } else {
        setWithdrawStatus(`❌ Error: ${data.message}`);
      }
    } catch {
      setWithdrawStatus("✅ Request submitted!");
      setCoins((c) => c - 1000);
    }
  };

  return (
    <main className="w-full min-h-screen text-slate-100 pb-20">
      <Header coins={coins} />

      {/* HOME TAB */}
      {activeTab === "home" && (
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
              SDB DIGITAL Core
            </span>
            <h1 className="text-2xl font-black mt-2">Watch Ads & Earn Cash</h1>
            <p className="text-xs text-emerald-100 mt-1">1,000 Coins = ₹10 Real Money | Instant UPI Payouts</p>
            
            <button
              onClick={() => setActiveTab("earn")}
              className="mt-4 bg-white text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:bg-emerald-50 transition"
            >
              Start Earning Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs font-medium">Total Balance</span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">🪙 {coins}</p>
              <span className="text-[10px] text-emerald-400">≈ ₹{(coins / 100).toFixed(2)} INR</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs font-medium">Daily Limit</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">15 / 20</p>
              <span className="text-[10px] text-slate-400">Ads remaining today</span>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Watch Video Ad</h3>
                <p className="text-xs text-slate-400">+50 Coins per ad</p>
              </div>
            </div>
            <button
              onClick={handleWatchAd}
              disabled={watchingAd}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1"
            >
              {watchingAd ? `${adTimer}s...` : "Watch"}
            </button>
          </div>
        </div>
      )}

      {/* EARN TAB */}
      {activeTab === "earn" && (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-400">
            <Zap className="w-5 h-5" /> Available Ad Tasks
          </h2>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 text-center space-y-3">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <PlayCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base">Rewarded Video Ad #1</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Watch a 5-second sponsor ad to claim 50 instantly credited coins.
            </p>

            <button
              onClick={handleWatchAd}
              disabled={watchingAd}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-extrabold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {watchingAd ? `Watching Ad (${adTimer}s)` : "Watch Ad & Claim +50 Coins"}
            </button>
          </div>
        </div>
      )}

      {/* WALLET TAB */}
      {activeTab === "wallet" && (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-cyan-400">
            <Wallet className="w-5 h-5" /> Withdraw Balance
          </h2>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Current Balance</span>
                <p className="text-lg font-bold text-amber-400">{coins} Coins</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Cash Value</span>
                <p className="text-lg font-bold text-emerald-400">₹{(coins / 100).toFixed(2)}</p>
              </div>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Enter UPI ID (GPay / PhonePe / Paytm)
                </label>
                <input
                  type="text"
                  placeholder="e.g. user@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition"
              >
                Request Instant Withdrawal (Min ₹10)
              </button>
            </form>

            {withdrawStatus && (
              <p className="text-xs p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-slate-300">
                {withdrawStatus}
              </p>
            )}
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "profile" && (
        <div className="p-4 space-y-4">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-emerald-500/30">
              SD
            </div>
            <h3 className="font-bold text-lg mt-2">SDB User</h3>
            <p className="text-xs text-slate-400">sdbuser@example.com</p>
            
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Account Verified
              </span>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
        }
                
