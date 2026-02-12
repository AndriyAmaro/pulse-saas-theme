'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { LucideIcon } from 'lucide-react'

// ============================================================================
// FEATURE GRID - Features/Benefits Grid Component
// ============================================================================

const featureGridVariants = cva(
  'w-full',
  {
    variants: {
      columns: {
        '2col': 'grid grid-cols-1 md:grid-cols-2',
        '3col': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        '4col': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        alternating: 'flex flex-col',
      },
      gap: {
        sm: 'gap-4 md:gap-6',
        md: 'gap-6 md:gap-8',
        lg: 'gap-8 md:gap-10',
        xl: 'gap-10 md:gap-12',
      },
    },
    defaultVariants: {
      columns: '3col',
      gap: 'md',
    },
  }
)

const featureCardVariants = cva(
  [
    'group relative flex flex-col',
    'rounded-xl p-6 md:p-8',
    'transition-all duration-300 ease-out',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white dark:bg-slate-800/50',
          'border border-slate-200 dark:border-slate-700/50',
          'hover:border-primary-300 dark:hover:border-primary-700',
          'hover:shadow-lg hover:shadow-primary-500/5',
          'hover:-translate-y-1',
        ],
        ghost: [
          'hover:bg-slate-50 dark:hover:bg-slate-800/50',
          'hover:-translate-y-1',
        ],
        bordered: [
          'border-2 border-slate-200 dark:border-slate-700',
          'hover:border-primary-500 dark:hover:border-primary-500',
          'hover:-translate-y-1 hover:shadow-lg',
        ],
        elevated: [
          'bg-white dark:bg-slate-800',
          'shadow-md shadow-slate-200/50 dark:shadow-slate-900/50',
          'hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/80',
          'hover:-translate-y-1',
        ],
      },
      iconStyle: {
        circle: '',
        square: '',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      iconStyle: 'circle',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export interface FeatureItem {
  /** Feature icon */
  icon: LucideIcon | React.ReactNode
  /** Feature title */
  title: string
  /** Feature description */
  description: string
  /** Optional image/screenshot for with-image variant */
  image?: {
    src: string
    alt: string
  }
  /** Icon background color */
  iconColor?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'slate'
  /** Optional link */
  href?: string
  /** Optional onClick */
  onClick?: () => void
}

export interface FeatureGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureGridVariants> {
  /** Array of features to display */
  features: FeatureItem[]
  /** Card variant style */
  cardVariant?: VariantProps<typeof featureCardVariants>['variant']
  /** Icon style */
  iconStyle?: VariantProps<typeof featureCardVariants>['iconStyle']
  /** Show images with features */
  withImage?: boolean
  /** Optional section title */
  title?: string
  /** Optional section subtitle */
  subtitle?: string
  /** Optional section description */
  description?: string
  /** Center the header */
  centeredHeader?: boolean
}

// ============================================================================
// Icon Colors
// ============================================================================

const iconColorMap: Record<string, string> = {
  primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400',
  accent: 'bg-accent-100 text-accent-600 dark:bg-accent-900/50 dark:text-accent-400',
  success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
  error: 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400',
  info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
}

const topBarColorMap: Record<string, string> = {
  primary: 'from-primary-400 via-primary-500 to-primary-400 dark:from-primary-500 dark:via-primary-400 dark:to-primary-500',
  accent: 'from-accent-400 via-accent-500 to-accent-400 dark:from-accent-500 dark:via-accent-400 dark:to-accent-500',
  success: 'from-emerald-400 via-emerald-500 to-emerald-400 dark:from-emerald-500 dark:via-emerald-400 dark:to-emerald-500',
  warning: 'from-amber-400 via-amber-500 to-amber-400 dark:from-amber-500 dark:via-amber-400 dark:to-amber-500',
  error: 'from-red-400 via-red-500 to-red-400 dark:from-red-500 dark:via-red-400 dark:to-red-500',
  info: 'from-blue-400 via-blue-500 to-blue-400 dark:from-blue-500 dark:via-blue-400 dark:to-blue-500',
  slate: 'from-slate-300 via-slate-400 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600',
}

// ============================================================================
// Feature Card Component
// ============================================================================

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureCardVariants> {
  feature: FeatureItem
  withImage?: boolean
  index?: number
  isAlternating?: boolean
  isReversed?: boolean
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      variant,
      iconStyle,
      feature,
      withImage,
      index = 0,
      isAlternating,
      isReversed,
      ...props
    },
    ref
  ) => {
    const IconComponent = feature.icon
    const colorClasses = iconColorMap[feature.iconColor || 'primary']

    // Render icon — handle both function components and forwardRef components (objects with render)
    const renderIcon = () => {
      const isComponent =
        typeof IconComponent === 'function' ||
        (typeof IconComponent === 'object' && IconComponent !== null && 'render' in (IconComponent as unknown as Record<string, unknown>))

      const iconElement = isComponent ? (
        React.createElement(IconComponent as React.ElementType, { className: 'h-6 w-6' })
      ) : (
        IconComponent
      )

      if (iconStyle === 'none') {
        return <div className={cn('mb-4', colorClasses)}>{iconElement}</div>
      }

      const shapeClass =
        iconStyle === 'square' ? 'rounded-lg' : 'rounded-full'

      return (
        <div
          className={cn(
            'mb-4 inline-flex h-12 w-12 items-center justify-center',
            shapeClass,
            colorClasses,
            'transition-transform duration-300 group-hover:scale-110'
          )}
        >
          {iconElement}
        </div>
      )
    }

    const isInteractive = !!(feature.href || feature.onClick)

    // With Image variant
    if (withImage && feature.image) {
      return (
        <div
          ref={ref}
          className={cn(
            'group grid gap-8 md:gap-12 py-8 md:py-12',
            isAlternating && 'md:grid-cols-2 items-center',
            isAlternating && (isReversed ? 'md:flex-row-reverse' : ''),
            !isAlternating && 'items-start',
            className
          )}
          {...props}
        >
          {/* Content */}
          <div
            className={cn(
              'flex flex-col',
              isAlternating && isReversed && 'md:order-2'
            )}
          >
            {renderIcon()}
            <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Image */}
          <div
            className={cn(
              'relative overflow-hidden rounded-xl',
              'border border-slate-200 dark:border-slate-700',
              'shadow-lg transition-all duration-500',
              'group-hover:shadow-xl group-hover:scale-[1.02]',
              isAlternating && isReversed && 'md:order-1'
            )}
          >
            <img
              src={feature.image.src}
              alt={feature.image.alt}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      )
    }

    // Standard card
    const topBarClasses = topBarColorMap[feature.iconColor || 'primary']

    return (
      <div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={feature.onClick}
        onKeyDown={isInteractive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            feature.onClick?.()
          }
        } : undefined}
        className={cn(
          featureCardVariants({ variant, iconStyle }),
          isInteractive && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {/* Top accent bar */}
        <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', topBarClasses)} />

        {renderIcon()}

        <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
          {feature.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {feature.description}
        </p>

        {/* Hover decoration */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-0.5',
            'bg-gradient-to-r from-transparent via-primary-500 to-transparent',
            'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          )}
        />
      </div>
    )
  }
)
FeatureCard.displayName = 'FeatureCard'

// ============================================================================
// Feature Grid Header
// ============================================================================

interface FeatureGridHeaderProps {
  title?: string
  subtitle?: string
  description?: string
  centered?: boolean
}

const FeatureGridHeader = ({
  title,
  subtitle,
  description,
  centered,
}: FeatureGridHeaderProps) => {
  if (!title && !subtitle && !description) return null

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center mx-auto max-w-3xl'
      )}
    >
      {subtitle && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// Main Feature Grid Component
// ============================================================================

const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  (
    {
      className,
      columns = '3col',
      gap = 'md',
      features,
      cardVariant = 'default',
      iconStyle = 'circle',
      withImage = false,
      title,
      subtitle,
      description,
      centeredHeader = true,
      ...props
    },
    ref
  ) => {
    const isAlternating = columns === 'alternating'

    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeatureGridHeader
            title={title}
            subtitle={subtitle}
            description={description}
            centered={centeredHeader}
          />

          <div className={cn(featureGridVariants({ columns, gap }))}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                variant={cardVariant}
                iconStyle={iconStyle}
                withImage={withImage || isAlternating}
                index={index}
                isAlternating={isAlternating}
                isReversed={isAlternating && index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
)
FeatureGrid.displayName = 'FeatureGrid'

// ============================================================================
// Exports
// ============================================================================

export { FeatureGrid, FeatureCard, featureGridVariants, featureCardVariants }
