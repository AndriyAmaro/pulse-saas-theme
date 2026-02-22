'use client'

import { cn } from '@shared/utils/cn'

interface AuthBackgroundProps {
  className?: string
}

// ── Pulse ECG path data (same as landing page hero AbstractBackground) ──
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

const PULSE_BOTTOM = `M 50,750 L 95,750 L 125,750 L 143,750
  L 153,742 L 163,758 L 170,750
  L 208,750 L 238,750
  L 249,732 L 260,780 L 271,716 L 282,774 L 293,740 L 304,750
  L 350,750 L 388,750 L 418,750
  L 428,742 L 438,758 L 445,750
  L 480,750 L 515,750
  L 527,735 L 539,778 L 551,719 L 563,772 L 575,742 L 587,750
  L 630,750 L 678,750 L 715,750`

const PULSE_BOTTOM_ECHO = `M 50,757 L 95,757 L 125,757 L 143,757
  L 153,750 L 163,764 L 170,757
  L 208,757 L 238,757
  L 249,740 L 260,783 L 271,724 L 282,778 L 293,747 L 304,757
  L 350,757 L 388,757 L 418,757
  L 428,750 L 438,764 L 445,757
  L 480,757 L 515,757
  L 527,743 L 539,781 L 551,727 L 563,776 L 575,749 L 587,757
  L 630,757 L 678,757 L 715,757`

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

const PULSE_RIGHT_BOTTOM = `M 715,750 L 762,750 L 792,750 L 810,750
  L 820,743 L 830,757 L 837,750
  L 875,750 L 905,750
  L 916,734 L 927,776 L 938,721 L 949,770 L 960,743 L 971,750
  L 1018,750 L 1056,750 L 1086,750
  L 1096,743 L 1106,757 L 1113,750
  L 1148,750 L 1183,750
  L 1195,736 L 1207,774 L 1219,724 L 1231,768 L 1243,745 L 1255,750
  L 1298,750 L 1346,750 L 1385,750`

const PULSE_RIGHT_BOTTOM_ECHO = `M 715,757 L 762,757 L 792,757 L 810,757
  L 820,750 L 830,764 L 837,757
  L 875,757 L 905,757
  L 916,741 L 927,780 L 938,728 L 949,775 L 960,750 L 971,757
  L 1018,757 L 1056,757 L 1086,757
  L 1096,750 L 1106,764 L 1113,757
  L 1148,757 L 1183,757
  L 1195,743 L 1207,778 L 1219,731 L 1231,773 L 1243,751 L 1255,757
  L 1298,757 L 1346,757 L 1385,757`

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

      {/* Pulse ECG — same draw-on style as landing page hero */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="auth-pulse-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* PULSE TOP — y~240 */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="auth-pulse-top-glow" filter="url(#auth-pulse-glow)" d={PULSE_TOP} stroke="white" strokeWidth="4" />
          <path className="auth-pulse-top" d={PULSE_TOP} stroke="white" strokeWidth="1.1" />
          <path className="auth-pulse-top-echo" d={PULSE_TOP_ECHO} stroke="white" strokeWidth="0.5" />
        </g>

        {/* PULSE BOTTOM — y~750 */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="auth-pulse-bot-glow" filter="url(#auth-pulse-glow)" d={PULSE_BOTTOM} stroke="white" strokeWidth="3.5" />
          <path className="auth-pulse-bot" d={PULSE_BOTTOM} stroke="white" strokeWidth="0.9" />
          <path className="auth-pulse-bot-echo" d={PULSE_BOTTOM_ECHO} stroke="white" strokeWidth="0.4" />
        </g>

        {/* PULSE RIGHT TOP */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="auth-pulse-rtop-glow" filter="url(#auth-pulse-glow)" d={PULSE_RIGHT_TOP} stroke="white" strokeWidth="3.5" />
          <path className="auth-pulse-rtop" d={PULSE_RIGHT_TOP} stroke="white" strokeWidth="1" />
          <path className="auth-pulse-rtop-echo" d={PULSE_RIGHT_TOP_ECHO} stroke="white" strokeWidth="0.4" />
        </g>

        {/* PULSE RIGHT BOTTOM */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="auth-pulse-rbot-glow" filter="url(#auth-pulse-glow)" d={PULSE_RIGHT_BOTTOM} stroke="white" strokeWidth="3" />
          <path className="auth-pulse-rbot" d={PULSE_RIGHT_BOTTOM} stroke="white" strokeWidth="0.8" />
          <path className="auth-pulse-rbot-echo" d={PULSE_RIGHT_BOTTOM_ECHO} stroke="white" strokeWidth="0.35" />
        </g>

        {/* PULSE MIDDLE — y~435 */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="auth-pulse-mid-glow" filter="url(#auth-pulse-glow)" d={PULSE_MID} stroke="white" strokeWidth="3" />
          <path className="auth-pulse-mid" d={PULSE_MID} stroke="white" strokeWidth="0.9" />
          <path className="auth-pulse-mid-echo" d={PULSE_MID_ECHO} stroke="white" strokeWidth="0.35" />
        </g>
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

      {/* Pulse ECG Animations */}
      <style>{`
        /* ═══════════════════════════════════════════════════════
           AUTH PULSE ECG — Same draw-on animation as landing hero
           ═══════════════════════════════════════════════════════ */
        @keyframes auth-ecg-top {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: 0.20; }
          32%  { stroke-dashoffset: 0; opacity: 0.16; }
          36%  { stroke-dashoffset: 1400; opacity: 0.05; }
          39%  { opacity: 0.20; }
          68%  { stroke-dashoffset: 0; opacity: 0.14; }
          80%  { stroke-dashoffset: 0; opacity: 0.04; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes auth-ecg-bot {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: 0.16; }
          32%  { stroke-dashoffset: 0; opacity: 0.12; }
          36%  { stroke-dashoffset: 1400; opacity: 0.04; }
          39%  { opacity: 0.16; }
          68%  { stroke-dashoffset: 0; opacity: 0.10; }
          80%  { stroke-dashoffset: 0; opacity: 0.03; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes auth-ecg-mid {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          3%   { opacity: 0.18; }
          32%  { stroke-dashoffset: 0; opacity: 0.14; }
          36%  { stroke-dashoffset: 2400; opacity: 0.04; }
          39%  { opacity: 0.18; }
          68%  { stroke-dashoffset: 0; opacity: 0.12; }
          80%  { stroke-dashoffset: 0; opacity: 0.03; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes auth-ecg-glow-top {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: 0.10; }
          32%  { stroke-dashoffset: 0; opacity: 0.08; }
          36%  { stroke-dashoffset: 1400; opacity: 0.02; }
          39%  { opacity: 0.10; }
          68%  { stroke-dashoffset: 0; opacity: 0.06; }
          80%  { stroke-dashoffset: 0; opacity: 0.015; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes auth-ecg-glow-bot {
          0%   { stroke-dashoffset: 1400; opacity: 0; }
          3%   { opacity: 0.08; }
          32%  { stroke-dashoffset: 0; opacity: 0.06; }
          36%  { stroke-dashoffset: 1400; opacity: 0.015; }
          39%  { opacity: 0.08; }
          68%  { stroke-dashoffset: 0; opacity: 0.05; }
          80%  { stroke-dashoffset: 0; opacity: 0.012; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes auth-ecg-glow-mid {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          3%   { opacity: 0.09; }
          32%  { stroke-dashoffset: 0; opacity: 0.07; }
          36%  { stroke-dashoffset: 2400; opacity: 0.02; }
          39%  { opacity: 0.09; }
          68%  { stroke-dashoffset: 0; opacity: 0.06; }
          80%  { stroke-dashoffset: 0; opacity: 0.015; }
          92%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        /* Top pulse */
        .auth-pulse-top {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .auth-pulse-top-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.3s;
        }
        .auth-pulse-top-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-glow-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Bottom pulse */
        .auth-pulse-bot {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5s;
        }
        .auth-pulse-bot-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5.3s;
        }
        .auth-pulse-bot-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-glow-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 5s;
        }

        /* Right top — continuation, delayed 3s */
        .auth-pulse-rtop {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3s;
        }
        .auth-pulse-rtop-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3.3s;
        }
        .auth-pulse-rtop-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-glow-top 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 3s;
        }

        /* Right bottom — continuation, delayed 8s */
        .auth-pulse-rbot {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8s;
        }
        .auth-pulse-rbot-echo {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8.3s;
        }
        .auth-pulse-rbot-glow {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: auth-ecg-glow-bot 18s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 8s;
        }

        /* Middle — own timing, delayed 10s */
        .auth-pulse-mid {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: auth-ecg-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10s;
        }
        .auth-pulse-mid-echo {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: auth-ecg-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10.3s;
        }
        .auth-pulse-mid-glow {
          stroke-dasharray: 2400; stroke-dashoffset: 2400;
          animation: auth-ecg-glow-mid 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 10s;
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-pulse-top, .auth-pulse-top-echo, .auth-pulse-top-glow,
          .auth-pulse-bot, .auth-pulse-bot-echo, .auth-pulse-bot-glow,
          .auth-pulse-rtop, .auth-pulse-rtop-echo, .auth-pulse-rtop-glow,
          .auth-pulse-rbot, .auth-pulse-rbot-echo, .auth-pulse-rbot-glow,
          .auth-pulse-mid, .auth-pulse-mid-echo, .auth-pulse-mid-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
