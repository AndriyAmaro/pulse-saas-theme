'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { PulseEcgIcon } from '@core/primitives/PulseLogo'
import { FeatureGrid } from '@core/patterns/FeatureGrid'
import { PricingTable, type PricingPlan, type BillingPeriod } from '@core/patterns/PricingTable'
import { FAQAccordion, type FAQItem } from '@core/patterns/FAQAccordion'
import { ParticleNetwork } from '@core/patterns/ParticleNetwork'
import { TestimonialGrid, type Testimonial } from '@core/patterns/TestimonialCard'
import { HeroBackground } from '@core/patterns/HeroBackground'
import {
  Play,
  ArrowRight,
  BarChart3,
  Users,
  Shield,
  Globe,
  Headphones,
  Smartphone,
  FileDown,
  Lock,
  TrendingUp,
  Bell,
  Layers,
  Star,
  Check,
  Sparkles,
  Zap,
  Code2,
  MousePointerClick,
  MessageSquare,
  Activity,
  Database,
  Workflow,
  PieChart,
  Timer,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  FolderKanban,
  UsersRound,
  Package,
  HeadphonesIcon,
  Rocket,
  Heart,
  UserCog,
  Megaphone,
  Home,
  GraduationCap,
  Bitcoin,
  UtensilsCrossed,
  X,
  CalendarDays,
  Mail,
} from 'lucide-react'

// ============================================================================
// SCROLL REVEAL HOOK - IntersectionObserver for scroll animations
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

    // Observe the container and all scroll-reveal children
    const children = el.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
    children.forEach((child) => observer.observe(child))
    if (el.classList.contains('scroll-reveal') || el.classList.contains('scroll-reveal-left') || el.classList.contains('scroll-reveal-right') || el.classList.contains('scroll-reveal-scale')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

// Wrapper component for scroll-animated sections
function RevealSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

// ============================================================================
// DEMO DATA - All dashboards for the demo dropdown
// ============================================================================

const demoItems = [
  { title: 'Overview', href: '/overview', icon: LayoutDashboard, color: 'from-primary-400 to-primary-600' },
  { title: 'Analytics', href: '/analytics', icon: BarChart3, color: 'from-blue-400 to-blue-600' },
  { title: 'E-commerce', href: '/ecommerce', icon: ShoppingCart, color: 'from-emerald-400 to-emerald-600' },
  { title: 'Finance', href: '/finance', icon: Wallet, color: 'from-amber-400 to-amber-600' },
  { title: 'Projects', href: '/projects', icon: FolderKanban, color: 'from-violet-400 to-violet-600' },
  { title: 'CRM', href: '/crm', icon: UsersRound, color: 'from-rose-400 to-rose-600' },
  { title: 'Inventory', href: '/inventory', icon: Package, color: 'from-orange-400 to-orange-600' },
  { title: 'Helpdesk', href: '/helpdesk', icon: HeadphonesIcon, color: 'from-sky-400 to-sky-600' },
  { title: 'SaaS', href: '/saas', icon: Rocket, color: 'from-indigo-400 to-indigo-600' },
  { title: 'Healthcare', href: '/healthcare', icon: Heart, color: 'from-pink-400 to-pink-600' },
  { title: 'HR', href: '/hr', icon: UserCog, color: 'from-teal-400 to-teal-600' },
  { title: 'Marketing', href: '/marketing', icon: Megaphone, color: 'from-fuchsia-400 to-fuchsia-600' },
  { title: 'Real Estate', href: '/real-estate', icon: Home, color: 'from-lime-500 to-emerald-600' },
  { title: 'Education', href: '/education', icon: GraduationCap, color: 'from-cyan-400 to-cyan-600' },
  { title: 'Crypto', href: '/crypto', icon: Bitcoin, color: 'from-yellow-400 to-orange-500' },
  { title: 'Restaurant', href: '/restaurant', icon: UtensilsCrossed, color: 'from-red-400 to-red-600' },
]

const systemItems = [
  { title: 'Calendar', href: '/calendar', icon: CalendarDays, color: 'from-blue-400 to-indigo-600' },
  { title: 'Chat', href: '/chat', icon: MessageSquare, color: 'from-primary-400 to-primary-600' },
  { title: 'Email', href: '/email', icon: Mail, color: 'from-emerald-400 to-teal-600' },
]

// ============================================================================
// DEMO PANEL COMPONENT - Premium floating panel with all demos
// ============================================================================

const DemoPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div className={cn(
        'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )} />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative w-full max-w-3xl max-h-[85vh] overflow-auto',
          'rounded-2xl border border-slate-200/60 dark:border-slate-700/60',
          'bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl',
          'shadow-2xl shadow-slate-900/20 dark:shadow-black/40',
          'transition-all duration-300',
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
              <Play className="h-4 w-4 text-white fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Explore Demos</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">16 dashboards + 3 apps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Dashboards */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LayoutDashboard className="h-4 w-4 text-primary-500" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Dashboards</h4>
              <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded-full">16</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-2.5 p-3 rounded-xl',
                    'border border-slate-100 dark:border-slate-800',
                    'hover:border-primary-200 dark:hover:border-primary-800',
                    'hover:bg-primary-50/50 dark:hover:bg-primary-500/5',
                    'hover:shadow-md hover:shadow-primary-500/5',
                    'transition-all duration-200',
                  )}
                >
                  <div className={cn('flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br text-white shrink-0', item.color)}>
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors truncate">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Systems / Apps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-emerald-500" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Apps</h4>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {systemItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-2.5 p-3 rounded-xl',
                    'border border-slate-100 dark:border-slate-800',
                    'hover:border-emerald-200 dark:hover:border-emerald-800',
                    'hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5',
                    'hover:shadow-md hover:shadow-emerald-500/5',
                    'transition-all duration-200',
                  )}
                >
                  <div className={cn('flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br text-white shrink-0', item.color)}>
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SECTION 1 - HERO (Must impress in 3 seconds)
// ============================================================================

const HeroSection = () => {
  const t = useTranslations('landing')
  const [isDemoOpen, setIsDemoOpen] = React.useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-x-clip pt-20">
      {/* Background Image — subtle, blended, no zoom on mobile */}
      <div
        className="absolute -inset-x-16 inset-y-0 z-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40"
        style={{
          backgroundImage: 'url(/fundo-blackground.png)',
        }}
      />
      {/* Soft gradient overlay for harmony */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />

      {/* ECG pulse line — Desktop (3 beats, wide) */}
      <svg
        className="absolute inset-0 z-[1] w-full h-full pointer-events-none hidden md:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="hero-ecg-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="hero-ecg-glow" filter="url(#hero-ecg-glow)"
            d="M 0,350 L 80,350 L 160,350 L 220,350 L 240,342 L 260,358 L 275,350 L 340,350 L 400,350 L 420,332 L 440,378 L 460,300 L 480,372 L 500,340 L 520,350 L 600,350 L 680,350 L 740,350 L 760,342 L 780,358 L 795,350 L 860,350 L 920,350 L 940,334 L 960,376 L 980,302 L 1000,370 L 1020,342 L 1040,350 L 1120,350 L 1200,350 L 1260,350 L 1280,342 L 1300,358 L 1315,350 L 1380,350 L 1440,350"
            stroke="rgb(20, 184, 154)" strokeWidth="4" />
          <path className="hero-ecg-main"
            d="M 0,350 L 80,350 L 160,350 L 220,350 L 240,342 L 260,358 L 275,350 L 340,350 L 400,350 L 420,332 L 440,378 L 460,300 L 480,372 L 500,340 L 520,350 L 600,350 L 680,350 L 740,350 L 760,342 L 780,358 L 795,350 L 860,350 L 920,350 L 940,334 L 960,376 L 980,302 L 1000,370 L 1020,342 L 1040,350 L 1120,350 L 1200,350 L 1260,350 L 1280,342 L 1300,358 L 1315,350 L 1380,350 L 1440,350"
            stroke="rgb(94, 234, 212)" strokeWidth="1.2" />
          <path className="hero-ecg-echo"
            d="M 0,357 L 80,357 L 160,357 L 220,357 L 240,350 L 260,364 L 275,357 L 340,357 L 400,357 L 420,340 L 440,382 L 460,309 L 480,377 L 500,347 L 520,357 L 600,357 L 680,357 L 740,357 L 760,350 L 780,364 L 795,357 L 860,357 L 920,357 L 940,341 L 960,380 L 980,311 L 1000,375 L 1020,348 L 1040,357 L 1120,357 L 1200,357 L 1260,357 L 1280,350 L 1300,364 L 1315,357 L 1380,357 L 1440,357"
            stroke="rgb(94, 234, 212)" strokeWidth="0.4" />
        </g>
      </svg>

      {/* ECG pulse line — Mobile (1 beat, compact, centered, above buttons) */}
      <svg
        className="absolute inset-0 z-[1] w-full h-full pointer-events-none md:hidden"
        viewBox="0 0 500 600"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <filter id="hero-ecg-glow-m" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="hero-ecg-glow-mobile" filter="url(#hero-ecg-glow-m)"
            d="M 0,128 L 50,128 L 100,128 L 140,128 L 150,124 L 160,132 L 167,128 L 200,128 L 240,128 L 252,120 L 264,138 L 276,108 L 288,136 L 300,124 L 312,128 L 360,128 L 410,128 L 500,128"
            stroke="rgb(20, 184, 154)" strokeWidth="2" />
          <path className="hero-ecg-main-mobile"
            d="M 0,128 L 50,128 L 100,128 L 140,128 L 150,124 L 160,132 L 167,128 L 200,128 L 240,128 L 252,120 L 264,138 L 276,108 L 288,136 L 300,124 L 312,128 L 360,128 L 410,128 L 500,128"
            stroke="rgb(94, 234, 212)" strokeWidth="0.7" />
          <path className="hero-ecg-echo-mobile"
            d="M 0,132 L 50,132 L 100,132 L 140,132 L 150,129 L 160,135 L 167,132 L 200,132 L 240,132 L 252,125 L 264,141 L 276,113 L 288,139 L 300,127 L 312,132 L 360,132 L 410,132 L 500,132"
            stroke="rgb(94, 234, 212)" strokeWidth="0.25" />
        </g>
      </svg>

      <style>{`
        @keyframes hero-ecg-draw {
          0%   { stroke-dashoffset: 2800; opacity: 0; }
          3%   { opacity: 0.22; }
          35%  { stroke-dashoffset: 0; opacity: 0.18; }
          40%  { stroke-dashoffset: 2800; opacity: 0.05; }
          43%  { opacity: 0.22; }
          75%  { stroke-dashoffset: 0; opacity: 0.16; }
          85%  { stroke-dashoffset: 0; opacity: 0.04; }
          95%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hero-ecg-glow-draw {
          0%   { stroke-dashoffset: 2800; opacity: 0; }
          3%   { opacity: 0.10; }
          35%  { stroke-dashoffset: 0; opacity: 0.08; }
          40%  { stroke-dashoffset: 2800; opacity: 0.02; }
          43%  { opacity: 0.10; }
          75%  { stroke-dashoffset: 0; opacity: 0.06; }
          85%  { stroke-dashoffset: 0; opacity: 0.015; }
          95%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hero-ecg-draw-mobile {
          0%   { stroke-dashoffset: 800; opacity: 0; }
          5%   { opacity: 0.22; }
          35%  { stroke-dashoffset: 0; opacity: 0.18; }
          42%  { stroke-dashoffset: 800; opacity: 0.05; }
          45%  { opacity: 0.22; }
          75%  { stroke-dashoffset: 0; opacity: 0.16; }
          85%  { stroke-dashoffset: 0; opacity: 0.04; }
          95%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes hero-ecg-glow-draw-mobile {
          0%   { stroke-dashoffset: 800; opacity: 0; }
          5%   { opacity: 0.10; }
          35%  { stroke-dashoffset: 0; opacity: 0.08; }
          42%  { stroke-dashoffset: 800; opacity: 0.02; }
          45%  { opacity: 0.10; }
          75%  { stroke-dashoffset: 0; opacity: 0.06; }
          85%  { stroke-dashoffset: 0; opacity: 0.015; }
          95%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        /* Desktop */
        .hero-ecg-main {
          stroke-dasharray: 2800; stroke-dashoffset: 2800;
          animation: hero-ecg-draw 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .hero-ecg-echo {
          stroke-dasharray: 2800; stroke-dashoffset: 2800;
          animation: hero-ecg-draw 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.3s;
        }
        .hero-ecg-glow {
          stroke-dasharray: 2800; stroke-dashoffset: 2800;
          animation: hero-ecg-glow-draw 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        /* Mobile */
        .hero-ecg-main-mobile {
          stroke-dasharray: 800; stroke-dashoffset: 800;
          animation: hero-ecg-draw-mobile 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .hero-ecg-echo-mobile {
          stroke-dasharray: 800; stroke-dashoffset: 800;
          animation: hero-ecg-draw-mobile 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.3s;
        }
        .hero-ecg-glow-mobile {
          stroke-dasharray: 800; stroke-dashoffset: 800;
          animation: hero-ecg-glow-draw-mobile 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ecg-main, .hero-ecg-echo, .hero-ecg-glow,
          .hero-ecg-main-mobile, .hero-ecg-echo-mobile, .hero-ecg-glow-mobile {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-20">
        <div className="flex flex-col items-center text-center">

          {/* Animated Badge */}
          <div className="relative inline-flex mb-8 animate-[fadeInUp_0.6s_ease-out_both]">
            <div className={cn(
              'relative flex items-center gap-2.5 px-5 py-2.5 rounded-full',
              'bg-slate-900/5 dark:bg-white/10 backdrop-blur-md',
              'border border-slate-200/80 dark:border-white/15',
              'shadow-lg shadow-primary-500/10',
              'overflow-hidden cursor-pointer group',
              'hover:border-primary-400/40',
              'transition-all duration-300'
            )}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-900/5 dark:via-white/10 to-transparent" />
              <span className="relative flex items-center gap-2 text-sm font-medium">
                <PulseEcgIcon className="h-5 w-5 rounded-md" />
                <span className="bg-gradient-to-r from-primary-600 to-cyan-600 dark:from-primary-300 dark:to-cyan-300 bg-clip-text text-transparent font-semibold">
                  {t('hero.badge')}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-primary-500 dark:text-primary-400 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="animate-[fadeInUp_0.7s_ease-out_0.1s_both]">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {t('hero.title1')}
            </span>
            <span className="block mt-2 sm:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 dark:from-primary-400 dark:via-emerald-300 dark:to-cyan-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed animate-[fadeInUp_0.7s_ease-out_0.2s_both]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.7s_ease-out_0.3s_both]">
            <Link href="/register">
              <Button
                size="lg"
                className={cn(
                  'group gap-2.5 px-8 h-14 text-base font-semibold rounded-xl',
                  'bg-gradient-to-r from-primary-500 to-primary-600',
                  'hover:from-primary-600 hover:to-primary-700',
                  'shadow-xl shadow-primary-500/30',
                  'hover:shadow-2xl hover:shadow-primary-500/40',
                  'hover:scale-[1.03] active:scale-[0.98]',
                  'transition-all duration-300',
                  'animate-glow-pulse'
                )}
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsDemoOpen(true)}
              className={cn(
                'group gap-2.5 px-8 h-14 text-base font-semibold rounded-xl',
                'border-slate-300 text-slate-700 dark:border-white/20 dark:text-white',
                'hover:bg-slate-100 dark:hover:bg-white/10',
                'hover:border-slate-400 dark:hover:border-white/30',
                'hover:scale-[1.03] active:scale-[0.98]',
                'transition-all duration-300'
              )}
            >
              <Play className="h-5 w-5 fill-current" />
              {t('hero.watchDemo')}
            </Button>
          </div>

          {/* Demo Panel */}
          <DemoPanel isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

          {/* Social Proof */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4 animate-[fadeInUp_0.7s_ease-out_0.4s_both]">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Avatar Stack */}
              <div className="flex -space-x-2.5">
                {['SC', 'MR', 'EW', 'JP', 'LT'].map((initials, i) => (
                  <Avatar
                    key={i}
                    fallback={initials}
                    size="sm"
                    className="ring-[3px] ring-white dark:ring-slate-900 hover:z-10 hover:scale-110 transition-transform"
                  />
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-[10px] font-bold text-white ring-[3px] ring-white dark:ring-slate-900">
                  +5K
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">4.9/5</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">from 2,000+ reviews</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-white/70">
              {t('hero.trustedBy')}
            </p>
          </div>

        </div>
      </div>

      {/* Dashboard Preview — Full Width (outside max-w container) */}
      <div className="relative z-10 w-full px-3 sm:px-6 lg:px-10 mt-14 sm:mt-16 lg:mt-20 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-6 sm:-inset-10 rounded-[2rem] bg-gradient-to-r from-primary-500/30 via-primary-400/15 to-cyan-500/25 blur-3xl opacity-70 animate-orb" />

              {/* 3D container */}
              <div className="relative perspective-1200">
                <div className="relative rounded-2xl lg:rounded-3xl border border-slate-200/60 dark:border-slate-700/40 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden rotate-x-2 hover:rotate-x-0 transition-transform duration-700 ease-out">
                  {/* Green accent bar at top of panel */}
                  <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-primary-500 to-teal-400 dark:from-emerald-500 dark:via-primary-400 dark:to-teal-500" />
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/40">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-2 px-4 py-1 bg-white dark:bg-slate-700 rounded-md text-xs text-slate-400 dark:text-slate-500 min-w-[200px] justify-center border border-slate-100 dark:border-slate-600">
                        <Lock className="h-3 w-3" />
                        app.pulse.io/dashboard
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-6 h-4 rounded bg-slate-100 dark:bg-slate-700" />
                      <div className="w-6 h-4 rounded bg-slate-100 dark:bg-slate-700" />
                    </div>
                  </div>

                  {/* Dashboard body with sidebar */}
                  <div className="flex">
                    {/* Sidebar — desktop only */}
                    <div className="hidden lg:flex flex-col w-[180px] xl:w-[200px] border-r border-slate-200/60 dark:border-slate-700/40 bg-white dark:bg-slate-900 py-3 px-2.5 shrink-0">
                      {/* Logo area */}
                      <div className="flex items-center gap-2.5 px-2 mb-4">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                          <Activity className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Pulse</span>
                      </div>

                      {/* Nav items */}
                      <nav className="flex flex-col gap-0.5">
                        {[
                          { icon: LayoutDashboard, label: 'Overview', active: true },
                          { icon: BarChart3, label: 'Analytics', active: false },
                          { icon: Users, label: 'Customers', active: false },
                          { icon: ShoppingCart, label: 'Orders', active: false },
                          { icon: Wallet, label: 'Finance', active: false },
                          { icon: FolderKanban, label: 'Projects', active: false },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                              item.active
                                ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            )}
                          >
                            <item.icon className="h-3.5 w-3.5" />
                            {item.label}
                          </div>
                        ))}
                      </nav>

                      {/* Divider */}
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2.5" />

                      {/* Secondary nav */}
                      <nav className="flex flex-col gap-0.5">
                        {[
                          { icon: CalendarDays, label: 'Calendar' },
                          { icon: Mail, label: 'Messages' },
                          { icon: MessageSquare, label: 'Chat' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400"
                          >
                            <item.icon className="h-3.5 w-3.5" />
                            {item.label}
                          </div>
                        ))}
                      </nav>

                      {/* Bottom user card */}
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2.5 px-2">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-[10px] font-bold text-white">AA</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-slate-900 dark:text-white truncate">Adri Amaro</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">admin@pulse.io</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 min-w-0">
                      {/* Top bar */}
                      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Dashboard Overview</h3>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">Welcome back, Adri</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                            <Database className="h-3 w-3" />
                            <span>Last 30 days</span>
                          </div>
                          <div className="relative">
                            <Bell className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary-500 border border-white dark:border-slate-900" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 bg-gradient-to-br from-slate-50/80 to-slate-100/30 dark:from-slate-800/30 dark:to-slate-900/60">
                        {/* Stats row — premium gradient cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
                          {[
                            { label: 'Total Revenue', value: '$48,529', change: '+12.5%', icon: TrendingUp, gradient: 'from-emerald-500 to-emerald-600', gradientLight: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20', accent: 'text-emerald-600 dark:text-emerald-400', accentBg: 'bg-emerald-500/10', strokeColor: '#10b981', sparkline: [30, 45, 35, 55, 45, 65, 50, 70, 60, 80] },
                            { label: 'Active Users', value: '2,847', change: '+8.2%', icon: Users, gradient: 'from-teal-500 to-teal-600', gradientLight: 'from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10', accent: 'text-teal-600 dark:text-teal-400', accentBg: 'bg-teal-500/10', strokeColor: '#14b89a', sparkline: [40, 35, 50, 45, 55, 50, 65, 60, 70, 75] },
                            { label: 'Conversions', value: '1,234', change: '+23.1%', icon: Activity, gradient: 'from-blue-500 to-blue-600', gradientLight: 'from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20', accent: 'text-blue-600 dark:text-blue-400', accentBg: 'bg-blue-500/10', strokeColor: '#3b82f6', sparkline: [20, 40, 30, 60, 45, 70, 55, 80, 65, 90] },
                            { label: 'Avg. Growth', value: '18.2%', change: '+4.3%', icon: BarChart3, gradient: 'from-violet-500 to-violet-600', gradientLight: 'from-violet-50 to-violet-100/50 dark:from-violet-950/40 dark:to-violet-900/20', accent: 'text-violet-600 dark:text-violet-400', accentBg: 'bg-violet-500/10', strokeColor: '#8b5cf6', sparkline: [50, 45, 60, 55, 65, 60, 70, 68, 75, 72] },
                          ].map((stat, i) => (
                            <div key={i} className={cn('group relative p-3 rounded-xl overflow-hidden border border-emerald-300/50 dark:border-emerald-500/20 bg-gradient-to-br', stat.gradientLight, 'hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 transition-all duration-300')}>
                              {/* Subtle gradient accent bar at top */}
                              <div className={cn('absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r', stat.gradient)} />
                              <div className="flex items-center justify-between mb-2">
                                <div className={cn('flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br text-white', stat.gradient)}>
                                  <stat.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-md', stat.accent, stat.accentBg)}>{stat.change}</span>
                              </div>
                              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                {/* Colored sparkline with area fill */}
                                <svg className="h-5 w-14" viewBox="0 0 56 20" fill="none">
                                  <defs>
                                    <linearGradient id={`spark-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor={stat.strokeColor} stopOpacity="0.2" />
                                      <stop offset="100%" stopColor={stat.strokeColor} stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                  {/* Area fill */}
                                  <path
                                    d={`M0,${20 - (stat.sparkline[0]! / 100) * 16} ${stat.sparkline.map((v, j) => `L${j * 6.2},${20 - (v / 100) * 16}`).join(' ')} L${(stat.sparkline.length - 1) * 6.2},20 L0,20 Z`}
                                    fill={`url(#spark-fill-${i})`}
                                  />
                                  {/* Line */}
                                  <polyline
                                    points={stat.sparkline.map((v, j) => `${j * 6.2},${20 - (v / 100) * 16}`).join(' ')}
                                    stroke={stat.strokeColor}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                  />
                                  {/* End dot */}
                                  <circle
                                    cx={(stat.sparkline.length - 1) * 6.2}
                                    cy={20 - (stat.sparkline[stat.sparkline.length - 1]! / 100) * 16}
                                    r="2"
                                    fill={stat.strokeColor}
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Chart + side panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
                          {/* Revenue Chart — large, premium area chart */}
                          <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 dark:from-slate-800/90 dark:via-emerald-950/10 dark:to-teal-950/15 border border-emerald-200/40 dark:border-emerald-500/15 p-3 relative overflow-hidden">
                            {/* Ambient glows */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-200/15 to-transparent dark:from-primary-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-1/4 w-32 h-24 bg-gradient-to-t from-emerald-200/10 to-transparent dark:from-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="relative z-10">
                              <div className="flex justify-between items-center mb-3">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Revenue Overview</p>
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Monthly performance</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-500" />
                                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Revenue</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 dark:from-violet-500 dark:to-blue-500" />
                                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Expenses</span>
                                  </div>
                                </div>
                              </div>
                              {/* SVG Area Chart */}
                              <svg className="w-full h-24 sm:h-28" viewBox="0 0 480 120" preserveAspectRatio="none" fill="none">
                                <defs>
                                  {/* Revenue area gradient */}
                                  <linearGradient id="rev-area-fill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14B89A" stopOpacity="0.3" />
                                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                  </linearGradient>
                                  {/* Revenue line gradient */}
                                  <linearGradient id="rev-line-grad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="50%" stopColor="#14B89A" />
                                    <stop offset="100%" stopColor="#0d9488" />
                                  </linearGradient>
                                  {/* Expense area gradient */}
                                  <linearGradient id="exp-area-fill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                  </linearGradient>
                                  {/* Line glow filter */}
                                  <filter id="rev-glow">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feMerge>
                                      <feMergeNode in="blur" />
                                      <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                  </filter>
                                </defs>
                                {/* Grid lines */}
                                {[25, 50, 75, 100].map((y) => (
                                  <line key={y} x1="30" y1={y} x2="470" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-emerald-200/50 dark:text-emerald-800/30" />
                                ))}
                                {/* Y-axis labels */}
                                <text x="26" y="28" textAnchor="end" className="fill-slate-400 dark:fill-slate-500 text-[8px]" fontSize="8">$50K</text>
                                <text x="26" y="53" textAnchor="end" className="fill-slate-400 dark:fill-slate-500 text-[8px]" fontSize="8">$35K</text>
                                <text x="26" y="78" textAnchor="end" className="fill-slate-400 dark:fill-slate-500 text-[8px]" fontSize="8">$20K</text>
                                <text x="26" y="103" textAnchor="end" className="fill-slate-400 dark:fill-slate-500 text-[8px]" fontSize="8">$5K</text>
                                {/* Expense area + line (behind revenue) */}
                                <path d="M30,85 C55,80 65,72 90,68 C115,64 125,75 150,70 C175,65 185,58 210,55 C235,52 245,62 270,58 C295,54 305,48 330,50 C355,52 365,60 390,56 C415,52 425,45 450,48 L470,50 L470,110 L30,110 Z" fill="url(#exp-area-fill)" />
                                <path d="M30,85 C55,80 65,72 90,68 C115,64 125,75 150,70 C175,65 185,58 210,55 C235,52 245,62 270,58 C295,54 305,48 330,50 C355,52 365,60 390,56 C415,52 425,45 450,48 L470,50" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                                {/* Revenue area fill */}
                                <path d="M30,70 C55,55 65,60 90,45 C115,30 125,40 150,35 C175,30 185,22 210,18 C235,14 245,28 270,22 C295,16 305,30 330,25 C355,20 365,15 390,20 C415,25 425,12 450,15 L470,18 L470,110 L30,110 Z" fill="url(#rev-area-fill)" />
                                {/* Revenue line with glow */}
                                <path d="M30,70 C55,55 65,60 90,45 C115,30 125,40 150,35 C175,30 185,22 210,18 C235,14 245,28 270,22 C295,16 305,30 330,25 C355,20 365,15 390,20 C415,25 425,12 450,15 L470,18" fill="none" stroke="url(#rev-line-grad)" strokeWidth="2" strokeLinecap="round" filter="url(#rev-glow)" />
                                {/* Data points on revenue line */}
                                {[[30,70],[90,45],[150,35],[210,18],[270,22],[330,25],[390,20],[450,15]].map(([cx,cy], idx) => (
                                  <g key={idx}>
                                    <circle cx={cx} cy={cy} r="3.5" fill="white" stroke="#14B89A" strokeWidth="1.5" className="dark:fill-slate-800" />
                                  </g>
                                ))}
                                {/* X-axis month labels */}
                                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                                  <text key={m} x={30 + i * 40} y="118" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500" fontSize="7">{m}</text>
                                ))}
                              </svg>
                              {/* Inline summary below chart */}
                              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-emerald-100/40 dark:border-emerald-800/15">
                                {[
                                  { label: 'Total', value: '$48.5K', color: 'text-emerald-600 dark:text-emerald-400' },
                                  { label: 'Avg/mo', value: '$4.04K', color: 'text-slate-700 dark:text-slate-300' },
                                  { label: 'Best', value: 'Oct $8.2K', color: 'text-primary-600 dark:text-primary-400' },
                                  { label: 'Growth', value: '+24.5%', color: 'text-emerald-600 dark:text-emerald-400' },
                                ].map((s, i) => (
                                  <div key={i} className="text-center">
                                    <p className="text-[7px] uppercase tracking-wider text-slate-400 dark:text-slate-500">{s.label}</p>
                                    <p className={cn('text-[10px] font-bold leading-tight', s.color)}>{s.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Traffic Sources + Quick Stats */}
                          <div className="flex flex-col gap-2.5">
                            <div className="rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/30 p-3 flex-1">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2.5">Traffic Sources</p>
                              <div className="space-y-2">
                                {[
                                  { label: 'Direct', value: '35%', color: 'bg-primary-500', w: 'w-[70%]' },
                                  { label: 'Organic', value: '28%', color: 'bg-blue-500', w: 'w-[56%]' },
                                  { label: 'Referral', value: '22%', color: 'bg-violet-500', w: 'w-[44%]' },
                                  { label: 'Social', value: '15%', color: 'bg-emerald-500', w: 'w-[30%]' },
                                ].map((src, i) => (
                                  <div key={i}>
                                    <div className="flex justify-between text-[11px] mb-1">
                                      <span className="text-slate-500 dark:text-slate-400">{src.label}</span>
                                      <span className="font-semibold text-slate-700 dark:text-slate-200">{src.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                                      <div className={cn('h-full rounded-full transition-all duration-500', src.color, src.w)} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Conversion donut placeholder */}
                            <div className="rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/30 p-3">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Conversion Rate</p>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 shrink-0">
                                  <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-slate-700" />
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="62 88" strokeLinecap="round" className="text-primary-500" />
                                  </svg>
                                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">68%</span>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-900 dark:text-white">+5.2%</p>
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500">vs last month</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 lg:-left-12 top-[18%] hidden lg:block animate-float z-10">
                <div className="p-3.5 rounded-xl glass shadow-xl dark:card-glow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Growth</p>
                      <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">+28.4%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 lg:-right-12 top-[25%] hidden lg:block animate-float-delayed z-10">
                <div className="p-3.5 rounded-xl glass shadow-xl dark:card-glow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                      <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Active Users</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white">2,847</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 lg:-right-8 bottom-[18%] hidden lg:block animate-float-slow z-10">
                <div className="p-2.5 px-3.5 rounded-xl glass shadow-lg dark:card-glow">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Revenue milestone reached!</span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-3 lg:-left-8 bottom-[22%] hidden lg:block animate-float-delayed z-10">
                <div className="p-2.5 px-3.5 rounded-xl glass shadow-lg dark:card-glow">
                  <div className="flex items-center gap-2.5">
                    <Bell className="h-3.5 w-3.5 text-primary-500" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">12 new sign-ups today</span>
                  </div>
                </div>
              </div>
            </div>
      </div>

      {/* Fade-in keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

// ============================================================================
// SECTION 2 - LOGO CLOUD (Premium)
// ============================================================================

const BRAND_LOGOS = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: 'group-hover:text-cyan-500 dark:group-hover:text-cyan-400',
    iconBg: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50',
    hoverBorder: 'group-hover:border-cyan-200 dark:group-hover:border-cyan-800/60',
    hoverShadow: 'group-hover:shadow-cyan-200/50 dark:group-hover:shadow-cyan-900/30',
    accentBar: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 180 180" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
        <mask id="nj-m" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#nj-m)">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325Z" fill="url(#nj-a)" />
          <rect x="115" y="54" width="12" height="72" fill="url(#nj-b)" />
        </g>
        <defs>
          <linearGradient id="nj-a" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nj-b" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'group-hover:text-slate-900 dark:group-hover:text-white',
    iconBg: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800',
    hoverBorder: 'group-hover:border-slate-300 dark:group-hover:border-slate-600',
    hoverShadow: 'group-hover:shadow-slate-200/50 dark:group-hover:shadow-slate-800/30',
    accentBar: 'from-slate-500 to-slate-800',
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 128 128" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
        <rect width="128" height="128" rx="10" fill="#3178C6" />
        <path d="M82.916 89.88c3.252 1.696 7.488 2.972 11.476 2.972 4.236 0 6.748-2.124 6.748-5.06 0-3.46-2.724-4.684-7.312-6.7l-2.724-1.168c-7.1-3.036-11.828-6.844-11.828-14.888 0-7.42 5.652-13.06 14.496-13.06 4.488 0 8.688 1.344 11.476 3.892v8.38c-3.108-2.512-7.312-4.028-11.476-4.028-3.82 0-5.964 1.912-5.964 4.564 0 3.176 2.512 4.472 6.464 6.168l2.724 1.168c8.368 3.604 13.132 7.204 13.132 15.356 0 8.48-6.64 14.14-15.592 14.14-5.412 0-10.432-1.696-14.284-5.024V89.88ZM49.46 59.34h12.584v39.692h9.5V59.34h12.584v-7.984H49.46v7.984Z" fill="white" />
      </svg>
    ),
    color: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    iconBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50',
    hoverBorder: 'group-hover:border-blue-200 dark:group-hover:border-blue-800/60',
    hoverShadow: 'group-hover:shadow-blue-200/50 dark:group-hover:shadow-blue-900/30',
    accentBar: 'from-blue-400 to-blue-700',
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg viewBox="0 0 54 33" fill="none" className="h-4 w-6 sm:h-5 sm:w-7">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.088 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.112 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.288 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.312 20.192 16.2 13.5 16.2Z" fill="#06B6D4" />
      </svg>
    ),
    color: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    iconBg: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50',
    hoverBorder: 'group-hover:border-cyan-200 dark:group-hover:border-cyan-800/60',
    hoverShadow: 'group-hover:shadow-cyan-200/50 dark:group-hover:shadow-cyan-900/30',
    accentBar: 'from-cyan-400 to-sky-600',
  },
  {
    name: 'Radix UI',
    icon: (
      <svg viewBox="0 0 25 25" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
        <path d="M12 25a8 8 0 1 1 0-16v16ZM12 0H4v8h8V0ZM17 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </svg>
    ),
    color: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    iconBg: 'group-hover:bg-violet-50 dark:group-hover:bg-violet-950/50',
    hoverBorder: 'group-hover:border-violet-200 dark:group-hover:border-violet-800/60',
    hoverShadow: 'group-hover:shadow-violet-200/50 dark:group-hover:shadow-violet-900/30',
    accentBar: 'from-violet-400 to-violet-700',
  },
  {
    name: 'Prisma',
    icon: (
      <svg viewBox="0 0 159 194" fill="none" className="h-5 w-4 sm:h-6 sm:w-5">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.392 122.382L71.076 4.094c3.542-6.1 12.26-6.536 16.364-.82l56.828 79.152c2.348 3.27 2.596 7.598.646 11.11l-38.992 70.252c-1.94 3.496-5.584 5.686-9.562 5.746l-80.532 1.212c-8.056.12-13.032-8.7-8.436-14.948l-4.9-33.416Zm12.006 3.324l70.244-109.61c1.634-2.552 5.42-2.2 6.56.612l41.636 102.804c1.188 2.936-.92 6.14-4.064 6.178l-107.888 1.478c-3.588.05-5.722-3.95-3.688-6.906l-2.8 5.444Z" fill="currentColor" />
      </svg>
    ),
    color: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    iconBg: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50',
    hoverBorder: 'group-hover:border-indigo-200 dark:group-hover:border-indigo-800/60',
    hoverShadow: 'group-hover:shadow-indigo-200/50 dark:group-hover:shadow-indigo-900/30',
    accentBar: 'from-indigo-400 to-indigo-700',
  },
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 76 65" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
    color: 'group-hover:text-slate-900 dark:group-hover:text-white',
    iconBg: 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800',
    hoverBorder: 'group-hover:border-slate-300 dark:group-hover:border-slate-600',
    hoverShadow: 'group-hover:shadow-slate-200/50 dark:group-hover:shadow-slate-800/30',
    accentBar: 'from-slate-400 to-slate-700',
  },
  {
    name: 'Supabase',
    icon: (
      <svg viewBox="0 0 109 113" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.15 54.347Z" fill="url(#supa-a)" />
        <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.15 54.347Z" fill="url(#supa-b)" fillOpacity=".2" />
        <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z" fill="#3ECF8E" />
        <defs>
          <linearGradient id="supa-a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361" /><stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
          <linearGradient id="supa-b" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
            <stop /><stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    iconBg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50',
    hoverBorder: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800/60',
    hoverShadow: 'group-hover:shadow-emerald-200/50 dark:group-hover:shadow-emerald-900/30',
    accentBar: 'from-emerald-400 to-emerald-600',
  },
]

const BrandLogo = ({ brand, size = 'md' }: { brand: typeof BRAND_LOGOS[number]; size?: 'sm' | 'md' }) => {
  const isSmall = size === 'sm'
  const cardPadding = isSmall ? 'px-3 py-2.5 sm:px-4 sm:py-3' : 'px-4 py-3 sm:px-5 sm:py-3.5'
  const iconSize = isSmall ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-8 w-8 sm:h-9 sm:w-9'
  const textClasses = isSmall
    ? 'text-sm sm:text-base font-semibold tracking-tight'
    : 'text-base sm:text-lg font-bold tracking-tight'

  return (
    <div className={cn(
      'group relative flex items-center gap-2.5 sm:gap-3 select-none rounded-xl',
      'border border-slate-200/70 dark:border-slate-800/70',
      'bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm',
      'transition-all duration-300 ease-out',
      'hover:scale-[1.04] hover:shadow-lg',
      brand.hoverBorder,
      brand.hoverShadow,
      cardPadding,
    )}>
      {/* Accent bar — bottom, appears on hover */}
      <div className={cn(
        'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full',
        'bg-gradient-to-r transition-all duration-300',
        'group-hover:w-3/4',
        brand.accentBar,
      )} />

      {/* Icon container with subtle bg */}
      <div className={cn(
        'flex items-center justify-center rounded-lg flex-shrink-0',
        'bg-slate-50 dark:bg-slate-800/80',
        'transition-colors duration-300',
        brand.iconBg,
        iconSize,
      )}>
        <span className={cn(
          'text-slate-400 dark:text-slate-500 transition-colors duration-300',
          brand.color,
        )}>
          {brand.icon}
        </span>
      </div>

      {/* Brand name */}
      <span className={cn(
        textClasses,
        'text-slate-400 dark:text-slate-500 transition-colors duration-300',
        brand.color || 'group-hover:text-slate-900 dark:group-hover:text-white',
      )}>
        {brand.name}
      </span>
    </div>
  )
}

const LogoCloudSection = () => {
  const t = useTranslations('landing')

  return (
    <RevealSection>
      <section className="relative py-12 sm:py-16 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,154,0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,154,0.1),transparent)]" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Container — gradient border */}
          <div className="relative rounded-2xl sm:rounded-3xl p-px bg-gradient-to-b from-primary-300/60 via-primary-200/20 to-slate-200/40 dark:from-primary-600/40 dark:via-primary-800/20 dark:to-slate-800/30 shadow-xl shadow-primary-500/5 dark:shadow-primary-900/10">
            {/* Inner container — glassmorphism */}
            <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl overflow-hidden">
              {/* Top accent bar — gradient */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-emerald-400 to-cyan-400 dark:from-primary-500 dark:via-emerald-400 dark:to-cyan-500" />

              {/* Glow accent — full width */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-primary-400/8 to-transparent dark:from-primary-500/10 pointer-events-none" />

              {/* Content */}
              <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
                {/* Title Block */}
                <div className="scroll-reveal text-center mb-8 sm:mb-10">
                  {/* Badge */}
                  <div className="inline-flex items-center mb-4">
                    <div className="relative p-px rounded-full bg-gradient-to-r from-primary-400 via-emerald-300 to-cyan-400 dark:from-primary-500 dark:via-emerald-400 dark:to-cyan-500">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-950">
                        <Sparkles className="h-3.5 w-3.5 text-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-primary-600 to-emerald-600 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent">
                          {t('logos.badge')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                      {t('logos.title')}
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="mt-2 sm:mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                    {t('logos.subtitle')}
                  </p>
                </div>

                {/* Single Marquee Row */}
                <div className="scroll-reveal stagger-1 relative">
                  <div className="absolute left-0 top-0 z-10 h-full w-16 sm:w-28 lg:w-36 bg-gradient-to-r from-white/90 dark:from-slate-950/90 to-transparent pointer-events-none" />
                  <div className="absolute right-0 top-0 z-10 h-full w-16 sm:w-28 lg:w-36 bg-gradient-to-l from-white/90 dark:from-slate-950/90 to-transparent pointer-events-none" />
                  <div className="flex overflow-hidden py-1">
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 animate-logo-scroll">
                      {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                        <div key={`r1-${i}`} className="flex-shrink-0">
                          <BrandLogo brand={brand} size="md" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 animate-logo-scroll ml-3 sm:ml-4 lg:ml-5" aria-hidden>
                      {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                        <div key={`r1d-${i}`} className="flex-shrink-0">
                          <BrandLogo brand={brand} size="md" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee keyframes */}
        <style jsx>{`
          @keyframes logo-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-logo-scroll {
            animation: logo-scroll 40s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-logo-scroll {
              animation: none;
            }
          }
        `}</style>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 3 - FEATURES (Zig-Zag + Mini Grid)
// ============================================================================

// Feature data is now defined inside FeaturesSection for i18n access

// Feature visual mock components
const FeatureVisual = ({ type }: { type: string }) => {
  if (type === 'analytics') {
    return (
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Live Analytics</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Real-time</span>
          </div>
        </div>
        {(() => {
          const metrics = [
            { label: 'Visitors', value: '12.4K', change: '+14%' },
            { label: 'Conversion', value: '3.2%', change: '+0.8%' },
            { label: 'Revenue', value: '$8.4K', change: '+22%' },
            { label: 'Sessions', value: '38.1K', change: '+11%' },
            { label: 'Bounce', value: '24.3%', change: '-3.2%' },
            { label: 'Avg Time', value: '4m 12s', change: '+18%' },
          ]
          const MetricCard = ({ m }: { m: typeof metrics[number] }) => (
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40">
              <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{m.value}</p>
              <p className={cn('text-[10px] font-medium', m.change.startsWith('-') ? 'text-emerald-500' : 'text-emerald-500')}>{m.change}</p>
            </div>
          )
          return (
            <>
              {/* Mobile: infinite marquee */}
              <div className="sm:hidden overflow-hidden">
                <div className="flex animate-[marquee-analytics_18s_linear_infinite] gap-3 w-max">
                  {[...metrics, ...metrics].map((m, i) => (
                    <div key={i} className="w-[100px] shrink-0">
                      <MetricCard m={m} />
                    </div>
                  ))}
                </div>
                <style>{`
                  @keyframes marquee-analytics {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                `}</style>
              </div>
              {/* Desktop: grid */}
              <div className="hidden sm:grid grid-cols-3 gap-3">
                {metrics.slice(0, 3).map((m, i) => (
                  <MetricCard key={i} m={m} />
                ))}
              </div>
            </>
          )
        })()}
        {(() => {
          const bars = [30, 50, 35, 70, 45, 80, 60, 90, 55, 75, 85, 65, 95, 70, 80, 40, 65, 50, 85, 60]
          return (
            <>
              {/* Mobile: scrolling bars */}
              <div className="sm:hidden h-10 overflow-hidden">
                <div className="flex items-end gap-1 h-full animate-[marquee-bars_12s_linear_infinite] w-max">
                  {[...bars, ...bars].map((h, i) => (
                    <div key={i} className="w-2 shrink-0 bg-gradient-to-t from-primary-500/80 to-primary-400/60 dark:from-primary-400/80 dark:to-primary-300/60 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <style>{`
                  @keyframes marquee-bars {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                `}</style>
              </div>
              {/* Desktop: static bars */}
              <div className="hidden sm:flex items-end gap-1 h-20">
                {bars.slice(0, 15).map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-primary-500/80 to-primary-400/60 dark:from-primary-400/80 dark:to-primary-300/60 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </>
          )
        })()}
        {/* Top Sources — premium addition (hidden on mobile to save space) */}
        <div className="hidden sm:block rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 p-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Top Sources</span>
            <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">Last 24h</span>
          </div>
          <div className="space-y-2">
            {[
              { source: 'Direct', pct: 42, color: 'bg-primary-500' },
              { source: 'Google', pct: 31, color: 'bg-blue-500' },
              { source: 'Twitter', pct: 18, color: 'bg-sky-400' },
              { source: 'GitHub', pct: 9, color: 'bg-slate-600 dark:bg-slate-400' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 w-12 truncate">{s.source}</span>
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all', s.color)} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 w-7 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'collaboration') {
    return (
      <div className="p-4 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Project Board</span>
          <Badge variant="primary" size="sm">5 active</Badge>
        </div>
        {[
          { title: 'Dashboard redesign', status: 'In Progress', avatars: ['SC', 'MR'], color: 'bg-blue-500' },
          { title: 'API v2 migration', status: 'Review', avatars: ['EW'], color: 'bg-amber-500' },
          { title: 'Mobile app launch', status: 'Planning', avatars: ['JP', 'LT', 'DK'], color: 'bg-primary-500' },
          { title: 'Auth system overhaul', status: 'In Progress', avatars: ['SC', 'EW'], color: 'bg-emerald-500' },
          { title: 'Analytics pipeline', status: 'Backlog', avatars: ['MR'], color: 'bg-slate-400' },
        ].map((task, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40">
            <div className={cn('h-2 w-2 rounded-full shrink-0', task.color)} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{task.title}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{task.status}</p>
            </div>
            <div className="flex -space-x-1.5">
              {task.avatars.map((a, j) => (
                <div key={j} className="h-5 w-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-[8px] font-bold text-white ring-1 ring-white dark:ring-slate-800">
                  {a}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // integrations
  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Connected Apps</span>
          <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-[10px] font-bold text-primary-600 dark:text-primary-400">150+</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">All synced</span>
        </div>
      </div>
      {(() => {
        const apps = [
          { name: 'Slack', color: 'bg-[#4A154B]', shadow: 'shadow-[#4A154B]/20', svg: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52ZM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313ZM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834ZM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312ZM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834ZM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312ZM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52ZM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313Z" fill="white" />
            </svg>
          )},
          { name: 'GitHub', color: 'bg-[#24292F]', shadow: 'shadow-[#24292F]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
          )},
          { name: 'Jira', color: 'bg-[#0052CC]', shadow: 'shadow-[#0052CC]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005ZM5.024 5.235H16.57a1.005 1.005 0 0 0 1.005-1.005A5.218 5.218 0 0 0 12.347 0h-2.1V2.1A5.216 5.216 0 0 1 5.024 7.32V5.235ZM17.57 5.235A5.217 5.217 0 0 0 12.345 0v2.1a5.217 5.217 0 0 1 5.225 5.22v2.1h2.1a5.217 5.217 0 0 0 0-4.185h-2.1Z" />
            </svg>
          )},
          { name: 'Stripe', color: 'bg-[#635BFF]', shadow: 'shadow-[#635BFF]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.888 5.534C5.255 23.117 8.2 24 11.324 24c2.6 0 4.736-.624 6.29-1.81 1.69-1.291 2.63-3.199 2.63-5.647 0-4.182-2.505-5.952-6.268-7.393Z" />
            </svg>
          )},
          { name: 'Figma', color: 'bg-[#F24E1E]', shadow: 'shadow-[#F24E1E]/20', svg: (
            <svg viewBox="0 0 38 57" fill="none" className="h-5 w-3.5">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0ACF83" />
              <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262" />
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
            </svg>
          )},
          { name: 'Notion', color: 'bg-[#000000]', shadow: 'shadow-black/15', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.09 2.13c-.42-.326-.98-.7-2.055-.606L3.06 2.611c-.467.046-.56.28-.374.466l1.773 1.13ZM5.252 7.617v13.874c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.824c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.793ZM17.678 8.317c.094.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.494-.934l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.187c-.093-.187 0-.653.327-.747l.84-.233V9.854l-1.168-.093c-.094-.42.14-1.027.793-1.074l3.456-.233 4.764 7.28v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187Z" />
            </svg>
          )},
          { name: 'Linear', color: 'bg-[#5E6AD2]', shadow: 'shadow-[#5E6AD2]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M2.088 14.38c-.097-.164-.012-.38.162-.381l6.391-.02c.133 0 .24.108.24.24v6.392c0 .174-.216.258-.38.162a10.022 10.022 0 0 1-6.413-6.393ZM2.003 11.867a.122.122 0 0 1-.036-.09c.15-2.584 1.306-5.093 3.39-7.01A10.019 10.019 0 0 1 12.233 2.04a.122.122 0 0 1 .123.122l.019 9.663a.24.24 0 0 1-.24.24l-9.99-.078a.121.121 0 0 1-.084-.035l-.058-.085ZM14.508 2.96c.164-.096.38-.011.38.163l.02 6.391a.24.24 0 0 1-.24.24H8.276c-.174 0-.258-.217-.162-.381a10.022 10.022 0 0 1 6.394-6.413Z" />
            </svg>
          )},
          { name: 'Zapier', color: 'bg-[#FF4A00]', shadow: 'shadow-[#FF4A00]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M15.557 12.004a7.683 7.683 0 0 1-.462 1.61l-.062.144-.138.062a7.69 7.69 0 0 1-1.606.463h-.002a7.895 7.895 0 0 1-2.58 0 7.69 7.69 0 0 1-1.606-.463l-.138-.062-.062-.144a7.69 7.69 0 0 1-.463-1.606v-.002a7.895 7.895 0 0 1 0-2.58 7.69 7.69 0 0 1 .463-1.606l.062-.144.138-.062a7.69 7.69 0 0 1 1.606-.463h.002a7.895 7.895 0 0 1 2.58 0 7.69 7.69 0 0 1 1.606.463l.138.062.062.144c.216.516.37 1.053.462 1.606v.002a7.895 7.895 0 0 1 0 2.58v-.004Zm8.39-3.084h-6.222l4.4-4.4-1.644-1.644-4.4 4.4V1.054h-2.326v6.222l-4.4-4.4-1.644 1.644 4.4 4.4H6.054v2.326h6.222l-4.4 4.4 1.644 1.644 4.4-4.4v6.222h2.326V17.89l4.4 4.4 1.644-1.644-4.4-4.4h6.222V13.92h.054v-5Z" />
            </svg>
          )},
          { name: 'HubSpot', color: 'bg-[#FF7A59]', shadow: 'shadow-[#FF7A59]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.198 2.198 0 0 0 17.233.836h-.066a2.198 2.198 0 0 0-2.198 2.198v.066a2.2 2.2 0 0 0 1.262 1.98v2.853a5.88 5.88 0 0 0-2.544 1.293L6.162 3.57a2.469 2.469 0 0 0 .078-.579A2.49 2.49 0 1 0 3.75 5.482a2.478 2.478 0 0 0 1.258-.363l7.44 5.59a5.883 5.883 0 0 0 .072 5.861l-2.254 2.254a2.063 2.063 0 0 0-.606-.102 2.104 2.104 0 1 0 2.104 2.104c0-.206-.04-.402-.1-.588l2.218-2.218a5.892 5.892 0 1 0 6.282-10.09Z" />
            </svg>
          )},
          { name: 'Vercel', color: 'bg-[#000000]', shadow: 'shadow-black/15', svg: (
            <svg viewBox="0 0 76 65" fill="white" className="h-4 w-4">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          )},
          { name: 'Supabase', color: 'bg-[#3ECF8E]', shadow: 'shadow-[#3ECF8E]/20', svg: (
            <svg viewBox="0 0 109 113" fill="none" className="h-5 w-5">
              <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.15 54.347Z" fill="white" />
              <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z" fill="white" opacity=".6" />
            </svg>
          )},
          { name: 'AWS', color: 'bg-[#FF9900]', shadow: 'shadow-[#FF9900]/20', svg: (
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.24-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104a6.37 6.37 0 0 0-.862.272 2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167 4.593 4.593 0 0 1 1.005-.36 4.84 4.84 0 0 1 1.246-.168c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586Zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296Zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311l-1.876-6.175a1.378 1.378 0 0 1-.072-.335c0-.128.064-.2.191-.2h.783c.152 0 .256.025.304.08.064.048.112.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.152-.312a.546.546 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.524.524 0 0 1 .311-.08h.743c.128 0 .2.064.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.215l-1.924 6.175c-.048.16-.104.263-.168.311a.524.524 0 0 1-.311.08h-.687c-.151 0-.255-.024-.32-.08-.063-.055-.12-.16-.151-.319l-1.238-5.14-1.23 5.132c-.04.16-.088.264-.152.32-.064.055-.176.079-.32.079h-.687Zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.56.56 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.414l-1.158-.36c-.583-.183-1.013-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .36.008.535.032.183.024.351.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.072-1.062.223-.248.152-.375.383-.375.694 0 .224.08.416.24.567.16.152.455.303.878.44l1.134.358c.574.184.99.44 1.237.767.248.327.375.702.375 1.118 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167Z" />
            </svg>
          )},
        ]
        const AppCard = ({ app }: { app: typeof apps[number] }) => (
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-200 cursor-pointer group/app hover:scale-[1.04]">
            <div className={cn('p-2.5 rounded-xl shadow-md', app.color, app.shadow)}>
              {app.svg}
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover/app:text-slate-900 dark:group-hover/app:text-white transition-colors">{app.name}</span>
          </div>
        )
        return (
          <>
            {/* Mobile: 2-row infinite marquee */}
            <div className="sm:hidden space-y-2 overflow-hidden">
              <div className="flex animate-[marquee-apps_16s_linear_infinite] gap-2.5 w-max">
                {[...apps, ...apps].map((app, i) => (
                  <div key={i} className="w-[64px] shrink-0">
                    <AppCard app={app} />
                  </div>
                ))}
              </div>
              <div className="flex animate-[marquee-apps-reverse_18s_linear_infinite] gap-2.5 w-max">
                {[...apps.slice(6), ...apps.slice(0, 6), ...apps.slice(6), ...apps.slice(0, 6)].map((app, i) => (
                  <div key={i} className="w-[64px] shrink-0">
                    <AppCard app={app} />
                  </div>
                ))}
              </div>
              <style>{`
                @keyframes marquee-apps {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes marquee-apps-reverse {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
              `}</style>
            </div>
            {/* Desktop: grid */}
            <div className="hidden sm:grid grid-cols-4 gap-3">
              {apps.map((app, i) => (
                <AppCard key={i} app={app} />
              ))}
            </div>
          </>
        )
      })()}
      <div className="hidden sm:flex mt-4 items-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 justify-center cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all duration-200 group/browse">
        <MousePointerClick className="h-4 w-4 text-slate-400 group-hover/browse:text-primary-500 transition-colors" />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover/browse:text-primary-600 dark:group-hover/browse:text-primary-400 transition-colors">Browse all integrations</span>
      </div>
    </div>
  )
}

const FeaturesSection = () => {
  const t = useTranslations('landing')
  const tc = useTranslations('common')

  const featureBullets = {
    analytics: [
      t('features.analytics.point1'),
      t('features.analytics.point2'),
      t('features.analytics.point3'),
    ],
    collaboration: [
      t('features.collaboration.point1'),
      t('features.collaboration.point2'),
      t('features.collaboration.point3'),
    ],
    integrations: [
      t('features.integrations.point1'),
      t('features.integrations.point2'),
      t('features.integrations.point3'),
    ],
  }

  const mainFeatures = [
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      bullets: featureBullets.analytics,
      iconColor: 'primary' as const,
      visual: 'analytics',
    },
    {
      icon: Users,
      title: t('features.collaboration.title'),
      description: t('features.collaboration.description'),
      bullets: featureBullets.collaboration,
      iconColor: 'accent' as const,
      visual: 'collaboration',
    },
    {
      icon: Layers,
      title: t('features.integrations.title'),
      description: t('features.integrations.description'),
      bullets: featureBullets.integrations,
      iconColor: 'success' as const,
      visual: 'integrations',
    },
  ]

  const miniFeatures = [
    { icon: Shield, title: t('features.miniFeatures.security.title'), description: t('features.miniFeatures.security.description'), iconColor: 'primary' as const },
    { icon: Code2, title: t('features.miniFeatures.api.title'), description: t('features.miniFeatures.api.description'), iconColor: 'accent' as const },
    { icon: Headphones, title: t('features.miniFeatures.support.title'), description: t('features.miniFeatures.support.description'), iconColor: 'success' as const },
    { icon: Smartphone, title: t('features.miniFeatures.mobile.title'), description: t('features.miniFeatures.mobile.description'), iconColor: 'warning' as const },
    { icon: FileDown, title: t('features.miniFeatures.export.title'), description: t('features.miniFeatures.export.description'), iconColor: 'info' as const },
    { icon: Lock, title: t('features.miniFeatures.sso.title'), description: t('features.miniFeatures.sso.description'), iconColor: 'error' as const },
  ]

  return (
  <RevealSection>
    <section id="features" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent-400/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="primary" className="mb-4 px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1.5" />
            {t('features.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('features.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Main Features - Alternating Layout */}
        <div className="space-y-16 sm:space-y-20 md:space-y-28">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isReversed = index % 2 === 1
            const revealClass = isReversed ? 'scroll-reveal-right' : 'scroll-reveal-left'

            return (
              <div
                key={feature.title}
                className={cn(
                  revealClass,
                  'grid gap-8 md:gap-12 lg:gap-16 items-center',
                  'md:grid-cols-2'
                )}
              >
                {/* Content */}
                <div className={cn(isReversed && 'md:order-2')}>
                  <div className={cn(
                    'inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6',
                    'bg-gradient-to-br shadow-lg',
                    feature.iconColor === 'primary' && 'from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-800/30 shadow-primary-500/20',
                    feature.iconColor === 'accent' && 'from-accent-100 to-accent-50 dark:from-accent-900/50 dark:to-accent-800/30 shadow-accent-500/20',
                    feature.iconColor === 'success' && 'from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30 shadow-emerald-500/20',
                  )}>
                    <Icon className={cn(
                      'h-7 w-7',
                      feature.iconColor === 'primary' && 'text-primary-600 dark:text-primary-400',
                      feature.iconColor === 'accent' && 'text-accent-600 dark:text-accent-400',
                      feature.iconColor === 'success' && 'text-emerald-600 dark:text-emerald-400',
                    )} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.bullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <button className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      {tc('learnMore')}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className={cn(isReversed && 'md:order-1')}>
                  <div className="relative group/visual">
                    <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 rounded-2xl blur-xl opacity-0 group-hover/visual:opacity-100 transition-opacity duration-500" />
                    <div className="relative sm:aspect-[4/3] rounded-2xl border border-slate-200/60 dark:border-slate-700/40 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900 shadow-xl overflow-hidden transition-all duration-500 group-hover/visual:shadow-2xl group-hover/visual:-translate-y-1">
                      {/* Top accent bar */}
                      <div className={cn(
                        'absolute inset-x-0 top-0 h-1 z-10 bg-gradient-to-r',
                        feature.iconColor === 'primary' && 'from-primary-400 via-primary-500 to-primary-400 dark:from-primary-500 dark:via-primary-400 dark:to-primary-500',
                        feature.iconColor === 'accent' && 'from-accent-400 via-accent-500 to-accent-400 dark:from-accent-500 dark:via-accent-400 dark:to-accent-500',
                        feature.iconColor === 'success' && 'from-emerald-400 via-emerald-500 to-emerald-400 dark:from-emerald-500 dark:via-emerald-400 dark:to-emerald-500',
                      )} />
                      <FeatureVisual type={feature.visual} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mini Features Grid */}
        <div className="scroll-reveal mt-20 sm:mt-24 md:mt-32">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t('features.andMore')}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t('features.andMoreSubtitle')}</p>
          </div>
          <FeatureGrid
            features={miniFeatures}
            columns="3col"
            cardVariant="default"
            iconStyle="circle"
            className="!py-0"
          />
        </div>
      </div>
    </section>
  </RevealSection>
  )
}

// ============================================================================
// SECTION 4 - STATS (Count-Up Animation)
// ============================================================================

// Stats data is now defined inside StatsSection for i18n access

const AnimatedCounter = ({ value, suffix, label, icon: Icon }: { value: number; suffix: string; label: string; icon: React.ElementType }) => {
  const [count, setCount] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isVisible])

  React.useEffect(() => {
    if (!isVisible) return
    const duration = 2200
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Number(current.toFixed(1)))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [value, isVisible])

  const displayValue = value >= 10 ? Math.round(count).toLocaleString() : count.toFixed(1)

  return (
    <div ref={ref} className="text-center group">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 group-hover:bg-white/15 transition-colors">
        <Icon className="h-5 w-5 text-primary-300" />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tabular-nums tracking-tight">
        {displayValue}{suffix}
      </div>
      <p className="mt-2 text-sm sm:text-base font-medium text-primary-200/80">{label}</p>
    </div>
  )
}

const StatsSection = () => {
  const t = useTranslations('landing')

  const stats = [
    { value: 25, suffix: '+', label: t('stats.pages'), icon: Layers },
    { value: 100, suffix: '+', label: t('stats.components'), icon: Code2 },
    { value: 99, suffix: '', label: t('stats.lighthouse'), icon: Zap },
    { value: 100, suffix: '%', label: t('stats.typescript'), icon: Shield },
  ]

  return (
  <RevealSection>
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`stagger-${i + 1}`}>
              <AnimatedCounter {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </RevealSection>
  )
}

// ============================================================================
// SECTION 5 - TESTIMONIALS
// ============================================================================

const featuredTestimonial = {
  quote: 'Pulse has become the backbone of our data strategy. The insights we gain have directly contributed to a 3x increase in revenue. It\'s not just a tool—it\'s a competitive advantage that every team needs.',
  author: { name: 'Alex Johnson', role: 'CEO', company: 'ScaleUp Inc' },
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Pulse has completely transformed how we track our metrics. The real-time dashboards are incredible, and the team collaboration features have made our workflow so much smoother.',
    author: { name: 'Sarah Chen', role: 'VP of Product', company: 'TechCorp', avatar: '' },
    rating: 5,
  },
  {
    id: '2',
    quote: 'We switched from a competitor and never looked back. The UI is beautiful, the performance is lightning fast, and the support team is always there when we need them.',
    author: { name: 'Michael Rodriguez', role: 'CTO', company: 'StartupXYZ', avatar: '' },
    rating: 5,
  },
  {
    id: '3',
    quote: 'The best investment we\'ve made for our analytics stack. Pulse gives us insights we never knew we needed, and the integrations work flawlessly.',
    author: { name: 'Emily Watson', role: 'Data Lead', company: 'DataDriven Inc', avatar: '' },
    rating: 5,
  },
  {
    id: '4',
    quote: 'Our team productivity increased by 40% after implementing Pulse. The interface is intuitive and the analytics are spot-on.',
    author: { name: 'James Park', role: 'Engineering Manager', company: 'CloudScale', avatar: '' },
    rating: 5,
  },
  {
    id: '5',
    quote: 'Finally, a dashboard that our entire team actually wants to use. The mobile app is fantastic for checking metrics on the go.',
    author: { name: 'Lisa Thompson', role: 'CEO', company: 'GrowthLabs', avatar: '' },
    rating: 5,
  },
  {
    id: '6',
    quote: 'Pulse\'s API is a dream to work with. We\'ve built custom integrations in hours that would have taken weeks with other tools.',
    author: { name: 'David Kim', role: 'Lead Developer', company: 'DevFirst', avatar: '' },
    rating: 5,
  },
]

const TestimonialsSection = () => {
  const t = useTranslations('landing')

  return (
  <RevealSection>
    <section id="testimonials" className="relative py-20 sm:py-24 md:py-32 bg-slate-50/80 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="primary" className="mb-4 px-3 py-1">
            <Star className="h-3 w-3 mr-1.5" />
            {t('testimonials.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="scroll-reveal-scale mb-10 sm:mb-12">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-primary-500/15 to-accent-500/15 rounded-3xl blur-xl" />
            <div className="relative p-6 sm:p-8 md:p-12 rounded-2xl bg-white dark:bg-slate-800/80 border border-primary-200/50 dark:border-primary-800/30 shadow-xl glass">
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 sm:h-6 w-5 sm:w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 dark:text-white mb-8 leading-relaxed">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar
                  fallback="AJ"
                  size="lg"
                  className="ring-4 ring-primary-100 dark:ring-primary-900/50"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{featuredTestimonial.author.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {featuredTestimonial.author.role} at{' '}
                    <span className="font-medium text-slate-600 dark:text-slate-300">{featuredTestimonial.author.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials — Mobile: 2-col carousel | Desktop: 3-col grid */}
        <div className="scroll-reveal">
          {/* Mobile carousel */}
          <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-4 px-4 pb-4 scrollbar-hide">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, pairIdx) => (
              <div key={pairIdx} className="w-[85vw] shrink-0 snap-start grid grid-cols-2 gap-3">
                {testimonials.slice(pairIdx * 2, pairIdx * 2 + 2).map((t) => (
                  <div
                    key={t.id}
                    className="relative p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/40 shadow-sm flex flex-col"
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-5">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {t.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{t.author.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{t.author.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:block">
            <TestimonialGrid
              testimonials={testimonials}
              columns={3}
              cardVariant="default"
            />
          </div>
        </div>
      </div>
    </section>
  </RevealSection>
  )
}

// ============================================================================
// SECTION 6 - PRICING
// ============================================================================

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: { monthly: 19, yearly: 15 },
    features: [
      { text: '5 team members', included: true },
      { text: '10 dashboards', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'API access', included: false },
      { text: 'Custom integrations', included: false },
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for growing teams who need more',
    price: { monthly: 49, yearly: 39 },
    features: [
      { text: '25 team members', included: true },
      { text: 'Unlimited dashboards', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations at scale',
    price: { monthly: 99, yearly: 79 },
    features: [
      { text: 'Unlimited members', included: true },
      { text: 'Custom dashboards', included: true },
      { text: 'AI-powered insights', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline',
  },
]

const PricingSection = () => {
  const t = useTranslations('landing')
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>('monthly')

  return (
    <RevealSection>
      <section id="pricing" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="scroll-reveal text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="primary" className="mb-4 px-3 py-1">
              <Zap className="h-3 w-3 mr-1.5" />
              {t('pricing.badge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('pricing.title')}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Pricing Table */}
          <div className="scroll-reveal-scale">
            <PricingTable
              plans={pricingPlans}
              billingPeriod={billingPeriod}
              onBillingPeriodChange={setBillingPeriod}
              showToggle
              yearlyDiscount={20}
            />
          </div>

          {/* Additional info — premium */}
          <div className="scroll-reveal mt-10 sm:mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>{t('pricing.trial')} · {t('pricing.noCard')}</span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
              {[
                {
                  name: 'Visa',
                  color: 'group-hover:border-blue-300 dark:group-hover:border-blue-700',
                  icon: (
                    <svg viewBox="0 0 50 18" fill="none" className="h-5 w-auto">
                      <path d="M19.5 2l-5.3 13h-3.5L7.8 4.8c-.2-.7-.3-.9-.9-1.2C5.9 3.1 4.5 2.6 3 2.3l.1-.3h5.6c.7 0 1.4.5 1.5 1.3l1.4 7.4L15.2 2h4.3Zm17 8.8c0-3.4-4.7-3.6-4.7-5.1 0-.5.5-1 1.4-1.1.5-.1 1.8-.1 3.3.6l.6-2.8A9 9 0 0 0 34 1.8c-4 0-6.8 2.1-6.8 5.2 0 2.3 2 3.5 3.6 4.3 1.6.8 2.1 1.3 2.1 2-.02 1-1.3 1.5-2.4 1.5-2.1 0-3.3-.6-4.2-1l-.7 3.4c1 .4 2.7.8 4.5.8 4.2 0 7-2.1 7-5.3h-.1ZM45.8 15h3.7L46.2 2h-2.8c-.6 0-1.2.4-1.4 1l-5 12h3.5l.7-1.9h4.2l.4 1.9Zm-3.7-4.6l1.8-4.8.9 4.8h-2.7ZM25.7 2l-2.7 13h-3.3l2.7-13h3.3Z" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  name: 'Mastercard',
                  color: 'group-hover:border-orange-300 dark:group-hover:border-orange-700',
                  icon: (
                    <svg viewBox="0 0 32 20" fill="none" className="h-4 w-auto">
                      <circle cx="12" cy="10" r="8" fill="#EB001B" opacity="0.8" />
                      <circle cx="20" cy="10" r="8" fill="#F79E1B" opacity="0.8" />
                      <path d="M16 3.8a8 8 0 0 1 0 12.4 8 8 0 0 1 0-12.4Z" fill="#FF5F00" opacity="0.9" />
                    </svg>
                  ),
                },
                {
                  name: 'Amex',
                  color: 'group-hover:border-sky-300 dark:group-hover:border-sky-700',
                  icon: (
                    <svg viewBox="0 0 40 14" fill="none" className="h-4 w-auto">
                      <path d="M4.8 0L0 14h5.6l.72-1.76h1.64L8.68 14h6.16v-1.34L15.5 14h3.56l.66-1.38V14H30.6l1.58-1.68L33.72 14h5.92l-4.32-7L39.56 0h-5.82l-1.52 1.64L30.78 0H19.5l-1.44 3.16L16.58 0h-5.6v1.3L10.34 0H4.8Zm1.62 1.88h2.74l3.12 7.12V1.88h3l2.42 5.1 2.22-5.1h2.98v10.24h-1.82l-.02-8.02-2.66 8.02h-1.62l-2.68-8.02v8.02H11.4l-.74-1.78H7.02l-.72 1.78H4.28l3.14-7.56v-2.68Zm18.5 0h7.46l2.28 2.52 2.36-2.52h2.28l-3.52 3.68 3.52 3.68-.02.02.02-.02h-2.34l-2.3-2.56-2.34 2.56h-7.4V1.88Zm-16.28 1.5l-1.3 3.14h2.6l-1.3-3.14Zm18.1.36v1.84h4.06v1.84h-4.06v2.08h4.56l2.12-2.32-2.04-2.3-.02-.02.02.02-1.02-1.14h-3.62Z" fill="#2E77BC" />
                    </svg>
                  ),
                },
                {
                  name: 'PayPal',
                  color: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-700',
                  icon: (
                    <>
                      <span className="text-sm font-bold tracking-wide" style={{ color: '#253B80' }}>Pay</span>
                      <span className="text-sm font-bold tracking-wide" style={{ color: '#179BD7' }}>Pal</span>
                    </>
                  ),
                },
              ].map((method) => (
                <div
                  key={method.name}
                  className={cn(
                    'group relative h-11 min-w-[72px] px-5 rounded-xl flex items-center justify-center',
                    'bg-white dark:bg-slate-900/80',
                    'border border-slate-200/80 dark:border-slate-800',
                    'transition-all duration-300',
                    'hover:shadow-md hover:-translate-y-0.5',
                    'text-slate-400 dark:text-slate-500',
                    'hover:text-slate-600 dark:hover:text-slate-300',
                    method.color,
                  )}
                  title={method.name}
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// SECTION 7 - FAQ
// ============================================================================

const faqItems: FAQItem[] = [
  { question: 'What is Pulse?', answer: 'Pulse is a modern analytics dashboard platform designed for growing teams. It provides real-time insights, beautiful visualizations, and powerful collaboration features to help you make data-driven decisions.' },
  { question: 'How does the free trial work?', answer: 'Start your 14-day free trial with full access to all Pro features. No credit card required. At the end of your trial, you can choose to upgrade to a paid plan or continue with our free tier.' },
  { question: 'Can I cancel anytime?', answer: 'Yes! You can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your billing period.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for enterprise customers. All payments are processed securely through Stripe.' },
  { question: 'Is my data secure?', answer: 'Absolutely. We take security seriously. Pulse is SOC 2 Type II certified, uses end-to-end encryption, and undergoes regular security audits. Your data is stored in secure, redundant data centers.' },
  { question: 'Do you offer refunds?', answer: "Yes, we offer a 30-day money-back guarantee for annual subscriptions. If you're not satisfied with Pulse, contact our support team within 30 days for a full refund." },
  { question: 'How do I upgrade my plan?', answer: 'You can upgrade your plan anytime from your account settings. The new pricing will be prorated for the remainder of your billing cycle. Downgrades take effect at the next billing period.' },
  { question: 'What integrations are available?', answer: 'Pulse integrates with 150+ popular tools including Slack, Zapier, Google Analytics, Salesforce, HubSpot, Jira, and many more. We also offer a REST API and webhooks for custom integrations.' },
  { question: 'Do you have a mobile app?', answer: 'Yes! We have native mobile apps for both iOS and Android. You can view your dashboards, receive notifications, and collaborate with your team on the go.' },
  { question: 'How do I contact support?', answer: 'You can reach our support team via email at support@pulse.io, through our in-app chat, or by scheduling a call. Pro and Enterprise customers receive priority support with faster response times.' },
]

const FAQSection = () => {
  const t = useTranslations('landing')

  return (
  <RevealSection>
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-slate-50/80 dark:bg-slate-900/30">
      <div className="scroll-reveal">
        <FAQAccordion
          items={faqItems}
          columns={2}
          variant="separated"
          iconStyle="plus-minus"
          title={t('faq.title')}
          subtitle={t('faq.badge')}
          description={t('faq.subtitle')}
          searchable
        />
      </div>
    </section>
  </RevealSection>
  )
}

// ============================================================================
// SECTION 8 - FINAL CTA
// ============================================================================

const FinalCTASection = () => {
  const t = useTranslations('landing')

  return (
  <RevealSection>
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)',
        backgroundSize: '28px 28px',
      }} />

      {/* Animated orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-orb" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-orb-slow" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </div>

        {/* Email capture */}
        <div className="scroll-reveal stagger-2 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={t('cta.placeholder')}
            className={cn(
              'flex-1 px-5 py-4 rounded-xl',
              'bg-white/15 backdrop-blur-sm',
              'border border-white/25',
              'text-white placeholder:text-white/50',
              'focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20',
              'transition-all duration-300 text-sm sm:text-base'
            )}
          />
          <Button
            size="lg"
            className={cn(
              'px-8 h-[52px] bg-white text-primary-600 font-bold rounded-xl',
              'hover:bg-white/90',
              'shadow-xl shadow-black/15',
              'hover:shadow-2xl',
              'whitespace-nowrap',
              'hover:scale-[1.02] active:scale-[0.98]',
              'transition-all duration-300'
            )}
          >
            {t('cta.button')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Trust badges */}
        <div className="scroll-reveal stagger-4 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-sm text-white/70">
          {[t('cta.trial'), t('cta.noCard'), t('cta.cancel')].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <Check className="h-4 w-4" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  </RevealSection>
  )
}

// ============================================================================
// MAIN PAGE - Assemble all sections
// ============================================================================

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoCloudSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
