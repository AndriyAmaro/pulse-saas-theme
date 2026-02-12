'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const dividerVariants = cva('shrink-0 bg-[var(--border-default)]', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
    variant: {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      spacing: 'sm',
      className: 'my-2',
    },
    {
      orientation: 'horizontal',
      spacing: 'md',
      className: 'my-4',
    },
    {
      orientation: 'horizontal',
      spacing: 'lg',
      className: 'my-6',
    },
    {
      orientation: 'vertical',
      spacing: 'sm',
      className: 'mx-2',
    },
    {
      orientation: 'vertical',
      spacing: 'md',
      className: 'mx-4',
    },
    {
      orientation: 'vertical',
      spacing: 'lg',
      className: 'mx-6',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    spacing: 'none',
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: React.ReactNode
  labelPosition?: 'left' | 'center' | 'right'
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant,
      spacing,
      label,
      labelPosition = 'center',
      ...props
    },
    ref
  ) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center',
            spacing === 'sm' && 'my-2',
            spacing === 'md' && 'my-4',
            spacing === 'lg' && 'my-6',
            className
          )}
          role="separator"
          aria-orientation={orientation ?? undefined}
          {...props}
        >
          <div
            className={cn(
              'h-px flex-1 bg-[var(--border-default)]',
              labelPosition === 'left' && 'flex-none w-4',
              labelPosition === 'right' && 'flex-1'
            )}
          />
          <span className="px-3 text-sm text-[var(--text-muted)]">{label}</span>
          <div
            className={cn(
              'h-px flex-1 bg-[var(--border-default)]',
              labelPosition === 'right' && 'flex-none w-4',
              labelPosition === 'left' && 'flex-1'
            )}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, variant, spacing }), className)}
        role="separator"
        aria-orientation={orientation ?? undefined}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export { Divider, dividerVariants }
