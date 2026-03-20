export default function ImageBanner({ 
  title = "Leżajsk", 
  subtitle = "Miasto z bogatą historią i naturalnymi źródłami" 
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <div className="relative h-64 rounded-3xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=600&fit=crop" 
          alt="Leżajsk Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/40 to-cyan-900/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h2>
            <p className="text-xl text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
