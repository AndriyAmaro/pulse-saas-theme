import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const breadcrumbsVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-1 text-xs',
      md: 'gap-1.5 text-sm',
      lg: 'gap-2 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const breadcrumbItemVariants = cva(
  'inline-flex items-center gap-1 transition-colors duration-150',
  {
    variants: {
      variant: {
        default: 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
        current: 'text-[var(--text-primary)] font-medium pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHomeIcon?: boolean
  maxItems?: number
  renderLink?: (
    item: BreadcrumbItem,
    isLast: boolean,
    children: React.ReactNode
  ) => React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      size,
      items,
      separator,
      showHomeIcon = false,
      maxItems,
      renderLink,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4.5 w-4.5' : 'h-3.5 w-3.5'

    const displayedItems = React.useMemo((): BreadcrumbItem[] => {
      if (!maxItems || items.length <= maxItems) {
        return items
      }

      const firstItem = items[0]
      if (!firstItem) return items

      const lastItems = items.slice(-(maxItems - 1))

      return [
        firstItem,
        { label: '...', href: undefined },
        ...lastItems,
      ]
    }, [items, maxItems])

    const defaultSeparator = (
      <ChevronRight
        className={cn(iconSize, 'text-[var(--text-disabled)] flex-shrink-0')}
        aria-hidden="true"
      />
    )

    const renderItem = (item: BreadcrumbItem, index: number) => {
      const isLast = index === displayedItems.length - 1
      const isEllipsis = item.label === '...'

      const content = (
        <>
          {index === 0 && showHomeIcon && (
            <Home className={iconSize} aria-hidden="true" />
          )}
          {item.icon && !showHomeIcon && item.icon}
          <span>{item.label}</span>
        </>
      )

      if (isEllipsis) {
        return (
          <span className="text-[var(--text-muted)]" aria-hidden="true">
            {content}
          </span>
        )
      }

      if (renderLink && item.href) {
        return renderLink(item, isLast, content)
      }

      if (item.href && !isLast) {
        return (
          <a
            href={item.href}
            className={cn(breadcrumbItemVariants({ variant: 'default' }))}
          >
            {content}
          </a>
        )
      }

      return (
        <span
          className={cn(
            breadcrumbItemVariants({
              variant: isLast ? 'current' : 'default',
            })
          )}
          aria-current={isLast ? 'page' : undefined}
        >
          {content}
        </span>
      )
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbsVariants({ size }), className)}
        {...props}
      >
        <ol className="flex items-center gap-inherit">
          {displayedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-inherit">
              {index > 0 && (separator || defaultSeparator)}
              {renderItem(item, index)}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export { Breadcrumbs, breadcrumbsVariants, breadcrumbItemVariants }
