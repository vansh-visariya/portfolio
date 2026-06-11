'use client';

import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { SYNAPSES, getZone } from '@/content/zones';

export default function World() {
  const particles = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160 - 20;
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Ground grid */}
      <gridHelper args={[200, 100, '#222222', '#0a0a0a']} />

      {/* Synaptic pathways between zones */}
      {SYNAPSES.map(([a, b]) => {
        const za = getZone(a);
        const zb = getZone(b);
        return (
          <Line
            key={`${a}-${b}`}
            points={[
              [za.position[0], 0.4, za.position[2]],
              [zb.position[0], 0.4, zb.position[2]],
            ]}
            color="#888888"
            transparent
            opacity={0.35}
            lineWidth={1.5}
          />
        );
      })}

      {/* Ambient particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.35} sizeAttenuation />
      </points>
    </group>
  );
}
