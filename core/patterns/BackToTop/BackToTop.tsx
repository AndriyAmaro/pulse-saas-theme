'use client'

import * as React from 'react'
import { forwardRef, useState, useEffect, useCallback, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowUp, ChevronUp } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// VARIANTS
// ============================================================================

export const backToTopVariants = cva(
  [
    'fixed z-40',
    'flex items-center justify-center',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        circle: [
          'w-12 h-12 rounded-full',
          'bg-primary-500 text-white',
          'hover:bg-primary-600 hover:scale-110',
          'shadow-lg hover:shadow-xl',
        ],
        rounded: [
          'w-12 h-12 rounded-xl',
          'bg-white dark:bg-secondary-800 text-primary-500',
          'border border-secondary-200 dark:border-secondary-700',
          'hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
          'shadow-md hover:shadow-lg',
        ],
        pill: [
          'px-4 py-2 rounded-full gap-2',
          'bg-white dark:bg-secondary-800',
          'text-secondary-700 dark:text-secondary-300',
          'border border-secondary-200 dark:border-secondary-700',
          'hover:border-primary-500 hover:text-primary-500',
          'shadow-md hover:shadow-lg',
        ],
      },
      position: {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
      },
      visible: {
        true: 'opacity-100 translate-y-0 pointer-events-auto',
        false: 'opacity-0 translate-y-4 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'circle',
      position: 'bottom-right',
      visible: false,
    },
  }
)

export const progressRingVariants = cva(
  'absolute inset-0 -rotate-90 transition-all duration-100',
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export interface BackToTopProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof backToTopVariants> {
  threshold?: number
  behavior?: ScrollBehavior
  showProgress?: boolean
  label?: string
  icon?: React.ReactNode
  alwaysVisible?: boolean
}

// ============================================================================
// PROGRESS RING COMPONENT
// ============================================================================

interface ProgressRingProps {
  progress: number
  variant: 'circle' | 'rounded' | 'pill' | null | undefined
}

const ProgressRing: React.FC<ProgressRingProps> = ({ progress, variant }) => {
  // Don't show for pill variant
  if (variant === 'pill') return null

  const size = variant === 'circle' ? 48 : 48
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg
      className={cn(progressRingVariants())}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="opacity-20"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={cn(
          'transition-all duration-100',
          variant === 'circle' ? 'text-white' : 'text-primary-500'
        )}
      />
    </svg>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const BackToTop = forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      className,
      variant = 'circle',
      position = 'bottom-right',
      threshold = 400,
      behavior = 'smooth',
      showProgress = false,
      label,
      icon,
      alwaysVisible = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(alwaysVisible)
    const [scrollProgress, setScrollProgress] = useState(0)
    const ticking = useRef(false)

    const handleScroll = useCallback(() => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

          // Update visibility
          if (!alwaysVisible) {
            setVisible(scrollTop > threshold)
          }

          // Calculate scroll progress
          if (scrollHeight > 0) {
            setScrollProgress((scrollTop / scrollHeight) * 100)
          }

          ticking.current = false
        })
        ticking.current = true
      }
    }, [threshold, alwaysVisible])

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      // Initial check
      handleScroll()

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [handleScroll])

    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior,
      })
    }, [behavior])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          scrollToTop()
        }
      },
      [scrollToTop]
    )

    // Determine icon to use
    const IconComponent = icon || (variant === 'pill' ? <ChevronUp className="w-4 h-4" /> : <ArrowUp className="w-5 h-5" />)

    // Determine if we should show text
    const showText = variant === 'pill' && label

    return (
      <button
        ref={ref}
        type="button"
        onClick={scrollToTop}
        onKeyDown={handleKeyDown}
        className={cn(
          backToTopVariants({ variant, position, visible: visible || alwaysVisible }),
          className
        )}
        aria-label={label || 'Scroll to top'}
        tabIndex={visible || alwaysVisible ? 0 : -1}
        {...props}
      >
        {/* Progress ring */}
        {showProgress && (variant === 'circle' || variant === 'rounded') && (
          <ProgressRing progress={scrollProgress} variant={variant} />
        )}

        {/* Icon */}
        {IconComponent}

        {/* Label text for pill variant */}
        {showText && (
          <span className="text-sm font-medium">{label}</span>
        )}

        {/* Screen reader only: current progress */}
        {showProgress && (
          <span className="sr-only">
            {Math.round(scrollProgress)}% scrolled
          </span>
        )}
      </button>
    )
  }
)

BackToTop.displayName = 'BackToTop'
