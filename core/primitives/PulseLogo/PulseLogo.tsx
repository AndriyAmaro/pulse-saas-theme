'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ VARIANTS ============

const logoContainerVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const iconContainerVariants = cva(
  'flex items-center justify-center shrink-0',
  {
    variants: {
      size: {
        sm: 'h-7 w-7 rounded-lg',
        md: 'h-8 w-8 rounded-lg',
        lg: 'h-9 w-9 rounded-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const textVariants = cva('font-bold', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// ============ ECG ICON ============

/** Standalone ECG icon SVG with its own primary background */
export function PulseEcgIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" className="fill-primary-500" />
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

/** ECG path only (no background) — used internally by PulseLogo */
function EcgPath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
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

// ============ TYPES ============

export interface PulseLogoProps
  extends VariantProps<typeof logoContainerVariants> {
  /** Display variant */
  variant?: 'icon-only' | 'full' | 'premium'
  /** Override the premium text gradient classes (e.g. 'from-white to-slate-300' for dark backgrounds) */
  textClassName?: string
  className?: string
}

// ============ COMPONENT ============

export const PulseLogo = React.forwardRef<HTMLDivElement, PulseLogoProps>(
  ({ variant = 'full', size = 'md', textClassName, className }, ref) => {
    const showText = variant !== 'icon-only'
    const isPremium = variant === 'premium'

    return (
      <div
        ref={ref}
        className={cn(
          logoContainerVariants({ size }),
          isPremium && 'group',
          className
        )}
      >
        {/* Icon */}
        <div className="relative">
          {/* Glow (premium only) */}
          {isPremium && (
            <div
              className={cn(
                'absolute inset-0 rounded-xl',
                'bg-gradient-to-br from-primary-400 to-primary-600',
                'opacity-75 blur-sm',
                'transition-all duration-300',
                'group-hover:opacity-100 group-hover:blur-md'
              )}
            />
          )}

          <div
            className={cn(
              iconContainerVariants({ size }),
              'relative',
              isPremium
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg transition-transform duration-300 group-hover:scale-105'
                : 'bg-primary-500'
            )}
          >
            <EcgPath
              className={cn(
                size === 'sm' && 'h-4 w-4',
                size === 'md' && 'h-6 w-6',
                size === 'lg' && 'h-6 w-6'
              )}
            />
          </div>
        </div>

        {/* Text */}
        {showText && (
          <span
            className={cn(
              textVariants({ size }),
              isPremium
                ? cn(
                    'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300',
                    textClassName || 'from-slate-900 to-slate-700 dark:from-white dark:to-slate-300'
                  )
                : 'text-[var(--text-primary)]'
            )}
          >
            Pulse
          </span>
        )}
      </div>
    )
  }
)

PulseLogo.displayName = 'PulseLogo'
