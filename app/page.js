"use client";

import { useState, useCallback } from "react";
import { useCityGame } from "./hooks/useCityGame";
import City3D from "./components/City3D";
import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import SectionTitle from "./components/SectionTitle";
import CityElementsGrid from "./components/CityElementsGrid";
import ImageBanner from "./components/ImageBanner";
import WaterInfoSection from "./components/WaterInfoSection";
import Footer from "./components/Footer";
import Roulette from "./components/Roulette";
import OnboardingModal from "./components/OnboardingModal";
import BuildingPopup from "./components/BuildingPopup";
import { CITY_ELEMENTS } from "./data/cityData";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const {
    cityRef,
    inputCode,
    setInputCode,
    unlockedElements,
    setUnlockedElements,
    error,
    showUnlockAnimation,
    setShowUnlockAnimation,
    newlyUnlocked,
    setNewlyUnlocked,
    showRoulette,
    setShowRoulette,
    isSpinning,
    setIsSpinning,
    winner,
    setWinner,
    showWinner,
    setShowWinner,
    elementToUnlock,
    autoOpenElement,
    handleSubmit,
    isUnlocked,
    handleElementClick,
    handleUnlockComplete,
    isNightMode,
    toggleNightMode
  } = useCityGame(CITY_ELEMENTS);

  const [selectedElement, setSelectedElement] = useState(null);

  const handleOpenDetails = useCallback((element) => {
    setSelectedElement(element);
    if (!unlockedElements.includes(element.code)) {
      setInputCode(element.code);
    }
  }, [unlockedElements, setInputCode]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onStart={() => setShowOnboarding(false)} 
      />

      <Hero
        inputCode={inputCode}
        setInputCode={setInputCode}
        error={error}
        onSubmit={handleSubmit}
        unlockedCount={unlockedElements.length}
        totalElements={CITY_ELEMENTS.length}
        isNightMode={isNightMode}
        toggleNightMode={toggleNightMode}
      />

      <WaveDivider />

      <main className={`relative transition-colors duration-1000 ${isNightMode ? 'bg-slate-900' : 'bg-sky-50'}`}>

        <SectionTitle />

        <div className="mx-auto px-4" ref={cityRef}>
          <City3D
            elements={CITY_ELEMENTS}
            unlockedElements={unlockedElements}
            autoOpenElement={autoOpenElement}
            onBuildingClick={handleOpenDetails}
            isNightMode={isNightMode}
          />
        </div>

        <CityElementsGrid
          elements={CITY_ELEMENTS}
          isUnlocked={isUnlocked}
          showUnlockAnimation={showUnlockAnimation}
          newlyUnlocked={newlyUnlocked}
          onElementClick={handleElementClick}
          onOpenDetails={handleOpenDetails}
        />

        <ImageBanner />

        <WaterInfoSection />
      </main>

      <Footer />

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
        onUnlockComplete={handleUnlockComplete}
      />

      {selectedElement && (
        <BuildingPopup
          element={selectedElement}
          isUnlocked={isUnlocked(selectedElement.code)}
          onClose={() => setSelectedElement(null)}
        />
      )}

    </div>
  );
}
