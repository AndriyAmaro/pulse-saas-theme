'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// ABSTRACT BACKGROUND — Large sweeping arcs like the reference image.
// Big curves that sweep across the viewport, creating overlapping regions.
// Dark navy base, teal gradient arcs, dark sphere, flowing wave lines.
// ============================================================================

export interface AbstractBackgroundProps {
  className?: string
}

export function AbstractBackground({ className }: AbstractBackgroundProps) {
  // Wave threads at bottom
  const waves = React.useMemo(() => {
    const lines: string[] = []
    for (let i = 0; i < 16; i++) {
      const y = 640 + i * 15
      const a = 25 + (i % 4) * 12
      const phase = (i % 3) * 120
      lines.push(
        `M -50 ${y} Q ${200 + phase} ${y - a}, ${450 + phase * 0.5} ${y + a * 0.3} T ${900 - phase * 0.3} ${y - a * 0.5} T ${1200 + phase * 0.2} ${y + a * 0.4} T 1540 ${y - a * 0.2}`
      )
    }
    return lines
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* ── 1. Base: Deep dark navy ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(155deg, #0B0D2E 0%, #080A22 35%, #0A0C28 55%, #06081C 100%)',
        }}
      />

      {/* ── 2. Organic blob shapes ── */}
      <div className="ab-canvas">
        {/* Main teal blob — upper-left sweep */}
        <div className="ab-blob ab-main" />
        {/* Dark region — center-right */}
        <div className="ab-blob ab-dark" />
        {/* Bright glow — bottom-right */}
        <div className="ab-blob ab-glow" />
      </div>

      {/* ── 3. SVG: Large sweeping arcs + sphere + waves ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Gradient for arc strokes — bright teal */}
          <linearGradient id="ab-ag1" x1="0%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0.05" />
            <stop offset="30%" stopColor="#14B89A" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#5EEAD4" stopOpacity="0.50" />
            <stop offset="85%" stopColor="#99F6E4" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#CCFBF1" stopOpacity="0.15" />
          </linearGradient>

          {/* Gradient for filled arc regions */}
          <linearGradient id="ab-fill1" x1="0%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#0D9488" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="ab-fill2" x1="20%" y1="100%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Dark sphere gradient */}
          <radialGradient id="ab-sph" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#0D1030" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#080A20" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#050714" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="ab-sph-rim" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="transparent" />
            <stop offset="93%" stopColor="#14B89A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.06" />
          </radialGradient>

          {/* Wave gradient */}
          <linearGradient id="ab-wg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="20%" stopColor="#14B89A" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#99F6E4" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#CCFBF1" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* ════════════════════════════════════════════════════
            LARGE SWEEPING ARCS — like the reference sketch
            Each arc is a huge curve sweeping across the viewport
            ════════════════════════════════════════════════════ */}

        {/* Arc 1 — Biggest, outermost: from top-center sweeps to bottom-right */}
        <path
          d="M 600 -100 Q 1100 200, 1500 700"
          stroke="url(#ab-ag1)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          fill="none"
        />
        {/* Arc 1 fill region */}
        <path
          d="M 600 -100 Q 1100 200, 1500 700 L 1500 900 L 600 900 Z"
          fill="url(#ab-fill2)"
          fillOpacity="0.4"
        />

        {/* Arc 2 — Second big arc: from upper-left sweeps down to bottom-center */}
        <path
          d="M 250 -50 Q 800 300, 1200 950"
          stroke="url(#ab-ag1)"
          strokeWidth="1.8"
          strokeOpacity="0.55"
          fill="none"
        />
        {/* Arc 2 fill */}
        <path
          d="M 250 -50 Q 800 300, 1200 950 L 1500 950 L 1500 -50 Z"
          fill="url(#ab-fill1)"
          fillOpacity="0.3"
        />

        {/* Arc 3 — Medium: from center-top curves to bottom-left */}
        <path
          d="M 500 -80 Q 650 350, 400 950"
          stroke="url(#ab-ag1)"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Arc 4 — Inner arc: tighter curve center-bottom area */}
        <path
          d="M 450 200 Q 750 450, 1050 900"
          stroke="url(#ab-ag1)"
          strokeWidth="1.4"
          strokeOpacity="0.45"
          fill="none"
        />
        {/* Arc 4 fill */}
        <path
          d="M 450 200 Q 750 450, 1050 900 L 1440 900 L 1440 200 Z"
          fill="url(#ab-fill1)"
          fillOpacity="0.2"
        />

        {/* Arc 5 — Upper sweep: from far left curves high to right */}
        <path
          d="M -50 400 Q 500 100, 1100 250"
          stroke="url(#ab-ag1)"
          strokeWidth="1"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Arc 6 — Small inner accent arc */}
        <path
          d="M 550 350 Q 800 500, 1300 600"
          stroke="url(#ab-ag1)"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* ── Parallel thin lines along main arcs (like reference) ── */}
        {/* These run alongside arcs 1 and 2, giving that multi-line effect */}
        {[...Array(8)].map((_, i) => {
          const offset = (i + 1) * 18
          return (
            <React.Fragment key={`pl-${i}`}>
              {/* Parallel to Arc 1 */}
              <path
                d={`M ${600 - offset * 0.6} ${-100 + offset * 0.3} Q ${1100 - offset * 0.4} ${200 + offset * 0.5}, ${1500 - offset * 0.1} ${700 + offset * 0.2}`}
                stroke="url(#ab-ag1)"
                strokeWidth={0.5 + (i < 4 ? 0.2 : 0)}
                strokeOpacity={0.25 - i * 0.025}
                fill="none"
              />
              {/* Parallel to Arc 2 */}
              <path
                d={`M ${250 + offset * 0.5} ${-50 + offset * 0.4} Q ${800 + offset * 0.3} ${300 + offset * 0.6}, ${1200 + offset * 0.2} ${950}`}
                stroke="url(#ab-ag1)"
                strokeWidth={0.5 + (i < 4 ? 0.2 : 0)}
                strokeOpacity={0.22 - i * 0.022}
                fill="none"
              />
            </React.Fragment>
          )
        })}

        {/* ── DARK SPHERE ── */}
        <g>
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph)" />
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph-rim)" />
          <circle cx="862" cy="432" r="20" fill="#14B89A" fillOpacity="0.03" />
        </g>

        {/* ── FLOWING WAVE LINES at bottom ── */}
        {waves.map((d, i) => (
          <path
            key={`w-${i}`}
            d={d}
            stroke="url(#ab-wg)"
            strokeWidth={i < 5 ? 0.8 : 0.5}
            strokeOpacity={0.12 + (i < 8 ? i * 0.03 : (16 - i) * 0.015)}
            fill="none"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; ${i % 2 === 0 ? 6 : -6},${i % 3 === 0 ? -2 : 2}; 0,0`}
              dur={`${22 + i * 1.5}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* ── Floating particles ── */}
        {[...Array(10)].map((_, i) => {
          const s = (n: number) => {
            const x = Math.sin(n * 9301 + 49297) * 49297
            return x - Math.floor(x)
          }
          return (
            <circle
              key={`p-${i}`}
              cx={s(i * 3 + 1) * 1440}
              cy={s(i * 3 + 2) * 900}
              r={0.5 + s(i * 3 + 3) * 1}
              fill="#5EEAD4"
              fillOpacity={0.06 + s(i * 7) * 0.15}
            >
              <animate
                attributeName="fill-opacity"
                values={`${0.06 + s(i * 7) * 0.15};0.02;${0.06 + s(i * 7) * 0.15}`}
                dur={`${12 + s(i * 5) * 10}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>

      {/* ── Noise texture ── */}
      <div className="noise-overlay absolute inset-0 opacity-20" />

      {/* ── CSS ── */}
      <style>{`
        .ab-canvas {
          position: absolute;
          inset: 0;
        }
        .ab-blob {
          position: absolute;
        }

        /* Main teal blob — upper-left, large organic shape */
        .ab-main {
          width: 65%;
          height: 75%;
          top: -20%;
          left: -15%;
          background: radial-gradient(
            ellipse 75% 65% at 55% 55%,
            rgba(20, 184, 154, 0.28) 0%,
            rgba(13, 148, 136, 0.15) 30%,
            rgba(6, 95, 85, 0.06) 55%,
            transparent 75%
          );
          filter: blur(45px);
          border-radius: 42% 58% 65% 35% / 45% 55% 45% 55%;
          animation: ab-m 30s ease-in-out infinite;
        }

        /* Dark zone — center-right, creates depth behind sphere */
        .ab-dark {
          width: 45%;
          height: 50%;
          top: 15%;
          right: 8%;
          background: radial-gradient(
            ellipse 65% 60% at 50% 50%,
            rgba(5, 7, 20, 0.6) 0%,
            rgba(8, 10, 34, 0.3) 45%,
            transparent 70%
          );
          filter: blur(50px);
          border-radius: 55% 45% 50% 50% / 50% 60% 40% 50%;
          animation: ab-d 35s ease-in-out infinite;
        }

        /* Glow — bottom-right bright accent */
        .ab-glow {
          width: 50%;
          height: 45%;
          bottom: -15%;
          right: -10%;
          background: radial-gradient(
            ellipse 65% 55% at 40% 35%,
            rgba(20, 184, 154, 0.22) 0%,
            rgba(6, 182, 212, 0.12) 35%,
            rgba(94, 234, 212, 0.05) 55%,
            transparent 75%
          );
          filter: blur(55px);
          border-radius: 45% 55% 40% 60% / 55% 45% 55% 45%;
          animation: ab-g 28s ease-in-out infinite;
        }

        @keyframes ab-m {
          0%, 100% { transform: translate(0, 0) scale(1); border-radius: 42% 58% 65% 35% / 45% 55% 45% 55%; }
          33% { transform: translate(12px, 8px) scale(1.02); border-radius: 50% 50% 55% 45% / 50% 45% 55% 50%; }
          66% { transform: translate(-8px, -6px) scale(0.98); border-radius: 45% 55% 60% 40% / 48% 52% 48% 52%; }
        }
        @keyframes ab-d {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(-8px, 6px); }
          70% { transform: translate(6px, -5px); }
        }
        @keyframes ab-g {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-10px, -8px) scale(1.03); }
          70% { transform: translate(6px, 5px) scale(0.97); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-blob { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
