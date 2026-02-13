'use client'

import * as React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Clock,
  MapPin,
  Users as UsersIcon,
  X,
  Trash2,
  Edit3,
  CalendarDays,
  Repeat,
  TrendingUp,
  BarChart3,
  Zap,
  Sparkles,
} from 'lucide-react'

import { cn } from '@shared/utils/cn'
import { MiniCalendar } from '@core/patterns/MiniCalendar'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// TYPES
// ============================================================================

type CalendarViewType = 'month' | 'week' | 'day'

type EventCategory = 'personal' | 'work' | 'family' | 'holidays' | 'birthdays'

interface CalEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  category: EventCategory
  description?: string
  location?: string
  attendees?: { name: string; avatar?: string }[]
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly'
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; dot: string; border: string; gradient: string }> = {
  personal: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500', border: 'border-blue-500', gradient: 'from-blue-500 to-cyan-500' },
  work: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500', border: 'border-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
  family: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500', border: 'border-purple-500', gradient: 'from-purple-500 to-violet-500' },
  holidays: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500', border: 'border-orange-500', gradient: 'from-orange-500 to-amber-500' },
  birthdays: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500', border: 'border-red-500', gradient: 'from-red-500 to-pink-500' },
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  personal: 'Personal',
  work: 'Work',
  family: 'Family',
  holidays: 'Holidays',
  birthdays: 'Birthdays',
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ============================================================================
// MOCK DATA
// ============================================================================

function createDate(year: number, month: number, day: number, hour = 0, minute = 0): Date {
  return new Date(year, month - 1, day, hour, minute)
}

const MOCK_EVENTS: CalEvent[] = [
  {
    id: '1', title: 'Team Standup', start: createDate(2026, 2, 9, 9, 0), end: createDate(2026, 2, 9, 9, 30),
    category: 'work', description: 'Daily team sync meeting', location: 'Meeting Room A',
    attendees: [{ name: 'Sarah Chen' }, { name: 'Mike Johnson' }, { name: 'Emily Davis' }], repeat: 'daily',
  },
  {
    id: '2', title: 'Dentist Appointment', start: createDate(2026, 2, 10, 14, 0), end: createDate(2026, 2, 10, 15, 0),
    category: 'personal', description: 'Regular checkup with Dr. Smith', location: '123 Medical Center Blvd',
  },
  {
    id: '3', title: 'Project Deadline', start: createDate(2026, 2, 15, 0, 0), end: createDate(2026, 2, 15, 23, 59),
    category: 'work', allDay: true, description: 'Q1 deliverables due',
  },
  {
    id: '4', title: "Mom's Birthday", start: createDate(2026, 2, 20, 0, 0), end: createDate(2026, 2, 20, 23, 59),
    category: 'family', allDay: true, description: 'Dinner reservation at 7pm',
  },
  {
    id: '5', title: 'Conference Call', start: createDate(2026, 2, 12, 15, 0), end: createDate(2026, 2, 12, 16, 30),
    category: 'work', description: 'Client quarterly review', location: 'Zoom', attendees: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
  },
  {
    id: '6', title: 'Gym Session', start: createDate(2026, 2, 8, 7, 0), end: createDate(2026, 2, 8, 8, 30),
    category: 'personal', description: 'Leg day workout', location: 'FitLife Gym', repeat: 'weekly',
  },
  {
    id: '7', title: 'Sprint Planning', start: createDate(2026, 2, 11, 10, 0), end: createDate(2026, 2, 11, 12, 0),
    category: 'work', description: 'Sprint 24 planning', location: 'Conference Room B',
    attendees: [{ name: 'Sarah Chen' }, { name: 'Mike Johnson' }, { name: 'Emily Davis' }, { name: 'Alex Kim' }],
  },
  {
    id: '8', title: "Valentine's Day Dinner", start: createDate(2026, 2, 14, 19, 0), end: createDate(2026, 2, 14, 21, 30),
    category: 'personal', description: 'Reservation at La Maison', location: 'La Maison Restaurant',
  },
  {
    id: '9', title: 'Presidents Day', start: createDate(2026, 2, 16, 0, 0), end: createDate(2026, 2, 16, 23, 59),
    category: 'holidays', allDay: true,
  },
  {
    id: '10', title: 'Team Retrospective', start: createDate(2026, 2, 13, 14, 0), end: createDate(2026, 2, 13, 15, 0),
    category: 'work', description: 'Sprint 23 retro', location: 'Meeting Room C',
  },
  {
    id: '11', title: 'Family Brunch', start: createDate(2026, 2, 22, 11, 0), end: createDate(2026, 2, 22, 13, 0),
    category: 'family', description: 'Monthly family get-together', location: "Grandma's house",
    attendees: [{ name: 'Mom' }, { name: 'Dad' }, { name: 'Sister' }],
  },
  {
    id: '12', title: 'Product Demo', start: createDate(2026, 2, 18, 14, 0), end: createDate(2026, 2, 18, 15, 30),
    category: 'work', description: 'Demo new features to stakeholders', location: 'Main Auditorium',
  },
  {
    id: '13', title: 'Code Review', start: createDate(2026, 2, 9, 14, 0), end: createDate(2026, 2, 9, 15, 0),
    category: 'work', description: 'Review PR #456',
  },
  {
    id: '14', title: 'Yoga Class', start: createDate(2026, 2, 10, 18, 0), end: createDate(2026, 2, 10, 19, 0),
    category: 'personal', description: 'Evening yoga', location: 'Zen Studio', repeat: 'weekly',
  },
  {
    id: '15', title: 'Budget Review', start: createDate(2026, 2, 19, 11, 0), end: createDate(2026, 2, 19, 12, 0),
    category: 'work', description: 'Monthly budget review with finance',
  },
  {
    id: '16', title: 'Design Workshop', start: createDate(2026, 2, 24, 9, 0), end: createDate(2026, 2, 24, 17, 0),
    category: 'work', allDay: true, description: 'Full day UX design workshop',
  },
  {
    id: '17', title: "Jake's Birthday", start: createDate(2026, 2, 25, 0, 0), end: createDate(2026, 2, 25, 23, 59),
    category: 'birthdays', allDay: true,
  },
  {
    id: '18', title: 'Lunch with Sarah', start: createDate(2026, 2, 8, 12, 0), end: createDate(2026, 2, 8, 13, 0),
    category: 'personal', description: 'Catch up over lunch', location: 'Cafe Nero',
  },
]

const calendarStats = {
  totalEvents: 18,
  todayEvents: 3,
  thisWeekEvents: 8,
  categories: { work: 9, personal: 5, family: 2, holidays: 1, birthdays: 1 } as Record<EventCategory, number>,
  busyHours: [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 2, 2, 1, 2, 3, 2, 1, 1, 1, 1, 0, 0, 0, 0],
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatHour(hour: number): string {
  if (hour === 0) return '12 AM'
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return '12 PM'
  return `${hour - 12} PM`
}

function getCalendarDays(year: number, month: number): Date[] {
  const days: Date[] = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Pad start
  const startPad = firstDay.getDay()
  for (let i = startPad - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i))
  }
  // Month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d))
  }
  // Pad end
  while (days.length < 42) {
    const last = days[days.length - 1]!
    const next = new Date(last)
    next.setDate(next.getDate() + 1)
    days.push(next)
  }
  return days
}

function getWeekDays(date: Date): Date[] {
  const day = date.getDay()
  const start = new Date(date)
  start.setDate(start.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d
  })
}

function getEventsForDay(events: CalEvent[], date: Date, filters: Record<EventCategory, boolean>): CalEvent[] {
  return events.filter(e => filters[e.category] && isSameDay(e.start, date))
}

function getEventsForHour(events: CalEvent[], date: Date, hour: number, filters: Record<EventCategory, boolean>): CalEvent[] {
  return events.filter(e => {
    if (!filters[e.category]) return false
    if (e.allDay) return false
    if (!isSameDay(e.start, date)) return false
    return e.start.getHours() === hour
  })
}

function getAllDayEvents(events: CalEvent[], date: Date, filters: Record<EventCategory, boolean>): CalEvent[] {
  return events.filter(e => filters[e.category] && e.allDay && isSameDay(e.start, date))
}

function getRelativeTimeLabel(date: Date): string {
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays <= 7) return `In ${diffDays} days`
  if (diffDays <= 14) return 'Next week'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ============================================================================
// EVENT DETAIL MODAL
// ============================================================================

function EventDetailModal({ event, onClose, onEdit, onDelete }: {
  event: CalEvent
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const colors = CATEGORY_COLORS[event.category]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Premium gradient top bar */}
        <div className={cn('h-1 bg-gradient-to-r', colors.gradient)} />

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('h-3 w-3 rounded-full bg-gradient-to-br shadow-sm', colors.gradient)} />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">{event.title}</h2>
            </div>
            <button onClick={onClose} className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">
                {event.allDay ? 'All day' : `${formatTime(event.start)} – ${formatTime(event.end)}`}
                {' · '}
                {event.start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={16} className="text-[var(--text-muted)]" />
              <Badge variant="default" size="sm" className={cn('border-0 bg-gradient-to-r text-white shadow-sm', colors.gradient)}>
                {CATEGORY_LABELS[event.category]}
              </Badge>
            </div>

            {event.location && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)]">{event.location}</span>
              </div>
            )}

            {event.description && (
              <p className="text-sm text-[var(--text-secondary)] pl-7">{event.description}</p>
            )}

            {event.repeat && event.repeat !== 'none' && (
              <div className="flex items-center gap-3 text-sm">
                <Repeat size={16} className="text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)] capitalize">{event.repeat}</span>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-start gap-3 text-sm">
                <UsersIcon size={16} className="mt-0.5 text-[var(--text-muted)]" />
                <div className="flex flex-wrap gap-2">
                  {event.attendees.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-full bg-[var(--bg-muted)] px-2.5 py-1">
                      <Avatar size="xs" fallback={a.name.charAt(0)} alt={a.name} />
                      <span className="text-xs text-[var(--text-secondary)]">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="danger-outline" size="sm" onClick={onDelete}>
              <Trash2 size={14} /> Delete
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit3 size={14} /> Edit
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// CREATE/EDIT EVENT MODAL
// ============================================================================

function EventFormModal({ event, initialDate, onClose, onSave }: {
  event?: CalEvent
  initialDate?: Date
  onClose: () => void
  onSave: (data: Partial<CalEvent>) => void
}) {
  const [title, setTitle] = React.useState(event?.title ?? '')
  const [category, setCategory] = React.useState<EventCategory>(event?.category ?? 'personal')
  const [allDay, setAllDay] = React.useState(event?.allDay ?? false)
  const [description, setDescription] = React.useState(event?.description ?? '')
  const [location, setLocation] = React.useState(event?.location ?? '')
  const [repeat, setRepeat] = React.useState<'none' | 'daily' | 'weekly' | 'monthly'>(event?.repeat ?? 'none')

  const defaultDate = initialDate ?? event?.start ?? new Date()
  const [startDate, setStartDate] = React.useState(defaultDate.toISOString().slice(0, 10))
  const [startTime, setStartTime] = React.useState(event ? formatTime(event.start) : '09:00')
  const [endTime, setEndTime] = React.useState(event ? formatTime(event.end) : '10:00')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      title,
      category,
      allDay,
      description,
      location,
      repeat: repeat as CalEvent['repeat'],
      start: new Date(startDate + 'T' + (allDay ? '00:00' : startTime)),
      end: new Date(startDate + 'T' + (allDay ? '23:59' : endTime)),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Premium gradient top bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button onClick={onClose} className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add title..."
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              autoFocus
            />
          </div>

          {/* Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors">
                <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} className="accent-indigo-500" />
                All day
              </label>
            </div>
          </div>

          {/* Time */}
          {!allDay && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                />
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Category</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_LABELS) as EventCategory[]).map(cat => {
                const c = CATEGORY_COLORS[cat]
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border',
                      category === cat
                        ? cn('border-transparent bg-gradient-to-r text-white shadow-sm', c.gradient)
                        : 'border-[var(--border-default)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)]'
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', category === cat ? 'bg-white/80' : c.dot)} />
                    {CATEGORY_LABELS[cat]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add description..."
              rows={2}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Add location..."
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>

          {/* Repeat */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Repeat</label>
            <select
              value={repeat}
              onChange={e => setRepeat(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly')}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-violet-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {event ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================================================
// MONTH VIEW
// ============================================================================

function MonthView({ currentDate, events, filters, onEventClick, onDayClick }: {
  currentDate: Date
  events: CalEvent[]
  filters: Record<EventCategory, boolean>
  onEventClick: (e: CalEvent) => void
  onDayClick: (d: Date) => void
}) {
  const today = new Date()
  const days = getCalendarDays(currentDate.getFullYear(), currentDate.getMonth())

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-[var(--border-default)] bg-gradient-to-r from-indigo-50/30 via-transparent to-violet-50/30 dark:from-indigo-950/10 dark:via-transparent dark:to-violet-950/10">
        {WEEKDAYS_SHORT.map((d, i) => (
          <div key={d} className={cn(
            'px-2 py-2 text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider',
            (i === 0 || i === 6) && 'text-[var(--text-muted)]/60'
          )}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {days.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth()
          const isToday = isSameDay(date, today)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const dayEvents = getEventsForDay(events, date, filters)

          return (
            <div
              key={idx}
              className={cn(
                'group relative min-h-[100px] border-b border-r border-[var(--border-default)] p-1.5 transition-colors cursor-pointer',
                'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10',
                !isCurrentMonth && 'bg-[var(--bg-subtle)]',
                isWeekend && isCurrentMonth && 'bg-[var(--bg-subtle)]/30'
              )}
              onClick={() => onDayClick(date)}
            >
              <div className={cn(
                'mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all',
                isToday && 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/25',
                !isToday && isCurrentMonth && 'text-[var(--text-primary)]',
                !isToday && !isCurrentMonth && 'text-[var(--text-muted)]'
              )}>
                {date.getDate()}
              </div>

              <div className="space-y-0.5 overflow-hidden">
                {dayEvents.slice(0, 3).map(evt => {
                  const colors = CATEGORY_COLORS[evt.category]
                  return (
                    <button
                      key={evt.id}
                      onClick={e => { e.stopPropagation(); onEventClick(evt) }}
                      className={cn(
                        'flex w-full items-center gap-1 rounded px-1.5 py-0.5 text-left text-[11px] font-medium truncate transition-all border-l-2',
                        'hover:shadow-sm hover:brightness-95',
                        colors.bg, colors.text, colors.border
                      )}
                    >
                      {!evt.allDay && (
                        <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', colors.dot)} />
                      )}
                      <span className="truncate">{evt.allDay ? evt.title : `${formatTime(evt.start)} ${evt.title}`}</span>
                    </button>
                  )
                })}
                {dayEvents.length > 3 && (
                  <div className="px-1.5 text-[10px] font-medium text-[var(--text-muted)]">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// WEEK VIEW
// ============================================================================

function WeekView({ currentDate, events, filters, onEventClick, onDayClick }: {
  currentDate: Date
  events: CalEvent[]
  filters: Record<EventCategory, boolean>
  onEventClick: (e: CalEvent) => void
  onDayClick: (d: Date) => void
}) {
  const today = new Date()
  const weekDays = getWeekDays(currentDate)
  const currentHour = today.getHours()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = Math.max(0, (currentHour - 1) * 60)
    }
  }, [currentHour])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* All-day events row */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[var(--border-default)]">
        <div className="border-r border-[var(--border-default)] p-1 text-[10px] text-[var(--text-muted)]">
          all-day
        </div>
        {weekDays.map((d, i) => {
          const allDayEvts = getAllDayEvents(events, d, filters)
          return (
            <div key={i} className="min-h-[28px] border-r border-[var(--border-default)] p-0.5">
              {allDayEvts.map(evt => {
                const c = CATEGORY_COLORS[evt.category]
                return (
                  <button
                    key={evt.id}
                    onClick={() => onEventClick(evt)}
                    className={cn(
                      'w-full rounded px-1 py-0.5 text-[10px] font-medium truncate text-left transition-all',
                      'bg-gradient-to-r text-white shadow-sm',
                      c.gradient
                    )}
                  >
                    {evt.title}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[var(--border-default)]">
        <div className="border-r border-[var(--border-default)]" />
        {weekDays.map((d, i) => {
          const isToday = isSameDay(d, today)
          return (
            <div
              key={i}
              className={cn(
                'border-r border-[var(--border-default)] px-2 py-2 text-center cursor-pointer transition-colors',
                isToday
                  ? 'bg-indigo-50/50 dark:bg-indigo-900/10'
                  : 'hover:bg-[var(--bg-muted)]/50',
              )}
              onClick={() => onDayClick(d)}
            >
              <div className={cn(
                'text-[10px] font-medium uppercase',
                isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-[var(--text-muted)]'
              )}>
                {WEEKDAYS_SHORT[d.getDay()]}
              </div>
              <div className={cn(
                'mx-auto mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all',
                isToday ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/25' : 'text-[var(--text-primary)]'
              )}>
                {d.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="relative grid grid-cols-[60px_repeat(7,1fr)]">
          {/* Time labels */}
          <div className="border-r border-[var(--border-default)]">
            {HOURS.map(h => (
              <div key={h} className="relative h-[60px]">
                <span className="absolute -top-2.5 right-2 text-[10px] text-[var(--text-muted)]">
                  {h > 0 ? formatHour(h) : ''}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((d, dayIdx) => {
            const isToday = isSameDay(d, today)
            return (
              <div key={dayIdx} className={cn(
                'relative border-r border-[var(--border-default)]',
                isToday && 'bg-indigo-50/20 dark:bg-indigo-900/5'
              )}>
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="h-[60px] border-b border-[var(--border-default)]/50 hover:bg-[var(--bg-muted)]/30 transition-colors cursor-pointer"
                    onClick={() => {
                      const clickDate = new Date(d)
                      clickDate.setHours(h)
                      onDayClick(clickDate)
                    }}
                  >
                    {getEventsForHour(events, d, h, filters).map(evt => {
                      const c = CATEGORY_COLORS[evt.category]
                      const duration = (evt.end.getTime() - evt.start.getTime()) / 3600000
                      const minuteOffset = evt.start.getMinutes()
                      return (
                        <button
                          key={evt.id}
                          onClick={e => { e.stopPropagation(); onEventClick(evt) }}
                          style={{
                            height: `${Math.max(duration * 60, 24)}px`,
                            top: `${minuteOffset}px`,
                          }}
                          className={cn(
                            'absolute left-0.5 right-0.5 rounded px-1.5 py-0.5 text-[11px] font-medium overflow-hidden text-left z-10 border-l-3 shadow-sm transition-all',
                            'hover:shadow-md hover:scale-[1.02]',
                            c.bg, c.text, c.border
                          )}
                        >
                          <div className="truncate font-semibold">{evt.title}</div>
                          <div className="truncate opacity-75">{formatTime(evt.start)}</div>
                        </button>
                      )
                    })}
                  </div>
                ))}

                {/* Current time indicator */}
                {isToday && (
                  <div
                    className="absolute left-0 right-0 z-20 flex items-center"
                    style={{ top: `${currentHour * 60 + (new Date().getMinutes())}px` }}
                  >
                    <div className="h-2.5 w-2.5 -ml-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-red-500 to-transparent" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// DAY VIEW
// ============================================================================

function DayView({ currentDate, events, filters, onEventClick, onHourClick }: {
  currentDate: Date
  events: CalEvent[]
  filters: Record<EventCategory, boolean>
  onEventClick: (e: CalEvent) => void
  onHourClick: (d: Date) => void
}) {
  const today = new Date()
  const isToday = isSameDay(currentDate, today)
  const currentHour = today.getHours()
  const allDayEvts = getAllDayEvents(events, currentDate, filters)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = Math.max(0, (currentHour - 1) * 64)
    }
  }, [currentHour])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Day header */}
      <div className={cn(
        'border-b border-[var(--border-default)] px-4 py-3 text-center',
        isToday && 'bg-indigo-50/30 dark:bg-indigo-900/10'
      )}>
        <div className={cn(
          'text-xs font-medium uppercase',
          isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-[var(--text-muted)]'
        )}>
          {WEEKDAYS_LONG[currentDate.getDay()]}
        </div>
        <div className={cn(
          'mx-auto mt-1 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all',
          isToday ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/25' : 'text-[var(--text-primary)]'
        )}>
          {currentDate.getDate()}
        </div>
      </div>

      {/* All-day events */}
      {allDayEvts.length > 0 && (
        <div className="border-b border-[var(--border-default)] px-4 py-2 space-y-1">
          <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase">All Day</span>
          {allDayEvts.map(evt => {
            const c = CATEGORY_COLORS[evt.category]
            return (
              <button
                key={evt.id}
                onClick={() => onEventClick(evt)}
                className={cn(
                  'block w-full rounded-md px-3 py-1.5 text-sm font-medium text-left transition-all',
                  'bg-gradient-to-r text-white shadow-sm hover:shadow-md',
                  c.gradient
                )}
              >
                {evt.title}
              </button>
            )
          })}
        </div>
      )}

      {/* Time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="relative">
          {HOURS.map(h => {
            const hourEvents = getEventsForHour(events, currentDate, h, filters)
            return (
              <div
                key={h}
                className="flex h-[64px] border-b border-[var(--border-default)]/50 hover:bg-[var(--bg-muted)]/30 transition-colors cursor-pointer"
                onClick={() => {
                  const d = new Date(currentDate)
                  d.setHours(h)
                  onHourClick(d)
                }}
              >
                <div className="w-[60px] shrink-0 border-r border-[var(--border-default)] pr-2 pt-0 text-right">
                  <span className="text-[11px] text-[var(--text-muted)]">{formatHour(h)}</span>
                </div>
                <div className="relative flex-1 px-2">
                  {hourEvents.map(evt => {
                    const c = CATEGORY_COLORS[evt.category]
                    const duration = (evt.end.getTime() - evt.start.getTime()) / 3600000
                    return (
                      <button
                        key={evt.id}
                        onClick={e => { e.stopPropagation(); onEventClick(evt) }}
                        style={{ height: `${Math.max(duration * 64, 28)}px` }}
                        className={cn(
                          'absolute left-2 right-2 rounded-md px-3 py-1 text-left border-l-3 z-10 shadow-sm transition-all',
                          'hover:shadow-md hover:scale-[1.01]',
                          c.bg, c.text, c.border
                        )}
                      >
                        <div className="text-sm font-semibold truncate">{evt.title}</div>
                        <div className="text-xs opacity-75">{formatTime(evt.start)} - {formatTime(evt.end)}</div>
                        {evt.location && <div className="text-xs opacity-60 truncate">{evt.location}</div>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Current time line */}
          {isToday && (
            <div
              className="absolute left-[60px] right-0 z-20 flex items-center pointer-events-none"
              style={{ top: `${currentHour * 64 + (new Date().getMinutes() / 60) * 64}px` }}
            >
              <div className="h-3 w-3 -ml-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="h-[2px] flex-1 bg-gradient-to-r from-red-500 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN CALENDAR PAGE
// ============================================================================

export default function CalendarPage() {
  const [view, setView] = React.useState<CalendarViewType>('month')
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 1, 8)) // Feb 2026
  const [events, setEvents] = React.useState<CalEvent[]>(MOCK_EVENTS)
  const [selectedEvent, setSelectedEvent] = React.useState<CalEvent | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [editingEvent, setEditingEvent] = React.useState<CalEvent | undefined>()
  const [formInitialDate, setFormInitialDate] = React.useState<Date | undefined>()
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>()
  const [filters, setFilters] = React.useState<Record<EventCategory, boolean>>({
    personal: true,
    work: true,
    family: true,
    holidays: true,
    birthdays: false,
  })

  // Navigation
  const goToToday = () => setCurrentDate(new Date())

  const goPrev = () => {
    const d = new Date(currentDate)
    if (view === 'month') d.setMonth(d.getMonth() - 1)
    else if (view === 'week') d.setDate(d.getDate() - 7)
    else d.setDate(d.getDate() - 1)
    setCurrentDate(d)
  }

  const goNext = () => {
    const d = new Date(currentDate)
    if (view === 'month') d.setMonth(d.getMonth() + 1)
    else if (view === 'week') d.setDate(d.getDate() + 7)
    else d.setDate(d.getDate() + 1)
    setCurrentDate(d)
  }

  const headerTitle = React.useMemo(() => {
    if (view === 'month') return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    if (view === 'week') {
      const weekDays = getWeekDays(currentDate)
      const first = weekDays[0]!
      const last = weekDays[6]!
      if (first.getMonth() === last.getMonth()) {
        return `${MONTHS[first.getMonth()]} ${first.getDate()} – ${last.getDate()}, ${first.getFullYear()}`
      }
      return `${MONTHS[first.getMonth()]!.slice(0, 3)} ${first.getDate()} – ${MONTHS[last.getMonth()]!.slice(0, 3)} ${last.getDate()}, ${last.getFullYear()}`
    }
    return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }, [currentDate, view])

  // Upcoming events
  const upcomingEvents = React.useMemo(() => {
    const now = new Date()
    return events
      .filter(e => e.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 5)
  }, [events])

  // Event dates for mini calendar dots
  const eventDates = React.useMemo(() => {
    return events.filter(e => filters[e.category]).map(e => ({
      date: e.start,
      color: CATEGORY_COLORS[e.category].dot.replace('bg-', 'var(--') === 'bg-' ? undefined : undefined,
    }))
  }, [events, filters])

  const handleDayClick = (date: Date) => {
    setFormInitialDate(date)
    setEditingEvent(undefined)
    setShowForm(true)
  }

  const handleSaveEvent = (data: Partial<CalEvent>) => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...data } as CalEvent : e))
    } else {
      const newEvent: CalEvent = {
        id: `new-${Date.now()}`,
        title: data.title ?? 'Untitled',
        start: data.start ?? new Date(),
        end: data.end ?? new Date(),
        category: data.category ?? 'personal',
        allDay: data.allDay,
        description: data.description,
        location: data.location,
        repeat: data.repeat,
      }
      setEvents(prev => [...prev, newEvent])
    }
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
    setSelectedEvent(null)
  }

  const handleMiniCalendarClick = (date: Date) => {
    setSelectedDay(date)
    setCurrentDate(date)
    if (view === 'month') setView('day')
  }

  const toggleFilter = (cat: EventCategory) => {
    setFilters(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  return (
    <div className="flex h-[calc(100vh-80px)] gap-0 overflow-hidden">
      {/* ════════════════ SIDEBAR ════════════════ */}
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[var(--border-default)] lg:flex relative bg-gradient-to-b from-indigo-50/30 via-[var(--bg-base)] to-[var(--bg-base)] dark:from-indigo-950/10 dark:via-[var(--bg-base)] dark:to-[var(--bg-base)]">
        {/* Left gradient accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-purple-500" />

        <div className="flex flex-col gap-5 overflow-y-auto p-4 pl-3">
          {/* New Event Button — premium gradient */}
          <button
            onClick={() => { setEditingEvent(undefined); setFormInitialDate(undefined); setShowForm(true) }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <Plus size={16} /> New Event
          </button>

          {/* Mini Calendar — premium container */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-900/10 dark:to-violet-900/10">
            <div className="h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
            <div className="p-3">
              <MiniCalendar
                size="sm"
                value={selectedDay}
                defaultMonth={currentDate}
                onChange={handleMiniCalendarClick}
                events={events.filter(e => filters[e.category]).map(e => ({
                  date: e.start,
                  color: getComputedCategoryColor(e.category),
                }))}
              />
            </div>
          </div>

          {/* Filters — premium header + count badges */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">My Calendars</h3>
            </div>
            <div className="space-y-1">
              {(Object.keys(CATEGORY_LABELS) as EventCategory[]).map(cat => {
                const c = CATEGORY_COLORS[cat]
                const count = calendarStats.categories[cat]
                return (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[cat]}
                        onChange={() => toggleFilter(cat)}
                        className="peer sr-only"
                      />
                      <div className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border-2 transition-all',
                        filters[cat]
                          ? cn('border-transparent bg-gradient-to-br shadow-sm', c.gradient)
                          : 'border-[var(--border-default)] bg-transparent'
                      )}>
                        {filters[cat] && (
                          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="flex-1 text-sm text-[var(--text-primary)]">{CATEGORY_LABELS[cat]}</span>
                    {count != null && count > 0 && (
                      <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-muted)] rounded-full px-1.5 py-0.5">{count}</span>
                    )}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Upcoming Events — premium section */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Upcoming Events</h3>
            </div>
            <div className="space-y-1">
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-[var(--text-muted)] italic">No upcoming events</p>
              )}
              {upcomingEvents.map(evt => {
                const c = CATEGORY_COLORS[evt.category]
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="flex w-full items-start gap-2.5 rounded-lg border-l-2 border-transparent px-2 py-2 text-left transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 hover:border-l-2 hover:border-indigo-300 dark:hover:border-indigo-700"
                  >
                    <div className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br', c.gradient)} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate">{evt.title}</div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <span>{getRelativeTimeLabel(evt.start)}</span>
                        {!evt.allDay && <span>· {formatTime(evt.start)}</span>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* ════════════════ MAIN AREA ════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[var(--border-default)] px-4 py-3 lg:px-6">
          {/* Today's Events */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 dark:from-indigo-950/20 dark:to-indigo-900/10 px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-400" />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
              <CalendarDays size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">Today</div>
              <div className="text-base font-bold text-[var(--text-primary)]">{calendarStats.todayEvents} <span className="text-xs font-normal text-[var(--text-muted)]">events</span></div>
            </div>
          </div>

          {/* This Week */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-violet-50/50 to-violet-100/30 dark:from-violet-950/20 dark:to-violet-900/10 px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-violet-400" />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm">
              <BarChart3 size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">This Week</div>
              <div className="text-base font-bold text-[var(--text-primary)]">{calendarStats.thisWeekEvents} <span className="text-xs font-normal text-[var(--text-muted)]">events</span></div>
            </div>
          </div>

          {/* Busiest Category */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-emerald-900/10 px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400" />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
              <Zap size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">Busiest</div>
              <div className="text-base font-bold text-[var(--text-primary)]">Work <span className="text-xs font-normal text-[var(--text-muted)]">(9)</span></div>
            </div>
          </div>

          {/* Activity Trend */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400" />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">24h Activity</div>
              <div className="mt-0.5">
                <SparklineChart data={calendarStats.busyHours} type="area" width={80} height={28} color="#3B82F6" gradient showDot={false} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Premium icon badge */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-sm shadow-indigo-500/25">
              <CalendarDays size={16} className="text-white" />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={goPrev}
                className="rounded-md p-1.5 text-[var(--text-secondary)] hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
              <button
                onClick={goNext}
                className="rounded-md p-1.5 text-[var(--text-secondary)] hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">{headerTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle — premium gradient active */}
            <div className="flex rounded-lg border border-[var(--border-default)] p-0.5">
              {(['month', 'week', 'day'] as CalendarViewType[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium transition-all capitalize',
                    view === v
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/25'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                  )}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Mobile new event */}
            <Button variant="primary" size="sm" className="lg:hidden" onClick={() => { setEditingEvent(undefined); setFormInitialDate(undefined); setShowForm(true) }}>
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {/* Calendar Views */}
        {view === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            filters={filters}
            onEventClick={setSelectedEvent}
            onDayClick={handleDayClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            filters={filters}
            onEventClick={setSelectedEvent}
            onDayClick={handleDayClick}
          />
        )}
        {view === 'day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            filters={filters}
            onEventClick={setSelectedEvent}
            onHourClick={handleDayClick}
          />
        )}
      </div>

      {/* ════════════════ MODALS ════════════════ */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => {
            setEditingEvent(selectedEvent)
            setSelectedEvent(null)
            setShowForm(true)
          }}
          onDelete={() => handleDeleteEvent(selectedEvent.id)}
        />
      )}

      {showForm && (
        <EventFormModal
          event={editingEvent}
          initialDate={formInitialDate}
          onClose={() => { setShowForm(false); setEditingEvent(undefined) }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  )
}

// Helper to get CSS color value from category
function getComputedCategoryColor(category: EventCategory): string {
  const colorMap: Record<EventCategory, string> = {
    personal: '#3B82F6',
    work: '#10B981',
    family: '#8B5CF6',
    holidays: '#F97316',
    birthdays: '#EF4444',
  }
  return colorMap[category]
}
