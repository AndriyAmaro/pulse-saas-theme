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

// ── RIGHT SIDE pulse paths (continuation from left) ──
const PULSE_RIGHT_TOP = `M 720,240 L 770,240 L 800,240 L 818,240
  L 828,233 L 838,247 L 845,240
  L 885,240 L 915,240
  L 926,221 L 937,267 L 948,199 L 959,261 L 970,233 L 981,240
  L 1030,240 L 1068,240 L 1098,240
  L 1108,233 L 1118,247 L 1125,240
  L 1163,240 L 1198,240
  L 1210,224 L 1222,264 L 1234,202 L 1246,258 L 1258,235 L 1270,240
  L 1318,240 L 1368,240 L 1410,240`

const PULSE_RIGHT_TOP_ECHO = `M 720,248 L 770,248 L 800,248 L 818,248
  L 828,241 L 838,255 L 845,248
  L 885,248 L 915,248
  L 926,230 L 937,272 L 948,208 L 959,268 L 970,241 L 981,248
  L 1030,248 L 1068,248 L 1098,248
  L 1108,241 L 1118,255 L 1125,248
  L 1163,248 L 1198,248
  L 1210,232 L 1222,270 L 1234,211 L 1246,265 L 1258,242 L 1270,248
  L 1318,248 L 1368,248 L 1410,248`

const PULSE_RIGHT_BOTTOM = `M 715,630 L 762,630 L 792,630 L 810,630
  L 820,623 L 830,637 L 837,630
  L 875,630 L 905,630
  L 916,614 L 927,656 L 938,601 L 949,650 L 960,623 L 971,630
  L 1018,630 L 1056,630 L 1086,630
  L 1096,623 L 1106,637 L 1113,630
  L 1148,630 L 1183,630
  L 1195,616 L 1207,654 L 1219,604 L 1231,648 L 1243,625 L 1255,630
  L 1298,630 L 1346,630 L 1385,630`

const PULSE_RIGHT_BOTTOM_ECHO = `M 715,637 L 762,637 L 792,637 L 810,637
  L 820,630 L 830,644 L 837,637
  L 875,637 L 905,637
  L 916,621 L 927,660 L 938,608 L 949,655 L 960,630 L 971,637
  L 1018,637 L 1056,637 L 1086,637
  L 1096,630 L 1106,644 L 1113,637
  L 1148,637 L 1183,637
  L 1195,623 L 1207,658 L 1219,611 L 1231,653 L 1243,631 L 1255,637
  L 1298,637 L 1346,637 L 1385,637`

// ── UPPER pulse path (y~60, spanning full width) ──
const PULSE_UPPER = `M 60,60 L 108,60 L 138,60 L 156,60
  L 166,53 L 176,67 L 183,60
  L 221,60 L 251,60
  L 262,44 L 273,82 L 284,30 L 295,78 L 306,52 L 317,60
  L 365,60 L 403,60 L 433,60
  L 443,53 L 453,67 L 460,60
  L 498,60 L 533,60
  L 545,46 L 557,80 L 569,32 L 581,76 L 593,54 L 605,60
  L 653,60 L 701,60 L 750,60 L 798,60 L 828,60
  L 838,53 L 848,67 L 855,60
  L 893,60 L 923,60
  L 934,46 L 945,80 L 956,33 L 967,77 L 978,54 L 989,60
  L 1037,60 L 1085,60 L 1115,60
  L 1125,54 L 1135,66 L 1142,60
  L 1178,60 L 1213,60
  L 1225,47 L 1237,78 L 1249,35 L 1261,74 L 1273,55 L 1285,60
  L 1330,60 L 1380,60`

const PULSE_UPPER_ECHO = `M 60,67 L 108,67 L 138,67 L 156,67
  L 166,61 L 176,73 L 183,67
  L 221,67 L 251,67
  L 262,52 L 273,86 L 284,39 L 295,82 L 306,59 L 317,67
  L 365,67 L 403,67 L 433,67
  L 443,61 L 453,73 L 460,67
  L 498,67 L 533,67
  L 545,54 L 557,84 L 569,41 L 581,80 L 593,61 L 605,67
  L 653,67 L 701,67 L 750,67 L 798,67 L 828,67
  L 838,61 L 848,73 L 855,67
  L 893,67 L 923,67
  L 934,53 L 945,84 L 956,42 L 967,81 L 978,61 L 989,67
  L 1037,67 L 1085,67 L 1115,67
  L 1125,61 L 1135,72 L 1142,67
  L 1178,67 L 1213,67
  L 1225,54 L 1237,82 L 1249,43 L 1261,79 L 1273,62 L 1285,67
  L 1330,67 L 1380,67`

// ── MIDDLE pulse path (y~435, spanning wider) ──
const PULSE_MID = `M 180,435 L 228,435 L 258,435 L 276,435
  L 286,428 L 296,442 L 303,435
  L 341,435 L 371,435
  L 382,418 L 393,458 L 404,400 L 415,453 L 426,426 L 437,435
  L 485,435 L 523,435 L 553,435
  L 563,428 L 573,442 L 580,435
  L 618,435 L 653,435
  L 665,420 L 677,456 L 689,404 L 701,450 L 713,428 L 725,435
  L 773,435 L 821,435 L 870,435 L 918,435 L 948,435
  L 958,428 L 968,442 L 975,435
  L 1013,435 L 1043,435
  L 1054,420 L 1065,456 L 1076,403 L 1087,451 L 1098,428 L 1109,435
  L 1157,435 L 1205,435 L 1260,435`

const PULSE_MID_ECHO = `M 180,442 L 228,442 L 258,442 L 276,442
  L 286,436 L 296,448 L 303,442
  L 341,442 L 371,442
  L 382,426 L 393,462 L 404,409 L 415,457 L 426,433 L 437,442
  L 485,442 L 523,442 L 553,442
  L 563,436 L 573,448 L 580,442
  L 618,442 L 653,442
  L 665,428 L 677,460 L 689,412 L 701,455 L 713,434 L 725,442
  L 773,442 L 821,442 L 870,442 L 918,442 L 948,442
  L 958,436 L 968,448 L 975,442
  L 1013,442 L 1043,442
  L 1054,427 L 1065,460 L 1076,411 L 1087,456 L 1098,435 L 1109,442
  L 1157,442 L 1205,442 L 1260,442`

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
          background: 'linear-gradient(155deg, #0B0D2E 0%, #080A22 35%, #0A0C28 55%, #06081C 100%)',
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
          {/* ── Filled arc gradients (from preview design) ── */}
          {/* Camada 1: Primary 800→600 — large green arc left */}
          <linearGradient id="ab-green" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#0A5E53" />
            <stop offset="45%" stopColor="#0D7768" />
            <stop offset="100%" stopColor="#109580" stopOpacity="0.7" />
          </linearGradient>
          {/* Camada 2: Primary 900→700 — blue/slate arc top-right */}
          <linearGradient id="ab-blue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#074A42" />
            <stop offset="50%" stopColor="#0A5E53" />
            <stop offset="100%" stopColor="#0D7768" stopOpacity="0.8" />
          </linearGradient>
          {/* Camada 3: Primary 300→500 — teal fade intermediate */}
          <linearGradient id="ab-teal-fade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5DE4C8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#2DD1B1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0.06" />
          </linearGradient>
          {/* Camada 4: Primary 400→600 — bottom teal radial */}
          <radialGradient id="ab-amber" cx="70%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#2DD1B1" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#14B89A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#109580" stopOpacity="0.06" />
          </radialGradient>
          {/* Camada 5: Primary 200→400 — bottom smaller radial */}
          <radialGradient id="ab-coral" cx="80%" cy="90%" r="50%">
            <stop offset="0%" stopColor="#9AF0DD" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#5DE4C8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2DD1B1" stopOpacity="0.05" />
          </radialGradient>
          {/* Center glow */}
          <radialGradient id="ab-center-glow" cx="55%" cy="55%" r="40%">
            <stop offset="0%" stopColor="#2DD1B1" stopOpacity="0.07" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
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
          {/* Right side pulse gradients (mirrored fade) */}
          <linearGradient id="ab-pulse-grad-rtop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="10%" stopColor="#2DD1B1" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#5DE4C8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9AF0DD" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ab-pulse-grad-rbot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="10%" stopColor="#5DE4C8" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#2DD1B1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
          {/* Middle pulse gradient (fade both ends) */}
          <linearGradient id="ab-pulse-grad-mid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DE4C8" stopOpacity="0" />
            <stop offset="6%" stopColor="#5DE4C8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#2DD1B1" stopOpacity="0.5" />
            <stop offset="94%" stopColor="#14B89A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
          {/* Upper pulse gradient (fade both ends, slightly brighter) */}
          <linearGradient id="ab-pulse-grad-upper" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9AF0DD" stopOpacity="0" />
            <stop offset="5%" stopColor="#5DE4C8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2DD1B1" stopOpacity="0.6" />
            <stop offset="95%" stopColor="#5DE4C8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9AF0DD" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ════════════════════════════════════════════════════
            FILLED ARC SHAPES — from preview design
            Scaled from 960×540 → 1440×900
            ════════════════════════════════════════════════════ */}

        {/* Camada 1: GREEN — large arc left side */}
        <path
          d="M 0,0 L 0,900 L 990,900 C 900,700 840,500 855,333 C 870,167 930,50 840,0 Z"
          fill="url(#ab-green)" opacity="0.85"
        />

        {/* Camada 2: BLUE — arc top-right */}
        <path
          d="M 1440,0 L 795,0 C 690,133 675,300 705,467 C 735,667 810,800 885,900 L 960,900 C 885,767 840,617 818,467 C 795,283 810,133 900,0 Z"
          fill="url(#ab-blue)" opacity="0.75"
        />
        {/* Blue right fill */}
        <path
          d="M 900,0 L 1440,0 L 1440,900 L 960,900 C 885,767 840,617 818,467 C 795,283 810,133 900,0 Z"
          fill="url(#ab-blue)" opacity="0.75"
        />

        {/* Camada 3: TEAL FADE — intermediate arc strip */}
        <path
          d="M 855,0 C 735,167 720,367 750,567 C 780,767 855,867 930,900 L 1020,900 C 945,833 885,717 855,567 C 818,367 833,167 945,0 Z"
          fill="url(#ab-teal-fade)"
        />

        {/* Camada 4: TEAL MEDIUM — bottom rounded arc */}
        <path
          d="M 570,900 L 1440,900 L 1440,383 C 1320,300 1170,300 1020,350 C 840,433 690,617 570,900 Z"
          fill="url(#ab-amber)"
        />

        {/* Camada 5: CORAL — smaller bottom-right arc */}
        <path
          d="M 750,900 L 1440,900 L 1440,500 C 1350,433 1245,433 1140,475 C 1005,533 900,667 750,900 Z"
          fill="url(#ab-coral)"
        />

        {/* Center glow */}
        <rect width="1440" height="900" fill="url(#ab-center-glow)" />

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

        {/* PULSE RIGHT TOP — y~240, continuation from left */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-pulse-rtop-glow" filter="url(#ab-pulse-glow)" d={PULSE_RIGHT_TOP} stroke="#5DE4C8" strokeWidth="3.5" />
          <path className="ab-pulse-rtop" d={PULSE_RIGHT_TOP} stroke="url(#ab-pulse-grad-rtop)" strokeWidth="1" />
          <path className="ab-pulse-rtop-echo" d={PULSE_RIGHT_TOP_ECHO} stroke="#2DD1B1" strokeWidth="0.4" />
        </g>

        {/* PULSE RIGHT BOTTOM — y~630, continuation from left */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-pulse-rbot-glow" filter="url(#ab-pulse-glow)" d={PULSE_RIGHT_BOTTOM} stroke="#2DD1B1" strokeWidth="3" />
          <path className="ab-pulse-rbot" d={PULSE_RIGHT_BOTTOM} stroke="url(#ab-pulse-grad-rbot)" strokeWidth="0.8" />
          <path className="ab-pulse-rbot-echo" d={PULSE_RIGHT_BOTTOM_ECHO} stroke="#9AF0DD" strokeWidth="0.35" />
        </g>

        {/* PULSE MIDDLE — y~435, spanning wider */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-pulse-mid-glow" filter="url(#ab-pulse-glow)" d={PULSE_MID} stroke="#2DD1B1" strokeWidth="3" />
          <path className="ab-pulse-mid" d={PULSE_MID} stroke="url(#ab-pulse-grad-mid)" strokeWidth="0.9" />
          <path className="ab-pulse-mid-echo" d={PULSE_MID_ECHO} stroke="#5DE4C8" strokeWidth="0.35" />
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
        /* Middle pulse keyframes (longer path = 2400 dashoffset) */
        @keyframes ab-ecg-mid {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          3%   { opacity: var(--ecg-peak, 0.22); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-mid, 0.18); }
          36%  { stroke-dashoffset: 2400; opacity: var(--ecg-reset, 0.06); }
          39%  { opacity: var(--ecg-peak, 0.22); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-mid2, 0.15); }
          80%  { stroke-dashoffset: 0; opacity: 0.04; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ab-ecg-glow-mid {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          3%   { opacity: var(--ecg-glow-peak, 0.12); }
          32%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid, 0.10); }
          36%  { stroke-dashoffset: 2400; opacity: 0.03; }
          39%  { opacity: var(--ecg-glow-peak, 0.12); }
          68%  { stroke-dashoffset: 0; opacity: var(--ecg-glow-mid2, 0.08); }
          80%  { stroke-dashoffset: 0; opacity: 0.02; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
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

        /* Pulse intensity — same for both modes */
        :root {
          --ecg-peak: 0.16; --ecg-mid: 0.12; --ecg-reset: 0.04; --ecg-mid2: 0.10;
          --ecg-peak-b: 0.13; --ecg-mid-b: 0.10; --ecg-reset-b: 0.03; --ecg-mid2-b: 0.08;
          --ecg-glow-peak: 0.08; --ecg-glow-mid: 0.06; --ecg-glow-mid2: 0.05;
          --ecg-glow-peak-b: 0.07; --ecg-glow-mid-b: 0.05; --ecg-glow-mid2-b: 0.04;
        }

        .ab-pulse-top {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ab-pulse-top-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.3s;
        }
        .ab-pulse-top-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ab-pulse-bot {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5s;
        }
        .ab-pulse-bot-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5.3s;
        }
        .ab-pulse-bot-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5s;
        }

        /* Right top — continuation of left top, delayed 3s */
        .ab-pulse-rtop {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3s;
        }
        .ab-pulse-rtop-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3.3s;
        }
        .ab-pulse-rtop-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3s;
        }

        /* Right bottom — continuation of left bottom, delayed 8s */
        .ab-pulse-rbot {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8s;
        }
        .ab-pulse-rbot-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8.3s;
        }
        .ab-pulse-rbot-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: ab-ecg-glow-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8s;
        }

        /* Middle — own timing, delayed 10s for staggered feel */
        .ab-pulse-mid {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: ab-ecg-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10s;
        }
        .ab-pulse-mid-echo {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: ab-ecg-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10.3s;
        }
        .ab-pulse-mid-glow {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: ab-ecg-glow-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-blob,
          .ab-pulse-top, .ab-pulse-top-echo, .ab-pulse-top-glow,
          .ab-pulse-bot, .ab-pulse-bot-echo, .ab-pulse-bot-glow,
          .ab-pulse-rtop, .ab-pulse-rtop-echo, .ab-pulse-rtop-glow,
          .ab-pulse-rbot, .ab-pulse-rbot-echo, .ab-pulse-rbot-glow,
          .ab-pulse-mid, .ab-pulse-mid-echo, .ab-pulse-mid-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
