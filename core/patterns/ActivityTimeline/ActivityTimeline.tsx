'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Circle,
  type LucideIcon,
} from 'lucide-react'

const activityTimelineVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      compact: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const activityItemVariants = cva('relative flex gap-4', {
  variants: {
    variant: {
      default: 'pb-8 last:pb-0',
      compact: 'pb-4 last:pb-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const activityIconVariants = cva(
  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      type: {
        default: 'bg-[var(--bg-muted)] text-[var(--text-muted)]',
        success: 'bg-success-light text-success-dark',
        warning: 'bg-warning-light text-warning-dark',
        error: 'bg-error-light text-error-dark',
        info: 'bg-info-light text-info-dark',
      },
      variant: {
        default: 'h-8 w-8',
        compact: 'h-6 w-6',
      },
    },
    defaultVariants: {
      type: 'default',
      variant: 'default',
    },
  }
)

const activityLineVariants = cva(
  'absolute left-4 top-8 -ml-px h-[calc(100%-2rem)] w-0.5 bg-[var(--border-default)]',
  {
    variants: {
      variant: {
        default: 'left-4',
        compact: 'left-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type ActivityType = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface ActivityItem {
  id: string | number
  title: string
  description?: string
  timestamp: string | Date
  type?: ActivityType
  icon?: LucideIcon
}

export interface ActivityTimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityTimelineVariants> {
  items: ActivityItem[]
  formatTimestamp?: (timestamp: string | Date) => string
}

const defaultIcons: Record<ActivityType, LucideIcon> = {
  default: Circle,
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

const ActivityTimeline = React.forwardRef<HTMLDivElement, ActivityTimelineProps>(
  (
    {
      className,
      variant,
      items,
      formatTimestamp = (ts) =>
        formatRelativeTime(typeof ts === 'string' ? new Date(ts) : ts),
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(activityTimelineVariants({ variant }), className)}
        role="feed"
        aria-label="Activity timeline"
        {...props}
      >
        {items.map((item, index) => {
          const type = item.type || 'default'
          const Icon = item.icon || defaultIcons[type]
          const isLast = index === items.length - 1
          const iconSize = variant === 'compact' ? 14 : 16

          return (
            <article
              key={item.id}
              className={cn(activityItemVariants({ variant }))}
              aria-labelledby={`activity-title-${item.id}`}
            >
              {/* Linha conectora */}
              {!isLast && (
                <div
                  className={cn(activityLineVariants({ variant }))}
                  aria-hidden="true"
                />
              )}

              {/* Ícone */}
              <div className={cn(activityIconVariants({ type, variant }))}>
                <Icon size={iconSize} aria-hidden="true" />
              </div>

              {/* Conteúdo */}
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    id={`activity-title-${item.id}`}
                    className={cn(
                      'font-medium text-[var(--text-primary)]',
                      variant === 'compact' ? 'text-sm' : 'text-base'
                    )}
                  >
                    {item.title}
                  </h3>
                  <time
                    dateTime={
                      typeof item.timestamp === 'string'
                        ? item.timestamp
                        : item.timestamp.toISOString()
                    }
                    className={cn(
                      'shrink-0 text-[var(--text-muted)]',
                      variant === 'compact' ? 'text-xs' : 'text-sm'
                    )}
                  >
                    {formatTimestamp(item.timestamp)}
                  </time>
                </div>

                {item.description && (
                  <p
                    className={cn(
                      'mt-1 text-[var(--text-secondary)]',
                      variant === 'compact' ? 'text-xs' : 'text-sm'
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    )
  }
)

ActivityTimeline.displayName = 'ActivityTimeline'

export {
  ActivityTimeline,
  activityTimelineVariants,
  activityItemVariants,
  activityIconVariants,
  activityLineVariants,
}
