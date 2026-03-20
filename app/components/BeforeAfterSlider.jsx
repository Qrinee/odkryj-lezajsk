"use client";

import { useState } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Dawniej", afterLabel = "Dziś" }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden group shadow-inner bg-slate-100">
      {/* After Image (Background/Bottom) */}
      <div className="absolute inset-0 w-full h-full">
        <img src={afterImage} alt="Obecny wygląd" className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-md transition-opacity">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground/Top, Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Dawny wygląd" className="w-full h-full object-cover" />
        {/* Przykładowy filtr sepia/grayscale można nałożyć na zdjęcie dawne ręcznie stylizując np. klasę, ale tu zakładamy odpowiednie zrodlo starego zdjecia */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-md transition-opacity">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Control Line & Thumb */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%`, transform: `translateX(-50%)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-200 pointer-events-auto">
           <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
          </svg>
        </div>
      </div>

      {/* Invisible Range Input for Interaction */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0"
      />
    </div>
  );
}
