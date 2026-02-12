'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const skeletonVariants = cva(
  [
    'animate-pulse bg-[var(--bg-muted)]',
    'dark:bg-[var(--bg-emphasis)]',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-md',
        circular: 'rounded-full',
        text: 'rounded h-4',
        rectangular: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number
    lastLineWidth?: string
  }
>(({ className, lines = 3, lastLineWidth = '60%', ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  )
})

SkeletonText.displayName = 'SkeletonText'

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  }

  return (
    <Skeleton
      ref={ref}
      variant="circular"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
      {...props}
    />
  )
})

SkeletonAvatar.displayName = 'SkeletonAvatar'

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    showImage?: boolean
    showAvatar?: boolean
  }
>(({ className, showImage = true, showAvatar = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-[var(--border-default)] p-4',
        className
      )}
      {...props}
    >
      {showImage && (
        <Skeleton
          variant="default"
          width="100%"
          height={160}
          className="mb-4"
        />
      )}
      <div className="space-y-3">
        {showAvatar && (
          <div className="flex items-center gap-3">
            <SkeletonAvatar size="sm" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" height={12} />
            </div>
          </div>
        )}
        <Skeleton variant="text" width="80%" />
        <SkeletonText lines={2} lastLineWidth="50%" />
      </div>
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard'

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  skeletonVariants,
}
