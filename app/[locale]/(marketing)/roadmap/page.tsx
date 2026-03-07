'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  Map,
  CheckCircle2,
  Clock,
  CalendarClock,
  ThumbsUp,
  Moon,
  Globe,
  Layers,
  LayoutDashboard,
  Sparkles,
  Brain,
  Users,
  Smartphone,
  Palette,
  Puzzle,
  Building2,
  KeyRound,
  Code2,
  Github,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Rocket,
  Mail,
} from 'lucide-react'

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
// ROADMAP DATA
// ============================================================================

type RoadmapItem = {
  title: string
  description: string
  category: string
  votes: number
  icon: React.ElementType
}

const completedItems: RoadmapItem[] = [
  {
    title: 'Dark Mode',
    description: 'Soporte completo de modo oscuro con transiciones suaves y persistencia de preferencias del usuario.',
    category: 'UI/UX',
    votes: 248,
    icon: Moon,
  },
  {
    title: 'Internacionalización (i18n)',
    description: '12 idiomas soportados con next-intl, detección automática del idioma del navegador y cambio dinámico.',
    category: 'Core',
    votes: 192,
    icon: Globe,
  },
  {
    title: '70+ Componentes',
    description: 'Biblioteca completa de componentes primitivos, organismos y patrones listos para producción.',
    category: 'Componentes',
    votes: 312,
    icon: Layers,
  },
  {
    title: 'Dashboards Premium',
    description: '16 dashboards especializados: SaaS, eCommerce, CRM, Finanzas, Healthcare, y más.',
    category: 'Dashboards',
    votes: 276,
    icon: LayoutDashboard,
  },
]

const inProgressItems: RoadmapItem[] = [
  {
    title: 'AI-Powered Analytics',
    description: 'Panel de análisis inteligente con insights automáticos, predicciones y recomendaciones basadas en IA.',
    category: 'AI',
    votes: 384,
    icon: Brain,
  },
  {
    title: 'Colaboración en Tiempo Real',
    description: 'Edición colaborativa con cursores en vivo, comentarios en contexto y notificaciones instantáneas.',
    category: 'Colaboración',
    votes: 267,
    icon: Users,
  },
  {
    title: 'Aplicación Móvil',
    description: 'App nativa para iOS y Android con React Native, sincronización offline y notificaciones push.',
    category: 'Mobile',
    votes: 198,
    icon: Smartphone,
  },
  {
    title: 'Theming Avanzado',
    description: 'Editor visual de temas con variables CSS personalizables, paletas de colores ilimitadas y presets.',
    category: 'UI/UX',
    votes: 156,
    icon: Palette,
  },
]

const plannedItems: RoadmapItem[] = [
  {
    title: 'Marketplace de Plugins',
    description: 'Ecosistema de plugins de terceros con instalación en un clic, actualizaciones automáticas y sandbox seguro.',
    category: 'Ecosistema',
    votes: 423,
    icon: Puzzle,
  },
  {
    title: 'White-label',
    description: 'Personalización completa de marca: logos, colores, tipografías, dominios custom y emails branded.',
    category: 'Enterprise',
    votes: 189,
    icon: Building2,
  },
  {
    title: 'API Pública',
    description: 'REST y GraphQL API documentada con Swagger, rate limiting, webhooks y SDKs para múltiples lenguajes.',
    category: 'Developer',
    votes: 302,
    icon: Code2,
  },
  {
    title: 'SSO Enterprise',
    description: 'Single Sign-On con SAML 2.0, OAuth 2.0, LDAP/Active Directory y auditoría de acceso centralizada.',
    category: 'Seguridad',
    votes: 245,
    icon: KeyRound,
  },
]

// ============================================================================
// ROADMAP CARD
// ============================================================================

const RoadmapCard = ({
  item,
  status,
  index,
}: {
  item: RoadmapItem
  status: 'completed' | 'in-progress' | 'planned'
  index: number
}) => {
  const [voted, setVoted] = React.useState(false)
  const [voteCount, setVoteCount] = React.useState(item.votes)

  const statusConfig = {
    completed: {
      dotColor: 'bg-emerald-500',
      gradientBorder: 'from-emerald-400/40 via-emerald-500/20 to-emerald-400/40',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      accentColor: '#10B981',
      progressWidth: '100%',
      progressGradient: 'from-emerald-400 to-emerald-600',
    },
    'in-progress': {
      dotColor: 'bg-primary-500',
      gradientBorder: 'from-primary-400/40 via-primary-500/20 to-primary-400/40',
      glowColor: 'group-hover:shadow-primary-500/20 dark:group-hover:shadow-primary-500/15',
      badgeColor: 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-500/20',
      iconBg: 'bg-primary-500/10 dark:bg-primary-500/15',
      iconColor: 'text-primary-500',
      accentColor: '#14B89A',
      progressWidth: '60%',
      progressGradient: 'from-primary-400 to-primary-600',
    },
    planned: {
      dotColor: 'bg-slate-400',
      gradientBorder: 'from-slate-300/40 via-slate-400/15 to-slate-300/40 dark:from-slate-600/40 dark:via-slate-700/15 dark:to-slate-600/40',
      glowColor: 'group-hover:shadow-slate-400/20 dark:group-hover:shadow-slate-500/15',
      badgeColor: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
      iconBg: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-500 dark:text-slate-400',
      accentColor: '#94A3B8',
      progressWidth: '15%',
      progressGradient: 'from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500',
    },
  }

  const config = statusConfig[status]

  const handleVote = () => {
    if (!voted) {
      setVoted(true)
      setVoteCount((prev) => prev + 1)
    } else {
      setVoted(false)
      setVoteCount((prev) => prev - 1)
    }
  }

  return (
    <div
      className="scroll-reveal-scale"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          'group relative rounded-2xl p-px overflow-hidden',
          'bg-gradient-to-b',
          config.gradientBorder,
          'hover:shadow-2xl transition-all duration-500',
          config.glowColor
        )}
      >
        <div className="relative rounded-[15px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
          {/* Scan line effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${config.accentColor}06 50%, transparent 100%)`,
              backgroundSize: '100% 200%',
              animation: 'none',
            }}
          />

          {/* Corner gradient glow */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${config.accentColor}20 0%, transparent 70%)`,
            }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${config.accentColor}30 1px, transparent 1px), linear-gradient(90deg, ${config.accentColor}30 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Header: icon + status dot */}
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div
              className={cn(
                'inline-flex items-center justify-center h-10 w-10 rounded-xl',
                'ring-1 ring-inset ring-black/5 dark:ring-white/10',
                config.iconBg
              )}
            >
              <item.icon className={cn('h-5 w-5', config.iconColor)} />
            </div>
            <span className="relative flex h-3 w-3">
              {status === 'in-progress' && (
                <span
                  className={cn(
                    'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                    config.dotColor
                  )}
                />
              )}
              <span className={cn('relative inline-flex rounded-full h-3 w-3', config.dotColor)} />
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 relative z-10">
            {item.description}
          </p>

          {/* Progress bar */}
          <div className="relative z-10 mb-4">
            <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', config.progressGradient)}
                style={{ width: config.progressWidth }}
              />
            </div>
          </div>

          {/* Footer: category badge + vote button */}
          <div className="flex items-center justify-between relative z-10 pt-3 border-t border-slate-100/80 dark:border-slate-800/60">
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm',
                config.badgeColor
              )}
            >
              {item.category}
            </span>
            <button
              onClick={handleVote}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                voted
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200 dark:ring-primary-500/30 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-700'
              )}
            >
              <ThumbsUp className={cn('h-3.5 w-3.5 transition-transform', voted && 'fill-primary-500 text-primary-500 -rotate-12')} />
              <span className="tabular-nums">{voteCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SECTION 1 - PREMIUM HERO
// ============================================================================

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-x-clip">
      {/* Background Image */}
      <div
        className="absolute -inset-x-16 inset-y-0 z-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40"
        style={{ backgroundImage: 'url(/fundo-blackground.png)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />

      {/* ECG — Desktop */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs><filter id="rm-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="rm-ecg-glow" filter="url(#rm-glow)" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(20, 184, 154)" strokeWidth="4"/>
          <path className="rm-ecg-main" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(94, 234, 212)" strokeWidth="1.2"/>
        </g>
      </svg>
      {/* ECG — Mobile */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs><filter id="rm-glow-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="rm-ecg-glow-m" filter="url(#rm-glow-m)" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(20, 184, 154)" strokeWidth="2"/>
          <path className="rm-ecg-main-m" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(94, 234, 212)" strokeWidth="0.7"/>
        </g>
      </svg>
      <style>{`
        .rm-ecg-main { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: rm-draw 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .rm-ecg-glow { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: rm-glow-a 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .rm-ecg-main-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: rm-draw-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        .rm-ecg-glow-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: rm-glow-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes rm-draw { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 40% { stroke-dashoffset: 2800; opacity: 0.05; } 43% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes rm-glow-a { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 40% { stroke-dashoffset: 2800; opacity: 0.02; } 43% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes rm-draw-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 42% { stroke-dashoffset: 800; opacity: 0.05; } 45% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes rm-glow-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 42% { stroke-dashoffset: 800; opacity: 0.02; } 45% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .rm-ecg-main, .rm-ecg-glow, .rm-ecg-main-m, .rm-ecg-glow-m { animation: none !important; } }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Map className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Roadmap</span>
        </div>

        {/* Title with Pulse gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          <span className="text-slate-900 dark:text-white">Hoja de </span>
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 dark:from-primary-400 dark:via-emerald-300 dark:to-cyan-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            Ruta
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nuestra visión para el futuro de Pulse. Descubre las funcionalidades completadas,
          en desarrollo y planificadas para las próximas versiones.
        </p>

        {/* Status legend */}
        <div className="relative mt-12 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {[
            { icon: CheckCircle2, label: 'Completado', sublabel: '4 features', color: 'text-emerald-500', delay: '0s' },
            { icon: Clock, label: 'En Progreso', sublabel: '4 features', color: 'text-primary-500', delay: '0.5s' },
            { icon: CalendarClock, label: 'Planificado', sublabel: '4 features', color: 'text-slate-500 dark:text-slate-400', delay: '1s' },
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
// SECTION 2 - ROADMAP COLUMNS
// ============================================================================

const RoadmapSection = () => {
  const columns = [
    {
      title: 'Completado',
      icon: CheckCircle2,
      items: completedItems,
      status: 'completed' as const,
      headerGradient: 'from-emerald-500 to-emerald-600',
      headerDot: 'bg-emerald-400',
      count: completedItems.length,
    },
    {
      title: 'En Progreso',
      icon: Clock,
      items: inProgressItems,
      status: 'in-progress' as const,
      headerGradient: 'from-primary-500 to-primary-600',
      headerDot: 'bg-primary-400',
      count: inProgressItems.length,
    },
    {
      title: 'Planificado',
      icon: CalendarClock,
      items: plannedItems,
      status: 'planned' as const,
      headerGradient: 'from-slate-500 to-slate-600',
      headerDot: 'bg-slate-400',
      count: plannedItems.length,
    },
  ]

  return (
    <RevealSection>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-slate-900 dark:text-white">Estado del </span>
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 dark:from-primary-400 dark:via-emerald-300 dark:to-cyan-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Desarrollo
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sigue el progreso de cada funcionalidad. Vota por las features que más te interesan para ayudarnos a priorizar.
            </p>
          </div>

          {/* 3 Columns */}
          <div className="grid lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <div key={column.title} className="scroll-reveal">
                {/* Column header — glass card */}
                <div className="relative mb-6 p-4 rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/40 overflow-hidden">
                  {/* Accent top border */}
                  <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', column.headerGradient)} />
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br text-white shadow-lg',
                        column.headerGradient
                      )}
                    >
                      <column.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                        {column.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        'ml-auto inline-flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold text-white',
                        `bg-gradient-to-br ${column.headerGradient}`
                      )}
                    >
                      {column.count}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  {column.items.map((item, i) => (
                    <RoadmapCard key={item.title} item={item} status={column.status} index={i} />
                  ))}
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
// SECTION 3 - SUGGEST A FEATURE
// ============================================================================

const SuggestSection = () => {
  return (
    <RevealSection>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-20" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale">
            {/* Gradient border wrapper */}
            <div className="relative rounded-2xl p-px bg-gradient-to-b from-primary-400/50 via-primary-500/15 to-primary-400/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
              <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-8 md:p-10 overflow-hidden">
                {/* Corner glows */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-accent-500/5 dark:bg-accent-500/[0.03] rounded-full blur-3xl" />

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-50 dark:bg-primary-500/10 ring-1 ring-inset ring-primary-200 dark:ring-primary-500/20 mb-5">
                    <MessageSquare className="h-7 w-7 text-primary-500" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Sugiere una Feature
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto">
                    Tu opinión es clave para el desarrollo de Pulse. Comparte tus ideas, vota por las
                    features de otros usuarios y participa en las discusiones de la comunidad.
                  </p>

                  {/* Voting visual */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    {[
                      { label: 'API Webhooks', votes: 128 },
                      { label: 'CLI Tools', votes: 96 },
                      { label: 'Templates', votes: 214 },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      >
                        <ThumbsUp className="h-3.5 w-3.5 text-primary-500" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{feature.label}</span>
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 tabular-nums">
                          {feature.votes}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="https://github.com/AndriyAmaro/pulse-theme/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2 px-8">
                      <Github className="h-4 w-4" />
                      Abrir GitHub Discussions
                      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 4 - CTA
// ============================================================================

const CtaSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Animated orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-orb" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-orb-slow" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
          <Rocket className="h-3.5 w-3.5 text-white" />
          <span className="text-sm font-semibold text-white/90">Construye con nosotros</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Quieres dar forma al futuro de Pulse?
        </h2>
        <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
          Únete a nuestra comunidad de desarrolladores, comparte tus ideas y ayúdanos a
          construir la mejor plataforma SaaS del mercado.
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
              <Github className="h-4 w-4" />
              Explorar en GitHub
            </Button>
          </a>
          <a href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
            >
              <Mail className="h-4 w-4" />
              Contactar
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ROADMAP PAGE
// ============================================================================

export default function RoadmapPage() {
  return (
    <>
      <HeroSection />
      <RoadmapSection />
      <SuggestSection />
      <CtaSection />
    </>
  )
}
