"use client";

import { useEffect, useState } from "react";

export default function OnboardingModal({ isOpen, onStart }) {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  if (!render) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-1000 ${
        isOpen ? 'bg-slate-950/80 backdrop-blur-xl opacity-100' : 'bg-slate-950/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onTransitionEnd={() => {
        if (!isOpen) setRender(false);
      }}
    >
      <div 
        className={`max-w-2xl w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-8 md:p-14 text-center shadow-[0_0_80px_rgba(0,180,255,0.2)] transition-all duration-1000 transform ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-16 scale-90 opacity-0'
        }`}
      >
        <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse-slow">
          <span className="text-6xl drop-shadow-xl">💧</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
          Witaj Odkrywco
        </h2>
        
        <p className="text-lg md:text-2xl text-sky-50 leading-relaxed mb-12 font-medium drop-shadow-md">
          Historia Leżajska zniknęła z map, ale <span className="text-cyan-300 font-bold">Ty</span> możesz ją odtworzyć. 
          Zdobądź unikalne kody spod nakrętek Wody Leżajsk, wpisz je w aplikacji i wspólnie 
          odbudujmy zapomniane, trójwymiarowe miasto.
        </p>

        <button
          onClick={onStart}
          className="group relative px-12 py-6 bg-white text-sky-950 font-black text-xl rounded-2xl hover:bg-cyan-50 hover:scale-105 transition-all w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_80px_rgba(255,255,255,0.7)] overflow-hidden"
        >
          <span className="relative z-10 block uppercase tracking-wider">Rozpocznij przygodę</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        </button>
      </div>
    </div>
  );
}
