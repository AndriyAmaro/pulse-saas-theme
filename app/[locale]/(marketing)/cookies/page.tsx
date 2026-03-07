'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  List,
  Shield,
  Cookie,
  Mail,
  Settings,
  BarChart3,
  Heart,
  Megaphone,
  Lock,
  Globe,
  Monitor,
  Smartphone,
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
// TOC SIDEBAR
// ============================================================================

interface TocItem {
  id: string
  title: string
}

const tocItems: TocItem[] = [
  { id: 'que-son', title: 'Que son las Cookies' },
  { id: 'cookies-utilizamos', title: 'Cookies que Utilizamos' },
  { id: 'esenciales', title: 'Cookies Esenciales' },
  { id: 'rendimiento', title: 'Cookies de Rendimiento' },
  { id: 'funcionalidad', title: 'Cookies de Funcionalidad' },
  { id: 'marketing', title: 'Cookies de Marketing' },
  { id: 'gestion', title: 'Gestion de Cookies' },
  { id: 'contacto', title: 'Contacto' },
]

const TocSidebar = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = React.useState('')

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(item.id)
          })
        },
        { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
    }
  }

  return (
    <nav className="hidden lg:block sticky top-24 shrink-0 w-64">
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <List className="h-4 w-4 text-primary-500" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Contenido</h4>
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'flex items-center gap-2 py-1.5 pl-3 text-[13px] rounded-md transition-all duration-200',
                  activeId === item.id
                    ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
              >
                <span className={cn('w-1 h-1 rounded-full shrink-0', activeId === item.id ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600')} />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ============================================================================
// SECTION COMPONENT
// ============================================================================

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
      {children}
    </div>
  </section>
)

// ============================================================================
// COOKIE TABLE DATA
// ============================================================================

const cookieTableData = [
  { nombre: 'session_id', tipo: 'Esencial', duracion: 'Sesion', proposito: 'Mantener la sesion del usuario activa' },
  { nombre: 'csrf_token', tipo: 'Esencial', duracion: 'Sesion', proposito: 'Proteccion contra ataques CSRF' },
  { nombre: 'auth_token', tipo: 'Esencial', duracion: '30 dias', proposito: 'Autenticacion persistente del usuario' },
  { nombre: '_ga', tipo: 'Analitica', duracion: '2 anos', proposito: 'Distinguir usuarios unicos en Google Analytics' },
  { nombre: '_ga_*', tipo: 'Analitica', duracion: '2 anos', proposito: 'Mantener el estado de la sesion de analytics' },
  { nombre: '_pulse_analytics', tipo: 'Analitica', duracion: '1 ano', proposito: 'Metricas internas de uso del producto' },
  { nombre: 'theme_pref', tipo: 'Preferencia', duracion: '1 ano', proposito: 'Recordar preferencia de tema (claro/oscuro)' },
  { nombre: 'locale', tipo: 'Preferencia', duracion: '1 ano', proposito: 'Recordar preferencia de idioma' },
  { nombre: 'sidebar_collapsed', tipo: 'Preferencia', duracion: '1 ano', proposito: 'Estado de la barra lateral del dashboard' },
  { nombre: '_fbp', tipo: 'Marketing', duracion: '3 meses', proposito: 'Seguimiento de Facebook Pixel para anuncios' },
  { nombre: '_gcl_au', tipo: 'Marketing', duracion: '3 meses', proposito: 'Seguimiento de conversiones de Google Ads' },
  { nombre: 'hubspot_utk', tipo: 'Marketing', duracion: '13 meses', proposito: 'Seguimiento de visitantes de HubSpot' },
]

// ============================================================================
// COOKIES PAGE
// ============================================================================

export default function CookiesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-x-clip">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-x-16 inset-y-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40" style={{ backgroundImage: 'url(/fundo-blackground.png)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        {/* ECG heartbeat — Desktop */}
        <svg className="hidden md:block absolute inset-0 z-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 450 L360 450 L390 350 L420 550 L450 300 L480 600 L510 450 L1440 450" className="ck-ecg-line" stroke="url(#ck-ecg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="ck-ecg-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
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
          <path d="M0 300 L125 300 L145 230 L165 370 L185 200 L205 400 L225 300 L500 300" className="ck-ecg-line" stroke="url(#ck-ecg-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="ck-ecg-grad-m" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
              <stop offset="20%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <style>{`
          .ck-ecg-line {
            stroke-dasharray: 2200;
            stroke-dashoffset: 2200;
            animation: ck-ecg-draw 3s ease-in-out forwards;
          }
          @keyframes ck-ecg-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex items-center gap-3 mb-4 scroll-reveal">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10">
                <Shield className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  <span className="text-slate-900 dark:text-white">Politica de </span>
                  <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                    Cookies
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 scroll-reveal">
              <span>Ultima actualizacion: 1 de marzo, 2026</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>Version 1.0</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-16">
            <TocSidebar items={tocItems} />

            <div className="flex-1 min-w-0 max-w-3xl">
              <RevealSection>
                <Section id="que-son" title="Que son las Cookies">
                  <p>
                    Las cookies son pequenos archivos de texto que se almacenan en su dispositivo (ordenador, tablet o movil) cuando visita un sitio web. Son ampliamente utilizadas para hacer que los sitios web funcionen de manera mas eficiente, asi como para proporcionar informacion a los propietarios del sitio.
                  </p>
                  <p>
                    Las cookies nos permiten reconocer su navegador y recordar informacion como sus preferencias de usuario. En Pulse, utilizamos cookies para mejorar su experiencia, analizar el uso del servicio y personalizar el contenido.
                  </p>
                  <div className="mt-4 p-4 rounded-lg bg-primary-50/50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10">
                    <div className="flex items-start gap-3">
                      <Cookie className="h-5 w-5 text-primary-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Esta politica explica que cookies utilizamos, por que las usamos y como puede gestionarlas. Le recomendamos leerla detenidamente para entender nuestras practicas.
                      </p>
                    </div>
                  </div>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="cookies-utilizamos" title="Cookies que Utilizamos">
                  <p>
                    A continuacion se detalla una tabla completa de todas las cookies que utiliza Pulse, incluyendo su tipo, duracion y proposito:
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 px-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 rounded-tl-lg">Nombre</th>
                          <th className="text-left py-3 px-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50">Tipo</th>
                          <th className="text-left py-3 px-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50">Duracion</th>
                          <th className="text-left py-3 px-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 rounded-tr-lg">Proposito</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookieTableData.map((cookie, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <td className="py-2.5 px-3 font-mono text-xs text-primary-600 dark:text-primary-400">{cookie.nombre}</td>
                            <td className="py-2.5 px-3">
                              <span className={cn(
                                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                                cookie.tipo === 'Esencial' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
                                cookie.tipo === 'Analitica' && 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
                                cookie.tipo === 'Preferencia' && 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
                                cookie.tipo === 'Marketing' && 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
                              )}>
                                {cookie.tipo}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{cookie.duracion}</td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{cookie.proposito}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="esenciales" title="Cookies Esenciales">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 shrink-0">
                      <Lock className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Siempre activas</h3>
                      <p>Estas cookies no se pueden desactivar ya que son necesarias para que el sitio funcione correctamente.</p>
                    </div>
                  </div>
                  <p className="mt-3">
                    Las cookies esenciales son estrictamente necesarias para el funcionamiento de nuestro sitio web. Sin estas cookies, los servicios que ha solicitado no pueden ser proporcionados. Incluyen:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>Cookies de autenticacion que le permiten iniciar sesion en su cuenta</li>
                    <li>Cookies de seguridad que protegen contra ataques CSRF y otras amenazas</li>
                    <li>Cookies de sesion que mantienen su estado mientras navega por la plataforma</li>
                    <li>Cookies de balanceo de carga que aseguran un rendimiento optimo del servicio</li>
                  </ul>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="rendimiento" title="Cookies de Rendimiento">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 shrink-0">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Analiticas y metricas</h3>
                      <p>Nos ayudan a entender como interactuan los usuarios con nuestro servicio.</p>
                    </div>
                  </div>
                  <p className="mt-3">
                    Estas cookies recopilan informacion sobre como utiliza nuestro sitio web, como las paginas que visita con mas frecuencia y si recibe mensajes de error. Toda la informacion es agregada y anonima. Utilizamos esta informacion para:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>Medir y analizar el rendimiento de nuestro sitio web</li>
                    <li>Entender que funcionalidades son mas populares entre nuestros usuarios</li>
                    <li>Identificar y resolver problemas tecnicos rapidamente</li>
                    <li>Optimizar la experiencia del usuario basandonos en datos reales de uso</li>
                  </ul>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="funcionalidad" title="Cookies de Funcionalidad">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 shrink-0">
                      <Settings className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Preferencias del usuario</h3>
                      <p>Permiten recordar sus opciones y personalizar su experiencia.</p>
                    </div>
                  </div>
                  <p className="mt-3">
                    Las cookies de funcionalidad permiten que nuestro sitio web recuerde las elecciones que realiza (como su nombre de usuario, idioma o region) y proporcionen funciones mejoradas y mas personalizadas. Estas cookies recuerdan:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>Su preferencia de tema (modo claro u oscuro)</li>
                    <li>Su idioma preferido para la interfaz</li>
                    <li>El estado de elementos de la interfaz como la barra lateral</li>
                    <li>Sus configuraciones de notificaciones y visualizacion</li>
                  </ul>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="marketing" title="Cookies de Marketing">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-purple-50 dark:bg-purple-500/10 shrink-0">
                      <Megaphone className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Publicidad y seguimiento</h3>
                      <p>Solo se activan con su consentimiento explicito.</p>
                    </div>
                  </div>
                  <p className="mt-3">
                    Estas cookies se utilizan para mostrar anuncios que son relevantes para usted. Tambien se utilizan para limitar el numero de veces que ve un anuncio y para medir la efectividad de las campanas publicitarias. Incluyen cookies de:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>Facebook Pixel para medir la efectividad de campanas en redes sociales</li>
                    <li>Google Ads para seguimiento de conversiones de publicidad</li>
                    <li>HubSpot para seguimiento de interacciones de marketing</li>
                    <li>LinkedIn Insight Tag para atribucion de campanas B2B</li>
                  </ul>
                  <p className="mt-3">
                    <strong className="text-slate-900 dark:text-white">Importante:</strong> Las cookies de marketing solo se activan cuando usted otorga su consentimiento explicito a traves de nuestro banner de cookies. Puede revocar este consentimiento en cualquier momento.
                  </p>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="gestion" title="Gestion de Cookies">
                  <p>
                    Puede controlar y gestionar las cookies de diversas maneras. Tenga en cuenta que eliminar o bloquear cookies puede afectar su experiencia de usuario y es posible que algunas partes de nuestro sitio web no funcionen correctamente.
                  </p>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-5 mb-3">Configuracion del navegador</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Globe, name: 'Google Chrome', desc: 'Configuracion > Privacidad y seguridad > Cookies' },
                      { icon: Globe, name: 'Mozilla Firefox', desc: 'Opciones > Privacidad y seguridad > Cookies' },
                      { icon: Globe, name: 'Safari', desc: 'Preferencias > Privacidad > Gestionar datos del sitio' },
                      { icon: Globe, name: 'Microsoft Edge', desc: 'Configuracion > Cookies y permisos del sitio' },
                    ].map((browser, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="flex items-center gap-2 mb-1">
                          <browser.icon className="h-4 w-4 text-primary-500" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{browser.name}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{browser.desc}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-5 mb-3">Otros metodos</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Utilice nuestro panel de preferencias de cookies (boton al final de esta pagina) para gestionar sus preferencias</li>
                    <li>Active la funcion &ldquo;Do Not Track&rdquo; en su navegador</li>
                    <li>Utilice herramientas de terceros como Privacy Badger o uBlock Origin</li>
                    <li>En dispositivos moviles, revise la configuracion de privacidad de su sistema operativo</li>
                  </ul>
                </Section>
              </RevealSection>

              <RevealSection>
                <Section id="contacto" title="Contacto">
                  <p>Si tiene preguntas sobre nuestra politica de cookies, no dude en contactarnos:</p>
                  <div className="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="font-medium text-slate-900 dark:text-white">Andri Amaro</p>
                    <div className="mt-2 space-y-1">
                      <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> andrifullstackdev@gmail.com</p>
                      <p>Brazil (Remote)</p>
                    </div>
                  </div>
                  <p className="mt-3">
                    Tambien puede consultar nuestra <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Politica de Privacidad</Link> para mas informacion sobre como tratamos sus datos personales.
                  </p>
                </Section>
              </RevealSection>

              {/* Cookie Preferences CTA Card */}
              <RevealSection>
                <div className="scroll-reveal mt-12 p-6 rounded-2xl border border-primary-200 dark:border-primary-500/20 bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-500/5 dark:to-emerald-500/5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-500/10 shrink-0">
                      <Cookie className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Preferencias de Cookies</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Gestione sus preferencias de cookies en cualquier momento. Puede activar o desactivar las cookies no esenciales segun sus preferencias.
                      </p>
                    </div>
                    <Button variant="primary" size="md" className="shrink-0">
                      <Settings className="h-4 w-4 mr-2" />
                      Gestionar Cookies
                    </Button>
                  </div>
                </div>
              </RevealSection>

              {/* Footer links */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
                <Link href="/privacy" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Politica de Privacidad →
                </Link>
                <Link href="/terms" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Terminos de Servicio →
                </Link>
                <Link href="/gdpr" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Conformidad GDPR →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
