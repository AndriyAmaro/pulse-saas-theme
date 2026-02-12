'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import {
  Bell,
  Check,
  CheckCheck,
  X,
  Info,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'

const notificationCenterVariants = cva(
  'relative inline-flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const notificationItemVariants = cva(
  'flex gap-3 p-3 border-b border-[var(--border-default)] last:border-0 transition-colors cursor-pointer',
  {
    variants: {
      read: {
        true: 'bg-transparent',
        false: 'bg-primary-50/50 dark:bg-primary-900/10',
      },
    },
    defaultVariants: {
      read: false,
    },
  }
)

const iconVariants = cva(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      type: {
        default: 'bg-[var(--bg-muted)] text-[var(--text-muted)]',
        success: 'bg-success-light text-success-dark',
        warning: 'bg-warning-light text-warning-dark',
        error: 'bg-error-light text-error-dark',
        info: 'bg-info-light text-info-dark',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  }
)

export type NotificationType = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface NotificationItem {
  id: string | number
  title: string
  description?: string
  timestamp: string | Date
  type?: NotificationType
  read?: boolean
  icon?: LucideIcon
  action?: {
    label: string
    onClick: () => void
  }
}

export interface NotificationCenterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationCenterVariants> {
  notifications: NotificationItem[]
  onNotificationClick?: (notification: NotificationItem) => void
  onMarkAllRead?: () => void
  onMarkAsRead?: (id: string | number) => void
  onDismiss?: (id: string | number) => void
  formatTimestamp?: (timestamp: string | Date) => string
  emptyMessage?: string
  title?: string
}

const defaultIcons: Record<NotificationType, LucideIcon> = {
  default: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const NotificationCenter = React.forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      className,
      size,
      notifications,
      onNotificationClick,
      onMarkAllRead,
      onMarkAsRead,
      onDismiss,
      formatTimestamp = (ts) =>
        formatRelativeTime(typeof ts === 'string' ? new Date(ts) : ts),
      emptyMessage = 'No notifications',
      title = 'Notifications',
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = React.useState<'all' | 'unread'>('all')
    const [open, setOpen] = React.useState(false)

    const unreadCount = notifications.filter((n) => !n.read).length
    const filteredNotifications =
      activeTab === 'unread'
        ? notifications.filter((n) => !n.read)
        : notifications

    const bellSize = size === 'sm' ? 18 : size === 'lg' ? 22 : 20

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              className={cn(
                notificationCenterVariants({ size }),
                'rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
              )}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            >
              <Bell size={bellSize} />
              {unreadCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error-base px-1 text-[10px] font-semibold text-white"
                  aria-hidden="true"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="end"
              sideOffset={8}
              className={cn(
                'z-50 w-80 sm:w-96 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-xl',
                'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-default)] p-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {title}
                </h3>
                {unreadCount > 0 && onMarkAllRead && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[var(--border-default)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'flex-1 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                    activeTab === 'all'
                      ? 'border-b-2 border-primary-500 text-primary-500'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  )}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('unread')}
                  className={cn(
                    'flex-1 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                    activeTab === 'unread'
                      ? 'border-b-2 border-primary-500 text-primary-500'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  )}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bell
                      size={32}
                      className="mb-2 text-[var(--text-disabled)]"
                    />
                    <p className="text-sm text-[var(--text-muted)]">
                      {emptyMessage}
                    </p>
                  </div>
                ) : (
                  <ul role="list" aria-label="Notifications">
                    {filteredNotifications.map((notification) => {
                      const type = notification.type || 'default'
                      const Icon = notification.icon || defaultIcons[type]

                      return (
                        <li
                          key={notification.id}
                          className={cn(
                            notificationItemVariants({ read: notification.read }),
                            'hover:bg-[var(--bg-subtle)] group'
                          )}
                          onClick={() => {
                            onNotificationClick?.(notification)
                            if (!notification.read) {
                              onMarkAsRead?.(notification.id)
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              onNotificationClick?.(notification)
                              if (!notification.read) {
                                onMarkAsRead?.(notification.id)
                              }
                            }
                          }}
                        >
                          {/* Icon */}
                          <div className={cn(iconVariants({ type }))}>
                            <Icon size={16} />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={cn(
                                  'text-sm text-[var(--text-primary)]',
                                  !notification.read && 'font-medium'
                                )}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span
                                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500"
                                  aria-label="Unread"
                                />
                              )}
                            </div>

                            {notification.description && (
                              <p className="mt-0.5 text-xs text-[var(--text-muted)] line-clamp-2">
                                {notification.description}
                              </p>
                            )}

                            <div className="mt-1 flex items-center justify-between">
                              <time className="text-xs text-[var(--text-disabled)]">
                                {formatTimestamp(notification.timestamp)}
                              </time>

                              {notification.action && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    notification.action?.onClick()
                                  }}
                                  className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
                                >
                                  {notification.action.label}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Dismiss button */}
                          {onDismiss && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDismiss(notification.id)
                              }}
                              className="shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:opacity-100"
                              aria-label="Dismiss notification"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-[var(--border-default)] p-2">
                  <button
                    type="button"
                    className="w-full py-2 text-sm font-medium text-primary-500 hover:text-primary-600 hover:bg-[var(--bg-subtle)] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    onClick={() => setOpen(false)}
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    )
  }
)

NotificationCenter.displayName = 'NotificationCenter'

export {
  NotificationCenter,
  notificationCenterVariants,
  notificationItemVariants,
  iconVariants as notificationIconVariants,
}
