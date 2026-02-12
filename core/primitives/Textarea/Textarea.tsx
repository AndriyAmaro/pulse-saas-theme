'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const textareaVariants = cva(
  [
    'flex w-full rounded-md border px-3 py-2 text-sm',
    'transition-colors duration-150',
    'placeholder:text-[var(--text-muted)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-y min-h-[80px]',
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
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
      resize: 'vertical',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  showCount?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      state,
      resize,
      showCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() || ''
    )
    const currentValue = value !== undefined ? value.toString() : internalValue
    const charCount = currentValue.length

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    return (
      <div className="relative">
        <textarea
          ref={ref}
          className={cn(
            textareaVariants({ variant, state, resize }),
            showCount && 'pb-6',
            className
          )}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {showCount && (
          <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-[var(--text-muted)]">
            {charCount}
            {maxLength && `/${maxLength}`}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
