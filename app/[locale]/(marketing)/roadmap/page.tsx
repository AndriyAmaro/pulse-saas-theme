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
      gradientBorder: 'from-emerald-400/50 via-emerald-500/15 to-emerald-400/50',
      glowColor: 'group-hover:shadow-emerald-500/15 dark:group-hover:shadow-emerald-500/10',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
      accentColor: '#10B981',
    },
    'in-progress': {
      dotColor: 'bg-primary-500',
      gradientBorder: 'from-primary-400/50 via-primary-500/15 to-primary-400/50',
      glowColor: 'group-hover:shadow-primary-500/15 dark:group-hover:shadow-primary-500/10',
      badgeColor: 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-500/20',
      accentColor: '#14B89A',
    },
    planned: {
      dotColor: 'bg-slate-400',
      gradientBorder: 'from-slate-300/50 via-slate-400/15 to-slate-300/50 dark:from-slate-600/50 dark:via-slate-700/15 dark:to-slate-600/50',
      glowColor: 'group-hover:shadow-slate-400/15 dark:group-hover:shadow-slate-500/10',
      badgeColor: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
      accentColor: '#94A3B8',
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
        <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-5 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
          {/* Corner gradient glow */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${config.accentColor}15 0%, transparent 70%)`,
            }}
          />

          {/* Header: icon + status dot */}
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div
              className={cn(
                'inline-flex items-center justify-center h-10 w-10 rounded-xl',
                'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                status === 'completed' && 'bg-emerald-500/10 dark:bg-emerald-500/15',
                status === 'in-progress' && 'bg-primary-500/10 dark:bg-primary-500/15',
                status === 'planned' && 'bg-slate-100 dark:bg-slate-800'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5',
                  status === 'completed' && 'text-emerald-500',
                  status === 'in-progress' && 'text-primary-500',
                  status === 'planned' && 'text-slate-500 dark:text-slate-400'
                )}
              />
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
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 relative z-10">
            {item.description}
          </p>

          {/* Footer: category badge + vote button */}
          <div className="flex items-center justify-between relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/60">
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border',
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
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200 dark:ring-primary-500/30'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-700'
              )}
            >
              <ThumbsUp className={cn('h-3.5 w-3.5', voted && 'fill-primary-500 text-primary-500')} />
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
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Animated orbs */}
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-orb-slow" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/5 rounded-full blur-3xl animate-orb" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />
      </div>

      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Map className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Roadmap</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Hoja de Ruta
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Estado del Desarrollo
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sigue el progreso de cada funcionalidad. Vota por las features que más te interesan para ayudarnos a priorizar.
            </p>
          </div>

          {/* 3 Columns */}
          <div className="grid lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <div key={column.title} className="scroll-reveal">
                {/* Column header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      'inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br text-white shadow-lg',
                      column.headerGradient
                    )}
                  >
                    <column.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {column.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'ml-auto inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold text-white',
                      `bg-gradient-to-br ${column.headerGradient}`
                    )}
                  >
                    {column.count}
                  </span>
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
          </div>
        </div>
      </section>
    </RevealSection>
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
