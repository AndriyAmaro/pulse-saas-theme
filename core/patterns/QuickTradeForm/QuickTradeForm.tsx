'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRightLeft, Info, Wallet } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'

// ============================================================================
// QUICK TRADE FORM - Fast crypto trading form
// ============================================================================

const quickTradeFormVariants = cva(
  [
    'rounded-xl border p-5',
    'bg-white dark:bg-slate-900',
    'border-slate-200/60 dark:border-slate-700/50',
  ],
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-lg',
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

export interface CryptoOption {
  symbol: string
  name: string
  price: number
  icon?: React.ReactNode
  balance?: number
}

export interface QuickTradeFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof quickTradeFormVariants> {
  /** Available cryptocurrencies */
  cryptos: CryptoOption[]
  /** Default selected crypto */
  defaultCrypto?: string
  /** User's USD balance */
  usdBalance?: number
  /** Trading fee percentage */
  feePercent?: number
  /** On trade submit */
  onTrade?: (data: {
    type: 'buy' | 'sell'
    crypto: string
    amount: number
    total: number
  }) => void
  /** Loading state for submit */
  submitting?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

const QuickTradeForm = React.forwardRef<HTMLDivElement, QuickTradeFormProps>(
  (
    {
      className,
      variant,
      cryptos,
      defaultCrypto,
      usdBalance = 10000,
      feePercent = 0.1,
      onTrade,
      submitting = false,
      ...props
    },
    ref
  ) => {
    const [tradeType, setTradeType] = React.useState<'buy' | 'sell'>('buy')
    const [selectedCrypto, setSelectedCrypto] = React.useState(
      defaultCrypto || cryptos[0]?.symbol || 'BTC'
    )
    const [amount, setAmount] = React.useState('')
    const [inputMode, setInputMode] = React.useState<'usd' | 'crypto'>('usd')

    const currentCrypto = cryptos.find(c => c.symbol === selectedCrypto)
    const price = currentCrypto?.price || 0
    const cryptoBalance = currentCrypto?.balance || 0

    // Calculate amounts
    const numAmount = parseFloat(amount) || 0
    const cryptoAmount = inputMode === 'usd' ? numAmount / price : numAmount
    const usdAmount = inputMode === 'crypto' ? numAmount * price : numAmount
    const fee = usdAmount * (feePercent / 100)
    const total = tradeType === 'buy' ? usdAmount + fee : usdAmount - fee

    // Validation
    const maxBuy = usdBalance / (1 + feePercent / 100)
    const maxSell = cryptoBalance
    const isValid = numAmount > 0 && (
      tradeType === 'buy'
        ? usdAmount <= usdBalance
        : cryptoAmount <= cryptoBalance
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!isValid || submitting) return

      onTrade?.({
        type: tradeType,
        crypto: selectedCrypto,
        amount: cryptoAmount,
        total,
      })
    }

    const handleMax = () => {
      if (tradeType === 'buy') {
        setInputMode('usd')
        setAmount(maxBuy.toFixed(2))
      } else {
        setInputMode('crypto')
        setAmount(maxSell.toString())
      }
    }

    return (
      <div
        ref={ref}
        className={cn(quickTradeFormVariants({ variant }), className)}
        {...props}
      >
        {/* Trade Type Tabs */}
        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setTradeType('buy')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-all',
              tradeType === 'buy'
                ? 'bg-green-500 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setTradeType('sell')}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-all',
              tradeType === 'sell'
                ? 'bg-red-500 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            )}
          >
            Sell
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crypto Select */}
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">
              Cryptocurrency
            </label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 text-[var(--text-primary)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800"
            >
              {cryptos.map(crypto => (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.name} ({crypto.symbol}) - ${crypto.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">
                Amount
              </label>
              <button
                type="button"
                onClick={() => setInputMode(inputMode === 'usd' ? 'crypto' : 'usd')}
                className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600"
              >
                <ArrowRightLeft className="h-3 w-3" />
                Switch to {inputMode === 'usd' ? selectedCrypto : 'USD'}
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                {inputMode === 'usd' ? '$' : selectedCrypto}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="any"
                min="0"
                className={cn(
                  'w-full h-11 rounded-lg border bg-white pr-16 text-right text-[var(--text-primary)]',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                  'dark:bg-slate-800',
                  inputMode === 'usd' ? 'pl-7' : 'pl-12',
                  isValid || !amount
                    ? 'border-slate-200 focus:border-primary-500 dark:border-slate-700'
                    : 'border-red-300 focus:border-red-500 dark:border-red-700'
                )}
              />
              <button
                type="button"
                onClick={handleMax}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-500 hover:text-primary-600"
              >
                MAX
              </button>
            </div>

            {/* Balance Info */}
            <div className="flex items-center justify-between mt-1.5 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                Available: {tradeType === 'buy'
                  ? `$${usdBalance.toLocaleString()}`
                  : `${cryptoBalance.toLocaleString()} ${selectedCrypto}`
                }
              </span>
              {inputMode === 'usd' && cryptoAmount > 0 && (
                <span>≈ {cryptoAmount.toFixed(8)} {selectedCrypto}</span>
              )}
              {inputMode === 'crypto' && usdAmount > 0 && (
                <span>≈ ${usdAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              )}
            </div>
          </div>

          {/* Price Info */}
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">Price</span>
              <span className="text-[var(--text-primary)]">
                1 {selectedCrypto} = ${price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                Fee ({feePercent}%)
                <Info className="h-3 w-3" />
              </span>
              <span className="text-[var(--text-primary)]">
                ${fee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between font-medium">
              <span className="text-[var(--text-secondary)]">
                {tradeType === 'buy' ? 'Total Cost' : 'You Receive'}
              </span>
              <span className="text-lg text-[var(--text-primary)]">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={cn(
              'w-full',
              tradeType === 'buy'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            )}
            disabled={!isValid || submitting}
            loading={submitting}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCrypto}
          </Button>
        </form>
      </div>
    )
  }
)

QuickTradeForm.displayName = 'QuickTradeForm'

export { QuickTradeForm, quickTradeFormVariants }
