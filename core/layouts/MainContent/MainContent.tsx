import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ VARIANTS ============

const mainContentVariants = cva(
  [
    'flex-1 overflow-y-auto',
    'bg-[var(--bg-subtle)]',
  ],
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-3 sm:p-4',
        md: 'p-4 sm:p-6',
        lg: 'p-4 sm:p-6 lg:p-8',
      },
      maxWidth: {
        none: '',
        sm: 'max-w-screen-sm mx-auto',
        md: 'max-w-screen-md mx-auto',
        lg: 'max-w-screen-lg mx-auto',
        xl: 'max-w-screen-xl mx-auto',
        '2xl': 'max-w-screen-2xl mx-auto',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      padding: 'md',
      maxWidth: 'none',
    },
  }
)

// ============ TYPES ============

export interface MainContentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mainContentVariants> {
  /** Content wrapper for max-width constraint */
  contentWrapper?: boolean
  /** Custom max-width value (overrides maxWidth variant) */
  customMaxWidth?: string
  /** Enable scroll behavior */
  scrollable?: boolean
  /** Ref to the scrollable element */
  scrollRef?: React.RefObject<HTMLDivElement>
}

// ============ MAIN COMPONENT ============

const MainContent = React.forwardRef<HTMLElement, MainContentProps>(
  (
    {
      className,
      padding,
      maxWidth,
      contentWrapper = false,
      customMaxWidth,
      scrollable = true,
      scrollRef,
      children,
      ...props
    },
    ref
  ) => {
    const content = contentWrapper ? (
      <div
        ref={scrollRef}
        className={cn(
          maxWidth !== 'none' && mainContentVariants({ maxWidth }),
          customMaxWidth && 'mx-auto'
        )}
        style={customMaxWidth ? { maxWidth: customMaxWidth } : undefined}
      >
        {children}
      </div>
    ) : (
      children
    )

    return (
      <main
        ref={ref}
        className={cn(
          mainContentVariants({ padding, maxWidth: contentWrapper ? 'none' : maxWidth }),
          !scrollable && 'overflow-hidden',
          className
        )}
        style={!contentWrapper && customMaxWidth ? { maxWidth: customMaxWidth, marginInline: 'auto' } : undefined}
        {...props}
      >
        {content}
      </main>
    )
  }
)

MainContent.displayName = 'MainContent'

// ============ EXPORTS ============

export { MainContent, mainContentVariants }
