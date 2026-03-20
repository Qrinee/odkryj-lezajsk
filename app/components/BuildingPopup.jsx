"use client";

import { useState, useEffect } from "react";

export default function BuildingPopup({ element, isUnlocked, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Popup Content */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isUnlocked ? 'bg-cyan-500' : 'bg-slate-500'}`}>
            {element.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{element.name}</h3>
            <p className="text-sm text-slate-500">{element.description}</p>
          </div>
        </div>

        {/* Content */}
        {isUnlocked ? (
          <div className="bg-cyan-50 rounded-xl p-4">
            <p className="text-slate-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        ) : (
          <div className="bg-slate-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-semibold text-slate-700">Ten element jest zablokowany!</span>
            </div>
            <p className="text-slate-500 text-sm">
              Znajdź kod pod nakrętką wody Leżajsk i wpisz go powyżej, aby odblokować ten budynek.
            </p>
            <div className="mt-3 p-2 bg-slate-200 rounded-lg">
              <p className="text-xs text-slate-600 font-mono">Kod: {element.code}</p>
            </div>
          </div>
        )}

        {/* Action button for locked items */}
        {!isUnlocked && (
          <button 
            onClick={handleClose}
            className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-500 transition-all"
          >
            Wpisz kod
          </button>
        )}
      </div>
    </div>
  );
}
