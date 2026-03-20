"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDINGS_CONFIG } from "./buildingsConfig";


export function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(42, 64);
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


export function FlatGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
      <circleGeometry args={[45, 64]} />
      <meshStandardMaterial color="#4a9c54" roughness={0.95} flatShading={true} />
    </mesh>
  );
}




function HappySun() {
  const sunRef = useRef();

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[50, 40, 30]}>

      <mesh ref={sunRef}>
        <octahedronGeometry args={[5, 0]} />
        <meshStandardMaterial
          color="#ffd93d"
          emissive="#ffb300"
          emissiveIntensity={0.8}
          flatShading={true}
        />
      </mesh>

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


function HappyTrees() {
  const treePositions = useMemo(() => {
    const positions = [];
    const targetCount = 15;
    let attempts = 0;

    while (positions.length < targetCount && attempts < 1000) {
      attempts++;
      const angle = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 37;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      const isColliding = BUILDINGS_CONFIG.some(b => {
        const dx = b.position[0] - x;
        const dz = b.position[2] - z;
        return Math.sqrt(dx * dx + dz * dz) < 13.5;
      });

      if (!isColliding) {
        positions.push({
          x, z,
          scale: 0.6 + Math.random() * 0.8,
          rotation: Math.random() * Math.PI
        });
      }
    }
    return positions;
  }, []);

  return (
    <group>
      {treePositions.map((pos, i) => (
        <group key={`tree-${i}`} position={[pos.x, 0, pos.z]} scale={pos.scale} rotation={[0, pos.rotation, 0]}>
          <mesh position={[0, 1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.4, 2, 5]} />
            <meshStandardMaterial color="#5c4033" flatShading />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#2d5a27" flatShading />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#3a7033" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HappyRocks() {
  const rockPositions = useMemo(() => {
    const positions = [];
    const targetCount = 15;
    let attempts = 0;

    while (positions.length < targetCount && attempts < 1000) {
      attempts++;
      const angle = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 38;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      const isColliding = BUILDINGS_CONFIG.some(b => {
        const dx = b.position[0] - x;
        const dz = b.position[2] - z;
        return Math.sqrt(dx * dx + dz * dz) < 11.5;
      });

      if (!isColliding) {
        positions.push({
          x, z,
          scale: 0.3 + Math.random() * 0.9,
          rotX: Math.random() * Math.PI,
          rotY: Math.random() * Math.PI,
          rotZ: Math.random() * Math.PI,
        });
      }
    }
    return positions;
  }, []);

  return (
    <group>
      {rockPositions.map((pos, i) => (
        <mesh
          key={`rock-${i}`}
          position={[pos.x, 0, pos.z]}
          scale={pos.scale}
          rotation={[pos.rotX, pos.rotY, pos.rotZ]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#7f8c8d" roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}


export default function Environment() {
  return (
    <>

      <color attach="background" args={['#87ceeb']} />

      <fog attach="fog" args={['#85ec6bff', 30, 180]} />

      <HappySun />

      <HappyClouds />

      <HappyTrees />

      <HappyRocks />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[30, 60, 20]}
        intensity={1.2}
        castShadow
        color="#fff5e6"
        shadow-bias={-0.0005}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={150}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <pointLight position={[0, 15, 0]} intensity={0.3} color="#ffe4b5" />

      <hemisphereLight
        color="#ffffff"
        groundColor="#90EE90"
        intensity={0.3}
      />

      <Terrain />
      <FlatGround />


      <Particles />
    </>
  );
}
