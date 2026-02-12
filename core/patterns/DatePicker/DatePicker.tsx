'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const datePickerVariants = cva(
  [
    'flex items-center gap-2 rounded-md border bg-[var(--bg-base)]',
    'transition-all duration-150',
    'focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: 'border-[var(--border-default)]',
        error: 'border-error-base focus-within:ring-error-base/20 focus-within:border-error-base',
        success: 'border-success-base focus-within:ring-success-base/20 focus-within:border-success-base',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
)

const calendarVariants = cva(
  [
    'absolute z-50 mt-1 rounded-lg border bg-[var(--bg-base)] p-4 shadow-lg',
    'animate-in fade-in-0 zoom-in-95',
  ],
  {
    variants: {
      position: {
        bottom: 'top-full',
        top: 'bottom-full',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
)

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  format?: (date: Date) => string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  clearable?: boolean
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      size,
      state,
      value,
      onChange,
      placeholder = 'Select date',
      format = (date) => date.toLocaleDateString(),
      minDate,
      maxDate,
      disabled = false,
      clearable = true,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())
    const containerRef = React.useRef<HTMLDivElement>(null)

    const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    React.useEffect(() => {
      if (value) {
        setViewDate(value)
      }
    }, [value])

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDayOfWeek = firstDay.getDay()

      const days: (Date | null)[] = []

      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null)
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i))
      }

      return days
    }

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    }

    const isSameDay = (date1: Date | null, date2: Date | null) => {
      if (!date1 || !date2) return false
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      )
    }

    const isToday = (date: Date) => isSameDay(date, new Date())

    const handleDateSelect = (date: Date) => {
      onChange?.(date)
      setIsOpen(false)
    }

    const navigateMonth = (delta: number) => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1))
    }

    const navigateYear = (delta: number) => {
      setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1))
    }

    const days = getDaysInMonth(viewDate)

    return (
      <div ref={containerRef} className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            datePickerVariants({ size, state }),
            disabled && 'opacity-50 pointer-events-none',
            'cursor-pointer',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              !disabled && setIsOpen(!isOpen)
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          {...props}
        >
          <Calendar className={cn(iconSize, 'text-[var(--text-muted)]')} />
          <span className={cn(value ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
            {value ? format(value) : placeholder}
          </span>
        </div>

        {isOpen && (
          <div className={cn(calendarVariants({ position: 'bottom' }), 'w-72')}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => navigateYear(-1)}
                  className="p-1 rounded hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Previous year"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateMonth(-1)}
                  className="p-1 rounded hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <span className="font-medium text-[var(--text-primary)]">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => navigateMonth(1)}
                  className="p-1 rounded hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateYear(1)}
                  className="p-1 rounded hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Next year"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-[var(--text-muted)] py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div key={index} className="aspect-square">
                  {date && (
                    <button
                      type="button"
                      onClick={() => !isDateDisabled(date) && handleDateSelect(date)}
                      disabled={isDateDisabled(date)}
                      className={cn(
                        'w-full h-full flex items-center justify-center rounded-md text-sm',
                        'transition-colors duration-150',
                        'hover:bg-primary-500/10 hover:text-primary-500',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                        isDateDisabled(date) && 'opacity-50 pointer-events-none',
                        isSameDay(date, value || null) && 'bg-primary-500 text-white hover:bg-primary-600 hover:text-white',
                        isToday(date) && !isSameDay(date, value || null) && 'border border-primary-500 text-primary-500'
                      )}
                    >
                      {date.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {clearable && value && (
              <div className="mt-3 pt-3 border-t border-[var(--border-default)]">
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(null)
                    setIsOpen(false)
                  }}
                  className="w-full text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Clear date
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export { DatePicker, datePickerVariants, calendarVariants }
