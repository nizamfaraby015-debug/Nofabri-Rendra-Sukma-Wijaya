import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { LuxuryGlobe } from './Globe';
import { Suspense } from 'react';

export function Scene({ isBlurred }: { isBlurred?: boolean }) {
  return (
    <div className={`absolute inset-0 z-0 bg-obsidian transition-all duration-700 ease-in-out ${isBlurred ? 'blur-md scale-105 opacity-60' : ''}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Dramatic Studio Lighting */}
        <ambientLight intensity={0.5} color="#d4af37" />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={3}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#d4af37" />
        <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" distance={10} />

        <Suspense fallback={null}>
          <group position={[2, 0, 0]}> {/* Shifted right for split screen */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <LuxuryGlobe />
            </Float>
            
            <ContactShadows
              position={[0, -3.5, 0]}
              opacity={0.6}
              scale={20}
              blur={2.5}
              far={4.5}
              color="#d4af37"
            />
          </group>
          
          <Environment preset="city" />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Vignette & Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/90" />
    </div>
  );
}
