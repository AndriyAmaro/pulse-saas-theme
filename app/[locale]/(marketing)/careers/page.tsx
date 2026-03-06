'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  Sparkles,
  Lightbulb,
  Users,
  TrendingUp,
  Scale,
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  Wifi,
  Heart,
  BookOpen,
  Timer,
  Plane,
  DollarSign,
  Send,
  Code2,
  Palette,
  Package,
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
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-orb-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/5 rounded-full blur-3xl animate-orb" />
      </div>

      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Briefcase className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Carreras</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Unete al Equipo{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
            Pulse
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Estamos construyendo el futuro del SaaS. Buscamos personas apasionadas
          que quieran crear productos excepcionales y transformar la forma en que
          las empresas operan.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - CULTURE / VALUES
// ============================================================================

const CultureSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovacion',
      description: 'Exploramos nuevas ideas constantemente. Cada miembro del equipo tiene la libertad de experimentar y proponer soluciones creativas.',
      gradient: 'from-amber-400 to-amber-600',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
      iconColor: 'text-amber-500',
    },
    {
      icon: Users,
      title: 'Colaboracion',
      description: 'Trabajamos juntos, sin silos. La comunicacion abierta y la transparencia son la base de todo lo que hacemos.',
      gradient: 'from-blue-400 to-blue-600',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento',
      description: 'Invertimos en el desarrollo profesional de cada persona. Aprender es parte del trabajo, no un extra.',
      gradient: 'from-emerald-400 to-emerald-600',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Scale,
      title: 'Equilibrio',
      description: 'Creemos que el mejor trabajo surge cuando las personas estan descansadas y motivadas. Respetamos tu tiempo personal.',
      gradient: 'from-purple-400 to-purple-600',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
      iconColor: 'text-purple-500',
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
              Nuestros Valores
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Los principios que guian cada decision que tomamos como equipo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-slate-400/20 to-slate-400/5 hover:shadow-xl transition-all duration-500">
                  {/* Inner card */}
                  <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full">
                    <div className={cn(
                      'inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4',
                      'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                      value.iconBg,
                    )}>
                      <value.icon className={cn('h-6 w-6', value.iconColor)} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {value.description}
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
// SECTION 3 - OPEN POSITIONS
// ============================================================================

const OpenPositionsSection = () => {
  const positions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Ingenieria',
      departmentIcon: Code2,
      description: 'React, Next.js, TypeScript y Tailwind CSS. Construiras interfaces de usuario de alto rendimiento para nuestra plataforma SaaS.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
      title: 'Backend Engineer',
      department: 'Ingenieria',
      departmentIcon: Code2,
      description: 'Node.js, PostgreSQL y arquitectura de microservicios. Diseraras APIs escalables y sistemas de datos robustos.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
      title: 'UI/UX Designer',
      department: 'Diseno',
      departmentIcon: Palette,
      description: 'Figma, prototipos interactivos y research de usuario. Crearas experiencias intuitivas y visualmente impactantes.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    },
    {
      title: 'Design System Lead',
      department: 'Diseno',
      departmentIcon: Palette,
      description: 'Lideraras la evolucion de nuestro design system, asegurando consistencia y escalabilidad en todos los productos.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    },
    {
      title: 'Product Manager',
      department: 'Producto',
      departmentIcon: Package,
      description: 'Definiras la vision del producto, priorizaras el roadmap y trabajaras con ingenieria y diseno para entregar valor.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      title: 'Developer Advocate',
      department: 'Producto',
      departmentIcon: Package,
      description: 'Seras la voz de nuestra comunidad de desarrolladores, creando contenido tecnico, tutoriales y demos.',
      location: 'Remoto',
      type: 'Tiempo Completo',
      departmentColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
  ]

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Posiciones Abiertas
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Encuentra tu lugar en nuestro equipo. Todas las posiciones son remotas.
            </p>
          </div>

          <div className="grid gap-4">
            {positions.map((position, i) => (
              <div
                key={position.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-slate-400/20 to-slate-400/5 hover:shadow-xl hover:from-primary-400/30 hover:to-primary-400/5 transition-all duration-500 group">
                  {/* Inner card */}
                  <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Left: position info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {position.title}
                          </h3>
                          <Badge variant="primary" size="sm" className={position.departmentColor}>
                            {position.department}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 sm:mb-0">
                          {position.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                            <MapPin className="h-3.5 w-3.5" />
                            {position.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                            <Clock className="h-3.5 w-3.5" />
                            {position.type}
                          </span>
                        </div>
                      </div>

                      {/* Right: apply button */}
                      <div className="flex-shrink-0">
                        <Button className="gap-2 w-full sm:w-auto">
                          Aplicar
                          <ArrowRight className="h-4 w-4" />
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
// SECTION 4 - BENEFITS
// ============================================================================

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Wifi,
      title: 'Remote-first',
      description: 'Trabaja desde donde quieras. Nuestro equipo esta distribuido por todo el mundo.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: DollarSign,
      title: 'Stock Options',
      description: 'Todos los empleados reciben equity. Tu exito es nuestro exito.',
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: Heart,
      title: 'Salud Completa',
      description: 'Seguro medico, dental y de vision para ti y tu familia.',
      gradient: 'from-rose-400 to-rose-600',
    },
    {
      icon: BookOpen,
      title: 'Presupuesto de Aprendizaje',
      description: '$2,000/ano para cursos, conferencias, libros y certificaciones.',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: Timer,
      title: 'Horario Flexible',
      description: 'Organiza tu dia como mejor te funcione. Confiamos en tu criterio.',
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      icon: Plane,
      title: 'Team Retreats',
      description: 'Dos retiros al ano en destinos increibles para conectar como equipo.',
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
              Beneficios
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Cuidamos a nuestro equipo con beneficios que realmente importan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-slate-400/20 to-slate-400/5 hover:shadow-xl transition-all duration-500 group">
                  {/* Inner card */}
                  <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full">
                    <div className={cn(
                      'inline-flex items-center justify-center h-10 w-10 rounded-lg mb-4',
                      'bg-gradient-to-br text-white shadow-lg',
                      benefit.gradient,
                    )}>
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
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
// SECTION 5 - CTA
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
              <Sparkles className="h-8 w-8 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No ves tu puesto ideal?
              </h2>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
                Siempre estamos buscando talento excepcional. Envia tu candidatura
                espontanea y cuentanos como puedes contribuir al equipo Pulse.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 gap-2 px-8 animate-glow-pulse"
              >
                <Send className="h-4 w-4" />
                Candidatura Espontanea
              </Button>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// CAREERS PAGE
// ============================================================================

export default function CareersPage() {
  return (
    <>
      <HeroSection />
      <CultureSection />
      <OpenPositionsSection />
      <BenefitsSection />
      <CtaSection />
    </>
  )
}
