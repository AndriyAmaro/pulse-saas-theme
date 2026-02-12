import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Inbox } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'py-8 px-4 gap-3',
        md: 'py-12 px-6 gap-4',
        lg: 'py-16 px-8 gap-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const emptyStateIconVariants = cva(
  'flex items-center justify-center rounded-full bg-[var(--bg-muted)]',
  {
    variants: {
      size: {
        sm: 'h-12 w-12',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size,
      icon,
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'
    const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
    const descSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size }), className)}
        {...props}
      >
        <div className={cn(emptyStateIconVariants({ size }), 'text-[var(--text-muted)]')}>
          {icon || <Inbox className={iconSize} />}
        </div>

        <div className="space-y-1">
          <h3 className={cn('font-semibold text-[var(--text-primary)]', titleSize)}>
            {title}
          </h3>
          {description && (
            <p className={cn('text-[var(--text-muted)] max-w-sm', descSize)}>
              {description}
            </p>
          )}
        </div>

        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

export { EmptyState, emptyStateVariants, emptyStateIconVariants }
