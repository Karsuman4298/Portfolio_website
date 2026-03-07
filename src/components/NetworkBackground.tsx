"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const MAX_DISTANCE = 2.5;

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { particles, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      color.setHSL(0.5 + Math.random() * 0.2, 1.0, 0.5); // Cyan/Blue variants
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { particles: positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Slowly rotate the entire network
    pointsRef.current.rotation.y += delta * 0.05;
    linesRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
    linesRef.current.rotation.x += delta * 0.02;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate points slightly
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Add subtle wave motion
      positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild lines based on distance
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );

          // Alpha fades with distance
          const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE;
          
          lineColors.push(
            0, 0.95, 1, alpha * 0.5, // Cyan
            0, 0.26, 1, alpha * 0.5  // Electric blue
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#050510', 3, 15]} />
        <Network />
      </Canvas>
      {/* Overlay gradient to blend bottom edge */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
    </div>
  );
}
