'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Calendar, Users, Clock, Phone, AlertCircle } from 'lucide-react'
import { cn } from '@shared/utils/cn'

// ============================================================================
// RESERVATION TIMELINE - Visual timeline of restaurant reservations
// ============================================================================

const reservationTimelineVariants = cva(
  [
    'rounded-xl border p-5',
    'bg-white dark:bg-slate-900',
    'border-slate-200/60 dark:border-slate-700/50',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export type ReservationStatus = 'confirmed' | 'pending' | 'seated' | 'completed' | 'cancelled' | 'no-show'

export interface Reservation {
  id: string
  guestName: string
  partySize: number
  time: string // HH:MM format
  tableNumber?: string
  status: ReservationStatus
  phone?: string
  notes?: string
  duration?: number // in minutes
}

export interface ReservationTimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reservationTimelineVariants> {
  /** List of reservations */
  reservations: Reservation[]
  /** Start time for the timeline (HH:MM) */
  startTime?: string
  /** End time for the timeline (HH:MM) */
  endTime?: string
  /** Time slot interval in minutes */
  interval?: number
  /** Current time (HH:MM) for highlighting */
  currentTime?: string
  /** On reservation click */
  onReservationClick?: (reservation: Reservation) => void
  /** Title */
  title?: string
}

// ============================================================================
// STATUS CONFIG
// ============================================================================

const statusConfig: Record<ReservationStatus, {
  bg: string
  border: string
  text: string
  dot: string
}> = {
  confirmed: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-l-green-500',
    text: 'text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
  },
  pending: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-l-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  seated: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-l-blue-500',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  completed: {
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    border: 'border-l-slate-400',
    text: 'text-slate-500 dark:text-slate-400',
    dot: 'bg-slate-400',
  },
  cancelled: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-l-red-400',
    text: 'text-red-600 dark:text-red-400',
    dot: 'bg-red-400',
  },
  'no-show': {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-l-slate-500',
    text: 'text-slate-600 dark:text-slate-400',
    dot: 'bg-slate-500',
  },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours || 0) * 60 + (minutes || 0)
}

function generateTimeSlots(start: string, end: string, interval: number): string[] {
  const slots: string[] = []
  let current = timeToMinutes(start)
  const endMins = timeToMinutes(end)

  while (current <= endMins) {
    const hours = Math.floor(current / 60)
    const mins = current % 60
    slots.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`)
    current += interval
  }

  return slots
}

// ============================================================================
// RESERVATION ITEM COMPONENT
// ============================================================================

interface ReservationItemProps {
  reservation: Reservation
  onClick?: () => void
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation, onClick }) => {
  const config = statusConfig[reservation.status]

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-3 rounded-r-lg border-l-4 transition-all duration-200',
        'hover:shadow-md hover:scale-[1.02]',
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--text-primary)] truncate">
              {reservation.guestName}
            </span>
            {reservation.status === 'pending' && (
              <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {reservation.partySize}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {reservation.time}
            </span>
            {reservation.tableNumber && (
              <span>Table {reservation.tableNumber}</span>
            )}
          </div>
          {reservation.notes && (
            <p className="text-xs text-[var(--text-muted)] mt-1 italic truncate">
              {reservation.notes}
            </p>
          )}
        </div>
        <span className={cn(
          'flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase',
          config.bg,
          config.text
        )}>
          {reservation.status}
        </span>
      </div>
    </button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ReservationTimeline = React.forwardRef<HTMLDivElement, ReservationTimelineProps>(
  (
    {
      className,
      variant,
      reservations,
      startTime = '11:00',
      endTime = '22:00',
      interval = 30,
      currentTime,
      onReservationClick,
      title = "Today's Reservations",
      ...props
    },
    ref
  ) => {
    const timeSlots = generateTimeSlots(startTime, endTime, interval)
    const currentMinutes = currentTime ? timeToMinutes(currentTime) : null

    // Group reservations by time slot
    const reservationsBySlot: Record<string, Reservation[]> = {}
    reservations.forEach(res => {
      const resMins = timeToMinutes(res.time)
      const slotTime = timeSlots.find((slot, idx) => {
        const slotMins = timeToMinutes(slot)
        const nextSlot = timeSlots[idx + 1]
        const nextSlotMins = nextSlot ? timeToMinutes(nextSlot) : slotMins + interval
        return resMins >= slotMins && resMins < nextSlotMins
      }) || res.time

      if (!reservationsBySlot[slotTime]) {
        reservationsBySlot[slotTime] = []
      }
      reservationsBySlot[slotTime].push(res)
    })

    // Stats
    const stats = {
      total: reservations.length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      pending: reservations.filter(r => r.status === 'pending').length,
      seated: reservations.filter(r => r.status === 'seated').length,
    }

    return (
      <div
        ref={ref}
        className={cn(reservationTimelineVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-500" />
              {title}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {stats.total} reservations • {stats.pending} pending
            </p>
          </div>
          <div className="flex items-center gap-2">
            {stats.pending > 0 && (
              <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium dark:bg-amber-900/30 dark:text-amber-400">
                {stats.pending} pending
              </span>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {timeSlots.map(slot => {
            const slotMins = timeToMinutes(slot)
            const isPast = currentMinutes !== null && slotMins < currentMinutes
            const isCurrent = currentMinutes !== null &&
              slotMins <= currentMinutes &&
              slotMins + interval > currentMinutes
            const slotReservations = reservationsBySlot[slot] || []

            return (
              <div
                key={slot}
                className={cn(
                  'relative pl-16 pb-4 border-l-2',
                  isPast ? 'border-slate-200 dark:border-slate-700' : 'border-primary-200 dark:border-primary-800',
                  isCurrent && 'border-primary-500 dark:border-primary-500'
                )}
              >
                {/* Time Label */}
                <div className={cn(
                  'absolute left-0 -translate-x-1/2 flex items-center justify-center w-12 h-6 rounded-full text-xs font-medium',
                  isCurrent
                    ? 'bg-primary-500 text-white'
                    : isPast
                      ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      : 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                )}>
                  {slot}
                </div>

                {/* Current Time Indicator */}
                {isCurrent && (
                  <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500 animate-pulse" style={{ top: '50%' }} />
                )}

                {/* Reservations */}
                {slotReservations.length > 0 ? (
                  <div className="space-y-2">
                    {slotReservations.map(reservation => (
                      <ReservationItem
                        key={reservation.id}
                        reservation={reservation}
                        onClick={() => onReservationClick?.(reservation)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-8 flex items-center">
                    <span className="text-xs text-[var(--text-muted)] italic">No reservations</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          {(['confirmed', 'pending', 'seated', 'completed'] as ReservationStatus[]).map(status => (
            <div key={status} className="flex items-center gap-1.5 text-xs">
              <span className={cn('w-2 h-2 rounded-full', statusConfig[status].dot)} />
              <span className="text-[var(--text-muted)] capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

ReservationTimeline.displayName = 'ReservationTimeline'

export { ReservationTimeline, reservationTimelineVariants, ReservationItem }
