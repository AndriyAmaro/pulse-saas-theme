'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Eye, EyeOff, Search, X } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm',
    'transition-colors duration-150',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-[var(--text-muted)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-default)] bg-[var(--bg-base)]',
          'text-[var(--text-primary)]',
          'focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
          'hover:border-[var(--secondary-400)]',
        ],
        filled: [
          'border-transparent bg-[var(--bg-muted)]',
          'text-[var(--text-primary)]',
          'focus-visible:bg-[var(--bg-base)] focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
          'hover:bg-[var(--bg-emphasis)]',
        ],
        ghost: [
          'border-transparent bg-transparent',
          'text-[var(--text-primary)]',
          'focus-visible:bg-[var(--bg-muted)] focus-visible:ring-primary-500/20',
          'hover:bg-[var(--bg-muted)]',
        ],
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: [
          'border-error-base',
          'focus-visible:border-error-base focus-visible:ring-error-base/20',
          'text-[var(--text-primary)]',
        ],
        success: [
          'border-success-base',
          'focus-visible:border-success-base focus-visible:ring-success-base/20',
          'text-[var(--text-primary)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
  showClearButton?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      inputSize,
      state,
      leftIcon,
      rightIcon,
      onClear,
      showClearButton,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === 'password'
    const isSearch = type === 'search'
    const hasValue = value !== undefined && value !== ''

    const togglePassword = () => setShowPassword((prev) => !prev)

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const showSearchIcon = isSearch && !leftIcon
    const showClear = (showClearButton || isSearch) && hasValue && onClear
    const showPasswordToggle = isPassword

    return (
      <div className="relative flex items-center">
        {(leftIcon || showSearchIcon) && (
          <div className="pointer-events-none absolute left-3 flex items-center text-[var(--text-muted)]">
            {leftIcon || <Search className="h-4 w-4" />}
          </div>
        )}

        <input
          type={inputType}
          className={cn(
            inputVariants({ variant, inputSize, state }),
            (leftIcon || showSearchIcon) && 'pl-10',
            (rightIcon || showClear || showPasswordToggle) && 'pr-10',
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />

        <div className="absolute right-3 flex items-center gap-1">
          {showClear && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center justify-center rounded-sm p-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePassword}
              className="flex items-center justify-center rounded-sm p-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {rightIcon && !showPasswordToggle && !showClear && (
            <div className="pointer-events-none text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
