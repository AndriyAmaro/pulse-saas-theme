import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const progressBarVariants = cva(
  'w-full overflow-hidden rounded-full bg-[var(--bg-muted)]',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const progressBarFillVariants = cva(
  'h-full transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-primary-500',
        success: 'bg-success-base',
        warning: 'bg-warning-base',
        error: 'bg-error-base',
        info: 'bg-info-base',
        gradient: 'bg-gradient-to-r from-primary-500 to-accent-400',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
      striped: {
        true: 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
        false: '',
      },
    },
    compoundVariants: [
      {
        striped: true,
        animated: true,
        className: 'animate-[progress-stripes_1s_linear_infinite]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      animated: false,
      striped: false,
    },
  }
)

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants>,
    VariantProps<typeof progressBarFillVariants> {
  value: number
  max?: number
  showValue?: boolean
  valuePosition?: 'inside' | 'outside' | 'top'
  label?: string
  formatValue?: (value: number, max: number) => string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      size,
      variant,
      animated,
      striped,
      value,
      max = 100,
      showValue = false,
      valuePosition = 'outside',
      label,
      formatValue,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const displayValue = formatValue
      ? formatValue(value, max)
      : `${Math.round(percentage)}%`

    const showInside = showValue && valuePosition === 'inside' && (size === 'lg' || size === 'xl')

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || (showValue && valuePosition === 'top')) && (
          <div className="mb-1.5 flex items-center justify-between text-sm">
            {label && (
              <span className="font-medium text-[var(--text-primary)]">
                {label}
              </span>
            )}
            {showValue && valuePosition === 'top' && (
              <span className="text-[var(--text-muted)]">{displayValue}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div
            className={cn(progressBarVariants({ size }))}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label}
          >
            <div
              className={cn(
                progressBarFillVariants({ variant, animated, striped }),
                'rounded-full'
              )}
              style={{ width: `${percentage}%` }}
            >
              {showInside && (
                <span className="flex h-full items-center justify-end pr-2 text-xs font-medium text-white">
                  {displayValue}
                </span>
              )}
            </div>
          </div>

          {showValue && valuePosition === 'outside' && (
            <span className="flex-shrink-0 text-sm text-[var(--text-muted)]">
              {displayValue}
            </span>
          )}
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar, progressBarVariants, progressBarFillVariants }
