'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Puzzle,
  ArrowRight,
  Link2,
  Settings,
  Rocket,
  BookOpen,
  CheckCircle2,
  Mail,
} from 'lucide-react'

// ============================================================================
// REAL BRAND LOGOS (inline SVG components)
// ============================================================================

const SlackLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
  </svg>
)

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const StripeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635BFF"/>
  </svg>
)

const GoogleAnalyticsLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M22.84 2.9982v17.9987c.0066 1.6573-1.3333 3.0038-2.9906 3.0104H4.1506c-1.6573-.0066-2.997-1.3531-2.9906-3.0104V2.9982C1.1534 1.341 2.4932-.0056 4.1506.001h15.6988c1.6573-.0066 3.0038 1.34 2.9906 2.9972z" fill="#F9AB00"/>
    <path d="M22.84 2.9982v17.9987c.0066 1.6573-1.3333 3.0038-2.9906 3.0104h-7.8492V.001h7.8492c1.6573-.0066 3.0038 1.34 2.9906 2.9972z" fill="#E37400"/>
    <circle cx="12" cy="17.5" r="3" fill="#F9AB00"/>
    <rect x="10" y="4" width="4" height="16" rx="2" fill="#E37400"/>
    <rect x="16" y="8" width="4" height="12" rx="2" fill="#F9AB00"/>
    <rect x="4" y="12" width="4" height="8" rx="2" fill="#E37400"/>
  </svg>
)

const AWSS3Logo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#E25444"/>
    <path d="M12 2L2 7l10 5 10-5L12 2z" fill="#F58536"/>
    <path d="M12 12L2 7v10l10 5V12z" fill="#E25444"/>
    <path d="M12 12l10-5v10l-10 5V12z" fill="#C8352B"/>
    <path d="M12 7v10M8 9v6M16 9v6" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
  </svg>
)

const NotionLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.57 2.35c-.42-.326-.98-.7-2.055-.607L3.48 2.86c-.466.046-.56.28-.374.466l1.353 1.882zm.793 3.6v13.908c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.934-.56.934-1.166V6.924c0-.606-.233-.933-.747-.886l-15.177.886c-.56.047-.747.327-.747.886zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.494-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933l3.222-.186z"/>
  </svg>
)

const FigmaLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
  </svg>
)

const JiraLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M23.323 11.33L13.001 1 12 0 4.225 7.775.677 11.33a.96.96 0 0 0 0 1.347l7.103 7.103L12 24l7.771-7.771.207-.207 3.345-3.345a.96.96 0 0 0 0-1.347zM12 15.545L8.455 12 12 8.455 15.545 12 12 15.545z" fill="#2684FF"/>
    <path d="M12 8.455A5.014 5.014 0 0 1 11.985 1L4.22 7.78 8.45 12 12 8.455z" fill="url(#jira-a)"/>
    <path d="M15.55 11.995L12 15.545a5.014 5.014 0 0 1 0 7.09l7.78-7.78-4.23-4.86z" fill="url(#jira-b)"/>
    <defs>
      <linearGradient id="jira-a" x1="11.4" y1="5.2" x2="6.4" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0052CC"/>
        <stop offset="1" stopColor="#2684FF"/>
      </linearGradient>
      <linearGradient id="jira-b" x1="12.6" y1="18.9" x2="17.7" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0052CC"/>
        <stop offset="1" stopColor="#2684FF"/>
      </linearGradient>
    </defs>
  </svg>
)

const TwilioLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 20.4c-4.636 0-8.4-3.764-8.4-8.4S7.364 3.6 12 3.6s8.4 3.764 8.4 8.4-3.764 8.4-8.4 8.4z" fill="#F22F46"/>
    <circle cx="9.3" cy="9.3" r="2.1" fill="#F22F46"/>
    <circle cx="14.7" cy="9.3" r="2.1" fill="#F22F46"/>
    <circle cx="9.3" cy="14.7" r="2.1" fill="#F22F46"/>
    <circle cx="14.7" cy="14.7" r="2.1" fill="#F22F46"/>
  </svg>
)

const MailchimpLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M18.91 12.44c-.28-.14-.56-.21-.84-.21-.14 0-.21.07-.28.14-.07.14-.07.28 0 .42.14.28.42.49.77.56.14 0 .28 0 .35-.07.14-.07.14-.21.14-.35 0-.21-.07-.35-.14-.49zm-2.17-.84c.21 0 .42-.07.56-.21.14-.14.21-.35.21-.56 0-.42-.35-.77-.77-.77-.21 0-.42.07-.56.21-.14.14-.21.35-.21.56 0 .42.35.77.77.77z" fill="#FFE01B"/>
    <path d="M22.15 14.96c-.35-.98-1.12-1.68-2.1-1.96.14-.42.21-.84.21-1.26 0-1.82-1.19-3.36-2.87-3.92.07-.28.07-.56.07-.84 0-2.59-2.1-4.69-4.69-4.69-1.54 0-2.94.77-3.78 1.96C8.08 3.83 7.1 3.55 6.06 3.55c-2.73 0-4.97 2.24-4.97 4.97 0 .63.14 1.26.35 1.82C.56 11.02 0 12 0 13.12c0 1.54.91 2.87 2.24 3.5-.07.35-.14.7-.14 1.05 0 2.45 1.96 4.41 4.41 4.41.91 0 1.75-.28 2.45-.77 1.12 1.26 2.73 2.03 4.55 2.03 2.52 0 4.69-1.61 5.53-3.85.28.07.56.07.84.07 2.31 0 4.13-1.89 4.13-4.2 0-1.12-.42-2.1-1.19-2.87-.21-.21-.42-.35-.63-.49l-.04-.04zM13.51 20.63c-1.47 0-2.73-.77-3.43-1.89l-.7.56c-.56.42-1.26.7-1.96.7-1.75 0-3.15-1.4-3.15-3.15 0-.35.07-.7.21-1.05l.28-.77-.77-.35c-.98-.49-1.61-1.47-1.61-2.52 0-.84.35-1.61.98-2.17l.49-.42-.28-.56C3.22 8.38 3.01 7.68 3.01 7c0-1.89 1.54-3.43 3.43-3.43.84 0 1.61.28 2.24.84l.56.49.49-.56c.7-.91 1.82-1.47 3.01-1.47 2.1 0 3.78 1.68 3.78 3.78 0 .28 0 .56-.07.84l-.14.63.63.21c1.33.42 2.24 1.68 2.24 3.08 0 .35-.07.7-.21 1.05l-.28.7.7.35c.77.35 1.33 1.05 1.54 1.89.07.28.14.56.14.84 0 1.47-1.19 2.66-2.66 2.66-.21 0-.49 0-.7-.07l-.84-.21-.21.84c-.56 1.75-2.17 2.94-3.99 2.94l.04.02z" fill="#241C15"/>
  </svg>
)

const ZapierLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M15.908 12.001l3.79-3.79a6.076 6.076 0 0 0-.629-2.371l-5.282 2.194 1.282-5.497a6.076 6.076 0 0 0-2.14-1.09L12 7.092 11.07 1.447a6.076 6.076 0 0 0-2.14 1.09l1.282 5.497L4.93 5.84a6.076 6.076 0 0 0-.629 2.371l3.79 3.79-3.79 3.79c.12.834.34 1.637.629 2.371l5.282-2.194-1.282 5.497a6.076 6.076 0 0 0 2.14 1.09L12 16.91l.93 5.645a6.076 6.076 0 0 0 2.14-1.09l-1.282-5.497 5.282 2.194c.29-.734.51-1.537.629-2.371l-3.79-3.79z" fill="#FF4A00"/>
    <circle cx="12" cy="12" r="3" fill="#FF4A00"/>
  </svg>
)

const HubSpotLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M17.002 8.455V5.804a2.06 2.06 0 0 0 1.19-1.86v-.062a2.06 2.06 0 0 0-2.06-2.06h-.063a2.06 2.06 0 0 0-2.06 2.06v.062c0 .807.47 1.503 1.15 1.838v2.67a5.36 5.36 0 0 0-2.59 1.246l-6.87-5.346a2.155 2.155 0 0 0 .074-.547 2.18 2.18 0 1 0-2.18 2.18c.326 0 .637-.075.919-.2l6.75 5.254a5.37 5.37 0 0 0-.558 2.375c0 .886.218 1.72.6 2.457l-1.89 1.89a1.69 1.69 0 0 0-.494-.08 1.71 1.71 0 1 0 1.71 1.71 1.69 1.69 0 0 0-.08-.494l1.862-1.862a5.384 5.384 0 1 0 4.59-11.635z" fill="#FF7A59"/>
  </svg>
)

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
  logo: React.ComponentType<{ className?: string }>
  category: Category
  accentColor: string
  gradient: string
  iconBg: string
}

const integrations: Integration[] = [
  {
    name: 'Slack',
    description: 'Recibe notificaciones en tiempo real y gestiona alertas directamente desde tus canales de Slack.',
    logo: SlackLogo,
    category: 'Comunicacion',
    accentColor: '#E01E5A',
    gradient: 'from-rose-400/60 via-rose-500/20 to-rose-400/60',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
  },
  {
    name: 'GitHub',
    description: 'Sincroniza repositorios, automatiza despliegues y rastrea issues desde tu dashboard.',
    logo: GitHubLogo,
    category: 'Desarrollo',
    accentColor: '#6366F1',
    gradient: 'from-indigo-400/60 via-indigo-500/20 to-indigo-400/60',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
  },
  {
    name: 'Stripe',
    description: 'Procesa pagos, gestiona suscripciones y visualiza metricas financieras en tiempo real.',
    logo: StripeLogo,
    category: 'Pagos',
    accentColor: '#6772E5',
    gradient: 'from-violet-400/60 via-violet-500/20 to-violet-400/60',
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
  },
  {
    name: 'Google Analytics',
    description: 'Importa datos de trafico, conversiones y comportamiento de usuarios automaticamente.',
    logo: GoogleAnalyticsLogo,
    category: 'Analitica',
    accentColor: '#F59E0B',
    gradient: 'from-amber-400/60 via-amber-500/20 to-amber-400/60',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
  },
  {
    name: 'AWS S3',
    description: 'Almacena y gestiona archivos en la nube con sincronizacion automatica y backups.',
    logo: AWSS3Logo,
    category: 'Almacenamiento',
    accentColor: '#F97316',
    gradient: 'from-orange-400/60 via-orange-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
  },
  {
    name: 'Notion',
    description: 'Conecta tu base de conocimiento y sincroniza documentos y wikis del equipo.',
    logo: NotionLogo,
    category: 'Productividad',
    accentColor: '#000000',
    gradient: 'from-slate-400/60 via-slate-500/20 to-slate-400/60',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
  },
  {
    name: 'Figma',
    description: 'Importa componentes de diseno, sincroniza tokens y mantiene tu design system actualizado.',
    logo: FigmaLogo,
    category: 'Desarrollo',
    accentColor: '#A259FF',
    gradient: 'from-purple-400/60 via-purple-500/20 to-purple-400/60',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
  },
  {
    name: 'Jira',
    description: 'Sincroniza tickets, sprints y roadmaps para una gestion de proyectos unificada.',
    logo: JiraLogo,
    category: 'Productividad',
    accentColor: '#0052CC',
    gradient: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
  },
  {
    name: 'Twilio',
    description: 'Envia SMS, notificaciones push y gestiona comunicaciones omnicanal.',
    logo: TwilioLogo,
    category: 'Comunicacion',
    accentColor: '#F22F46',
    gradient: 'from-red-400/60 via-red-500/20 to-red-400/60',
    iconBg: 'bg-red-500/10 dark:bg-red-500/15',
  },
  {
    name: 'Mailchimp',
    description: 'Automatiza campanas de email marketing y sincroniza listas de contactos.',
    logo: MailchimpLogo,
    category: 'Marketing',
    accentColor: '#FFE01B',
    gradient: 'from-yellow-400/60 via-yellow-500/20 to-yellow-400/60',
    iconBg: 'bg-yellow-500/10 dark:bg-yellow-500/15',
  },
  {
    name: 'Zapier',
    description: 'Conecta miles de apps y crea flujos de trabajo automatizados sin codigo.',
    logo: ZapierLogo,
    category: 'Automatizacion',
    accentColor: '#FF4A00',
    gradient: 'from-orange-400/60 via-orange-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
  },
  {
    name: 'HubSpot',
    description: 'Integra tu CRM, automatiza ventas y centraliza la gestion de clientes.',
    logo: HubSpotLogo,
    category: 'Marketing',
    accentColor: '#FF7A59',
    gradient: 'from-orange-400/60 via-rose-500/20 to-orange-400/60',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-slate-900 dark:text-white">Conecta con tus </span>
          <span className="bg-gradient-to-r from-primary-400 via-blue-500 to-accent-500 dark:from-primary-300 dark:via-blue-400 dark:to-accent-400 bg-clip-text text-transparent">
            herramientas favoritas
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
                        <integration.logo className="h-6 w-6" />
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-page background gradient */}
      <div className="fixed inset-0 -z-20 bg-white dark:bg-slate-950" />
      <div className="fixed inset-0 -z-10">
        {/* Top-left warm glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-400/8 dark:bg-primary-500/5 rounded-full blur-3xl" />
        {/* Center radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-blue-400/5 via-primary-400/5 to-accent-400/5 dark:from-blue-500/[0.03] dark:via-primary-500/[0.03] dark:to-accent-500/[0.03] rounded-full blur-3xl" />
        {/* Bottom-right accent glow */}
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-accent-400/6 dark:bg-accent-500/[0.03] rounded-full blur-3xl" />
        {/* Subtle mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <HeroSection />
      <IntegrationsGridSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  )
}
