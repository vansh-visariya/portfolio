'use client';

import { useRef, type RefObject } from 'react';
import type { GameInput } from './useGameInput';

interface TouchControlsProps {
  input: RefObject<GameInput>;
}

export default function TouchControls({ input }: TouchControlsProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const pointerId = useRef<number | null>(null);

  const setVector = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = (clientX - cx) / (rect.width / 2);
    let dy = (clientY - cy) / (rect.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    input.current.x = dx;
    input.current.z = dy;
    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${dx * 32}px, ${dy * 32}px)`;
    }
  };

  const reset = () => {
    pointerId.current = null;
    input.current.x = 0;
    input.current.z = 0;
    if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={baseRef}
      className="fixed bottom-20 left-6 z-40 w-28 h-28 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm touch-none select-none"
      onPointerDown={(e) => {
        pointerId.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);
        setVector(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (pointerId.current === e.pointerId) setVector(e.clientX, e.clientY);
      }}
      onPointerUp={reset}
      onPointerCancel={reset}
    >
      <div
        ref={knobRef}
        className="absolute top-1/2 left-1/2 -mt-6 -ml-6 w-12 h-12 rounded-full bg-white/30 border border-white/40 pointer-events-none"
      />
    </div>
  );
}
