'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Home, RefreshCw, AlertTriangle, Copy, Check, ExternalLink } from 'lucide-react'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { Button } from '@core/primitives/Button'
import { Illustration500 } from '@core/patterns/Illustrations'

// ============================================================================
// ERROR PAGE (500) - Premium utility page
// ============================================================================

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter()
  const t = useTranslations('utility')
  const [copied, setCopied] = React.useState(false)
  const errorId = error.digest || `ERR-${Date.now().toString(36).toUpperCase()}`
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleCopyErrorId = async () => {
    try {
      await navigator.clipboard.writeText(errorId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      console.error('Failed to copy error ID')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] dark:bg-[var(--bg-base)] flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-gradient-to-b from-orange-500/5 dark:from-orange-500/10 to-transparent" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--secondary-300) 1px, transparent 1px), linear-gradient(90deg, var(--secondary-300) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-lg text-[var(--text-primary)]">Pulse</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-2xl w-full text-center">
          {/* Illustration */}
          <div className="mb-8">
            <Illustration500 className="mx-auto" animated />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              {t('serverError.status')}
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              {t('serverError.title')}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-md mx-auto">
              {t('serverError.subtitle')}
            </p>
          </div>

          {/* Error Details Card */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white dark:bg-secondary-800 rounded-xl border border-[var(--border-default)] p-4 text-left">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-[var(--text-primary)]">{t('serverError.errorDetails')}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{timestamp}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-[var(--border-default)]">
                  <span className="text-[var(--text-muted)]">{t('serverError.reference')}</span>
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-0.5 bg-secondary-100 dark:bg-secondary-700 rounded text-xs font-mono text-[var(--text-secondary)]">
                      {errorId}
                    </code>
                    <button
                      onClick={handleCopyErrorId}
                      className="p-1 rounded hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                      title="Copy error ID"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[var(--text-muted)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {t('serverError.dataSafe')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<RefreshCw className="w-5 h-5" />}
              onClick={reset}
              className="w-full sm:w-auto"
            >
              {t('serverError.tryAgain')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
              onClick={() => router.push('/')}
              className="w-full sm:w-auto"
            >
              {t('serverError.goHome')}
            </Button>
          </div>

          {/* Status Page Link */}
          <div className="space-y-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t('serverError.checkStatus')}
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} Pulse. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
