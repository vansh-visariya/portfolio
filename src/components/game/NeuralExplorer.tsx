'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ZONES,
  ACTIVATION_RADIUS,
  getZone,
  type Zone,
  type ZoneId,
} from '@/content/zones';
import { useGameInput, type GameControls } from './useGameInput';
import { useGameProgress } from './useGameProgress';
import GameCanvas from './GameCanvas';
import HUD from './HUD';
import TouchControls from './TouchControls';
import ZoneOverlay from './ZoneOverlay';

export default function NeuralExplorer() {
  const input = useGameInput();
  const controls = useRef<GameControls>({ autoTarget: null, teleport: null });
  const [nearZone, setNearZone] = useState<ZoneId | null>(null);
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const cycleIndex = useRef(-1);
  const { visited, markVisited, completed } = useGameProgress();

  const nearRef = useRef(nearZone);
  nearRef.current = nearZone;
  const activeRef = useRef(activeZone);
  activeRef.current = activeZone;

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const activate = useCallback(
    (id: ZoneId) => {
      setActiveZone(id);
      markVisited(id);
      setAnnouncement(`${getZone(id).label} zone activated`);
    },
    [markVisited]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveZone(null);
        return;
      }
      if (activeRef.current) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        cycleIndex.current = (cycleIndex.current + 1) % ZONES.length;
        const z = ZONES[cycleIndex.current];
        controls.current.teleport = [z.position[0], z.position[2] + ACTIVATION_RADIUS * 0.7];
        setAnnouncement(`Teleported to ${z.label}`);
        return;
      }
      if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') && nearRef.current) {
        activate(nearRef.current);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activate]);

  const onSelectZone = useCallback(
    (zone: Zone) => {
      if (nearRef.current === zone.id) {
        activate(zone.id);
      } else {
        controls.current.autoTarget = [zone.position[0], zone.position[2]];
        setAnnouncement(`Heading to ${zone.label}`);
      }
    },
    [activate]
  );

  return (
    <div className="fixed inset-0 bg-black">
      <GameCanvas
        input={input}
        controls={controls}
        paused={activeZone !== null}
        nearZone={nearZone}
        visited={visited}
        onNearZone={setNearZone}
        onSelectZone={onSelectZone}
      />

      <HUD
        visited={visited}
        nearZone={nearZone}
        overlayOpen={activeZone !== null}
        completed={completed}
      />

      {isTouch && !activeZone && <TouchControls input={input} />}

      <AnimatePresence>
        {activeZone && (
          <ZoneOverlay zone={getZone(activeZone)} onClose={() => setActiveZone(null)} />
        )}
      </AnimatePresence>

      {/* Screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
