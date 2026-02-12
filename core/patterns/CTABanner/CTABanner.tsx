'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { ChevronRight, Sparkles, X } from 'lucide-react'

// ============================================================================
// CTA BANNER - Call-to-Action Banner Component
// ============================================================================

const ctaBannerVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      variant: {
        simple: 'py-12 md:py-16',
        'with-image': 'py-12 md:py-16',
        'gradient-bg': 'py-12 md:py-16',
        floating: [
          'py-8 md:py-10 mx-4 md:mx-8 rounded-2xl',
          'shadow-xl shadow-primary-500/10',
        ],
      },
      background: {
        solid: 'bg-slate-900 dark:bg-slate-800',
        gradient: 'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500',
        'gradient-dark': 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        pattern: 'bg-slate-900 dark:bg-slate-800',
        primary: 'bg-primary-600',
      },
    },
    defaultVariants: {
      variant: 'simple',
      background: 'gradient',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

interface CTAButton {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
}

export interface CTABannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaBannerVariants> {
  /** Banner title */
  title: string
  /** Banner description */
  description?: string
  /** Primary CTA button */
  primaryCTA?: CTAButton
  /** Secondary CTA button */
  secondaryCTA?: CTAButton
  /** Optional image (for with-image variant) */
  image?: {
    src: string
    alt: string
    position?: 'left' | 'right'
  }
  /** Decorative icon */
  icon?: React.ReactNode
  /** Countdown timer target date */
  countdown?: Date | string
  /** Countdown label */
  countdownLabel?: string
  /** Dismissible banner */
  dismissible?: boolean
  /** Called when banner is dismissed */
  onDismiss?: () => void
  /** Center the content */
  centered?: boolean
}

// ============================================================================
// Grid Pattern Background
// ============================================================================

const GridPattern = () => (
  <div className="absolute inset-0 opacity-20">
    <svg className="absolute h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 32V0h32" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-grid)" />
    </svg>
  </div>
)

// ============================================================================
// Countdown Timer Component
// ============================================================================

interface CountdownTimerProps {
  targetDate: Date | string
  label?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = ({ targetDate, label }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  React.useEffect(() => {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
        <span className="text-xl md:text-2xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1 text-[10px] md:text-xs uppercase tracking-wide opacity-80">
        {label}
      </span>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <p className="text-sm font-medium text-white/80">{label}</p>
      )}
      <div className="flex items-center gap-2 md:gap-3">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-xl font-bold opacity-50">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-xl font-bold opacity-50">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="text-xl font-bold opacity-50">:</span>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  )
}

// ============================================================================
// Main CTA Banner Component
// ============================================================================

const CTABanner = React.forwardRef<HTMLDivElement, CTABannerProps>(
  (
    {
      className,
      variant = 'simple',
      background = 'gradient',
      title,
      description,
      primaryCTA,
      secondaryCTA,
      image,
      icon,
      countdown,
      countdownLabel = 'Offer ends in',
      dismissible = false,
      onDismiss,
      centered = false,
      ...props
    },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = React.useState(false)

    const handleDismiss = () => {
      setIsDismissed(true)
      onDismiss?.()
    }

    if (isDismissed) return null

    const hasImage = variant === 'with-image' && image
    const isGradientBg = variant === 'gradient-bg'
    const showPattern = background === 'pattern'

    return (
      <div
        ref={ref}
        className={cn(
          ctaBannerVariants({ variant, background }),
          'text-white',
          className
        )}
        {...props}
      >
        {/* Background pattern */}
        {showPattern && <GridPattern />}

        {/* Decorative gradients */}
        {isGradientBg && (
          <>
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent-500/30 blur-3xl" />
          </>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasImage ? (
            // With image layout
            <div
              className={cn(
                'grid items-center gap-8 md:gap-12',
                'md:grid-cols-2'
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  'relative',
                  image.position === 'right' && 'md:order-2'
                )}
              >
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-4">
                {icon && (
                  <div className="w-fit rounded-full bg-white/10 p-3">
                    {icon}
                  </div>
                )}

                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {title}
                </h2>

                {description && (
                  <p className="text-base text-white/80 sm:text-lg">
                    {description}
                  </p>
                )}

                {countdown && (
                  <div className="mt-2">
                    <CountdownTimer
                      targetDate={countdown}
                      label={countdownLabel}
                    />
                  </div>
                )}

                {(primaryCTA || secondaryCTA) && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {primaryCTA && (
                      <Button
                        size="lg"
                        onClick={primaryCTA.onClick}
                        className={cn(
                          'gap-2 px-6',
                          background === 'gradient' || background === 'primary'
                            ? 'bg-white text-primary-600 hover:bg-white/90'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        )}
                      >
                        {primaryCTA.label}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    {secondaryCTA && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={secondaryCTA.onClick}
                        className="gap-2 border-white/30 text-white hover:bg-white/10"
                      >
                        {secondaryCTA.label}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Simple / centered layout
            <div
              className={cn(
                'flex flex-col gap-6',
                centered && 'items-center text-center'
              )}
            >
              {icon && (
                <div className="w-fit rounded-full bg-white/10 p-3">
                  {icon}
                </div>
              )}

              <div className={cn('flex flex-col gap-3', centered && 'items-center')}>
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {title}
                </h2>

                {description && (
                  <p
                    className={cn(
                      'text-base text-white/80 sm:text-lg',
                      centered && 'max-w-2xl'
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>

              {countdown && (
                <CountdownTimer
                  targetDate={countdown}
                  label={countdownLabel}
                />
              )}

              {(primaryCTA || secondaryCTA) && (
                <div className={cn('flex flex-wrap gap-4', centered && 'justify-center')}>
                  {primaryCTA && (
                    <Button
                      size="lg"
                      onClick={primaryCTA.onClick}
                      className={cn(
                        'group gap-2 px-8',
                        background === 'gradient' || background === 'primary'
                          ? 'bg-white text-primary-600 hover:bg-white/90'
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      )}
                    >
                      {primaryCTA.label}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  )}
                  {secondaryCTA && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={secondaryCTA.onClick}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {secondaryCTA.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
CTABanner.displayName = 'CTABanner'

// ============================================================================
// Exports
// ============================================================================

export { CTABanner, ctaBannerVariants }
