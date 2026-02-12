'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// COUNTDOWN TIMER - Event/promotion timer
// ============================================================================

const countdownTimerVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      default: 'gap-2',
      compact: 'gap-1',
      'flip-cards': 'gap-3',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

// ============================================================================
// TYPES
// ============================================================================

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof countdownTimerVariants> {
  /** Target date/time */
  targetDate: Date | string | number
  /** Callback when countdown completes */
  onComplete?: () => void
  /** Custom labels */
  labels?: {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
  }
  /** Show days unit */
  showDays?: boolean
  /** Show seconds unit */
  showSeconds?: boolean
  /** Urgency threshold in milliseconds (changes to red) */
  urgencyThreshold?: number
  /** Enable pulse animation on seconds */
  pulseSeconds?: boolean
  /** Separator between units */
  separator?: string | React.ReactNode
  /** Completed text to show when countdown ends */
  completedText?: string
  /** Show labels below numbers */
  showLabels?: boolean
  /** Auto-start countdown */
  autoStart?: boolean
  /** Paused state */
  paused?: boolean
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  isComplete: boolean
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime()
  const target = targetDate.getTime()
  const total = target - now

  if (total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isComplete: true,
    }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
    total,
    isComplete: false,
  }
}

function padNumber(num: number): string {
  return num.toString().padStart(2, '0')
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface TimeUnitProps {
  value: number
  label: string
  variant: 'default' | 'compact' | 'flip-cards'
  size: 'sm' | 'md' | 'lg' | 'xl'
  isUrgent: boolean
  isPulsing: boolean
  showLabel: boolean
  prevValue?: number
}

const sizeConfig = {
  sm: {
    default: { value: 'text-lg', label: 'text-[10px]', box: 'w-10 h-10' },
    compact: { value: 'text-sm', label: 'text-[8px]', box: 'w-8 h-6' },
    'flip-cards': { value: 'text-xl', label: 'text-[10px]', box: 'w-12 h-12' },
  },
  md: {
    default: { value: 'text-2xl', label: 'text-xs', box: 'w-14 h-14' },
    compact: { value: 'text-base', label: 'text-[10px]', box: 'w-10 h-8' },
    'flip-cards': { value: 'text-3xl', label: 'text-xs', box: 'w-16 h-16' },
  },
  lg: {
    default: { value: 'text-3xl', label: 'text-sm', box: 'w-18 h-18' },
    compact: { value: 'text-xl', label: 'text-xs', box: 'w-12 h-10' },
    'flip-cards': { value: 'text-4xl', label: 'text-sm', box: 'w-20 h-20' },
  },
  xl: {
    default: { value: 'text-4xl', label: 'text-base', box: 'w-24 h-24' },
    compact: { value: 'text-2xl', label: 'text-sm', box: 'w-16 h-12' },
    'flip-cards': { value: 'text-5xl', label: 'text-base', box: 'w-28 h-28' },
  },
}

const TimeUnit: React.FC<TimeUnitProps> = ({
  value,
  label,
  variant,
  size,
  isUrgent,
  isPulsing,
  showLabel,
  prevValue,
}) => {
  const config = sizeConfig[size][variant]
  const displayValue = padNumber(value)
  const isFlipping = prevValue !== undefined && prevValue !== value

  if (variant === 'compact') {
    return (
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'font-mono font-bold tabular-nums',
            config.value,
            isUrgent ? 'text-red-600 dark:text-red-400' : 'text-secondary-900 dark:text-secondary-100',
            isPulsing && 'animate-pulse'
          )}
        >
          {displayValue}
        </span>
        {showLabel && (
          <span className={cn('uppercase text-secondary-500 dark:text-secondary-400', config.label)}>
            {label}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'flip-cards') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary-900 shadow-lg dark:bg-secondary-800',
            config.box,
            isUrgent && 'bg-red-600 dark:bg-red-700'
          )}
        >
          {/* Top half (static) */}
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-lg bg-black/10">
            <span
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 font-mono font-bold text-white tabular-nums',
                config.value
              )}
            >
              {displayValue}
            </span>
          </div>

          {/* Bottom half */}
          <span
            className={cn(
              'font-mono font-bold text-white tabular-nums',
              config.value,
              isPulsing && 'animate-pulse'
            )}
          >
            {displayValue}
          </span>

          {/* Flip animation overlay */}
          {isFlipping && (
            <div
              className="absolute inset-0 origin-top animate-flip rounded-lg bg-secondary-800"
              key={value}
            />
          )}

          {/* Center line */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
        </div>
        {showLabel && (
          <span className={cn('uppercase text-secondary-500 dark:text-secondary-400', config.label)}>
            {label}
          </span>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          'flex items-center justify-center rounded-lg border bg-white shadow-sm dark:bg-secondary-800',
          config.box,
          isUrgent
            ? 'border-red-200 dark:border-red-800'
            : 'border-secondary-200 dark:border-secondary-700'
        )}
      >
        <span
          className={cn(
            'font-mono font-bold tabular-nums',
            config.value,
            isUrgent ? 'text-red-600 dark:text-red-400' : 'text-secondary-900 dark:text-secondary-100',
            isPulsing && 'animate-pulse'
          )}
        >
          {displayValue}
        </span>
      </div>
      {showLabel && (
        <span className={cn('uppercase text-secondary-500 dark:text-secondary-400', config.label)}>
          {label}
        </span>
      )}
    </div>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      targetDate,
      onComplete,
      labels = {},
      showDays = true,
      showSeconds = true,
      urgencyThreshold = 60 * 60 * 1000, // 1 hour
      pulseSeconds = true,
      separator,
      completedText = "Time's up!",
      showLabels = true,
      autoStart = true,
      paused = false,
      ...props
    },
    ref
  ) => {
    const target = React.useMemo(() => {
      if (targetDate instanceof Date) return targetDate
      return new Date(targetDate)
    }, [targetDate])

    const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() => calculateTimeLeft(target))
    const [prevSeconds, setPrevSeconds] = React.useState(timeLeft.seconds)
    const completedRef = React.useRef(false)

    const finalLabels = {
      days: labels.days ?? 'Days',
      hours: labels.hours ?? 'Hours',
      minutes: labels.minutes ?? 'Minutes',
      seconds: labels.seconds ?? 'Seconds',
    }

    React.useEffect(() => {
      if (!autoStart || paused) return

      const interval = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(target)
        setPrevSeconds(timeLeft.seconds)
        setTimeLeft(newTimeLeft)

        if (newTimeLeft.isComplete && !completedRef.current) {
          completedRef.current = true
          onComplete?.()
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }, [target, autoStart, paused, onComplete, timeLeft.seconds])

    const isUrgent = timeLeft.total > 0 && timeLeft.total <= urgencyThreshold
    const actualVariant = variant || 'default'
    const actualSize = size || 'md'

    // Completed state
    if (timeLeft.isComplete) {
      return (
        <div
          ref={ref}
          className={cn(
            'text-center font-semibold',
            actualSize === 'sm' && 'text-lg',
            actualSize === 'md' && 'text-2xl',
            actualSize === 'lg' && 'text-3xl',
            actualSize === 'xl' && 'text-4xl',
            'text-secondary-900 dark:text-secondary-100',
            className
          )}
          {...props}
        >
          {completedText}
        </div>
      )
    }

    const renderSeparator = () => {
      if (!separator) return null

      if (typeof separator === 'string') {
        return (
          <span
            className={cn(
              'font-bold text-secondary-400 dark:text-secondary-500',
              actualSize === 'sm' && 'text-lg',
              actualSize === 'md' && 'text-2xl',
              actualSize === 'lg' && 'text-3xl',
              actualSize === 'xl' && 'text-4xl'
            )}
          >
            {separator}
          </span>
        )
      }

      return separator
    }

    return (
      <div
        ref={ref}
        className={cn(countdownTimerVariants({ variant, size }), className)}
        {...props}
      >
        {showDays && timeLeft.days > 0 && (
          <>
            <TimeUnit
              value={timeLeft.days}
              label={finalLabels.days}
              variant={actualVariant}
              size={actualSize}
              isUrgent={false}
              isPulsing={false}
              showLabel={showLabels}
            />
            {renderSeparator()}
          </>
        )}

        <TimeUnit
          value={timeLeft.hours}
          label={finalLabels.hours}
          variant={actualVariant}
          size={actualSize}
          isUrgent={isUrgent}
          isPulsing={false}
          showLabel={showLabels}
        />
        {renderSeparator()}

        <TimeUnit
          value={timeLeft.minutes}
          label={finalLabels.minutes}
          variant={actualVariant}
          size={actualSize}
          isUrgent={isUrgent}
          isPulsing={false}
          showLabel={showLabels}
        />

        {showSeconds && (
          <>
            {renderSeparator()}
            <TimeUnit
              value={timeLeft.seconds}
              label={finalLabels.seconds}
              variant={actualVariant}
              size={actualSize}
              isUrgent={isUrgent}
              isPulsing={pulseSeconds && isUrgent}
              showLabel={showLabels}
              prevValue={actualVariant === 'flip-cards' ? prevSeconds : undefined}
            />
          </>
        )}

        {/* Flip animation styles */}
        <style jsx>{`
          @keyframes flip {
            0% {
              transform: perspective(400px) rotateX(0);
            }
            100% {
              transform: perspective(400px) rotateX(-180deg);
            }
          }

          .animate-flip {
            animation: flip 0.6s ease-in-out;
          }
        `}</style>
      </div>
    )
  }
)

CountdownTimer.displayName = 'CountdownTimer'

export { CountdownTimer, countdownTimerVariants }
