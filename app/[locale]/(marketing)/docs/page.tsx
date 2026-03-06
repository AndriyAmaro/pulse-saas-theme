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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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
        {/* Orbs */}
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-orb-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/5 rounded-full blur-3xl animate-orb" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />
      </div>

      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <BookOpen className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Documentacion</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Centro de Documentacion
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
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
              Inicio Rapido
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
              Categorias de Documentacion
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
                Comienza en Minutos
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
