'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// ILLUSTRATIONS - Premium SVG illustrations for utility pages
// ============================================================================

interface IllustrationProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  animated?: boolean
}

// ============================================================================
// 404 ILLUSTRATION - Astronaut Lost in Space
// ============================================================================

export const Illustration404: React.FC<IllustrationProps> = ({
  className,
  animated = true,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full max-w-md', className)}
      {...props}
    >
      {/* Stars Background */}
      <g className={animated ? 'animate-pulse' : ''}>
        <circle cx="50" cy="30" r="2" className="fill-primary-300 dark:fill-primary-400" />
        <circle cx="350" cy="50" r="1.5" className="fill-primary-400 dark:fill-primary-300" />
        <circle cx="100" cy="80" r="1" className="fill-secondary-400" />
        <circle cx="300" cy="100" r="2" className="fill-accent-400" />
        <circle cx="380" cy="200" r="1.5" className="fill-primary-300" />
        <circle cx="20" cy="150" r="1" className="fill-secondary-300" />
        <circle cx="200" cy="20" r="1.5" className="fill-accent-300" />
        <circle cx="280" cy="250" r="1" className="fill-primary-400" />
      </g>

      {/* Planet */}
      <g className={animated ? 'floating-slow' : ''}>
        <ellipse cx="320" cy="220" rx="60" ry="20" className="fill-primary-200/50 dark:fill-primary-800/50" />
        <circle cx="320" cy="200" r="45" className="fill-gradient-primary" />
        <circle cx="320" cy="200" r="45" className="fill-primary-400 dark:fill-primary-600" />
        <ellipse cx="335" cy="190" rx="12" ry="8" className="fill-primary-300 dark:fill-primary-500 opacity-60" />
        <ellipse cx="305" cy="210" rx="8" ry="5" className="fill-primary-500 dark:fill-primary-700 opacity-40" />
      </g>

      {/* 404 Text */}
      <g className={animated ? 'floating' : ''}>
        <text
          x="200"
          y="170"
          textAnchor="middle"
          className="fill-primary-500 dark:fill-primary-400 text-[80px] font-bold"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          404
        </text>
      </g>

      {/* Astronaut */}
      <g className={animated ? 'floating' : ''} style={{ animationDelay: '0.5s' }}>
        {/* Body */}
        <ellipse cx="100" cy="150" rx="30" ry="40" className="fill-secondary-100 dark:fill-secondary-700" />
        {/* Helmet */}
        <circle cx="100" cy="100" r="28" className="fill-secondary-200 dark:fill-secondary-600" />
        <circle cx="100" cy="100" r="22" className="fill-primary-100 dark:fill-primary-900" />
        <ellipse cx="105" cy="95" rx="8" ry="5" className="fill-primary-200/60 dark:fill-primary-700/60" />
        {/* Visor reflection */}
        <path d="M85 90 Q95 85 105 92" className="stroke-white/40 dark:stroke-white/20 fill-none" strokeWidth="2" />
        {/* Arms */}
        <ellipse cx="60" cy="140" rx="15" ry="8" className="fill-secondary-100 dark:fill-secondary-700" transform="rotate(-30 60 140)" />
        <ellipse cx="140" cy="130" rx="15" ry="8" className="fill-secondary-100 dark:fill-secondary-700" transform="rotate(20 140 130)" />
        {/* Legs */}
        <ellipse cx="85" cy="195" rx="10" ry="18" className="fill-secondary-100 dark:fill-secondary-700" transform="rotate(-10 85 195)" />
        <ellipse cx="115" cy="195" rx="10" ry="18" className="fill-secondary-100 dark:fill-secondary-700" transform="rotate(10 115 195)" />
        {/* Backpack */}
        <rect x="115" y="120" width="25" height="50" rx="5" className="fill-secondary-300 dark:fill-secondary-500" />
        {/* Question mark */}
        <text x="60" y="80" className="fill-accent-400 text-2xl font-bold" style={{ fontFamily: 'system-ui' }}>?</text>
      </g>

      {/* Floating debris */}
      <g className={animated ? 'floating-reverse' : ''}>
        <rect x="250" cy="80" width="8" height="8" rx="1" className="fill-secondary-300 dark:fill-secondary-600" transform="rotate(45 254 84)" />
        <circle cx="180" cy="250" r="4" className="fill-secondary-400 dark:fill-secondary-500" />
        <rect x="60" cy="220" width="6" height="6" rx="1" className="fill-primary-300 dark:fill-primary-600" transform="rotate(30 63 223)" />
      </g>

      {/* Style for animations */}
      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floating-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes floating-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .floating { animation: floating 4s ease-in-out infinite; }
        .floating-slow { animation: floating-slow 6s ease-in-out infinite; }
        .floating-reverse { animation: floating-reverse 5s ease-in-out infinite; }
      `}</style>
    </svg>
  )
}

// ============================================================================
// 500 ILLUSTRATION - Server Error / Broken Gears
// ============================================================================

export const Illustration500: React.FC<IllustrationProps> = ({
  className,
  animated = true,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full max-w-md', className)}
      {...props}
    >
      {/* Background Circuit Pattern */}
      <g className="opacity-20 dark:opacity-10">
        <path d="M0 50 H100 V100 H150" className="stroke-secondary-400" strokeWidth="1" fill="none" />
        <path d="M400 80 H320 V150" className="stroke-secondary-400" strokeWidth="1" fill="none" />
        <path d="M50 300 V250 H120" className="stroke-secondary-400" strokeWidth="1" fill="none" />
        <circle cx="100" cy="50" r="3" className="fill-secondary-400" />
        <circle cx="150" cy="100" r="3" className="fill-secondary-400" />
        <circle cx="320" cy="150" r="3" className="fill-secondary-400" />
      </g>

      {/* Main Gear 1 */}
      <g className={animated ? 'spin-slow' : ''} style={{ transformOrigin: '200px 150px' }}>
        <path
          d="M200 100 L210 105 L215 95 L225 100 L220 110 L230 115 L235 105 L245 115 L235 125 L240 135 L250 130 L250 145 L240 145 L245 155 L255 155 L250 170 L240 165 L235 175 L245 185 L235 190 L225 180 L220 190 L210 185 L215 175 L200 175 L200 185 L190 180 L185 190 L175 185 L180 175 L165 175 L160 185 L150 180 L155 170 L145 165 L140 175 L130 170 L135 155 L145 155 L140 145 L130 145 L130 130 L145 135 L145 125 L135 115 L145 105 L155 115 L160 105 L170 110 L165 100 L175 95 L180 105 L190 100 L195 110 Z"
          className="fill-orange-400 dark:fill-orange-500"
        />
        <circle cx="200" cy="150" r="25" className="fill-orange-500 dark:fill-orange-600" />
        <circle cx="200" cy="150" r="15" className="fill-orange-300 dark:fill-orange-400" />
        {/* Crack */}
        <path
          d="M195 135 L200 145 L193 155 L200 165"
          className="stroke-orange-700 dark:stroke-orange-800"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Gear 2 (Smaller, offset) */}
      <g className={animated ? 'spin-reverse' : ''} style={{ transformOrigin: '280px 190px' }}>
        <path
          d="M280 165 L286 168 L288 162 L295 166 L292 173 L299 176 L301 170 L308 176 L301 183 L304 190 L312 188 L312 198 L304 198 L307 205 L314 205 L311 215 L303 212 L300 219 L307 226 L299 230 L292 222 L288 229 L281 225 L284 218 L275 218 L272 225 L265 221 L268 213 L261 210 L258 217 L250 213 L253 203 L260 203 L257 195 L248 195 L248 185 L258 188 L258 180 L250 173 L258 167 L265 174 L269 167 L276 171 L273 165 L280 162 Z"
          className="fill-secondary-400 dark:fill-secondary-500"
        />
        <circle cx="280" cy="190" r="15" className="fill-secondary-500 dark:fill-secondary-600" />
        <circle cx="280" cy="190" r="8" className="fill-secondary-300 dark:fill-secondary-400" />
      </g>

      {/* Gear 3 (Smaller, top) */}
      <g className={animated ? 'spin-slow' : ''} style={{ transformOrigin: '130px 100px', animationDelay: '0.3s' }}>
        <circle cx="130" cy="100" r="20" className="fill-primary-400 dark:fill-primary-500" />
        <circle cx="130" cy="100" r="12" className="fill-primary-500 dark:fill-primary-600" />
        <circle cx="130" cy="100" r="6" className="fill-primary-300 dark:fill-primary-400" />
        {/* Teeth */}
        <rect x="127" y="75" width="6" height="10" className="fill-primary-400 dark:fill-primary-500" />
        <rect x="127" y="115" width="6" height="10" className="fill-primary-400 dark:fill-primary-500" />
        <rect x="105" y="97" width="10" height="6" className="fill-primary-400 dark:fill-primary-500" />
        <rect x="145" y="97" width="10" height="6" className="fill-primary-400 dark:fill-primary-500" />
      </g>

      {/* Server Box */}
      <g className={animated ? 'pulse-subtle' : ''}>
        <rect x="50" y="180" width="80" height="100" rx="8" className="fill-secondary-200 dark:fill-secondary-700" />
        <rect x="58" y="190" width="64" height="8" rx="2" className="fill-secondary-400 dark:fill-secondary-500" />
        <rect x="58" y="205" width="64" height="8" rx="2" className="fill-secondary-400 dark:fill-secondary-500" />
        <rect x="58" y="220" width="64" height="8" rx="2" className="fill-secondary-400 dark:fill-secondary-500" />
        {/* Status lights */}
        <circle cx="70" cy="255" r="4" className={animated ? 'fill-red-500 animate-pulse' : 'fill-red-500'} />
        <circle cx="85" cy="255" r="4" className="fill-red-400 opacity-50" />
        <circle cx="100" cy="255" r="4" className="fill-secondary-400" />
      </g>

      {/* 500 Text */}
      <text
        x="200"
        y="270"
        textAnchor="middle"
        className="fill-orange-500 dark:fill-orange-400 text-4xl font-bold"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        500
      </text>

      {/* Sparks */}
      <g className={animated ? 'animate-pulse' : ''}>
        <path d="M220 120 L230 115 L225 125 L235 120" className="stroke-accent-400 fill-none" strokeWidth="2" />
        <path d="M165 130 L155 125 L160 135 L150 130" className="stroke-accent-400 fill-none" strokeWidth="2" />
        <circle cx="240" cy="130" r="3" className="fill-accent-300" />
        <circle cx="155" cy="140" r="2" className="fill-accent-400" />
      </g>

      {/* Smoke */}
      <g className={animated ? 'floating-slow opacity-60' : 'opacity-60'}>
        <ellipse cx="90" cy="165" rx="15" ry="8" className="fill-secondary-300 dark:fill-secondary-500" />
        <ellipse cx="100" cy="155" rx="10" ry="6" className="fill-secondary-200 dark:fill-secondary-400" />
        <ellipse cx="85" cy="150" rx="8" ry="5" className="fill-secondary-200 dark:fill-secondary-400" />
      </g>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        @keyframes floating-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .spin-slow { animation: spin-slow 8s linear infinite; }
        .spin-reverse { animation: spin-reverse 6s linear infinite; }
        .pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .floating-slow { animation: floating-slow 4s ease-in-out infinite; }
      `}</style>
    </svg>
  )
}

// ============================================================================
// COMING SOON ILLUSTRATION - Rocket Launch
// ============================================================================

export const IllustrationRocket: React.FC<IllustrationProps> = ({
  className,
  animated = true,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full max-w-md', className)}
      {...props}
    >
      {/* Stars */}
      <g className={animated ? 'twinkle' : ''}>
        <circle cx="50" cy="40" r="2" className="fill-white dark:fill-primary-300" />
        <circle cx="350" cy="60" r="2.5" className="fill-white dark:fill-accent-300" />
        <circle cx="100" cy="250" r="1.5" className="fill-white dark:fill-primary-400" />
        <circle cx="320" cy="200" r="2" className="fill-white dark:fill-primary-300" />
        <circle cx="380" cy="120" r="1.5" className="fill-white dark:fill-accent-400" />
        <circle cx="30" cy="180" r="2" className="fill-white dark:fill-primary-400" />
        <circle cx="250" cy="30" r="1.5" className="fill-white dark:fill-accent-300" />
      </g>

      {/* Rocket */}
      <g className={animated ? 'rocket-float' : ''}>
        {/* Rocket Body */}
        <path
          d="M200 60 C200 60 180 100 180 150 L180 200 L220 200 L220 150 C220 100 200 60 200 60"
          className="fill-secondary-100 dark:fill-secondary-200"
        />
        {/* Rocket Nose */}
        <path
          d="M200 40 C200 40 185 60 185 80 L215 80 C215 60 200 40 200 40"
          className="fill-primary-500 dark:fill-primary-400"
        />
        {/* Window */}
        <circle cx="200" cy="120" r="18" className="fill-primary-400 dark:fill-primary-500" />
        <circle cx="200" cy="120" r="14" className="fill-primary-100 dark:fill-primary-900" />
        <ellipse cx="195" cy="115" rx="4" ry="3" className="fill-white/50 dark:fill-white/30" />
        {/* Fins */}
        <path
          d="M180 180 L155 220 L180 210 Z"
          className="fill-primary-500 dark:fill-primary-400"
        />
        <path
          d="M220 180 L245 220 L220 210 Z"
          className="fill-primary-500 dark:fill-primary-400"
        />
        {/* Stripe */}
        <rect x="185" y="150" width="30" height="8" className="fill-accent-400 dark:fill-accent-500" />
      </g>

      {/* Rocket Flames */}
      <g className={animated ? 'flame-flicker' : ''}>
        <ellipse cx="200" cy="230" rx="15" ry="25" className="fill-orange-500" />
        <ellipse cx="200" cy="240" rx="10" ry="20" className="fill-accent-400" />
        <ellipse cx="200" cy="245" rx="6" ry="15" className="fill-accent-300" />
      </g>

      {/* Smoke Trail */}
      <g className={animated ? 'smoke-rise' : ''}>
        <ellipse cx="200" cy="265" rx="20" ry="10" className="fill-secondary-300/60 dark:fill-secondary-500/60" />
        <ellipse cx="190" cy="280" rx="15" ry="8" className="fill-secondary-200/50 dark:fill-secondary-400/50" />
        <ellipse cx="215" cy="285" rx="12" ry="6" className="fill-secondary-200/40 dark:fill-secondary-400/40" />
      </g>

      {/* Clouds */}
      <g className="opacity-80">
        <ellipse cx="80" cy="280" rx="50" ry="20" className="fill-secondary-100 dark:fill-secondary-700" />
        <ellipse cx="320" cy="275" rx="60" ry="25" className="fill-secondary-100 dark:fill-secondary-700" />
        <ellipse cx="180" cy="290" rx="40" ry="15" className="fill-secondary-50 dark:fill-secondary-600" />
      </g>

      {/* Speed Lines */}
      <g className={animated ? 'speed-lines' : 'opacity-40'}>
        <line x1="160" y1="100" x2="120" y2="100" className="stroke-primary-300 dark:stroke-primary-500" strokeWidth="2" strokeLinecap="round" />
        <line x1="155" y1="130" x2="100" y2="130" className="stroke-primary-300 dark:stroke-primary-500" strokeWidth="2" strokeLinecap="round" />
        <line x1="240" y1="110" x2="280" y2="110" className="stroke-primary-300 dark:stroke-primary-500" strokeWidth="2" strokeLinecap="round" />
        <line x1="245" y1="140" x2="300" y2="140" className="stroke-primary-300 dark:stroke-primary-500" strokeWidth="2" strokeLinecap="round" />
      </g>

      <style>{`
        @keyframes rocket-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.9); opacity: 0.8; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(20px) scale(1.5); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes speed-lines {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .rocket-float { animation: rocket-float 3s ease-in-out infinite; }
        .flame-flicker { animation: flame-flicker 0.3s ease-in-out infinite; transform-origin: center top; }
        .smoke-rise { animation: smoke-rise 2s ease-out infinite; }
        .twinkle { animation: twinkle 2s ease-in-out infinite; }
        .speed-lines { animation: speed-lines 1s ease-in-out infinite; }
      `}</style>
    </svg>
  )
}

// ============================================================================
// MAINTENANCE ILLUSTRATION - Tools & Construction
// ============================================================================

export const IllustrationMaintenance: React.FC<IllustrationProps> = ({
  className,
  animated = true,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full max-w-md', className)}
      {...props}
    >
      {/* Progress Bar Background */}
      <rect x="50" y="250" width="300" height="20" rx="10" className="fill-secondary-200 dark:fill-secondary-700" />
      <rect x="50" y="250" width="200" height="20" rx="10" className={animated ? 'fill-primary-500 progress-animate' : 'fill-primary-500'} />

      {/* Main Gear (Center) */}
      <g className={animated ? 'gear-spin' : ''} style={{ transformOrigin: '200px 130px' }}>
        <circle cx="200" cy="130" r="50" className="fill-secondary-300 dark:fill-secondary-600" />
        <circle cx="200" cy="130" r="38" className="fill-secondary-400 dark:fill-secondary-500" />
        <circle cx="200" cy="130" r="15" className="fill-secondary-200 dark:fill-secondary-700" />
        {/* Gear Teeth */}
        <rect x="195" y="70" width="10" height="20" className="fill-secondary-300 dark:fill-secondary-600" />
        <rect x="195" y="170" width="10" height="20" className="fill-secondary-300 dark:fill-secondary-600" />
        <rect x="140" y="125" width="20" height="10" className="fill-secondary-300 dark:fill-secondary-600" />
        <rect x="240" y="125" width="20" height="10" className="fill-secondary-300 dark:fill-secondary-600" />
        {/* Diagonal Teeth */}
        <rect x="155" y="85" width="10" height="18" className="fill-secondary-300 dark:fill-secondary-600" transform="rotate(-45 160 94)" />
        <rect x="235" y="85" width="10" height="18" className="fill-secondary-300 dark:fill-secondary-600" transform="rotate(45 240 94)" />
        <rect x="155" y="160" width="10" height="18" className="fill-secondary-300 dark:fill-secondary-600" transform="rotate(45 160 169)" />
        <rect x="235" y="160" width="10" height="18" className="fill-secondary-300 dark:fill-secondary-600" transform="rotate(-45 240 169)" />
      </g>

      {/* Wrench */}
      <g className={animated ? 'tool-wobble' : ''} style={{ transformOrigin: '100px 150px' }}>
        {/* Handle */}
        <rect x="60" y="140" width="80" height="20" rx="4" className="fill-primary-500 dark:fill-primary-400" />
        {/* Head */}
        <path
          d="M50 135 L40 145 L40 155 L50 165 L65 165 L65 135 Z"
          className="fill-secondary-500 dark:fill-secondary-400"
        />
        <path
          d="M52 142 L45 150 L52 158"
          className="stroke-secondary-700 dark:stroke-secondary-600"
          strokeWidth="3"
          fill="none"
        />
      </g>

      {/* Screwdriver */}
      <g className={animated ? 'tool-wobble-delay' : ''} style={{ transformOrigin: '300px 100px' }}>
        {/* Handle */}
        <rect x="290" y="70" width="20" height="50" rx="4" className="fill-accent-500 dark:fill-accent-400" />
        <rect x="294" y="75" width="4" height="40" rx="2" className="fill-accent-600 dark:fill-accent-500" />
        {/* Shaft */}
        <rect x="297" y="120" width="6" height="60" className="fill-secondary-400 dark:fill-secondary-500" />
        {/* Tip */}
        <path d="M297 180 L303 180 L300 195 Z" className="fill-secondary-500 dark:fill-secondary-400" />
      </g>

      {/* Small Gears */}
      <g className={animated ? 'gear-spin-reverse' : ''} style={{ transformOrigin: '320px 200px' }}>
        <circle cx="320" cy="200" r="20" className="fill-primary-400 dark:fill-primary-500" />
        <circle cx="320" cy="200" r="12" className="fill-primary-500 dark:fill-primary-600" />
        <circle cx="320" cy="200" r="5" className="fill-primary-300 dark:fill-primary-400" />
      </g>

      <g className={animated ? 'gear-spin' : ''} style={{ transformOrigin: '80px 90px', animationDelay: '0.2s' }}>
        <circle cx="80" cy="90" r="25" className="fill-primary-300 dark:fill-primary-400" />
        <circle cx="80" cy="90" r="16" className="fill-primary-400 dark:fill-primary-500" />
        <circle cx="80" cy="90" r="7" className="fill-primary-200 dark:fill-primary-300" />
      </g>

      {/* Bolts/Nuts */}
      <g className={animated ? 'animate-pulse' : ''}>
        <circle cx="150" cy="220" r="8" className="fill-secondary-400 dark:fill-secondary-500" />
        <circle cx="150" cy="220" r="4" className="fill-secondary-300 dark:fill-secondary-600" />
        <circle cx="260" cy="210" r="6" className="fill-secondary-400 dark:fill-secondary-500" />
        <circle cx="260" cy="210" r="3" className="fill-secondary-300 dark:fill-secondary-600" />
      </g>

      {/* Text */}
      <text
        x="200"
        y="45"
        textAnchor="middle"
        className="fill-secondary-500 dark:fill-secondary-400 text-sm font-medium"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        Under Construction
      </text>

      <style>{`
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gear-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes tool-wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes progress-animate {
          0% { width: 50px; }
          50% { width: 220px; }
          100% { width: 200px; }
        }
        .gear-spin { animation: gear-spin 6s linear infinite; }
        .gear-spin-reverse { animation: gear-spin-reverse 4s linear infinite; }
        .tool-wobble { animation: tool-wobble 2s ease-in-out infinite; }
        .tool-wobble-delay { animation: tool-wobble 2s ease-in-out 0.5s infinite; }
        .progress-animate { animation: progress-animate 3s ease-in-out infinite; }
      `}</style>
    </svg>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export { type IllustrationProps }
