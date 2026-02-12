'use client'

import * as React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Skeleton } from '@core/primitives/Skeleton'
import { EmptyState } from '@core/patterns/EmptyState'
import { BarChart3 } from 'lucide-react'

// ============ PULSE CHART COLORS ============

export const PULSE_CHART_COLORS = {
  primary: {
    light: '#14B89A',
    dark: '#2DD1B1',
  },
  secondary: {
    light: '#64748B',
    dark: '#94A3B8',
  },
  accent: {
    light: '#FBBF24',
    dark: '#FCD34D',
  },
  success: {
    light: '#22C55E',
    dark: '#4ADE80',
  },
  warning: {
    light: '#F97316',
    dark: '#FB923C',
  },
  error: {
    light: '#EF4444',
    dark: '#F87171',
  },
  info: {
    light: '#3B82F6',
    dark: '#60A5FA',
  },
  // Palette for multiple data series
  palette: [
    { light: '#14B89A', dark: '#2DD1B1' }, // Primary teal
    { light: '#3B82F6', dark: '#60A5FA' }, // Blue
    { light: '#F97316', dark: '#FB923C' }, // Orange
    { light: '#8B5CF6', dark: '#A78BFA' }, // Purple
    { light: '#EC4899', dark: '#F472B6' }, // Pink
    { light: '#22C55E', dark: '#4ADE80' }, // Green
    { light: '#FBBF24', dark: '#FCD34D' }, // Yellow
    { light: '#06B6D4', dark: '#22D3EE' }, // Cyan
  ],
} as const

// ============ TYPES ============

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut'

export interface ChartDataPoint {
  [key: string]: string | number | undefined
}

export interface ChartSeries {
  dataKey: string
  name?: string
  color?: string
  strokeWidth?: number
  fillOpacity?: number
  stackId?: string
}

export interface ChartWrapperProps extends VariantProps<typeof chartWrapperVariants> {
  // Chart configuration
  type: ChartType
  data: ChartDataPoint[]
  series: ChartSeries[]
  // Axis configuration
  xAxisKey?: string
  xAxisLabel?: string
  yAxisLabel?: string
  // Appearance
  height?: number | `${number}%`
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showLabels?: boolean
  animate?: boolean
  // States
  loading?: boolean
  emptyState?: {
    title?: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
  }
  // Custom renderers
  tooltipFormatter?: (value: number, name: string) => string
  labelFormatter?: (label: string) => string
  // Dark mode
  isDarkMode?: boolean
  // Styling
  className?: string
  containerClassName?: string
}

// ============ VARIANTS ============

const chartWrapperVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'min-h-[200px]',
      md: 'min-h-[300px]',
      lg: 'min-h-[400px]',
      xl: 'min-h-[500px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// ============ LOADING SKELETON ============

interface ChartSkeletonProps {
  type: ChartType
  height: number | `${number}%`
}

function ChartSkeleton({ type, height }: ChartSkeletonProps) {
  if (type === 'pie' || type === 'donut') {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <Skeleton variant="circular" width={200} height={200} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-4" style={{ height }}>
      {/* Y-axis skeleton */}
      <div className="flex gap-4 flex-1">
        <div className="flex flex-col justify-between w-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={32} height={12} />
          ))}
        </div>

        {/* Chart area skeleton */}
        <div className="flex-1 flex items-end gap-2">
          {type === 'bar' ? (
            // Bar chart skeleton
            Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height={`${30 + Math.random() * 60}%`}
                className="flex-1"
              />
            ))
          ) : (
            // Line/Area chart skeleton
            <div className="w-full h-full relative">
              <Skeleton width="100%" height="100%" />
            </div>
          )}
        </div>
      </div>

      {/* X-axis skeleton */}
      <div className="flex gap-4 ml-12">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} width={40} height={12} className="flex-1" />
        ))}
      </div>
    </div>
  )
}

// ============ CUSTOM TOOLTIP ============

interface PulseTooltipProps {
  active?: boolean
  payload?: Array<{
    value?: number
    name?: string
    color?: string
  }>
  label?: string | number
  tooltipFormatter?: (value: number, name: string) => string
  customLabelFormatter?: (label: string) => string
  isDarkMode?: boolean
}

function PulseTooltip({
  active,
  payload,
  label,
  tooltipFormatter,
  customLabelFormatter,
  isDarkMode,
}: PulseTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div
      className={cn(
        'rounded-lg border px-3 py-2 shadow-lg',
        isDarkMode
          ? 'border-secondary-600 bg-secondary-800'
          : 'border-secondary-200 bg-white'
      )}
    >
      <p
        className={cn(
          'mb-1 text-xs font-medium',
          isDarkMode ? 'text-secondary-200' : 'text-secondary-600'
        )}
      >
        {customLabelFormatter ? customLabelFormatter(String(label)) : label}
      </p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className={isDarkMode ? 'text-secondary-200' : 'text-secondary-600'}>
            {entry.name}:
          </span>
          <span
            className={cn(
              'font-medium',
              isDarkMode ? 'text-white' : 'text-secondary-900'
            )}
          >
            {tooltipFormatter
              ? tooltipFormatter(entry.value as number, entry.name as string)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ============ HOOK FOR DARK MODE ============

function useDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(false)

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

  return isDark
}

// ============ HELPER TO GET COLOR ============

function getColor(
  color: string | undefined,
  index: number,
  isDarkMode: boolean
): string {
  if (color) return color

  const paletteIndex = index % PULSE_CHART_COLORS.palette.length
  const paletteColor = PULSE_CHART_COLORS.palette[paletteIndex]

  if (!paletteColor) {
    return isDarkMode ? PULSE_CHART_COLORS.primary.dark : PULSE_CHART_COLORS.primary.light
  }

  return isDarkMode ? paletteColor.dark : paletteColor.light
}

// ============ MAIN COMPONENT ============

const ChartWrapper = React.forwardRef<HTMLDivElement, ChartWrapperProps>(
  (
    {
      type,
      data,
      series,
      xAxisKey = 'name',
      xAxisLabel,
      yAxisLabel,
      height = 300,
      size,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      showLabels = false,
      animate = true,
      loading = false,
      emptyState,
      tooltipFormatter,
      labelFormatter,
      isDarkMode: controlledDarkMode,
      className,
      containerClassName,
    },
    ref
  ) => {
    const detectedDarkMode = useDarkMode()
    const isDarkMode = controlledDarkMode ?? detectedDarkMode

    // Computed styles based on theme
    const gridColor = isDarkMode ? '#374151' : '#E2E8F0'
    const textColor = isDarkMode ? '#CBD5E1' : '#475569' // secondary-600 for light mode (better contrast)
    const backgroundColor = isDarkMode ? '#111827' : '#FFFFFF'

    // Check if data is empty
    const isEmpty = !data || data.length === 0

    // Handle loading state
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(chartWrapperVariants({ size }), className)}
        >
          <ChartSkeleton type={type} height={height} />
        </div>
      )
    }

    // Handle empty state
    if (isEmpty) {
      return (
        <div
          ref={ref}
          className={cn(
            chartWrapperVariants({ size }),
            'flex items-center justify-center',
            className
          )}
          style={{ minHeight: height }}
        >
          <EmptyState
            title={emptyState?.title ?? 'No data available'}
            description={emptyState?.description ?? 'There is no data to display in this chart.'}
            icon={emptyState?.icon ?? <BarChart3 className="h-6 w-6" />}
            action={emptyState?.action}
            size="sm"
          />
        </div>
      )
    }

    // Common chart props
    const commonAxisProps = {
      tick: { fill: textColor, fontSize: 12 },
      tickLine: { stroke: gridColor },
      axisLine: { stroke: gridColor },
    }

    // Render the appropriate chart type
    const renderChart = () => {
      switch (type) {
        case 'line':
          return (
            <LineChart data={data}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              )}
              <XAxis dataKey={xAxisKey} {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              {showTooltip && (
                <Tooltip
                  content={
                    <PulseTooltip
                      tooltipFormatter={tooltipFormatter}
                      customLabelFormatter={labelFormatter}
                      isDarkMode={isDarkMode}
                    />
                  }
                />
              )}
              {showLegend && (
                <Legend
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => (
                    <span style={{ color: textColor }}>{value}</span>
                  )}
                />
              )}
              {series.map((s, index) => (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stroke={getColor(s.color, index, isDarkMode)}
                  strokeWidth={s.strokeWidth ?? 2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  isAnimationActive={animate}
                />
              ))}
            </LineChart>
          )

        case 'bar':
          return (
            <BarChart data={data}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              )}
              <XAxis dataKey={xAxisKey} {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              {showTooltip && (
                <Tooltip
                  content={
                    <PulseTooltip
                      tooltipFormatter={tooltipFormatter}
                      customLabelFormatter={labelFormatter}
                      isDarkMode={isDarkMode}
                    />
                  }
                />
              )}
              {showLegend && (
                <Legend
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => (
                    <span style={{ color: textColor }}>{value}</span>
                  )}
                />
              )}
              {series.map((s, index) => (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  fill={getColor(s.color, index, isDarkMode)}
                  radius={[4, 4, 0, 0]}
                  stackId={s.stackId}
                  isAnimationActive={animate}
                />
              ))}
            </BarChart>
          )

        case 'area':
          return (
            <AreaChart data={data}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              )}
              <XAxis dataKey={xAxisKey} {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              {showTooltip && (
                <Tooltip
                  content={
                    <PulseTooltip
                      tooltipFormatter={tooltipFormatter}
                      customLabelFormatter={labelFormatter}
                      isDarkMode={isDarkMode}
                    />
                  }
                />
              )}
              {showLegend && (
                <Legend
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => (
                    <span style={{ color: textColor }}>{value}</span>
                  )}
                />
              )}
              {series.map((s, index) => {
                const color = getColor(s.color, index, isDarkMode)
                return (
                  <Area
                    key={s.dataKey}
                    type="monotone"
                    dataKey={s.dataKey}
                    name={s.name ?? s.dataKey}
                    stroke={color}
                    fill={color}
                    fillOpacity={s.fillOpacity ?? 0.2}
                    strokeWidth={s.strokeWidth ?? 2}
                    stackId={s.stackId}
                    isAnimationActive={animate}
                  />
                )
              })}
            </AreaChart>
          )

        case 'pie':
        case 'donut':
          const firstSeries = series[0]
          const pieData = firstSeries
            ? data.map((item) => ({
                name: item[xAxisKey] as string,
                value: item[firstSeries.dataKey] as number,
              }))
            : []

          // Bigger radius when no external labels
          const pieOuterRadius = showLabels ? '65%' : '80%'
          const pieInnerRadius = type === 'donut' ? (showLabels ? '45%' : '50%') : 0

          return (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={pieInnerRadius}
                outerRadius={pieOuterRadius}
                paddingAngle={type === 'donut' ? 4 : 0}
                isAnimationActive={animate}
                label={showLabels ? ({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%` : false
                }
                labelLine={showLabels ? { stroke: textColor } : false}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(undefined, index, isDarkMode)}
                  />
                ))}
              </Pie>
              {showTooltip && (
                <Tooltip
                  content={
                    <PulseTooltip
                      tooltipFormatter={tooltipFormatter}
                      customLabelFormatter={labelFormatter}
                      isDarkMode={isDarkMode}
                    />
                  }
                />
              )}
              {showLegend && (
                <Legend
                  formatter={(value) => (
                    <span style={{ color: textColor }}>{value}</span>
                  )}
                />
              )}
            </PieChart>
          )

        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={cn(chartWrapperVariants({ size }), className)}
      >
        <ResponsiveContainer
          width="100%"
          height={height}
          className={containerClassName}
        >
          {renderChart()}
        </ResponsiveContainer>
      </div>
    )
  }
)

ChartWrapper.displayName = 'ChartWrapper'

// ============ EXPORTS ============

export { ChartWrapper, chartWrapperVariants }
