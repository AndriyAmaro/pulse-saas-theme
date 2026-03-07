'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Input } from '@core/primitives/Input'
import {
  BookOpen,
  Search,
  Download,
  Footprints,
  Rocket,
  Component,
  Code2,
  Palette,
  Paintbrush,
  Puzzle,
  Users,
  ArrowRight,
  Terminal,
  Copy,
  CheckCircle2,
  Github,
  MessageCircle,
  Clock,
  FileText,
  Sparkles,
  Zap,
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
        <defs><filter id="dc-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="dc-ecg-glow" filter="url(#dc-glow)" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(20, 184, 154)" strokeWidth="4"/>
          <path className="dc-ecg-main" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(94, 234, 212)" strokeWidth="1.2"/>
        </g>
      </svg>
      {/* ECG — Mobile */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs><filter id="dc-glow-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="dc-ecg-glow-m" filter="url(#dc-glow-m)" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(20, 184, 154)" strokeWidth="2"/>
          <path className="dc-ecg-main-m" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(94, 234, 212)" strokeWidth="0.7"/>
        </g>
      </svg>
      <style>{`
        .dc-ecg-main { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: dc-draw 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .dc-ecg-glow { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: dc-glow-a 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .dc-ecg-main-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: dc-draw-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        .dc-ecg-glow-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: dc-glow-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes dc-draw { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 40% { stroke-dashoffset: 2800; opacity: 0.05; } 43% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes dc-glow-a { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 40% { stroke-dashoffset: 2800; opacity: 0.02; } 43% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes dc-draw-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 42% { stroke-dashoffset: 800; opacity: 0.05; } 45% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes dc-glow-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 42% { stroke-dashoffset: 800; opacity: 0.02; } 45% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .dc-ecg-main, .dc-ecg-glow, .dc-ecg-main-m, .dc-ecg-glow-m { animation: none !important; } }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <BookOpen className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Documentacion</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-slate-900 dark:text-white">Centro de </span>
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            Documentacion
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Todo lo que necesitas para construir aplicaciones increibles con Pulse.
          Guias detalladas, referencias de API y ejemplos practicos.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Buscar en la documentacion..."
            className="pl-12 pr-4 h-12 text-base rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20"
          />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - QUICK START CARDS
// ============================================================================

const QuickStartSection = () => {
  const cards = [
    {
      icon: Download,
      title: 'Instalacion',
      description: 'Configura Pulse en tu proyecto en menos de 5 minutos con npm o yarn.',
      time: '5 min',
      difficulty: 'Facil',
      difficultyColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
      accentColor: '#10B981',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
    },
    {
      icon: Footprints,
      title: 'Primeros Pasos',
      description: 'Aprende los conceptos basicos y crea tu primera pagina con componentes Pulse.',
      time: '15 min',
      difficulty: 'Intermedio',
      difficultyColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
      accentColor: '#3B82F6',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
    },
    {
      icon: Rocket,
      title: 'Despliegue',
      description: 'Despliega tu aplicacion a produccion con Vercel, Netlify o tu propio servidor.',
      time: '10 min',
      difficulty: 'Avanzado',
      difficultyColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
      accentColor: '#A855F7',
      gradientBorder: 'from-purple-400/60 via-purple-500/20 to-purple-400/60',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
      iconColor: 'text-purple-500',
      glowColor: 'group-hover:shadow-purple-500/20 dark:group-hover:shadow-purple-500/15',
    },
  ]

  return (
    <RevealSection>
      <section className="pb-16 md:pb-20 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Inicio <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Rapido</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comienza a construir en minutos con nuestras guias paso a paso.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', card.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  card.glowColor,
                )}>
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${card.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={cn(
                        'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                        'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                        card.iconBg,
                      )}>
                        <card.icon className={cn('h-6 w-6', card.iconColor)} />
                      </div>
                      <Badge
                        size="sm"
                        className={cn('text-[10px] font-bold uppercase tracking-wider border', card.difficultyColor)}
                      >
                        {card.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 relative z-10">
                      {card.description}
                    </p>

                    {/* Footer */}
                    <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{card.time}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs group/btn">
                        Leer
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
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
// SECTION 3 - CATEGORIES (3x2 Grid)
// ============================================================================

const CategoriesSection = () => {
  const categories = [
    {
      icon: Component,
      title: 'Componentes',
      description: 'Explora nuestra coleccion completa de componentes UI reutilizables y personalizables.',
      count: '40+ articulos',
      accentColor: '#3B82F6',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
    },
    {
      icon: Code2,
      title: 'API Reference',
      description: 'Documentacion detallada de todas las APIs, props y tipos disponibles en Pulse.',
      count: '25+ articulos',
      accentColor: '#6366F1',
      gradientBorder: 'from-indigo-400/60 via-indigo-500/20 to-indigo-400/60',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      iconColor: 'text-indigo-500',
      glowColor: 'group-hover:shadow-indigo-500/20 dark:group-hover:shadow-indigo-500/15',
    },
    {
      icon: Palette,
      title: 'Guias de Estilo',
      description: 'Aprende las mejores practicas de diseño y patrones de UI recomendados.',
      count: '18 articulos',
      accentColor: '#EC4899',
      gradientBorder: 'from-pink-400/60 via-pink-500/20 to-pink-400/60',
      iconBg: 'bg-pink-500/10 dark:bg-pink-500/15',
      iconColor: 'text-pink-500',
      glowColor: 'group-hover:shadow-pink-500/20 dark:group-hover:shadow-pink-500/15',
    },
    {
      icon: Paintbrush,
      title: 'Temas y Personalizacion',
      description: 'Personaliza colores, tipografia y estilos para adaptarlos a tu marca.',
      count: '12 articulos',
      accentColor: '#F59E0B',
      gradientBorder: 'from-amber-400/60 via-amber-500/20 to-amber-400/60',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
      iconColor: 'text-amber-500',
      glowColor: 'group-hover:shadow-amber-500/20 dark:group-hover:shadow-amber-500/15',
    },
    {
      icon: Puzzle,
      title: 'Integraciones',
      description: 'Conecta Pulse con herramientas populares como Stripe, Supabase y mas.',
      count: '15 articulos',
      accentColor: '#10B981',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
    },
    {
      icon: Users,
      title: 'Contribucion',
      description: 'Descubre como contribuir al proyecto, reportar bugs y proponer mejoras.',
      count: '8 articulos',
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
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-20" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Categorias de <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Documentacion</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explora nuestra documentacion organizada por temas para encontrar exactamente lo que necesitas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', cat.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  cat.glowColor,
                )}>
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${cat.accentColor}15 0%, transparent 70%)` }}
                    />

                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={cn(
                        'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                        'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                        cat.iconBg,
                      )}>
                        <cat.icon className={cn('h-6 w-6', cat.iconColor)} />
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        <FileText className="h-3 w-3" />
                        {cat.count}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 relative z-10">
                      {cat.description}
                    </p>

                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs group/btn relative z-10">
                      Explorar
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
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
// SECTION 4 - CODE EXAMPLE
// ============================================================================

const CodeExampleSection = () => {
  const [copied, setCopied] = React.useState(false)

  const codeLines = [
    { text: '# Instalar Pulse', isComment: true },
    { text: 'npm install @pulse-ui/core @pulse-ui/themes', isComment: false },
    { text: '', isComment: false },
    { text: '# Importar componentes', isComment: true },
    { text: "import { Button } from '@pulse-ui/core'", isComment: false },
    { text: "import { ThemeProvider } from '@pulse-ui/themes'", isComment: false },
    { text: '', isComment: false },
    { text: '# Usar en tu aplicacion', isComment: true },
    { text: 'export default function App() {', isComment: false },
    { text: '  return (', isComment: false },
    { text: '    <ThemeProvider theme="pulse">', isComment: false },
    { text: '      <Button variant="primary">', isComment: false },
    { text: '        Comenzar Ahora', isComment: false },
    { text: '      </Button>', isComment: false },
    { text: '    </ThemeProvider>', isComment: false },
    { text: '  )', isComment: false },
    { text: '}', isComment: false },
  ]

  const handleCopy = () => {
    const text = codeLines.map(l => l.text).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles className="opacity-20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div className="scroll-reveal-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-4">
                <Terminal className="h-3.5 w-3.5 text-primary-500" />
                <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">Ejemplo de Codigo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Comienza en <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Minutos</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Instala Pulse con un solo comando y comienza a usar componentes premium
                inmediatamente. Compatible con React 19, Next.js 16 y Tailwind v4.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  TypeScript nativo
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Tree-shaking
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  SSR ready
                </div>
              </div>
            </div>

            {/* Right code block */}
            <div className="scroll-reveal-right">
              <div className="relative rounded-2xl p-px bg-gradient-to-b from-slate-300/60 via-slate-200/20 to-slate-300/60 dark:from-slate-600/60 dark:via-slate-700/20 dark:to-slate-600/60">
                <div className="rounded-[15px] bg-slate-900 dark:bg-slate-950 overflow-hidden">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">terminal</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>

                  {/* Code content */}
                  <div className="p-4 font-mono text-sm leading-6 overflow-x-auto">
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="select-none text-slate-600 w-8 text-right mr-4 text-xs leading-6">
                          {i + 1}
                        </span>
                        <span className={line.isComment ? 'text-slate-500' : 'text-emerald-400'}>
                          {line.text}
                        </span>
                      </div>
                    ))}
                  </div>
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
// SECTION 5 - CTA
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
            No encuentras lo que buscas?
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Nuestro equipo y comunidad estan aqui para ayudarte. Abre un issue en GitHub
            o unete a nuestro Discord para soporte en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
              >
                <Github className="h-4 w-4" />
                Abrir Issue en GitHub
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
// DOCUMENTATION PAGE
// ============================================================================

export default function DocsPage() {
  return (
    <>
      <HeroSection />
      <QuickStartSection />
      <CategoriesSection />
      <CodeExampleSection />
      <CTASection />
    </>
  )
}
