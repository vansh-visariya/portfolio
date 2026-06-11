'use client';

import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function NeuralNode({ position, size = 0.04, color = "#ffffff", intensity = 0.4 }: {
  position: [number, number, number];
  size?: number;
  color?: string;
  intensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current?.material) {
      const time = state.clock.elapsedTime;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = intensity + Math.sin(time * 1.5 + position[0] * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function NeuralConnection({ start, end, opacity = 0.15 }: {
  start: [number, number, number];
  end: [number, number, number];
  opacity?: number;
}) {
  return (
    <Line
      points={[start, end]}
      color="#ffffff"
      lineWidth={0.5}
      transparent
      opacity={opacity}
    />
  );
}

function NeuralNetwork({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const newNodes: Array<{ position: [number, number, number]; layer: number }> = [];
    const newConnections: Array<{ start: [number, number, number]; end: [number, number, number]; strength: number }> = [];

    const layers = 5;
    const nodesPerLayer = [5, 8, 12, 8, 5];
    const layerRadii = [1.8, 2.5, 3.2, 2.5, 1.8];

    for (let layer = 0; layer < layers; layer++) {
      const count = nodesPerLayer[layer];
      const radius = layerRadii[layer];
      const yOffset = (layer - 2) * 2;

      for (let n = 0; n < count; n++) {
        const angle = (n / count) * Math.PI * 2;
        const spiral = layer * 0.25;
        const x = Math.cos(angle + spiral) * radius;
        const z = Math.sin(angle + spiral) * radius;
        const y = yOffset + Math.sin(angle * 2) * 0.3;

        newNodes.push({ position: [x, y, z], layer });

        if (layer < layers - 1) {
          const nextCount = nodesPerLayer[layer + 1];
          const nextRadius = layerRadii[layer + 1];
          const nextY = (layer + 1 - 2) * 2;
          const nextSpiral = (layer + 1) * 0.25;

          for (let nn = 0; nn < nextCount; nn++) {
            if (Math.random() < 0.35) {
              const nextAngle = (nn / nextCount) * Math.PI * 2;
              const nx = Math.cos(nextAngle + nextSpiral) * nextRadius;
              const nz = Math.sin(nextAngle + nextSpiral) * nextRadius;
              const ny = nextY + Math.sin(nextAngle * 2) * 0.3;
              const dist = Math.sqrt((nx - x) ** 2 + (ny - y) ** 2 + (nz - z) ** 2);
              newConnections.push({
                start: [x, y, z],
                end: [nx, ny, nz],
                strength: Math.max(0.1, 1 - dist / 8),
              });
            }
          }
        }
      }
    }

    return { nodes: newNodes, connections: newConnections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
      const breathe = Math.sin(t * 0.4) * 0.05;
      const scale = 0.7 + scrollProgress * 0.3 + breathe;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((c, i) => (
        <NeuralConnection key={i} start={c.start} end={c.end} opacity={0.04 + c.strength * 0.12} />
      ))}
      {nodes.map((n, i) => {
        const isCenter = n.layer === 2;
        return (
          <NeuralNode
            key={i}
            position={n.position}
            size={isCenter ? 0.06 : 0.035}
            intensity={0.15 + (n.layer / 4) * 0.25 + scrollProgress * 0.3}
            color={isCenter ? "#cccccc" : "#ffffff"}
          />
        );
      })}

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.15}>
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2 + scrollProgress * 0.4}
            metalness={0.9}
            roughness={0.1}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.15 + scrollProgress * 0.35}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 18;
      arr[i + 1] = (Math.random() - 0.5) * 18;
      arr[i + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

const Scene3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / (maxScroll * 0.5), 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/80" />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
          <pointLight position={[10, -10, 10]} intensity={0.2} color="#888888" />
          <fog attach="fog" args={['#000000', 8, 22]} />
          <NeuralNetwork scrollProgress={scrollProgress} />
          <Particles count={100} />
        </Suspense>
      </Canvas>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 z-10">
        <motion.div
          className="h-full bg-white"
          style={{
            width: `${scrollProgress * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Scene3D;
