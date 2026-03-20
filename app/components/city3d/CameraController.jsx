"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDINGS_CONFIG } from "./buildingsConfig";

const BUILDING_POSITIONS = BUILDINGS_CONFIG.map((b) => ({
  position: b.position,
}));

export default function CameraController({ zoomTarget, elements }) {
  const { camera } = useThree();
  const originalPosition = useRef(null);
  const targetPosition = useRef(null);
  const animationProgress = useRef(0);
  const isAnimating = useRef(false);
  
  useEffect(() => {
    if (zoomTarget && elements) {
     
      const targetIndex = elements.findIndex(el => el.id === zoomTarget);
      if (targetIndex === -1) return;
      
      const targetConfig = BUILDING_POSITIONS[targetIndex];
      if (!targetConfig) return;

      originalPosition.current = camera.position.clone();

      const targetPos = new THREE.Vector3(...targetConfig.position);
      const direction = targetPos.clone().normalize();
      
      animationProgress.current = 0;
      isAnimating.current = true;
    }
  }, [zoomTarget, elements, camera]);
  
  useFrame((state, delta) => {
    if (isAnimating.current && targetPosition.current && originalPosition.current) {
      animationProgress.current += delta * 0.5;
      
      if (animationProgress.current >= 1) {
        animationProgress.current = 1;
        isAnimating.current = false;
      }

      const t = 1 - Math.pow(1 - animationProgress.current, 3);

      camera.position.lerpVectors(originalPosition.current, targetPosition.current, t);

      const targetIndex = elements?.findIndex(el => el.id === zoomTarget);
      if (targetIndex >= 0 && BUILDING_POSITIONS[targetIndex]) {
        const targetLookAt = new THREE.Vector3(...BUILDING_POSITIONS[targetIndex].position);
        camera.lookAt(targetLookAt);
      }
    }
  });
  
  return null;
}
