import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ CARD VARIANTS ============
const cardVariants = cva(
  [
    'rounded-xl border',
    'bg-white dark:bg-slate-900',
    'text-slate-900 dark:text-slate-100',
    'border-teal-200/30 dark:border-teal-800/50',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-[0_2px_8px_-2px_rgba(20,184,154,0.08)] hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.12)] dark:shadow-[0_2px_8px_-2px_rgba(20,184,154,0.15)] dark:hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.25)]',
        outline: 'shadow-none bg-transparent dark:bg-transparent border-secondary-200 dark:border-secondary-700',
        ghost: 'border-transparent bg-transparent shadow-none',
        elevated: 'shadow-[0_4px_12px_-2px_rgba(20,184,154,0.1)] hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.15)] dark:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.2)] dark:hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.3)]',
        interactive: 'shadow-[0_2px_8px_-2px_rgba(20,184,154,0.08)] hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.15)] hover:border-primary-200 dark:hover:border-primary-600 cursor-pointer',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  }
)

const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4 pb-0',
      md: 'p-6 pb-0',
      lg: 'p-8 pb-0',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
})

const cardContentVariants = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4 pt-4',
      md: 'p-6 pt-4',
      lg: 'p-8 pt-6',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
})

const cardFooterVariants = cva('flex items-center', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4 pt-0',
      md: 'p-6 pt-0',
      lg: 'p-8 pt-0',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    padding: 'md',
    justify: 'start',
  },
})

// ============ TYPES ============
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

// ============ CARD ROOT ============
const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
)
CardRoot.displayName = 'Card'

// ============ CARD HEADER ============
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ padding }), className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'Card.Header'

// ============ CARD TITLE ============
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', children, ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        '[color:var(--text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
)
CardTitle.displayName = 'Card.Title'

// ============ CARD DESCRIPTION ============
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm [color:var(--text-muted)]',
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'Card.Description'

// ============ CARD CONTENT ============
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ padding }), className)}
      {...props}
    />
  )
)
CardContent.displayName = 'Card.Content'

// ============ CARD FOOTER ============
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ padding, justify }), className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'Card.Footer'

// ============ COMPOUND EXPORT ============
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

// Named exports for individual usage
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
