'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ ROOT ============
const DrawerRoot = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close
const DrawerPortal = DialogPrimitive.Portal

// ============ OVERLAY ============
const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-modal bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = 'Drawer.Overlay'

// ============ CONTENT VARIANTS ============
const drawerContentVariants = cva(
  [
    'fixed z-modal bg-white dark:bg-secondary-900',
    'border-secondary-200 dark:border-secondary-700',
    'shadow-xl focus:outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
    'flex flex-col',
  ],
  {
    variants: {
      side: {
        right: [
          'right-0 top-0 h-full border-l',
          'data-[state=open]:slide-in-from-right',
          'data-[state=closed]:slide-out-to-right',
        ],
        left: [
          'left-0 top-0 h-full border-r',
          'data-[state=open]:slide-in-from-left',
          'data-[state=closed]:slide-out-to-left',
        ],
        top: [
          'top-0 left-0 w-full border-b',
          'data-[state=open]:slide-in-from-top',
          'data-[state=closed]:slide-out-to-top',
        ],
        bottom: [
          'bottom-0 left-0 w-full border-t',
          'data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:slide-out-to-bottom',
        ],
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // Right side sizes (max-w-[92vw] prevents mobile overflow)
      { side: 'right', size: 'sm', className: 'w-80 max-w-[92vw]' },
      { side: 'right', size: 'md', className: 'w-96 max-w-[92vw]' },
      { side: 'right', size: 'lg', className: 'w-[480px] max-w-[92vw]' },
      { side: 'right', size: 'xl', className: 'w-[640px] max-w-[92vw]' },
      { side: 'right', size: 'full', className: 'w-screen' },
      // Left side sizes
      { side: 'left', size: 'sm', className: 'w-80 max-w-[92vw]' },
      { side: 'left', size: 'md', className: 'w-96 max-w-[92vw]' },
      { side: 'left', size: 'lg', className: 'w-[480px] max-w-[92vw]' },
      { side: 'left', size: 'xl', className: 'w-[640px] max-w-[92vw]' },
      { side: 'left', size: 'full', className: 'w-screen' },
      // Top side sizes
      { side: 'top', size: 'sm', className: 'h-40' },
      { side: 'top', size: 'md', className: 'h-60' },
      { side: 'top', size: 'lg', className: 'h-80' },
      { side: 'top', size: 'xl', className: 'h-96' },
      { side: 'top', size: 'full', className: 'h-screen' },
      // Bottom side sizes
      { side: 'bottom', size: 'sm', className: 'h-40' },
      { side: 'bottom', size: 'md', className: 'h-60' },
      { side: 'bottom', size: 'lg', className: 'h-80' },
      { side: 'bottom', size: 'xl', className: 'h-96' },
      { side: 'bottom', size: 'full', className: 'h-screen' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
)

// ============ TYPES ============
export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerContentVariants> {
  showCloseButton?: boolean
  overlayClassName?: string
}

// ============ CONTENT ============
const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    {
      className,
      children,
      side,
      size,
      showCloseButton = true,
      overlayClassName,
      ...props
    },
    ref
  ) => (
    <DrawerPortal>
      <DrawerOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerContentVariants({ side, size }), className)}
        {...props}
      >
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded-full p-1.5',
              'text-secondary-400 hover:text-secondary-600',
              'dark:text-secondary-500 dark:hover:text-secondary-300',
              'hover:bg-secondary-100 dark:hover:bg-secondary-800',
              'transition-colors duration-fast',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'dark:focus:ring-offset-secondary-900',
              'z-10'
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
)
DrawerContent.displayName = 'Drawer.Content'

// ============ HEADER ============
const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 p-6 pb-0 pr-12',
      'border-b border-secondary-200 dark:border-secondary-700 pb-4',
      className
    )}
    {...props}
  />
))
DrawerHeader.displayName = 'Drawer.Header'

// ============ TITLE ============
const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-secondary-900 dark:text-white',
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = 'Drawer.Title'

// ============ DESCRIPTION ============
const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-secondary-500 dark:text-secondary-400',
      className
    )}
    {...props}
  />
))
DrawerDescription.displayName = 'Drawer.Description'

// ============ BODY ============
const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto p-6', className)}
    {...props}
  />
))
DrawerBody.displayName = 'Drawer.Body'

// ============ FOOTER ============
const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-end gap-3 p-6 pt-0',
      'border-t border-secondary-200 dark:border-secondary-700 pt-4',
      className
    )}
    {...props}
  />
))
DrawerFooter.displayName = 'Drawer.Footer'

// ============ COMPOUND EXPORT ============
export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
})

// Alias for Sheet
export const Sheet = Drawer

// Named exports
export {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
}
