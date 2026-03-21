"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Budowanie Leżajska...",
  "Stawianie kamienic...",
  "Malowanie elewacji...",
  "Sadzenie drzew...",
  "Kładzenie torów...",
  "Dzwony kościelne...",
  "Gotowi?",
];

export default function CityLoader({ progress = 0 }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Change message based on progress
    const index = Math.min(
      Math.floor((progress / 100) * LOADING_MESSAGES.length),
      LOADING_MESSAGES.length - 1
    );
    setMessageIndex(index);
  }, [progress]);

  const displayProgress = Math.round(progress);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Animated city icon */}
      <div className="relative mb-8">
        <svg
          className="w-24 h-24 animate-bounce-slow"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building 1 - tall */}
          <rect
            x="20"
            y="30"
            width="20"
            height="50"
            fill="#06b6d4"
            className="animate-pulse"
          />
          <rect x="23" y="35" width="5" height="5" fill="#0f172a" />
          <rect x="32" y="35" width="5" height="5" fill="#0f172a" />
          <rect x="23" y="45" width="5" height="5" fill="#0f172a" />
          <rect x="32" y="45" width="5" height="5" fill="#0f172a" />
          <rect x="23" y="55" width="5" height="5" fill="#0f172a" />
          <rect x="32" y="55" width="5" height="5" fill="#0f172a" />

          {/* Building 2 - church */}
          <rect x="45" y="40" width="30" height="40" fill="#f59e0b" />
          <polygon points="45,40 60,20 75,40" fill="#f59e0b" />
          <rect x="57" y="45" width="6" height="10" fill="#0f172a" />
          <circle cx="60" cy="30" r="3" fill="#f59e0b" className="animate-ping" />

          {/* Building 3 - small */}
          <rect x="80" y="50" width="15" height="30" fill="#06b6d4" className="animate-pulse" />
          <rect x="83" y="55" width="3" height="3" fill="#0f172a" />
          <rect x="90" y="55" width="3" height="3" fill="#0f172a" />
          <rect x="83" y="65" width="3" height="3" fill="#0f172a" />
          <rect x="90" y="65" width="3" height="3" fill="#0f172a" />

          {/* Ground */}
          <rect x="10" y="80" width="90" height="5" fill="#334155" />
          <rect x="15" y="85" width="80" height="5" fill="#475569" />
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full animate-pulse" />
      </div>

      {/* Loading message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
        {LOADING_MESSAGES[messageIndex]}
      </h2>

      {/* Progress bar */}
      <div className="w-64 h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <p className="text-cyan-400 font-mono text-lg">
        {displayProgress}%
      </p>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
