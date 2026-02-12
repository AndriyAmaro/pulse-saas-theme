'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const tagVariants = cva(
  [
    'inline-flex items-center gap-1 rounded-md font-medium',
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
          'hover:bg-[var(--bg-muted)]',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
}

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removable?: boolean
  icon?: React.ReactNode
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size = 'md',
      children,
      onRemove,
      removable,
      icon,
      ...props
    },
    ref
  ) => {
    const showRemove = removable || onRemove

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className={cn('shrink-0', iconSizes[size || 'md'])}>{icon}</span>
        )}
        {children}
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500',
              iconSizes[size || 'md']
            )}
            aria-label="Remove tag"
          >
            <X className="h-full w-full" />
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'

const TagGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gap?: 'sm' | 'md' | 'lg'
  }
>(({ className, gap = 'sm', ...props }, ref) => {
  const gapSizes = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  }

  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center', gapSizes[gap], className)}
      {...props}
    />
  )
})

TagGroup.displayName = 'TagGroup'

export { Tag, TagGroup, tagVariants }
