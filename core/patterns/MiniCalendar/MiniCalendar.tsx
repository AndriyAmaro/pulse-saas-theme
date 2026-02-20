'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const miniCalendarVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'max-w-[260px]',
      md: 'max-w-[280px]',
      lg: 'max-w-[320px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const dayVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-9 w-9 text-sm',
      },
      state: {
        default:
          'text-[var(--text-primary)] hover:bg-[var(--bg-muted)] cursor-pointer',
        today:
          'border border-primary-500 text-primary-500 hover:bg-primary-500/10 cursor-pointer',
        selected:
          'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer',
        highlighted:
          'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400 hover:bg-accent-200 dark:hover:bg-accent-900/50 cursor-pointer',
        disabled: 'text-[var(--text-disabled)] cursor-not-allowed',
        outside: 'text-[var(--text-muted)] opacity-50 cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
)

export interface CalendarEvent {
  date: Date
  label?: string
  color?: string
}

export interface MiniCalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof miniCalendarVariants> {
  value?: Date
  defaultMonth?: Date
  highlightedDates?: Date[]
  events?: CalendarEvent[]
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  onChange?: (date: Date) => void
  onMonthChange?: (date: Date) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)

  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return days
}

function getCalendarDays(year: number, month: number, weekStartsOn: number): Date[] {
  const days = getDaysInMonth(year, month)
  if (days.length === 0) return []

  const firstDay = days[0] as Date
  const lastDay = days[days.length - 1] as Date

  // Days to prepend from previous month
  let startDayOfWeek = firstDay.getDay() - weekStartsOn
  if (startDayOfWeek < 0) startDayOfWeek += 7

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i)
    days.unshift(prevDate)
  }

  // Days to append from next month
  let endDayOfWeek = lastDay.getDay() - weekStartsOn
  if (endDayOfWeek < 0) endDayOfWeek += 7

  const daysToAdd = 6 - endDayOfWeek
  for (let i = 1; i <= daysToAdd; i++) {
    const nextDate = new Date(year, month + 1, i)
    days.push(nextDate)
  }

  // Ensure we always have 6 weeks (42 days) for consistent height
  while (days.length < 42) {
    const currentLastDay = days[days.length - 1] as Date
    const nextDate = new Date(currentLastDay)
    nextDate.setDate(nextDate.getDate() + 1)
    days.push(nextDate)
  }

  return days
}

const MiniCalendar = React.forwardRef<HTMLDivElement, MiniCalendarProps>(
  (
    {
      className,
      size,
      value,
      defaultMonth,
      highlightedDates = [],
      events = [],
      minDate,
      maxDate,
      disabledDates = [],
      weekStartsOn = 0,
      onChange,
      onMonthChange,
      ...props
    },
    ref
  ) => {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = React.useState(
      defaultMonth || value || today
    )

    const orderedWeekdays = React.useMemo(() => {
      return [...WEEKDAYS.slice(weekStartsOn), ...WEEKDAYS.slice(0, weekStartsOn)]
    }, [weekStartsOn])

    const calendarDays = React.useMemo(
      () =>
        getCalendarDays(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          weekStartsOn
        ),
      [currentMonth, weekStartsOn]
    )

    const goToPreviousMonth = () => {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
      setCurrentMonth(newDate)
      onMonthChange?.(newDate)
    }

    const goToNextMonth = () => {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
      setCurrentMonth(newDate)
      onMonthChange?.(newDate)
    }

    const handleDayClick = (date: Date) => {
      if (isDateDisabled(date)) return
      onChange?.(date)
    }

    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      if (disabledDates.some((d) => isSameDay(d, date))) return true
      return false
    }

    const isDateHighlighted = (date: Date): boolean => {
      return (
        highlightedDates.some((d) => isSameDay(d, date)) ||
        events.some((e) => isSameDay(e.date, date))
      )
    }

    const getDayState = (
      date: Date
    ): 'default' | 'today' | 'selected' | 'highlighted' | 'disabled' | 'outside' => {
      if (isDateDisabled(date)) return 'disabled'
      if (value && isSameDay(date, value)) return 'selected'
      if (isSameDay(date, today)) return 'today'
      if (isDateHighlighted(date)) return 'highlighted'
      if (!isSameMonth(date, currentMonth)) return 'outside'
      return 'default'
    }

    const getEventForDate = (date: Date): CalendarEvent | undefined => {
      return events.find((e) => isSameDay(e.date, date))
    }

    const monthYearLabel = currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

    const navButtonSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18

    return (
      <div
        ref={ref}
        className={cn(miniCalendarVariants({ size }), className)}
        role="application"
        aria-label="Calendar"
        {...props}
      >
        {/* Header with month navigation */}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Previous month"
          >
            <ChevronLeft size={navButtonSize} />
          </button>

          <h2 className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {monthYearLabel}
          </h2>

          <button
            type="button"
            onClick={goToNextMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Next month"
          >
            <ChevronRight size={navButtonSize} />
          </button>
        </div>

        {/* Weekday headers */}
        <div
          className="mb-1 grid grid-cols-7 gap-1"
          role="row"
          aria-label="Days of the week"
        >
          {orderedWeekdays.map((day) => (
            <div
              key={day}
              className={cn(
                'text-center font-medium text-[var(--text-muted)]',
                size === 'sm' ? 'text-xs' : 'text-xs'
              )}
              role="columnheader"
              aria-label={day}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          className="grid grid-cols-7 gap-1"
          role="grid"
          aria-label="Calendar days"
        >
          {calendarDays.map((date, index) => {
            const state = getDayState(date)
            const event = getEventForDate(date)
            const isClickable = state !== 'disabled'

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDayClick(date)}
                disabled={!isClickable}
                className={cn(dayVariants({ size, state }), 'relative')}
                aria-label={date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                aria-selected={state === 'selected'}
                aria-current={state === 'today' ? 'date' : undefined}
                tabIndex={isClickable ? 0 : -1}
              >
                {date.getDate()}
                {event && (
                  <span
                    className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    style={{
                      backgroundColor: event.color || 'var(--color-accent-500)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

MiniCalendar.displayName = 'MiniCalendar'

export { MiniCalendar, miniCalendarVariants, dayVariants }
