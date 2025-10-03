'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Line, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Neural Network Node Component
function NeuralNode({ position, size = 0.05, color = "#00ff88", intensity = 0.5 }: {
  position: [number, number, number];
  size?: number;
  color?: string;
  intensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const time = state.clock.elapsedTime;
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = intensity + Math.sin(time * 2 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
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

// Neural Connection Component
function NeuralConnection({ start, end, opacity = 0.3 }: {
  start: [number, number, number];
  end: [number, number, number];
  opacity?: number;
}) {
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const time = state.clock.elapsedTime;
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = opacity + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color="#00ff88"
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}

// Advanced Neural Network Structure
function NeuralNetworkStructure({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const [nodes, setNodes] = useState<Array<{ position: [number, number, number], layer: number, id: number }>>([]);
  const [connections, setConnections] = useState<Array<{ start: [number, number, number], end: [number, number, number], strength: number }>>([]);

  useEffect(() => {
    // Generate more sophisticated neural network structure
    const newNodes: Array<{ position: [number, number, number], layer: number, id: number }> = [];
    const newConnections: Array<{ start: [number, number, number], end: [number, number, number], strength: number }> = [];

    // Create multiple interconnected layers with varying densities
    const layers = 7;
    const nodesPerLayer = [6, 10, 16, 20, 16, 10, 6];
    const layerRadii = [1.5, 2.2, 3.0, 3.5, 3.0, 2.2, 1.5];

    let nodeId = 0;

    for (let layer = 0; layer < layers; layer++) {
      const layerNodes = nodesPerLayer[layer];
      const radius = layerRadii[layer];
      const yOffset = (layer - 3) * 1.8; // Center around y=0

      for (let node = 0; node < layerNodes; node++) {
        const angle = (node / layerNodes) * Math.PI * 2;
        const spiralOffset = layer * 0.3; // Add spiral effect
        const x = Math.cos(angle + spiralOffset) * radius;
        const z = Math.sin(angle + spiralOffset) * radius;
        const y = yOffset + Math.sin(angle * 3) * 0.3; // Add wave pattern

        newNodes.push({ position: [x, y, z], layer, id: nodeId++ });

        // Connect to next layer with varying connection strengths
        if (layer < layers - 1) {
          const nextLayerNodes = nodesPerLayer[layer + 1];
          const nextRadius = layerRadii[layer + 1];
          const nextYOffset = (layer + 1 - 3) * 1.8;
          const nextSpiralOffset = (layer + 1) * 0.3;

          for (let nextNode = 0; nextNode < nextLayerNodes; nextNode++) {
            const connectionProbability = 0.4 + Math.random() * 0.4; // 40-80% connection probability
            if (Math.random() < connectionProbability) {
              const nextAngle = (nextNode / nextLayerNodes) * Math.PI * 2;
              const nextX = Math.cos(nextAngle + nextSpiralOffset) * nextRadius;
              const nextZ = Math.sin(nextAngle + nextSpiralOffset) * nextRadius;
              const nextY = nextYOffset + Math.sin(nextAngle * 3) * 0.3;

              const distance = Math.sqrt(
                Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2) + Math.pow(nextZ - z, 2)
              );
              const strength = Math.max(0.1, 1 - distance / 8); // Connection strength based on distance

              newConnections.push({
                start: [x, y, z],
                end: [nextX, nextY, nextZ],
                strength
              });
            }
          }
        }

        // Add some cross-layer connections for complexity
        if (layer < layers - 2 && Math.random() > 0.8) {
          const targetLayer = layer + 2;
          const targetLayerNodes = nodesPerLayer[targetLayer];
          const targetRadius = layerRadii[targetLayer];
          const targetYOffset = (targetLayer - 3) * 1.8;
          const targetSpiralOffset = targetLayer * 0.3;

          const targetNode = Math.floor(Math.random() * targetLayerNodes);
          const targetAngle = (targetNode / targetLayerNodes) * Math.PI * 2;
          const targetX = Math.cos(targetAngle + targetSpiralOffset) * targetRadius;
          const targetZ = Math.sin(targetAngle + targetSpiralOffset) * targetRadius;
          const targetY = targetYOffset + Math.sin(targetAngle * 3) * 0.3;

          newConnections.push({
            start: [x, y, z],
            end: [targetX, targetY, targetZ],
            strength: 0.3
          });
        }
      }
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Complex rotation based on scroll and time
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4 + time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15 + scrollProgress * 0.3;
      groupRef.current.rotation.z = Math.cos(time * 0.15) * 0.1;

      // Dynamic scale with breathing effect
      const breathe = Math.sin(time * 0.5) * 0.1;
      const scale = 0.8 + scrollProgress * 0.6 + breathe;
      groupRef.current.scale.setScalar(scale);
    }

    if (coreRef.current) {
      const time = state.clock.elapsedTime;
      coreRef.current.rotation.x = time * 0.3;
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render connections with varying strengths */}
      {connections.map((connection, index) => (
        <NeuralConnection
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
          opacity={0.1 + connection.strength * 0.4 + scrollProgress * 0.3}
        />
      ))}

      {/* Render nodes with layer-based sizing */}
      {nodes.map((node, index) => {
        const layerIntensity = 0.3 + (node.layer / 6) * 0.4;
        const size = 0.03 + (node.layer === 3 ? 0.04 : 0.02); // Larger nodes in center layer
        return (
          <NeuralNode
            key={`node-${index}`}
            position={node.position}
            size={size}
            intensity={layerIntensity + scrollProgress * 0.5}
            color={node.layer === 3 ? "#00ff88" : "#0088ff"}
          />
        );
      })}

      {/* Enhanced central core with multiple geometries */}
      <group ref={coreRef}>
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.2}>
          {/* Main core */}
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[0.6, 1]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.5 + scrollProgress * 0.8}
              metalness={0.9}
              roughness={0.1}
              wireframe={false}
            />
          </mesh>

          {/* Wireframe overlay */}
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[0.65, 1]} />
            <meshBasicMaterial
              color="#00ff88"
              wireframe={true}
              transparent={true}
              opacity={0.6 + scrollProgress * 0.4}
            />
          </mesh>

          {/* Inner rotating sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color="#0088ff"
              emissive="#0088ff"
              emissiveIntensity={0.3 + scrollProgress * 0.5}
              metalness={0.8}
              roughness={0.2}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        </Float>

        {/* Orbiting elements */}
        {[...Array(6)].map((_, i) => (
          <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.3}>
            <mesh
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 1.2,
                Math.sin((i / 3) * Math.PI) * 0.4,
                Math.sin((i / 6) * Math.PI * 2) * 1.2,
              ]}
            >
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#00ff88"
                emissiveIntensity={0.6 + scrollProgress * 0.4}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}

// Particle System Component
function ParticleSystem({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);

  // Initialize random positions
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;     // x
    positions[i + 1] = (Math.random() - 0.5) * 20; // y
    positions[i + 2] = (Math.random() - 0.5) * 20; // z
  }

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.y = time * 0.05;

      // Animate particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main Scene Component
const Scene3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrolled / (maxScroll * 0.5), 1); // More responsive to early scroll
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Subtle vignette to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00ff88" />
          <pointLight position={[10, -10, 10]} intensity={0.4} color="#0088ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#00ff88"
          />

          {/* Environment */}
          <Environment preset="night" />

          {/* Fog for depth */}
          <fog attach="fog" args={['#000000', 6, 22]} />

          {/* 3D Objects */}
          <NeuralNetworkStructure scrollProgress={scrollProgress} />
          <ParticleSystem count={220} />

          {/* Controls - disabled for better performance */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Minimal UI elements only (no large center text to avoid overlap) */}

      {/* Progress indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-blue-400"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

export default Scene3D;
