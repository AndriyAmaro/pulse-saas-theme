'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Link } from '@/i18n/navigation'
import { Input } from '@core/primitives/Input'
import { Button } from '@core/primitives/Button'
import { ArrowUp, Send, Twitter, Linkedin, Github, Youtube } from 'lucide-react'

// ============================================================================
// CVA Variants
// ============================================================================

const footerMarketingVariants = cva(
  'relative w-full border-t',
  {
    variants: {
      variant: {
        simple: [
          'bg-white dark:bg-slate-950',
          'border-slate-200 dark:border-slate-800',
          'py-12',
        ],
        mega: [
          'bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900',
          'border-slate-200/60 dark:border-slate-800/60',
          'pt-16 pb-8',
        ],
      },
    },
    defaultVariants: {
      variant: 'mega',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

type SocialPlatform = 'twitter' | 'linkedin' | 'github' | 'youtube'

type FooterLink = {
  label: string
  href: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

type SocialLink = {
  platform: SocialPlatform
  href: string
  label: string
}

type FooterMarketingProps = VariantProps<typeof footerMarketingVariants> & {
  logo?: React.ReactNode
  tagline?: string
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  showNewsletter?: boolean
  newsletterTitle?: string
  newsletterDescription?: string
  newsletterPlaceholder?: string
  bottomLinks?: FooterLink[]
  copyright?: string
  showBackToTop?: boolean
  className?: string
}

// ============================================================================
// Social Icon Map
// ============================================================================

const socialIcons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
}

// ============================================================================
// Back To Top Button
// ============================================================================

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        'group flex items-center gap-2 text-sm font-medium',
        'text-slate-500 dark:text-slate-400',
        'hover:text-primary-600 dark:hover:text-primary-400',
        'transition-colors duration-200'
      )}
    >
      <span>Back to top</span>
      <span
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-lg',
          'bg-slate-100 dark:bg-slate-800',
          'group-hover:bg-primary-50 dark:group-hover:bg-primary-950',
          'transition-all duration-200',
          'group-hover:-translate-y-0.5'
        )}
      >
        <ArrowUp className="h-4 w-4" />
      </span>
    </button>
  )
}

// ============================================================================
// Newsletter Section
// ============================================================================

const NewsletterSection = ({
  title,
  description,
  placeholder,
}: {
  title?: string
  description?: string
  placeholder?: string
}) => {
  const [email, setEmail] = React.useState('')

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder ?? 'your@email.com'}
          className="flex-1 h-10 text-sm"
        />
        <Button
          size="sm"
          className={cn(
            'h-10 px-4 gap-1.5 shrink-0',
            'bg-gradient-to-r from-primary-500 to-primary-600',
            'hover:from-primary-600 hover:to-primary-700',
            'shadow-md shadow-primary-500/20',
          )}
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

// ============================================================================
// FooterMarketing Component
// ============================================================================

const FooterMarketing = ({
  variant = 'mega',
  logo,
  tagline,
  columns = [],
  socialLinks = [],
  showNewsletter = false,
  newsletterTitle,
  newsletterDescription,
  newsletterPlaceholder,
  bottomLinks = [],
  copyright,
  showBackToTop = false,
  className,
}: FooterMarketingProps) => {
  return (
    <footer className={cn(footerMarketingVariants({ variant }), className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back to top */}
        {showBackToTop && (
          <div className="flex justify-end mb-8">
            <BackToTopButton />
          </div>
        )}

        {/* Main grid */}
        <div
          className={cn(
            'grid gap-10 lg:gap-16',
            showNewsletter
              ? 'grid-cols-1 lg:grid-cols-[1.2fr_2fr_1fr]'
              : 'grid-cols-1 lg:grid-cols-[1.2fr_3fr]'
          )}
        >
          {/* Brand column */}
          <div className="space-y-5">
            {logo}
            {tagline && (
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                {tagline}
              </p>
            )}
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform]
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center justify-center w-9 h-9 rounded-lg',
                        'text-slate-400 dark:text-slate-500',
                        'hover:text-slate-900 dark:hover:text-white',
                        'bg-slate-100/0 hover:bg-slate-100 dark:hover:bg-slate-800',
                        'transition-all duration-200',
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.length > 0 && (
            <div
              className={cn(
                'grid gap-8',
                columns.length === 2 && 'grid-cols-2',
                columns.length === 3 && 'grid-cols-2 md:grid-cols-3',
                columns.length >= 4 && 'grid-cols-2 md:grid-cols-4',
              )}
            >
              {columns.map((col) => (
                <div key={col.title} className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide uppercase">
                    {col.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => {
                      const isExternal = link.href.startsWith('http') || link.href === '#'
                      const LinkComp = isExternal ? 'a' : Link
                      return (
                        <li key={link.label}>
                          <LinkComp
                            href={link.href}
                            className={cn(
                              'text-sm text-slate-500 dark:text-slate-400',
                              'hover:text-slate-900 dark:hover:text-white',
                              'transition-colors duration-150',
                            )}
                          >
                            {link.label}
                          </LinkComp>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter column */}
          {showNewsletter && (
            <NewsletterSection
              title={newsletterTitle}
              description={newsletterDescription}
              placeholder={newsletterPlaceholder}
            />
          )}
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80',
            'flex flex-col sm:flex-row items-center justify-between gap-4',
          )}
        >
          {copyright && (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {copyright}
            </p>
          )}
          {bottomLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {bottomLinks.map((link) => {
                const isExternal = link.href.startsWith('http') || link.href === '#'
                const LinkComp = isExternal ? 'a' : Link
                return (
                  <LinkComp
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'text-sm text-slate-400 dark:text-slate-500',
                      'hover:text-slate-600 dark:hover:text-slate-300',
                      'transition-colors duration-150',
                    )}
                  >
                    {link.label}
                  </LinkComp>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export {
  FooterMarketing,
  footerMarketingVariants,
}

export type {
  FooterMarketingProps,
  FooterColumn,
  FooterLink,
  SocialLink,
  SocialPlatform,
}
