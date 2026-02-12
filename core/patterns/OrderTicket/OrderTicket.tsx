'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Clock, ChefHat, Check, AlertTriangle, Flame } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'

// ============================================================================
// ORDER TICKET - Kitchen order ticket component
// ============================================================================

const orderTicketVariants = cva(
  [
    'relative overflow-hidden rounded-lg border-2',
    'bg-white dark:bg-slate-900',
    'transition-all duration-200',
  ],
  {
    variants: {
      status: {
        pending: 'border-amber-300 dark:border-amber-600',
        preparing: 'border-blue-300 dark:border-blue-600',
        ready: 'border-green-300 dark:border-green-600',
        served: 'border-slate-200 dark:border-slate-700 opacity-60',
      },
      priority: {
        normal: '',
        high: 'ring-2 ring-red-400 ring-offset-2 dark:ring-offset-slate-900',
        rush: 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-slate-900 animate-pulse',
      },
    },
    defaultVariants: {
      status: 'pending',
      priority: 'normal',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export interface OrderItem {
  id: string
  name: string
  quantity: number
  notes?: string
  modifiers?: string[]
}

export interface KitchenOrder {
  id: string
  orderNumber: string
  tableNumber: string
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'ready' | 'served'
  priority: 'normal' | 'high' | 'rush'
  createdAt: string
  elapsedMinutes?: number
  serverName?: string
  specialInstructions?: string
}

export interface OrderTicketProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof orderTicketVariants>, 'status' | 'priority'> {
  /** Order data */
  order: KitchenOrder
  /** Callback when marking as ready */
  onMarkReady?: (orderId: string) => void
  /** Callback when starting preparation */
  onStartPreparing?: (orderId: string) => void
  /** Time threshold for urgent display (minutes) */
  urgentThreshold?: number
  /** Compact mode */
  compact?: boolean
}

// ============================================================================
// STATUS CONFIG
// ============================================================================

const statusConfig = {
  pending: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: Clock,
    label: 'Pending',
  },
  preparing: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-400',
    icon: ChefHat,
    label: 'Preparing',
  },
  ready: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    text: 'text-green-700 dark:text-green-400',
    icon: Check,
    label: 'Ready',
  },
  served: {
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    text: 'text-slate-500 dark:text-slate-400',
    icon: Check,
    label: 'Served',
  },
}

// ============================================================================
// COMPONENT
// ============================================================================

const OrderTicket = React.forwardRef<HTMLDivElement, OrderTicketProps>(
  (
    {
      className,
      order,
      onMarkReady,
      onStartPreparing,
      urgentThreshold = 20,
      compact = false,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[order.status]
    const StatusIcon = config.icon
    const isUrgent = (order.elapsedMinutes || 0) >= urgentThreshold
    const isOverdue = (order.elapsedMinutes || 0) >= urgentThreshold * 1.5

    // Format time display
    const formatTime = (minutes: number) => {
      if (minutes < 60) return `${minutes}min`
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}h ${mins}m`
    }

    return (
      <div
        ref={ref}
        className={cn(
          orderTicketVariants({ status: order.status, priority: order.priority }),
          className
        )}
        {...props}
      >
        {/* Ticket Header - Paper-style top tear */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

        {/* Priority Badge */}
        {order.priority !== 'normal' && (
          <div className={cn(
            'absolute -top-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white',
            order.priority === 'rush' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'
          )}>
            <Flame className="h-3 w-3" />
            {order.priority === 'rush' ? 'RUSH' : 'HIGH'}
          </div>
        )}

        <div className={cn('p-4', compact && 'p-3')}>
          {/* Order Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  #{order.orderNumber}
                </span>
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  config.bg,
                  config.text
                )}>
                  <StatusIcon className="h-3 w-3 inline mr-1" />
                  {config.label}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                Table {order.tableNumber}
                {order.serverName && ` • ${order.serverName}`}
              </p>
            </div>

            {/* Time Badge */}
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium',
              isOverdue
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                : isUrgent
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            )}>
              {isOverdue && <AlertTriangle className="h-4 w-4" />}
              <Clock className="h-4 w-4" />
              {formatTime(order.elapsedMinutes || 0)}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2 mb-3">
            {order.items.map(item => (
              <div
                key={item.id}
                className="flex items-start gap-2 p-2 rounded-md bg-slate-50 dark:bg-slate-800/50"
              >
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-[var(--text-primary)]">
                  {item.quantity}x
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate">
                    {item.name}
                  </p>
                  {item.modifiers && item.modifiers.length > 0 && (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {item.modifiers.join(', ')}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 italic">
                      Note: {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div className="mb-3 p-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                {order.specialInstructions}
              </p>
            </div>
          )}

          {/* Actions */}
          {order.status !== 'served' && (
            <div className="flex gap-2">
              {order.status === 'pending' && onStartPreparing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onStartPreparing(order.id)}
                >
                  <ChefHat className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
              {(order.status === 'pending' || order.status === 'preparing') && onMarkReady && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => onMarkReady(order.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Ready
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Ticket Footer - Paper-style bottom tear */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
      </div>
    )
  }
)

OrderTicket.displayName = 'OrderTicket'

// ============================================================================
// ORDER TICKET LIST COMPONENT
// ============================================================================

interface OrderTicketListProps {
  orders: KitchenOrder[]
  onMarkReady?: (orderId: string) => void
  onStartPreparing?: (orderId: string) => void
  title?: string
  emptyMessage?: string
  maxVisible?: number
}

const OrderTicketList: React.FC<OrderTicketListProps> = ({
  orders,
  onMarkReady,
  onStartPreparing,
  title = 'Kitchen Orders',
  emptyMessage = 'No orders in queue',
  maxVisible = 5,
}) => {
  const [showAll, setShowAll] = React.useState(false)
  const visibleOrders = showAll ? orders : orders.slice(0, maxVisible)
  const hasMore = orders.length > maxVisible

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <ChefHat className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-2" />
        <p className="text-sm text-[var(--text-muted)]">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {visibleOrders.map(order => (
        <OrderTicket
          key={order.id}
          order={order}
          onMarkReady={onMarkReady}
          onStartPreparing={onStartPreparing}
        />
      ))}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          {showAll ? 'Show less' : `Show ${orders.length - maxVisible} more orders`}
        </button>
      )}
    </div>
  )
}

export { OrderTicket, OrderTicketList, orderTicketVariants }
