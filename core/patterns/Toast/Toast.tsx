'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const ToastProvider = ToastPrimitives.Provider

const toastViewportVariants = cva(
  [
    'fixed z-[100] flex max-h-screen flex-col-reverse gap-2 p-4',
    'sm:flex-col',
  ],
  {
    variants: {
      position: {
        'top-left': 'top-0 left-0',
        'top-center': 'top-0 left-1/2 -translate-x-1/2',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-0 right-0',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  }
)

interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>,
    VariantProps<typeof toastViewportVariants> {}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ className, position, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(toastViewportVariants({ position }), className)}
    {...props}
  />
))
ToastViewport.displayName = 'ToastViewport'

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden',
    'rounded-lg border p-4 shadow-lg',
    'transition-all',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=move]:transition-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-right-full',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-default)] bg-[var(--bg-base)]',
          'text-[var(--text-primary)]',
        ],
        success: [
          'border-success-base/30 bg-success-light/50 dark:bg-success-base/10',
          'text-success-dark dark:text-success-base',
        ],
        error: [
          'border-error-base/30 bg-error-light/50 dark:bg-error-base/10',
          'text-error-dark dark:text-error-base',
        ],
        warning: [
          'border-warning-base/30 bg-warning-light/50 dark:bg-warning-base/10',
          'text-warning-dark dark:text-warning-base',
        ],
        info: [
          'border-info-base/30 bg-info-light/50 dark:bg-info-base/10',
          'text-info-dark dark:text-info-base',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

const defaultIcons: Record<ToastVariant, typeof Info> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  showIcon?: boolean
  action?: React.ReactNode
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      icon,
      showIcon = true,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const variantKey = (variant || 'default') as ToastVariant
    const IconComponent = defaultIcons[variantKey]

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), 'w-[360px] max-w-full', className)}
        {...props}
      >
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {icon || <IconComponent className="h-5 w-5" />}
          </div>
        )}

        <div className="flex-1 space-y-1">
          {title && (
            <ToastPrimitives.Title className="text-sm font-semibold">
              {title}
            </ToastPrimitives.Title>
          )}
          {description && (
            <ToastPrimitives.Description className="text-sm opacity-90">
              {description}
            </ToastPrimitives.Description>
          )}
          {children}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}

        <ToastPrimitives.Close
          className={cn(
            'absolute right-2 top-2 rounded-sm p-1',
            'text-current opacity-50 hover:opacity-100',
            'transition-opacity duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
    )
  }
)
Toast.displayName = 'Toast'

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-3 py-1.5',
      'text-xs font-medium',
      'bg-[var(--bg-base)] border border-[var(--border-default)]',
      'hover:bg-[var(--bg-muted)]',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  toastVariants,
  toastViewportVariants,
}
export type { ToastViewportProps }
