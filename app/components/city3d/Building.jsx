"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";
import { BUILDINGS_CONFIG, getBuildingConfig } from "./buildingsConfig";

// Generic FBX Building component that uses config for all settings
export function FbxBuilding({ modelName, position, name, isUnlocked, onClick, isTargeted }) {
  const groupRef = useRef();
  const [showLock, setShowLock] = useState(true);
  const [lockAnimating, setLockAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get config for this building type
  const config = getBuildingConfig(modelName);
  const fbxPath = config?.fbxPath || `/fbx/${modelName}.fbx`;
  const scale = config?.scale || 0.01;
  const lockPos = config?.lockPosition || [0, 4, 0];
  const labelPos = config?.labelPosition || [0, 3, 0];
  
  const fbx = useLoader(FBXLoader, fbxPath);
  
  // Apply visibility effect when isUnlocked changes
  useEffect(() => {
    if (!fbx) return;
    
    fbx.scale.setScalar(scale);
    
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Store reference to original material on first render
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
        }
        
        if (!isUnlocked) {
          // Apply dark silhouette material
          child.material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0.15,
            roughness: 0.9,
            metalness: 0.1,
          });
        } else {
          // Restore original FBX material when unlocked
          if (child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial;
          }
        }
      }
    });
  }, [fbx, isUnlocked, scale]);

  // Trigger unlock animation when targeted
  useEffect(() => {
    if (isTargeted && !isUnlocked) {
      setLockAnimating(true);
      setTimeout(() => {
        setShowLock(false);
        setLockAnimating(false);
      }, 1500);
    } else if (isUnlocked) {
      setShowLock(false);
    }
  }, [isTargeted, isUnlocked]);

  // Calculate hover scale based on base scale
  const hoverScale = isHovered ? 1.08 : 1;
  
  return (
    <group 
      position={position} 
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      scale={hoverScale}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <pointLight
          position={[0, 5, 0]}
          intensity={isUnlocked ? 2 : 1}
          color={isUnlocked ? "#06b6d4" : "#f59e0b"}
          distance={15}
        />
      )}
      <primitive object={fbx} />
      
      {/* Lock marker */}
      {showLock && (
        <Html position={lockPos} center zIndexRange={[100, 0]}>
          <div className={`flex flex-col items-center transition-all duration-500 ${
            lockAnimating ? 'animate-lock-shake scale-125' : ''
          }`}>
            <div className={`w-12 h-12 rounded-full bg-slate-600/90 flex items-center justify-center shadow-lg border-2 border-slate-400 ${
              lockAnimating ? 'bg-cyan-500/90 border-cyan-400' : ''
            }`}>
              <svg 
                className={`w-6 h-6 text-slate-200 transition-all duration-500 ${
                  lockAnimating ? 'animate-lock-open text-white' : ''
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={lockAnimating ? "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"} 
                />
              </svg>
            </div>
            <div className="mt-2 px-3 py-1 bg-slate-800/90 rounded-lg">
              <p className="text-white text-xs font-medium whitespace-nowrap">Zablokowane</p>
            </div>
          </div>
        </Html>
      )}

      {/* Name label */}
      {isUnlocked && (
        <Html position={labelPos} center zIndexRange={[100, 0]}>
          <div className="px-4 py-2 bg-cyan-500/90 rounded-lg shadow-lg animate-label-appear">
            <p className="text-white font-bold text-sm whitespace-nowrap">{name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Wrapper components for each building type
export function MuseumModel(props) {
  return <FbxBuilding modelName="muzeum" {...props} />;
}

export function KlasztorModel(props) {
  return <FbxBuilding modelName="klasztor" {...props} />;
}

export function KosciolModel(props) {
  return <FbxBuilding modelName="kosciol" {...props} />;
}

export function DworzecModel(props) {
  return <FbxBuilding modelName="dworzec" {...props} />;
}

export function RatuszModel(props) {
  return <FbxBuilding modelName="ratusz" {...props} />;
}
