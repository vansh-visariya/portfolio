'use client';

import { useEffect, useRef, type RefObject } from 'react';

export interface GameInput {
  x: number;
  z: number;
}

export interface GameControls {
  autoTarget: [number, number] | null;
  teleport: [number, number] | null;
}

// Keyboard movement → shared mutable input vector (also written by TouchControls)
export function useGameInput(): RefObject<GameInput> {
  const input = useRef<GameInput>({ x: 0, z: 0 });
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const update = () => {
      const k = keys.current;
      input.current.x = (k['d'] || k['arrowright'] ? 1 : 0) - (k['a'] || k['arrowleft'] ? 1 : 0);
      input.current.z = (k['s'] || k['arrowdown'] ? 1 : 0) - (k['w'] || k['arrowup'] ? 1 : 0);
    };
    const onDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key.startsWith('arrow') || key === ' ') e.preventDefault();
      keys.current[key] = true;
      update();
    };
    const onUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
      update();
    };
    const onBlur = () => {
      keys.current = {};
      update();
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return input;
}
