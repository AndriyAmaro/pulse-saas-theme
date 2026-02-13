'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// ABSTRACT BACKGROUND — Large sweeping arcs + Pulse ECG heartbeat animation.
// Supports light & dark mode. Light = subtle & elegant. Dark = deep & premium.
// ============================================================================

export interface AbstractBackgroundProps {
  className?: string
}

// Pulse ECG path data — reused for main, glow, and echo layers
const PULSE_TOP = `M 30,240 L 80,240 L 110,240 L 128,240
  L 138,232 L 148,248 L 155,240
  L 195,240 L 225,240
  L 236,218 L 247,270 L 258,195 L 269,265 L 280,230 L 291,240
  L 340,240 L 380,240 L 410,240
  L 420,232 L 430,248 L 437,240
  L 475,240 L 510,240
  L 522,222 L 534,268 L 546,198 L 558,262 L 570,232 L 582,240
  L 630,240 L 680,240 L 720,240`

const PULSE_TOP_ECHO = `M 30,248 L 80,248 L 110,248 L 128,248
  L 138,241 L 148,255 L 155,248
  L 195,248 L 225,248
  L 236,228 L 247,274 L 258,206 L 269,270 L 280,238 L 291,248
  L 340,248 L 380,248 L 410,248
  L 420,241 L 430,255 L 437,248
  L 475,248 L 510,248
  L 522,231 L 534,272 L 546,209 L 558,267 L 570,240 L 582,248
  L 630,248 L 680,248 L 720,248`

const PULSE_BOTTOM = `M 50,630 L 95,630 L 125,630 L 143,630
  L 153,622 L 163,638 L 170,630
  L 208,630 L 238,630
  L 249,612 L 260,660 L 271,596 L 282,654 L 293,620 L 304,630
  L 350,630 L 388,630 L 418,630
  L 428,622 L 438,638 L 445,630
  L 480,630 L 515,630
  L 527,615 L 539,658 L 551,599 L 563,652 L 575,622 L 587,630
  L 630,630 L 678,630 L 715,630`

const PULSE_BOTTOM_ECHO = `M 50,637 L 95,637 L 125,637 L 143,637
  L 153,630 L 163,644 L 170,637
  L 208,637 L 238,637
  L 249,620 L 260,663 L 271,604 L 282,658 L 293,627 L 304,637
  L 350,637 L 388,637 L 418,637
  L 428,630 L 438,644 L 445,637
  L 480,637 L 515,637
  L 527,623 L 539,661 L 551,607 L 563,656 L 575,629 L 587,637
  L 630,637 L 678,637 L 715,637`

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
      {/* ── 1. Base: Dark navy / Light white-teal ── */}
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          background: 'linear-gradient(155deg, #0B0D2E 0%, #080A22 35%, #0A0C28 55%, #06081C 100%)',
        }}
      />
      <div
        className="absolute inset-0 dark:hidden block"
        style={{
          background: 'linear-gradient(155deg, #F8FFFE 0%, #EFFCF9 30%, #F0FDFA 55%, #FFFFFF 100%)',
        }}
      />

      {/* ── 2. Organic blob shapes ── */}
      <div className="ab-canvas">
        <div className="ab-blob ab-main" />
        <div className="ab-blob ab-dark" />
        <div className="ab-blob ab-glow" />
      </div>

      {/* ── 3. SVG: Large sweeping arcs + sphere + waves + pulse ECG ── */}
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

          {/* Light sphere gradient */}
          <radialGradient id="ab-sph-light" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#F1F5F9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="ab-sph-rim-light" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="transparent" />
            <stop offset="93%" stopColor="#14B89A" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.04" />
          </radialGradient>

          {/* Wave gradient */}
          <linearGradient id="ab-wg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="20%" stopColor="#14B89A" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#99F6E4" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#CCFBF1" stopOpacity="0.05" />
          </linearGradient>

          {/* ── Pulse ECG gradients ── */}
          <filter id="ab-pulse-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.89  0 0 0 0 0.78  0 0 0 0.6 0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ab-pulse-grad-top" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DE4C8" stopOpacity="0" />
            <stop offset="8%" stopColor="#5DE4C8" stopOpacity="1" />
            <stop offset="85%" stopColor="#2DD1B1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ab-pulse-grad-bot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2DD1B1" stopOpacity="0" />
            <stop offset="8%" stopColor="#2DD1B1" stopOpacity="1" />
            <stop offset="85%" stopColor="#5DE4C8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9AF0DD" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ════════════════════════════════════════════════════
            LARGE SWEEPING ARCS
            ════════════════════════════════════════════════════ */}

        {/* Arc 1 — Biggest */}
        <path
          d="M 600 -100 Q 1100 200, 1500 700"
          stroke="url(#ab-ag1)"
          strokeWidth="1.5"
          className="opacity-50 dark:opacity-50"
          fill="none"
        />
        <path
          d="M 600 -100 Q 1100 200, 1500 700 L 1500 900 L 600 900 Z"
          fill="url(#ab-fill2)"
          className="opacity-20 dark:opacity-40"
        />

        {/* Arc 2 */}
        <path
          d="M 250 -50 Q 800 300, 1200 950"
          stroke="url(#ab-ag1)"
          strokeWidth="1.8"
          className="opacity-30 dark:opacity-55"
          fill="none"
        />
        <path
          d="M 250 -50 Q 800 300, 1200 950 L 1500 950 L 1500 -50 Z"
          fill="url(#ab-fill1)"
          className="opacity-15 dark:opacity-30"
        />

        {/* Arc 3 */}
        <path
          d="M 500 -80 Q 650 350, 400 950"
          stroke="url(#ab-ag1)"
          strokeWidth="1.2"
          className="opacity-22 dark:opacity-40"
          fill="none"
        />

        {/* Arc 4 */}
        <path
          d="M 450 200 Q 750 450, 1050 900"
          stroke="url(#ab-ag1)"
          strokeWidth="1.4"
          className="opacity-25 dark:opacity-45"
          fill="none"
        />
        <path
          d="M 450 200 Q 750 450, 1050 900 L 1440 900 L 1440 200 Z"
          fill="url(#ab-fill1)"
          className="opacity-10 dark:opacity-20"
        />

        {/* Arc 5 */}
        <path
          d="M -50 400 Q 500 100, 1100 250"
          stroke="url(#ab-ag1)"
          strokeWidth="1"
          className="opacity-18 dark:opacity-35"
          fill="none"
        />

        {/* Arc 6 */}
        <path
          d="M 550 350 Q 800 500, 1300 600"
          stroke="url(#ab-ag1)"
          strokeWidth="0.8"
          className="opacity-15 dark:opacity-30"
          fill="none"
        />

        {/* ── Parallel thin lines along main arcs ── */}
        {[...Array(8)].map((_, i) => {
          const offset = (i + 1) * 18
          return (
            <React.Fragment key={`pl-${i}`}>
              <path
                d={`M ${600 - offset * 0.6} ${-100 + offset * 0.3} Q ${1100 - offset * 0.4} ${200 + offset * 0.5}, ${1500 - offset * 0.1} ${700 + offset * 0.2}`}
                stroke="url(#ab-ag1)"
                strokeWidth={0.5 + (i < 4 ? 0.2 : 0)}
                strokeOpacity={0.25 - i * 0.025}
                fill="none"
                className="dark:opacity-100 opacity-40"
              />
              <path
                d={`M ${250 + offset * 0.5} ${-50 + offset * 0.4} Q ${800 + offset * 0.3} ${300 + offset * 0.6}, ${1200 + offset * 0.2} ${950}`}
                stroke="url(#ab-ag1)"
                strokeWidth={0.5 + (i < 4 ? 0.2 : 0)}
                strokeOpacity={0.22 - i * 0.022}
                fill="none"
                className="dark:opacity-100 opacity-40"
              />
            </React.Fragment>
          )
        })}

        {/* ── DARK SPHERE (dark mode) ── */}
        <g className="hidden dark:block">
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph)" />
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph-rim)" />
          <circle cx="862" cy="432" r="20" fill="#14B89A" fillOpacity="0.03" />
        </g>
        {/* ── LIGHT SPHERE (light mode) ── */}
        <g className="dark:hidden block">
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph-light)" />
          <circle cx="880" cy="450" r="65" fill="url(#ab-sph-rim-light)" />
          <circle cx="862" cy="432" r="20" fill="#14B89A" fillOpacity="0.02" />
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
            className="dark:opacity-100 opacity-30"
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
              className="dark:opacity-100 opacity-50"
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

        {/* ════════════════════════════════════════════════════
            PREMIUM PULSE ECG — Heartbeat animation left side
            2 beats then fade, glow + main + echo per line
            ════════════════════════════════════════════════════ */}

        {/* PULSE TOP — y~240 */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-pulse-top-glow" filter="url(#ab-pulse-glow)" d={PULSE_TOP} stroke="#5DE4C8" strokeWidth="4" />
          <path className="ab-pulse-top" d={PULSE_TOP} stroke="url(#ab-pulse-grad-top)" strokeWidth="1.1" />
          <path className="ab-pulse-top-echo" d={PULSE_TOP_ECHO} stroke="#2DD1B1" strokeWidth="0.5" />
        </g>

        {/* PULSE BOTTOM — y~630 */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-pulse-bot-glow" filter="url(#ab-pulse-glow)" d={PULSE_BOTTOM} stroke="#2DD1B1" strokeWidth="3.5" />
          <path className="ab-pulse-bot" d={PULSE_BOTTOM} stroke="url(#ab-pulse-grad-bot)" strokeWidth="0.9" />
          <path className="ab-pulse-bot-echo" d={PULSE_BOTTOM_ECHO} stroke="#9AF0DD" strokeWidth="0.4" />
        </g>
      </svg>

      {/* ── Noise texture ── */}
      <div className="noise-overlay absolute inset-0 opacity-20 dark:opacity-20" />

      {/* ── CSS ── */}
      <style>{`
        .ab-canvas {
          position: absolute;
          inset: 0;
        }
        .ab-blob {
          position: absolute;
        }

        /* Main teal blob — upper-left */
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

        /* Dark zone — center-right */
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

        /* Glow — bottom-right */
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

        /* ── Light mode blob overrides ── */
        :where(:not(.dark)) .ab-main {
          background: radial-gradient(
            ellipse 75% 65% at 55% 55%,
            rgba(20, 184, 154, 0.12) 0%,
            rgba(13, 148, 136, 0.06) 30%,
            rgba(6, 95, 85, 0.02) 55%,
            transparent 75%
          );
        }
        :where(:not(.dark)) .ab-dark {
          background: radial-gradient(
            ellipse 65% 60% at 50% 50%,
            rgba(226, 232, 240, 0.3) 0%,
            rgba(241, 245, 249, 0.15) 45%,
            transparent 70%
          );
        }
        :where(:not(.dark)) .ab-glow {
          background: radial-gradient(
            ellipse 65% 55% at 40% 35%,
            rgba(20, 184, 154, 0.08) 0%,
            rgba(6, 182, 212, 0.04) 35%,
            rgba(94, 234, 212, 0.02) 55%,
            transparent 75%
          );
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

        /* ════════════════════════════════════════════════════
           PULSE ECG ANIMATIONS — 2 beats + fade out
           ════════════════════════════════════════════════════ */
        @keyframes ab-ecg-top {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: var(--ecg-peak, 0.22); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-mid, 0.18); }
          36%  { stroke-dashoffset: 1400; opacity: var(--ecg-reset, 0.06); }
          39%  { opacity: var(--ecg-peak, 0.22); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-mid2, 0.15); }
          80%  { stroke-dashoffset: 0; opacity: 0.04; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ab-ecg-bot {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: var(--ecg-peak-b, 0.18); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-mid-b, 0.14); }
          36%  { stroke-dashoffset: 1400; opacity: var(--ecg-reset-b, 0.05); }
          39%  { opacity: var(--ecg-peak-b, 0.18); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-mid2-b, 0.12); }
          80%  { stroke-dashoffset: 0; opacity: 0.03; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ab-ecg-glow-top {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: var(--ecg-glow-peak, 0.12); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid, 0.10); }
          36%  { stroke-dashoffset: 1400; opacity: 0.03; }
          39%  { opacity: var(--ecg-glow-peak, 0.12); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid2, 0.08); }
          80%  { stroke-dashoffset: 0; opacity: 0.02; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ab-ecg-glow-bot {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: var(--ecg-glow-peak-b, 0.10); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid-b, 0.08); }
          36%  { stroke-dashoffset: 1400; opacity: 0.02; }
          39%  { opacity: var(--ecg-glow-peak-b, 0.10); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid2-b, 0.06); }
          80%  { stroke-dashoffset: 0; opacity: 0.015; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        /* Dark mode: normal intensity */
        :where(.dark) {
          --ecg-peak: 0.22; --ecg-mid: 0.18; --ecg-reset: 0.06; --ecg-mid2: 0.15;
          --ecg-peak-b: 0.18; --ecg-mid-b: 0.14; --ecg-reset-b: 0.05; --ecg-mid2-b: 0.12;
          --ecg-glow-peak: 0.12; --ecg-glow-mid: 0.10; --ecg-glow-mid2: 0.08;
          --ecg-glow-peak-b: 0.10; --ecg-glow-mid-b: 0.08; --ecg-glow-mid2-b: 0.06;
        }
        /* Light mode: much more subtle */
        :root {
          --ecg-peak: 0.12; --ecg-mid: 0.09; --ecg-reset: 0.03; --ecg-mid2: 0.07;
          --ecg-peak-b: 0.10; --ecg-mid-b: 0.07; --ecg-reset-b: 0.02; --ecg-mid2-b: 0.06;
          --ecg-glow-peak: 0.06; --ecg-glow-mid: 0.04; --ecg-glow-mid2: 0.03;
          --ecg-glow-peak-b: 0.05; --ecg-glow-mid-b: 0.03; --ecg-glow-mid2-b: 0.02;
        }

        .ab-pulse-top {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ab-pulse-top-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.3s;
        }
        .ab-pulse-top-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-top 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ab-pulse-bot {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 4s;
        }
        .ab-pulse-bot-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 4.3s;
        }
        .ab-pulse-bot-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-bot 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 4s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-blob,
          .ab-pulse-top, .ab-pulse-top-echo, .ab-pulse-top-glow,
          .ab-pulse-bot, .ab-pulse-bot-echo, .ab-pulse-bot-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
