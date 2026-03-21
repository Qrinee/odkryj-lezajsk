"use client";

import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import Scene from "./city3d/Scene";

export default function City3D({ elements, unlockedElements, onBuildingClick = () => {}, autoOpenElement, isNightMode }) {
  const [zoomTarget, setZoomTarget] = useState(null);

  const handleBuildingClick = useCallback((element) => {
    setZoomTarget(element.id);
    if (onBuildingClick) {
      onBuildingClick(element);
    }
  }, [onBuildingClick]);

  useEffect(() => {
    if (autoOpenElement) {
      handleBuildingClick(autoOpenElement);
    }
  }, [autoOpenElement, handleBuildingClick]);

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl relative">
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
    </div>
  );
}
