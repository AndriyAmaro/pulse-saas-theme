'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  Wrench,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
  Twitter,
  FileText,
  BookOpen,
  Mail,
} from 'lucide-react'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { EmailCapture } from '@core/patterns/EmailCapture'
import { IllustrationMaintenance } from '@core/patterns/Illustrations'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MAINTENANCE PAGE - Premium utility page
// ============================================================================

interface MaintenanceUpdate {
  time: string
  message: string
  status: 'completed' | 'in-progress' | 'pending'
}

export default function MaintenancePage() {
  const t = useTranslations('utility')
  const [notifySubmitted, setNotifySubmitted] = React.useState(false)
  const [progress, setProgress] = React.useState(65)

  // Simulate progress updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 2
        return next > 95 ? 65 : next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const maintenanceInfo = {
    started: '2:00 AM UTC',
    expectedCompletion: '6:00 AM UTC',
    duration: '~4 hours',
    status: t('maintenance.details.status'),
  }

  const updates: MaintenanceUpdate[] = [
    { time: '2:00 AM', message: t('maintenance.timeline.t1'), status: 'completed' },
    { time: '2:30 AM', message: t('maintenance.timeline.t2'), status: 'completed' },
    { time: '3:15 AM', message: t('maintenance.timeline.t3'), status: 'in-progress' },
    { time: '~5:00 AM', message: t('maintenance.timeline.t4'), status: 'pending' },
    { time: '~6:00 AM', message: t('maintenance.timeline.t5'), status: 'pending' },
  ]

  const resources = [
    { icon: BookOpen, name: t('maintenance.resources.documentation'), href: '#' },
    { icon: FileText, name: t('maintenance.resources.blog'), href: '#' },
    { icon: Twitter, name: t('maintenance.resources.twitter'), href: '#' },
  ]

  const handleNotifySubmit = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    // Handle notification signup
    setNotifySubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] dark:bg-[var(--bg-base)] flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-500/3 dark:from-primary-500/5 to-transparent" />
        {/* Animated gears pattern - very subtle */}
        <div className="absolute top-20 right-20 w-40 h-40 opacity-5 dark:opacity-10">
          <div className="w-full h-full rounded-full border-8 border-primary-500 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 opacity-5 dark:opacity-10">
          <div className="w-full h-full rounded-full border-6 border-secondary-500 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-lg text-[var(--text-primary)]">Pulse</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
              <Wrench className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {t('maintenance.badge')}
              </span>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <IllustrationMaintenance className="max-w-xs sm:max-w-sm" animated />
          </div>

          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              {t('maintenance.title')}
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
              {t('maintenance.subtitle')}
            </p>
          </div>

          {/* Maintenance Details Card */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl border border-[var(--border-default)] shadow-lg mb-8 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[var(--border-default)] bg-secondary-50 dark:bg-secondary-800/50">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" />
                <h2 className="font-semibold text-[var(--text-primary)]">{t('maintenance.details.title')}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{t('maintenance.details.started')}</p>
                  <p className="font-medium text-[var(--text-primary)]">{maintenanceInfo.started}</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{t('maintenance.details.expected')}</p>
                  <p className="font-medium text-[var(--text-primary)]">{maintenanceInfo.expectedCompletion}</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{t('maintenance.details.duration')}</p>
                  <p className="font-medium text-[var(--text-primary)]">{maintenanceInfo.duration}</p>
                </div>
                <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg border border-primary-200 dark:border-primary-800">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{t('maintenance.details.progress')}</p>
                  <p className="font-medium text-primary-600 dark:text-primary-400">{Math.round(progress)}%</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <ProgressBar
                  value={progress}
                  max={100}
                  variant="gradient"
                  size="md"
                  showValue={false}
                  animated
                />
                <p className="text-sm text-[var(--text-muted)] mt-2 text-center">
                  {maintenanceInfo.status}
                </p>
              </div>

              {/* Timeline */}
              <div className="border-t border-[var(--border-default)] pt-6">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">{t('maintenance.statusUpdates')}</h3>
                <div className="space-y-3">
                  {updates.map((update, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {update.status === 'completed' && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {update.status === 'in-progress' && (
                          <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                        )}
                        {update.status === 'pending' && (
                          <Circle className="w-5 h-5 text-secondary-300 dark:text-secondary-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm ${
                            update.status === 'in-progress'
                              ? 'font-medium text-[var(--text-primary)]'
                              : update.status === 'completed'
                                ? 'text-[var(--text-muted)]'
                                : 'text-[var(--text-muted)] opacity-60'
                          }`}>
                            {update.message}
                          </p>
                          <span className={`text-xs flex-shrink-0 ${
                            update.status === 'in-progress'
                              ? 'text-primary-500 font-medium'
                              : 'text-[var(--text-muted)]'
                          }`}>
                            {update.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* While You Wait */}
          <div className="mb-8">
            <p className="text-center text-sm text-[var(--text-muted)] mb-4">{t('maintenance.whileWait')}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {resources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-[var(--border-default)] text-sm font-medium text-[var(--text-secondary)] hover:text-primary-500 hover:border-primary-500 transition-all"
                >
                  <resource.icon className="w-4 h-4" />
                  {resource.name}
                </a>
              ))}
            </div>
          </div>

          {/* Notification Signup */}
          <div className="max-w-md mx-auto">
            {notifySubmitted ? (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-700 dark:text-green-300">
                  {t('maintenance.notifySuccess')}
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-secondary-800 rounded-xl border border-[var(--border-default)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-primary-500" />
                  <h3 className="font-medium text-[var(--text-primary)]">{t('maintenance.notify')}</h3>
                </div>
                <EmailCapture
                  variant="inline"
                  size="sm"
                  placeholder="your@email.com"
                  buttonText="Notify Me"
                  onSubmit={handleNotifySubmit}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center border-t border-[var(--border-default)]">
        <p className="text-sm text-[var(--text-muted)] mb-2">
          {t('maintenance.questions')}{' '}
          <a href="mailto:support@pulse.com" className="text-primary-500 hover:text-primary-600 transition-colors">
            support@pulse.com
          </a>
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Pulse. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
