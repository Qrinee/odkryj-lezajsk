"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MuseumModel, KlasztorModel, KosciolModel, DworzecModel, RatuszModel } from "./city3d/Building";
import CameraController from "./city3d/CameraController";
import Environment from "./city3d/Environment";
import { BUILDINGS_CONFIG } from "./city3d/buildingsConfig";

// Main 3D Scene
function Scene({ elements, unlockedElements, zoomTarget, onZoomChange }) {
  const isUnlocked = (code) => unlockedElements.includes(code);

  return (
    <>
      {/* Environment (sky, lights, terrain) */}
      <Environment />
      
      {/* Camera controller for zoom animation */}
      <CameraController zoomTarget={zoomTarget} elements={elements} />
      
      {/* Buildings - using config for positions */}
      {elements.map((element, index) => {
        const config = BUILDINGS_CONFIG[index];
        const isTargeted = zoomTarget === element.id;
        
        if (config?.model === "muzeum") {
          return (
            <MuseumModel
              key={element.id}
              position={config.position}
              name={element.name}
              isUnlocked={isUnlocked(element.code)}
              isTargeted={isTargeted}
            />
          );
        }
        
        if (config?.model === "klasztor") {
          return (
            <KlasztorModel
              key={element.id}
              position={config.position}
              name={element.name}
              isUnlocked={isUnlocked(element.code)}
              isTargeted={isTargeted}
            />
          );
        }
        
        if (config?.model === "kosciol") {
          return (
            <KosciolModel
              key={element.id}
              position={config.position}
              name={element.name}
              isUnlocked={isUnlocked(element.code)}
              isTargeted={isTargeted}
            />
          );
        }
        
        if (config?.model === "dworzec") {
          return (
            <DworzecModel
              key={element.id}
              position={config.position}
              name={element.name}
              isUnlocked={isUnlocked(element.code)}
              isTargeted={isTargeted}
            />
          );
        }
        
        if (config?.model === "ratusz") {
          return (
            <RatuszModel
              key={element.id}
              position={config.position}
              name={element.name}
              isUnlocked={isUnlocked(element.code)}
              isTargeted={isTargeted}
            />
          );
        }
        
        return null;
      })}

      {/* Camera controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={18}
        maxDistance={100}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

// Main component
export default function City3D({ elements, unlockedElements, onElementClick }) {
  const [zoomTarget, setZoomTarget] = useState(null);


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
        />
      </Canvas>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4">
        <p className="text-white text-sm font-medium mb-2">Legenda:</p>
        <div className="flex items-center gap-2 text-slate-300 text-xs">
          <div className="w-4 h-4 rounded bg-slate-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span>Zablokowany</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-xs mt-1">
          <div className="w-4 h-4 rounded bg-cyan-500" />
          <span>Odkryty</span>
        </div>
        <div className="border-t border-slate-700 mt-2 pt-2">
          <p className="text-cyan-400 text-xs">💡 Kliknij budynek aby przybliżyć</p>
        </div>
      </div>
    </div>
  );
}
