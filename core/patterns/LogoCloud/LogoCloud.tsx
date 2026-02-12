'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// LOGO CLOUD - Client/Partner Logos Component
// ============================================================================

const logoCloudVariants = cva(
  'w-full py-12 md:py-16',
  {
    variants: {
      variant: {
        static: '',
        scrolling: 'overflow-hidden',
        grid: '',
      },
      background: {
        transparent: '',
        subtle: 'bg-slate-50 dark:bg-slate-900/50',
        bordered: 'border-y border-slate-200 dark:border-slate-700',
      },
    },
    defaultVariants: {
      variant: 'static',
      background: 'transparent',
    },
  }
)

const logoSizeMap = {
  sm: 'h-6 md:h-7',
  md: 'h-8 md:h-10',
  lg: 'h-10 md:h-12',
}

// ============================================================================
// Types
// ============================================================================

export interface LogoItem {
  /** Logo name for alt text */
  name: string
  /** Logo content - can be image URL or React node */
  logo: string | React.ReactNode
  /** Optional link */
  href?: string
}

export interface LogoCloudProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoCloudVariants> {
  /** Array of logos */
  logos: LogoItem[]
  /** Title above logos */
  title?: string
  /** Logo size */
  size?: 'sm' | 'md' | 'lg'
  /** Number of columns for grid variant */
  columns?: 3 | 4 | 5 | 6
  /** Animation speed for scrolling (in seconds) */
  scrollSpeed?: number
  /** Show animated counter */
  showCounter?: boolean
  /** Counter value */
  counterValue?: number
  /** Counter suffix (e.g., "+ companies trust us") */
  counterSuffix?: string
  /** Disable grayscale filter */
  disableGrayscale?: boolean
}

// ============================================================================
// Animated Counter Component
// ============================================================================

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
}

const AnimatedCounter = ({ value, suffix, className }: AnimatedCounterProps) => {
  const [count, setCount] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  React.useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, isVisible])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`
    }
    return num.toLocaleString()
  }

  return (
    <div ref={ref} className={cn('text-center mb-8', className)}>
      <div className="flex items-center justify-center gap-2">
        <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tabular-nums">
          {formatNumber(count)}+
        </span>
      </div>
      {suffix && (
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          {suffix}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// Logo Item Component
// ============================================================================

interface LogoItemComponentProps {
  logo: LogoItem
  size: 'sm' | 'md' | 'lg'
  disableGrayscale?: boolean
}

const LogoItemComponent = ({
  logo,
  size,
  disableGrayscale,
}: LogoItemComponentProps) => {
  const content =
    typeof logo.logo === 'string' ? (
      <img
        src={logo.logo}
        alt={logo.name}
        className={cn(
          logoSizeMap[size],
          'w-auto object-contain',
          !disableGrayscale && 'grayscale opacity-50',
          'transition-all duration-300',
          !disableGrayscale && 'hover:grayscale-0 hover:opacity-100'
        )}
      />
    ) : (
      <div
        className={cn(
          logoSizeMap[size],
          'flex items-center',
          !disableGrayscale && 'grayscale opacity-50',
          'transition-all duration-300',
          !disableGrayscale && 'hover:grayscale-0 hover:opacity-100'
        )}
      >
        {logo.logo}
      </div>
    )

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
        title={logo.name}
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-center justify-center" title={logo.name}>
      {content}
    </div>
  )
}

// ============================================================================
// Static Logo Grid
// ============================================================================

interface StaticLogosProps {
  logos: LogoItem[]
  size: 'sm' | 'md' | 'lg'
  columns?: number
  disableGrayscale?: boolean
}

const StaticLogos = ({
  logos,
  size,
  columns = 5,
  disableGrayscale,
}: StaticLogosProps) => {
  const gridCols = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
  }

  return (
    <div
      className={cn(
        'grid gap-8 md:gap-12 items-center',
        gridCols[columns as keyof typeof gridCols]
      )}
    >
      {logos.map((logo, index) => (
        <LogoItemComponent
          key={index}
          logo={logo}
          size={size}
          disableGrayscale={disableGrayscale}
        />
      ))}
    </div>
  )
}

// ============================================================================
// Grid Logo Layout
// ============================================================================

interface GridLogosProps {
  logos: LogoItem[]
  size: 'sm' | 'md' | 'lg'
  columns?: number
  disableGrayscale?: boolean
}

const GridLogos = ({
  logos,
  size,
  columns = 4,
  disableGrayscale,
}: GridLogosProps) => {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <div
      className={cn(
        'grid gap-4',
        gridCols[columns as keyof typeof gridCols]
      )}
    >
      {logos.map((logo, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center justify-center p-6 md:p-8',
            'rounded-xl border border-slate-200 dark:border-slate-700',
            'bg-white dark:bg-slate-800/50',
            'transition-all duration-300',
            'hover:border-primary-300 dark:hover:border-primary-700',
            'hover:shadow-lg hover:shadow-primary-500/5'
          )}
        >
          <LogoItemComponent
            logo={logo}
            size={size}
            disableGrayscale={disableGrayscale}
          />
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// Scrolling Marquee
// ============================================================================

interface ScrollingLogosProps {
  logos: LogoItem[]
  size: 'sm' | 'md' | 'lg'
  speed?: number
  disableGrayscale?: boolean
}

const ScrollingLogos = ({
  logos,
  size,
  speed = 30,
  disableGrayscale,
}: ScrollingLogosProps) => {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none" />

      {/* Scrolling content */}
      <div
        className="flex items-center gap-12 md:gap-16 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <LogoItemComponent
              logo={logo}
              size={size}
              disableGrayscale={disableGrayscale}
            />
          </div>
        ))}
      </div>

      {/* Second set for seamless loop */}
      <div
        className="flex items-center gap-12 md:gap-16 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <LogoItemComponent
              logo={logo}
              size={size}
              disableGrayscale={disableGrayscale}
            />
          </div>
        ))}
      </div>

      {/* Keyframes are in globals.css */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  )
}

// ============================================================================
// Main Logo Cloud Component
// ============================================================================

const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  (
    {
      className,
      variant = 'static',
      background = 'transparent',
      logos,
      title,
      size = 'md',
      columns,
      scrollSpeed = 30,
      showCounter = false,
      counterValue = 1000,
      counterSuffix = 'companies trust us',
      disableGrayscale = false,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(logoCloudVariants({ variant, background }), className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Counter */}
          {showCounter && (
            <AnimatedCounter
              value={counterValue}
              suffix={counterSuffix}
            />
          )}

          {/* Title */}
          {title && !showCounter && (
            <p className="mb-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              {title}
            </p>
          )}

          {/* Logo display based on variant */}
          {variant === 'static' && (
            <StaticLogos
              logos={logos}
              size={size}
              columns={columns || 5}
              disableGrayscale={disableGrayscale}
            />
          )}

          {variant === 'scrolling' && (
            <ScrollingLogos
              logos={logos}
              size={size}
              speed={scrollSpeed}
              disableGrayscale={disableGrayscale}
            />
          )}

          {variant === 'grid' && (
            <GridLogos
              logos={logos}
              size={size}
              columns={columns || 4}
              disableGrayscale={disableGrayscale}
            />
          )}
        </div>
      </section>
    )
  }
)
LogoCloud.displayName = 'LogoCloud'

// ============================================================================
// Exports
// ============================================================================

export { LogoCloud, logoCloudVariants }
