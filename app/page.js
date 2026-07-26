"use client";
import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import AuthModal from "../components/AuthModal";
import { Lock, LogIn, Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingNetwork, setLoadingNetwork] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  // Handle Watch Ad for Specific Network
  const handleWatchAd = async (networkName) => {
    // 🛑 Guard: Agar user login nahi hai to login popup kholo
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (cooldown > 0) {
      alert(`⏳ Please wait ${cooldown} seconds before watching another ad!`);
      return;
    }

    setLoadingNetwork(networkName);

    // 🚀 Monetag Direct Link Open (Ads Play)
    window.open("https://omg10.com/4/11413091", "_blank");

    try {
      const res = await fetch("/api/user/add-coins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, network: networkName }),
      });

      const data = await res.json();

      if (data.success) {
        setUser({
          ...user,
          coins: data.coins,
          dailyAds: data.dailyAds,
        });
        alert(data.message);

        // 30-sec Cooldown Timer
        setCooldown(30);
        const interval = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Failed to process ad reward.");
    } finally {
      setLoadingNetwork(null);
    }
  };

  const adNetworks = [
    {
      id: "unity",
      name: "Unity Video Ads",
      desc: "High eCPM Reward Video Server",
      color: "from-purple-600 to-indigo-600",
      icon: "⚡",
    },
    {
      id: "applovin",
      name: "AppLovin MAX",
      desc: "Fast Loading Video Ads Server",
      color: "from-blue-600 to-cyan-600",
      icon: "💎",
    },
    {
      id: "monetag",
      name: "Monetag Rewarded",
      desc: "Instant Web Video Ads Server",
      color: "from-emerald-600 to-teal-600",
      icon: "🔥",
    },
  ];

  return (
    <main className="w-full max-w-md mx-auto bg-slate-900 min-h-screen text-slate-100 relative pb-24">
      <Header user={user} onLoginClick={() => setIsAuthOpen(true)} />

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs text-slate-400 font-medium">Your Total Balance</span>
            <div className="text-2xl font-black text-amber-400 mt-0.5">
              🪙 {user ? user.coins || 0 : 0}
            </div>
            <span className="text-xs text-emerald-400 font-semibold">
              ≈ ₹{((user?.coins || 0) / 100).toFixed(2)} INR
            </span>
          </div>
          
          {cooldown > 0 ? (
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse">
              ⏱️ Wait {cooldown}s
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 1000 🪙 = ₹10
            </div>
          )}
        </div>

        {/* Section Header */}
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            🎬 Watch Ads & Earn Cash
          </h2>
          <p className="text-xs text-slate-400">Earn 100 Coins per ad (Limit: 20 Ads/Day per server)</p>
        </div>

        {/* 🔒 IF USER IS NOT LOGGED IN: Show Login Prompt */}
        {!user ? (
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Login Required to Earn</h3>
              <p className="text-xs text-slate-400 mt-1">
                Please login or create an account to unlock video ad servers and start earning real cash.
              </p>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <LogIn className="w-4 h-4" /> Login / Signup to Earn
            </button>
          </div>
        ) : (
          /* ✅ IF USER IS LOGGED IN: Show 3 Ad Provider Cards */
          <div className="space-y-3">
            {adNetworks.map((net) => {
              const count = user?.dailyAds?.[net.id] || 0;
              const isCompleted = count >= 20;

              return (
                <div
                  key={net.id}
                  className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between hover:border-slate-600 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{net.icon}</span>
                      <h3 className="text-sm font-bold text-white">{net.name}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400">{net.desc}</p>
                    <div className="text-[11px] text-cyan-400 font-medium">
                      Daily Progress: <span className="text-white font-bold">{count} / 20</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWatchAd(net.id)}
                    disabled={loadingNetwork === net.id || isCompleted || cooldown > 0}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-md bg-gradient-to-r ${net.color} text-white disabled:opacity-40`}
                  >
                    {loadingNetwork === net.id
                      ? "Loading..."
                      : isCompleted
                      ? "Completed"
                      : "Watch Ad"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
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
                    
