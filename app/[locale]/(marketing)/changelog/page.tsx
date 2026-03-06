'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import {
  History,
  Sparkles,
  Rocket,
  Zap,
  Bug,
  Palette,
  BarChart3,
  Bell,
  Globe,
  Moon,
  Layers,
  LayoutDashboard,
  Calendar,
  KanbanSquare,
  Mail,
  FileText,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Component,
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
// CHANGELOG DATA
// ============================================================================

type ChangeType = 'new' | 'improvement' | 'fix'

interface ChangeItem {
  type: ChangeType
  icon: React.ElementType
  description: string
}

interface Release {
  version: string
  date: string
  title: string
  description: string
  items: ChangeItem[]
  isMajor?: boolean
}

const releases: Release[] = [
  {
    version: 'v3.2.0',
    date: '6 de Marzo, 2026',
    title: 'Dark Mode 2.0 y Nuevos Componentes de Graficos',
    description: 'Rediseño completo del modo oscuro con soporte para temas personalizados, nuevos componentes de graficos interactivos y mejoras significativas en internacionalización.',
    items: [
      { type: 'new', icon: Moon, description: 'Dark Mode 2.0 con soporte para temas personalizados y transiciones suaves entre modos' },
      { type: 'new', icon: BarChart3, description: 'Nuevos componentes de graficos: Area Chart, Funnel Chart, Heatmap y Treemap' },
      { type: 'improvement', icon: Globe, description: 'Sistema i18n mejorado con detección automática de idioma y soporte para RTL' },
      { type: 'fix', icon: Bug, description: 'Corregido parpadeo en transiciones de tema en componentes con backdrop-blur' },
    ],
  },
  {
    version: 'v3.1.0',
    date: '12 de Febrero, 2026',
    title: 'Dashboard CRM y Notificaciones en Tiempo Real',
    description: 'Nuevo dashboard de CRM completo con gestión de contactos, pipeline de ventas y sistema de notificaciones push en tiempo real.',
    items: [
      { type: 'new', icon: LayoutDashboard, description: 'Dashboard CRM completo con pipeline de ventas, gestión de contactos y reportes' },
      { type: 'new', icon: Bell, description: 'Sistema de notificaciones en tiempo real con WebSockets y soporte para push notifications' },
      { type: 'improvement', icon: Zap, description: 'Rendimiento mejorado un 40% en carga inicial con lazy loading optimizado' },
      { type: 'fix', icon: Bug, description: 'Solucionado problema de memoria en tablas con más de 10,000 filas' },
    ],
  },
  {
    version: 'v3.0.0',
    date: '15 de Enero, 2026',
    title: 'Reescritura Completa - Nuevo Design System',
    description: 'La versión más grande hasta la fecha. Reescritura completa con React 19, Next.js 16, Tailwind v4 y un nuevo Design System con más de 40 componentes.',
    isMajor: true,
    items: [
      { type: 'new', icon: Layers, description: 'Nuevo Design System con más de 40 componentes premium, tokens de diseño y documentación completa' },
      { type: 'new', icon: Component, description: 'Migración completa a React 19 con Server Components y Suspense boundaries' },
      { type: 'new', icon: Palette, description: 'Sistema de temas avanzado con CSS variables, soporte para branded themes y generador de paletas' },
      { type: 'improvement', icon: Rocket, description: 'Arquitectura modular renovada con barrel exports y tree-shaking optimizado' },
      { type: 'fix', icon: Bug, description: 'Más de 120 bugs corregidos reportados por la comunidad' },
    ],
  },
  {
    version: 'v2.5.0',
    date: '8 de Diciembre, 2025',
    title: 'Analytics Dashboard y Plantillas de Email',
    description: 'Nuevo dashboard de analytics con métricas en tiempo real y un sistema completo de plantillas de email responsivas.',
    items: [
      { type: 'new', icon: TrendingUp, description: 'Dashboard de Analytics con métricas en tiempo real, embudos de conversión y cohortes' },
      { type: 'new', icon: Mail, description: '12 plantillas de email responsivas para onboarding, transacciones y marketing' },
      { type: 'improvement', icon: Star, description: 'Componentes de tabla mejorados con ordenamiento, filtros y exportación a CSV' },
      { type: 'fix', icon: Bug, description: 'Corregido comportamiento de scroll en modales en dispositivos iOS' },
    ],
  },
  {
    version: 'v2.4.0',
    date: '20 de Noviembre, 2025',
    title: 'Tablero Kanban y Vista de Calendario',
    description: 'Nuevas vistas de gestión de proyectos con tablero Kanban drag-and-drop y calendario interactivo con múltiples vistas.',
    items: [
      { type: 'new', icon: KanbanSquare, description: 'Tablero Kanban con drag-and-drop, swimlanes, filtros y etiquetas personalizables' },
      { type: 'new', icon: Calendar, description: 'Vista de calendario interactivo con vistas diaria, semanal y mensual' },
      { type: 'improvement', icon: FileText, description: 'Editor de texto enriquecido mejorado con soporte para markdown y menciones' },
      { type: 'fix', icon: Bug, description: 'Solucionado z-index en dropdowns dentro de contenedores con overflow hidden' },
    ],
  },
]

const typeConfig: Record<ChangeType, { label: string; className: string }> = {
  new: {
    label: 'Nuevo',
    className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
  },
  improvement: {
    label: 'Mejora',
    className: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  },
  fix: {
    label: 'Fix',
    className: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  },
}

// ============================================================================
// HERO SECTION
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
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <History className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Changelog</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Historial de Cambios
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mantente al dia con todas las novedades, mejoras y correcciones de Pulse.
          Cada actualización está diseñada para mejorar tu experiencia de desarrollo.
        </p>

        {/* Version indicator */}
        <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Última versión</span>
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-white">v3.2.0</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Marzo 2026</span>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TIMELINE SECTION
// ============================================================================

const ReleaseCard = ({ release, index }: { release: Release; index: number }) => {
  return (
    <div
      className="scroll-reveal-scale"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        {/* Gradient border wrapper */}
        <div
          className={cn(
            'relative rounded-2xl p-px overflow-hidden',
            'bg-gradient-to-b',
            release.isMajor
              ? 'from-primary-400/80 via-primary-500/30 to-primary-400/80'
              : 'from-slate-300/60 via-slate-200/20 to-slate-300/60 dark:from-slate-600/60 dark:via-slate-700/20 dark:to-slate-600/60',
          )}
        >
          {/* Inner card */}
          <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 md:p-8 overflow-hidden">
            {/* Corner gradient glow for major releases */}
            {release.isMajor && (
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl" />
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 relative z-10">
              <div className="flex items-center gap-3">
                {/* Version badge */}
                <Badge
                  variant={release.isMajor ? 'primary' : 'default'}
                  size="lg"
                  className={cn(
                    'font-bold',
                    release.isMajor && 'bg-gradient-to-r from-primary-500 to-primary-600 text-white dark:from-primary-500 dark:to-primary-600 border-0'
                  )}
                >
                  {release.version}
                </Badge>

                {release.isMajor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                    <Sparkles className="h-3 w-3" />
                    Major
                  </span>
                )}
              </div>

              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {release.date}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">
              {release.title}
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-3xl relative z-10">
              {release.description}
            </p>

            {/* Change items */}
            <div className="space-y-3 relative z-10">
              {release.items.map((item, i) => {
                const config = typeConfig[item.type]
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-xl',
                      'bg-slate-50/80 dark:bg-slate-800/50',
                      'border border-slate-100 dark:border-slate-800',
                      'hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200',
                    )}
                  >
                    {/* Type badge */}
                    <span
                      className={cn(
                        'inline-flex items-center shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide border',
                        config.className,
                      )}
                    >
                      {config.label}
                    </span>

                    {/* Icon */}
                    <item.icon className="h-4 w-4 shrink-0 mt-0.5 text-slate-400 dark:text-slate-500" />

                    {/* Description */}
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TimelineSection = () => {
  return (
    <RevealSection>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Todas las Versiones
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Un registro detallado de cada mejora, nueva funcionalidad y corrección que hemos implementado.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-300 to-slate-200 dark:from-primary-500 dark:via-primary-800 dark:to-slate-800" />

            {/* Releases */}
            <div className="space-y-10">
              {releases.map((release, index) => (
                <div key={release.version} className="relative pl-16 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 md:left-5.5 top-8 z-10">
                    <div
                      className={cn(
                        'h-5 w-5 rounded-full border-4 shadow-md',
                        release.isMajor
                          ? 'bg-primary-500 border-primary-200 dark:border-primary-900 shadow-primary-500/30'
                          : 'bg-slate-400 dark:bg-slate-500 border-white dark:border-slate-950 shadow-slate-400/20',
                      )}
                    />
                    {release.isMajor && (
                      <div className="absolute inset-0 h-5 w-5 rounded-full bg-primary-500 animate-ping opacity-20" />
                    )}
                  </div>

                  <ReleaseCard release={release} index={index} />
                </div>
              ))}
            </div>

            {/* Timeline end dot */}
            <div className="absolute left-4.5 md:left-6.5 bottom-0 z-10">
              <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-950" />
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// NEWSLETTER SECTION
// ============================================================================

const NewsletterSection = () => {
  return (
    <RevealSection>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-10 md:p-16 text-center">
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particleData.slice(0, 8).map((p, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-float"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: p.x,
                    top: p.y,
                    opacity: p.opacity * 0.4,
                    animationDelay: p.delay,
                    animationDuration: p.dur,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-500/20 border border-primary-500/30 mb-6">
                <Bell className="h-7 w-7 text-primary-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Suscribete a las Actualizaciones
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
                Recibe notificaciones de cada nueva versión directamente en tu correo.
                Sin spam, solo las novedades que importan.
              </p>

              {/* Email form */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <div className="relative w-full sm:flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-xl',
                      'bg-white/10 backdrop-blur-sm',
                      'border border-white/10 hover:border-white/20 focus:border-primary-500/50',
                      'text-white placeholder:text-slate-500',
                      'text-sm font-medium',
                      'outline-none focus:ring-2 focus:ring-primary-500/20',
                      'transition-all duration-200',
                    )}
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 gap-2 px-6 shrink-0"
                >
                  Suscribirme
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Trust line */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Sin spam
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Cancela cuando quieras
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Solo novedades
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// CHANGELOG PAGE
// ============================================================================

export default function ChangelogPage() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <NewsletterSection />
    </>
  )
}
