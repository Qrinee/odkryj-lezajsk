export default function Hero({ inputCode, setInputCode, error, onSubmit, unlockedCount, totalElements }) {
  return (
    <div className="relative h-screen min-h-[600px]">
      
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop" 
          alt="Mountains"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/60 via-sky-900/40 to-sky-200" />

        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-2xl">
            💧
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
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Wpisz kod z nakrętki..."
              className="flex-1 px-6 py-4 text-lg rounded-2xl bg-white/95 backdrop-blur text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 shadow-xl"
            />
            <button
              type="submit"
              className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white rounded-2xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              Odkryj
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
    </div>
  );
}
