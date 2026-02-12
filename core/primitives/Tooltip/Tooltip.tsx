'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const tooltipContentVariants = cva(
  [
    'z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-secondary-900 text-secondary-50',
          'dark:bg-secondary-50 dark:text-secondary-900',
        ],
        light: [
          'bg-[var(--bg-base)] text-[var(--text-primary)]',
          'border border-[var(--border-default)] shadow-md',
        ],
        primary: 'bg-primary-500 text-white',
        error: 'bg-error-base text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant }), className)}
    {...props}
  />
))

TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn('fill-secondary-900 dark:fill-secondary-50', className)}
    {...props}
  />
))

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

interface SimpleTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delayDuration?: number
  variant?: VariantProps<typeof tooltipContentVariants>['variant']
  asChild?: boolean
}

const SimpleTooltip = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 200,
  variant = 'default',
  asChild = true,
}: SimpleTooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} variant={variant}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  SimpleTooltip,
  tooltipContentVariants,
}
