export default function WaterInfoSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop" 
            alt="Woda źródlana"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-transparent flex items-center p-8">
            <div>
              <div className="text-3xl mb-2">💧</div>
              <h3 className="text-2xl font-bold text-white mb-1">Woda źródlana</h3>
              <p className="text-white/80 text-sm">Naturalne źródła regionu</p>
            </div>
          </div>
        </div>
        <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop" 
            alt="Natura"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-transparent flex items-center p-8">
            <div>
              <div className="text-3xl mb-2">🏔️</div>
              <h3 className="text-2xl font-bold text-white mb-1">Okolice miasta</h3>
              <p className="text-white/80 text-sm">Piękno podkarpackiej przyrody</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
