'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const switchVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--bg-emphasis)]',
          'data-[state=checked]:bg-primary-500',
          'focus-visible:ring-primary-500/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        success: [
          'bg-[var(--bg-emphasis)]',
          'data-[state=checked]:bg-success-base',
          'focus-visible:ring-success-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        warning: [
          'bg-[var(--bg-emphasis)]',
          'data-[state=checked]:bg-warning-base',
          'focus-visible:ring-warning-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        error: [
          'bg-[var(--bg-emphasis)]',
          'data-[state=checked]:bg-error-base',
          'focus-visible:ring-error-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const thumbSizes = {
  sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
  md: 'h-5 w-5 data-[state=checked]:translate-x-5',
  lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
}

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant, size = 'md', ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchVariants({ variant, size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-lg ring-0',
          'transition-transform duration-150',
          'data-[state=unchecked]:translate-x-0',
          thumbSizes[size || 'md']
        )}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = SwitchPrimitive.Root.displayName

const SwitchWithLabel = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps & {
    label: string
    description?: string
    labelPosition?: 'left' | 'right'
  }
>(
  (
    { label, description, labelPosition = 'right', className, size = 'md', ...props },
    ref
  ) => {
    const id = React.useId()

    const labelContent = (
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
    )

    return (
      <div
        className={cn(
          'flex items-center gap-3',
          labelPosition === 'left' && 'flex-row-reverse justify-end'
        )}
      >
        <Switch ref={ref} id={id} size={size} {...props} />
        {labelContent}
      </div>
    )
  }
)

SwitchWithLabel.displayName = 'SwitchWithLabel'

export { Switch, SwitchWithLabel, switchVariants }
