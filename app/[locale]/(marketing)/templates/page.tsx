'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  LayoutTemplate,
  Smartphone,
  Moon,
  Globe,
  Code2,
  Eye,
  Download,
  ArrowRight,
  Sparkles,
  Mail,
  Rocket,
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
// TEMPLATE DATA
// ============================================================================

interface Template {
  name: string
  description: string
  gradient: string
  gradientBorder: string
  techBadges: string[]
  price: string | null
  accentColor: string
}

const templates: Template[] = [
  {
    name: 'SaaS Dashboard',
    description: 'Dashboard completo para aplicaciones SaaS con metricas, graficos y gestion de usuarios en tiempo real.',
    gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Prisma'],
    price: null,
    accentColor: '#3B82F6',
  },
  {
    name: 'E-commerce Admin',
    description: 'Panel de administracion para tiendas online con inventario, pedidos, clientes y analitica de ventas.',
    gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
    gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Stripe'],
    price: '$49',
    accentColor: '#10B981',
  },
  {
    name: 'CRM Platform',
    description: 'Plataforma de gestion de relaciones con clientes. Pipelines, contactos, tareas y reportes avanzados.',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    gradientBorder: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Prisma'],
    price: '$59',
    accentColor: '#8B5CF6',
  },
  {
    name: 'Healthcare Portal',
    description: 'Portal medico con gestion de pacientes, citas, historial clinico y dashboards de indicadores de salud.',
    gradient: 'from-rose-500 via-pink-600 to-rose-700',
    gradientBorder: 'from-rose-400/60 via-rose-500/20 to-rose-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Prisma'],
    price: '$69',
    accentColor: '#F43F5E',
  },
  {
    name: 'Finance Dashboard',
    description: 'Dashboard financiero con graficos interactivos, transacciones, presupuestos y proyecciones avanzadas.',
    gradient: 'from-amber-500 via-orange-600 to-amber-700',
    gradientBorder: 'from-amber-400/60 via-amber-500/20 to-amber-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Chart.js'],
    price: '$49',
    accentColor: '#F59E0B',
  },
  {
    name: 'Education LMS',
    description: 'Sistema de gestion de aprendizaje con cursos, lecciones, quizzes, progreso de estudiantes y certificados.',
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    gradientBorder: 'from-cyan-400/60 via-cyan-500/20 to-cyan-400/60',
    techBadges: ['Next.js', 'Tailwind', 'Prisma'],
    price: null,
    accentColor: '#06B6D4',
  },
]

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <LayoutTemplate className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Templates</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Plantillas{' '}
          <span className="bg-gradient-to-r from-primary-400 via-blue-500 to-accent-500 dark:from-primary-300 dark:via-blue-400 dark:to-accent-400 bg-clip-text text-transparent">
            Premium
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Plantillas listas para usar, disenadas con las mejores practicas. Acelera tu desarrollo con templates profesionales y completamente personalizables.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - TEMPLATES GRID
// ============================================================================

const TemplatesGridSection = () => {
  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Explora nuestras plantillas
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Cada template esta construido con codigo limpio, es responsive y cuenta con soporte completo para modo oscuro.
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, i) => (
              <div
                key={template.name}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient border wrapper */}
                <div
                  className={cn(
                    'group relative rounded-2xl p-px overflow-hidden',
                    'bg-gradient-to-b',
                    template.gradientBorder,
                    'hover:shadow-2xl transition-all duration-500',
                  )}
                >
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner gradient glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${template.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Gradient thumbnail placeholder */}
                    <div
                      className={cn(
                        'relative w-full h-40 rounded-xl mb-5 overflow-hidden bg-gradient-to-br',
                        template.gradient,
                      )}
                    >
                      {/* Mock UI elements */}
                      <div className="absolute inset-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                        <div className="h-3 w-16 bg-white/30 rounded-full m-3" />
                        <div className="flex gap-2 mx-3 mt-2">
                          <div className="h-8 flex-1 bg-white/15 rounded-md" />
                          <div className="h-8 flex-1 bg-white/15 rounded-md" />
                        </div>
                        <div className="h-12 mx-3 mt-2 bg-white/10 rounded-md" />
                      </div>

                      {/* Price badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={cn(
                            'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg',
                            template.price
                              ? 'bg-white text-slate-900'
                              : 'bg-emerald-500 text-white',
                          )}
                        >
                          {template.price ?? 'Gratis'}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {template.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 mb-4">
                      {template.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                      {template.techBadges.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Vista Previa
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Usar Template
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
// SECTION 3 - FEATURES
// ============================================================================

const FeaturesSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Responsive',
      description: 'Adaptado perfectamente a todos los dispositivos, desde moviles hasta pantallas grandes.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Soporte completo de modo oscuro con transiciones suaves y persistencia de preferencias.',
      gradient: 'from-violet-400 to-violet-600',
    },
    {
      icon: Globe,
      title: 'i18n Ready',
      description: 'Preparado para internacionalizacion con next-intl y soporte para multiples idiomas.',
      gradient: 'from-primary-400 to-primary-600',
    },
    {
      icon: Code2,
      title: 'TypeScript',
      description: 'Tipado completo con TypeScript para una experiencia de desarrollo robusta y segura.',
      gradient: 'from-cyan-400 to-cyan-600',
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
              Todas las plantillas incluyen
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Cada template viene con las mejores practicas de desarrollo integradas desde el primer momento.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="scroll-reveal-scale text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon */}
                <div className="relative inline-flex mb-5">
                  <div
                    className={cn(
                      'inline-flex items-center justify-center h-14 w-14 rounded-2xl',
                      'bg-gradient-to-br text-white shadow-lg',
                      feature.gradient,
                    )}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-10 md:p-16 text-center noise-overlay">
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            {/* Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span className="text-sm font-semibold text-white">Personalizado</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Necesitas un template personalizado?
              </h2>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
                Nuestro equipo puede crear una plantilla a medida para tu proyecto. Diseno exclusivo, componentes personalizados y soporte dedicado.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
                >
                  <Mail className="h-4 w-4" />
                  Contactar equipo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 px-8"
                >
                  <Rocket className="h-4 w-4" />
                  Ver todos los templates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// TEMPLATES PAGE
// ============================================================================

export default function TemplatesPage() {
  return (
    <>
      <HeroSection />
      <TemplatesGridSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
