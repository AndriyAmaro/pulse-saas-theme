'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, Minus } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const checkboxVariants = cva(
  [
    'peer shrink-0 rounded border',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-150',
    'data-[state=checked]:text-white',
    'data-[state=indeterminate]:text-white',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-default)]',
          'data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500',
          'data-[state=indeterminate]:border-primary-500 data-[state=indeterminate]:bg-primary-500',
          'hover:border-primary-400',
          'focus-visible:ring-primary-500/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        success: [
          'border-[var(--border-default)]',
          'data-[state=checked]:border-success-base data-[state=checked]:bg-success-base',
          'data-[state=indeterminate]:border-success-base data-[state=indeterminate]:bg-success-base',
          'hover:border-success-base',
          'focus-visible:ring-success-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        error: [
          'border-error-base',
          'data-[state=checked]:border-error-base data-[state=checked]:bg-error-base',
          'data-[state=indeterminate]:border-error-base data-[state=indeterminate]:bg-error-base',
          'hover:border-error-dark',
          'focus-visible:ring-error-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
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
  }
)

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
}

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size = 'md', indeterminate, ...props }, ref) => {
  const checked = indeterminate ? 'indeterminate' : props.checked

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, size }), className)}
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {indeterminate ? (
          <Minus className={iconSizes[size || 'md']} strokeWidth={3} />
        ) : (
          <Check className={iconSizes[size || 'md']} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps & {
    label: string
    description?: string
  }
>(({ label, description, className, size = 'md', ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="flex items-start gap-3">
      <Checkbox ref={ref} id={id} size={size} {...props} />
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className={cn(
            'cursor-pointer font-medium leading-none text-[var(--text-primary)]',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}
        >
          {label}
        </label>
        {description && (
          <span className="text-sm text-[var(--text-muted)]">{description}</span>
        )}
      </div>
    </div>
  )
})

CheckboxWithLabel.displayName = 'CheckboxWithLabel'

export { Checkbox, CheckboxWithLabel, checkboxVariants }
