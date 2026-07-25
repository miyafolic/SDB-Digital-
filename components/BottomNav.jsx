"use client";
import { Home, Tv, Wallet, User } from "lucide-react";

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "earn", label: "Earn", icon: Tv },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 max-w-md mx-auto flex flex-row justify-between items-center px-4 py-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
              isActive
                ? "text-emerald-400 bg-emerald-500/10 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
            <span className="text-[10px] mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
