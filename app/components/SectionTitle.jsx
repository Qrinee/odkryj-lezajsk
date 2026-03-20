export default function SectionTitle({ title = "Wizualizacja 3D Miasta", icon = "🏛️" }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 mb-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
        <div className="flex items-center gap-3 px-4">
          <span className="text-2xl">{icon}</span>
          <span className="text-lg font-semibold text-slate-700 uppercase tracking-widest">{title}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      </div>
    </div>
  );
}
