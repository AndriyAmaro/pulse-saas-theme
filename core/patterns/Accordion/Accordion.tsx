'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'divide-y divide-[var(--border-default)]',
      bordered: 'border border-[var(--border-default)] rounded-lg divide-y divide-[var(--border-default)] overflow-hidden',
      separated: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: '',
      separated: 'border border-[var(--border-default)] rounded-lg overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const accordionTriggerVariants = cva(
  [
    'flex flex-1 items-center justify-between py-4 text-left font-medium',
    'transition-all duration-150',
    'hover:text-[var(--text-primary)]',
    '[&[data-state=open]>svg]:rotate-180',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm px-3',
        md: 'text-base px-4',
        lg: 'text-lg px-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const accordionContentVariants = cva(
  [
    'overflow-hidden text-[var(--text-secondary)]',
    'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

type AccordionVariant = 'default' | 'bordered' | 'separated'
type AccordionSize = 'sm' | 'md' | 'lg'

interface AccordionContextValue {
  variant: AccordionVariant
  size: AccordionSize
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: 'default',
  size: 'md',
})

const useAccordionContext = () => React.useContext(AccordionContext)

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants> & {
    size?: AccordionSize
  }

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'default', size = 'md', ...props }, ref) => (
  <AccordionContext.Provider value={{ variant: variant || 'default', size: size || 'md' }}>
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    />
  </AccordionContext.Provider>
))
Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = useAccordionContext()
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
})
AccordionItem.displayName = 'AccordionItem'

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  hideChevron?: boolean
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, hideChevron = false, ...props }, ref) => {
  const { size } = useAccordionContext()
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ size }), className)}
        {...props}
      >
        {children}
        {!hideChevron && (
          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { size } = useAccordionContext()
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(accordionContentVariants({ size }), className)}
      {...props}
    >
      <div className={cn('pb-4', size === 'sm' ? 'px-3' : size === 'lg' ? 'px-5' : 'px-4')}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = 'AccordionContent'

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  accordionTriggerVariants,
  accordionContentVariants,
}
export type { AccordionProps, AccordionTriggerProps }
