'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'

interface HeroBackgroundProps {
  className?: string
  showAccent?: boolean
}

// Seeded random for SSR/CSR consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

// ECG beat with 2 full cycles (~350px wide at scale 1)
// baseline → P → QRS → T → baseline → P → QRS → T → baseline
function ecgBeat(scale: number = 1) {
  const s = scale
  const cycle =
    `l ${6 * s},-${7 * s} ` +       // P wave up
    `l ${6 * s},${7 * s} ` +        // P wave down
    `l ${14 * s},0 ` +              // PR segment
    `l ${3 * s},-${5 * s} ` +       // Q dip
    `l ${5 * s},-${60 * s} ` +      // R spike UP (tall!)
    `l ${5 * s},${80 * s} ` +       // S spike DOWN (deep!)
    `l ${4 * s},-${15 * s} ` +      // return to baseline
    `l ${18 * s},0 ` +              // ST segment
    `l ${8 * s},-${10 * s} ` +      // T wave up
    `l ${8 * s},${10 * s} ` +       // T wave down
    `l ${25 * s},0 `                 // inter-beat baseline
  return (
    `l ${30 * s},0 ` +              // lead-in baseline
    cycle +                          // first heartbeat
    cycle +                          // second heartbeat
    `l ${25 * s},0`                  // trail baseline
  )
}

export function HeroBackground({
  className,
}: HeroBackgroundProps) {
  // Each pulse: position, scale, opacity, animation timing
  const pulses = React.useMemo(() => {
    const items: {
      x: number; y: number; scale: number
      opacity: number; dur: number; delay: number
    }[] = [
      // Top zone — subtle, small
      { x: 200, y: 160, scale: 0.45, opacity: 0.12, dur: 11, delay: 2 },
      { x: 850, y: 140, scale: 0.5,  opacity: 0.10, dur: 12, delay: 6 },
      // Upper-mid — medium
      { x: 80,  y: 300, scale: 0.6,  opacity: 0.16, dur: 10, delay: 4 },
      { x: 550, y: 280, scale: 0.7,  opacity: 0.20, dur: 9,  delay: 1 },
      { x: 1000,y: 260, scale: 0.55, opacity: 0.14, dur: 11, delay: 7 },
      // Center — main, largest
      { x: 300, y: 420, scale: 0.9,  opacity: 0.28, dur: 8,  delay: 0 },
      { x: 700, y: 400, scale: 1.0,  opacity: 0.32, dur: 8.5,delay: 3 },
      { x: 1050,y: 440, scale: 0.8,  opacity: 0.22, dur: 9,  delay: 5.5 },
      // Lower-mid — medium
      { x: 150, y: 560, scale: 0.6,  opacity: 0.15, dur: 10, delay: 3.5 },
      { x: 600, y: 580, scale: 0.7,  opacity: 0.18, dur: 9.5,delay: 7.5 },
      { x: 920, y: 600, scale: 0.55, opacity: 0.14, dur: 11, delay: 1.5 },
      // Bottom — subtle
      { x: 400, y: 720, scale: 0.45, opacity: 0.10, dur: 12, delay: 5 },
      { x: 780, y: 740, scale: 0.5,  opacity: 0.12, dur: 11, delay: 8.5 },
    ]
    return items
  }, [])

  // Small particles
  const particles = React.useMemo(() => {
    const items: { x: number; y: number; r: number; opacity: number; dur: number; delay: number }[] = []
    for (let i = 0; i < 14; i++) {
      items.push({
        x: seededRandom(i * 3 + 1) * 1440,
        y: seededRandom(i * 3 + 2) * 900,
        r: 0.6 + seededRandom(i * 3 + 3) * 1.2,
        opacity: 0.08 + seededRandom(i * 7) * 0.14,
        dur: 10 + seededRandom(i * 5) * 12,
        delay: seededRandom(i * 11) * 8,
      })
    }
    return items
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>

      {/* Soft ambient glow */}
      <div
        className="absolute top-[45%] left-[55%] w-[500px] h-[200px] -translate-x-1/2 -translate-y-1/2
          max-md:w-[80%] max-md:h-[100px] max-md:left-[50%]"
        style={{
          background: 'radial-gradient(ellipse, rgba(20, 184, 154, 0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* SVG — Short animated ECG pulses + particles */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="ecg-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(20, 184, 154)" stopOpacity="0" />
            <stop offset="15%" stopColor="rgb(94, 234, 212)" stopOpacity="1" />
            <stop offset="85%" stopColor="rgb(94, 234, 212)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(20, 184, 154)" stopOpacity="0" />
          </linearGradient>

          <filter id="ecg-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* ── Animated ECG pulse segments ── */}
        {pulses.map((p, i) => {
          const d = `M ${p.x},${p.y} ${ecgBeat(p.scale)}`
          // Approximate path length for this beat
          const pathLen = 259 * p.scale

          return (
            <g key={i}>
              {/* Main line — draws on slowly, stays, fades very slowly */}
              <path
                d={d}
                stroke="rgb(94, 234, 212)"
                strokeWidth="1"
                strokeOpacity={p.opacity}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen}
              >
                {/* Draw on over 25%, stay drawn until 80%, then stays */}
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${pathLen};0;0;0`}
                  keyTimes="0;0.25;0.8;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                />
                {/* Fade in 10%, stay visible 70%, fade out last 20% — very slow disappear */}
                <animate
                  attributeName="stroke-opacity"
                  values={`0;${p.opacity};${p.opacity};${p.opacity * 0.5};0`}
                  keyTimes="0;0.1;0.65;0.85;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Glow layer */}
              <path
                d={d}
                stroke="rgb(20, 184, 154)"
                strokeWidth="6"
                strokeOpacity="0"
                fill="none"
                filter="url(#ecg-glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${pathLen};0;0;0`}
                  keyTimes="0;0.25;0.8;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values={`0;${p.opacity * 0.3};${p.opacity * 0.3};${p.opacity * 0.15};0`}
                  keyTimes="0;0.1;0.65;0.85;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )
        })}

        {/* ── Tiny floating particles ── */}
        {particles.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="rgb(94, 234, 212)"
            fillOpacity={p.opacity}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; ${(i % 2 === 0 ? 1 : -1) * 2},${(i % 3 === 0 ? -1 : 1) * 3}; 0,0`}
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values={`${p.opacity};${p.opacity * 0.2};${p.opacity}`}
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
