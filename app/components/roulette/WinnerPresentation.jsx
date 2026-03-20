export default function WinnerPresentation({ showWinner, winner }) {
  if (!showWinner || !winner) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-500">
      <div className="text-center animate-bounce-slow">
        <span className="text-gray-400 text-xl mb-4 block uppercase tracking-[0.4em] font-semibold">Wygrałeś!</span>
        <div className={`w-64 h-72 mx-auto flex flex-col items-center justify-end pb-6 rounded-2xl shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform duration-500 bg-slate-800`}>
          <img src={winner.originalElement.newImage} alt={winner.name} className="absolute inset-0 w-full h-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
          <span className="relative z-10 text-3xl font-black text-white text-center px-4 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
            {winner.name}
          </span>
        </div>
      </div>
    </div>
  );
}
