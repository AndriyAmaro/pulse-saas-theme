'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  Users,
  Heart,
  Star,
  GitFork,
  GitPullRequest,
  Code2,
  ArrowRight,
  Sparkles,
  Zap,
  FolderGit2,
  Send,
  TrendingUp,
  ExternalLink,
  Github,
  MessageCircle,
} from 'lucide-react'

// ============================================================================
// REAL PLATFORM LOGOS (inline SVG components)
// ============================================================================

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
  </svg>
)

const XTwitterLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const YouTubeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
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
    <div className="absolute w-1.5 h-1.5 rounded-full bg-primary-400 animate-float-slow" style={{ left: '18%', top: '30%', opacity: 0.4, boxShadow: '0 0 8px rgba(20, 184, 154, 0.4)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-float-delayed" style={{ left: '78%', top: '65%', opacity: 0.35, boxShadow: '0 0 8px rgba(52, 211, 153, 0.4)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-primary-400 animate-float" style={{ left: '50%', top: '85%', opacity: 0.3, boxShadow: '0 0 8px rgba(20, 184, 154, 0.3)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-accent-400 animate-float-slow" style={{ left: '38%', top: '12%', opacity: 0.25, boxShadow: '0 0 8px rgba(251, 191, 36, 0.3)' }} />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 animate-float-delayed" style={{ left: '85%', top: '35%', opacity: 0.3, boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)' }} />
  </div>
)

// ============================================================================
// SECTION 1 - HERO
// ============================================================================

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-x-clip">
      {/* Background image */}
      <div className="absolute -inset-x-16 inset-y-0 z-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40" style={{ backgroundImage: 'url(/fundo-blackground.png)' }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* ECG heartbeat — Desktop */}
      <svg className="hidden md:block absolute inset-0 z-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 450 L360 450 L390 350 L420 550 L450 300 L480 600 L510 450 L1440 450" className="cm-ecg-line" stroke="url(#cm-ecg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="cm-ecg-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="15%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ECG heartbeat — Mobile */}
      <svg className="md:hidden absolute inset-0 z-0 w-full h-full" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 L125 300 L145 230 L165 370 L185 200 L205 400 L225 300 L500 300" className="cm-ecg-line" stroke="url(#cm-ecg-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="cm-ecg-grad-m" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="20%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        .cm-ecg-line {
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
          animation: cm-ecg-draw 3s ease-in-out forwards;
        }
        @keyframes cm-ecg-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Users className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Comunidad</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-slate-900 dark:text-white">Unete a la </span>
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            Comunidad Pulse
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Miles de desarrolladores alrededor del mundo construyen con Pulse.
          Unete a nuestra comunidad para aprender, compartir y contribuir.
        </p>

        {/* Floating badges */}
        <div className="relative mt-12 flex items-center justify-center gap-4 md:gap-6">
          {[
            { icon: Github, label: 'Open Source', sublabel: 'MIT License', color: 'text-slate-700 dark:text-slate-300', delay: '0s' },
            { icon: Heart, label: '5K+', sublabel: 'Miembros', color: 'text-rose-500', delay: '0.5s' },
            { icon: Zap, label: 'Activa', sublabel: 'Comunidad', color: 'text-amber-500', delay: '1s' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="animate-float px-4 py-3 rounded-xl glass shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30"
              style={{ animationDelay: badge.delay, animationDuration: '5s' }}
            >
              <div className="flex items-center gap-2.5">
                <div className={cn('flex items-center justify-center h-8 w-8 rounded-lg bg-current/10', badge.color)}>
                  <badge.icon className={cn('h-4 w-4', badge.color)} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-none">{badge.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{badge.sublabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - STATS
// ============================================================================

const StatsSection = () => {
  const stats = [
    { value: '5K+', label: 'Miembros', icon: Users, color: 'text-primary-500' },
    { value: '1.2K', label: 'Proyectos', icon: FolderGit2, color: 'text-blue-500' },
    { value: '300+', label: 'Contribuidores', icon: GitPullRequest, color: 'text-emerald-500' },
    { value: '15K', label: 'Mensajes', icon: MessageCircle, color: 'text-violet-500' },
  ]

  return (
    <RevealSection>
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-orb-slow" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-orb" />

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="scroll-reveal-scale text-center p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <stat.icon className={cn('h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300', stat.color)} />
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tabular-nums" style={{ textShadow: '0 0 20px rgba(20, 184, 154, 0.3)' }}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 3 - PLATFORMS
// ============================================================================

const PlatformsSection = () => {
  const platforms = [
    {
      icon: GitHubLogo,
      title: 'GitHub',
      description: 'Explora el codigo fuente, reporta bugs, propone mejoras y contribuye al proyecto open source.',
      members: '2.8K stars',
      accentColor: '#6366F1',
      gradientBorder: 'from-indigo-400/60 via-indigo-500/20 to-indigo-400/60',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      iconColor: 'text-indigo-500',
      glowColor: 'group-hover:shadow-indigo-500/20 dark:group-hover:shadow-indigo-500/15',
    },
    {
      icon: DiscordLogo,
      title: 'Discord',
      description: 'Unete a nuestro servidor de Discord para chat en tiempo real, soporte tecnico y networking.',
      members: '3.2K miembros',
      accentColor: '#5865F2',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
    },
    {
      icon: XTwitterLogo,
      title: 'Twitter / X',
      description: 'Sigue nuestras actualizaciones, tips de desarrollo y noticias del ecosistema Pulse.',
      members: '8.5K seguidores',
      accentColor: '#1DA1F2',
      gradientBorder: 'from-sky-400/60 via-sky-500/20 to-sky-400/60',
      iconBg: 'bg-sky-500/10 dark:bg-sky-500/15',
      iconColor: 'text-sky-500',
      glowColor: 'group-hover:shadow-sky-500/20 dark:group-hover:shadow-sky-500/15',
    },
    {
      icon: YouTubeLogo,
      title: 'YouTube',
      description: 'Tutoriales en video, demos de componentes y sesiones de live coding con el equipo Pulse.',
      members: '1.5K suscriptores',
      accentColor: '#EF4444',
      gradientBorder: 'from-red-400/60 via-red-500/20 to-red-400/60',
      iconBg: 'bg-red-500/10 dark:bg-red-500/15',
      iconColor: 'text-red-500',
      glowColor: 'group-hover:shadow-red-500/20 dark:group-hover:shadow-red-500/15',
    },
  ]

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Encuantranos en tus Plataformas{' '}
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Favoritas</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Conecta con la comunidad Pulse donde tu prefieras.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, i) => (
              <div
                key={platform.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', platform.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  platform.glowColor,
                )}>
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${platform.accentColor}15 0%, transparent 70%)` }}
                    />

                    <div className={cn(
                      'inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4',
                      'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                      platform.iconBg,
                    )}>
                      <platform.icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      {platform.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 relative z-10">
                      {platform.description}
                    </p>

                    <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                          {platform.members}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs group/btn">
                        Unirse
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 4 - SHOWCASE
// ============================================================================

const ShowcaseSection = () => {
  const projects = [
    {
      title: 'Pulse Analytics Dashboard',
      author: 'Maria Garcia',
      likes: 234,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'E-Commerce Platform',
      author: 'Carlos Rodriguez',
      likes: 189,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'SaaS Landing Page',
      author: 'Ana Martinez',
      likes: 156,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Healthcare Portal',
      author: 'Diego Lopez',
      likes: 142,
      gradient: 'from-amber-500 to-orange-600',
    },
  ]

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-20" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-4">
              <Star className="h-3.5 w-3.5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Showcase</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Proyectos de la{' '}
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Comunidad</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Descubre lo que otros desarrolladores han construido con Pulse.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={cn(
                  'group relative overflow-hidden rounded-xl border cursor-pointer',
                  'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800',
                  'hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50',
                  'hover:-translate-y-1 transition-all duration-300',
                )}>
                  {/* Gradient thumbnail */}
                  <div className={cn('h-36 bg-gradient-to-br relative overflow-hidden', project.gradient)}>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-14 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        por {project.author}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                        <Heart className="h-3 w-3" />
                        {project.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 5 - CONTRIBUTE (3-Step Guide)
// ============================================================================

const ContributeSection = () => {
  const steps = [
    {
      step: 1,
      icon: GitFork,
      title: 'Fork',
      description: 'Haz un fork del repositorio en GitHub y clona el proyecto en tu maquina local para comenzar a trabajar.',
      accentColor: '#3B82F6',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
    },
    {
      step: 2,
      icon: Code2,
      title: 'Code',
      description: 'Implementa tu mejora, nueva funcionalidad o correccion de bug siguiendo nuestras guias de contribucion.',
      accentColor: '#10B981',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
    },
    {
      step: 3,
      icon: GitPullRequest,
      title: 'Pull Request',
      description: 'Envia tu Pull Request con una descripcion clara. Nuestro equipo lo revisara y te dara feedback rapido.',
      accentColor: '#8B5CF6',
      gradientBorder: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
      iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
      iconColor: 'text-violet-500',
      glowColor: 'group-hover:shadow-violet-500/20 dark:group-hover:shadow-violet-500/15',
    },
  ]

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles className="opacity-20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Como{' '}
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Contribuir</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Contribuir a Pulse es facil. Sigue estos tres pasos para enviar tu primera contribucion.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connection line between steps */}
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent z-0" />

            {steps.map((step, i) => (
              <div
                key={step.title}
                className="scroll-reveal-scale relative z-10"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', step.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  step.glowColor,
                )}>
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${step.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Step number */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={cn(
                        'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                        'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                        step.iconBg,
                      )}>
                        <step.icon className={cn('h-6 w-6', step.iconColor)} />
                      </div>
                      <span
                        className="text-4xl font-bold opacity-10"
                        style={{ color: step.accentColor }}
                      >
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      Paso {step.step}: {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 6 - CTA
// ============================================================================

const CTASection = () => {
  return (
    <RevealSection>
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-orb" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-orb-slow" />

        <div className="scroll-reveal-scale relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-8 w-8 text-primary-200 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Listo para Contribuir?
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Tu proxima contribucion puede marcar la diferencia. Unete a cientos
            de desarrolladores que estan construyendo el futuro de Pulse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
              >
                <Github className="h-4 w-4" />
                Ver en GitHub
              </Button>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
              >
                <MessageCircle className="h-4 w-4" />
                Unirse a Discord
              </Button>
            </a>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// COMMUNITY PAGE
// ============================================================================

export default function CommunityPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PlatformsSection />
      <ShowcaseSection />
      <ContributeSection />
      <CTASection />
    </>
  )
}
