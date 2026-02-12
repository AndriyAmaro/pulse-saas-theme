'use client'

import { cn } from '@shared/utils/cn'

interface AuthBackgroundProps {
  className?: string
}

/** Generates a single ECG heartbeat path spanning the full viewBox width */
function ecgPath(baseY: number, beatWidth: number, beats: number): string {
  const parts: string[] = [`M 0 ${baseY}`]

  for (let b = 0; b < beats; b++) {
    const x = b * beatWidth
    parts.push(
      // Flat baseline
      `L ${x + 50} ${baseY}`,
      // P wave — small rounded bump (atrial depolarization)
      `Q ${x + 65} ${baseY - 12}, ${x + 80} ${baseY}`,
      // Flat before QRS
      `L ${x + 95} ${baseY}`,
      // Q dip
      `L ${x + 103} ${baseY + 8}`,
      // R spike — sharp peak (ventricular depolarization)
      `L ${x + 113} ${baseY - 55}`,
      // S dip
      `L ${x + 121} ${baseY + 14}`,
      // Return to baseline
      `L ${x + 130} ${baseY}`,
      // Flat after QRS
      `L ${x + 155} ${baseY}`,
      // T wave — gentle rounded bump (ventricular repolarization)
      `Q ${x + 173} ${baseY - 18}, ${x + 190} ${baseY}`,
      // Flat to next beat
      `L ${x + beatWidth} ${baseY}`,
    )
  }

  return parts.join(' ')
}

const BEAT_WIDTH = 220
const BEATS = 5 // covers 1100px, overflows 800 viewBox — clipped naturally

// ECG line configs: y position, peak opacity, animation delay/speed
const ECG_LINES = [
  { y: 180, opacity: 0.4, delay: '0s', duration: '6s' },
  { y: 340, opacity: 0.25, delay: '-2.2s', duration: '7.5s' },
  { y: 500, opacity: 0.18, delay: '-4.5s', duration: '8.5s' },
] as const

export function AuthBackground({ className }: AuthBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Base — rich vibrant teal gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1ACFAE 0%, #14B89C 25%, #10A68D 50%, #0D8F7A 75%, #0A7A69 100%)',
        }}
      />

      {/* Depth overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, transparent 0%, rgba(8, 90, 78, 0.2) 100%)',
        }}
      />

      {/* ECG heartbeat monitor — real sweep effect */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for the bright leading edge */}
          <filter id="auth-ecg-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ECG lines — 3-layer sweep per line for realistic trail */}
        {ECG_LINES.map((line, i) => {
          const d = ecgPath(line.y, BEAT_WIDTH, BEATS)
          return (
            <g key={i}>
              {/* Layer 1 — Faint long trail (20% of path visible) */}
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="white"
                strokeWidth={1}
                strokeOpacity={line.opacity * 0.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.2 0.8"
                className="animate-ecg-draw"
                style={{
                  animationDuration: line.duration,
                  animationDelay: line.delay,
                }}
              />
              {/* Layer 2 — Medium trail (8% visible, brighter) */}
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="white"
                strokeWidth={1.2}
                strokeOpacity={line.opacity * 0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.08 0.92"
                className="animate-ecg-draw"
                style={{
                  animationDuration: line.duration,
                  animationDelay: line.delay,
                }}
              />
              {/* Layer 3 — Bright glowing head (2.5% visible, full glow) */}
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="white"
                strokeWidth={i === 0 ? 2 : 1.5}
                strokeOpacity={line.opacity}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.025 0.975"
                filter="url(#auth-ecg-glow)"
                className="animate-ecg-draw"
                style={{
                  animationDuration: line.duration,
                  animationDelay: line.delay,
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Subtle ambient glow — upper area */}
      <div
        className="absolute top-[8%] right-[10%] h-[300px] w-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />
    </div>
  )
}
