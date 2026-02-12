'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Mail, Check, Loader2, AlertCircle } from 'lucide-react'

// ============================================================================
// EMAIL CAPTURE - Newsletter/notification signup component
// ============================================================================

const emailCaptureVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      inline: 'flex gap-2',
      stacked: 'flex flex-col gap-3',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'inline',
    size: 'md',
  },
})

const inputVariants = cva(
  [
    'w-full rounded-lg border bg-white dark:bg-secondary-800',
    'text-secondary-900 dark:text-secondary-100',
    'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    'transition-colors duration-150',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg',
      },
      hasError: {
        true: 'border-red-500 focus:ring-red-500/50',
        false: 'border-secondary-300 dark:border-secondary-600',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
)

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600 active:bg-primary-700',
          'focus:ring-primary-500',
        ],
        accent: [
          'bg-accent-500 text-white',
          'hover:bg-accent-600 active:bg-accent-700',
          'focus:ring-accent-500',
        ],
        gradient: [
          'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
          'hover:from-primary-600 hover:to-primary-700',
          'focus:ring-primary-500',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export interface EmailCaptureProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    VariantProps<typeof emailCaptureVariants> {
  /** Placeholder text for input */
  placeholder?: string
  /** Button text */
  buttonText?: string
  /** Success message after submission */
  successMessage?: string
  /** Error message on failure */
  errorMessage?: string
  /** Callback when email is submitted */
  onSubmit?: (email: string) => void | Promise<void>
  /** Loading state */
  loading?: boolean
  /** Success state */
  success?: boolean
  /** Error state */
  error?: boolean
  /** Show email icon */
  showIcon?: boolean
  /** Button variant */
  buttonVariant?: 'primary' | 'accent' | 'gradient'
  /** Helper text below input */
  helperText?: string
  /** Show subscriber count */
  subscriberCount?: number
}

// ============================================================================
// COMPONENT
// ============================================================================

const EmailCapture = React.forwardRef<HTMLFormElement, EmailCaptureProps>(
  (
    {
      className,
      variant = 'inline',
      size = 'md',
      placeholder = 'Enter your email',
      buttonText = 'Subscribe',
      successMessage = "You're on the list!",
      errorMessage = 'Something went wrong. Please try again.',
      onSubmit,
      loading: externalLoading,
      success: externalSuccess,
      error: externalError,
      showIcon = true,
      buttonVariant = 'primary',
      helperText,
      subscriberCount,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState('')
    const [internalLoading, setInternalLoading] = React.useState(false)
    const [internalSuccess, setInternalSuccess] = React.useState(false)
    const [internalError, setInternalError] = React.useState(false)

    const loading = externalLoading ?? internalLoading
    const success = externalSuccess ?? internalSuccess
    const error = externalError ?? internalError

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || loading) return

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setInternalError(true)
        return
      }

      setInternalLoading(true)
      setInternalError(false)

      try {
        await onSubmit?.(email)
        setInternalSuccess(true)
        setEmail('')
      } catch {
        setInternalError(true)
      } finally {
        setInternalLoading(false)
      }
    }

    // Success state
    if (success) {
      return (
        <div
          className={cn(
            'flex items-center justify-center gap-3 py-4 px-6',
            'bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800',
            className
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
            <Check className="w-5 h-5 text-white" />
          </div>
          <span className="text-green-700 dark:text-green-300 font-medium">
            {successMessage}
          </span>
        </div>
      )
    }

    const actualSize = size || 'md'

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(emailCaptureVariants({ variant }), className)}
        {...props}
      >
        <div className={cn('relative flex-1', variant === 'inline' && 'min-w-0')}>
          {showIcon && (
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setInternalError(false)
            }}
            placeholder={placeholder}
            disabled={loading}
            className={cn(
              inputVariants({ size: actualSize, hasError: error }),
              showIcon && 'pl-10'
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className={cn(
            buttonVariants({ size: actualSize, variant: buttonVariant }),
            variant === 'inline' && 'flex-shrink-0'
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            buttonText
          )}
        </button>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">
            {helperText}
          </p>
        )}

        {/* Subscriber count */}
        {subscriberCount && !error && (
          <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">
            Join {subscriberCount.toLocaleString()} others already subscribed
          </p>
        )}
      </form>
    )
  }
)

EmailCapture.displayName = 'EmailCapture'

// ============================================================================
// EXPORTS
// ============================================================================

export { EmailCapture, emailCaptureVariants, inputVariants, buttonVariants }
