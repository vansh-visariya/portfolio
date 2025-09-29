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
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.material.emissiveIntensity = intensity + Math.sin(time * 2 + position[0]) * 0.3;
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
  const lineRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      lineRef.current.material.opacity = opacity + Math.sin(time * 3) * 0.2;
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
  const [nodes, setNodes] = useState<Array<[number, number, number]>>([]);
  const [connections, setConnections] = useState<Array<{ start: [number, number, number], end: [number, number, number] }>>([]);

  useEffect(() => {
    // Generate neural network structure
    const newNodes: Array<[number, number, number]> = [];
    const newConnections: Array<{ start: [number, number, number], end: [number, number, number] }> = [];

    // Create layers of nodes
    const layers = 5;
    const nodesPerLayer = [8, 12, 16, 12, 8];

    for (let layer = 0; layer < layers; layer++) {
      const layerNodes = nodesPerLayer[layer];
      const radius = 2 + layer * 0.5;
      const yOffset = (layer - 2) * 1.5;

      for (let node = 0; node < layerNodes; node++) {
        const angle = (node / layerNodes) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = yOffset + (Math.random() - 0.5) * 0.5;

        newNodes.push([x, y, z]);

        // Connect to next layer
        if (layer < layers - 1) {
          const nextLayerNodes = nodesPerLayer[layer + 1];
          const nextRadius = 2 + (layer + 1) * 0.5;
          const nextYOffset = (layer + 1 - 2) * 1.5;

          for (let nextNode = 0; nextNode < nextLayerNodes; nextNode++) {
            if (Math.random() > 0.3) { // 70% connection probability
              const nextAngle = (nextNode / nextLayerNodes) * Math.PI * 2;
              const nextX = Math.cos(nextAngle) * nextRadius;
              const nextZ = Math.sin(nextAngle) * nextRadius;
              const nextY = nextYOffset + (Math.random() - 0.5) * 0.5;

              newConnections.push({
                start: [x, y, z],
                end: [nextX, nextY, nextZ]
              });
            }
          }
        }
      }
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Rotate based on scroll and time
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2 + scrollProgress * 0.5;
      groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;

      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render connections first (behind nodes) */}
      {connections.map((connection, index) => (
        <NeuralConnection
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
          opacity={0.2 + scrollProgress * 0.3}
        />
      ))}

      {/* Render nodes */}
      {nodes.map((position, index) => (
        <NeuralNode
          key={`node-${index}`}
          position={position}
          size={0.04 + Math.random() * 0.03}
          intensity={0.3 + scrollProgress * 0.7}
        />
      ))}

      {/* Central core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.4 + scrollProgress * 0.6}
            metalness={0.9}
            roughness={0.1}
            wireframe={true}
          />
        </mesh>
      </Float>
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
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

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
          <fog attach="fog" args={['#000000', 8, 25]} />

          {/* 3D Objects */}
          <NeuralNetworkStructure scrollProgress={scrollProgress} />
          <ParticleSystem count={150} />

          {/* Controls - disabled for better performance */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-white z-10"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-wider bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            WUKONG
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light tracking-wide opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            AI/ML Developer
          </motion.p>
          <motion.div
            className="mt-8 text-sm md:text-base opacity-60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Transforming complex problems into elegant, intelligent solutions
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-green-400/70 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="text-xs text-white/50 mt-2 text-center">Scroll to explore</div>
      </motion.div>

      {/* Progress indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-50">
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
