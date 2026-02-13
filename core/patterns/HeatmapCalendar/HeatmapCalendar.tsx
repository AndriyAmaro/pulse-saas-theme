'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// HEATMAP CALENDAR - GitHub contributions style calendar
// ============================================================================

const heatmapCalendarVariants = cva('inline-block', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// ============================================================================
// TYPES
// ============================================================================

export interface HeatmapDataPoint {
  date: string | Date
  value: number
  label?: string
}

export interface HeatmapCalendarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heatmapCalendarVariants> {
  /** Data points with date and value */
  data: HeatmapDataPoint[]
  /** Color scale (array of colors from lowest to highest) */
  colorScale?: string[]
  /** Number of weeks to show (default 52) */
  weeks?: number
  /** Start date (defaults to 1 year ago) */
  startDate?: Date
  /** Show weekday labels on the left */
  showWeekdayLabels?: boolean
  /** Show month labels on top */
  showMonthLabels?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Cell click handler */
  onCellClick?: (data: HeatmapDataPoint & { date: Date }) => void
  /** Custom tooltip formatter */
  tooltipFormatter?: (date: Date, value: number) => string
  /** Empty cell color */
  emptyColor?: string
  /** Cell gap in pixels */
  cellGap?: number
  /** Legend labels */
  legendLabels?: { less: string; more: string }
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_COLOR_SCALE = [
  '#ebedf0', // Empty / very low
  '#9be9a8', // Low
  '#40c463', // Medium
  '#30a14e', // High
  '#216e39', // Very high
]

const DARK_COLOR_SCALE = [
  '#161b22', // Empty
  '#0e4429', // Low
  '#006d32', // Medium
  '#26a641', // High
  '#39d353', // Very high
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getWeeksArray(startDate: Date, weeks: number): Date[][] {
  const result: Date[][] = []
  const current = new Date(startDate)

  // Adjust to start of week (Sunday)
  current.setDate(current.getDate() - current.getDay())

  for (let week = 0; week < weeks; week++) {
    const weekDays: Date[] = []
    for (let day = 0; day < 7; day++) {
      weekDays.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    result.push(weekDays)
  }

  return result
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? ''
}

function getColorIndex(
  value: number,
  maxValue: number,
  colorCount: number
): number {
  if (value === 0) return 0
  const ratio = value / maxValue
  return Math.min(Math.ceil(ratio * (colorCount - 1)), colorCount - 1)
}

// ============================================================================
// COMPONENT
// ============================================================================

const HeatmapCalendar = React.forwardRef<HTMLDivElement, HeatmapCalendarProps>(
  (
    {
      className,
      size = 'md',
      data,
      colorScale,
      weeks = 52,
      startDate,
      showWeekdayLabels = true,
      showMonthLabels = true,
      showLegend = true,
      onCellClick,
      tooltipFormatter,
      emptyColor,
      cellGap = 3,
      legendLabels = { less: 'Less', more: 'More' },
      ...props
    },
    ref
  ) => {
    const [hoveredCell, setHoveredCell] = React.useState<{
      date: Date
      value: number
      x: number
      y: number
    } | null>(null)
    const [isDark, setIsDark] = React.useState(false)

    // Detect dark mode
    React.useEffect(() => {
      const checkDarkMode = () => {
        setIsDark(document.documentElement.classList.contains('dark'))
      }
      checkDarkMode()
      const observer = new MutationObserver(checkDarkMode)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
      return () => observer.disconnect()
    }, [])

    const colors = colorScale || (isDark ? DARK_COLOR_SCALE : DEFAULT_COLOR_SCALE)

    // Calculate start date (default to 1 year ago)
    const calcStartDate = React.useMemo(() => {
      if (startDate) return startDate
      const date = new Date()
      date.setFullYear(date.getFullYear() - 1)
      date.setDate(date.getDate() + 1)
      return date
    }, [startDate])

    // Build weeks array
    const weeksArray = React.useMemo(
      () => getWeeksArray(calcStartDate, weeks),
      [calcStartDate, weeks]
    )

    // Build data map for quick lookup
    const dataMap = React.useMemo(() => {
      const map = new Map<string, number>()
      data.forEach((d) => {
        const date = typeof d.date === 'string' ? new Date(d.date) : d.date
        map.set(formatDate(date), d.value)
      })
      return map
    }, [data])

    // Find max value for color scaling
    const maxValue = React.useMemo(() => {
      return Math.max(...data.map((d) => d.value), 1)
    }, [data])

    // Size configs
    const sizeConfig = {
      sm: { cell: 8, fontSize: 8, gap: 2 },
      md: { cell: 11, fontSize: 10, gap: 3 },
      lg: { cell: 14, fontSize: 12, gap: 4 },
    }

    const config = sizeConfig[size || 'md']
    const actualGap = cellGap || config.gap

    // Calculate dimensions
    const labelWidth = showWeekdayLabels ? 28 : 0
    const labelHeight = showMonthLabels ? 16 : 0
    const gridWidth = weeks * (config.cell + actualGap) - actualGap
    const gridHeight = 7 * (config.cell + actualGap) - actualGap
    const totalWidth = gridWidth + labelWidth
    const totalHeight = gridHeight + labelHeight

    // Get month labels positions
    const monthLabels = React.useMemo(() => {
      const labels: { month: string; x: number }[] = []
      let lastMonth = -1

      weeksArray.forEach((week, weekIndex) => {
        const firstDayOfWeek = week[0]
        if (!firstDayOfWeek) return
        const month = firstDayOfWeek.getMonth()

        if (month !== lastMonth) {
          labels.push({
            month: MONTHS[month] ?? '',
            x: labelWidth + weekIndex * (config.cell + actualGap),
          })
          lastMonth = month
        }
      })

      return labels
    }, [weeksArray, labelWidth, config.cell, actualGap])

    const formatTooltip = (date: Date, value: number): string => {
      if (tooltipFormatter) {
        return tooltipFormatter(date, value)
      }
      const dateStr = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      return `${value} contributions on ${dateStr}`
    }

    const handleCellClick = (date: Date, value: number) => {
      if (onCellClick) {
        const originalData = data.find((d) => {
          const dDate = typeof d.date === 'string' ? new Date(d.date) : d.date
          return formatDate(dDate) === formatDate(date)
        })
        onCellClick({
          date,
          value,
          label: originalData?.label,
        })
      }
    }

    return (
      <div
        ref={ref}
        className={cn(heatmapCalendarVariants({ size }), 'relative overflow-x-auto', className)}
        {...props}
      >
        <svg
          width={totalWidth}
          height={totalHeight + (showLegend ? 24 : 0)}
          className="overflow-visible"
        >
          {/* Month labels */}
          {showMonthLabels && (
            <g>
              {monthLabels.map((label, i) => (
                <text
                  key={i}
                  x={label.x}
                  y={config.fontSize}
                  fontSize={config.fontSize}
                  className="fill-secondary-500 dark:fill-secondary-400"
                >
                  {label.month}
                </text>
              ))}
            </g>
          )}

          {/* Weekday labels */}
          {showWeekdayLabels && (
            <g>
              {[1, 3, 5].map((dayIndex) => (
                <text
                  key={dayIndex}
                  x={0}
                  y={
                    labelHeight +
                    dayIndex * (config.cell + actualGap) +
                    config.cell / 2 +
                    config.fontSize / 3
                  }
                  fontSize={config.fontSize}
                  className="fill-secondary-500 dark:fill-secondary-400"
                >
                  {WEEKDAYS[dayIndex]?.substring(0, 3) ?? ''}
                </text>
              ))}
            </g>
          )}

          {/* Grid cells */}
          <g transform={`translate(${labelWidth}, ${labelHeight})`}>
            {weeksArray.map((week, weekIndex) =>
              week.map((date, dayIndex) => {
                const dateStr = formatDate(date)
                const value = dataMap.get(dateStr) || 0
                const colorIndex = getColorIndex(value, maxValue, colors.length)
                const color = emptyColor && value === 0 ? emptyColor : (colors[colorIndex] ?? colors[0] ?? '#ebedf0')

                const x = weekIndex * (config.cell + actualGap)
                const y = dayIndex * (config.cell + actualGap)

                const today = new Date()
                const isToday = formatDate(date) === formatDate(today)
                const isFuture = date > today

                return (
                  <rect
                    key={dateStr}
                    x={x}
                    y={y}
                    width={config.cell}
                    height={config.cell}
                    rx={2}
                    fill={isFuture ? 'transparent' : color}
                    stroke={isToday ? 'currentColor' : 'none'}
                    strokeWidth={isToday ? 2 : 0}
                    className={cn(
                      'transition-all duration-100',
                      isToday && 'text-primary-500',
                      !isFuture && onCellClick && 'cursor-pointer hover:opacity-80'
                    )}
                    onMouseEnter={(e) => {
                      if (isFuture) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredCell({
                        date,
                        value,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      })
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => {
                      if (!isFuture) handleCellClick(date, value)
                    }}
                  />
                )
              })
            )}
          </g>

          {/* Legend */}
          {showLegend && (
            <g transform={`translate(${labelWidth}, ${totalHeight + 8})`}>
              <text
                x={gridWidth - 120}
                y={config.fontSize}
                fontSize={config.fontSize}
                className="fill-secondary-500 dark:fill-secondary-400"
              >
                {legendLabels.less}
              </text>
              {colors.map((color, i) => (
                <rect
                  key={i}
                  x={gridWidth - 85 + i * (config.cell + 2)}
                  y={0}
                  width={config.cell}
                  height={config.cell}
                  rx={2}
                  fill={color}
                />
              ))}
              <text
                x={gridWidth - 85 + colors.length * (config.cell + 2) + 4}
                y={config.fontSize}
                fontSize={config.fontSize}
                className="fill-secondary-500 dark:fill-secondary-400"
              >
                {legendLabels.more}
              </text>
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {hoveredCell && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-secondary-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-secondary-100 dark:text-secondary-900"
            style={{
              left: hoveredCell.x,
              top: hoveredCell.y - 8,
            }}
          >
            {formatTooltip(hoveredCell.date, hoveredCell.value)}
          </div>
        )}
      </div>
    )
  }
)

HeatmapCalendar.displayName = 'HeatmapCalendar'

export { HeatmapCalendar, heatmapCalendarVariants }
