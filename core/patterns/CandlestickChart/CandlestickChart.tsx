'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============================================================================
// CANDLESTICK CHART - Trading-style price chart
// ============================================================================

const candlestickChartVariants = cva('relative overflow-hidden', {
  variants: {
    size: {
      sm: 'h-48',
      md: 'h-64',
      lg: 'h-80',
      xl: 'h-96',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// ============================================================================
// TYPES
// ============================================================================

export interface CandleData {
  /** Time label or date string */
  time: string
  /** Opening price */
  open: number
  /** Highest price */
  high: number
  /** Lowest price */
  low: number
  /** Closing price */
  close: number
  /** Trading volume (optional) */
  volume?: number
}

export interface CandlestickChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof candlestickChartVariants> {
  /** Candlestick data */
  data: CandleData[]
  /** Color for bullish candles (close > open) */
  bullishColor?: string
  /** Color for bearish candles (close < open) */
  bearishColor?: string
  /** Show volume bars */
  showVolume?: boolean
  /** Show moving averages */
  showMA?: boolean
  /** MA periods */
  maPeriods?: number[]
  /** MA colors */
  maColors?: string[]
  /** Show grid lines */
  showGrid?: boolean
  /** Show price scale on right */
  showPriceScale?: boolean
  /** Current price highlight */
  currentPrice?: number
  /** High/Low markers */
  showHighLow?: boolean
  /** Animated */
  animated?: boolean
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateMA(data: CandleData[], period: number): (number | null)[] {
  return data.map((_, index) => {
    if (index < period - 1) return null
    const slice = data.slice(index - period + 1, index + 1)
    const sum = slice.reduce((acc, d) => acc + d.close, 0)
    return sum / period
  })
}

// ============================================================================
// COMPONENT
// ============================================================================

const CandlestickChart = React.forwardRef<HTMLDivElement, CandlestickChartProps>(
  (
    {
      className,
      size,
      data,
      bullishColor = '#22C55E',
      bearishColor = '#EF4444',
      showVolume = true,
      showMA = true,
      maPeriods = [7, 25],
      maColors = ['#FBBF24', '#8B5CF6'],
      showGrid = true,
      showPriceScale = true,
      currentPrice,
      showHighLow = true,
      animated = true,
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            candlestickChartVariants({ size }),
            'flex items-center justify-center text-[var(--text-muted)]',
            className
          )}
          {...props}
        >
          No data available
        </div>
      )
    }

    // Calculate bounds
    const allPrices = data.flatMap(d => [d.high, d.low])
    const minPrice = Math.min(...allPrices)
    const maxPrice = Math.max(...allPrices)
    const priceRange = maxPrice - minPrice
    const padding = priceRange * 0.1
    const adjustedMin = minPrice - padding
    const adjustedMax = maxPrice + padding
    const adjustedRange = adjustedMax - adjustedMin

    // Volume bounds
    const maxVolume = showVolume ? Math.max(...data.map(d => d.volume || 0)) : 0

    // Calculate MAs
    const maData = showMA
      ? maPeriods.map(period => calculateMA(data, period))
      : []

    // Chart dimensions (percentages)
    const chartHeight = showVolume ? 75 : 95 // Main chart area
    const volumeHeight = showVolume ? 20 : 0
    const candleWidth = 80 / data.length // % width per candle
    const candleGap = 20 / data.length // Gap between candles

    // Scale price to Y position
    const scaleY = (price: number) => {
      return ((adjustedMax - price) / adjustedRange) * chartHeight
    }

    // Find high/low points
    const highPoint = data.reduce((max, d, i) =>
      d.high > (data[max]?.high || 0) ? i : max, 0)
    const lowPoint = data.reduce((min, d, i) =>
      d.low < (data[min]?.low || Infinity) ? i : min, 0)

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>, index: number, candle: CandleData) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setHoveredIndex(index)
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    return (
      <div
        ref={ref}
        className={cn(candlestickChartVariants({ size }), 'group', className)}
        {...props}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Grid Lines */}
          {showGrid && (
            <g className="text-slate-200 dark:text-slate-700">
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y * chartHeight / 100}
                  x2="100"
                  y2={y * chartHeight / 100}
                  stroke="currentColor"
                  strokeWidth="0.1"
                  strokeDasharray="1,1"
                />
              ))}
            </g>
          )}

          {/* Moving Averages */}
          {showMA && maData.map((ma, maIndex) => {
            const points = ma
              .map((value, i) => {
                if (value === null) return null
                const x = (i + 0.5) * (100 / data.length)
                const y = scaleY(value)
                return `${x},${y}`
              })
              .filter(Boolean)
              .join(' ')

            return (
              <polyline
                key={`ma-${maPeriods[maIndex]}`}
                points={points}
                fill="none"
                stroke={maColors[maIndex] || '#888'}
                strokeWidth="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={animated ? 'opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]' : ''}
                style={{ animationDelay: `${maIndex * 0.2}s` }}
              />
            )
          })}

          {/* Candlesticks */}
          {data.map((candle, index) => {
            const isBullish = candle.close >= candle.open
            const color = isBullish ? bullishColor : bearishColor
            const x = index * (100 / data.length) + candleGap / 2
            const bodyTop = scaleY(Math.max(candle.open, candle.close))
            const bodyBottom = scaleY(Math.min(candle.open, candle.close))
            const bodyHeight = Math.max(bodyBottom - bodyTop, 0.5)
            const wickTop = scaleY(candle.high)
            const wickBottom = scaleY(candle.low)
            const isHovered = hoveredIndex === index

            return (
              <g
                key={index}
                className={cn(
                  'cursor-pointer transition-opacity',
                  animated && 'opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]'
                )}
                style={{ animationDelay: animated ? `${index * 0.02}s` : undefined }}
                onMouseEnter={(e) => handleMouseMove(e as unknown as React.MouseEvent<SVGSVGElement>, index, candle)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Wick */}
                <line
                  x1={x + candleWidth / 2}
                  y1={wickTop}
                  x2={x + candleWidth / 2}
                  y2={wickBottom}
                  stroke={color}
                  strokeWidth="0.15"
                />

                {/* Body */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={isBullish ? color : color}
                  stroke={color}
                  strokeWidth="0.1"
                  rx="0.1"
                  className={cn(
                    'transition-all duration-150',
                    isHovered && 'brightness-110'
                  )}
                />
              </g>
            )
          })}

          {/* Volume Bars */}
          {showVolume && (
            <g className="opacity-50">
              {data.map((candle, index) => {
                const isBullish = candle.close >= candle.open
                const color = isBullish ? bullishColor : bearishColor
                const x = index * (100 / data.length) + candleGap / 2
                const volumeRatio = (candle.volume || 0) / maxVolume
                const barHeight = volumeRatio * volumeHeight
                const y = chartHeight + 5 + (volumeHeight - barHeight)

                return (
                  <rect
                    key={`vol-${index}`}
                    x={x}
                    y={y}
                    width={candleWidth}
                    height={barHeight}
                    fill={color}
                    opacity={0.6}
                    rx="0.1"
                    className={animated ? 'opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]' : ''}
                    style={{ animationDelay: animated ? `${index * 0.01}s` : undefined }}
                  />
                )
              })}
            </g>
          )}

          {/* High/Low Markers */}
          {showHighLow && (
            <>
              <circle
                cx={(highPoint + 0.5) * (100 / data.length)}
                cy={scaleY(data[highPoint]?.high || 0)}
                r="0.8"
                fill={bullishColor}
                className="opacity-80"
              />
              <circle
                cx={(lowPoint + 0.5) * (100 / data.length)}
                cy={scaleY(data[lowPoint]?.low || 0)}
                r="0.8"
                fill={bearishColor}
                className="opacity-80"
              />
            </>
          )}

          {/* Current Price Line */}
          {currentPrice && (
            <g>
              <line
                x1="0"
                y1={scaleY(currentPrice)}
                x2="100"
                y2={scaleY(currentPrice)}
                stroke="#3B82F6"
                strokeWidth="0.15"
                strokeDasharray="0.5,0.5"
              />
              <rect
                x="95"
                y={scaleY(currentPrice) - 1.5}
                width="5"
                height="3"
                fill="#3B82F6"
                rx="0.3"
              />
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            className="pointer-events-none absolute z-20 rounded-lg bg-slate-900/95 px-3 py-2 text-xs text-white shadow-xl dark:bg-slate-100 dark:text-slate-900"
            style={{
              left: Math.min(tooltipPosition.x + 10, window.innerWidth - 200),
              top: tooltipPosition.y - 80,
            }}
          >
            <div className="space-y-1">
              <p className="font-medium">{data[hoveredIndex].time}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                <span className="text-slate-400 dark:text-slate-500">O:</span>
                <span className="text-right">${data[hoveredIndex].open.toLocaleString()}</span>
                <span className="text-slate-400 dark:text-slate-500">H:</span>
                <span className="text-right text-green-400">${data[hoveredIndex].high.toLocaleString()}</span>
                <span className="text-slate-400 dark:text-slate-500">L:</span>
                <span className="text-right text-red-400">${data[hoveredIndex].low.toLocaleString()}</span>
                <span className="text-slate-400 dark:text-slate-500">C:</span>
                <span className="text-right">${data[hoveredIndex].close.toLocaleString()}</span>
                {data[hoveredIndex].volume && (
                  <>
                    <span className="text-slate-400 dark:text-slate-500">Vol:</span>
                    <span className="text-right">{(data[hoveredIndex].volume! / 1000000).toFixed(1)}M</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Price Scale (Right) */}
        {showPriceScale && (
          <div className="absolute right-0 top-0 flex h-[75%] flex-col justify-between text-[10px] text-[var(--text-muted)]">
            <span>${adjustedMax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            <span>${((adjustedMax + adjustedMin) / 2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            <span>${adjustedMin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        )}

        {/* MA Legend */}
        {showMA && (
          <div className="absolute left-2 top-2 flex gap-3 text-[10px]">
            {maPeriods.map((period, i) => (
              <span key={period} className="flex items-center gap-1">
                <span
                  className="h-0.5 w-3 rounded"
                  style={{ backgroundColor: maColors[i] }}
                />
                MA({period})
              </span>
            ))}
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    )
  }
)

CandlestickChart.displayName = 'CandlestickChart'

export { CandlestickChart, candlestickChartVariants }
