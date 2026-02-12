'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Users, Clock, Calendar, DollarSign } from 'lucide-react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// TABLE GRID - Restaurant table layout visualization
// ============================================================================

const tableGridVariants = cva(
  [
    'rounded-xl border p-5',
    'bg-white dark:bg-slate-900',
    'border-slate-200/60 dark:border-slate-700/50',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'paying' | 'closed'

export interface RestaurantTable {
  id: string
  number: string
  seats: number
  status: TableStatus
  /** Time occupied (for occupied status) */
  occupiedTime?: string
  /** Reservation time (for reserved status) */
  reservationTime?: string
  /** Guest name for reservation */
  guestName?: string
  /** Current guests count */
  guestCount?: number
  /** Current order total */
  orderTotal?: number
  /** Position in grid (optional for custom layouts) */
  gridPosition?: { row: number; col: number }
  /** Table size variant */
  size?: 'small' | 'medium' | 'large'
}

export interface TableGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableGridVariants> {
  /** Array of tables */
  tables: RestaurantTable[]
  /** Grid columns */
  columns?: number
  /** On table click */
  onTableClick?: (table: RestaurantTable) => void
  /** Show legend */
  showLegend?: boolean
  /** Title */
  title?: string
}

// ============================================================================
// STATUS CONFIG
// ============================================================================

const statusConfig: Record<TableStatus, {
  bg: string
  border: string
  text: string
  icon: string
  label: string
}> = {
  available: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-300 dark:border-green-700',
    text: 'text-green-700 dark:text-green-400',
    icon: '🟢',
    label: 'Available',
  },
  occupied: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-300 dark:border-red-700',
    text: 'text-red-700 dark:text-red-400',
    icon: '🔴',
    label: 'Occupied',
  },
  reserved: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    border: 'border-amber-300 dark:border-amber-700',
    text: 'text-amber-700 dark:text-amber-400',
    icon: '🟡',
    label: 'Reserved',
  },
  paying: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-700 dark:text-blue-400',
    icon: '🔵',
    label: 'Paying',
  },
  closed: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-300 dark:border-slate-600',
    text: 'text-slate-500 dark:text-slate-400',
    icon: '⚫',
    label: 'Closed',
  },
}

// ============================================================================
// TABLE CARD COMPONENT
// ============================================================================

interface TableCardProps {
  table: RestaurantTable
  onClick?: () => void
}

const TableCard: React.FC<TableCardProps> = ({ table, onClick }) => {
  const config = statusConfig[table.status]
  const sizeClass = table.size === 'large'
    ? 'col-span-2 row-span-2'
    : table.size === 'medium'
      ? 'col-span-2'
      : ''

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center justify-center rounded-xl border-2 p-3 transition-all duration-200',
        config.bg,
        config.border,
        table.status !== 'closed' && 'hover:scale-105 hover:shadow-lg cursor-pointer',
        table.status === 'closed' && 'opacity-60 cursor-not-allowed',
        sizeClass
      )}
    >
      {/* Table Number */}
      <span className={cn('text-xl font-bold', config.text)}>
        {table.number}
      </span>

      {/* Seats Indicator */}
      <div className="flex items-center gap-1 mt-1">
        <Users className={cn('h-3 w-3', config.text)} />
        <span className={cn('text-xs font-medium', config.text)}>
          {table.guestCount !== undefined
            ? `${table.guestCount}/${table.seats}`
            : table.seats}
        </span>
      </div>

      {/* Status Info */}
      {table.status === 'occupied' && table.occupiedTime && (
        <div className={cn(
          'flex items-center gap-1 mt-1.5 text-xs',
          config.text,
          parseInt(table.occupiedTime) > 60 && 'animate-pulse'
        )}>
          <Clock className="h-3 w-3" />
          {table.occupiedTime}
        </div>
      )}

      {table.status === 'reserved' && table.reservationTime && (
        <div className={cn('flex items-center gap-1 mt-1.5 text-xs', config.text)}>
          <Calendar className="h-3 w-3" />
          {table.reservationTime}
        </div>
      )}

      {table.status === 'paying' && table.orderTotal !== undefined && (
        <div className={cn('flex items-center gap-1 mt-1.5 text-xs font-medium', config.text)}>
          <DollarSign className="h-3 w-3" />
          ${table.orderTotal.toFixed(2)}
        </div>
      )}

      {/* Guest Name for Reservation */}
      {table.status === 'reserved' && table.guestName && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-[10px] text-[var(--text-muted)] bg-white dark:bg-slate-900 px-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {table.guestName}
        </span>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/20 transition-colors" />
    </button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TableGrid = React.forwardRef<HTMLDivElement, TableGridProps>(
  (
    {
      className,
      variant,
      tables,
      columns = 4,
      onTableClick,
      showLegend = true,
      title = 'Table Layout',
      ...props
    },
    ref
  ) => {
    // Calculate stats
    const stats = {
      available: tables.filter(t => t.status === 'available').length,
      occupied: tables.filter(t => t.status === 'occupied').length,
      reserved: tables.filter(t => t.status === 'reserved').length,
      paying: tables.filter(t => t.status === 'paying').length,
      closed: tables.filter(t => t.status === 'closed').length,
    }

    const totalGuests = tables.reduce((acc, t) => acc + (t.guestCount || 0), 0)
    const totalSeats = tables.reduce((acc, t) => acc + (t.status !== 'closed' ? t.seats : 0), 0)

    return (
      <div
        ref={ref}
        className={cn(tableGridVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {totalGuests}/{totalSeats} seats occupied • {stats.available} tables available
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              stats.available > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {stats.available} free
            </span>
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {tables.map(table => (
            <TableCard
              key={table.id}
              table={table}
              onClick={() => onTableClick?.(table)}
            />
          ))}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
            {Object.entries(statusConfig).map(([status, config]) => (
              <div key={status} className="flex items-center gap-1.5 text-xs">
                <span>{config.icon}</span>
                <span className="text-[var(--text-muted)]">{config.label}</span>
                <span className="font-medium text-[var(--text-secondary)]">
                  ({stats[status as TableStatus]})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

TableGrid.displayName = 'TableGrid'

export { TableGrid, tableGridVariants, TableCard, statusConfig }
