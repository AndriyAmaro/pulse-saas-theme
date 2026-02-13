'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Rocket, Twitter, Linkedin, Instagram, Sparkles, Zap, Users, BarChart3 } from 'lucide-react'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { CountdownTimer } from '@core/patterns/CountdownTimer'
import { EmailCapture } from '@core/patterns/EmailCapture'
import { IllustrationRocket } from '@core/patterns/Illustrations'

// ============================================================================
// COMING SOON PAGE - Premium landing page
// ============================================================================

export default function ComingSoonPage() {
  const t = useTranslations('utility')
  const [emailSubmitted, setEmailSubmitted] = React.useState(false)

  // Launch date - 30 days from now (for demo)
  const launchDate = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  }, [])

  const handleEmailSubmit = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
  }

  const features = [
    { icon: BarChart3, name: t('comingSoon.features.aiAnalytics'), description: t('comingSoon.features.aiAnalyticsDesc') },
    { icon: Users, name: t('comingSoon.features.teamCollaboration'), description: t('comingSoon.features.teamCollaborationDesc') },
    { icon: Zap, name: t('comingSoon.features.apiAccess'), description: t('comingSoon.features.apiAccessDesc') },
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500/5 via-[var(--bg-base)] to-accent-500/5 dark:from-primary-900/20 dark:via-[var(--bg-base)] dark:to-accent-900/20 flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 dark:bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/15 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl" />

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent-400 rounded-full animate-float-delayed opacity-50" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-accent-300 rounded-full animate-float-delayed opacity-50" />
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-xl text-[var(--text-primary)]">Pulse</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 border border-primary-200/50 dark:border-primary-700/50 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                {t('comingSoon.badge')}
              </span>
              <Sparkles className="w-4 h-4 text-accent-500" />
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              {t('comingSoon.title')}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              {t('comingSoon.subtitle')}
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center mb-10">
            <IllustrationRocket className="max-w-xs sm:max-w-sm" animated />
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border-default)]">
              <CountdownTimer
                targetDate={launchDate}
                variant="flip-cards"
                size="lg"
                showLabels
                labels={{
                  days: t('comingSoon.days'),
                  hours: t('comingSoon.hours'),
                  minutes: t('comingSoon.minutes'),
                  seconds: t('comingSoon.seconds'),
                }}
              />
            </div>
          </div>

          {/* Email Capture */}
          <div className="max-w-md mx-auto mb-10">
            {emailSubmitted ? (
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  {t('comingSoon.success')}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {t('comingSoon.successSubtitle')}
                </p>
              </div>
            ) : (
              <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[var(--border-default)]">
                <h3 className="text-center font-semibold text-[var(--text-primary)] mb-4">
                  {t('comingSoon.notify')}
                </h3>
                <EmailCapture
                  variant="inline"
                  size="md"
                  placeholder={t('comingSoon.placeholder')}
                  buttonText={t('comingSoon.notifyButton')}
                  buttonVariant="gradient"
                  onSubmit={handleEmailSubmit}
                  subscriberCount={2847}
                />
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="mb-12">
            <p className="text-center text-sm text-[var(--text-muted)] mb-6">
              {t('comingSoon.featuresTitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm border border-[var(--border-default)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="font-medium text-[var(--text-primary)] mb-1">{feature.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-10">
            <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mb-2">
              <span>{t('comingSoon.progress')}</span>
              <span className="font-medium text-primary-500">78%</span>
            </div>
            <div className="h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000"
                style={{ width: '78%' }}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-sm text-[var(--text-muted)] mb-4">{t('comingSoon.followUs')}</p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white dark:bg-secondary-800 border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-primary-500 hover:border-primary-500 transition-all"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold text-[var(--text-primary)]">Pulse</span>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Pulse. All rights reserved.
        </p>
        <Link
          href="/"
          className="inline-block mt-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
        >
          {t('comingSoon.backToSite')}
        </Link>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
