'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Input } from '@core/primitives/Input'
import {
  HelpCircle,
  Search,
  Rocket,
  CreditCard,
  Component,
  Paintbrush,
  Cloud,
  Code2,
  Shield,
  UserCircle,
  Mail,
  MessageCircle,
  Users,
  Clock,
  Zap,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Phone,
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
        <defs><filter id="hc-glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="hc-ecg-glow" filter="url(#hc-glow)" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(20, 184, 154)" strokeWidth="4"/>
          <path className="hc-ecg-main" d="M 0,420 L 80,420 L 160,420 L 220,420 L 240,412 L 260,428 L 275,420 L 340,420 L 400,420 L 420,402 L 440,448 L 460,370 L 480,442 L 500,410 L 520,420 L 600,420 L 680,420 L 740,420 L 760,412 L 780,428 L 795,420 L 860,420 L 920,420 L 940,404 L 960,446 L 980,372 L 1000,440 L 1020,412 L 1040,420 L 1120,420 L 1200,420 L 1260,420 L 1280,412 L 1300,428 L 1315,420 L 1380,420 L 1440,420" stroke="rgb(94, 234, 212)" strokeWidth="1.2"/>
        </g>
      </svg>
      {/* ECG — Mobile */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs><filter id="hc-glow-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="hc-ecg-glow-m" filter="url(#hc-glow-m)" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(20, 184, 154)" strokeWidth="2"/>
          <path className="hc-ecg-main-m" d="M 0,220 L 50,220 L 100,220 L 140,220 L 150,216 L 160,224 L 167,220 L 200,220 L 240,220 L 252,212 L 264,230 L 276,200 L 288,228 L 300,216 L 312,220 L 360,220 L 410,220 L 500,220" stroke="rgb(94, 234, 212)" strokeWidth="0.7"/>
        </g>
      </svg>
      <style>{`
        .hc-ecg-main { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: hc-draw 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .hc-ecg-glow { stroke-dasharray: 2800; stroke-dashoffset: 2800; animation: hc-glow-a 16s cubic-bezier(0.4,0,0.2,1) infinite; }
        .hc-ecg-main-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: hc-draw-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        .hc-ecg-glow-m { stroke-dasharray: 800; stroke-dashoffset: 800; animation: hc-glow-m 12s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes hc-draw { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 40% { stroke-dashoffset: 2800; opacity: 0.05; } 43% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes hc-glow-a { 0% { stroke-dashoffset: 2800; opacity: 0; } 3% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 40% { stroke-dashoffset: 2800; opacity: 0.02; } 43% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes hc-draw-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.22; } 35% { stroke-dashoffset: 0; opacity: 0.18; } 42% { stroke-dashoffset: 800; opacity: 0.05; } 45% { opacity: 0.22; } 75% { stroke-dashoffset: 0; opacity: 0.16; } 85% { stroke-dashoffset: 0; opacity: 0.04; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes hc-glow-m { 0% { stroke-dashoffset: 800; opacity: 0; } 5% { opacity: 0.10; } 35% { stroke-dashoffset: 0; opacity: 0.08; } 42% { stroke-dashoffset: 800; opacity: 0.02; } 45% { opacity: 0.10; } 75% { stroke-dashoffset: 0; opacity: 0.06; } 85% { stroke-dashoffset: 0; opacity: 0.015; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hc-ecg-main, .hc-ecg-glow, .hc-ecg-main-m, .hc-ecg-glow-m { animation: none !important; } }
      `}</style>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <HelpCircle className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Centro de Ayuda</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-slate-900 dark:text-white">Como podemos </span>
          <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
            ayudarte?
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Encuentra respuestas rapidas, contacta a nuestro equipo de soporte
          o explora nuestros recursos para resolver cualquier duda.
        </p>

        {/* Prominent Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Escribe tu pregunta aqui..."
            className="pl-14 pr-4 h-14 text-base rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30"
          />
          <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 gap-1.5">
            <Search className="h-3.5 w-3.5" />
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - POPULAR TOPICS (2x4 Grid)
// ============================================================================

const PopularTopicsSection = () => {
  const topics = [
    {
      icon: Rocket,
      title: 'Primeros Pasos',
      description: 'Aprende a instalar y configurar Pulse en tu proyecto.',
      accentColor: '#10B981',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
    },
    {
      icon: CreditCard,
      title: 'Facturacion',
      description: 'Gestiona tu suscripcion, pagos y facturas facilmente.',
      accentColor: '#3B82F6',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
    },
    {
      icon: Component,
      title: 'Componentes',
      description: 'Documentacion de todos los componentes UI disponibles.',
      accentColor: '#8B5CF6',
      iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
      iconColor: 'text-violet-500',
    },
    {
      icon: Paintbrush,
      title: 'Tematizacion',
      description: 'Personaliza colores, fuentes y estilos de tu aplicacion.',
      accentColor: '#EC4899',
      iconBg: 'bg-pink-500/10 dark:bg-pink-500/15',
      iconColor: 'text-pink-500',
    },
    {
      icon: Cloud,
      title: 'Despliegue',
      description: 'Guias para desplegar en Vercel, AWS y otras plataformas.',
      accentColor: '#06B6D4',
      iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      iconColor: 'text-cyan-500',
    },
    {
      icon: Code2,
      title: 'API',
      description: 'Referencia completa de la API y hooks disponibles.',
      accentColor: '#6366F1',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      iconColor: 'text-indigo-500',
    },
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Buenas practicas de seguridad y proteccion de datos.',
      accentColor: '#F59E0B',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
      iconColor: 'text-amber-500',
    },
    {
      icon: UserCircle,
      title: 'Cuenta',
      description: 'Administra tu perfil, equipo y configuracion de cuenta.',
      accentColor: '#EF4444',
      iconBg: 'bg-red-500/10 dark:bg-red-500/15',
      iconColor: 'text-red-500',
    },
  ]

  return (
    <RevealSection>
      <section className="pb-16 md:pb-20 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Temas <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Populares</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explora las categorias mas consultadas por nuestros usuarios.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map((topic, i) => (
              <div
                key={topic.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={cn(
                  'group relative overflow-hidden rounded-xl border cursor-pointer',
                  'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
                  'hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50',
                  'hover:-translate-y-1 transition-all duration-300',
                )}>
                  <div className="p-5">
                    <div className={cn(
                      'inline-flex items-center justify-center h-10 w-10 rounded-lg mb-3',
                      topic.iconBg,
                    )}>
                      <topic.icon className={cn('h-5 w-5', topic.iconColor)} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <div className="h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to right, ${topic.accentColor}, ${topic.accentColor}80)` }} />
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
// SECTION 3 - CONTACT OPTIONS
// ============================================================================

const ContactOptionsSection = () => {
  const options = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Enviaanos un correo electronico y recibiras una respuesta detallada de nuestro equipo de soporte.',
      responseTime: '24h',
      responseLabel: 'Tiempo de respuesta',
      accentColor: '#3B82F6',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    },
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Conecta con un agente de soporte en tiempo real para resolver tus dudas al instante.',
      responseTime: 'Instantaneo',
      responseLabel: 'Tiempo de respuesta',
      accentColor: '#10B981',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Obtén ayuda de otros desarrolladores en nuestro foro comunitario y canal de Discord.',
      responseTime: 'Peer support',
      responseLabel: 'Tipo de soporte',
      accentColor: '#8B5CF6',
      gradientBorder: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
      iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
      iconColor: 'text-violet-500',
      glowColor: 'group-hover:shadow-violet-500/20 dark:group-hover:shadow-violet-500/15',
      badgeColor: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border-violet-200 dark:border-violet-500/20',
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
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Opciones de <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Contacto</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Elige el canal que mejor se adapte a tu necesidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {options.map((option, i) => (
              <div
                key={option.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', option.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  option.glowColor,
                )}>
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${option.accentColor}15 0%, transparent 70%)` }}
                    />

                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={cn(
                        'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                        'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                        option.iconBg,
                      )}>
                        <option.icon className={cn('h-6 w-6', option.iconColor)} />
                      </div>
                      <Badge
                        size="sm"
                        className={cn('text-[10px] font-bold uppercase tracking-wider border', option.badgeColor)}
                      >
                        {option.responseTime}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      {option.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 relative z-10">
                      {option.description}
                    </p>

                    <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {option.responseLabel}
                        </span>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs group/btn">
                          Contactar
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                        </Button>
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
// SECTION 4 - FAQ ACCORDION
// ============================================================================

const faqItems = [
  {
    question: 'Que es Pulse y para quien esta diseñado?',
    answer: 'Pulse es un kit de desarrollo UI premium construido con React 19, Next.js 16 y Tailwind v4. Esta diseñado para desarrolladores y equipos que necesitan construir aplicaciones web modernas con componentes de alta calidad, dashboards y paginas de marketing.',
  },
  {
    question: 'Puedo usar Pulse en proyectos comerciales?',
    answer: 'Si, absolutamente. La licencia de Pulse permite el uso en proyectos comerciales ilimitados. Una vez que compras la licencia, puedes usar todos los componentes y plantillas en tantos proyectos como necesites sin restricciones.',
  },
  {
    question: 'Como actualizo Pulse a la ultima version?',
    answer: 'Puedes actualizar Pulse ejecutando npm update @pulse-ui/core o yarn upgrade @pulse-ui/core. Recomendamos revisar el changelog antes de actualizar para estar al tanto de los cambios importantes y posibles breaking changes.',
  },
  {
    question: 'Pulse es compatible con TypeScript?',
    answer: 'Si, Pulse esta construido nativamente con TypeScript. Todos los componentes incluyen tipos completos, interfaces exportadas y soporte para autocompletado en tu IDE favorito. No necesitas configuracion adicional.',
  },
  {
    question: 'Ofrecen soporte tecnico personalizado?',
    answer: 'Si, ofrecemos soporte tecnico a traves de email con tiempo de respuesta de 24 horas, chat en vivo para consultas urgentes, y acceso a nuestra comunidad de Discord donde puedes obtener ayuda de otros desarrolladores.',
  },
  {
    question: 'Puedo personalizar los componentes de Pulse?',
    answer: 'Por supuesto. Pulse esta diseñado para ser altamente personalizable. Puedes modificar colores, tipografia, espaciado y estilos usando CSS variables y el sistema de temas integrado. Tambien puedes extender componentes con tus propias variantes.',
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles className="opacity-20" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-4">
              <HelpCircle className="h-3.5 w-3.5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">FAQ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Preguntas <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Frecuentes</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Respuestas a las preguntas mas comunes sobre Pulse.
            </p>
          </div>

          <div className="space-y-3 scroll-reveal">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-xl border overflow-hidden transition-all duration-300',
                    isOpen
                      ? 'border-primary-200 dark:border-primary-500/30 shadow-lg shadow-primary-500/5'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  )}
                >
                  <div className={cn(
                    'transition-colors duration-200',
                    isOpen ? 'bg-primary-50/50 dark:bg-primary-500/5' : 'bg-white dark:bg-slate-900'
                  )}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex items-center justify-between w-full px-5 py-4 text-left"
                    >
                      <span className={cn(
                        'text-sm font-medium pr-4 transition-colors',
                        isOpen ? 'text-primary-700 dark:text-primary-400' : 'text-slate-900 dark:text-white'
                      )}>
                        {item.question}
                      </span>
                      <div className={cn(
                        'flex items-center justify-center h-6 w-6 rounded-full shrink-0 transition-all duration-200',
                        isOpen
                          ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rotate-180'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      )}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="px-5 pb-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.answer}
                        </p>
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
            Necesitas ayuda personalizada?
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Nuestro equipo de expertos esta listo para ayudarte con cualquier
            desafio tecnico. Agenda una llamada con nuestro equipo de ventas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
            >
              <Phone className="h-4 w-4" />
              Contactar Ventas
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
            >
              <Mail className="h-4 w-4" />
              Enviar Email
            </Button>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// HELP CENTER PAGE
// ============================================================================

export default function HelpPage() {
  return (
    <>
      <HeroSection />
      <PopularTopicsSection />
      <ContactOptionsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
