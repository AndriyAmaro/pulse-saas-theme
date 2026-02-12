'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { Button } from '@core/primitives/Button'

// ============================================================================
// CRYPTO CARD - Card for displaying cryptocurrency information
// ============================================================================

const cryptoCardVariants = cva(
  [
    'rounded-xl border p-5',
    'bg-white dark:bg-slate-900',
    'border-slate-200/60 dark:border-slate-700/50',
    'transition-all duration-300',
    'hover:shadow-lg hover:scale-[1.02]',
    'dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]',
  ],
  {
    variants: {
      variant: {
        default: '',
        bitcoin: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900',
        ethereum: 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-900',
        positive: 'border-green-200/50 dark:border-green-800/30',
        negative: 'border-red-200/50 dark:border-red-800/30',
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

export interface CryptoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cryptoCardVariants> {
  /** Cryptocurrency name */
  name: string
  /** Cryptocurrency symbol (e.g., BTC, ETH) */
  symbol: string
  /** Current price in USD */
  price: number
  /** Price change percentage (24h) */
  change: number
  /** Icon/logo for the crypto */
  icon?: React.ReactNode
  /** Icon background color */
  iconBg?: string
  /** Sparkline data (24h price history) */
  sparklineData?: number[]
  /** User holdings amount */
  holdings?: number
  /** Holdings value in USD */
  holdingsValue?: number
  /** Show trade button */
  showTradeButton?: boolean
  /** Trade button click handler */
  onTrade?: () => void
  /** Loading state */
  loading?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

const CryptoCard = React.forwardRef<HTMLDivElement, CryptoCardProps>(
  (
    {
      className,
      variant,
      name,
      symbol,
      price,
      change,
      icon,
      iconBg = 'bg-slate-100 dark:bg-slate-800',
      sparklineData,
      holdings,
      holdingsValue,
      showTradeButton = true,
      onTrade,
      loading = false,
      ...props
    },
    ref
  ) => {
    const isPositive = change >= 0
    const TrendIcon = isPositive ? TrendingUp : TrendingDown
    const ArrowIcon = isPositive ? ArrowUpRight : ArrowDownRight

    // Auto-detect variant based on symbol if not provided
    const autoVariant = variant ||
      (symbol === 'BTC' ? 'bitcoin' :
       symbol === 'ETH' ? 'ethereum' :
       isPositive ? 'positive' : 'negative')

    const formatPrice = (value: number) => {
      if (value >= 1000) {
        return value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      })
    }

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(cryptoCardVariants({ variant: autoVariant }), className)}
          {...props}
        >
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
            <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(cryptoCardVariants({ variant: autoVariant }), className)}
        {...props}
      >
        {/* Header: Icon + Name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                iconBg
              )}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{name}</h3>
              <span className="text-sm text-[var(--text-muted)]">{symbol}</span>
            </div>
          </div>

          {/* Change Badge */}
          <div className={cn(
            'flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium',
            isPositive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          )}>
            <ArrowIcon className="h-3.5 w-3.5" />
            <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4">
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {formatPrice(price)}
          </p>
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4">
            <SparklineChart
              data={sparklineData}
              type="area"
              color={isPositive ? '#22C55E' : '#EF4444'}
              width={200}
              height={48}
              gradient
              animated
              curve="smooth"
            />
          </div>
        )}

        {/* Holdings */}
        {holdings !== undefined && holdingsValue !== undefined && (
          <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-muted)]">Holdings</p>
                <p className="font-medium text-[var(--text-primary)]">
                  {holdings.toLocaleString('en-US', { maximumFractionDigits: 8 })} {symbol}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-muted)]">Value</p>
                <p className="font-medium text-[var(--text-primary)]">
                  {formatPrice(holdingsValue)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trade Button */}
        {showTradeButton && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={onTrade}
          >
            Trade {symbol}
          </Button>
        )}
      </div>
    )
  }
)

CryptoCard.displayName = 'CryptoCard'

export { CryptoCard, cryptoCardVariants }
