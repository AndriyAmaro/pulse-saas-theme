'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    'bg-[var(--bg-muted)] text-[var(--text-muted)]',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      status: {
        none: '',
        online: '',
        offline: '',
        busy: '',
        away: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'none',
    },
  }
)

const statusColors = {
  online: 'bg-success-base',
  offline: 'bg-neutral-400',
  busy: 'bg-error-base',
  away: 'bg-warning-base',
}

const statusSizes = {
  xs: 'h-1.5 w-1.5 border',
  sm: 'h-2 w-2 border',
  md: 'h-2.5 w-2.5 border-2',
  lg: 'h-3 w-3 border-2',
  xl: 'h-3.5 w-3.5 border-2',
  '2xl': 'h-4 w-4 border-2',
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  initials?: string
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      status = 'none',
      src,
      alt,
      initials,
      fallback,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)

    const showImage = src && !imageError
    const showInitials = !showImage && initials
    const showFallback = !showImage && !showInitials

    const getInitials = (text: string) => {
      return text
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, status }), className)}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}

        {showInitials && (
          <span className="font-medium text-[var(--text-primary)]">
            {getInitials(initials)}
          </span>
        )}

        {showFallback && (
          <span className="flex items-center justify-center">
            {fallback || <User className="h-1/2 w-1/2" />}
          </span>
        )}

        {status && status !== 'none' && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-[var(--bg-base)]',
              statusColors[status],
              statusSizes[size || 'md']
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    max?: number
    size?: VariantProps<typeof avatarVariants>['size']
  }
>(({ className, children, max = 4, size = 'md', ...props }, ref) => {
  const childArray = React.Children.toArray(children)
  const visibleChildren = max ? childArray.slice(0, max) : childArray
  const remainingCount = max ? Math.max(0, childArray.length - max) : 0

  return (
    <div
      ref={ref}
      className={cn('flex -space-x-2', className)}
      {...props}
    >
      {visibleChildren.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, {
            key: index,
            className: cn(
              'ring-2 ring-[var(--bg-base)]',
              (child as React.ReactElement<AvatarProps>).props.className
            ),
            size,
          })
        }
        return child
      })}

      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            'ring-2 ring-[var(--bg-base)]',
            'bg-[var(--bg-emphasis)] font-medium text-[var(--text-secondary)]'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
})

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
