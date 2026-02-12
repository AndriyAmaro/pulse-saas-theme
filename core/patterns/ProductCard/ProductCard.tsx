'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { RatingStars } from '../RatingStars'
import { Badge } from '@core/primitives/Badge'

const productCardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'hover:shadow-lg hover:border-[var(--border-muted)]',
        elevated:
          'shadow-md hover:shadow-xl hover:border-[var(--border-muted)]',
        outline:
          'border-2 hover:border-primary-500',
      },
      size: {
        sm: 'max-w-[220px]',
        md: 'max-w-[280px]',
        lg: 'max-w-[340px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const imageContainerVariants = cva(
  'relative overflow-hidden bg-[var(--bg-subtle)]',
  {
    variants: {
      size: {
        sm: 'h-32',
        md: 'h-44',
        lg: 'h-56',
        full: 'h-48',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const badgeVariants = cva('absolute z-10', {
  variants: {
    position: {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
    },
  },
  defaultVariants: {
    position: 'top-left',
  },
})

export type ProductBadge = 'sale' | 'new' | 'bestseller' | 'sold-out'

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  name: string
  price: number
  originalPrice?: number
  currency?: string
  image?: string
  imageAlt?: string
  rating?: number
  reviewCount?: number
  badge?: ProductBadge
  inStock?: boolean
  onAddToCart?: () => void
  onWishlist?: () => void
  onQuickView?: () => void
  isWishlisted?: boolean
  formatPrice?: (price: number, currency: string) => string
}

const badgeConfig: Record<
  ProductBadge,
  { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'primary' }
> = {
  sale: { label: 'Sale', variant: 'error' },
  new: { label: 'New', variant: 'success' },
  bestseller: { label: 'Best Seller', variant: 'primary' },
  'sold-out': { label: 'Sold Out', variant: 'warning' },
}

const defaultFormatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      variant,
      size,
      name,
      price,
      originalPrice,
      currency = 'USD',
      image,
      imageAlt,
      rating,
      reviewCount,
      badge,
      inStock = true,
      onAddToCart,
      onWishlist,
      onQuickView,
      isWishlisted = false,
      formatPrice = defaultFormatPrice,
      ...props
    },
    ref
  ) => {
    const discount =
      originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null

    const showBadge = badge || (discount && discount >= 10)
    const badgeToShow = badge || (discount && discount >= 10 ? 'sale' : null)

    return (
      <article
        ref={ref}
        className={cn(productCardVariants({ variant, size }), className)}
        aria-label={`Product: ${name}`}
        {...props}
      >
        {/* Image Container */}
        <div className={cn(imageContainerVariants({ size }))}>
          {/* Badge */}
          {showBadge && badgeToShow && (
            <div className={cn(badgeVariants({ position: 'top-left' }))}>
              <Badge variant={badgeConfig[badgeToShow].variant} size="sm">
                {badgeConfig[badgeToShow].label}
                {badgeToShow === 'sale' && discount && ` -${discount}%`}
              </Badge>
            </div>
          )}

          {/* Action buttons (appear on hover) */}
          <div
            className="absolute right-2 top-2 z-10 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-label="Product actions"
          >
            {onWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onWishlist()
                }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-base)] shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isWishlisted
                    ? 'text-error-base'
                    : 'text-[var(--text-muted)] hover:text-error-base'
                )}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWishlisted}
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            )}
            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickView()
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-base)] text-[var(--text-muted)] shadow-md transition-colors hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </button>
            )}
          </div>

          {/* Image */}
          {image ? (
            <img
              src={image}
              alt={imageAlt || name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-[var(--text-disabled)]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            </div>
          )}

          {/* Out of stock overlay */}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-base)]/80">
              <span className="text-sm font-semibold text-[var(--text-muted)]">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 mb-1">
            {name}
          </h3>

          {/* Rating */}
          {rating !== undefined && (
            <div className="mb-2 flex items-center gap-1">
              <RatingStars
                value={rating}
                size="sm"
                readonly
                showValue={false}
              />
              {reviewCount !== undefined && (
                <span className="text-xs text-[var(--text-muted)]">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-lg font-bold text-[var(--text-primary)]">
              {formatPrice(price, currency)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-[var(--text-muted)] line-through">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart()
              }}
              disabled={!inStock}
              className={cn(
                'mt-3 flex w-full items-center justify-center rounded-lg py-2.5 px-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                inStock
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-[var(--bg-muted)] text-[var(--text-disabled)] cursor-not-allowed'
              )}
              aria-disabled={!inStock}
            >
              <ShoppingCart size={16} className="mr-2 flex-shrink-0" />
              <span className="text-center">{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          )}
        </div>
      </article>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export { ProductCard, productCardVariants, imageContainerVariants }
