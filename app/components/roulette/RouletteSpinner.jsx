"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ROULETTE_ITEMS, SPIN_DURATION_MS } from "../../data/cityData";

export default function RouletteSpinner({
  showRoulette,
  setShowRoulette,
  isSpinning,
  setIsSpinning,
  setWinner,
  setShowWinner,
  showUnlockAnimation,
  setShowUnlockAnimation,
  newlyUnlocked,
  setNewlyUnlocked,
  unlockedElements,
  setUnlockedElements,
  elementToUnlock,
  onUnlockComplete,
}) {
  const containerRef = useRef(null);
  const [spinSequence, setSpinSequence] = useState([]);
  const [translateX, setTranslateX] = useState(0);
  const [isFastForwarding, setIsFastForwarding] = useState(false);
  const timeoutIdRef = useRef(null);
  const finishCallbackRef = useRef(null);

  useEffect(() => {
    if (elementToUnlock && showRoulette) {
      startSpin(elementToUnlock);
    }
  }, [elementToUnlock, showRoulette]);

  const startSpin = useCallback((element) => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsFastForwarding(false);
    setWinner(null);
    setShowWinner(false);
    setTranslateX(0);

    const sequence = [];
    const totalItemsInSequence = 160;

    for (let i = 0; i < totalItemsInSequence; i++) {
      const randomItem = ROULETTE_ITEMS[Math.floor(Math.random() * ROULETTE_ITEMS.length)];
      sequence.push({ ...randomItem, instanceId: i });
    }
    setSpinSequence(sequence);

    const winningIndex = 120;
    const targetElement = ROULETTE_ITEMS.find(item => item.originalElement.id === element.id);
    sequence[winningIndex] = { ...targetElement, instanceId: winningIndex };

    const gap = 16;
    const itemFullWidth = 144 + gap;

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

      finishCallbackRef.current = () => {
        setIsSpinning(false);
        setIsFastForwarding(false);
        setWinner(sequence[winningIndex]);

        setTimeout(() => {
          setShowRoulette(false);
          setShowWinner(true);

          setUnlockedElements([...unlockedElements, element.code]);
          setNewlyUnlocked(element);
          setShowUnlockAnimation(true);

          setTimeout(() => {
            setShowWinner(false);
          }, 2000);

          setTimeout(() => {
            setShowUnlockAnimation(false);
            setNewlyUnlocked(null);
            if (onUnlockComplete) {
              onUnlockComplete(element);
            }
          }, 3500);
        }, 500);
      };

      timeoutIdRef.current = setTimeout(() => {
        if (finishCallbackRef.current) finishCallbackRef.current();
      }, SPIN_DURATION_MS);

    }, 100);
  }, [isSpinning, unlockedElements, setIsSpinning, setWinner, setShowWinner, setShowRoulette, setUnlockedElements, setNewlyUnlocked, setShowUnlockAnimation, onUnlockComplete]);

  const handleFastForward = () => {
    if (isSpinning && !isFastForwarding) {
      setIsFastForwarding(true);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
          if (finishCallbackRef.current) finishCallbackRef.current();
        }, 1200);
      }
    }
  };

  if (!showRoulette) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={handleFastForward}
    >
      <h2 className="text-4xl font-extrabold tracking-tight text-white mb-12 drop-shadow-lg uppercase">
        Losowanie elementu miasta...
      </h2>

      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-8">
        <div className="relative w-full h-56 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer">
          <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-blue-400 z-10 -translate-x-1/2"></div>
          <div className="absolute top-0 left-1/2 w-5 h-5 bg-blue-400 z-10 -translate-x-1/2 rotate-45 -translate-y-2"></div>
          <div className="absolute bottom-0 left-1/2 w-5 h-5 bg-blue-400 z-10 -translate-x-1/2 rotate-45 translate-y-2"></div>

          <div
            ref={containerRef}
            className="flex items-center h-full px-4"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: (isSpinning && translateX !== 0) ? `transform ${isFastForwarding ? 1200 : SPIN_DURATION_MS}ms cubic-bezier(0.1, 0.9, 0.2, 1)` : "none",
              gap: '16px',
              width: 'max-content'
            }}
          >
            {spinSequence.map((item, idx) => {
              return (
                <div
                  key={item.instanceId + '-' + idx}
                  className={`flex-shrink-0 w-36 h-44 flex flex-col items-center justify-end pb-3 rounded-xl shadow-xl bg-slate-800 transition-all duration-300 relative overflow-hidden`}
                  style={{
                    opacity: isSpinning ? 0.6 : 1,
                  }}
                >
                  <img src={item.originalElement.newImage} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <span className="relative z-10 text-base font-black text-white text-center px-1 uppercase tracking-wide drop-shadow-md">{item.name}</span>
                </div>
              );
            })}
          </div>

          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
        </div>
        {isSpinning && (
          <p className={`text-sm transition-colors duration-300 ${isFastForwarding ? 'text-sky-400 font-medium' : 'text-white/50 animate-pulse'}`}>
            {isFastForwarding ? 'Losowanie przyspieszone 🚀' : 'Kliknij w ekran, aby przyspieszyć losowanie'}
          </p>
        )}
      </div>
    </div>
  );
}
