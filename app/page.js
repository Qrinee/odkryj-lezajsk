"use client";

import { useState, useRef } from "react";
import City3D from "./components/City3D";
import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import SectionTitle from "./components/SectionTitle";
import CityElementsGrid from "./components/CityElementsGrid";
import ImageBanner from "./components/ImageBanner";
import WaterInfoSection from "./components/WaterInfoSection";
import Footer from "./components/Footer";
import Roulette from "./components/Roulette";
import { CITY_ELEMENTS } from "./data/cityData";

export default function Home() {
  const [inputCode, setInputCode] = useState("");
  const [unlockedElements, setUnlockedElements] = useState([]);
  const [error, setError] = useState("");
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
   
  // Roulette states
  const [showRoulette, setShowRoulette] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [elementToUnlock, setElementToUnlock] = useState(null);
   
  const cityRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedInput = inputCode.trim().toUpperCase();
    
    if (unlockedElements.includes(normalizedInput)) {
      setError("Ten kod został już wykorzystany!");
      return;
    }

    const matchedElement = CITY_ELEMENTS.find(
      (el) => el.code === normalizedInput
    );

    if (matchedElement) {
      setElementToUnlock(matchedElement);
      setShowRoulette(true);
    } else {
      setError("Nieprawidłowy kod! Spróbuj ponownie.");
    }
  };

  const isUnlocked = (code) => unlockedElements.includes(code);

  const handleElementClick = (code) => {
    setInputCode(code);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Full Screen Background */}
      <Hero 
        inputCode={inputCode}
        setInputCode={setInputCode}
        error={error}
        onSubmit={handleSubmit}
        unlockedCount={unlockedElements.length}
        totalElements={CITY_ELEMENTS.length}
      />

      {/* Wave Divider */}
      <WaveDivider />

      {/* Main Content - Light Theme */}
      <main className="relative bg-sky-50 pb-16">
        {/* Section Title */}
        <SectionTitle />

        {/* 3D City Visualization */}
        <div className="mx-auto px-4" ref={cityRef}>
          <City3D 
            elements={CITY_ELEMENTS} 
            unlockedElements={unlockedElements}
            onElementClick={(element) => {
              if (!isUnlocked(element.code)) {
                setInputCode(element.code);
              }
            }}
          />
        </div>

        {/* City Elements Grid */}
        <CityElementsGrid 
          elements={CITY_ELEMENTS}
          isUnlocked={isUnlocked}
          showUnlockAnimation={showUnlockAnimation}
          newlyUnlocked={newlyUnlocked}
          onElementClick={handleElementClick}
        />

        {/* Decorative Image Banner */}
        <ImageBanner />

        {/* Water Info Section */}
        <WaterInfoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Roulette Components */}
      <Roulette
        showRoulette={showRoulette}
        setShowRoulette={setShowRoulette}
        isSpinning={isSpinning}
        setIsSpinning={setIsSpinning}
        showWinner={showWinner}
        setShowWinner={setShowWinner}
        winner={winner}
        setWinner={setWinner}
        showUnlockAnimation={showUnlockAnimation}
        setShowUnlockAnimation={setShowUnlockAnimation}
        newlyUnlocked={newlyUnlocked}
        setNewlyUnlocked={setNewlyUnlocked}
        unlockedElements={unlockedElements}
        setUnlockedElements={setUnlockedElements}
        totalElements={CITY_ELEMENTS.length}
        elementToUnlock={elementToUnlock}
      />

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
