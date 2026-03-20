export default function UnlockCelebration({ showUnlockAnimation, newlyUnlocked, unlockedElementsCount, totalElements }) {
  if (!showUnlockAnimation || !newlyUnlocked) return null;

  return (
    <div className="fixed inset-0 bg-sky-950/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg mx-4 animate-scale-in">
        <div className="relative h-56">
          <img
            src={newlyUnlocked.image}
            alt={newlyUnlocked.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="text-4xl animate-bounce">🎉</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-3xl shadow-xl">
            {newlyUnlocked.icon}
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-600 mb-2">
            Odblokowałeś fragment miasta!
          </h2>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent mb-2">
            {newlyUnlocked.name}
          </h3>
          <p className="text-slate-500 mb-6">
            {newlyUnlocked.description}
          </p>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 mb-3">
              Kolekcja: {unlockedElementsCount} / {totalElements}
            </p>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-300 rounded-full"
                style={{ width: `${(unlockedElementsCount / totalElements) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
