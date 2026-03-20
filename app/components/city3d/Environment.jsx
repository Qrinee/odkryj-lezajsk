"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Low poly flat terrain
export function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 20, 20);
    const posAttr = geo.attributes.position;
    
    // Add subtle low poly variation
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Very subtle random variation for low poly effect
      const height = (Math.random() - 0.5) * 0.15;
      posAttr.setZ(i, height);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.3, 0]} 
      receiveShadow
      geometry={geometry}
    >
      <meshStandardMaterial 
        color="#5aaf65"
        roughness={0.9}
        flatShading={true}
      />
    </mesh>
  );
}

// Low poly flat ground area
export function FlatGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
      <meshStandardMaterial color="#4a9c54" roughness={0.95} flatShading={true} />
    </mesh>
  );
}

// Simple low poly grid
export function CityGrid() {
  return (
    <></>
  );
}

// Happy sun
function HappySun() {
  const sunRef = useRef();
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[50, 40, 30]}>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <octahedronGeometry args={[5, 0]} />
        <meshStandardMaterial 
          color="#ffd93d" 
          emissive="#ffb300"
          emissiveIntensity={0.8}
          flatShading={true}
        />
      </mesh>
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 7,
          Math.sin(i * Math.PI / 4) * 7,
          0
        ]}>
          <boxGeometry args={[1.5, 4, 1]} />
          <meshStandardMaterial 
            color="#ffe066" 
            emissive="#ffcc00"
            emissiveIntensity={0.5}
            flatShading={true}
          />
        </mesh>
      ))}
    </group>
  );
}

// Happy clouds
function HappyClouds() {
  const cloudsRef = useRef();
  const count = 5;
  
  const cloudPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 60,
        y: 15 + Math.random() * 10,
        z: -20 + Math.random() * 30,
        scale: 1 + Math.random() * 0.5,
        speed: 0.2 + Math.random() * 0.3
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += cloudPositions[i].speed * 0.01;
        if (cloud.position.x > 40) {
          cloud.position.x = -40;
        }
      });
    }
  });

  return (
    <group ref={cloudsRef}>
      {cloudPositions.map((pos, i) => (
        <group key={i} position={[pos.x, pos.y, pos.z]} scale={pos.scale}>
          {/* Cloud puffs - low poly */}
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#ffffff" flatShading={true} />
          </mesh>
          <mesh position={[1.2, 0.3, 0]}>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#ffffff" flatShading={true} />
          </mesh>
          <mesh position={[-1.2, 0.2, 0]}>
            <dodecahedronGeometry args={[1.3, 0]} />
            <meshStandardMaterial color="#ffffff" flatShading={true} />
          </mesh>
          <mesh position={[0.5, 0.8, 0]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#f0f0f0" flatShading={true} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Ambient particles - low poly
export function Particles() {
  const particlesRef = useRef();
  const count = 30;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 6 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.25} color="#ffe066" transparent opacity={0.7} />
    </points>
  );
}

// Main Environment component with happier sky
export default function Environment() {
  return (
    <>
      {/* Happy blue sky gradient background */}
      <color attach="background" args={['#87ceeb']} />
      
      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#b8e0ff', 30, 80]} />
      
      {/* Happy sun */}
      <HappySun />
      
      {/* Happy clouds */}
      <HappyClouds />
      
      {/* Bright warm lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[30, 40, 20]} 
        intensity={1.2} 
        castShadow 
        color="#fff5e6"
      />
      <pointLight position={[0, 10, 0]} intensity={0.4} color="#ffe4b5" />
      
      {/* Hemisphere light for natural sky/ground colors */}
      <hemisphereLight 
        color="#87ceeb" 
        groundColor="#90EE90" 
        intensity={0.5} 
      />
      
      {/* Terrain and ground */}
      <Terrain />
      <FlatGround />
      <CityGrid />
      
      {/* Particles */}
      <Particles />
    </>
  );
}
