import React, { useState } from 'react';

function App() {
  const [activeTool, setActiveTool] = useState('wall'); 
  const [walls, setWalls] = useState([
    { id: 1, width: 180, height: 12, top: 120, left: 40, sizeText: '15 ft' },
    { id: 2, width: 12, height: 150, top: 120, left: 40, sizeText: '12 ft' },
  ]);
  const [fixtures, setFixtures] = useState([]);

  // Mobile fast tap canvas handler
  const handleCanvasTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'wall') {
      const newWall = {
        id: Date.now(),
        width: 120,
        height: 12,
        top: y - 6,
        left: x - 60,
        sizeText: '10 ft'
      };
      setWalls([...walls, newWall]);
    } else if (activeTool === 'door' || activeTool === 'window') {
      const newFix = {
        id: Date.now(),
        type: activeTool === 'door' ? '🚪 Door' : '🪟 Window',
        top: y - 15,
        left: x - 20
      };
      setFixtures([...fixtures, newFix]);
    }
  };

  const changeSize = (id) => {
    const newSize = prompt("Naya measurement daalo (e.g., 14 ft 6 in):");
    if (newSize) {
      setWalls(walls.map(w => w.id === id ? { ...w, sizeText: newSize } : w));
    }
  };

  return (
    <div className="h-screen w-screen bg-[#070b12] text-slate-200 flex flex-col overflow-hidden fixed inset-0 select-none">
      
      {/* Top Header */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-4 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-black tracking-widest text-amber-500">MOBILE-CAD v1.0</span>
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE</span>
        </div>
        <button 
          onClick={() => { setWalls([]); setFixtures([]); }}
          className="text-[11px] bg-red-950/30 text-red-400 border border-red-900/30 px-3 py-1 rounded-lg font-bold"
        >
          Clear
        </button>
      </header>

      {/* Main Grid Canvas */}
      <div 
        onClick={handleCanvasTap}
        className="flex-grow bg-[#0c1220] relative overflow-hidden cursor-crosshair"
        style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      >
        {/* Render Walls */}
        {walls.map((wall) => (
          <div
            key={wall.id}
            onClick={(e) => { e.stopPropagation(); changeSize(wall.id); }}
            className="absolute bg-slate-500 border border-slate-400 rounded shadow-lg flex items-center justify-center active:bg-amber-500 transition-colors cursor-pointer"
            style={{ width: wall.width, height: wall.height, top: wall.top, left: wall.left }}
          >
            <span className="absolute -top-6 bg-[#0f172a] border border-slate-700 text-amber-400 text-[9px] font-mono font-bold px-1 py-0.5 rounded shadow whitespace-nowrap">
              {wall.sizeText} ⚙️
            </span>
          </div>
        ))}

        {/* Render Doors/Windows */}
        {fixtures.map((fix) => (
          <div
            key={fix.id}
            className="absolute text-xs bg-[#0f172a]/90 px-1.5 py-1 rounded border border-slate-700 font-bold shadow-md"
            style={{ top: fix.top, left: fix.left }}
          >
            {fix.type}
          </div>
        ))}
      </div>

      {/* Bottom Action Toolbar */}
      <footer className="bg-[#0f172a] border-t border-slate-800 p-4 shrink-0 shadow-2xl z-40">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTool('wall')}
            className={`py-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${activeTool === 'wall' ? 'bg-amber-500 text-slate-950 scale-105' : 'bg-[#151f32] text-slate-300'}`}
          >
            <span className="text-base">🧱</span> Add Wall
          </button>

          <button
            onClick={() => setActiveTool('door')}
            className={`py-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${activeTool === 'door' ? 'bg-amber-500 text-slate-950 scale-105' : 'bg-[#151f32] text-slate-300'}`}
          >
            <span className="text-base">🚪</span> Add Door
          </button>

          <button
            onClick={() => setActiveTool('window')}
            className={`py-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${activeTool === 'window' ? 'bg-amber-500 text-slate-950 scale-105' : 'bg-[#151f32] text-slate-300'}`}
          >
            <span className="text-base">🪟</span> Add Window
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;
                      
