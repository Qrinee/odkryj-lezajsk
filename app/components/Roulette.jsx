"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ROULETTE_ITEMS, SPIN_DURATION_MS } from "../data/cityData";

export default function Roulette({
  showRoulette,
  setShowRoulette,
  isSpinning,
  setIsSpinning,
  showWinner,
  setShowWinner,
  winner,
  setWinner,
  showUnlockAnimation,
  setShowUnlockAnimation,
  newlyUnlocked,
  setNewlyUnlocked,
  unlockedElements,
  setUnlockedElements,
  totalElements,
  elementToUnlock,
}) {
  const containerRef = useRef(null);
  const [spinSequence, setSpinSequence] = useState([]);
  const [translateX, setTranslateX] = useState(0);

  // Handle the spin when elementToUnlock changes
  useEffect(() => {
    if (elementToUnlock && showRoulette) {
      startSpin(elementToUnlock);
    }
  }, [elementToUnlock, showRoulette]);

  const startSpin = useCallback((element) => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    setShowWinner(false);
    setTranslateX(0);

    // Generate random sequence
    const sequence = [];
    const totalItemsInSequence = 160;
    
    for (let i = 0; i < totalItemsInSequence; i++) {
      const randomItem = ROULETTE_ITEMS[Math.floor(Math.random() * ROULETTE_ITEMS.length)];
      sequence.push({ ...randomItem, instanceId: i });
    }
    setSpinSequence(sequence);

    // Find winning index (the element that was unlocked)
    const winningIndex = 120;
    const targetElement = ROULETTE_ITEMS.find(item => item.originalElement.id === element.id);
    sequence[winningIndex] = { ...targetElement, instanceId: winningIndex };

    const gap = 16;
    const itemFullWidth = 144 + gap; // w-36 is 144px
    
    setTimeout(() => {
      let containerWidth = 800;
      if (containerRef.current && containerRef.current.parentElement && containerRef.current.parentElement.clientWidth > 0) {
        containerWidth = containerRef.current.parentElement.clientWidth;
      }

      const randomOffset = Math.floor(Math.random() * 100) - 50;
      let finalPosition = -(winningIndex * itemFullWidth) + (containerWidth / 2) - (itemFullWidth / 2) + randomOffset;
      
      if (isNaN(finalPosition)) {
        finalPosition = -13000;
      }

      setTranslateX(finalPosition);

      // After spin finishes
      setTimeout(() => {
        setIsSpinning(false);
        setWinner(sequence[winningIndex]);
        
        setTimeout(() => {
          setShowRoulette(false);
          setShowWinner(true);
          
          // Complete the unlock process
          setUnlockedElements([...unlockedElements, element.code]);
          setNewlyUnlocked(element);
          setShowUnlockAnimation(true);
          
          setTimeout(() => {
            setShowWinner(false);
          }, 2000);
          
          setTimeout(() => {
            setShowUnlockAnimation(false);
            setNewlyUnlocked(null);
          }, 3500);
        }, 500);
        
      }, SPIN_DURATION_MS);
    }, 100);
  }, [isSpinning, unlockedElements, setIsSpinning, setWinner, setShowWinner, setShowRoulette, setUnlockedElements, setNewlyUnlocked, setShowUnlockAnimation]);

  return (
    <>
      {/* Roulette Modal */}
      {showRoulette && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-12 drop-shadow-lg uppercase">
            Losowanie elementu miasta...
          </h2>

          <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-8">
            {/* Roulette Container */}
            <div className="relative w-full h-56 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* The center pointer Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-yellow-400 z-10 -translate-x-1/2 shadow-[0_0_20px_rgba(250,204,21,1)]"></div>
              <div className="absolute top-0 left-1/2 w-5 h-5 bg-yellow-400 z-10 -translate-x-1/2 rotate-45 -translate-y-2"></div>
              <div className="absolute bottom-0 left-1/2 w-5 h-5 bg-yellow-400 z-10 -translate-x-1/2 rotate-45 translate-y-2"></div>
              
              {/* The sliding track */}
              <div 
                ref={containerRef}
                className="flex items-center h-full px-4"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: isSpinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.1, 0.9, 0.2, 1)` : "none",
                  gap: '16px',
                  width: 'max-content'
                }}
              >
                {spinSequence.map((item, idx) => {
                  return (
                    <div 
                      key={item.instanceId + '-' + idx} 
                      className={`flex-shrink-0 w-36 h-44 flex flex-col items-center justify-center rounded-xl shadow-xl ${item.color} ${item.text} transition-all duration-300 relative overflow-hidden`}
                      style={{
                        opacity: isSpinning ? 0.6 : 1,
                        filter: isSpinning ? 'blur(1px)' : 'none'
                      }}
                    >
                      <div className="absolute inset-0 bg-white opacity-10 mix-blend-overlay"></div>
                      <span className="text-base font-black text-center px-2 uppercase tracking-wide drop-shadow-md">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Fade edges */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}

      {/* Winner Presentation */}
      {showWinner && winner && (() => {
        return (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-500">
            <div className="text-center animate-bounce-slow">
              <span className="text-gray-400 text-xl mb-4 block uppercase tracking-[0.4em] font-semibold">Wygrałeś!</span>
              <div className={`w-64 h-72 mx-auto flex flex-col items-center justify-center rounded-2xl shadow-2xl ${winner.color} ${winner.text} relative overflow-hidden transform hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 bg-white opacity-20 mix-blend-overlay"></div>
                <span className="text-2xl font-black text-center px-4 uppercase tracking-wider drop-shadow-md">
                  {winner.name}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Unlock Animation Overlay */}
      {showUnlockAnimation && newlyUnlocked && (
        <div className="fixed inset-0 bg-sky-950/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg mx-4 animate-scale-in">
            {/* Image Header */}
            <div className="relative h-56">
              <img 
                src={newlyUnlocked.image} 
                alt={newlyUnlocked.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              
              {/* Celebration */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                <span className="text-4xl animate-bounce">🎉</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>⭐</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🎉</span>
              </div>

              {/* Icon */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-3xl shadow-xl">
                {newlyUnlocked.icon}
              </div>
            </div>
            
            {/* Content */}
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
              
              {/* Progress */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-400 mb-3">
                  Kolekcja: {unlockedElements.length + 1} / {totalElements}
                </p>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-700 rounded-full"
                    style={{ width: `${((unlockedElements.length + 1) / totalElements) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
