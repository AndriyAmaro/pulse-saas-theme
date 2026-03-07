'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  Sparkles,
  Newspaper,
  Users,
  Puzzle,
  Globe,
  Activity,
  Calendar,
  ArrowRight,
  Download,
  Image,
  Type,
  Monitor,
  Mail,
  Twitter,
  Linkedin,
  ExternalLink,
  Rocket,
  DollarSign,
  TrendingUp,
  Package,
  Palette,
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
// SECTION 1 - HERO
// ============================================================================

const HeroSection = () => {
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
        <defs><filter id="pr-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="pr-ecg-glow" filter="url(#pr-glow)" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(20, 184, 154)" strokeWidth="4"/>
          <path className="pr-ecg-main" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(94, 234, 212)" strokeWidth="1.2"/>
        </g>
      </svg>
      {/* ECG — Mobile */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs><filter id="pr-glow-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="pr-ecg-glow-m" filter="url(#pr-glow-m)" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(20, 184, 154)" strokeWidth="2"/>
          <path className="pr-ecg-main-m" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(94, 234, 212)" strokeWidth="0.7"/>
        </g>
      </svg>
      <style>{`
        .pr-ecg-main { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: pr-draw 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .pr-ecg-glow { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: pr-glow-a 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .pr-ecg-main-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: pr-draw-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        .pr-ecg-glow-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: pr-glow-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes pr-draw { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 40% { stroke-dashoffset: 2800; opacity: 0.05; } 43% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes pr-glow-a { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 40% { stroke-dashoffset: 2800; opacity: 0.02; } 43% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes pr-draw-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 42% { stroke-dashoffset: 800; opacity: 0.05; } 45% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes pr-glow-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 42% { stroke-dashoffset: 800; opacity: 0.02; } 45% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .pr-ecg-main, .pr-ecg-glow, .pr-ecg-main-m, .pr-ecg-glow-m { animation: none !important; } }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Newspaper className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Prensa</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          Sala de{' '}
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            Prensa
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Noticias, comunicados y recursos de marca para medios de comunicacion.
          Mantente al dia con las ultimas novedades de Pulse.
        </p>

        <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Mail className="h-4 w-4 text-primary-500" />
          <span>Contacto de prensa:</span>
          <a href="mailto:press@pulse.dev" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            press@pulse.dev
          </a>
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
    { value: '10K+', label: 'Usuarios activos', icon: Users },
    { value: '40+', label: 'Componentes', icon: Puzzle },
    { value: '70+', label: 'Paises', icon: Globe },
    { value: '99.9%', label: 'Uptime', icon: Activity },
  ]

  return (
    <RevealSection>
      <section className="relative py-16 overflow-hidden">
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'scroll-reveal-scale text-center p-6 md:p-8 rounded-2xl',
                  'bg-white/5 backdrop-blur-sm border border-white/10',
                  'hover:bg-white/10 transition-all duration-500',
                  'group',
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 0 20px rgba(20, 184, 154, 0.3)' }}>
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
// SECTION 3 - PRESS RELEASES (Timeline)
// ============================================================================

const PressReleasesSection = () => {
  const releases = [
    {
      date: 'Marzo 2026',
      title: 'Pulse lanza v3.0 con IA integrada',
      description: 'La nueva version incluye asistentes de IA para generacion de dashboards, sugerencias de componentes y optimizacion automatica de rendimiento.',
      icon: Rocket,
      color: 'bg-primary-500',
    },
    {
      date: 'Febrero 2026',
      title: '$2M en seed funding',
      description: 'Pulse cierra una ronda de financiacion seed de $2 millones liderada por inversores de Silicon Valley para acelerar el crecimiento del producto.',
      icon: DollarSign,
      color: 'bg-emerald-500',
    },
    {
      date: 'Enero 2026',
      title: 'Pulse alcanza 10K usuarios',
      description: 'La plataforma supera los 10,000 usuarios activos en mas de 70 paises, consolidandose como referencia en temas SaaS premium.',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      date: 'Diciembre 2025',
      title: 'Lanzamiento del Design System open-source',
      description: 'Pulse libera su design system como proyecto open-source, incluyendo mas de 40 componentes accesibles y personalizables.',
      icon: Package,
      color: 'bg-purple-500',
    },
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Comunicados de <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Prensa</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Las ultimas noticias y anuncios de Pulse.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {releases.map((release, i) => (
              <div
                key={release.title}
                className={cn('relative pl-8 md:pl-12 scroll-reveal-left', i < releases.length - 1 && 'pb-10')}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Timeline line */}
                {i < releases.length - 1 && (
                  <div className="absolute left-[11px] md:left-[19px] top-6 bottom-0 w-px bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-600 dark:to-primary-900" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 md:left-2 top-1 flex items-center justify-center">
                  <div className={cn('h-6 w-6 rounded-full border-4 border-white dark:border-slate-950 shadow-md', release.color)} />
                </div>

                {/* Card */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-slate-400/20 to-slate-400/5 hover:shadow-xl transition-all duration-500 group">
                  <div className="rounded-[15px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
                        <Calendar className="h-3 w-3" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {release.description}
                    </p>
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      Leer comunicado completo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
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
// SECTION 4 - BRAND ASSETS
// ============================================================================

const BrandAssetsSection = () => {
  const assets = [
    {
      title: 'Logo Primario',
      description: 'Logo principal en formato SVG y PNG para fondos claros.',
      icon: Sparkles,
      gradient: 'from-primary-400 to-primary-600',
    },
    {
      title: 'Logo Blanco',
      description: 'Version en blanco para uso sobre fondos oscuros o con color.',
      icon: Sparkles,
      gradient: 'from-slate-400 to-slate-600',
    },
    {
      title: 'Logo Oscuro',
      description: 'Version oscura para uso sobre fondos claros y materiales impresos.',
      icon: Sparkles,
      gradient: 'from-slate-700 to-slate-900',
    },
    {
      title: 'Colores de Marca',
      description: 'Paleta completa con codigos HEX, RGB y HSL para todos los colores.',
      icon: Palette,
      gradient: 'from-emerald-400 to-blue-600',
    },
    {
      title: 'Tipografia',
      description: 'Fuentes oficiales, pesos y guia de uso tipografico.',
      icon: Type,
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Screenshots',
      description: 'Capturas de pantalla en alta resolucion del producto para medios.',
      icon: Monitor,
      gradient: 'from-amber-400 to-amber-600',
    },
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Recursos de <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Marca</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Descarga logos, colores y recursos visuales para uso en medios.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, i) => (
              <div
                key={asset.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-slate-400/20 to-slate-400/5 hover:shadow-xl transition-all duration-500 group">
                  {/* Inner card */}
                  <div className="rounded-[15px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 h-full">
                    {/* Preview area */}
                    <div className={cn(
                      'flex items-center justify-center h-32 rounded-xl mb-4',
                      'bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity',
                      asset.gradient,
                    )}>
                      <asset.icon className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                      {asset.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {asset.description}
                    </p>

                    <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      <Download className="h-4 w-4" />
                      Descargar
                    </button>
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
// SECTION 5 - MEDIA CONTACT
// ============================================================================

const MediaContactSection = () => {
  return (
    <RevealSection>
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-orb" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-orb-slow" />

        <div className="scroll-reveal-scale relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Newspaper className="h-8 w-8 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contacto para Medios
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Para consultas de prensa, entrevistas o informacion adicional,
            contacta a nuestro equipo de comunicaciones.
          </p>

          {/* Contact card */}
          <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 text-left max-w-md w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/10">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-primary-200 font-medium uppercase tracking-wider">Email</div>
                  <a href="mailto:press@pulse.dev" className="text-white font-medium hover:text-primary-200 transition-colors">
                    press@pulse.dev
                  </a>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center gap-4">
                <span className="text-sm text-primary-200 font-medium">Redes:</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Twitter">
                    <Twitter className="h-4 w-4 text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Sitio web">
                    <ExternalLink className="h-4 w-4 text-white" />
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
// PRESS PAGE
// ============================================================================

export default function PressPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PressReleasesSection />
      <BrandAssetsSection />
      <MediaContactSection />
    </>
  )
}
