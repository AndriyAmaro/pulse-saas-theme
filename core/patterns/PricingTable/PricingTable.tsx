'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Check, X, Sparkles } from 'lucide-react'

// ============================================================================
// CVA Variants
// ============================================================================

const pricingTableVariants = cva(
  'grid gap-6',
  {
    variants: {
      columns: {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
)

const pricingCardVariants = cva(
  'relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ease-out',
  {
    variants: {
      popular: {
        true: [
          'bg-white dark:bg-slate-900',
          'border-primary-300/80 dark:border-primary-700/60',
          'shadow-xl shadow-primary-500/10 dark:shadow-primary-900/30',
          'ring-1 ring-primary-500/20',
          'scale-[1.02] lg:scale-105',
        ],
        false: [
          'bg-white dark:bg-slate-900/80',
          'border-slate-200 dark:border-slate-800',
          'hover:border-slate-300 dark:hover:border-slate-700',
          'hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50',
          'hover:-translate-y-1',
        ],
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      popular: false,
      size: 'md',
    },
  }
)

const pricingToggleVariants = cva(
  'relative flex items-center rounded-full bg-[var(--bg-muted)] p-1',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const toggleButtonVariants = cva(
  'relative z-10 rounded-full px-4 py-2 font-medium transition-colors',
  {
    variants: {
      active: {
        true: 'text-[var(--text-primary)]',
        false: 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

const featureItemVariants = cva(
  'flex items-start gap-3 py-2 text-sm',
  {
    variants: {
      included: {
        true: 'text-[var(--text-primary)]',
        false: 'text-[var(--text-muted)] line-through',
      },
    },
    defaultVariants: {
      included: true,
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export type BillingPeriod = 'monthly' | 'yearly'

export interface PricingFeature {
  text: string
  included: boolean
  tooltip?: string
}

export interface PricingPlan {
  id: string
  name: string
  description?: string
  price: {
    monthly: number
    yearly: number
  }
  features: PricingFeature[]
  cta: string
  ctaVariant?: 'primary' | 'outline' | 'ghost'
  popular?: boolean
  badge?: string
  disabled?: boolean
}

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingTableVariants> {
  plans: PricingPlan[]
  billingPeriod?: BillingPeriod
  onBillingPeriodChange?: (period: BillingPeriod) => void
  onPlanSelect?: (plan: PricingPlan) => void
  showToggle?: boolean
  yearlyDiscount?: number
  currency?: string
  currencySymbol?: string
}

export interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingCardVariants> {
  plan: PricingPlan
  billingPeriod: BillingPeriod
  onSelect?: () => void
  yearlyDiscount?: number
  currency?: string
  currencySymbol?: string
}

export interface PricingToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof pricingToggleVariants> {
  value: BillingPeriod
  onChange?: (value: BillingPeriod) => void
  yearlyDiscount?: number
}

// ============================================================================
// Sub Components
// ============================================================================

// Pricing Toggle Component
const PricingToggle = React.forwardRef<HTMLDivElement, PricingToggleProps>(
  ({ className, size, value, onChange, yearlyDiscount = 20, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          ref={ref}
          className={cn(pricingToggleVariants({ size }), className)}
          role="radiogroup"
          aria-label="Billing period"
          {...props}
        >
          {/* Sliding indicator */}
          <div
            className={cn(
              'absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-[var(--bg-base)] shadow-sm transition-transform duration-200',
              value === 'yearly' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
            )}
          />

          <button
            onClick={() => onChange?.('monthly')}
            className={cn(toggleButtonVariants({ active: value === 'monthly' }))}
            role="radio"
            aria-checked={value === 'monthly'}
          >
            Monthly
          </button>
          <button
            onClick={() => onChange?.('yearly')}
            className={cn(toggleButtonVariants({ active: value === 'yearly' }))}
            role="radio"
            aria-checked={value === 'yearly'}
          >
            Yearly
          </button>
        </div>

        {yearlyDiscount > 0 && (
          <Badge variant="success" size="sm">
            Save {yearlyDiscount}% with yearly billing
          </Badge>
        )}
      </div>
    )
  }
)

PricingToggle.displayName = 'PricingToggle'

// Pricing Card Component
const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      popular,
      size,
      plan,
      billingPeriod,
      onSelect,
      yearlyDiscount = 20,
      currencySymbol = '$',
      ...props
    },
    ref
  ) => {
    const price =
      billingPeriod === 'yearly'
        ? plan.price.yearly
        : plan.price.monthly

    const originalYearlyPrice = plan.price.monthly * 12
    const savings = originalYearlyPrice - plan.price.yearly * 12

    const includedFeatures = plan.features.filter((f) => f.included)
    const excludedFeatures = plan.features.filter((f) => !f.included)

    return (
      <div
        ref={ref}
        className={cn(pricingCardVariants({ popular: plan.popular, size }), className)}
        {...props}
      >
        {/* Top accent bar */}
        <div className={cn(
          'h-1 w-full',
          plan.popular
            ? 'bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 dark:from-primary-500 dark:via-accent-500 dark:to-primary-500'
            : 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700'
        )} />

        {/* Card content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Popular Badge */}
          {plan.popular && (
            <div className="flex justify-center mb-4">
              <div className="relative p-px rounded-full bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 dark:from-primary-500 dark:via-accent-400 dark:to-primary-500">
                <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-white dark:bg-slate-900">
                  <Sparkles className="h-3.5 w-3.5 text-primary-500" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                    {plan.badge || 'Most Popular'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Plan Header */}
          <div className={cn('text-center', plan.popular ? 'mb-5' : 'mb-6 mt-2')}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {plan.name}
            </h3>
            {plan.description && (
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {plan.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-medium text-slate-400 dark:text-slate-500">
                {currencySymbol}
              </span>
              <span className={cn(
                'text-5xl font-extrabold tracking-tight',
                plan.popular
                  ? 'bg-gradient-to-br from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent'
                  : 'text-slate-900 dark:text-white'
              )}>
                {price}
              </span>
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500 ml-0.5">
                /{billingPeriod === 'yearly' ? 'yr' : 'mo'}
              </span>
            </div>

            {billingPeriod === 'yearly' && savings > 0 && (
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Save {currencySymbol}{savings}/year
                </span>
              </div>
            )}

            {billingPeriod === 'monthly' && (
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                billed monthly
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onSelect}
            disabled={plan.disabled}
            variant={plan.popular ? 'primary' : (plan.ctaVariant || 'outline')}
            className={cn(
              'mb-6 w-full font-semibold',
              plan.popular && 'shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30'
            )}
          >
            {plan.cta}
          </Button>

          {/* Features */}
          <div className="flex-1 space-y-0 border-t border-slate-100 dark:border-slate-800 pt-5">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              What&apos;s included
            </p>

            {/* Included Features */}
            {includedFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 py-1.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <Check
                    size={12}
                    className="text-emerald-500 dark:text-emerald-400"
                    strokeWidth={3}
                  />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}

            {/* Excluded Features */}
            {excludedFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 py-1.5 text-sm text-slate-300 dark:text-slate-600 line-through"
              >
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                  <X
                    size={12}
                    className="text-slate-300 dark:text-slate-600"
                    strokeWidth={3}
                  />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

PricingCard.displayName = 'PricingCard'

// ============================================================================
// Main PricingTable Component
// ============================================================================

const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  (
    {
      className,
      columns,
      plans,
      billingPeriod = 'monthly',
      onBillingPeriodChange,
      onPlanSelect,
      showToggle = true,
      yearlyDiscount = 20,
      currency = 'USD',
      currencySymbol = '$',
      ...props
    },
    ref
  ) => {
    const [period, setPeriod] = React.useState<BillingPeriod>(billingPeriod)

    React.useEffect(() => {
      setPeriod(billingPeriod)
    }, [billingPeriod])

    const handlePeriodChange = (newPeriod: BillingPeriod) => {
      setPeriod(newPeriod)
      onBillingPeriodChange?.(newPeriod)
    }

    // Determine columns based on number of plans if not specified
    const gridColumns = columns || (plans.length <= 2 ? 2 : plans.length <= 3 ? 3 : 4)

    return (
      <div className="w-full">
        {/* Billing Toggle */}
        {showToggle && (
          <div className="mb-10 flex justify-center">
            <PricingToggle
              value={period}
              onChange={handlePeriodChange}
              yearlyDiscount={yearlyDiscount}
            />
          </div>
        )}

        {/* Pricing Cards */}
        <div
          ref={ref}
          className={cn(pricingTableVariants({ columns: gridColumns as 2 | 3 | 4 }), className)}
          role="list"
          aria-label="Pricing plans"
          {...props}
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={period}
              onSelect={() => onPlanSelect?.(plan)}
              yearlyDiscount={yearlyDiscount}
              currencySymbol={currencySymbol}
              role="listitem"
            />
          ))}
        </div>
      </div>
    )
  }
)

PricingTable.displayName = 'PricingTable'

export {
  PricingTable,
  PricingCard,
  PricingToggle,
  pricingTableVariants,
  pricingCardVariants,
  pricingToggleVariants,
  toggleButtonVariants,
  featureItemVariants,
}
