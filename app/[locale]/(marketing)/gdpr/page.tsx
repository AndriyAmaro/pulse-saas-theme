'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Shield,
  Eye,
  Target,
  Database,
  CheckCircle,
  Lock,
  Clock,
  ShieldCheck,
  UserCheck,
  Pencil,
  Trash2,
  ArrowRightLeft,
  Ban,
  PauseCircle,
  ToggleLeft,
  AlertTriangle,
  Mail,
  FileText,
  Scale,
  Server,
  Globe,
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
// GDPR PRINCIPLES DATA
// ============================================================================

const principles = [
  {
    icon: Eye,
    title: 'Licitud y Transparencia',
    description: 'Procesamos datos personales de manera legal, justa y transparente. Siempre informamos claramente sobre como y por que tratamos sus datos.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Limitacion de Finalidad',
    description: 'Recopilamos datos solo para fines especificos, explicitos y legitimos. Nunca procesamos datos de manera incompatible con esos fines.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Database,
    title: 'Minimizacion de Datos',
    description: 'Solo recopilamos los datos personales que son adecuados, pertinentes y limitados a lo necesario para los fines del tratamiento.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: CheckCircle,
    title: 'Exactitud',
    description: 'Mantenemos los datos personales exactos y actualizados. Tomamos medidas razonables para rectificar o suprimir datos inexactos.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Limitacion de Conservacion',
    description: 'Conservamos los datos personales solo durante el tiempo necesario para los fines del tratamiento. Aplicamos politicas de retencion estrictas.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Lock,
    title: 'Integridad y Confidencialidad',
    description: 'Garantizamos la seguridad adecuada de los datos personales mediante medidas tecnicas y organizativas apropiadas contra el tratamiento no autorizado.',
    color: 'from-primary-500 to-emerald-500',
  },
]

// ============================================================================
// RIGHTS DATA
// ============================================================================

const rights = [
  { icon: Eye, title: 'Acceso', description: 'Solicitar una copia de todos los datos personales que tenemos sobre usted.' },
  { icon: Pencil, title: 'Rectificacion', description: 'Corregir datos personales inexactos o incompletos que tengamos sobre usted.' },
  { icon: Trash2, title: 'Supresion', description: 'Solicitar la eliminacion de sus datos personales cuando ya no sean necesarios.' },
  { icon: ArrowRightLeft, title: 'Portabilidad', description: 'Recibir sus datos en un formato estructurado y legible por maquina.' },
  { icon: Ban, title: 'Oposicion', description: 'Oponerse al tratamiento de sus datos personales en determinadas circunstancias.' },
  { icon: PauseCircle, title: 'Restriccion', description: 'Solicitar la limitacion del tratamiento de sus datos en ciertos casos.' },
  { icon: ToggleLeft, title: 'Retiro de Consentimiento', description: 'Retirar su consentimiento en cualquier momento cuando el tratamiento se base en el.' },
  { icon: AlertTriangle, title: 'Reclamacion', description: 'Presentar una reclamacion ante la autoridad de proteccion de datos competente.' },
]

// ============================================================================
// DATA PROCESSING DATA
// ============================================================================

const dataProcessing = [
  {
    category: 'Datos de Cuenta',
    data: 'Nombre, email, foto de perfil',
    purpose: 'Creacion y gestion de cuenta de usuario',
    legalBasis: 'Ejecucion del contrato',
    retention: 'Mientras la cuenta este activa + 30 dias',
  },
  {
    category: 'Datos de Facturacion',
    data: 'Direccion, metodo de pago (via Stripe)',
    purpose: 'Procesamiento de pagos y facturacion',
    legalBasis: 'Ejecucion del contrato',
    retention: '7 anos (obligacion legal)',
  },
  {
    category: 'Datos de Uso',
    data: 'Paginas visitadas, funciones utilizadas',
    purpose: 'Mejora del servicio y analiticas',
    legalBasis: 'Interes legitimo',
    retention: '24 meses',
  },
  {
    category: 'Datos Tecnicos',
    data: 'IP, navegador, dispositivo, logs',
    purpose: 'Seguridad, depuracion y rendimiento',
    legalBasis: 'Interes legitimo',
    retention: '12 meses',
  },
  {
    category: 'Datos de Comunicacion',
    data: 'Mensajes de soporte, emails',
    purpose: 'Atencion al cliente y soporte tecnico',
    legalBasis: 'Interes legitimo',
    retention: '36 meses',
  },
  {
    category: 'Datos de Marketing',
    data: 'Preferencias, interacciones con campanas',
    purpose: 'Comunicaciones de marketing personalizadas',
    legalBasis: 'Consentimiento',
    retention: 'Hasta retiro del consentimiento',
  },
]

// ============================================================================
// GDPR PAGE
// ============================================================================

export default function GdprPage() {
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
                <Globe className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">GDPR</span>
              </div>
              <h1 className="scroll-reveal text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Conformidad con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-500">GDPR</span>
              </h1>
              <p className="scroll-reveal text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                El Reglamento General de Proteccion de Datos (GDPR) es la normativa mas estricta del mundo en materia de privacidad y proteccion de datos. En Pulse, nos comprometemos a cumplir plenamente con sus requisitos.
              </p>
              <div className="scroll-reveal flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>Ultima actualizacion: 1 de marzo, 2026</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>Regulacion (UE) 2016/679</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Principios Fundamentales del GDPR
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Nuestro tratamiento de datos se rige por los seis principios fundamentales establecidos en el Articulo 5 del GDPR.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, i) => (
                <div
                  key={i}
                  className="scroll-reveal group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Gradient border effect on hover */}
                  <div className={cn(
                    'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm',
                    `bg-gradient-to-r ${principle.color}`
                  )} />
                  <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-slate-900 -z-5" />

                  <div className={cn(
                    'inline-flex items-center justify-center h-11 w-11 rounded-xl mb-4 bg-gradient-to-r',
                    principle.color
                  )}>
                    <principle.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{principle.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Sus Derechos como Titular de Datos
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                El GDPR le otorga derechos amplios sobre sus datos personales. Estamos comprometidos a facilitar el ejercicio de cada uno de ellos.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rights.map((right, i) => (
                <div
                  key={i}
                  className="scroll-reveal group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-500/30 transition-all duration-300"
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary-50 dark:bg-primary-500/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <right.icon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{right.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{right.description}</p>
                </div>
              ))}
            </div>
            <div className="scroll-reveal mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Para ejercer cualquiera de estos derechos, contacte a nuestro Delegado de Proteccion de Datos a traves del formulario al final de esta pagina.
                Responderemos a su solicitud en un plazo maximo de 30 dias.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Data Processing Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Tratamiento de Datos Personales
              </h2>
              <p className="scroll-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Transparencia total sobre que datos recopilamos, con que finalidad, nuestra base legal y el periodo de conservacion.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dataProcessing.map((item, i) => (
                <div
                  key={i}
                  className="scroll-reveal p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <FileText className="h-4 w-4 text-primary-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.category}</h3>
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Datos</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{item.data}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Finalidad</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{item.purpose}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Base Legal</span>
                        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-0.5">{item.legalBasis}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">Retencion</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{item.retention}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* DPO Section */}
      <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-2xl mx-auto">
              <div className="scroll-reveal p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 mb-5">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Delegado de Proteccion de Datos</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Nuestro Delegado de Proteccion de Datos (DPO) supervisa el cumplimiento del GDPR y esta disponible para atender cualquier consulta sobre el tratamiento de sus datos personales.
                </p>
                <div className="inline-flex flex-col items-center gap-3 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Andri Amaro</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Delegado de Proteccion de Datos</p>
                  </div>
                  <a
                    href="mailto:dpo@pulse.dev"
                    className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    dpo@pulse.dev
                  </a>
                </div>
                <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                  Tiempo de respuesta habitual: 5 dias laborables. Plazo maximo legal: 30 dias.
                </p>
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
            <Link href="/security" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Seguridad →
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
