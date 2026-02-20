'use client'

import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { FooterMarketing } from '@core/patterns/FooterMarketing'
import { PulseLogo } from '@core/primitives/PulseLogo'
import { Menu, X, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'

// ============================================================================
// MARKETING LAYOUT - Premium Landing Page Layout
// ============================================================================

const socialLinks = [
  { platform: 'twitter' as const, href: '#', label: 'Twitter' },
  { platform: 'linkedin' as const, href: '#', label: 'LinkedIn' },
  { platform: 'github' as const, href: '#', label: 'GitHub' },
  { platform: 'youtube' as const, href: '#', label: 'YouTube' },
]

// ============================================================================
// Linked Logo (wraps PulseLogo primitive with navigation)
// ============================================================================

const LinkedPulseLogo = ({ className, textClassName }: { className?: string; textClassName?: string }) => (
  <Link href="/" className={cn('group', className)}>
    <PulseLogo variant="premium" size="lg" textClassName={textClassName} />
  </Link>
)

// ============================================================================
// Premium Navbar Component
// ============================================================================

const Navbar = () => {
  const t = useTranslations('navbar')
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('')
  const lastScrollY = React.useRef(0)

  const navLinks = [
    { label: t('dashboard'), href: '/overview' },
    { label: t('features'), href: '/#features' },
    { label: t('pricing'), href: '/#pricing' },
    { label: t('about'), href: '/about' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/contact' },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 20)

      // Smart hide: hide on scroll down, show on scroll up
      if (currentY > 100) {
        setIsHidden(currentY > lastScrollY.current && currentY > 100)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentY

      // Track active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i]
        if (!sectionId) continue
        const el = document.getElementById(sectionId)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sectionId)
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // Whether the navbar is on a solid (light) background
  const onSolidBg = isScrolled || isMobileMenuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-out',
          isMobileMenuOpen
            ? 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700'
            : isScrolled
              ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
              : 'bg-transparent',
          // Only apply translate when hiding — avoids creating a CSS containing block
          isHidden && !isMobileMenuOpen && '-translate-y-full'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-[72px] items-center justify-between">
            {/* Logo: white gradient on dark hero, theme-aware on solid bg */}
            <LinkedPulseLogo
              textClassName={!onSolidBg ? 'from-slate-800 to-slate-600 dark:from-white dark:to-slate-300' : undefined}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isHash = link.href.includes('#')
                const sectionId = isHash ? link.href.replace('/#', '') : ''
                const isActive = isHash && activeSection === sectionId
                const LinkComp = isHash ? 'a' : Link
                return (
                  <LinkComp
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg',
                      'transition-all duration-200',
                      'group',
                      isActive
                        ? isScrolled ? 'text-primary-600 dark:text-primary-400' : 'text-primary-600 dark:text-primary-300'
                        : isScrolled
                          ? 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          : 'text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute inset-x-2 -bottom-px h-0.5 rounded-full',
                        'bg-gradient-to-r from-primary-500 to-accent-500',
                        'transition-transform duration-300 origin-left',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </LinkComp>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle className={isScrolled ? '' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'} />
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    isScrolled
                      ? 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      : 'text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                  )}
                >
                  {t('signIn')}
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className={cn(
                    'group/btn gap-1.5 px-5',
                    'bg-gradient-to-r from-primary-500 to-primary-600',
                    'hover:from-primary-600 hover:to-primary-700',
                    'shadow-lg shadow-primary-500/25',
                    'hover:shadow-xl hover:shadow-primary-500/30',
                    'transition-all duration-300',
                    'hover:scale-[1.02]'
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('getStarted')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle className={onSolidBg ? '' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'relative p-2 rounded-xl',
                  'transition-all duration-200',
                  onSolidBg
                    ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/15'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative h-6 w-6">
                  <Menu className={cn(
                    'absolute inset-0 h-6 w-6 transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  )} />
                  <X className={cn(
                    'absolute inset-0 h-6 w-6 transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  )} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ====== Mobile Menu (OUTSIDE header to avoid CSS containing block) ====== */}

      {/* Backdrop overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-black/60',
          'transition-opacity duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          'md:hidden',
          'fixed inset-x-0 top-16 bottom-0 z-[45]',
          'bg-white dark:bg-slate-900',
          'transition-all duration-300 ease-out',
          'flex flex-col',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link, i) => {
            const isHash = link.href.includes('#')
            const LinkComp = isHash ? 'a' : Link
            return (
              <LinkComp
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between py-3.5 px-4 rounded-xl',
                  'text-base font-medium',
                  'text-slate-700 dark:text-slate-200',
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  'hover:text-slate-900 dark:hover:text-white',
                  'transition-all duration-200',
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </LinkComp>
            )
          })}
        </div>

        {/* CTAs pinned to bottom */}
        <div className="px-4 py-4 space-y-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-center rounded-xl h-12">
              {t('signIn')}
            </Button>
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              className={cn(
                'w-full justify-center gap-2 rounded-xl h-12',
                'bg-gradient-to-r from-primary-500 to-primary-600',
                'shadow-lg shadow-primary-500/25'
              )}
            >
              <Sparkles className="h-4 w-4" />
              {t('getStarted')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// Marketing Layout
// ============================================================================

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tf = useTranslations('footer')

  const footerColumns = [
    {
      title: tf('product.title'),
      links: [
        { label: tf('product.features'), href: '/#features' },
        { label: tf('product.pricing'), href: '/#pricing' },
        { label: tf('product.integrations'), href: '#' },
        { label: tf('product.changelog'), href: '#' },
        { label: tf('product.roadmap'), href: '#' },
      ],
    },
    {
      title: tf('company.title'),
      links: [
        { label: tf('company.about'), href: '/about' },
        { label: tf('company.blog'), href: '/blog' },
        { label: tf('company.careers'), href: '#' },
        { label: tf('company.press'), href: '#' },
        { label: tf('company.contact'), href: '/contact' },
      ],
    },
    {
      title: tf('resources.title'),
      links: [
        { label: tf('resources.documentation'), href: '#' },
        { label: tf('resources.helpCenter'), href: '#' },
        { label: tf('resources.community'), href: '#' },
        { label: tf('resources.templates'), href: '#' },
        { label: tf('resources.webinars'), href: '#' },
      ],
    },
    {
      title: tf('legal.title'),
      links: [
        { label: tf('legal.privacy'), href: '/privacy' },
        { label: tf('legal.terms'), href: '/terms' },
        { label: tf('legal.cookies'), href: '#' },
        { label: tf('legal.gdpr'), href: '#' },
        { label: tf('legal.security'), href: '#' },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterMarketing
        variant="mega"
        logo={<LinkedPulseLogo />}
        tagline={tf('tagline')}
        columns={footerColumns}
        socialLinks={socialLinks}
        showNewsletter
        newsletterTitle={tf('newsletter.title')}
        newsletterDescription={tf('newsletter.description')}
        newsletterPlaceholder={tf('newsletter.placeholder')}
        bottomLinks={[
          { label: tf('legal.privacy'), href: '/privacy' },
          { label: tf('legal.terms'), href: '/terms' },
          { label: tf('legal.cookies'), href: '#' },
        ]}
        copyright={tf('copyright', { year: new Date().getFullYear() })}
        showBackToTop
      />
    </div>
  )
}
