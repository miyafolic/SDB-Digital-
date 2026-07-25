import React from 'react';
import HeaderLogo from './HeaderLogo';

export default function Header({ userCoins = 1250 }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      {/* Direct Import of Logo Component */}
      <HeaderLogo width={150} height={36} />

      {/* Header Right Side: Realtime User Coin Balance */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-amber-500/30 px-3 py-1.5 rounded-full shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            🪙 {userCoins.toLocaleString()}
          </span>
        </div>
      </div>
    </header>
  );
}
