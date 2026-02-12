'use client'

import * as React from 'react'
import { cn } from '@shared/utils/cn'
import { Star } from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

export interface Testimonial {
  id: string
  quote: string
  author: {
    name: string
    role: string
    company: string
    avatar?: string
  }
  rating?: number
}

export interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  columns?: 2 | 3 | 4
  cardVariant?: 'default' | 'bordered' | 'glass'
}

// ============================================================================
// TestimonialCard
// ============================================================================

function TestimonialCard({
  testimonial,
  variant = 'default',
  className,
}: {
  testimonial: Testimonial
  variant?: 'default' | 'bordered' | 'glass'
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative p-6 rounded-2xl transition-all duration-300',
        variant === 'default' && 'bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/40 shadow-sm hover:shadow-md',
        variant === 'bordered' && 'bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700',
        variant === 'glass' && 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/20 dark:border-slate-700/30',
        className,
      )}
    >
      {/* Rating */}
      {testimonial.rating && (
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
          {testimonial.author.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.author.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {testimonial.author.role} at{' '}
            <span className="font-medium text-slate-600 dark:text-slate-300">{testimonial.author.company}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// TestimonialGrid
// ============================================================================

const TestimonialGrid = React.forwardRef<HTMLDivElement, TestimonialGridProps>(
  ({ testimonials, columns = 3, cardVariant = 'default', className, ...props }, ref) => {
    const colClass = columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

    return (
      <div
        ref={ref}
        className={cn('grid gap-4 sm:gap-6', colClass, className)}
        {...props}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} variant={cardVariant} />
        ))}
      </div>
    )
  },
)

TestimonialGrid.displayName = 'TestimonialGrid'

// ============================================================================
// Exports
// ============================================================================

export { TestimonialCard, TestimonialGrid }
