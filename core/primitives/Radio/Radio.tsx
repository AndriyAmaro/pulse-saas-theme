'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const radioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid-flow-col auto-cols-max',
      vertical: 'grid-flow-row',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

const radioItemVariants = cva(
  [
    'aspect-square rounded-full border',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-default)]',
          'data-[state=checked]:border-primary-500',
          'hover:border-primary-400',
          'focus-visible:ring-primary-500/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        success: [
          'border-[var(--border-default)]',
          'data-[state=checked]:border-success-base',
          'hover:border-success-base',
          'focus-visible:ring-success-base/20 focus-visible:ring-offset-[var(--bg-base)]',
        ],
        error: [
          'border-error-base',
          'data-[state=checked]:border-error-base',
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

const indicatorSizes = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
}

const indicatorColors = {
  default: 'bg-primary-500',
  success: 'bg-success-base',
  error: 'bg-error-base',
}

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'orientation'>,
    VariantProps<typeof radioGroupVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => {
  const resolvedOrientation = orientation ?? 'vertical'
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={resolvedOrientation}
      className={cn(radioGroupVariants({ orientation: resolvedOrientation }), className)}
      {...props}
    />
  )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant = 'default', size = 'md', ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ variant, size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            'rounded-full',
            indicatorSizes[size || 'md'],
            indicatorColors[variant || 'default']
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps & {
    label: string
    description?: string
  }
>(({ label, description, className, size = 'md', ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="flex items-start gap-3">
      <RadioGroupItem ref={ref} id={id} size={size} {...props} />
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

RadioGroupItemWithLabel.displayName = 'RadioGroupItemWithLabel'

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemWithLabel,
  radioGroupVariants,
  radioItemVariants,
}
