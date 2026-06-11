'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NeuralExplorer from '@/components/game/NeuralExplorer';

type Mode = 'game' | 'classic' | 'choose';

export default function Home() {
  const [mode, setMode] = useState<Mode>('choose');
  const [gpuOk, setGpuOk] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-mode');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL support
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          canvas.getContext('webgl2') ||
          canvas.getContext('webgl')
        );
      } catch {
        return false;
      }
    })();

    if (!hasWebGL) setGpuOk(false);

    // Decide initial mode
    if (prefersReduced || !hasWebGL) {
      setMode('classic');
      localStorage.setItem('portfolio-mode', 'classic');
    } else if (stored === 'game' || stored === 'classic') {
      setMode(stored);
    }
  }, []);

  const pickMode = useCallback((m: Mode) => {
    setMode(m);
    localStorage.setItem('portfolio-mode', m);
  }, []);

  if (!mounted) return null;

  if (mode === 'classic') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <h1 className="heading-lg mb-4">
            <span className="gradient-text">Vansh</span>
          </h1>
          <p className="text-white/45 text-sm leading-relaxed mb-8">
            AI/ML Engineer — Building intelligent systems
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/classic/" className="btn-primary w-full justify-center">
              Enter Classic Site
            </Link>
            {gpuOk && (
              <button onClick={() => pickMode('game')} className="btn-outline text-sm w-full text-center">
                Try Neural Explorer
              </button>
            )}
          </div>
          {!gpuOk && (
            <p className="text-xs text-white/30 mt-4">
              WebGL not available — classic mode only
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  if (mode === 'game') {
    return <NeuralExplorer />;
  }

  // Choose mode
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-lg"
      >
        <motion.h1
          className="heading-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="gradient-text">Vansh</span>
        </motion.h1>
        <motion.p
          className="text-white/40 text-sm leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          AI/ML Engineer — Neural Networks &amp; Intelligent Systems
        </motion.p>

        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={() => pickMode('game')}
            className="btn-primary w-full justify-center !py-4 !text-base group"
          >
            <span>Explore as a Game</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button
            onClick={() => pickMode('classic')}
            className="btn-outline text-sm w-full text-center !py-4"
          >
            View Classic Site
          </button>
        </motion.div>

        <motion.p
          className="text-xs text-white/25 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Navigate a 3D neural network to explore my work, or browse the classic scroll site.
        </motion.p>
      </motion.div>
    </div>
  );
}
