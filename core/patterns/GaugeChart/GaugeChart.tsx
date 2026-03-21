'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// GAUGE CHART - Speedometer/meter visualization
// ============================================================================

const gaugeChartVariants = cva(
  'relative inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        semicircle: '',
        circle: '',
        speedometer: '',
        donut: '',
      },
      size: {
        sm: 'w-24 h-24',
        md: 'w-32 h-32',
        lg: 'w-40 h-40',
        xl: 'w-48 h-48',
      },
    },
    defaultVariants: {
      variant: 'semicircle',
      size: 'md',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export interface GaugeChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gaugeChartVariants> {
  /** Current value */
  value: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Label text */
  label?: string
  /** Primary color or auto color by ranges */
  color?: string
  /** Color ranges for auto coloring */
  colorRanges?: {
    color: string
    from: number
    to: number
  }[]
  /** Show value text */
  showValue?: boolean
  /** Value formatter */
  valueFormatter?: (value: number) => string
  /** Stroke width */
  strokeWidth?: number
  /** Animate on mount */
  animated?: boolean
  /** Animation duration in ms */
  animationDuration?: number
  /** Show tick marks (speedometer) */
  showTicks?: boolean
  /** Number of tick marks */
  tickCount?: number
  /** Track color (background arc) */
  trackColor?: string
  /** Show percentage in center (donut) */
  showPercentage?: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_COLOR_RANGES = [
  { color: '#22C55E', from: 0, to: 40 }, // Green
  { color: '#F59E0B', from: 40, to: 70 }, // Yellow/Amber
  { color: '#EF4444', from: 70, to: 100 }, // Red
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getColorForValue(
  value: number,
  min: number,
  max: number,
  colorRanges: typeof DEFAULT_COLOR_RANGES,
  defaultColor?: string
): string {
  if (defaultColor) return defaultColor

  const percentage = ((value - min) / (max - min)) * 100

  for (const range of colorRanges) {
    if (percentage >= range.from && percentage <= range.to) {
      return range.color
    }
  }

  return colorRanges[colorRanges.length - 1]?.color || '#14B89A'
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ')
}

// ============================================================================
// COMPONENT
// ============================================================================

const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      className,
      variant = 'semicircle',
      size = 'md',
      value,
      min = 0,
      max = 100,
      label,
      color,
      colorRanges = DEFAULT_COLOR_RANGES,
      showValue = true,
      valueFormatter,
      strokeWidth = 12,
      animated = true,
      animationDuration = 1000,
      showTicks = false,
      tickCount = 5,
      trackColor,
      showPercentage = true,
      ...props
    },
    ref
  ) => {
    const [animatedValue, setAnimatedValue] = React.useState(animated ? min : value)

    // Clamp value
    const clampedValue = Math.min(Math.max(value, min), max)
    const percentage = ((clampedValue - min) / (max - min)) * 100

    // Animate value
    React.useEffect(() => {
      if (!animated) {
        setAnimatedValue(clampedValue)
        return
      }

      const startTime = Date.now()
      const startValue = animatedValue
      const diff = clampedValue - startValue

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const newValue = startValue + diff * easeOut

        setAnimatedValue(newValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [clampedValue, animated, animationDuration])

    const currentColor = getColorForValue(
      animatedValue,
      min,
      max,
      colorRanges,
      color
    )

    const formatValue = (val: number): string => {
      if (valueFormatter) return valueFormatter(val)
      return Math.round(val).toLocaleString()
    }

    // Calculate SVG dimensions based on variant
    const getSvgDimensions = () => {
      switch (variant) {
        case 'semicircle':
        case 'speedometer':
          return { viewBox: '0 0 100 60', width: '100%', height: '60%' }
        case 'circle':
        case 'donut':
          return { viewBox: '0 0 100 100', width: '100%', height: '100%' }
        default:
          return { viewBox: '0 0 100 60', width: '100%', height: '60%' }
      }
    }

    const renderSemicircle = () => {
      const centerX = 50
      const centerY = 50
      const radius = 40
      const startAngle = -180
      const endAngle = 0
      const valueAngle =
        startAngle + ((animatedValue - min) / (max - min)) * (endAngle - startAngle)

      const trackPath = describeArc(centerX, centerY, radius, startAngle, endAngle)
      const valuePath = describeArc(centerX, centerY, radius, startAngle, valueAngle)

      return (
        <svg {...getSvgDimensions()} className="overflow-visible">
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-secondary-200 dark:text-secondary-700"
          />

          {/* Value arc */}
          <path
            d={valuePath}
            fill="none"
            stroke={currentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${currentColor}40)`,
            }}
          />
        </svg>
      )
    }

    const renderSpeedometer = () => {
      const centerX = 50
      const centerY = 50
      const radius = 40
      const startAngle = -180
      const endAngle = 0
      const needleAngle =
        -180 + ((animatedValue - min) / (max - min)) * 180

      const trackPath = describeArc(centerX, centerY, radius, startAngle, endAngle)

      // Generate ticks
      const ticks = []
      for (let i = 0; i <= tickCount; i++) {
        const tickAngle = startAngle + (i / tickCount) * (endAngle - startAngle)
        const innerPos = polarToCartesian(centerX, centerY, radius - strokeWidth / 2 - 4, tickAngle)
        const outerPos = polarToCartesian(centerX, centerY, radius - strokeWidth / 2 - 10, tickAngle)
        const tickValue = min + (i / tickCount) * (max - min)

        ticks.push(
          <g key={i}>
            <line
              x1={innerPos.x}
              y1={innerPos.y}
              x2={outerPos.x}
              y2={outerPos.y}
              stroke="currentColor"
              strokeWidth={1.5}
              className="text-secondary-400 dark:text-secondary-500"
            />
            {showTicks && (
              <text
                x={outerPos.x}
                y={outerPos.y + 8}
                textAnchor="middle"
                className="fill-secondary-500 text-[6px] dark:fill-secondary-400"
              >
                {Math.round(tickValue)}
              </text>
            )}
          </g>
        )
      }

      // Needle
      const needleLength = radius - strokeWidth - 8
      const needleTip = polarToCartesian(centerX, centerY, needleLength, needleAngle)

      return (
        <svg {...getSvgDimensions()} className="overflow-visible">
          {/* Color segments */}
          {colorRanges.map((range, i) => {
            const rangeStart = startAngle + (range.from / 100) * (endAngle - startAngle)
            const rangeEnd = startAngle + (range.to / 100) * (endAngle - startAngle)
            return (
              <path
                key={i}
                d={describeArc(centerX, centerY, radius, rangeStart, rangeEnd)}
                fill="none"
                stroke={range.color}
                strokeWidth={strokeWidth}
                strokeOpacity={0.3}
              />
            )
          })}

          {/* Track overlay */}
          <path
            d={trackPath}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
            className="text-secondary-200 dark:text-secondary-700"
          />

          {/* Ticks */}
          {ticks}

          {/* Needle */}
          <g
            style={{
              transformOrigin: `${centerX}px ${centerY}px`,
              transition: animated ? `transform ${animationDuration}ms ease-out` : 'none',
            }}
          >
            <line
              x1={centerX}
              y1={centerY}
              x2={needleTip.x}
              y2={needleTip.y}
              stroke={currentColor}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={4}
              fill={currentColor}
            />
          </g>
        </svg>
      )
    }

    const renderCircle = () => {
      const centerX = 50
      const centerY = 50
      const radius = 40
      const circumference = 2 * Math.PI * radius
      const progress = ((animatedValue - min) / (max - min)) * circumference

      return (
        <svg {...getSvgDimensions()} className="overflow-visible -rotate-90">
          {/* Track */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            className="text-secondary-200 dark:text-secondary-700"
          />

          {/* Value arc */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={currentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              filter: `drop-shadow(0 0 6px ${currentColor}40)`,
            }}
          />
        </svg>
      )
    }

    const renderDonut = () => {
      const centerX = 50
      const centerY = 50
      const radius = 40
      const circumference = 2 * Math.PI * radius
      const progress = ((animatedValue - min) / (max - min)) * circumference

      return (
        <svg {...getSvgDimensions()} className="overflow-visible -rotate-90">
          {/* Track */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            className="text-secondary-200 dark:text-secondary-700"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id={`donut-gradient-${React.useId()}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor={currentColor} stopOpacity={0.6} />
            </linearGradient>
          </defs>

          {/* Value arc */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={currentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              filter: `drop-shadow(0 0 8px ${currentColor}50)`,
            }}
          />
        </svg>
      )
    }

    const renderChart = () => {
      switch (variant) {
        case 'semicircle':
          return renderSemicircle()
        case 'speedometer':
          return renderSpeedometer()
        case 'circle':
          return renderCircle()
        case 'donut':
          return renderDonut()
        default:
          return renderSemicircle()
      }
    }

    const sizeMap = {
      sm: { value: 'text-lg', label: 'text-xs', percentage: 'text-2xl' },
      md: { value: 'text-xl', label: 'text-sm', percentage: 'text-3xl' },
      lg: { value: 'text-2xl', label: 'text-base', percentage: 'text-4xl' },
      xl: { value: 'text-3xl', label: 'text-lg', percentage: 'text-5xl' },
    }

    const textSizes = sizeMap[size || 'md']

    return (
      <div
        ref={ref}
        className={cn(gaugeChartVariants({ variant, size }), className)}
        {...props}
      >
        {renderChart()}

        {/* Center content */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center',
            variant === 'semicircle' || variant === 'speedometer'
              ? 'justify-center pt-[15%]'
              : 'justify-center'
          )}
        >
          {(variant === 'donut' || variant === 'circle') && showPercentage ? (
            <span
              className={cn(
                'font-bold text-secondary-900 dark:text-secondary-100',
                textSizes.percentage
              )}
              style={{ color: currentColor }}
            >
              {Math.round(percentage)}%
            </span>
          ) : (
            showValue && (
              <span
                className={cn(
                  'font-bold text-secondary-900 dark:text-secondary-100',
                  textSizes.value
                )}
              >
                {formatValue(animatedValue)}
              </span>
            )
          )}

          {label && (
            <span
              className={cn(
                'text-secondary-500 dark:text-secondary-400',
                textSizes.label
              )}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    )
  }
)

GaugeChart.displayName = 'GaugeChart'

export { GaugeChart, gaugeChartVariants }
