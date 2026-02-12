import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ VARIANTS ============

const dashboardGridVariants = cva(
  [
    'grid w-full',
  ],
  {
    variants: {
      preset: {
        '1col': 'grid-cols-1',
        '2col': 'grid-cols-1 md:grid-cols-2',
        '3col': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        '4col': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        'sidebar-content': 'grid-cols-1 lg:grid-cols-[320px_1fr]',
        'content-sidebar': 'grid-cols-1 lg:grid-cols-[1fr_320px]',
        'responsive': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        custom: '',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      rowGap: {
        none: 'gap-y-0',
        sm: 'gap-y-3',
        md: 'gap-y-4',
        lg: 'gap-y-6',
        xl: 'gap-y-8',
      },
      colGap: {
        none: 'gap-x-0',
        sm: 'gap-x-3',
        md: 'gap-x-4',
        lg: 'gap-x-6',
        xl: 'gap-x-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
    },
    defaultVariants: {
      preset: '3col',
      gap: 'lg',
      align: 'stretch',
    },
  }
)

const dashboardGridItemVariants = cva('', {
  variants: {
    colspan: {
      1: 'col-span-1',
      2: 'col-span-1 md:col-span-2',
      3: 'col-span-1 md:col-span-2 lg:col-span-3',
      4: 'col-span-1 sm:col-span-2 lg:col-span-4',
      full: 'col-span-full',
    },
    rowspan: {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3',
      auto: 'row-span-auto',
    },
  },
  defaultVariants: {
    colspan: 1,
    rowspan: 1,
  },
})

// ============ TYPES ============

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {
  /** Custom grid template columns (for preset="custom") */
  customColumns?: string
  /** Custom grid template rows */
  customRows?: string
  /** Responsive breakpoints for custom grid */
  responsive?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export interface DashboardGridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridItemVariants> {
  /** Custom col-span class */
  customColspan?: string
  /** Custom row-span class */
  customRowspan?: string
}

// ============ SUB-COMPONENTS ============

const DashboardGridItem = React.forwardRef<HTMLDivElement, DashboardGridItemProps>(
  (
    {
      className,
      colspan,
      rowspan,
      customColspan,
      customRowspan,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          dashboardGridItemVariants({ colspan, rowspan }),
          customColspan,
          customRowspan,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DashboardGridItem.displayName = 'DashboardGrid.Item'

// ============ ROW COMPONENT ============

interface DashboardGridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: VariantProps<typeof dashboardGridVariants>['gap']
}

const DashboardGridRow = React.forwardRef<HTMLDivElement, DashboardGridRowProps>(
  ({ className, gap = 'lg', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          dashboardGridVariants({ gap }),
          'col-span-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DashboardGridRow.displayName = 'DashboardGrid.Row'

// ============ SECTION COMPONENT ============

interface DashboardGridSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
}

const DashboardGridSection = React.forwardRef<HTMLDivElement, DashboardGridSectionProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('col-span-full space-y-4', className)}
        {...props}
      >
        {(title || actions) && (
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-[var(--text-muted)]">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    )
  }
)

DashboardGridSection.displayName = 'DashboardGrid.Section'

// ============ MAIN COMPONENT ============

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  (
    {
      className,
      preset,
      gap,
      rowGap,
      colGap,
      align,
      customColumns,
      customRows,
      responsive,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customStyle: React.CSSProperties = {
      ...style,
      ...(customColumns && { gridTemplateColumns: customColumns }),
      ...(customRows && { gridTemplateRows: customRows }),
    }

    // Generate responsive classes if provided
    const responsiveClasses = responsive
      ? Object.entries(responsive)
          .map(([breakpoint, cols]) => {
            const prefix = breakpoint === 'sm' ? '' : `${breakpoint}:`
            return `${prefix}grid-cols-[${cols}]`
          })
          .join(' ')
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          dashboardGridVariants({
            preset: customColumns ? 'custom' : preset,
            gap: rowGap || colGap ? undefined : gap,
            rowGap: rowGap,
            colGap: colGap,
            align,
          }),
          responsiveClasses,
          className
        )}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DashboardGrid.displayName = 'DashboardGrid'

// ============ COMPOUND EXPORT ============

export const DashboardGridComponent = Object.assign(DashboardGrid, {
  Item: DashboardGridItem,
  Row: DashboardGridRow,
  Section: DashboardGridSection,
})

export {
  DashboardGrid,
  DashboardGridItem,
  DashboardGridRow,
  DashboardGridSection,
  dashboardGridVariants,
  dashboardGridItemVariants,
}
