'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@shared/utils/cn'

function PulseLogoSmall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="40"
        height="40"
        rx="8"
        className="fill-primary-500"
      />
      <path
        d="M8 20H14L17 12L20 28L23 16L26 20H32"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface AuthCardProps {
  title: string
  subtitle?: string
  showLogo?: boolean
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  ({ title, subtitle, showLogo = true, children, footer, className }, ref) => {
    return (
      <div ref={ref} className={cn('w-full space-y-6', className)}>
        {/* Header */}
        <div className="space-y-2 text-center">
          {showLogo && (
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 lg:hidden"
            >
              <PulseLogoSmall className="h-10 w-10" />
            </Link>
          )}
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="text-center text-sm text-[var(--text-muted)]">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

AuthCard.displayName = 'AuthCard'

interface AuthDividerProps {
  text?: string
  className?: string
}

const AuthDivider = ({ text = 'Or continue with', className }: AuthDividerProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border-default)]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[var(--bg-base)] px-2 text-[var(--text-muted)]">
          {text}
        </span>
      </div>
    </div>
  )
}

AuthDivider.displayName = 'AuthDivider'

interface AuthLinkProps {
  text: string
  linkText: string
  href: string
  className?: string
}

const AuthLink = ({ text, linkText, href, className }: AuthLinkProps) => {
  return (
    <p className={cn('text-center text-sm text-[var(--text-muted)]', className)}>
      {text}{' '}
      <Link
        href={href}
        className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
      >
        {linkText}
      </Link>
    </p>
  )
}

AuthLink.displayName = 'AuthLink'

export { AuthCard, AuthDivider, AuthLink }
