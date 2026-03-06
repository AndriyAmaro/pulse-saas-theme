'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Puzzle,
  MessageSquare,
  Github,
  CreditCard,
  BarChart3,
  Cloud,
  FileText,
  Palette,
  LayoutGrid,
  Phone,
  Mail,
  Zap,
  Users,
  ArrowRight,
  Link2,
  Settings,
  Rocket,
  BookOpen,
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
// INTEGRATION DATA
// ============================================================================

type Category = 'Todos' | 'Comunicacion' | 'Desarrollo' | 'Pagos' | 'Analitica' | 'Almacenamiento' | 'Productividad' | 'Automatizacion' | 'Marketing'

interface Integration {
  name: string
  description: string
  icon: React.ElementType
  category: Category
  accentColor: string
  gradient: string
  iconBg: string
  iconColor: string
}

const integrations: Integration[] = [
  {
    name: 'Slack',
    description: 'Recibe notificaciones en tiempo real y gestiona alertas directamente desde tus canales de Slack.',
    icon: MessageSquare,
    category: 'Comunicacion',
    accentColor: '#E01E5A',
    gradient: 'from-rose-400/60 via-rose-500/20 to-rose-400/60',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    iconColor: 'text-rose-500',
  },
  {
    name: 'GitHub',
    description: 'Sincroniza repositorios, automatiza despliegues y rastrea issues desde tu dashboard.',
    icon: Github,
    category: 'Desarrollo',
    accentColor: '#6366F1',
    gradient: 'from-indigo-400/60 via-indigo-500/20 to-indigo-400/60',
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    iconColor: 'text-indigo-500',
  },
  {
    name: 'Stripe',
    description: 'Procesa pagos, gestiona suscripciones y visualiza metricas financieras en tiempo real.',
    icon: CreditCard,
    category: 'Pagos',
    accentColor: '#6772E5',
    gradient: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    iconColor: 'text-violet-500',
  },
  {
    name: 'Google Analytics',
    description: 'Importa datos de trafico, conversiones y comportamiento de usuarios automaticamente.',
    icon: BarChart3,
    category: 'Analitica',
    accentColor: '#F59E0B',
    gradient: 'from-amber-400/60 via-amber-500/20 to-amber-400/60',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconColor: 'text-amber-500',
  },
  {
    name: 'AWS S3',
    description: 'Almacena y gestiona archivos en la nube con sincronizacion automatica y backups.',
    icon: Cloud,
    category: 'Almacenamiento',
    accentColor: '#F97316',
    gradient: 'from-orange-400/60 via-orange-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-500',
  },
  {
    name: 'Notion',
    description: 'Conecta tu base de conocimiento y sincroniza documentos y wikis del equipo.',
    icon: FileText,
    category: 'Productividad',
    accentColor: '#000000',
    gradient: 'from-slate-400/60 via-slate-500/20 to-slate-400/60',
    iconBg: 'bg-slate-500/10 dark:bg-slate-400/15',
    iconColor: 'text-slate-700 dark:text-slate-300',
  },
  {
    name: 'Figma',
    description: 'Importa componentes de diseno, sincroniza tokens y mantiene tu design system actualizado.',
    icon: Palette,
    category: 'Desarrollo',
    accentColor: '#A259FF',
    gradient: 'from-purple-400/60 via-purple-500/20 to-purple-400/60',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
    iconColor: 'text-purple-500',
  },
  {
    name: 'Jira',
    description: 'Sincroniza tickets, sprints y roadmaps para una gestion de proyectos unificada.',
    icon: LayoutGrid,
    category: 'Productividad',
    accentColor: '#0052CC',
    gradient: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Twilio',
    description: 'Envia SMS, notificaciones push y gestiona comunicaciones omnicanal.',
    icon: Phone,
    category: 'Comunicacion',
    accentColor: '#F22F46',
    gradient: 'from-red-400/60 via-red-500/20 to-red-400/60',
    iconBg: 'bg-red-500/10 dark:bg-red-500/15',
    iconColor: 'text-red-500',
  },
  {
    name: 'Mailchimp',
    description: 'Automatiza campanas de email marketing y sincroniza listas de contactos.',
    icon: Mail,
    category: 'Marketing',
    accentColor: '#FFE01B',
    gradient: 'from-yellow-400/60 via-yellow-500/20 to-yellow-400/60',
    iconBg: 'bg-yellow-500/10 dark:bg-yellow-500/15',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    name: 'Zapier',
    description: 'Conecta miles de apps y crea flujos de trabajo automatizados sin codigo.',
    icon: Zap,
    category: 'Automatizacion',
    accentColor: '#FF4A00',
    gradient: 'from-orange-400/60 via-orange-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-500',
  },
  {
    name: 'HubSpot',
    description: 'Integra tu CRM, automatiza ventas y centraliza la gestion de clientes.',
    icon: Users,
    category: 'Marketing',
    accentColor: '#FF7A59',
    gradient: 'from-orange-400/60 via-rose-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-500',
  },
]

const categories: Category[] = [
  'Todos',
  'Comunicacion',
  'Desarrollo',
  'Pagos',
  'Analitica',
  'Almacenamiento',
  'Productividad',
  'Automatizacion',
  'Marketing',
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
          <Puzzle className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Integraciones</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Conecta con tus herramientas{' '}
          <span className="bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            favoritas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Integra Pulse con las herramientas que ya usas. Automatiza flujos de trabajo, centraliza datos y potencia la productividad de tu equipo.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - INTEGRATIONS GRID
// ============================================================================

const IntegrationsGridSection = () => {
  const [activeCategory, setActiveCategory] = React.useState<Category>('Todos')

  const filteredIntegrations = activeCategory === 'Todos'
    ? integrations
    : integrations.filter((i) => i.category === activeCategory)

  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Integraciones populares
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explora nuestro ecosistema de integraciones y conecta las herramientas que impulsan tu negocio.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 scroll-reveal">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Integration cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIntegrations.map((integration, i) => (
              <div
                key={integration.name}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Gradient border wrapper */}
                <div
                  className={cn(
                    'group relative rounded-2xl p-px overflow-hidden',
                    'bg-gradient-to-b',
                    integration.gradient,
                    'hover:shadow-2xl transition-all duration-500',
                  )}
                >
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner gradient glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${integration.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Icon */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div
                        className={cn(
                          'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                          'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                          integration.iconBg,
                        )}
                      >
                        <integration.icon className={cn('h-6 w-6', integration.iconColor)} />
                      </div>
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide',
                          'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
                        )}
                      >
                        {integration.category}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {integration.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                      {integration.description}
                    </p>

                    {/* Connect link */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 relative z-10">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all duration-300">
                        Conectar
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
// SECTION 3 - HOW IT WORKS
// ============================================================================

const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Conecta',
      description: 'Selecciona la integracion que necesitas y autoriza la conexion con un solo clic. Sin configuraciones complicadas.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      number: '02',
      icon: Settings,
      title: 'Configura',
      description: 'Personaliza los flujos de datos, define reglas y mapea los campos entre plataformas segun tus necesidades.',
      gradient: 'from-primary-400 to-primary-600',
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Automatiza',
      description: 'Deja que Pulse sincronice todo automaticamente. Monitorea el estado de cada integracion desde tu dashboard.',
      gradient: 'from-emerald-400 to-emerald-600',
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
              Como funciona
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Integrar tus herramientas con Pulse es rapido y sencillo. Solo tres pasos para empezar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-300 via-primary-300 to-emerald-300 dark:from-blue-600 dark:via-primary-600 dark:to-emerald-600" />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="scroll-reveal-scale relative"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-center">
                  {/* Step number circle */}
                  <div className="relative inline-flex mb-6">
                    <div
                      className={cn(
                        'inline-flex items-center justify-center h-16 w-16 rounded-2xl',
                        'bg-gradient-to-br text-white shadow-lg',
                        step.gradient,
                      )}
                    >
                      <step.icon className="h-7 w-7" />
                    </div>
                    <span
                      className={cn(
                        'absolute -top-2 -right-2 inline-flex items-center justify-center',
                        'h-7 w-7 rounded-full text-xs font-bold',
                        'bg-white dark:bg-slate-800 text-slate-900 dark:text-white',
                        'shadow-md ring-2 ring-white dark:ring-slate-800',
                      )}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-10 md:p-16 text-center">
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            {/* Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-400" />
                <span className="text-sm font-semibold text-primary-300">API Abierta</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Construye tu propia integracion
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
                Nuestra API RESTful y webhooks te permiten crear integraciones personalizadas. Documentacion completa, SDKs y soporte dedicado.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 gap-2 px-8 animate-glow-pulse"
                >
                  <BookOpen className="h-4 w-4" />
                  Ver documentacion API
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 gap-2 px-8"
                >
                  <Mail className="h-4 w-4" />
                  Contactar ventas
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
// INTEGRATIONS PAGE
// ============================================================================

export default function IntegrationsPage() {
  return (
    <>
      <HeroSection />
      <IntegrationsGridSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
