'use client';

import { useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  ZONES,
  SPAWN,
  ACTIVATION_RADIUS,
  WORLD_BOUNDS,
  PLAYER_SPEED,
  type ZoneId,
} from '@/content/zones';
import type { GameInput, GameControls } from './useGameInput';

interface PlayerProps {
  input: RefObject<GameInput>;
  controls: RefObject<GameControls>;
  paused: boolean;
  onNearZone: (id: ZoneId | null) => void;
}

const CAMERA_OFFSET = new THREE.Vector3(0, 10, 14);

export default function Player({ input, controls, paused, onNearZone }: PlayerProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const lastNear = useRef<ZoneId | null>(null);
  const camTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);

    if (controls.current.teleport) {
      const [tx, tz] = controls.current.teleport;
      g.position.set(tx, 0, tz);
      controls.current.teleport = null;
      controls.current.autoTarget = null;
    }

    if (!paused) {
      const { x, z } = input.current;
      if (x !== 0 || z !== 0) {
        controls.current.autoTarget = null;
        const len = Math.hypot(x, z) || 1;
        g.position.x += (x / len) * PLAYER_SPEED * dt;
        g.position.z += (z / len) * PLAYER_SPEED * dt;
      } else if (controls.current.autoTarget) {
        const [tx, tz] = controls.current.autoTarget;
        const dx = tx - g.position.x;
        const dz = tz - g.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < ACTIVATION_RADIUS * 0.6) {
          controls.current.autoTarget = null;
        } else {
          g.position.x += (dx / dist) * PLAYER_SPEED * dt;
          g.position.z += (dz / dist) * PLAYER_SPEED * dt;
        }
      }
      g.position.x = THREE.MathUtils.clamp(g.position.x, -WORLD_BOUNDS, WORLD_BOUNDS);
      g.position.z = THREE.MathUtils.clamp(g.position.z, -WORLD_BOUNDS, WORLD_BOUNDS);
    }

    if (core.current) {
      core.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.15;
    }

    camTarget.current.set(g.position.x, 0, g.position.z).add(CAMERA_OFFSET);
    state.camera.position.lerp(camTarget.current, 1 - Math.pow(0.001, dt));
    state.camera.lookAt(g.position.x, 1, g.position.z - 2);

    let near: ZoneId | null = null;
    let best = ACTIVATION_RADIUS;
    for (const zone of ZONES) {
      const d = Math.hypot(zone.position[0] - g.position.x, zone.position[2] - g.position.z);
      if (d < best) {
        best = d;
        near = zone.id;
      }
    }
    if (near !== lastNear.current) {
      lastNear.current = near;
      onNearZone(near);
    }
  });

  return (
    <group ref={group} position={SPAWN}>
      {/* Signal pulse core */}
      <mesh ref={core} position={[0, 1, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 1.6, 0]} intensity={14} distance={14} color="#ffffff" />
      {/* Ground ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
