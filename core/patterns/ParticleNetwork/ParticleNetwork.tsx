'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// ABSTRACT GRADIENT ART — Premium glassmorphic background decoration
// Large overlapping translucent shapes with rich gradients & gentle drift
// Inspired by Linear, Vercel, Stripe hero backgrounds
// ============================================================================

export interface ParticleNetworkProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ParticleNetwork = React.forwardRef<HTMLDivElement, ParticleNetworkProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pointer-events-none overflow-hidden', className)} {...props}>
        <div className="pn-canvas">
          {/* Shape 1 — Large primary teal sweep, upper-left dominant */}
          <div className="pn-shape pn-a" />
          {/* Shape 2 — Cyan accent, upper-right quadrant */}
          <div className="pn-shape pn-b" />
          {/* Shape 3 — Violet depth touch, center-left */}
          <div className="pn-shape pn-c" />
          {/* Shape 4 — Secondary warm teal, right-center */}
          <div className="pn-shape pn-d" />
          {/* Shape 5 — Blue undertone, lower area */}
          <div className="pn-shape pn-e" />
          {/* Shape 6 — Concentrated teal glow, upper-center focal */}
          <div className="pn-shape pn-f" />
          {/* Shape 7 — Subtle pink accent for color richness */}
          <div className="pn-shape pn-g" />
        </div>

        <style>{`
          .pn-canvas {
            position: absolute;
            inset: 0;
          }
          .dark .pn-canvas {
            filter: brightness(1.4) saturate(1.15);
          }

          .pn-shape {
            position: absolute;
            border-radius: 50%;
          }

          /* ── Shape definitions ────────────────────────────── */

          .pn-a {
            width: 55%; height: 60%;
            top: -12%; left: -6%;
            background: radial-gradient(
              ellipse 80% 70% at 35% 45%,
              rgba(20,184,154,0.20) 0%,
              rgba(20,184,154,0.06) 50%,
              transparent 80%
            );
            filter: blur(60px);
            transform: rotate(-12deg);
            animation: pn-a 28s ease-in-out infinite;
          }

          .pn-b {
            width: 38%; height: 48%;
            top: -4%; right: 6%;
            background: radial-gradient(
              ellipse 70% 80% at 55% 40%,
              rgba(6,182,212,0.14) 0%,
              rgba(6,182,212,0.03) 55%,
              transparent 80%
            );
            filter: blur(50px);
            transform: rotate(8deg);
            animation: pn-b 33s ease-in-out infinite;
          }

          .pn-c {
            width: 28%; height: 32%;
            top: 32%; left: 10%;
            background: radial-gradient(
              ellipse at 50% 50%,
              rgba(139,92,246,0.08) 0%,
              rgba(139,92,246,0.02) 55%,
              transparent 75%
            );
            filter: blur(65px);
            transform: rotate(22deg);
            animation: pn-c 25s ease-in-out infinite;
          }

          .pn-d {
            width: 42%; height: 38%;
            top: 28%; right: -2%;
            background: radial-gradient(
              ellipse 85% 60% at 60% 50%,
              rgba(45,209,177,0.12) 0%,
              rgba(20,184,154,0.03) 50%,
              transparent 80%
            );
            filter: blur(55px);
            transform: rotate(-5deg);
            animation: pn-d 36s ease-in-out infinite;
          }

          .pn-e {
            width: 32%; height: 28%;
            bottom: 8%; left: 22%;
            background: radial-gradient(
              ellipse at 45% 55%,
              rgba(59,130,246,0.07) 0%,
              rgba(59,130,246,0.01) 50%,
              transparent 70%
            );
            filter: blur(60px);
            transform: rotate(-18deg);
            animation: pn-e 31s ease-in-out infinite;
          }

          .pn-f {
            width: 20%; height: 24%;
            top: 16%; left: 40%;
            background: radial-gradient(
              circle at 50% 50%,
              rgba(20,184,154,0.16) 0%,
              rgba(20,184,154,0.03) 45%,
              transparent 70%
            );
            filter: blur(40px);
            animation: pn-f 22s ease-in-out infinite;
          }

          .pn-g {
            width: 25%; height: 20%;
            bottom: 15%; right: 10%;
            background: radial-gradient(
              ellipse at 50% 50%,
              rgba(244,114,182,0.05) 0%,
              rgba(244,114,182,0.01) 50%,
              transparent 70%
            );
            filter: blur(55px);
            transform: rotate(15deg);
            animation: pn-g 27s ease-in-out infinite;
          }

          /* ── Drift animations — slow, desynchronized, ambient ── */

          @keyframes pn-a {
            0%, 100% { transform: rotate(-12deg) translate(0, 0); }
            33%      { transform: rotate(-10deg) translate(20px, 12px); }
            66%      { transform: rotate(-14deg) translate(-12px, -8px); }
          }
          @keyframes pn-b {
            0%, 100% { transform: rotate(8deg) translate(0, 0) scale(1); }
            40%      { transform: rotate(6deg) translate(-15px, 10px) scale(1.03); }
            75%      { transform: rotate(10deg) translate(10px, -6px) scale(0.97); }
          }
          @keyframes pn-c {
            0%, 100% { transform: rotate(22deg) translate(0, 0); }
            50%      { transform: rotate(25deg) translate(12px, -15px); }
          }
          @keyframes pn-d {
            0%, 100% { transform: rotate(-5deg) translate(0, 0); }
            35%      { transform: rotate(-3deg) translate(-10px, 14px); }
            70%      { transform: rotate(-7deg) translate(8px, -10px); }
          }
          @keyframes pn-e {
            0%, 100% { transform: rotate(-18deg) translate(0, 0) scale(1); }
            45%      { transform: rotate(-15deg) translate(15px, -10px) scale(1.04); }
          }
          @keyframes pn-f {
            0%, 100% { transform: translate(0, 0); }
            30%      { transform: translate(-10px, 15px); }
            65%      { transform: translate(12px, -8px); }
          }
          @keyframes pn-g {
            0%, 100% { transform: rotate(15deg) translate(0, 0); }
            40%      { transform: rotate(12deg) translate(-8px, -12px); }
            80%      { transform: rotate(18deg) translate(6px, 8px); }
          }

          /* Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .pn-shape { animation: none !important; }
          }
        `}</style>
      </div>
    )
  },
)

ParticleNetwork.displayName = 'ParticleNetwork'
