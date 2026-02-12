'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ ROOT ============
const ModalRoot = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close
const ModalPortal = DialogPrimitive.Portal

// ============ OVERLAY ============
const ModalOverlay = React.forwardRef<
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
ModalOverlay.displayName = 'Modal.Overlay'

// ============ CONTENT VARIANTS ============
const modalContentVariants = cva(
  [
    'fixed z-modal bg-white dark:bg-secondary-900 shadow-xl',
    'border border-secondary-200 dark:border-secondary-700',
    'focus:outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-full rounded-xl',
    'max-h-[85vh] overflow-y-auto',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

// ============ TYPES ============
export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
  overlayClassName?: string
}

// ============ CONTENT ============
const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      className,
      children,
      size,
      showCloseButton = true,
      overlayClassName,
      ...props
    },
    ref
  ) => (
    <ModalPortal>
      <ModalOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(modalContentVariants({ size }), 'p-6', className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded-full p-1.5',
              'text-secondary-400 hover:text-secondary-600',
              'dark:text-secondary-500 dark:hover:text-secondary-300',
              'hover:bg-secondary-100 dark:hover:bg-secondary-800',
              'transition-colors duration-fast',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'dark:focus:ring-offset-secondary-900'
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  )
)
ModalContent.displayName = 'Modal.Content'

// ============ HEADER ============
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4 pr-8', className)} {...props} />
))
ModalHeader.displayName = 'Modal.Header'

// ============ TITLE ============
const ModalTitle = React.forwardRef<
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
ModalTitle.displayName = 'Modal.Title'

// ============ DESCRIPTION ============
const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'mt-1.5 text-sm text-secondary-500 dark:text-secondary-400',
      className
    )}
    {...props}
  />
))
ModalDescription.displayName = 'Modal.Description'

// ============ BODY ============
const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('py-2', className)} {...props} />
))
ModalBody.displayName = 'Modal.Body'

// ============ FOOTER ============
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-6 flex items-center justify-end gap-3', className)}
    {...props}
  />
))
ModalFooter.displayName = 'Modal.Footer'

// ============ COMPOUND EXPORT ============
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
})

// Named exports
export {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalPortal,
  ModalOverlay,
}
