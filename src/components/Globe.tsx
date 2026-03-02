import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CONTINENT_COUNT = 800; // Number of gold "islands"
const GLOBE_RADIUS = 2.5;

export function LuxuryGlobe() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate positions for "continents"
  // We'll use a simple noise-like distribution to clump them
  const { positions, rotations, scales } = useMemo(() => {
    const positions = new Float32Array(CONTINENT_COUNT * 3);
    const rotations = new Float32Array(CONTINENT_COUNT * 3);
    const scales = new Float32Array(CONTINENT_COUNT * 3);

    for (let i = 0; i < CONTINENT_COUNT; i++) {
      // Random point on sphere
      const phi = Math.acos(-1 + (2 * i) / CONTINENT_COUNT);
      const theta = Math.sqrt(CONTINENT_COUNT * Math.PI) * phi;

      // Add some "clumping" logic or just random noise for now
      // To make it look like continents, we could filter by noise, but for this demo
      // we'll just use a uniform distribution with random gaps (simulated by scale 0)
      
      const r = GLOBE_RADIUS + 0.02; // Slightly above surface
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Rotate to align with surface normal
      const normal = new THREE.Vector3(x, y, z).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        normal
      );
      const euler = new THREE.Euler().setFromQuaternion(quaternion);

      rotations[i * 3] = euler.x;
      rotations[i * 3 + 1] = euler.y;
      rotations[i * 3 + 2] = euler.z;

      // Scale: Some are 0 (ocean), some are 1 (land)
      // Simple Perlin-ish noise simulation: sin(x*freq) * cos(y*freq)
      const noise = Math.sin(x * 1.5) * Math.cos(y * 1.5) * Math.sin(z * 1.5);
      const isLand = noise > 0.1; // Threshold
      
      const scale = isLand ? 0.05 + Math.random() * 0.05 : 0;
      
      scales[i * 3] = scale;
      scales[i * 3 + 1] = 0.02; // Thin
      scales[i * 3 + 2] = scale;
    }

    return { positions, rotations, scales };
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const tempObject = new THREE.Object3D();
    
    for (let i = 0; i < CONTINENT_COUNT; i++) {
      tempObject.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      tempObject.rotation.set(rotations[i * 3], rotations[i * 3 + 1], rotations[i * 3 + 2]);
      tempObject.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, rotations, scales]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Obsidian Sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshPhysicalMaterial
          color="#000000"
          roughness={0}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.5}
        />
      </Sphere>

      {/* Gold "Continents" */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, CONTINENT_COUNT]}>
        <cylinderGeometry args={[1, 1, 1, 6]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </instancedMesh>
    </group>
  );
}
