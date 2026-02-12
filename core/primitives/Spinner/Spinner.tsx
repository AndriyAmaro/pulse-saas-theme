'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-primary-500',
      secondary: 'text-secondary-500',
      white: 'text-white',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading...', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label={label}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )
  }
)

Spinner.displayName = 'Spinner'

const SpinnerOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spinnerSize?: VariantProps<typeof spinnerVariants>['size']
    spinnerVariant?: VariantProps<typeof spinnerVariants>['variant']
    label?: string
  }
>(
  (
    {
      className,
      spinnerSize = 'lg',
      spinnerVariant = 'default',
      label,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center',
          'min-h-[100px]',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-3">
          <Spinner size={spinnerSize} variant={spinnerVariant} label={label} />
          {label && (
            <span className="text-sm text-[var(--text-muted)]">{label}</span>
          )}
        </div>
        {children}
      </div>
    )
  }
)

SpinnerOverlay.displayName = 'SpinnerOverlay'

export { Spinner, SpinnerOverlay, spinnerVariants }
