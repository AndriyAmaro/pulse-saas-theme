'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { TrendingUp, TrendingDown, Minus, Target, ChevronRight } from 'lucide-react'

// ============================================================================
// METRIC CARD ADVANCED - Enhanced metric card with sparkline, progress, breakdown
// ============================================================================

const metricCardAdvancedVariants = cva(
  [
    'relative overflow-hidden rounded-xl border transition-all duration-300',
    'bg-white dark:bg-slate-900',
    'border-teal-200/30 dark:border-teal-800/50',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-[0_2px_8px_-2px_rgba(20,184,154,0.08)] hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.12)] dark:shadow-[0_2px_8px_-2px_rgba(20,184,154,0.15)] dark:hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.25)]',
        elevated: 'shadow-[0_4px_12px_-2px_rgba(20,184,154,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.18)] dark:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.2)] dark:hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.35)]',
        outline: 'shadow-none border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600',
        ghost: 'border-transparent bg-secondary-50 dark:bg-secondary-800 shadow-none',
      },
      size: {
        default: 'p-5',
        compact: 'p-3',
        large: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export interface MetricBreakdownItem {
  label: string
  value: number | string
  color?: string
  isPositive?: boolean
}

export interface MetricCardAdvancedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardAdvancedVariants> {
  /** Card title */
  title: string
  /** Main metric value */
  value: string | number
  /** Change percentage or value */
  change?: number
  /** Change label (e.g., "vs last month") */
  changeLabel?: string
  /** Sparkline data for trend visualization */
  sparkline?: number[]
  /** Sparkline color */
  sparklineColor?: string
  /** Target value for progress */
  target?: number
  /** Current progress value */
  progress?: number
  /** Progress label */
  progressLabel?: string
  /** Comparison text */
  comparison?: string
  /** Icon to display */
  icon?: React.ReactNode
  /** Icon background color class */
  iconBgColor?: string
  /** Icon badge (small indicator on the icon) */
  iconBadge?: React.ReactNode
  /** Breakdown items (e.g., "+$500 new, -$100 churn") */
  breakdown?: MetricBreakdownItem[]
  /** Footer content */
  footer?: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Show arrow on hover when clickable */
  showArrow?: boolean
  /** Value formatter */
  valueFormatter?: (value: number | string) => string
  /** Loading state */
  loading?: boolean
  /** Trend type override (positive change can be bad, like bounce rate) */
  trendType?: 'positive-is-good' | 'negative-is-good'
  /** Sparkline type */
  sparklineType?: 'line' | 'area' | 'bar'
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface TrendIndicatorProps {
  change: number
  trendType: 'positive-is-good' | 'negative-is-good'
  size?: 'sm' | 'md'
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ change, trendType, size = 'md' }) => {
  const isGood =
    (trendType === 'positive-is-good' && change > 0) ||
    (trendType === 'negative-is-good' && change < 0)

  const isBad =
    (trendType === 'positive-is-good' && change < 0) ||
    (trendType === 'negative-is-good' && change > 0)

  if (change === 0) {
    return (
      <span className={cn('flex items-center gap-1 text-secondary-500', size === 'sm' ? 'text-xs' : 'text-sm')}>
        <Minus className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
        0%
      </span>
    )
  }

  const Icon = change > 0 ? TrendingUp : TrendingDown
  const colorClass = isGood
    ? 'text-green-600 dark:text-green-400'
    : isBad
    ? 'text-red-600 dark:text-red-400'
    : 'text-secondary-500'

  return (
    <span className={cn('flex items-center gap-1 font-medium', colorClass, size === 'sm' ? 'text-xs' : 'text-sm')}>
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {change > 0 ? '+' : ''}{change}%
    </span>
  )
}

// Skeleton for loading state
const MetricCardSkeleton: React.FC<{ variant: string; size: string }> = ({ variant, size }) => {
  const isCompact = size === 'compact'

  return (
    <div className={cn(metricCardAdvancedVariants({ variant: variant as 'default', size: size as 'default' }), 'animate-pulse')}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className={cn('h-4 rounded bg-secondary-200 dark:bg-secondary-700', isCompact ? 'w-16' : 'w-24')} />
          <div className={cn('h-8 rounded bg-secondary-200 dark:bg-secondary-700', isCompact ? 'w-20' : 'w-32')} />
        </div>
        <div className="h-10 w-10 rounded-lg bg-secondary-200 dark:bg-secondary-700" />
      </div>
      <div className="mt-4 h-8 w-full rounded bg-secondary-200 dark:bg-secondary-700" />
    </div>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================

const MetricCardAdvanced = React.forwardRef<HTMLDivElement, MetricCardAdvancedProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      title,
      value,
      change,
      changeLabel,
      sparkline,
      sparklineColor = 'var(--color-primary-500)',
      target,
      progress,
      progressLabel,
      comparison,
      icon,
      iconBgColor = 'bg-primary-100 dark:bg-primary-900/30',
      iconBadge,
      breakdown,
      footer,
      onClick,
      showArrow = true,
      valueFormatter,
      loading = false,
      trendType = 'positive-is-good',
      sparklineType = 'area',
      ...props
    },
    ref
  ) => {
    const isCompact = size === 'compact'
    const isClickable = !!onClick

    if (loading) {
      return <MetricCardSkeleton variant={variant || 'default'} size={size || 'default'} />
    }

    const formatValue = (val: number | string): string => {
      if (valueFormatter) {
        return valueFormatter(val)
      }
      if (typeof val === 'number') {
        return val.toLocaleString()
      }
      return val
    }

    // Calculate progress percentage if target is provided
    const progressPercent =
      progress !== undefined && target
        ? Math.min(Math.round((progress / target) * 100), 100)
        : undefined

    return (
      <div
        ref={ref}
        className={cn(
          metricCardAdvancedVariants({ variant, size }),
          isClickable && 'cursor-pointer hover:border-primary-300 hover:shadow-md dark:hover:border-primary-700',
          className
        )}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Title and Value */}
          <div className="min-w-0 flex-1">
            <p className={cn('truncate text-secondary-600 dark:text-secondary-400', isCompact ? 'text-xs' : 'text-sm')}>
              {title}
            </p>
            <div className={cn('flex items-baseline gap-2', isCompact ? 'mt-0.5' : 'mt-1')}>
              <span
                className={cn(
                  'font-bold text-gray-900 dark:text-white',
                  isCompact ? 'text-xl' : size === 'large' ? 'text-4xl' : 'text-2xl'
                )}
              >
                {formatValue(value)}
              </span>
              {change !== undefined && (
                <TrendIndicator change={change} trendType={trendType} size={isCompact ? 'sm' : 'md'} />
              )}
            </div>
            {changeLabel && (
              <p className={cn('text-secondary-500 dark:text-secondary-500', isCompact ? 'text-[10px]' : 'text-xs')}>
                {changeLabel}
              </p>
            )}
          </div>

          {/* Icon */}
          {icon && (
            <div className={cn('relative flex-shrink-0 rounded-lg p-2', iconBgColor)}>
              <span className="text-primary-600 dark:text-primary-400">{icon}</span>
              {iconBadge && (
                <span className="absolute -right-1 -top-1">{iconBadge}</span>
              )}
            </div>
          )}

          {/* Arrow for clickable cards */}
          {isClickable && showArrow && (
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-secondary-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-secondary-500" />
          )}
        </div>

        {/* Sparkline */}
        {sparkline && sparkline.length > 0 && (
          <div className={cn('w-full', isCompact ? 'mt-2' : 'mt-4')}>
            <SparklineChart
              data={sparkline}
              type={sparklineType}
              color={sparklineColor}
              width={isCompact ? 120 : 200}
              height={isCompact ? 24 : 32}
              showDot
              gradient
              showTooltip
              animated
            />
          </div>
        )}

        {/* Progress to Target */}
        {target !== undefined && progressPercent !== undefined && (
          <div className={cn(isCompact ? 'mt-2' : 'mt-4')}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-secondary-500 dark:text-secondary-400">
                <Target className="h-3 w-3" />
                {progressLabel || 'Progress to target'}
              </span>
              <span className="font-medium text-secondary-700 dark:text-secondary-300">
                {progressPercent}%
              </span>
            </div>
            <ProgressBar
              value={progressPercent}
              size="sm"
              variant={progressPercent >= 100 ? 'success' : 'default'}
            />
          </div>
        )}

        {/* Comparison */}
        {comparison && (
          <p className={cn('text-secondary-500 dark:text-secondary-400', isCompact ? 'mt-1 text-[10px]' : 'mt-2 text-xs')}>
            {comparison}
          </p>
        )}

        {/* Breakdown */}
        {breakdown && breakdown.length > 0 && (
          <div
            className={cn(
              'flex flex-wrap gap-x-3 gap-y-1 border-t border-secondary-100 dark:border-secondary-800',
              isCompact ? 'mt-2 pt-2' : 'mt-3 pt-3'
            )}
          >
            {breakdown.map((item, index) => (
              <span
                key={index}
                className={cn(
                  'flex items-center gap-1',
                  isCompact ? 'text-[10px]' : 'text-xs',
                  item.isPositive === true
                    ? 'text-green-600 dark:text-green-400'
                    : item.isPositive === false
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-secondary-600 dark:text-secondary-400'
                )}
              >
                {item.color && (
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                )}
                <span className="font-medium">{item.value}</span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* Custom Footer */}
        {footer && (
          <div
            className={cn(
              'border-t border-secondary-100 dark:border-secondary-800',
              isCompact ? 'mt-2 pt-2' : 'mt-3 pt-3'
            )}
          >
            {footer}
          </div>
        )}
      </div>
    )
  }
)

MetricCardAdvanced.displayName = 'MetricCardAdvanced'

export { MetricCardAdvanced, metricCardAdvancedVariants }
