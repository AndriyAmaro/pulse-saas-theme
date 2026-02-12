import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const statCardVariants = cva(
  [
    'rounded-xl border p-6',
    'bg-white dark:bg-slate-900',
    'border-teal-200/30 dark:border-teal-800/50',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-[0_2px_8px_-2px_rgba(20,184,154,0.08)] hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.12)] dark:shadow-[0_2px_8px_-2px_rgba(20,184,154,0.15)] dark:hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.25)]',
        elevated: 'shadow-[0_4px_12px_-2px_rgba(20,184,154,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.18)] dark:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.2)] dark:hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.35)]',
        outline: 'shadow-none border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const trendVariants = cva(
  'inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5',
  {
    variants: {
      trend: {
        up: 'bg-success-light/50 text-success-dark dark:bg-success-base/20 dark:text-success-base',
        down: 'bg-error-light/50 text-error-dark dark:bg-error-base/20 dark:text-error-base',
        neutral: 'bg-[var(--bg-muted)] text-[var(--text-muted)]',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  }
)

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label?: string
    direction?: 'up' | 'down' | 'neutral'
  }
  footer?: React.ReactNode
  loading?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant,
      size,
      title,
      value,
      description,
      icon,
      trend,
      footer,
      loading = false,
      ...props
    },
    ref
  ) => {
    const trendDirection =
      trend?.direction ||
      (trend?.value && trend.value > 0 ? 'up' : trend?.value && trend.value < 0 ? 'down' : 'neutral')

    const TrendIcon =
      trendDirection === 'up'
        ? TrendingUp
        : trendDirection === 'down'
          ? TrendingDown
          : Minus

    const iconSizeClass = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
    const valueSizeClass = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-3xl'

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(statCardVariants({ variant, size }), className)}
          {...props}
        >
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-[var(--bg-muted)] rounded" />
              <div className={cn(iconSizeClass, 'bg-[var(--bg-muted)] rounded-lg')} />
            </div>
            <div className={cn('h-8 w-32 bg-[var(--bg-muted)] rounded', valueSizeClass)} />
            <div className="h-3 w-20 bg-[var(--bg-muted)] rounded" />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <p className={cn('font-bold text-slate-900 dark:text-white', valueSizeClass)}>
              {value}
            </p>
          </div>

          {icon && (
            <div
              className={cn(
                'flex items-center justify-center rounded-lg',
                'bg-primary-500/10 text-primary-500',
                iconSizeClass
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {(trend || description) && (
          <div className="mt-4 flex items-center gap-2">
            {trend && (
              <span className={cn(trendVariants({ trend: trendDirection }))}>
                <TrendIcon className="h-3 w-3" />
                <span>
                  {trend.value > 0 ? '+' : ''}
                  {trend.value}%
                </span>
              </span>
            )}
            {(trend?.label || description) && (
              <span className="text-xs text-secondary-600 dark:text-secondary-400">
                {trend?.label || description}
              </span>
            )}
          </div>
        )}

        {footer && <div className="mt-4 border-t border-[var(--border-default)] pt-4">{footer}</div>}
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'

export { StatCard, statCardVariants, trendVariants }
