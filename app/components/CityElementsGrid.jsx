export default function CityElementsGrid({ 
  elements, 
  isUnlocked, 
  showUnlockAnimation, 
  newlyUnlocked,
  onElementClick,
  onOpenDetails
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elements.map((element, index) => {
          const unlocked = isUnlocked(element.code);
          return (
            <div
              key={element.id}
              className={`
                group relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer
                ${unlocked 
                  ? "bg-white shadow-2xl shadow-sky-200" 
                  : "bg-white/80 shadow-lg shadow-sky-100"
                }
                ${showUnlockAnimation && newlyUnlocked?.id === element.id ? "ring-4 ring-cyan-400 ring-offset-4" : ""}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                if (onOpenDetails) {
                  onOpenDetails(element);
                }
              }}
            >
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={element.image} 
                  alt={element.name}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${unlocked ? '' : 'filter blur-lg scale-110'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${unlocked ? 'bg-cyan-500 text-white' : 'bg-slate-600 text-white'}`}>
                  {unlocked ? element.icon : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>

                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative p-5">
                {unlocked ? (
                  <>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{element.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{element.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Odkryto
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-slate-500 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Zablokowane
                    </h3>
                    <p className="text-slate-400 text-sm">Wpisz kod aby odkryć: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{element.code}</span></p>
                  </>
                )}
              </div>

              {unlocked && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-bl-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
