'use client';

import { Canvas } from '@react-three/fiber';
import type { RefObject } from 'react';
import { ZONES, type Zone, type ZoneId } from '@/content/zones';
import World from './World';
import Player from './Player';
import NeuronCluster from './NeuronCluster';
import type { GameInput, GameControls } from './useGameInput';

interface GameCanvasProps {
  input: RefObject<GameInput>;
  controls: RefObject<GameControls>;
  paused: boolean;
  nearZone: ZoneId | null;
  visited: ZoneId[];
  onNearZone: (id: ZoneId | null) => void;
  onSelectZone: (zone: Zone) => void;
}

export default function GameCanvas({
  input,
  controls,
  paused,
  nearZone,
  visited,
  onNearZone,
  onSelectZone,
}: GameCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 10, 14], fov: 55 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 35, 95]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.4} />

      <World />

      {ZONES.map((zone) => (
        <NeuronCluster
          key={zone.id}
          zone={zone}
          isNear={nearZone === zone.id}
          isVisited={visited.includes(zone.id)}
          onSelect={onSelectZone}
        />
      ))}

      <Player input={input} controls={controls} paused={paused} onNearZone={onNearZone} />
    </Canvas>
  );
}
