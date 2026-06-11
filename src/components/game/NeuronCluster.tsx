'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ACTIVATION_RADIUS, type Zone } from '@/content/zones';

interface NeuronClusterProps {
  zone: Zone;
  isNear: boolean;
  isVisited: boolean;
  onSelect: (zone: Zone) => void;
}

export default function NeuronCluster({ zone, isNear, isVisited, onSelect }: NeuronClusterProps) {
  const core = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.4;
      const s = 1 + Math.sin(state.clock.elapsedTime * (isNear ? 3 : 1.4)) * 0.06;
      core.current.scale.setScalar(s);
    }
    if (orbit.current) {
      orbit.current.rotation.y += delta * (isNear ? 0.9 : 0.35);
    }
  });

  return (
    <group position={zone.position}>
      {/* Wireframe shell */}
      <mesh
        ref={core}
        position={[0, 2.2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(zone);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={isNear ? 1.1 : isVisited ? 0.55 : 0.3}
          wireframe
        />
      </mesh>
      {/* Inner glow core */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.8, 20, 20]} />
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={isNear ? 2 : 0.8}
        />
      </mesh>
      {/* Orbiting nodes */}
      <group ref={orbit} position={[0, 2.2, 0]}>
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.6, Math.sin(angle * 2) * 0.4, Math.sin(angle) * 2.6]}
            >
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={1.2} />
            </mesh>
          );
        })}
      </group>
      {/* Activation radius ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[ACTIVATION_RADIUS - 0.15, ACTIVATION_RADIUS, 48]} />
        <meshBasicMaterial color={zone.color} transparent opacity={isNear ? 0.5 : 0.12} />
      </mesh>
      <pointLight position={[0, 3.5, 0]} intensity={isNear ? 26 : 10} distance={18} color={zone.color} />
      {/* Floating label */}
      <Html position={[0, 5.4, 0]} center distanceFactor={18} style={{ pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
          <div
            style={{
              color: zone.color,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              opacity: 0.85,
            }}
          >
            {zone.name} {isVisited ? '✓' : ''}
          </div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{zone.label}</div>
          {isNear && (
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 4 }}>
              Press E to activate
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
