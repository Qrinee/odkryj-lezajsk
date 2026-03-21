import { useMemo, useState } from "react";
import ScannerModal from "./ScannerModal";

export default function Hero({ inputCode, setInputCode, error, onSubmit, unlockedCount, totalElements, isNightMode, toggleNightMode }) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 3) {
      toggleNightMode();
      setClickCount(0);
    }
  };

  const handleScanSuccess = (decodedText) => {
    setIsScannerOpen(false);
    setInputCode(decodedText);
    onSubmit(null, decodedText);
  };
  const bubbles = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      const size = 10 + Math.random() * 40;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${12 + Math.random() * 25}s`,
        animationDelay: `${Math.random() * -20}s`
      };
    });
  }, []);

  return (
    <div className="relative h-screen min-h-[600px]">

      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Mountains"
          className="w-full h-full object-cover animate-ken-burns scale-105"
        />

        <div className={`absolute inset-0 transition-colors duration-1000 ${isNightMode ? 'bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-800/80' : 'bg-gradient-to-b from-sky-950/70 via-sky-900/50 to-sky-400'}`} />

        {/* Animated Bubbles Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
          {bubbles.map((bubble) => (
            <div
              key={`bubble-${bubble.id}`}
              className="bubble"
              style={{
                left: bubble.left,
                width: bubble.width,
                height: bubble.height,
                animationDuration: bubble.animationDuration,
                animationDelay: bubble.animationDelay
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">

        <div className="mb-8">
          <div 
            onClick={handleLogoClick}
            className={`w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-2xl cursor-pointer transition-transform active:scale-95 hover:scale-105 ${clickCount > 0 ? 'animate-pulse' : ''}`}
            title="Tajemnicza kropla..."
          >
            {isNightMode ? "🌙" : "💧"}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-white/90 font-medium tracking-wide">Leżajsk Collection 2026</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-cyan-100 drop-shadow-2xl">
            Odkryj Leżajsk
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto text-center leading-relaxed mb-10">
          Kup wodę, znajdź kod pod nakrętką i odsłoń kawałek miasta!
        </p>

        <div className="w-full max-w-xl">
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 relative z-20">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Wpisz kod z nakrętki..."
              className="flex-1 px-8 py-5 text-xl font-medium rounded-2xl bg-white/10 backdrop-blur-xl border border-white/40 text-white placeholder-white/80 focus:outline-none focus:ring-4 focus:ring-cyan-300/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all"
            />
            <button
              type="submit"
              className="px-10 py-5 text-xl font-bold bg-white text-sky-900 hover:bg-cyan-50 hover:text-sky-800 rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] shadow-xl cursor-pointer"
            >
              Odkryj
            </button>
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="px-4 py-5 cursor-pointer text-2xl bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white/20 rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] shadow-xl flex items-center justify-center"
              title="Zeskanuj kod aparatem"
            >
              <img src='/aparat.webp' className="w-full" />
            </button>
          </form>
          {error && (
            <p className="mt-3 text-center text-rose-300 font-medium animate-shake">
              {error}
            </p>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm mb-2">Postęp: {unlockedCount} / {totalElements}</p>
          <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-700 rounded-full"
              style={{ width: `${(unlockedCount / totalElements) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
