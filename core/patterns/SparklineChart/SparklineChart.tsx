'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// SPARKLINE CHART - Mini inline chart for cards/tables
// ============================================================================

const sparklineChartVariants = cva('relative inline-block', {
  variants: {
    type: {
      line: '',
      area: '',
      bar: '',
    },
  },
  defaultVariants: {
    type: 'line',
  },
})

// ============================================================================
// TYPES
// ============================================================================

export interface SparklineDataPoint {
  value: number
  label?: string
}

export interface SparklineChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sparklineChartVariants> {
  /** Data points for the chart */
  data: (number | SparklineDataPoint)[]
  /** Chart color (CSS color value) */
  color?: string
  /** Chart width in pixels */
  width?: number
  /** Chart height in pixels */
  height?: number
  /** Show dot on the last data point */
  showDot?: boolean
  /** Dot size in pixels */
  dotSize?: number
  /** Line/bar stroke width */
  strokeWidth?: number
  /** Enable gradient fill for area type */
  gradient?: boolean
  /** Show tooltip on hover */
  showTooltip?: boolean
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: number, index: number) => string
  /** Animate on mount */
  animated?: boolean
  /** Fill opacity for area chart (0-1) */
  fillOpacity?: number
  /** Bar gap for bar chart */
  barGap?: number
  /** Curve type for line/area */
  curve?: 'linear' | 'smooth'
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function normalizeData(data: (number | SparklineDataPoint)[]): number[] {
  return data.map((d) => (typeof d === 'number' ? d : d.value))
}

function getMinMax(values: number[]): { min: number; max: number } {
  const min = Math.min(...values)
  const max = Math.max(...values)
  // Add padding to prevent touching edges
  const padding = (max - min) * 0.1 || 1
  return { min: min - padding, max: max + padding }
}

function scaleY(value: number, min: number, max: number, height: number): number {
  return height - ((value - min) / (max - min)) * height
}

function generateLinePath(
  values: number[],
  width: number,
  height: number,
  curve: 'linear' | 'smooth'
): string {
  const { min, max } = getMinMax(values)
  const stepX = width / (values.length - 1)

  const points = values.map((v, i) => ({
    x: i * stepX,
    y: scaleY(v, min, max, height),
  }))

  if (curve === 'smooth' && points.length > 2) {
    return generateSmoothPath(points)
  }

  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

function generateSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''

  const firstPoint = points[0]
  if (!firstPoint) return ''

  let path = `M ${firstPoint.x} ${firstPoint.y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    if (!prev || !curr) continue
    const cpX = (prev.x + curr.x) / 2
    path += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`
  }

  return path
}

function generateAreaPath(
  values: number[],
  width: number,
  height: number,
  curve: 'linear' | 'smooth'
): string {
  const linePath = generateLinePath(values, width, height, curve)
  const stepX = width / (values.length - 1)
  const lastX = (values.length - 1) * stepX

  return `${linePath} L ${lastX} ${height} L 0 ${height} Z`
}

// ============================================================================
// COMPONENT
// ============================================================================

const SparklineChart = React.forwardRef<HTMLDivElement, SparklineChartProps>(
  (
    {
      className,
      data,
      type = 'line',
      color = 'var(--color-primary-500)',
      width = 100,
      height = 32,
      showDot = false,
      dotSize = 4,
      strokeWidth = 2,
      gradient = true,
      showTooltip = true,
      tooltipFormatter,
      animated = true,
      fillOpacity = 0.3,
      barGap = 2,
      curve = 'smooth',
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
    const svgRef = React.useRef<SVGSVGElement>(null)
    const gradientId = React.useId()

    const values = normalizeData(data)
    const { min, max } = getMinMax(values)

    if (values.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(sparklineChartVariants({ type }), className)}
          style={{ width, height }}
          {...props}
        />
      )
    }

    const lastValue = values[values.length - 1] ?? 0
    const lastY = scaleY(lastValue, min, max, height)
    const stepX = width / (values.length - 1 || 1)
    const lastX = (values.length - 1) * stepX

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!showTooltip || !svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const index = Math.round(x / stepX)

      if (index >= 0 && index < values.length) {
        const valueAtIndex = values[index] ?? 0
        setHoveredIndex(index)
        setTooltipPosition({
          x: index * stepX,
          y: scaleY(valueAtIndex, min, max, height),
        })
      }
    }

    const handleMouseLeave = () => {
      setHoveredIndex(null)
    }

    const formatTooltip = (value: number, index: number): string => {
      if (tooltipFormatter) {
        return tooltipFormatter(value, index)
      }
      const originalData = data[index]
      if (typeof originalData === 'object' && originalData.label) {
        return `${originalData.label}: ${value}`
      }
      return value.toLocaleString()
    }

    const renderLineChart = () => (
      <>
        {/* Gradient Definition */}
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
        )}

        {/* Area fill */}
        {type === 'area' && (
          <path
            d={generateAreaPath(values, width, height, curve)}
            fill={gradient ? `url(#${gradientId})` : color}
            fillOpacity={gradient ? 1 : fillOpacity}
            className={animated ? 'animate-sparkline-fill' : ''}
          />
        )}

        {/* Line */}
        <path
          d={generateLinePath(values, width, height, curve)}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-sparkline-line' : ''}
          style={
            animated
              ? {
                  strokeDasharray: width * 2,
                  strokeDashoffset: width * 2,
                  animation: 'sparkline-draw 1s ease-out forwards',
                }
              : undefined
          }
        />

        {/* Last point dot */}
        {showDot && (
          <circle
            cx={lastX}
            cy={lastY}
            r={dotSize}
            fill={color}
            className={animated ? 'animate-sparkline-dot' : ''}
          />
        )}

        {/* Hover dot */}
        {hoveredIndex !== null && (
          <circle
            cx={tooltipPosition.x}
            cy={tooltipPosition.y}
            r={dotSize + 1}
            fill={color}
            stroke="white"
            strokeWidth={2}
          />
        )}
      </>
    )

    const renderBarChart = () => {
      const barWidth = (width - barGap * (values.length - 1)) / values.length

      return values.map((value, index) => {
        const barHeight = ((value - min) / (max - min)) * height
        const x = index * (barWidth + barGap)
        const y = height - barHeight
        const isHovered = hoveredIndex === index

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={color}
            fillOpacity={isHovered ? 1 : 0.8}
            rx={1}
            className={animated ? 'animate-sparkline-bar' : ''}
            style={
              animated
                ? {
                    transformOrigin: 'bottom',
                    animation: `sparkline-bar-grow 0.5s ease-out ${index * 0.05}s forwards`,
                    transform: 'scaleY(0)',
                  }
                : undefined
            }
            onMouseEnter={() => {
              if (showTooltip) {
                setHoveredIndex(index)
                setTooltipPosition({
                  x: x + barWidth / 2,
                  y: y,
                })
              }
            }}
          />
        )
      })
    }

    return (
      <div
        ref={ref}
        className={cn(sparklineChartVariants({ type }), 'group', className)}
        style={{ width, height }}
        {...props}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          onMouseMove={type !== 'bar' ? handleMouseMove : undefined}
          onMouseLeave={handleMouseLeave}
          className="overflow-visible"
        >
          {type === 'bar' ? renderBarChart() : renderLineChart()}
        </svg>

        {/* Tooltip */}
        {showTooltip && hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded bg-secondary-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-secondary-100 dark:text-secondary-900"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 8,
            }}
          >
            {formatTooltip(values[hoveredIndex] ?? 0, hoveredIndex)}
          </div>
        )}

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes sparkline-draw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes sparkline-bar-grow {
            to {
              transform: scaleY(1);
            }
          }

          .animate-sparkline-dot {
            animation: sparkline-dot-pulse 0.3s ease-out 0.8s forwards;
            opacity: 0;
          }

          @keyframes sparkline-dot-pulse {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              transform: scale(1.3);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    )
  }
)

SparklineChart.displayName = 'SparklineChart'

export { SparklineChart, sparklineChartVariants }
