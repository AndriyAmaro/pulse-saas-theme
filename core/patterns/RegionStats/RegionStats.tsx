'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { ChevronDown, ChevronUp } from 'lucide-react'

const regionStatsVariants = cva('w-full', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const regionItemVariants = cva(
  'flex items-center gap-3 py-2 border-b border-[var(--border-default)] last:border-0',
  {
    variants: {
      size: {
        sm: 'py-1.5 gap-2',
        md: 'py-2 gap-3',
        lg: 'py-3 gap-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const progressBarVariants = cva(
  'h-1.5 rounded-full bg-primary-500 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary-500',
        gradient: 'bg-gradient-to-r from-primary-500 to-accent-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface RegionItem {
  id: string | number
  name: string
  flag?: string
  value: number
  percentage?: number
}

export interface RegionStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof regionStatsVariants> {
  items: RegionItem[]
  maxVisible?: number
  showMoreLabel?: string
  showLessLabel?: string
  sortable?: boolean
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (direction: 'asc' | 'desc') => void
  formatValue?: (value: number) => string
  progressVariant?: 'default' | 'gradient'
}

const RegionStats = React.forwardRef<HTMLDivElement, RegionStatsProps>(
  (
    {
      className,
      size,
      items,
      maxVisible = 5,
      showMoreLabel = 'Show more',
      showLessLabel = 'Show less',
      sortable = true,
      sortDirection: controlledSortDirection,
      onSortChange,
      formatValue = (v) => v.toLocaleString(),
      progressVariant = 'default',
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false)
    const [internalSortDirection, setInternalSortDirection] = React.useState<'asc' | 'desc'>('desc')

    const sortDirection = controlledSortDirection ?? internalSortDirection

    const maxValue = React.useMemo(
      () => Math.max(...items.map((item) => item.value), 1),
      [items]
    )

    const sortedItems = React.useMemo(() => {
      const sorted = [...items].sort((a, b) => {
        return sortDirection === 'desc' ? b.value - a.value : a.value - b.value
      })
      return sorted
    }, [items, sortDirection])

    const visibleItems = expanded
      ? sortedItems
      : sortedItems.slice(0, maxVisible)

    const hasMore = items.length > maxVisible

    const handleSortToggle = () => {
      const newDirection = sortDirection === 'desc' ? 'asc' : 'desc'
      if (onSortChange) {
        onSortChange(newDirection)
      } else {
        setInternalSortDirection(newDirection)
      }
    }

    const textSizes = {
      sm: { name: 'text-xs', value: 'text-xs', percent: 'text-xs' },
      md: { name: 'text-sm', value: 'text-sm', percent: 'text-xs' },
      lg: { name: 'text-base', value: 'text-base', percent: 'text-sm' },
    }

    const currentSizes = textSizes[size || 'md']

    return (
      <div
        ref={ref}
        className={cn(regionStatsVariants({ size }), className)}
        {...props}
      >
        {/* Header com sort toggle */}
        {sortable && (
          <div className="mb-2 flex items-center justify-end">
            <button
              type="button"
              onClick={handleSortToggle}
              className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
              aria-label={`Sort by value ${sortDirection === 'desc' ? 'ascending' : 'descending'}`}
            >
              Sort by value
              {sortDirection === 'desc' ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronUp size={14} />
              )}
            </button>
          </div>
        )}

        {/* Lista de regiões */}
        <ul role="list" aria-label="Region statistics">
          {visibleItems.map((item) => {
            const percentage = item.percentage ?? (item.value / maxValue) * 100

            return (
              <li
                key={item.id}
                className={cn(regionItemVariants({ size }))}
              >
                {/* Flag + Nome */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {item.flag && (
                    <span
                      className="text-lg shrink-0"
                      role="img"
                      aria-label={`${item.name} flag`}
                    >
                      {item.flag}
                    </span>
                  )}
                  <span
                    className={cn(
                      'font-medium text-[var(--text-primary)] truncate',
                      currentSizes.name
                    )}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Barra de progresso */}
                <div className="w-24 sm:w-32 shrink-0">
                  <div className="h-1.5 w-full rounded-full bg-[var(--bg-muted)]">
                    <div
                      className={cn(progressBarVariants({ variant: progressVariant }))}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                      role="progressbar"
                      aria-valuenow={item.value}
                      aria-valuemin={0}
                      aria-valuemax={maxValue}
                    />
                  </div>
                </div>

                {/* Valor + Porcentagem */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      'font-semibold text-[var(--text-primary)] tabular-nums',
                      currentSizes.value
                    )}
                  >
                    {formatValue(item.value)}
                  </span>
                  <span
                    className={cn(
                      'text-[var(--text-muted)] tabular-nums',
                      currentSizes.percent
                    )}
                  >
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Show more/less button */}
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 w-full py-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            aria-expanded={expanded}
          >
            {expanded ? showLessLabel : `${showMoreLabel} (${items.length - maxVisible})`}
          </button>
        )}
      </div>
    )
  }
)

RegionStats.displayName = 'RegionStats'

export { RegionStats, regionStatsVariants, regionItemVariants, progressBarVariants }
