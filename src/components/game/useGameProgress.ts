'use client';

import { useCallback, useEffect, useState } from 'react';
import { ZONES, type ZoneId } from '@/content/zones';

const STORAGE_KEY = 'neural-explorer-progress';

export function useGameProgress() {
  const [visited, setVisited] = useState<ZoneId[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ZoneId[];
        setVisited(parsed.filter((id) => ZONES.some((z) => z.id === id)));
      }
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const markVisited = useCallback((id: ZoneId) => {
    setVisited((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setVisited([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    visited,
    markVisited,
    resetProgress,
    completed: visited.length === ZONES.length,
  };
}
