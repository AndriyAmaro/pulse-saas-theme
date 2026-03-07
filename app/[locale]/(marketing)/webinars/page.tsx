'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  Eye,
  ArrowRight,
  Mic2,
  Mail,
  Sparkles,
  CheckCircle2,
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
// WEBINAR DATA
// ============================================================================

interface UpcomingWebinar {
  title: string
  description: string
  date: string
  dateLabel: string
  speaker: string
  speakerRole: string
  spotsRemaining: number
  gradient: string
  gradientBorder: string
  accentColor: string
}

interface PastWebinar {
  title: string
  date: string
  duration: string
  views: number
  gradient: string
  gradientBorder: string
  accentColor: string
}

const upcomingWebinars: UpcomingWebinar[] = [
  {
    title: 'Construyendo Dashboards con Pulse v3.0',
    description: 'Aprende a crear dashboards interactivos y personalizables desde cero usando los nuevos componentes de Pulse v3.0. Cubriremos graficos en tiempo real, filtros avanzados y layouts responsive.',
    date: '15 Mar 2026',
    dateLabel: 'Mar 15, 2026 - 18:00 CET',
    speaker: 'Carlos Rodriguez',
    speakerRole: 'Lead Engineer @ Pulse',
    spotsRemaining: 42,
    gradient: 'from-primary-500 via-primary-600 to-emerald-600',
    gradientBorder: 'from-primary-400/60 via-primary-500/20 to-primary-400/60',
    accentColor: '#14B89A',
  },
  {
    title: 'Design Systems: De Figma a Codigo',
    description: 'Descubre el flujo completo de trabajo para convertir tokens de diseno de Figma en componentes funcionales. Automatizacion, theming dinamico y sincronizacion continua entre diseno y desarrollo.',
    date: '28 Mar 2026',
    dateLabel: 'Mar 28, 2026 - 18:00 CET',
    speaker: 'Ana Martinez',
    speakerRole: 'Design Lead @ Pulse',
    spotsRemaining: 28,
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    gradientBorder: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
    accentColor: '#8B5CF6',
  },
]

const pastWebinars: PastWebinar[] = [
  {
    title: 'Introduccion a Pulse',
    date: '15 Ene 2026',
    duration: '45 min',
    views: 1240,
    gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
    accentColor: '#3B82F6',
  },
  {
    title: 'Theming Avanzado',
    date: '28 Ene 2026',
    duration: '52 min',
    views: 890,
    gradient: 'from-amber-500 via-orange-600 to-amber-700',
    gradientBorder: 'from-amber-400/60 via-amber-500/20 to-amber-400/60',
    accentColor: '#F59E0B',
  },
  {
    title: 'API & Integraciones',
    date: '10 Feb 2026',
    duration: '58 min',
    views: 1050,
    gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
    gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
    accentColor: '#10B981',
  },
  {
    title: 'Testing Components',
    date: '24 Feb 2026',
    duration: '40 min',
    views: 720,
    gradient: 'from-rose-500 via-pink-600 to-rose-700',
    gradientBorder: 'from-rose-400/60 via-rose-500/20 to-rose-400/60',
    accentColor: '#F43F5E',
  },
]

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
      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      {/* ECG heartbeat — Desktop */}
      <svg className="hidden md:block absolute inset-0 z-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 450 L360 450 L390 350 L420 550 L450 300 L480 600 L510 450 L1440 450" className="wb-ecg-line" stroke="url(#wb-ecg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="wb-ecg-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
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
        <path d="M0 300 L125 300 L145 230 L165 370 L185 200 L205 400 L225 300 L500 300" className="wb-ecg-line" stroke="url(#wb-ecg-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="wb-ecg-grad-m" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
            <stop offset="20%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#14B89A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style>{`
        .wb-ecg-line {
          stroke-dasharray: 2200;
          stroke-dashoffset: 2200;
          animation: wb-ecg-draw 3s ease-in-out forwards;
        }
        @keyframes wb-ecg-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Video className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Webinars</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          Webinars y{' '}
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            Eventos
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Aprende de los expertos en sesiones en vivo. Descubre las mejores practicas, nuevas funcionalidades y conecta con la comunidad de Pulse.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - UPCOMING WEBINARS
// ============================================================================

const UpcomingSection = () => {
  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Proximos{' '}
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">webinars</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Reserva tu lugar en nuestras proximas sesiones en vivo. Plazas limitadas para una experiencia mas personalizada.
            </p>
          </div>

          {/* Upcoming cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingWebinars.map((webinar, i) => (
              <div
                key={webinar.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient border wrapper */}
                <div
                  className={cn(
                    'group relative rounded-2xl p-px overflow-hidden',
                    'bg-gradient-to-b',
                    webinar.gradientBorder,
                    'hover:shadow-2xl transition-all duration-500',
                  )}
                >
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 md:p-8 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner gradient glow */}
                    <div
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${webinar.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Date badge */}
                    <div className="flex items-center gap-3 mb-5 relative z-10">
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold',
                          'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400',
                          'border border-primary-200 dark:border-primary-500/20',
                        )}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        {webinar.dateLabel}
                      </span>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {webinar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 mb-6">
                      {webinar.description}
                    </p>

                    {/* Speaker */}
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      {/* Avatar placeholder */}
                      <div
                        className={cn(
                          'inline-flex items-center justify-center h-10 w-10 rounded-full',
                          'bg-gradient-to-br text-white text-sm font-bold',
                          webinar.gradient,
                        )}
                      >
                        {webinar.speaker.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {webinar.speaker}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {webinar.speakerRole}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between relative z-10 pt-5 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Users className="h-3.5 w-3.5" />
                        <span className="font-medium text-amber-600 dark:text-amber-400">{webinar.spotsRemaining} plazas restantes</span>
                      </span>
                      <Button
                        size="sm"
                        className="gap-1.5 text-xs px-5"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Registrarse
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
// SECTION 3 - PAST WEBINARS
// ============================================================================

const PastWebinarsSection = () => {
  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Grabaciones{' '}
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">anteriores</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Te perdiste un webinar? No te preocupes. Accede a todas las grabaciones anteriores cuando quieras.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {pastWebinars.map((webinar, i) => (
              <div
                key={webinar.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient border wrapper */}
                <div
                  className={cn(
                    'group relative rounded-2xl p-px overflow-hidden',
                    'bg-gradient-to-b',
                    webinar.gradientBorder,
                    'hover:shadow-2xl transition-all duration-500',
                  )}
                >
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner gradient glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${webinar.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Gradient thumbnail with play overlay */}
                    <div
                      className={cn(
                        'relative w-full h-40 rounded-xl mb-5 overflow-hidden bg-gradient-to-br',
                        webinar.gradient,
                      )}
                    >
                      {/* Mock video UI */}
                      <div className="absolute inset-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                        <div className="flex gap-1.5 m-2.5">
                          <div className="h-2 w-2 rounded-full bg-white/30" />
                          <div className="h-2 w-2 rounded-full bg-white/30" />
                          <div className="h-2 w-2 rounded-full bg-white/30" />
                        </div>
                        <div className="h-3 w-20 bg-white/20 rounded-full mx-2.5 mt-2" />
                        <div className="h-2 w-32 bg-white/10 rounded-full mx-2.5 mt-1.5" />
                      </div>

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/90 dark:bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-6 w-6 text-slate-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold bg-black/60 text-white backdrop-blur-sm">
                          <Clock className="h-3 w-3" />
                          {webinar.duration}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {webinar.title}
                    </h3>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {webinar.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Eye className="h-3.5 w-3.5" />
                        {webinar.views.toLocaleString('es-ES')} vistas
                      </span>
                    </div>

                    {/* Action */}
                    <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all duration-300 cursor-pointer">
                        <Play className="h-3.5 w-3.5" />
                        Ver Grabacion
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
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
// SECTION 4 - CTA
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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <Mic2 className="h-3.5 w-3.5 text-white" />
                <span className="text-sm font-semibold text-white">Ponentes</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quieres ser ponente?
              </h2>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
                Comparte tu experiencia con la comunidad de Pulse. Buscamos expertos en desarrollo, diseno y producto para nuestras proximas sesiones.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
                >
                  <Sparkles className="h-4 w-4" />
                  Enviar propuesta
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
                >
                  <Mail className="h-4 w-4" />
                  Contactar organizadores
                </Button>
              </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// WEBINARS PAGE
// ============================================================================

export default function WebinarsPage() {
  return (
    <>
      <HeroSection />
      <UpcomingSection />
      <PastWebinarsSection />
      <CTASection />
    </>
  )
}
