'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Bell, BellOff, Check, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'

// ============================================================================
// PRICE ALERT CARD - Manage crypto price alerts
// ============================================================================

const priceAlertCardVariants = cva(
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

export interface PriceAlert {
  id: string
  crypto: string
  symbol: string
  condition: 'above' | 'below'
  targetPrice: number
  currentPrice?: number
  status: 'active' | 'triggered' | 'disabled'
  createdAt?: string
  icon?: React.ReactNode
}

export interface PriceAlertCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceAlertCardVariants> {
  /** List of price alerts */
  alerts: PriceAlert[]
  /** Title for the card */
  title?: string
  /** Maximum alerts to show before "Show more" */
  maxVisible?: number
  /** Show add alert button */
  showAddButton?: boolean
  /** Callback when add alert is clicked */
  onAddAlert?: () => void
  /** Callback when an alert is deleted */
  onDeleteAlert?: (id: string) => void
  /** Callback when an alert is toggled */
  onToggleAlert?: (id: string) => void
  /** Loading state */
  loading?: boolean
}

// ============================================================================
// ALERT ITEM COMPONENT
// ============================================================================

interface AlertItemProps {
  alert: PriceAlert
  onDelete?: (id: string) => void
  onToggle?: (id: string) => void
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onDelete, onToggle }) => {
  const isAbove = alert.condition === 'above'
  const ConditionIcon = isAbove ? TrendingUp : TrendingDown

  const getStatusStyles = () => {
    switch (alert.status) {
      case 'triggered':
        return 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800/50'
      case 'disabled':
        return 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700/50 opacity-60'
      default:
        return 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700/50'
    }
  }

  const getStatusIcon = () => {
    switch (alert.status) {
      case 'triggered':
        return <Check className="h-4 w-4 text-green-500" />
      case 'disabled':
        return <BellOff className="h-4 w-4 text-slate-400" />
      default:
        return <Bell className="h-4 w-4 text-amber-500 animate-pulse" />
    }
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-lg border p-3 transition-all duration-200',
        getStatusStyles(),
        alert.status !== 'disabled' && 'hover:shadow-sm'
      )}
    >
      {/* Icon */}
      {alert.icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          {alert.icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--text-primary)]">{alert.symbol}</span>
          <span className={cn(
            'flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded',
            isAbove
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          )}>
            <ConditionIcon className="h-3 w-3" />
            {isAbove ? 'above' : 'below'}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">
            ${alert.targetPrice.toLocaleString()}
          </span>
        </div>
        {alert.currentPrice && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Current: ${alert.currentPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        {getStatusIcon()}

        {/* Actions (visible on hover) */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onToggle && (
            <button
              onClick={() => onToggle(alert.id)}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={alert.status === 'disabled' ? 'Enable alert' : 'Disable alert'}
            >
              {alert.status === 'disabled' ? (
                <Bell className="h-4 w-4 text-slate-500" />
              ) : (
                <BellOff className="h-4 w-4 text-slate-500" />
              )}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(alert.id)}
              className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              title="Delete alert"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PriceAlertCard = React.forwardRef<HTMLDivElement, PriceAlertCardProps>(
  (
    {
      className,
      variant,
      alerts,
      title = 'Price Alerts',
      maxVisible = 5,
      showAddButton = true,
      onAddAlert,
      onDeleteAlert,
      onToggleAlert,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [showAll, setShowAll] = React.useState(false)

    const visibleAlerts = showAll ? alerts : alerts.slice(0, maxVisible)
    const hasMore = alerts.length > maxVisible

    const activeCount = alerts.filter(a => a.status === 'active').length
    const triggeredCount = alerts.filter(a => a.status === 'triggered').length

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(priceAlertCardVariants({ variant }), className)}
          {...props}
        >
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(priceAlertCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {activeCount} active, {triggeredCount} triggered
            </p>
          </div>
          {showAddButton && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={onAddAlert}
            >
              Add Alert
            </Button>
          )}
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm text-[var(--text-muted)]">No price alerts set</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Create an alert to get notified when prices change
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleAlerts.map(alert => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onDelete={onDeleteAlert}
                onToggle={onToggleAlert}
              />
            ))}
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            {showAll ? 'Show less' : `Show ${alerts.length - maxVisible} more`}
          </button>
        )}
      </div>
    )
  }
)

PriceAlertCard.displayName = 'PriceAlertCard'

export { PriceAlertCard, priceAlertCardVariants, AlertItem }
