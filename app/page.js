"use client";

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
import { CITY_ELEMENTS } from "./data/cityData";

export default function Home() {
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
    handleUnlockComplete
  } = useCityGame(CITY_ELEMENTS);

  return (
    <div className="min-h-screen relative overflow-hidden">

      <Hero
        inputCode={inputCode}
        setInputCode={setInputCode}
        error={error}
        onSubmit={handleSubmit}
        unlockedCount={unlockedElements.length}
        totalElements={CITY_ELEMENTS.length}
      />

      {/* <WaveDivider /> */}

      <main className="relative bg-sky-50">

        {/* <SectionTitle /> */}

        <div className="mx-auto px-4" ref={cityRef}>
          <City3D
            elements={CITY_ELEMENTS}
            unlockedElements={unlockedElements}
            autoOpenElement={autoOpenElement}
            onElementClick={(element) => {
              if (!isUnlocked(element.code)) {
                setInputCode(element.code);
              }
            }}
          />
        </div>

        <CityElementsGrid
          elements={CITY_ELEMENTS}
          isUnlocked={isUnlocked}
          showUnlockAnimation={showUnlockAnimation}
          newlyUnlocked={newlyUnlocked}
          onElementClick={handleElementClick}
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

    </div>
  );
}
