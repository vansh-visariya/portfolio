'use client';

import Link from 'next/link';
import { ZONES, getZone, type ZoneId } from '@/content/zones';

interface HUDProps {
  visited: ZoneId[];
  nearZone: ZoneId | null;
  overlayOpen: boolean;
  completed: boolean;
}

export default function HUD({ visited, nearZone, overlayOpen, completed }: HUDProps) {
  return (
    <>
      {/* Top-left: identity + progress */}
      <div className="fixed top-4 left-4 z-40 select-none">
        <div className="glass-strong rounded-2xl px-4 py-3 border border-white/10">
          <p className="text-sm font-bold">
            <span className="text-white">V</span>
            <span className="text-white/90">ansh</span>
            <span className="text-white/35 font-normal"> — Neural Explorer</span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
              Network trained {visited.length}/{ZONES.length}
            </span>
            <div className="flex gap-1.5">
              {ZONES.map((z) => (
                <div
                  key={z.id}
                  title={z.label}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: visited.includes(z.id) ? '#ffffff' : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top-right: exit to classic */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <Link href="/classic/" className="btn-outline text-xs !py-2 !px-4">
          Classic site
        </Link>
      </div>

      {/* Bottom-center: prompts and controls hint */}
      {!overlayOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 text-center select-none px-4">
          {nearZone ? (
            <p className="glass-strong rounded-full px-5 py-2.5 text-sm text-white/90 border border-white/10">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">E</kbd> to
              open <span style={{ color: getZone(nearZone).color }}>{getZone(nearZone).label}</span>
            </p>
          ) : (
            <p className="text-xs text-white/30 font-mono tracking-wide">
              WASD / arrows — move · E — interact · Tab — next zone · Esc — close
            </p>
          )}
        </div>
      )}

      {/* Completion banner */}
      {completed && !overlayOpen && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 select-none">
          <p className="glass-strong rounded-full px-5 py-2 text-xs border border-white/20 text-white/70">
            ⚡ Network fully trained — 100% activation. Thanks for exploring!
          </p>
        </div>
      )}
    </>
  );
}
