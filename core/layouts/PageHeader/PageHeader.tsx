import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Breadcrumbs, type BreadcrumbItem } from '@core/patterns/Breadcrumbs'

// ============ VARIANTS ============

const pageHeaderVariants = cva(
  [
    'flex flex-col gap-4',
    'pb-6',
  ],
  {
    variants: {
      border: {
        true: 'border-b border-[var(--border-default)]',
        false: '',
      },
      spacing: {
        sm: 'mb-4',
        md: 'mb-6',
        lg: 'mb-8',
        none: '',
      },
    },
    defaultVariants: {
      border: false,
      spacing: 'md',
    },
  }
)

// ============ TYPES ============

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  /** Page title */
  title: string
  /** Page description */
  description?: string
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[]
  /** Custom breadcrumbs render function for Next.js Link */
  renderBreadcrumbLink?: (
    item: BreadcrumbItem,
    isLast: boolean,
    children: React.ReactNode
  ) => React.ReactNode
  /** Actions slot (buttons, etc.) */
  actions?: React.ReactNode
  /** Tabs slot (for pages with tabs) */
  tabs?: React.ReactNode
  /** Back button or custom left element */
  backElement?: React.ReactNode
  /** Title prefix element (icon, badge, etc.) */
  titlePrefix?: React.ReactNode
  /** Title suffix element (badge, status, etc.) */
  titleSuffix?: React.ReactNode
}

// ============ SUB-COMPONENTS ============

interface PageHeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3'
}

const PageHeaderTitle = React.forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ className, as: Tag = 'h1', children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

PageHeaderTitle.displayName = 'PageHeader.Title'

interface PageHeaderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  PageHeaderDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm lg:text-base text-[var(--text-muted)] max-w-2xl',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})

PageHeaderDescription.displayName = 'PageHeader.Description'

interface PageHeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageHeaderActions = React.forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 flex-wrap', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PageHeaderActions.displayName = 'PageHeader.Actions'

interface PageHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageHeaderTabs = React.forwardRef<HTMLDivElement, PageHeaderTabsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 -mb-6 border-b border-[var(--border-default)]', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PageHeaderTabs.displayName = 'PageHeader.Tabs'

// ============ MAIN COMPONENT ============

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      border,
      spacing,
      title,
      description,
      breadcrumbs,
      renderBreadcrumbLink,
      actions,
      tabs,
      backElement,
      titlePrefix,
      titleSuffix,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ border, spacing }), className)}
        {...props}
      >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            size="sm"
            renderLink={renderBreadcrumbLink}
          />
        )}

        {/* Main Row: Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Back Element */}
            {backElement && <div className="mb-2">{backElement}</div>}

            {/* Title */}
            <div className="flex items-center gap-3 flex-wrap">
              {titlePrefix}
              <PageHeaderTitle>{title}</PageHeaderTitle>
              {titleSuffix}
            </div>

            {/* Description */}
            {description && (
              <PageHeaderDescription className="mt-1">
                {description}
              </PageHeaderDescription>
            )}
          </div>

          {/* Actions */}
          {actions && <PageHeaderActions>{actions}</PageHeaderActions>}
        </div>

        {/* Tabs */}
        {tabs && <PageHeaderTabs>{tabs}</PageHeaderTabs>}

        {/* Custom children */}
        {children}
      </div>
    )
  }
)

PageHeader.displayName = 'PageHeader'

// ============ COMPOUND EXPORT ============

export const PageHeaderComponent = Object.assign(PageHeader, {
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Actions: PageHeaderActions,
  Tabs: PageHeaderTabs,
})

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderTabs,
  pageHeaderVariants,
}
