'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Shield,
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Server,
  Cloud,
  Clock,
  Eye,
  Bug,
  Mail,
  CheckCircle,
  AlertTriangle,
  Globe,
  Database,
  Layers,
  ArrowRight,
  Zap,
  Activity,
  RefreshCw,
  ExternalLink,
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
// FLOATING PARTICLES
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
// SECURITY FEATURES DATA
// ============================================================================

const securityFeatures = [
  {
    icon: Lock,
    title: 'Cifrado AES-256',
    description: 'Todos los datos se cifran en reposo con AES-256 y en transito con TLS 1.3. Sus datos estan protegidos con el estandar de cifrado mas robusto disponible.',
    highlights: ['Cifrado en reposo (AES-256)', 'Cifrado en transito (TLS 1.3)', 'Rotacion automatica de claves'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Fingerprint,
    title: 'Autenticacion Multi-Factor',
    description: 'Proteja su cuenta con multiples capas de verificacion. Soporte para aplicaciones de autenticacion, llaves de seguridad y biometria.',
    highlights: ['TOTP (Google Authenticator)', 'Llaves de seguridad FIDO2/WebAuthn', 'Verificacion biometrica'],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II',
    description: 'Cumplimiento verificado por auditoria independiente. Nuestros controles de seguridad, disponibilidad y confidencialidad son evaluados continuamente.',
    highlights: ['Auditoria anual independiente', 'Controles de seguridad continuos', 'Informes disponibles bajo NDA'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: RefreshCw,
    title: 'Backups Automaticos',
    description: 'Respaldos automaticos cada 6 horas con retencion de 90 dias. Recuperacion ante desastres con RPO de 6 horas y RTO de 1 hora.',
    highlights: ['Cada 6 horas automaticamente', 'Retencion de 90 dias', 'Recuperacion geo-redundante'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Activity,
    title: 'Monitoreo 24/7',
    description: 'Deteccion de amenazas en tiempo real con inteligencia artificial. Nuestro equipo de seguridad responde a alertas las 24 horas del dia, los 7 dias de la semana.',
    highlights: ['Deteccion de anomalias con IA', 'Alertas en tiempo real', 'Equipo de respuesta dedicado'],
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Bug,
    title: 'Penetration Testing',
    description: 'Pruebas de penetracion anuales realizadas por terceros independientes. Programa de recompensas por vulnerabilidades activo todo el ano.',
    highlights: ['Pruebas anuales por terceros', 'Programa de bug bounty', 'Escaneo continuo de vulnerabilidades'],
    color: 'from-primary-500 to-emerald-500',
  },
]

// ============================================================================
// INFRASTRUCTURE LAYERS DATA
// ============================================================================

const infrastructureLayers = [
  {
    icon: Globe,
    title: 'CDN / WAF',
    description: 'Primera linea de defensa',
    measures: [
      'Cloudflare Enterprise WAF',
      'Proteccion DDoS automatica',
      'Rate limiting inteligente',
      'Reglas de firewall personalizadas',
      'SSL/TLS terminacion en el edge',
    ],
    color: 'border-blue-500/30 bg-blue-500/5',
    iconColor: 'text-blue-500',
  },
  {
    icon: Layers,
    title: 'Load Balancer',
    description: 'Distribucion y redundancia',
    measures: [
      'Balanceo multi-zona',
      'Health checks automaticos',
      'Auto-scaling horizontal',
      'Failover automatico',
      'Session persistence segura',
    ],
    color: 'border-purple-500/30 bg-purple-500/5',
    iconColor: 'text-purple-500',
  },
  {
    icon: Server,
    title: 'Aplicacion',
    description: 'Logica de negocio protegida',
    measures: [
      'Contenedores aislados',
      'Secretos en vault encriptado',
      'Dependencias auditadas (Snyk)',
      'Principio de minimo privilegio',
      'Logging y trazabilidad completa',
    ],
    color: 'border-emerald-500/30 bg-emerald-500/5',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Database,
    title: 'Base de Datos',
    description: 'Datos cifrados y protegidos',
    measures: [
      'Cifrado AES-256 en reposo',
      'Conexiones TLS obligatorias',
      'Backups cifrados automaticos',
      'Acceso via redes privadas (VPC)',
      'Auditoria de queries sensibles',
    ],
    color: 'border-amber-500/30 bg-amber-500/5',
    iconColor: 'text-amber-500',
  },
]

// ============================================================================
// COMPLIANCE DATA
// ============================================================================

const complianceBadges = [
  { name: 'SOC 2 Type II', description: 'Auditoria de controles de seguridad, disponibilidad y confidencialidad', status: 'Certificado', statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'GDPR', description: 'Reglamento General de Proteccion de Datos de la Union Europea', status: 'Certificado', statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'HIPAA', description: 'Ley de Portabilidad y Responsabilidad de Seguros de Salud', status: 'En Proceso', statusColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
  { name: 'ISO 27001', description: 'Estandar internacional de gestion de seguridad de la informacion', status: 'Certificado', statusColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'PCI DSS', description: 'Estandar de seguridad de datos de la industria de tarjetas de pago', status: 'En Proceso', statusColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
]

// ============================================================================
// SECURITY PAGE
// ============================================================================

export default function SecurityPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950" />
          <FloatingParticles />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="scroll-reveal inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-primary-200 dark:border-primary-500/20 bg-primary-50 dark:bg-primary-500/10">
                <Shield className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Seguridad</span>
              </div>
              <h1 className="scroll-reveal text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Seguridad de Nivel{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-500">Empresarial</span>
              </h1>
              <p className="scroll-reveal text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                Protegemos sus datos con los mas altos estandares de seguridad de la industria. Cifrado de extremo a extremo, monitoreo continuo y cumplimiento normativo completo.
              </p>
              {/* Animated Shield Icon */}
              <div className="scroll-reveal-scale relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-full bg-primary-500/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 shadow-lg shadow-primary-500/25">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Caracteristicas de Seguridad
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Multiples capas de proteccion disenadas para mantener sus datos seguros en todo momento.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="scroll-reveal group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Gradient glow on hover */}
                  <div className={cn(
                    'absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10',
                    `bg-gradient-to-r ${feature.color}`
                  )} />
                  <div className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900 -z-5" />

                  <div className={cn(
                    'inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 bg-gradient-to-r shadow-lg',
                    feature.color
                  )}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Arquitectura de Seguridad
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Cada capa de nuestra infraestructura esta protegida con medidas de seguridad especificas y complementarias.
              </p>
            </div>

            {/* Infrastructure Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {infrastructureLayers.map((layer, i) => (
                <React.Fragment key={i}>
                  <div
                    className={cn(
                      'scroll-reveal relative p-5 rounded-xl border-2 transition-all duration-300',
                      layer.color
                    )}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {/* Connection arrow (hidden on mobile, shown between cards on desktop) */}
                    {i < infrastructureLayers.length - 1 && (
                      <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700">
                        <ArrowRight className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn('inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700')}>
                        <layer.icon className={cn('h-5 w-5', layer.iconColor)} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{layer.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{layer.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {layer.measures.map((measure, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle className="h-3 w-3 text-primary-500 mt-0.5 shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Certificaciones y Cumplimiento
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Cumplimos con los marcos regulatorios y estandares de seguridad mas exigentes de la industria.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {complianceBadges.map((badge, i) => (
                <div
                  key={i}
                  className="scroll-reveal group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{badge.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{badge.description}</p>
                  <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', badge.statusColor)}>
                    {badge.status === 'Certificado' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                    {badge.status}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Responsible Disclosure Section */}
      <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl mx-auto">
              <div className="scroll-reveal p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shrink-0">
                    <Bug className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Divulgacion Responsable</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Valoramos el trabajo de los investigadores de seguridad y nos comprometemos a colaborar con la comunidad para mantener Pulse seguro. Si ha descubierto una vulnerabilidad de seguridad, nos gustaria saberlo.
                    </p>

                    <div className="space-y-3 mb-5">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Directrices del programa:</h3>
                      <ul className="space-y-2">
                        {[
                          'Proporcione detalles suficientes para reproducir la vulnerabilidad',
                          'Conceda un plazo razonable para la correccion antes de la divulgacion publica',
                          'No acceda ni modifique datos de otros usuarios',
                          'No realice ataques de denegacion de servicio',
                          'No utilice herramientas automatizadas de escaneo agresivo',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircle className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">Reportar una vulnerabilidad</p>
                          <a
                            href="mailto:security@pulse.dev"
                            className="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium mt-0.5"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            security@pulse.dev
                          </a>
                        </div>
                        <div className="sm:ml-auto">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                            <Zap className="h-3 w-3 mr-1" />
                            Bug Bounty Activo
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                      Las recompensas varian segun la severidad: Critica ($500-$2,000), Alta ($200-$500), Media ($50-$200). Los investigadores seran acreditados en nuestro Hall of Fame con su consentimiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="scroll-reveal relative p-8 md:p-12 rounded-2xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-emerald-600 dark:from-primary-700 dark:to-emerald-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />

              <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Tienes preguntas sobre seguridad?
                  </h2>
                  <p className="text-primary-100 text-base md:text-lg max-w-xl">
                    Nuestro equipo de seguridad esta disponible para responder cualquier consulta sobre como protegemos sus datos y nuestra infraestructura.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <Button
                    variant="secondary"
                    size="lg"
                    asChild
                    className="bg-white text-primary-700 hover:bg-primary-50 border-0 shadow-lg"
                  >
                    <Link href="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contactar Equipo de Seguridad
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    <Link href="/gdpr">
                      Conformidad GDPR
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Footer links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Politica de Privacidad →
            </Link>
            <Link href="/cookies" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Politica de Cookies →
            </Link>
            <Link href="/gdpr" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Conformidad GDPR →
            </Link>
            <Link href="/terms" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Terminos de Servicio →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
