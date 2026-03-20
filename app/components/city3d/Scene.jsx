"use client";

import { OrbitControls } from "@react-three/drei";
import { MuseumModel, KlasztorModel, KosciolModel, DworzecModel, RatuszModel } from "./Building";
import CameraController from "./CameraController";
import Environment from "./Environment";
import { BUILDINGS_CONFIG } from "./buildingsConfig";

export default function Scene({ elements, unlockedElements, zoomTarget, onBuildingClick }) {
  const isUnlocked = (code) => unlockedElements.includes(code);

  return (
    <>
      <Environment />
      <CameraController zoomTarget={zoomTarget} elements={elements} />

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
              onClick={() => onBuildingClick(element)}
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
              onClick={() => onBuildingClick(element)}
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
              onClick={() => onBuildingClick(element)}
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
              onClick={() => onBuildingClick(element)}
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
              onClick={() => onBuildingClick(element)}
            />
          );
        }

        return null;
      })}

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
