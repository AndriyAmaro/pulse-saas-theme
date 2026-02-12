'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'text-sm font-medium transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white shadow-sm',
          'hover:bg-primary-600 active:bg-primary-700',
          'focus-visible:ring-primary-500',
        ],
        secondary: [
          'bg-secondary-100 text-secondary-700',
          'dark:bg-secondary-800 dark:text-secondary-100',
          'hover:bg-secondary-200 dark:hover:bg-secondary-700',
          'active:bg-secondary-300 dark:active:bg-secondary-600',
          'focus-visible:ring-secondary-500',
        ],
        outline: [
          'border border-[var(--border-default)] bg-transparent',
          'text-[var(--text-primary)]',
          'hover:bg-[var(--bg-muted)] hover:border-[var(--secondary-400)]',
          'active:bg-[var(--bg-emphasis)]',
          'focus-visible:ring-primary-500',
        ],
        ghost: [
          'bg-transparent text-[var(--text-primary)]',
          'hover:bg-[var(--bg-muted)]',
          'active:bg-[var(--bg-emphasis)]',
          'focus-visible:ring-primary-500',
        ],
        danger: [
          'bg-error-base text-white shadow-sm',
          'hover:bg-error-dark active:bg-error-dark',
          'focus-visible:ring-error-base',
        ],
        'danger-outline': [
          'border border-error-base bg-transparent text-error-base',
          'hover:bg-error-light dark:hover:bg-error-base/10',
          'active:bg-error-light/80',
          'focus-visible:ring-error-base',
        ],
        link: [
          'text-primary-500 underline-offset-4',
          'hover:underline hover:text-primary-600',
          'active:text-primary-700',
          'focus-visible:ring-primary-500',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded [&_svg]:h-3 [&_svg]:w-3',
        sm: 'h-8 px-3 text-xs rounded-md [&_svg]:h-4 [&_svg]:w-4',
        md: 'h-10 px-4 text-sm [&_svg]:h-4 [&_svg]:w-4',
        lg: 'h-11 px-6 text-base [&_svg]:h-5 [&_svg]:w-5',
        xl: 'h-12 px-8 text-base [&_svg]:h-5 [&_svg]:w-5',
        icon: 'h-10 w-10 [&_svg]:h-5 [&_svg]:w-5',
        'icon-sm': 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
        'icon-xs': 'h-7 w-7 [&_svg]:h-3.5 [&_svg]:w-3.5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const isIconOnly = size === 'icon' || size === 'icon-sm' || size === 'icon-xs'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            {!isIconOnly && <span>Loading...</span>}
          </>
        ) : (
          <>
            {leftIcon && !isIconOnly && leftIcon}
            {children}
            {rightIcon && !isIconOnly && rightIcon}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
