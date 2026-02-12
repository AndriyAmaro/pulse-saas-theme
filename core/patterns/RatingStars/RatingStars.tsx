'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Star } from 'lucide-react'

const ratingStarsVariants = cva('inline-flex items-center gap-1', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const starSizes = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
}

const valueSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}

export interface RatingStarsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingStarsVariants> {
  value: number
  max?: number
  readonly?: boolean
  showValue?: boolean
  precision?: 'full' | 'half'
  onChange?: (value: number) => void
  emptyColor?: string
  filledColor?: string
  hoverColor?: string
}

const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  (
    {
      className,
      size = 'md',
      value,
      max = 5,
      readonly = false,
      showValue = true,
      precision = 'half',
      onChange,
      emptyColor,
      filledColor,
      hoverColor,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const starSize = starSizes[size || 'md']
    const valueSize = valueSizes[size || 'md']

    const displayValue = hoverValue !== null ? hoverValue : value

    const handleClick = (starIndex: number, isHalf: boolean) => {
      if (readonly || !onChange) return

      let newValue: number
      if (precision === 'half' && isHalf) {
        newValue = starIndex + 0.5
      } else {
        newValue = starIndex + 1
      }

      onChange(newValue)
    }

    const handleMouseMove = (
      e: React.MouseEvent<HTMLButtonElement>,
      starIndex: number
    ) => {
      if (readonly) return

      const rect = e.currentTarget.getBoundingClientRect()
      const isHalf = precision === 'half' && e.clientX < rect.left + rect.width / 2

      setHoverValue(isHalf ? starIndex + 0.5 : starIndex + 1)
    }

    const handleMouseLeave = () => {
      if (readonly) return
      setHoverValue(null)
    }

    const renderStar = (index: number) => {
      const filled = displayValue >= index + 1
      const halfFilled =
        precision === 'half' &&
        !filled &&
        displayValue >= index + 0.5 &&
        displayValue < index + 1

      const isHovered = hoverValue !== null && hoverValue >= index + 0.5

      return (
        <button
          key={index}
          type="button"
          className={cn(
            'relative inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm',
            readonly ? 'cursor-default' : 'cursor-pointer'
          )}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const isHalf =
              precision === 'half' && e.clientX < rect.left + rect.width / 2
            handleClick(index, isHalf)
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          aria-label={`Rate ${index + 1} out of ${max}`}
          tabIndex={readonly ? -1 : 0}
        >
          {/* Empty star (background) */}
          <Star
            size={starSize}
            className={cn(
              'transition-colors duration-150',
              emptyColor || 'text-[var(--border-default)]'
            )}
            fill="currentColor"
          />

          {/* Filled star (overlay) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: filled ? '100%' : halfFilled ? '50%' : '0%',
            }}
          >
            <Star
              size={starSize}
              className={cn(
                'transition-colors duration-150',
                isHovered && !readonly
                  ? hoverColor || 'text-accent-400'
                  : filledColor || 'text-accent-500'
              )}
              fill="currentColor"
            />
          </div>
        </button>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(ratingStarsVariants({ size }), className)}
        role="group"
        aria-label={`Rating: ${value} out of ${max} stars`}
        {...props}
      >
        <div
          className="inline-flex items-center gap-0.5"
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: max }, (_, i) => renderStar(i))}
        </div>

        {showValue && (
          <span
            className={cn(
              'ml-1.5 font-medium text-[var(--text-primary)]',
              valueSize
            )}
            aria-hidden="true"
          >
            {value.toFixed(1)}
          </span>
        )}
      </div>
    )
  }
)

RatingStars.displayName = 'RatingStars'

export { RatingStars, ratingStarsVariants }
