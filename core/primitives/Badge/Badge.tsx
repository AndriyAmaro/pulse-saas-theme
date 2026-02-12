'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full font-medium',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--bg-muted)] text-[var(--text-secondary)]',
          'border border-[var(--border-default)]',
        ],
        primary: [
          'bg-primary-100 text-primary-700',
          'dark:bg-primary-900/30 dark:text-primary-300',
        ],
        secondary: [
          'bg-secondary-100 text-secondary-700',
          'dark:bg-secondary-800 dark:text-secondary-300',
        ],
        success: [
          'bg-success-light text-success-dark',
          'dark:bg-success-base/20 dark:text-success-base',
        ],
        warning: [
          'bg-warning-light text-warning-dark',
          'dark:bg-warning-base/20 dark:text-warning-base',
        ],
        error: [
          'bg-error-light text-error-dark',
          'dark:bg-error-base/20 dark:text-error-base',
        ],
        info: [
          'bg-info-light text-info-dark',
          'dark:bg-info-base/20 dark:text-info-base',
        ],
        outline: [
          'bg-transparent border border-[var(--border-default)]',
          'text-[var(--text-secondary)]',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-1.5 w-1.5 rounded-full',
              variant === 'success' && 'bg-success-base',
              variant === 'warning' && 'bg-warning-base',
              variant === 'error' && 'bg-error-base',
              variant === 'info' && 'bg-info-base',
              variant === 'primary' && 'bg-primary-500',
              variant === 'secondary' && 'bg-secondary-500',
              (variant === 'default' || variant === 'outline') &&
                'bg-[var(--text-muted)]'
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
