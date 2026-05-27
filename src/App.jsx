import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center shadow-2xl max-w-sm w-full">
        <span className="text-4xl">📐</span>
        <h1 className="text-2xl font-black text-amber-400 mt-4 tracking-wide">HELLO & WELCOME</h1>
        <p className="text-xs text-slate-400 mt-2 font-medium">
          Aapka React + Vite + Tailwind setup GitHub aur Vercel par 100% live ho chuka hai!
        </p>
        <div className="mt-6 px-4 py-2 bg-slate-900/50 rounded-xl text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
          Status: Ready to Code 🚀
        </div>
      </div>
    </div>
  );
}

export default App;
