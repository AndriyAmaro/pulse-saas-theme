'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Home, ArrowLeft, Search, MessageCircle, Compass } from 'lucide-react'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { Button } from '@core/primitives/Button'
import { Illustration404 } from '@core/patterns/Illustrations'

// ============================================================================
// 404 NOT FOUND PAGE - Premium utility page
// ============================================================================

export default function NotFoundPage() {
  const router = useRouter()
  const t = useTranslations('utility')
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search or dashboard with query
      router.push(`/overview?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const quickLinks = [
    { name: 'Dashboard', href: '/overview' },
    { name: 'Settings', href: '/settings' },
    { name: 'Analytics', href: '/analytics' },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] dark:bg-[var(--bg-base)] flex flex-col">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--secondary-500) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
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
            <Illustration404 className="mx-auto" animated />
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              {t('notFound.title')}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-md mx-auto">
              {t('notFound.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('notFound.search')}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--border-default)] bg-white dark:bg-secondary-800 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
              onClick={() => router.push('/')}
              className="w-full sm:w-auto"
            >
              {t('notFound.goHome')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              {t('notFound.goBack')}
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-sm text-[var(--text-muted)] flex items-center justify-center gap-2">
              <Compass className="w-4 h-4" />
              {t('notFound.popularPages')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-[var(--border-default)] text-sm font-medium text-[var(--text-secondary)] hover:text-primary-500 hover:border-primary-500 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-10 pt-6 border-t border-[var(--border-default)]">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t('notFound.contactSupport')}
            </Link>
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
