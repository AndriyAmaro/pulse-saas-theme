import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const errorStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'py-8 px-4 gap-3',
        md: 'py-12 px-6 gap-4',
        lg: 'py-16 px-8 gap-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const errorStateIconVariants = cva(
  'flex items-center justify-center rounded-full bg-error-light/50 dark:bg-error-base/20',
  {
    variants: {
      size: {
        sm: 'h-12 w-12',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ErrorStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorStateVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  error?: Error | string
  showRetry?: boolean
  onRetry?: () => void
  retryLabel?: string
  action?: React.ReactNode
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      size,
      icon,
      title = 'Something went wrong',
      description,
      error,
      showRetry = true,
      onRetry,
      retryLabel = 'Try again',
      action,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'
    const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
    const descSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

    const errorMessage =
      error instanceof Error ? error.message : error || description

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(errorStateVariants({ size }), className)}
        {...props}
      >
        <div className={cn(errorStateIconVariants({ size }), 'text-error-base')}>
          {icon || <AlertCircle className={iconSize} />}
        </div>

        <div className="space-y-1">
          <h3 className={cn('font-semibold text-[var(--text-primary)]', titleSize)}>
            {title}
          </h3>
          {errorMessage && (
            <p className={cn('text-[var(--text-muted)] max-w-sm', descSize)}>
              {errorMessage}
            </p>
          )}
        </div>

        {(showRetry && onRetry) || action ? (
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-md',
                  'bg-primary-500 text-white font-medium',
                  'hover:bg-primary-600 active:bg-primary-700',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                )}
              >
                <RefreshCw className="h-4 w-4" />
                {retryLabel}
              </button>
            )}
            {action}
          </div>
        ) : null}
      </div>
    )
  }
)

ErrorState.displayName = 'ErrorState'

export { ErrorState, errorStateVariants, errorStateIconVariants }
