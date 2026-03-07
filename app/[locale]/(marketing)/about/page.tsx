'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Sparkles,
  Puzzle,
  BarChart3,
  Moon,
  Languages,
  Smartphone,
  Rocket,
  Calendar,
  FileText,
  Mail,
  Users,
  TrendingUp,
  Activity,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Zap,
  Globe,
} from 'lucide-react'

// ============================================================================
// REAL TECHNOLOGY LOGOS (inline SVG components)
// ============================================================================

const ReactLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/>
  </svg>
)

const NextJSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.572 0c-.176.001-.215.227-.007.306l9.535 7.18c.148.113.014.344-.18.276L11.572 0zm-1.68.436c-5.156.57-9.262 4.82-9.787 10.004-.538 5.305 2.768 10.083 7.724 11.567l7.076-10.19-.001-.001L8.91 2.403c-.109-.095-.002-.303.128-.245l6.56 2.943-5.705 8.262v.001l5.97 8.61c4.87-1.7 8.137-6.47 7.587-11.777C22.911 5.028 17.766.846 12.262.09c-.228-.03-.255-.1-.37.346z"/>
  </svg>
)

const TypeScriptLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <path d="M5.5 12.5h3v7.5h2v-7.5h3v-1.7H5.5v1.7z" fill="white"/>
    <path d="M15.5 19.8c.4.2.9.3 1.4.4.5.1 1 .1 1.5.1.5 0 1 0 1.4-.1.5-.1.9-.3 1.2-.5.4-.2.6-.5.8-.9.2-.4.3-.8.3-1.3 0-.4-.1-.7-.2-1-.1-.3-.3-.5-.6-.7-.2-.2-.5-.4-.8-.5-.3-.1-.7-.3-1.1-.4-.3-.1-.5-.2-.7-.3-.2-.1-.3-.2-.5-.3-.1-.1-.2-.2-.3-.3 0-.1-.1-.2-.1-.4 0-.1 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.3-.1.5-.2h.7c.2 0 .4 0 .6.1.2.1.4.1.6.2.2.1.4.2.5.3v-1.7c-.3-.1-.7-.2-1.1-.3-.4-.1-.9-.1-1.3-.1-.5 0-.9.1-1.4.2-.4.1-.8.3-1.1.5-.3.2-.6.5-.8.9-.2.3-.3.8-.3 1.3 0 .6.2 1.2.5 1.6.4.4.9.8 1.7 1.1.3.1.5.2.8.3.2.1.4.2.5.3.2.1.3.2.3.3.1.1.1.3.1.4 0 .1 0 .3-.1.4-.1.1-.2.2-.3.3-.1.1-.3.1-.5.2-.2 0-.4.1-.7.1-.4 0-.8-.1-1.2-.2-.4-.2-.8-.4-1.1-.7v1.8z" fill="white"/>
  </svg>
)

const TailwindLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 16.79 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.67 13.21 9.56 12 7 12z" fill="#06B6D4"/>
  </svg>
)

const CVALogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#A855F7"/>
    <path d="M7 8.5h3v7H7v-7zm4 0h3v7h-3v-7zm4 0h3v7h-3v-7z" fill="white" opacity="0.9"/>
    <path d="M7 8.5h10v2H7v-2z" fill="white"/>
  </svg>
)

const NextIntlLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="1.5" fill="none"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#10B981" strokeWidth="1.5" fill="none"/>
    <line x1="2" y1="9" x2="22" y2="9" stroke="#10B981" strokeWidth="1"/>
    <line x1="2" y1="15" x2="22" y2="15" stroke="#10B981" strokeWidth="1"/>
    <line x1="12" y1="2" x2="12" y2="22" stroke="#10B981" strokeWidth="1"/>
  </svg>
)

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

// ============================================================================
// SCROLL REVEAL HOOK
// ============================================================================

function useScrollReveal(threshold = 0.1) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    const children = el.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
    children.forEach((child) => observer.observe(child))
    if (el.classList.contains('scroll-reveal') || el.classList.contains('scroll-reveal-left') || el.classList.contains('scroll-reveal-right') || el.classList.contains('scroll-reveal-scale')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

function RevealSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

// ============================================================================
// ANIMATED COUNTER HOOK
// ============================================================================

function useCountUp(target: number, duration = 2000, startOnMount = false) {
  const [count, setCount] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false)

  const start = React.useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, hasStarted])

  React.useEffect(() => {
    if (startOnMount) start()
  }, [startOnMount, start])

  return { count, start }
}

// ============================================================================
// FLOATING PARTICLES (Premium Background)
// ============================================================================

const particleData = [
  { size: 3, x: '8%', y: '15%', delay: '0s', dur: '7s', opacity: 0.3 },
  { size: 2, x: '15%', y: '45%', delay: '1s', dur: '9s', opacity: 0.2 },
  { size: 4, x: '22%', y: '75%', delay: '2s', dur: '6s', opacity: 0.25 },
  { size: 2, x: '35%', y: '20%', delay: '0.5s', dur: '8s', opacity: 0.15 },
  { size: 3, x: '42%', y: '60%', delay: '3s', dur: '7s', opacity: 0.2 },
  { size: 2, x: '55%', y: '10%', delay: '1.5s', dur: '10s', opacity: 0.25 },
  { size: 5, x: '60%', y: '50%', delay: '0s', dur: '8s', opacity: 0.15 },
  { size: 2, x: '68%', y: '80%', delay: '2.5s', dur: '6s', opacity: 0.2 },
  { size: 3, x: '75%', y: '25%', delay: '1s', dur: '9s', opacity: 0.3 },
  { size: 2, x: '82%', y: '55%', delay: '3.5s', dur: '7s', opacity: 0.2 },
  { size: 4, x: '88%', y: '15%', delay: '0.5s', dur: '8s', opacity: 0.15 },
  { size: 2, x: '92%', y: '70%', delay: '2s', dur: '10s', opacity: 0.25 },
  { size: 3, x: '5%', y: '90%', delay: '1.5s', dur: '6s', opacity: 0.2 },
  { size: 2, x: '48%', y: '35%', delay: '4s', dur: '9s', opacity: 0.15 },
  { size: 3, x: '30%', y: '85%', delay: '0s', dur: '7s', opacity: 0.2 },
  { size: 2, x: '70%', y: '40%', delay: '3s', dur: '8s', opacity: 0.25 },
]

const FloatingParticles = ({ className }: { className?: string }) => (
  <div className={cn('absolute inset-0 overflow-hidden pointer-events-none -z-5', className)}>
    {particleData.map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-primary-500 animate-float"
        style={{
          width: p.size,
          height: p.size,
          left: p.x,
          top: p.y,
          opacity: p.opacity,
          animationDelay: p.delay,
          animationDuration: p.dur,
        }}
      />
    ))}
    {/* Larger glowing particles */}
    <div className="absolute w-1.5 h-1.5 rounded-full bg-primary-400 animate-float-slow" style={{ left: '18%', top: '30%', opacity: 0.4, boxShadow: '0 0 8px rgba(20, 184, 154, 0.4)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-float-delayed" style={{ left: '78%', top: '65%', opacity: 0.35, boxShadow: '0 0 8px rgba(52, 211, 153, 0.4)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-primary-400 animate-float" style={{ left: '50%', top: '85%', opacity: 0.3, boxShadow: '0 0 8px rgba(20, 184, 154, 0.3)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-accent-400 animate-float-slow" style={{ left: '38%', top: '12%', opacity: 0.25, boxShadow: '0 0 8px rgba(251, 191, 36, 0.3)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 animate-float-delayed" style={{ left: '85%', top: '35%', opacity: 0.3, boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)' }} />
  </div>
)

// ============================================================================
// DASHBOARD MOCKUP ILLUSTRATION
// ============================================================================

const DashboardMockup = () => (
  <div className="relative rounded-2xl border border-slate-200/40 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-primary-500/15 dark:shadow-primary-500/10 overflow-hidden">
    {/* Outer glow ring */}
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary-400/30 via-transparent to-emerald-400/20 pointer-events-none" />

    {/* Window chrome */}
    <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-slate-100/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-rose-400/80 shadow-sm shadow-rose-400/30" />
        <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm shadow-amber-400/30" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm shadow-emerald-400/30" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/30">
          <LayoutDashboard className="h-3 w-3 text-primary-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pulse Dashboard</span>
        </div>
      </div>
      <div className="w-16" />
    </div>

    <div className="relative flex">
      {/* Mini Sidebar */}
      <div className="hidden sm:flex w-12 md:w-14 border-r border-slate-100/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 flex-col items-center py-4 gap-3">
        {/* Logo */}
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-2 shadow-lg shadow-primary-500/30">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        {/* Nav items */}
        {[LayoutDashboard, BarChart3, Users, MessageSquare, Calendar, Settings].map((Icon, i) => (
          <div
            key={i}
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              i === 0
                ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-500 ring-1 ring-primary-200/50 dark:ring-primary-500/20'
                : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-5 min-w-0">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-2 w-24 md:w-32 rounded-full bg-slate-200 dark:bg-slate-700 mb-1.5" />
            <div className="h-1.5 w-16 md:w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 ring-2 ring-primary-200/50 dark:ring-primary-500/20" />
          </div>
        </div>

        {/* 4 Stat cards */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
          {[
            { value: '2.4K', color: 'from-primary-400 to-primary-600', glowColor: 'shadow-primary-500/10', icon: Users },
            { value: '$12K', color: 'from-emerald-400 to-emerald-600', glowColor: 'shadow-emerald-500/10', icon: TrendingUp },
            { value: '96', color: 'from-blue-400 to-blue-600', glowColor: 'shadow-blue-500/10', icon: Puzzle },
            { value: '99%', color: 'from-amber-400 to-amber-600', glowColor: 'shadow-amber-500/10', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className={cn('rounded-xl border border-slate-100/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 p-2 md:p-3 shadow-sm', stat.glowColor)}>
              <div className={cn('w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gradient-to-br flex items-center justify-center mb-1.5 md:mb-2 shadow-md', stat.color)}>
                <stat.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-none">{stat.value}</div>
              <div className="h-1 w-8 rounded-full bg-slate-100 dark:bg-slate-800 mt-1" />
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {/* Bar chart */}
          <div className="col-span-3 rounded-xl border border-slate-100/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 p-2 md:p-3">
            <div className="h-1.5 w-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-2 md:mb-3" />
            <div className="flex items-end gap-1 md:gap-1.5 h-14 md:h-20">
              {[40, 65, 85, 55, 70, 95, 60, 75, 50, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-primary-600 to-primary-400"
                  style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                />
              ))}
            </div>
          </div>

          {/* Donut chart */}
          <div className="col-span-2 rounded-xl border border-slate-100/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 p-2 md:p-3 flex flex-col items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-12 h-12 md:w-16 md:h-16 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-primary-500" strokeWidth="3" strokeDasharray="62 26" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-emerald-500" strokeWidth="3" strokeDasharray="0 62 18 8" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-amber-500" strokeWidth="3" strokeDasharray="0 80 8 0" strokeLinecap="round" />
            </svg>
            <div className="flex items-center gap-1 mt-2">
              {['bg-primary-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
                <div key={i} className="flex items-center gap-0.5">
                  <div className={cn('w-1.5 h-1.5 rounded-full', c)} />
                  <div className="h-1 w-4 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom status */}
    <div className="relative flex items-center justify-between px-4 py-1.5 border-t border-slate-100/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-800/50 text-[10px] text-slate-400 font-mono">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-primary-500">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse shadow-sm shadow-primary-500/50" /> Live
        </span>
        <span>16 dashboards</span>
      </div>
      <span>Pulse v2.0</span>
    </div>
  </div>
)

// ============================================================================
// SECTION 1 - PREMIUM HERO
// ============================================================================

const HeroSection = () => {
  const t = useTranslations('about')

  const floatingBadges = [
    { icon: ReactLogo, label: 'React 19', color: '', pos: '-top-4 -left-4 md:-top-6 md:-left-10', delay: '0s' },
    { icon: NextJSLogo, label: 'Next.js 16', color: 'text-slate-700 dark:text-slate-300', pos: '-top-4 -right-4 md:-top-6 md:-right-10', delay: '1s' },
    { icon: TypeScriptLogo, label: 'TypeScript', color: '', pos: 'top-1/4 -left-6 md:-left-16', delay: '0.5s' },
    { icon: TailwindLogo, label: 'Tailwind v4', color: '', pos: 'top-1/4 -right-6 md:-right-16', delay: '1.5s' },
    { icon: Moon, label: 'Dark Mode', color: 'text-violet-500', pos: 'bottom-12 -left-4 md:-left-12', delay: '2s' },
    { icon: NextIntlLogo, label: 'i18n', color: '', pos: 'bottom-12 -right-4 md:-right-12', delay: '0.8s' },
  ]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-x-clip">
      {/* Background Image */}
      <div
        className="absolute -inset-x-16 inset-y-0 z-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40"
        style={{ backgroundImage: 'url(/fundo-blackground.png)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />

      {/* ECG — Desktop */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs><filter id="ab-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-ecg-glow" filter="url(#ab-glow)" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(20, 184, 154)" strokeWidth="4"/>
          <path className="ab-ecg-main" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(94, 234, 212)" strokeWidth="1.2"/>
        </g>
      </svg>
      {/* ECG — Mobile */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs><filter id="ab-glow-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="ab-ecg-glow-m" filter="url(#ab-glow-m)" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(20, 184, 154)" strokeWidth="2"/>
          <path className="ab-ecg-main-m" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(94, 234, 212)" strokeWidth="0.7"/>
        </g>
      </svg>
      <style>{`
        .ab-ecg-main { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: ab-draw 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .ab-ecg-glow { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: ab-glow-a 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .ab-ecg-main-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: ab-draw-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        .ab-ecg-glow-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: ab-glow-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes ab-draw { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 40% { stroke-dashoffset: 2800; opacity: 0.05; } 43% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes ab-glow-a { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 40% { stroke-dashoffset: 2800; opacity: 0.02; } 43% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes ab-draw-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 42% { stroke-dashoffset: 800; opacity: 0.05; } 45% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes ab-glow-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 42% { stroke-dashoffset: 800; opacity: 0.02; } 45% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .ab-ecg-main, .ab-ecg-glow, .ab-ecg-main-m, .ab-ecg-glow-m { animation: none !important; } }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">{t('hero.badge')}</span>
        </div>

        {/* Title with Pulse gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          <span className="text-slate-900 dark:text-white">
            {t('hero.title').split(' ').slice(0, -1).join(' ')}{' '}
          </span>
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 dark:from-primary-400 dark:via-emerald-300 dark:to-cyan-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            {t('hero.title').split(' ').slice(-1)}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* ═══════════════════════════════════════════════════════
            PREMIUM DASHBOARD MOCKUP ILLUSTRATION
            ═══════════════════════════════════════════════════════ */}
        <div className="mt-14 md:mt-20 relative mx-auto max-w-4xl perspective-1200">
          <DashboardMockup />

          {/* ═══ Floating tech badges ═══ */}
          {floatingBadges.map((badge) => (
            <div
              key={badge.label}
              className={cn(
                'absolute z-10 hidden sm:block',
                badge.pos,
              )}
            >
              <div
                className="animate-float px-3 py-2 rounded-xl glass shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30"
                style={{ animationDelay: badge.delay, animationDuration: `${4 + Math.random() * 2}s` }}
              >
                <div className="flex items-center gap-2">
                  <badge.icon className={cn('h-4 w-4', badge.color)} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">{badge.label}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Decorative connection lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(20 184 154 / 0.15)" />
                <stop offset="50%" stopColor="rgb(20 184 154 / 0.05)" />
                <stop offset="100%" stopColor="rgb(20 184 154 / 0.15)" />
              </linearGradient>
            </defs>
            <line x1="15%" y1="8%" x2="5%" y2="0%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="85%" y1="8%" x2="95%" y2="0%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="8%" y1="70%" x2="2%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="92%" y1="70%" x2="98%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - STORY + TIMELINE
// ============================================================================

const OurStorySection = () => {
  const t = useTranslations('about')

  const timelineItems = [
    { yearKey: 'timeline.y2.year' as const, titleKey: 'timeline.y2.title' as const, descKey: 'timeline.y2.description' as const },
    { yearKey: 'timeline.y3.year' as const, titleKey: 'timeline.y3.title' as const, descKey: 'timeline.y3.description' as const },
    { yearKey: 'timeline.y4.year' as const, titleKey: 'timeline.y4.title' as const, descKey: 'timeline.y4.description' as const },
    { yearKey: 'timeline.y5.year' as const, titleKey: 'timeline.y5.title' as const, descKey: 'timeline.y5.description' as const },
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Story text */}
            <div className="scroll-reveal-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </div>

            {/* Right - Timeline */}
            <div className="scroll-reveal-right">
              <div className="relative">
                {timelineItems.map((item, i) => (
                  <div key={i} className={cn('relative pl-8 md:pl-12', i < timelineItems.length - 1 && 'pb-10')}>
                    {i < timelineItems.length - 1 && (
                      <div className="absolute left-[11px] md:left-[19px] top-6 bottom-0 w-px bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-600 dark:to-primary-900" />
                    )}
                    <div className="absolute left-0 md:left-2 top-1 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 shadow-md shadow-primary-500/20" />
                    </div>
                    <div className="group">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 mb-2">
                        {t(item.yearKey)}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 3 - TECH STACK (Premium Cards with Sparklines)
// ============================================================================

const sparklinePaths = [
  'M0,28 L6,24 L12,26 L18,20 L24,22 L30,15 L36,17 L42,10 L48,12 L54,6 L60,8',  // React — upward adoption
  'M0,26 L6,22 L12,24 L18,16 L24,18 L30,12 L36,14 L42,8 L48,10 L54,4 L60,6',   // Next.js — strong growth
  'M0,30 L6,28 L12,25 L18,22 L24,20 L30,16 L36,14 L42,10 L48,8 L54,5 L60,3',   // TypeScript — steady climb
  'M0,24 L6,26 L12,20 L18,22 L24,14 L30,16 L36,10 L42,12 L48,6 L54,8 L60,4',   // Tailwind — rapid growth
  'M0,22 L8,18 L16,20 L24,14 L32,16 L40,10 L48,8 L56,6 L60,4',                 // CVA — emerging trend
  'M0,20 L6,22 L12,16 L18,18 L24,12 L30,14 L36,8 L42,10 L48,6 L54,4 L60,5',   // next-intl — growing
]

const TechSparkline = ({ path, color, gradientId }: { path: string; color: string; gradientId: string }) => (
  <svg viewBox="0 0 60 32" className="w-full h-8" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`${gradientId}-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`${path} L60,32 L0,32 Z`} fill={`url(#${gradientId}-fill)`} />
    <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="60" cy={path.split(' ').pop()?.split(',')[1]} r="2" fill={color} />
  </svg>
)

const TechStackSection = () => {
  const t = useTranslations('about')

  const techs = [
    {
      icon: ReactLogo,
      titleKey: 'tech.react.title' as const,
      descriptionKey: 'tech.react.description' as const,
      version: 'v19',
      sparklineIdx: 0,
      accentColor: '#3B82F6',
      gradient: 'from-blue-500 to-blue-600',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
      dotColor: 'bg-blue-500',
      tagBg: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: NextJSLogo,
      titleKey: 'tech.nextjs.title' as const,
      descriptionKey: 'tech.nextjs.description' as const,
      version: 'v16',
      sparklineIdx: 1,
      accentColor: '#6366F1',
      gradient: 'from-indigo-500 to-indigo-600',
      gradientBorder: 'from-indigo-400/60 via-indigo-500/20 to-indigo-400/60',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      glowColor: 'group-hover:shadow-indigo-500/20 dark:group-hover:shadow-indigo-500/15',
      dotColor: 'bg-indigo-500',
      tagBg: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: TypeScriptLogo,
      titleKey: 'tech.typescript.title' as const,
      descriptionKey: 'tech.typescript.description' as const,
      version: 'v5.7',
      sparklineIdx: 2,
      accentColor: '#2563EB',
      gradient: 'from-blue-600 to-blue-700',
      gradientBorder: 'from-blue-500/60 via-blue-600/20 to-blue-500/60',
      iconBg: 'bg-blue-600/10 dark:bg-blue-600/15',
      glowColor: 'group-hover:shadow-blue-600/20 dark:group-hover:shadow-blue-600/15',
      dotColor: 'bg-blue-600',
      tagBg: 'bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400',
    },
    {
      icon: TailwindLogo,
      titleKey: 'tech.tailwind.title' as const,
      descriptionKey: 'tech.tailwind.description' as const,
      version: 'v4',
      sparklineIdx: 3,
      accentColor: '#06B6D4',
      gradient: 'from-cyan-500 to-cyan-600',
      gradientBorder: 'from-cyan-400/60 via-cyan-500/20 to-cyan-400/60',
      iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      glowColor: 'group-hover:shadow-cyan-500/20 dark:group-hover:shadow-cyan-500/15',
      dotColor: 'bg-cyan-500',
      tagBg: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: CVALogo,
      titleKey: 'tech.cva.title' as const,
      descriptionKey: 'tech.cva.description' as const,
      version: 'v1',
      sparklineIdx: 4,
      accentColor: '#A855F7',
      gradient: 'from-purple-500 to-purple-600',
      gradientBorder: 'from-purple-400/60 via-purple-500/20 to-purple-400/60',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
      glowColor: 'group-hover:shadow-purple-500/20 dark:group-hover:shadow-purple-500/15',
      dotColor: 'bg-purple-500',
      tagBg: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: NextIntlLogo,
      titleKey: 'tech.intl.title' as const,
      descriptionKey: 'tech.intl.description' as const,
      version: 'v4.8',
      sparklineIdx: 5,
      accentColor: '#10B981',
      gradient: 'from-emerald-500 to-emerald-600',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
      dotColor: 'bg-emerald-500',
      tagBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-30" />

        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-slate-900 dark:text-white">{t('tech.title').split(' ').slice(0, -1).join(' ')} </span>
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 dark:from-primary-400 dark:via-emerald-300 dark:to-cyan-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                {t('tech.title').split(' ').slice(-1)}
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t('tech.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techs.map((tech, i) => {
              const sparkPath = sparklinePaths[tech.sparklineIdx] ?? sparklinePaths[0]!
              return (
                <div
                  key={tech.titleKey}
                  className="scroll-reveal-scale"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Gradient border wrapper */}
                  <div className={cn(
                    'group relative rounded-2xl p-px overflow-hidden',
                    'bg-gradient-to-b', tech.gradientBorder,
                    'hover:shadow-2xl transition-all duration-500',
                    tech.glowColor,
                  )}>
                    {/* Inner card */}
                    <div className="relative rounded-[15px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                      {/* Corner gradient glow */}
                      <div
                        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                        style={{ background: `radial-gradient(circle, ${tech.accentColor}20 0%, transparent 70%)` }}
                      />

                      {/* Grid pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage: `linear-gradient(${tech.accentColor}30 1px, transparent 1px), linear-gradient(90deg, ${tech.accentColor}30 1px, transparent 1px)`,
                          backgroundSize: '24px 24px',
                        }}
                      />

                      {/* Top row: icon + version badge */}
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className={cn(
                          'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                          'ring-1 ring-inset ring-black/5 dark:ring-white/10',
                          tech.iconBg,
                        )}>
                          <tech.icon className="h-6 w-6" />
                        </div>
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase border border-current/5',
                          tech.tagBg,
                        )}>
                          <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', tech.dotColor)} />
                          {tech.version}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1.5 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {t(tech.titleKey)}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 relative z-10">
                        {t(tech.descriptionKey)}
                      </p>

                      {/* Sparkline chart area */}
                      <div className="relative z-10 mt-auto pt-3 border-t border-slate-100/80 dark:border-slate-800/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Adoption</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" style={{ color: tech.accentColor }} />
                            <span className="text-[10px] font-bold" style={{ color: tech.accentColor }}>Growing</span>
                          </span>
                        </div>
                        <TechSparkline path={sparkPath} color={tech.accentColor} gradientId={`tech-spark-${i}`} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 4 - WHAT'S INCLUDED
// ============================================================================

const includedIcons = [BarChart3, Puzzle, Moon, Languages, Smartphone, Zap, Calendar, Rocket]

const WhatsIncludedSection = () => {
  const t = useTranslations('about')

  const items = [
    { iconIdx: 0, titleKey: 'included.dashboards.title' as const, descKey: 'included.dashboards.description' as const },
    { iconIdx: 1, titleKey: 'included.components.title' as const, descKey: 'included.components.description' as const },
    { iconIdx: 2, titleKey: 'included.darkMode.title' as const, descKey: 'included.darkMode.description' as const },
    { iconIdx: 3, titleKey: 'included.i18n.title' as const, descKey: 'included.i18n.description' as const },
    { iconIdx: 4, titleKey: 'included.responsive.title' as const, descKey: 'included.responsive.description' as const },
    { iconIdx: 5, titleKey: 'included.stack.title' as const, descKey: 'included.stack.description' as const },
    { iconIdx: 6, titleKey: 'included.apps.title' as const, descKey: 'included.apps.description' as const },
    { iconIdx: 7, titleKey: 'included.production.title' as const, descKey: 'included.production.description' as const },
  ]

  const gradientColors = [
    'from-primary-400 to-primary-600',
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-rose-400 to-rose-600',
    'from-amber-400 to-amber-600',
    'from-emerald-400 to-emerald-600',
    'from-cyan-400 to-cyan-600',
    'from-indigo-400 to-indigo-600',
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('included.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t('included.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => {
              const gradient = gradientColors[i] || 'from-primary-400 to-primary-600'
              const Icon = includedIcons[item.iconIdx] || BarChart3
              return (
                <div
                  key={item.titleKey}
                  className={cn(
                    'scroll-reveal-scale group relative overflow-hidden rounded-xl border',
                    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
                    'hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50',
                    'hover:-translate-y-1 transition-all duration-300',
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className={cn('h-1.5 bg-gradient-to-r', gradient)} />
                  <div className="p-5">
                    <div className={cn(
                      'inline-flex items-center justify-center h-10 w-10 rounded-lg mb-3',
                      'bg-gradient-to-br text-white shadow-lg',
                      gradient,
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 5 - BY THE NUMBERS (animated counters)
// ============================================================================

const StatItem = ({ value, labelKey, icon: Icon, delay, isVisible }: {
  value: number
  labelKey: string
  icon: React.ElementType
  delay: number
  isVisible: boolean
}) => {
  const t = useTranslations('about')
  const { count, start } = useCountUp(value, 2000)

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(start, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, start, delay])

  return (
    <div
      className={cn(
        'text-center p-6 md:p-8 rounded-2xl',
        'bg-white/5 backdrop-blur-sm border border-white/10',
        'hover:bg-white/10 transition-all duration-500',
        'group',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon className="h-8 w-8 text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(20, 184, 154, 0.3)' }}>
        {isVisible ? count : 0}
        <span className="text-primary-400">+</span>
      </div>
      <div className="text-sm md:text-base text-slate-400 font-medium">
        {t(labelKey)}
      </div>
    </div>
  )
}

const StatsSection = () => {
  const t = useTranslations('about')
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  const stats = [
    { value: 96, labelKey: 'stats.components' as const, icon: Puzzle },
    { value: 126, labelKey: 'stats.pages' as const, icon: FileText },
    { value: 16, labelKey: 'stats.dashboards' as const, icon: BarChart3 },
    { value: 3, labelKey: 'stats.languages' as const, icon: Languages },
  ]

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-orb-slow" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl animate-orb" />
      {/* Light particles on dark bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleData.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
              opacity: p.opacity * 0.5,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.labelKey}
              value={stat.value}
              labelKey={stat.labelKey}
              icon={stat.icon}
              delay={i * 150}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 6 - CTA
// ============================================================================

const CtaSection = () => {
  const t = useTranslations('about')

  return (
    <RevealSection>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-10 md:p-16 text-center noise-overlay">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/AndriyAmaro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
                  >
                    <GitHubLogo className="h-4 w-4" />
                    {t('cta.github')}
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
                  >
                    <Mail className="h-4 w-4" />
                    {t('cta.contact')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// ABOUT PAGE
// ============================================================================

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <TechStackSection />
      <WhatsIncludedSection />
      <StatsSection />
      <CtaSection />
    </>
  )
}
