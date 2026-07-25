"use client";
import { LogIn, Coins } from "lucide-react";
import HeaderLogo from "./HeaderLogo";

export default function Header({ user, onLoginClick }) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      {/* Original Header Logo Component */}
      <HeaderLogo />

      {/* User Status / Login Button */}
      <div>
        {user ? (
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">{user.coins || 0}</span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-medium text-slate-200 truncate max-w-[80px]">
              {user.name?.split(" ")[0] || "User"}
            </span>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-1.5 rounded-xl font-bold text-xs transition shadow-md shadow-emerald-500/20"
          >
            <LogIn className="w-3.5 h-3.5" />
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
}
