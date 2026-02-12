'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Input } from '@core/primitives/Input'
import { Textarea } from '@core/primitives/Textarea'
import {
  Briefcase,
  Headphones,
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
  Sparkles,
  Zap,
  MessageCircle,
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
    <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 animate-float-delayed" style={{ left: '85%', top: '35%', opacity: 0.3, boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)' }} />
  </div>
)

// ============================================================================
// SECTION 1 - PREMIUM HERO
// ============================================================================

const HeroSection = () => {
  const t = useTranslations('contact')

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
        {/* Animated orbs */}
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-orb-slow" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/5 rounded-full blur-3xl animate-orb" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />
      </div>

      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Mail className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">{t('hero.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {t('hero.title')}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Floating status badges */}
        <div className="relative mt-12 flex items-center justify-center gap-4 md:gap-6">
          {[
            { icon: Zap, label: '< 48h', sublabel: 'Response', color: 'text-amber-500', delay: '0s' },
            { icon: MessageCircle, label: '100%', sublabel: 'Reply Rate', color: 'text-emerald-500', delay: '0.5s' },
            { icon: Sparkles, label: 'Open', sublabel: 'Freelance', color: 'text-blue-500', delay: '1s' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="animate-float px-4 py-3 rounded-xl glass shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30"
              style={{ animationDelay: badge.delay, animationDuration: '5s' }}
            >
              <div className="flex items-center gap-2.5">
                <div className={cn('flex items-center justify-center h-8 w-8 rounded-lg bg-current/10', badge.color)}>
                  <badge.icon className={cn('h-4 w-4', badge.color)} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-none">{badge.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{badge.sublabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECTION 2 - PREMIUM CONTACT OPTIONS (Gradient Border Cards)
// ============================================================================

const ContactOptionsSection = () => {
  const t = useTranslations('contact')

  const contactOptions = [
    {
      icon: Briefcase,
      key: 'sales' as const,
      email: 'andrifullstackdev@gmail.com',
      accentColor: '#10B981',
      gradientBorder: 'from-emerald-400/60 via-emerald-500/20 to-emerald-400/60',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-500',
      glowColor: 'group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/15',
      sparkline: 'M0,20 L8,16 L16,18 L24,12 L32,14 L40,8 L48,10 L56,6 L60,4',
    },
    {
      icon: Headphones,
      key: 'support' as const,
      email: 'andrifullstackdev@gmail.com',
      accentColor: '#3B82F6',
      gradientBorder: 'from-blue-400/60 via-blue-500/20 to-blue-400/60',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
      iconColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/15',
      sparkline: 'M0,18 L8,14 L16,16 L24,10 L32,12 L40,6 L48,8 L56,4 L60,5',
    },
  ]

  return (
    <RevealSection>
      <section className="pb-16 md:pb-20 relative overflow-hidden">
        <FloatingParticles className="opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {contactOptions.map((option, i) => (
              <div
                key={option.key}
                className="scroll-reveal-scale"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient border wrapper */}
                <div className={cn(
                  'group relative rounded-2xl p-px overflow-hidden',
                  'bg-gradient-to-b', option.gradientBorder,
                  'hover:shadow-2xl transition-all duration-500',
                  option.glowColor,
                )}>
                  {/* Inner card */}
                  <div className="relative rounded-[15px] bg-white dark:bg-slate-900 p-6 h-full overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Corner glow */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${option.accentColor}15 0%, transparent 70%)` }}
                    />

                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className={cn(
                        'inline-flex items-center justify-center h-12 w-12 rounded-xl',
                        'ring-1 ring-inset ring-black/5 dark:ring-white/5',
                        option.iconBg,
                      )}>
                        <option.icon className={cn('h-6 w-6', option.iconColor)} />
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: option.accentColor }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: option.accentColor }} />
                        Active
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 relative z-10">
                      {t(`options.${option.key}.title`)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed relative z-10">
                      {t(`options.${option.key}.description`)}
                    </p>
                    <a href={`mailto:${option.email}`} className="text-sm font-medium hover:underline mb-5 block relative z-10" style={{ color: option.accentColor }}>
                      {option.email}
                    </a>

                    {/* Mini sparkline */}
                    <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/60 mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Response Rate</span>
                        <span className="text-[10px] font-bold" style={{ color: option.accentColor }}>98%</span>
                      </div>
                      <svg viewBox="0 0 60 24" className="w-full h-6" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`contact-spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={option.accentColor} stopOpacity="0.15" />
                            <stop offset="100%" stopColor={option.accentColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={`${option.sparkline} L60,24 L0,24 Z`} fill={`url(#contact-spark-${i})`} />
                        <path d={option.sparkline} fill="none" stroke={option.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="60" cy={option.sparkline.split(' ').pop()?.split(',')[1]} r="2" fill={option.accentColor} />
                      </svg>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 group/btn relative z-10">
                      {t(`options.${option.key}.cta`)}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
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
// SECTION 3 - PREMIUM CONTACT FORM + INFO
// ============================================================================

const ContactFormSection = () => {
  const t = useTranslations('contact')

  const subjectOptionKeys = ['general', 'sales', 'support', 'partnership', 'other'] as const

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    privacy: false,
  })
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = t('form.nameRequired')
    if (!formData.email.trim()) newErrors.email = t('form.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('form.emailInvalid')
    if (!formData.message.trim()) newErrors.message = t('form.messageRequired')
    if (!formData.privacy) newErrors.privacy = t('form.privacyRequired')
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true)
    }
  }

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles className="opacity-20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left - Form (Premium card) */}
            <div className="lg:col-span-3 scroll-reveal-left">
              <div className="relative rounded-2xl p-px bg-gradient-to-b from-slate-200/80 via-slate-200/30 to-slate-200/80 dark:from-slate-700/60 dark:via-slate-800/20 dark:to-slate-700/60">
                <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 md:p-8 overflow-hidden relative">
                  {/* Corner glow */}
                  <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary-500/5 dark:bg-primary-500/[0.03] rounded-full blur-3xl" />

                  {isSubmitted ? (
                    <div className="text-center py-12 relative z-10">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 mb-4 ring-4 ring-emerald-100 dark:ring-emerald-500/5">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {t('form.success')}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {t('form.successSubtitle')}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormData({ name: '', email: '', company: '', subject: '', message: '', privacy: false })
                        }}
                      >
                        {t('form.sendAnother')}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10">
                          <Send className="h-5 w-5 text-primary-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {t('form.title')}
                        </h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t('form.name')} <span className="text-rose-500">*</span>
                          </label>
                          <Input
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className={errors.name ? 'border-rose-500' : ''}
                          />
                          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t('form.email')} <span className="text-rose-500">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                            className={errors.email ? 'border-rose-500' : ''}
                          />
                          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Company */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t('form.company')}
                          </label>
                          <Input
                            placeholder="Acme Inc."
                            value={formData.company}
                            onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t('form.subject')}
                          </label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                              className={cn(
                                'flex h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700',
                                'bg-white dark:bg-slate-800 px-3 py-2 text-sm',
                                'text-slate-900 dark:text-white',
                                'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
                                'appearance-none cursor-pointer',
                              )}
                            >
                              <option value="">{t('form.selectSubject')}</option>
                              {subjectOptionKeys.map((key) => (
                                <option key={key} value={key}>{t(`form.subjectOptions.${key}`)}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          {t('form.message')} <span className="text-rose-500">*</span>
                        </label>
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                          className={errors.message ? 'border-rose-500' : ''}
                        />
                        {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                      </div>

                      {/* Privacy checkbox */}
                      <div>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.privacy}
                            onChange={(e) => setFormData(p => ({ ...p, privacy: e.target.checked }))}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {t('form.privacy')}{' '}
                            <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                              {t('form.privacyPolicyLink')}
                            </a>
                          </span>
                        </label>
                        {errors.privacy && <p className="text-xs text-rose-500 mt-1">{errors.privacy}</p>}
                      </div>

                      {/* Submit */}
                      <Button type="submit" size="lg" className="w-full sm:w-auto gap-2 px-8">
                        <Send className="h-4 w-4" />
                        {t('form.submit')}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Info (Premium cards) */}
            <div className="lg:col-span-2 scroll-reveal-right space-y-6">
              {/* Contact Info - Premium card */}
              <div className="relative rounded-2xl p-px bg-gradient-to-b from-primary-400/40 via-primary-500/10 to-primary-400/40">
                <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary-500/5 rounded-full blur-2xl" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2 relative z-10">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    {t('info.title')}
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {[
                      { icon: MapPin, label: t('info.location'), color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
                      { icon: Mail, label: 'andrifullstackdev@gmail.com', color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
                      { icon: Clock, label: t('info.schedule'), color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className={cn('flex items-center justify-center h-9 w-9 rounded-lg shrink-0', item.color)}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 pt-1.5">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability indicator */}
              <div className="relative rounded-2xl p-px bg-gradient-to-b from-emerald-400/40 via-emerald-500/10 to-emerald-400/40">
                <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 overflow-hidden relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Available for work</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('info.response')}
                  </p>
                  {/* Mini progress bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Capacity</span>
                      <span className="text-[10px] font-bold text-emerald-500">Open</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links - Premium card */}
              <div className="relative rounded-2xl p-px bg-gradient-to-b from-slate-300/50 via-slate-200/20 to-slate-300/50 dark:from-slate-600/40 dark:via-slate-700/10 dark:to-slate-600/40">
                <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {t('info.followUs')}
                  </h3>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10' },
                      { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10' },
                      { icon: Github, label: 'GitHub', href: 'https://github.com/AndriyAmaro', color: 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className={cn(
                          'inline-flex items-center justify-center h-11 w-11 rounded-xl text-slate-400 dark:text-slate-500 transition-all duration-200',
                          'border border-slate-100 dark:border-slate-800',
                          social.color,
                        )}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
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
// SECTION 4 - PREMIUM FAQ
// ============================================================================

const faqKeys = [1, 2, 3] as const

const FAQSection = () => {
  const t = useTranslations('contact')
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <RevealSection>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50/50 dark:bg-slate-900/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <FloatingParticles className="opacity-20" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-4">
              <MessageCircle className="h-3.5 w-3.5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">FAQ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {t('faq.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-3 scroll-reveal">
            {faqKeys.map((num, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={num}
                  className={cn(
                    'rounded-xl border overflow-hidden transition-all duration-300',
                    isOpen
                      ? 'border-primary-200 dark:border-primary-500/30 shadow-lg shadow-primary-500/5'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  )}
                >
                  <div className={cn(
                    'transition-colors duration-200',
                    isOpen ? 'bg-primary-50/50 dark:bg-primary-500/5' : 'bg-white dark:bg-slate-900'
                  )}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex items-center justify-between w-full px-5 py-4 text-left"
                    >
                      <span className={cn(
                        'text-sm font-medium pr-4 transition-colors',
                        isOpen ? 'text-primary-700 dark:text-primary-400' : 'text-slate-900 dark:text-white'
                      )}>
                        {t(`faq.items.q${num}`)}
                      </span>
                      <div className={cn(
                        'flex items-center justify-center h-6 w-6 rounded-full shrink-0 transition-all duration-200',
                        isOpen
                          ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rotate-180'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      )}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="px-5 pb-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {t(`faq.items.a${num}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// CONTACT PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactOptionsSection />
      <ContactFormSection />
      <FAQSection />
    </>
  )
}
