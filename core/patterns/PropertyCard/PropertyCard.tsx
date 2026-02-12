'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Home,
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Clock,
  Eye,
  Edit,
  Building2,
  Trees,
  Warehouse
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const propertyCardVariants = cva(
  [
    'group relative overflow-hidden rounded-xl border',
    'bg-white dark:bg-slate-900',
    'border-slate-200 dark:border-slate-700',
    'transition-all duration-300',
    'hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/5',
    'hover:-translate-y-1',
  ],
  {
    variants: {
      variant: {
        default: '',
        featured: 'ring-2 ring-amber-400 dark:ring-amber-500',
        compact: 'flex flex-row',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const statusBadgeVariants = cva(
  'absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full shadow-lg',
  {
    variants: {
      status: {
        'for-sale': 'bg-blue-500 text-white',
        'for-rent': 'bg-purple-500 text-white',
        'under-contract': 'bg-amber-500 text-white',
        sold: 'bg-green-500 text-white',
        'off-market': 'bg-slate-500 text-white',
      },
    },
    defaultVariants: {
      status: 'for-sale',
    },
  }
)

export type PropertyStatus = 'for-sale' | 'for-rent' | 'under-contract' | 'sold' | 'off-market'
export type PropertyType = 'house' | 'apartment' | 'condo' | 'land' | 'commercial'

export interface PropertyCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof propertyCardVariants> {
  image?: string
  status: PropertyStatus
  price: number
  address: string
  city: string
  type: PropertyType
  beds: number
  baths: number
  sqft: number
  daysOnMarket?: number
  isFavorite?: boolean
  onFavoriteClick?: () => void
  onViewClick?: () => void
  onEditClick?: () => void
  featured?: boolean
}

const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  }
  return `$${(price / 1000).toFixed(0)}K`
}

const formatPriceFull = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const statusLabels: Record<PropertyStatus, string> = {
  'for-sale': 'For Sale',
  'for-rent': 'For Rent',
  'under-contract': 'Under Contract',
  sold: 'Sold',
  'off-market': 'Off Market',
}

const typeIcons: Record<PropertyType, React.ElementType> = {
  house: Home,
  apartment: Building2,
  condo: Building2,
  land: Trees,
  commercial: Warehouse,
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      variant,
      size,
      image,
      status,
      price,
      address,
      city,
      type,
      beds,
      baths,
      sqft,
      daysOnMarket,
      isFavorite = false,
      onFavoriteClick,
      onViewClick,
      onEditClick,
      featured = false,
      ...props
    },
    ref
  ) => {
    const TypeIcon = typeIcons[type]

    return (
      <div
        ref={ref}
        className={cn(
          propertyCardVariants({ variant: featured ? 'featured' : variant, size }),
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-slate-800">
          {image ? (
            <img
              src={image}
              alt={address}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <TypeIcon className="h-16 w-16 text-amber-300 dark:text-amber-600" />
            </div>
          )}

          {/* Status Badge */}
          <span className={cn(statusBadgeVariants({ status }))}>
            {statusLabels[status]}
          </span>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavoriteClick?.()
            }}
            className={cn(
              'absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200',
              'bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm',
              'hover:bg-white dark:hover:bg-slate-700',
              'hover:scale-110',
              isFavorite && 'text-red-500'
            )}
          >
            <Heart
              className={cn('h-5 w-5', isFavorite && 'fill-current')}
            />
          </button>

          {/* Days on Market Badge */}
          {daysOnMarket !== undefined && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
              <Clock className="h-3 w-3" />
              <span>{daysOnMarket} days</span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onViewClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewClick()
                }}
                className="p-3 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:scale-110 transition-all"
              >
                <Eye className="h-5 w-5" />
              </button>
            )}
            {onEditClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEditClick()
                }}
                className="p-3 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:scale-110 transition-all"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {formatPriceFull(price)}
            </span>
            {status === 'for-rent' && (
              <span className="text-sm text-slate-500 dark:text-slate-400">/month</span>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
              {address}
            </h3>
            <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              {city}
            </p>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Bed className="h-4 w-4 text-slate-400" />
              <span>{beds} bed{beds !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Bath className="h-4 w-4 text-slate-400" />
              <span>{baths} bath{baths !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Square className="h-4 w-4 text-slate-400" />
              <span>{sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Property Type Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <TypeIcon className="h-3.5 w-3.5" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

PropertyCard.displayName = 'PropertyCard'

export { PropertyCard, propertyCardVariants, statusBadgeVariants }
