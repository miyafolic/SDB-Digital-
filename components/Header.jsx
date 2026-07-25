"use client";
import { User, LogIn, Coins } from "lucide-react";

export default function Header({ user, onLoginClick }) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black text-base shadow-md shadow-emerald-500/20">
          S
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-white leading-tight">
            SDB <span className="text-emerald-400">DIGITAL</span>
          </h1>
          <p className="text-[10px] text-slate-400">Watch & Earn</p>
        </div>
      </div>

      {/* Auth Button / User Profile */}
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
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs transition shadow-md shadow-emerald-500/10"
          >
            <LogIn className="w-3.5 h-3.5" />
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
}
