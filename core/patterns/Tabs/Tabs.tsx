'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const tabsListVariants = cva(
  'inline-flex items-center justify-start',
  {
    variants: {
      variant: {
        default: [
          'gap-1 rounded-lg bg-[var(--bg-muted)] p-1',
        ],
        underline: [
          'gap-4 border-b border-[var(--border-default)]',
        ],
        pills: [
          'gap-2',
        ],
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap font-medium',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-md px-3 py-1.5',
          'text-[var(--text-muted)]',
          'hover:text-[var(--text-primary)]',
          'data-[state=active]:bg-[var(--bg-base)] data-[state=active]:text-[var(--text-primary)]',
          'data-[state=active]:shadow-sm',
        ],
        underline: [
          'px-1 pb-3 border-b-2 border-transparent -mb-px',
          'text-[var(--text-muted)]',
          'hover:text-[var(--text-primary)] hover:border-[var(--secondary-300)]',
          'data-[state=active]:border-primary-500 data-[state=active]:text-primary-500',
        ],
        pills: [
          'rounded-full px-4 py-2',
          'text-[var(--text-muted)] bg-transparent',
          'hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
          'data-[state=active]:bg-primary-500 data-[state=active]:text-white',
        ],
      },
      size: {
        sm: 'text-xs h-7',
        md: 'text-sm h-9',
        lg: 'text-base h-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const tabsContentVariants = cva(
  [
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'mt-2 text-sm',
        md: 'mt-3 text-base',
        lg: 'mt-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

type TabsVariant = 'default' | 'underline' | 'pills'
type TabsSize = 'sm' | 'md' | 'lg'

interface TabsContextValue {
  variant: TabsVariant
  size: TabsSize
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'default',
  size: 'md',
})

const useTabsContext = () => React.useContext(TabsContext)

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant
  size?: TabsSize
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = 'default', size = 'md', children, ...props }, ref) => (
  <TabsContext.Provider value={{ variant, size }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  </TabsContext.Provider>
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant, size } = useTabsContext()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
})
TabsList.displayName = 'TabsList'

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, leftIcon, rightIcon, children, ...props }, ref) => {
  const { variant, size } = useTabsContext()
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { size } = useTabsContext()
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(tabsContentVariants({ size }), className)}
      {...props}
    />
  )
})
TabsContent.displayName = 'TabsContent'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
}
export type { TabsProps, TabsTriggerProps }
