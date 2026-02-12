import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const alertVariants = cva(
  [
    'relative flex w-full gap-3 rounded-lg border p-4',
    'transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--bg-muted)] border-[var(--border-default)]',
          'text-[var(--text-primary)]',
        ],
        info: [
          'bg-info-light/50 border-info-base/30',
          'text-info-dark dark:text-info-base',
        ],
        success: [
          'bg-success-light/50 border-success-base/30',
          'text-success-dark dark:text-success-base',
        ],
        warning: [
          'bg-warning-light/50 border-warning-base/30',
          'text-warning-dark dark:text-warning-base',
        ],
        error: [
          'bg-error-light/50 border-error-base/30',
          'text-error-dark dark:text-error-base',
        ],
      },
      size: {
        sm: 'p-3 text-xs',
        md: 'p-4 text-sm',
        lg: 'p-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const alertIconVariants = cva('flex-shrink-0', {
  variants: {
    variant: {
      default: 'text-[var(--text-muted)]',
      info: 'text-info-base',
      success: 'text-success-base',
      warning: 'text-warning-base',
      error: 'text-error-base',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

const defaultIcons: Record<AlertVariant, typeof Info> = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: React.ReactNode
  showIcon?: boolean
  dismissible?: boolean
  onDismiss?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      title,
      icon,
      showIcon = true,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const variantKey = (variant || 'default') as AlertVariant
    const IconComponent = defaultIcons[variantKey]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {showIcon && (
          <div className={cn(alertIconVariants({ variant, size }))}>
            {icon || <IconComponent className="h-full w-full" />}
          </div>
        )}

        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-semibold leading-tight">{title}</h5>
          )}
          {children && (
            <div className="text-[var(--text-secondary)] [&>p]:leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              'absolute right-2 top-2 rounded-sm p-1',
              'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
            aria-label="Dismiss alert"
          >
            <X className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert, alertVariants, alertIconVariants }
