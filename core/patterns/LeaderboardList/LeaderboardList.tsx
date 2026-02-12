'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Avatar } from '@core/primitives/Avatar'
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Crown, Star } from 'lucide-react'

// ============================================================================
// LEADERBOARD LIST - Ranking/leaderboard component
// ============================================================================

const leaderboardListVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      compact: '',
      card: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// ============================================================================
// TYPES
// ============================================================================

export interface LeaderboardItem {
  id: string | number
  rank: number
  name: string
  avatar?: string
  value: number | string
  change?: number
  previousRank?: number
  isCurrentUser?: boolean
  metadata?: Record<string, unknown>
}

export interface LeaderboardListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardListVariants> {
  /** Leaderboard items */
  items: LeaderboardItem[]
  /** Value formatter */
  valueFormatter?: (value: number | string) => string
  /** Show change indicator */
  showChange?: boolean
  /** Show rank medals for top 3 */
  showMedals?: boolean
  /** Use emoji medals instead of icons */
  emojiMedals?: boolean
  /** Current user ID to highlight */
  currentUserId?: string | number
  /** Item click handler */
  onItemClick?: (item: LeaderboardItem) => void
  /** Max items to show (rest collapsed) */
  maxVisible?: number
  /** Show expand/collapse for more items */
  expandable?: boolean
  /** Animate rank changes */
  animated?: boolean
  /** Custom rank badge renderer */
  renderRankBadge?: (rank: number) => React.ReactNode
  /** Custom value renderer */
  renderValue?: (item: LeaderboardItem) => React.ReactNode
  /** Header title */
  title?: string
  /** Header subtitle */
  subtitle?: string
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface RankBadgeProps {
  rank: number
  showMedals: boolean
  emojiMedals: boolean
  customRenderer?: (rank: number) => React.ReactNode
}

const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  showMedals,
  emojiMedals,
  customRenderer,
}) => {
  if (customRenderer) {
    return <>{customRenderer(rank)}</>
  }

  if (showMedals && rank <= 3) {
    if (emojiMedals) {
      const emojis = ['🥇', '🥈', '🥉']
      return <span className="text-xl">{emojis[rank - 1]}</span>
    }

    const colors = {
      1: 'text-yellow-500',
      2: 'text-gray-400',
      3: 'text-amber-600',
    }

    const icons = {
      1: Crown,
      2: Medal,
      3: Medal,
    }

    const Icon = icons[rank as 1 | 2 | 3]

    return (
      <div className={cn('flex h-8 w-8 items-center justify-center', colors[rank as 1 | 2 | 3])}>
        <Icon className="h-5 w-5" />
      </div>
    )
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center text-sm font-medium text-secondary-500 dark:text-secondary-400">
      #{rank}
    </div>
  )
}

interface ChangeIndicatorProps {
  change?: number
  previousRank?: number
  currentRank: number
}

const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  change,
  previousRank,
  currentRank,
}) => {
  // Calculate change from previousRank if not provided
  const actualChange = change ?? (previousRank ? previousRank - currentRank : 0)

  if (actualChange === 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-secondary-400">
        <Minus className="h-3 w-3" />
      </span>
    )
  }

  if (actualChange > 0) {
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 dark:text-green-400">
        <TrendingUp className="h-3 w-3" />
        +{actualChange}
      </span>
    )
  }

  return (
    <span className="flex items-center gap-0.5 text-xs font-medium text-red-600 dark:text-red-400">
      <TrendingDown className="h-3 w-3" />
      {actualChange}
    </span>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================

const LeaderboardList = React.forwardRef<HTMLDivElement, LeaderboardListProps>(
  (
    {
      className,
      variant = 'default',
      items,
      valueFormatter,
      showChange = true,
      showMedals = true,
      emojiMedals = false,
      currentUserId,
      onItemClick,
      maxVisible = 10,
      expandable = true,
      animated = true,
      renderRankBadge,
      renderValue,
      title,
      subtitle,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    // Sort items by rank
    const sortedItems = React.useMemo(
      () => [...items].sort((a, b) => a.rank - b.rank),
      [items]
    )

    const visibleItems = isExpanded
      ? sortedItems
      : sortedItems.slice(0, maxVisible)

    const hasMore = sortedItems.length > maxVisible

    const formatValue = (value: number | string): string => {
      if (valueFormatter) {
        return valueFormatter(value)
      }
      if (typeof value === 'number') {
        return value.toLocaleString()
      }
      return value
    }

    const isCompact = variant === 'compact'
    const isCard = variant === 'card'

    return (
      <div
        ref={ref}
        className={cn(
          leaderboardListVariants({ variant }),
          isCard && 'rounded-lg border border-secondary-200 bg-white p-4 dark:border-secondary-700 dark:bg-secondary-900',
          className
        )}
        {...props}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                <Trophy className="h-5 w-5 text-primary-500" />
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* List */}
        <div className="space-y-1">
          {visibleItems.map((item, index) => {
            const isCurrentUser = item.isCurrentUser || item.id === currentUserId
            const isTop3 = item.rank <= 3

            return (
              <div
                key={item.id}
                className={cn(
                  'group flex items-center gap-3 rounded-lg p-2 transition-all',
                  animated && 'duration-200',
                  onItemClick && 'cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-800',
                  isCurrentUser && 'bg-primary-50 ring-1 ring-primary-200 dark:bg-primary-900/20 dark:ring-primary-800',
                  isTop3 && !isCurrentUser && 'bg-secondary-50 dark:bg-secondary-800/50',
                  isCompact && 'p-1.5'
                )}
                onClick={() => onItemClick?.(item)}
                style={
                  animated
                    ? {
                        animationDelay: `${index * 50}ms`,
                        animation: 'leaderboard-item-in 0.3s ease-out forwards',
                        opacity: 0,
                        transform: 'translateX(-10px)',
                      }
                    : undefined
                }
              >
                {/* Rank Badge */}
                <RankBadge
                  rank={item.rank}
                  showMedals={showMedals}
                  emojiMedals={emojiMedals}
                  customRenderer={renderRankBadge}
                />

                {/* Avatar */}
                <Avatar
                  src={item.avatar}
                  alt={item.name}
                  size={isCompact ? 'sm' : 'md'}
                  fallback={item.name.substring(0, 2).toUpperCase()}
                />

                {/* Name and "You" indicator */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'truncate font-medium text-secondary-900 dark:text-secondary-100',
                        isCompact && 'text-sm'
                      )}
                    >
                      {item.name}
                    </span>
                    {isCurrentUser && (
                      <span className="shrink-0 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        You
                      </span>
                    )}
                  </div>
                </div>

                {/* Value */}
                <div className="flex items-center gap-3">
                  {showChange && (
                    <ChangeIndicator
                      change={item.change}
                      previousRank={item.previousRank}
                      currentRank={item.rank}
                    />
                  )}

                  <div
                    className={cn(
                      'min-w-[60px] text-right font-semibold text-secondary-900 dark:text-secondary-100',
                      isCompact && 'text-sm',
                      isTop3 && 'text-primary-600 dark:text-primary-400'
                    )}
                  >
                    {renderValue ? renderValue(item) : formatValue(item.value)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Expand/Collapse button */}
        {expandable && hasMore && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 w-full rounded-lg border border-secondary-200 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-800"
          >
            {isExpanded ? 'Show less' : `Show ${sortedItems.length - maxVisible} more`}
          </button>
        )}

        {/* Animation styles */}
        <style jsx>{`
          @keyframes leaderboard-item-in {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    )
  }
)

LeaderboardList.displayName = 'LeaderboardList'

export { LeaderboardList, leaderboardListVariants }
