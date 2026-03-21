"use client";

import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress, Preload } from "@react-three/drei";

import Scene from "./city3d/Scene";
import BuildingPopup from "./BuildingPopup";
import CityLoader from "./CityLoader";

function Loader() {
  const { progress } = useProgress();
  return <CityLoader progress={progress} />;
}

export default function City3D({ elements, unlockedElements, onElementClick, onBuildingClick, autoOpenElement, isNightMode }) {
  const [zoomTarget, setZoomTarget] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleBuildingClick = useCallback((element) => {
    setZoomTarget(element.id);
    setSelectedElement(element);
    if (onElementClick) {
      onElementClick(element);
    }
    if (onBuildingClick) {
      onBuildingClick(element);
    }
  }, [onElementClick, onBuildingClick]);

  const handleClosePopup = useCallback(() => {
    setSelectedElement(null);
  }, []);

  useEffect(() => {
    if (autoOpenElement) {
      handleBuildingClick(autoOpenElement);
    }
  }, [autoOpenElement, handleBuildingClick]);

  const isElementUnlocked = (code) => unlockedElements.includes(code);

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl relative">
      <Loader />
      <Canvas
        camera={{ position: [22, 20, 22], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Preload all />
        <Scene
          elements={elements}
          unlockedElements={unlockedElements}
          zoomTarget={zoomTarget}
          onBuildingClick={handleBuildingClick}
          isNightMode={isNightMode}
        />
      </Canvas>

      {selectedElement && (
        <BuildingPopup
          element={selectedElement}
          isUnlocked={isElementUnlocked(selectedElement.code)}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
