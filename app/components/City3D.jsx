"use client";

import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import Scene from "./city3d/Scene";
import BuildingPopup from "./BuildingPopup";

export default function City3D({ elements, unlockedElements, onElementClick, autoOpenElement }) {
  const [zoomTarget, setZoomTarget] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleBuildingClick = useCallback((element) => {
    setZoomTarget(element.id);
    setSelectedElement(element);
  }, []);

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
    <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [22, 20, 22], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene
          elements={elements}
          unlockedElements={unlockedElements}
          zoomTarget={zoomTarget}
          onBuildingClick={handleBuildingClick}
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
