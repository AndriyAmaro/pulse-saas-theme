'use client'

import * as React from 'react'
import {
  Headphones,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  MessageSquare,
  X,
  MoreHorizontal,
  ArrowUpRight,
  Phone,
  Mail,
  Bug,
  HelpCircle,
  CreditCard,
  Settings,
  Star,
  TrendingUp,
  TrendingDown,
  Zap,
  Activity,
  Target,
  Timer,
  RefreshCw,
  Filter,
  Download,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MOCK DATA - Help Desk / Customer Support
// ============================================================================

// System Status
type SystemStatus = 'operational' | 'partial' | 'major'
const systemStatus: {
  status: SystemStatus
  message: string
  lastUpdate: string
} = {
  status: 'operational',
  message: 'All Systems Operational',
  lastUpdate: '2 minutes ago',
}

// Queue Summary
const queueSummary = {
  unassigned: 12,
  inProgress: 34,
  waitingCustomer: 8,
  resolvedToday: 47,
}

// SLA Health
const slaHealth = {
  firstResponse: 94,
  resolutionTime: 87,
  customerSatisfaction: 4.6,
}

// Top Agents Online
const agentsOnline = [
  { id: '1', name: 'Sarah Johnson', avatar: '', ticketsToday: 12, status: 'online' as const },
  { id: '2', name: 'Mike Chen', avatar: '', ticketsToday: 9, status: 'online' as const },
  { id: '3', name: 'Emily Davis', avatar: '', ticketsToday: 15, status: 'online' as const },
  { id: '4', name: 'James Wilson', avatar: '', ticketsToday: 8, status: 'busy' as const },
  { id: '5', name: 'Lisa Anderson', avatar: '', ticketsToday: 11, status: 'online' as const },
]

// Alert Banner
const activeIncident = {
  active: true,
  severity: 'critical' as const,
  title: 'Payment system experiencing delays',
  description: 'Some customers may experience slower payment processing. Our team is investigating.',
  startedAt: '14 minutes ago',
}

// Ticket Volume (24 hours by hour)
const ticketVolumeData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  new: Math.floor(Math.random() * 15) + 5,
  inProgress: Math.floor(Math.random() * 20) + 10,
  resolved: Math.floor(Math.random() * 18) + 8,
}))

// Tickets by Priority
const ticketsByPriority = {
  critical: 3,
  high: 12,
  medium: 34,
  low: 18,
}

// Recent Tickets
interface Ticket {
  id: string
  subject: string
  customer: string
  customerEmail: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'waiting' | 'resolved'
  type: 'bug' | 'question' | 'feature' | 'billing'
  slaDeadline: Date
  agent: string | null
  createdAt: string
}

const recentTickets: Ticket[] = [
  { id: 'TKT-1234', subject: 'Cannot process payment on checkout', customer: 'Acme Inc', customerEmail: 'support@acme.com', priority: 'critical', status: 'in-progress', type: 'bug', slaDeadline: new Date(Date.now() + 1000 * 60 * 15), agent: 'Sarah Johnson', createdAt: '10 min ago' },
  { id: 'TKT-1233', subject: 'How to export data to CSV?', customer: 'TechFlow Ltd', customerEmail: 'help@techflow.io', priority: 'low', status: 'waiting', type: 'question', slaDeadline: new Date(Date.now() + 1000 * 60 * 60 * 4), agent: 'Mike Chen', createdAt: '25 min ago' },
  { id: 'TKT-1232', subject: 'Request for dark mode feature', customer: 'DataSync Corp', customerEmail: 'admin@datasync.co', priority: 'medium', status: 'open', type: 'feature', slaDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24), agent: null, createdAt: '45 min ago' },
  { id: 'TKT-1231', subject: 'Billing discrepancy on invoice #4521', customer: 'CloudNine Ltd', customerEmail: 'billing@cloudnine.com', priority: 'high', status: 'in-progress', type: 'billing', slaDeadline: new Date(Date.now() + 1000 * 60 * 45), agent: 'Emily Davis', createdAt: '1h ago' },
  { id: 'TKT-1230', subject: 'API returns 500 error intermittently', customer: 'StartupXYZ', customerEmail: 'dev@startupxyz.io', priority: 'critical', status: 'in-progress', type: 'bug', slaDeadline: new Date(Date.now() + 1000 * 60 * 8), agent: 'James Wilson', createdAt: '1.5h ago' },
  { id: 'TKT-1229', subject: 'Need help setting up SSO', customer: 'Enterprise Co', customerEmail: 'it@enterprise.com', priority: 'medium', status: 'waiting', type: 'question', slaDeadline: new Date(Date.now() + 1000 * 60 * 60 * 3), agent: 'Lisa Anderson', createdAt: '2h ago' },
  { id: 'TKT-1228', subject: 'Mobile app crashes on login', customer: 'MobileFirst Inc', customerEmail: 'support@mobilefirst.app', priority: 'high', status: 'open', type: 'bug', slaDeadline: new Date(Date.now() + 1000 * 60 * 90), agent: null, createdAt: '2.5h ago' },
  { id: 'TKT-1227', subject: 'Upgrade to enterprise plan', customer: 'GrowthCo', customerEmail: 'sales@growthco.io', priority: 'low', status: 'resolved', type: 'billing', slaDeadline: new Date(Date.now() - 1000 * 60 * 30), agent: 'Sarah Johnson', createdAt: '3h ago' },
]

// Response Time Trend (7 days)
const responseTimeTrend = [2.8, 2.5, 2.9, 2.4, 2.2, 2.6, 2.4]

// Customer Satisfaction Distribution
const satisfactionDistribution = [
  { stars: 5, percentage: 65, count: 152 },
  { stars: 4, percentage: 20, count: 47 },
  { stars: 3, percentage: 10, count: 23 },
  { stars: 2, percentage: 3, count: 7 },
  { stars: 1, percentage: 2, count: 5 },
]

// Categories Breakdown
const categoriesBreakdown = [
  { category: 'Technical Issue', percentage: 45, color: '#EF4444' },
  { category: 'Billing Question', percentage: 23, color: '#F59E0B' },
  { category: 'Feature Request', percentage: 15, color: '#8B5CF6' },
  { category: 'Account Access', percentage: 12, color: '#3B82F6' },
  { category: 'Other', percentage: 5, color: '#6B7280' },
]

// Live Feed Activities
const liveFeedActivities: ActivityItem[] = [
  { id: '1', type: 'success', title: 'Ticket #1234 resolved by Sarah', description: 'Payment issue fixed', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: '2', type: 'warning', title: 'New critical ticket from Acme Inc', description: 'API integration broken', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: '3', type: 'info', title: 'Mike assigned to TKT-1233', description: 'CSV export question', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
  { id: '4', type: 'success', title: 'Customer rated 5 stars', description: 'Great support experience!', timestamp: new Date(Date.now() - 1000 * 60 * 12) },
  { id: '5', type: 'default', title: 'Emily started shift', description: 'Now online', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: '6', type: 'warning', title: 'SLA warning: TKT-1230', description: '8 minutes remaining', timestamp: new Date(Date.now() - 1000 * 60 * 18) },
  { id: '7', type: 'info', title: 'New message on TKT-1229', description: 'Customer replied', timestamp: new Date(Date.now() - 1000 * 60 * 22) },
  { id: '8', type: 'success', title: 'James resolved TKT-1225', description: 'Login issue fixed', timestamp: new Date(Date.now() - 1000 * 60 * 28) },
  { id: '9', type: 'error', title: 'Escalation: TKT-1220', description: 'Moved to Tier 2 support', timestamp: new Date(Date.now() - 1000 * 60 * 35) },
  { id: '10', type: 'default', title: 'System: Daily report generated', description: 'View in reports', timestamp: new Date(Date.now() - 1000 * 60 * 42) },
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// SLA Countdown Timer Component
function SLACountdown({ deadline, className }: { deadline: Date; className?: string }) {
  const [timeLeft, setTimeLeft] = React.useState<string>('')
  const [urgency, setUrgency] = React.useState<'ok' | 'warning' | 'critical'>('ok')

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const diff = deadline.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft('OVERDUE')
        setUrgency('critical')
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${seconds}s`)
      }

      if (diff < 1000 * 60 * 15) {
        setUrgency('critical')
      } else if (diff < 1000 * 60 * 60) {
        setUrgency('warning')
      } else {
        setUrgency('ok')
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  const colors = {
    ok: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    warning: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    critical: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-pulse',
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-mono font-semibold ${colors[urgency]} ${className}`}>
      <Timer className="h-3 w-3" />
      {timeLeft}
    </span>
  )
}

// Pulsing Status Indicator
function StatusIndicator({ status }: { status: SystemStatus }) {
  const config = {
    operational: { color: 'bg-green-500', ring: 'ring-green-500/30', text: 'All Systems Operational' },
    partial: { color: 'bg-amber-500', ring: 'ring-amber-500/30', text: 'Partial Outage' },
    major: { color: 'bg-red-500', ring: 'ring-red-500/30', text: 'Major Incident' },
  }

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${config[status].color}`} />
        <span className={`relative inline-flex h-3 w-3 rounded-full ${config[status].color}`} />
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{config[status].text}</span>
    </div>
  )
}

// Priority Box Component
function PriorityBox({ label, count, color, pulse }: { label: string; count: number; color: string; pulse?: boolean }) {
  const colorMap: Record<string, string> = {
    red: 'border-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30',
    orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30',
    yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30',
  }

  const textColor: Record<string, string> = {
    red: 'text-red-700 dark:text-red-300',
    orange: 'text-orange-700 dark:text-orange-300',
    yellow: 'text-yellow-700 dark:text-yellow-300',
    green: 'text-green-700 dark:text-green-300',
  }

  return (
    <button className={`relative flex-1 rounded-lg border-2 p-3 text-center transition-all duration-200 ${colorMap[color]} cursor-pointer`}>
      {pulse && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
      )}
      <div className={`text-2xl font-bold ${textColor[color]}`}>{count}</div>
      <div className="text-xs text-[var(--text-muted)] mt-0.5">{label}</div>
    </button>
  )
}

// Table Columns
const ticketColumns: ColumnDef<Ticket>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    sortable: true,
    cell: ({ value, row }) => {
      const typeIcons: Record<string, typeof Bug> = {
        bug: Bug,
        question: HelpCircle,
        feature: Zap,
        billing: CreditCard,
      }
      const Icon = typeIcons[row.type] || HelpCircle
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[var(--text-muted)]" />
          <span className="font-mono text-sm font-medium text-primary-600 dark:text-primary-400">{String(value)}</span>
        </div>
      )
    },
  },
  {
    id: 'subject',
    accessorKey: 'subject',
    header: 'Subject',
    sortable: true,
    cell: ({ value }) => (
      <span className="text-sm font-medium text-[var(--text-primary)] line-clamp-1 max-w-[200px]">{String(value)}</span>
    ),
  },
  {
    id: 'customer',
    accessorKey: 'customer',
    header: 'Customer',
    sortable: true,
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    sortable: true,
    cell: ({ value }) => {
      const variants: Record<string, 'error' | 'warning' | 'info' | 'success'> = {
        critical: 'error',
        high: 'warning',
        medium: 'info',
        low: 'success',
      }
      return <Badge variant={variants[value as string]} size="sm">{value as string}</Badge>
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => {
      const variants: Record<string, 'error' | 'warning' | 'info' | 'success' | 'default'> = {
        open: 'default',
        'in-progress': 'info',
        waiting: 'warning',
        resolved: 'success',
      }
      const labels: Record<string, string> = {
        open: 'Open',
        'in-progress': 'In Progress',
        waiting: 'Waiting',
        resolved: 'Resolved',
      }
      return <Badge variant={variants[value as string]} size="sm">{labels[value as string]}</Badge>
    },
  },
  {
    id: 'slaDeadline',
    accessorKey: 'slaDeadline',
    header: 'SLA Timer',
    cell: ({ value, row }) => {
      if (row.status === 'resolved') {
        return <Badge variant="success" size="sm">Completed</Badge>
      }
      return <SLACountdown deadline={value as Date} />
    },
  },
  {
    id: 'agent',
    accessorKey: 'agent',
    header: 'Agent',
    cell: ({ value }) => {
      if (!value) {
        return <span className="text-xs text-[var(--text-muted)] italic">Unassigned</span>
      }
      return (
        <div className="flex items-center gap-2">
          <Avatar size="xs" fallback={(value as string).split(' ').map(n => n[0]).join('')} />
          <span className="text-sm text-[var(--text-secondary)]">{value as string}</span>
        </div>
      )
    },
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HelpDeskDashboard() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [showIncidentBanner, setShowIncidentBanner] = React.useState(activeIncident.active)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hidden md:block md:w-48" />
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Help Desk
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Customer support tickets and SLA management
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<MessageSquare className="h-4 w-4" />}>
            New Ticket
          </Button>
        </div>
      </div>

      {/* ====== PREMIUM HERO BANNER ====== */}
      {showIncidentBanner && (
        <div className="relative overflow-hidden rounded-2xl border border-red-200/30 dark:border-red-800/30 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950/40 dark:via-slate-900 dark:to-orange-950/30 shadow-lg shadow-red-500/5">
          {/* Top gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
          {/* Decorative radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.1),transparent_60%)]" />

          <div className="relative px-5 py-5 md:px-6 md:py-5">
            {/* Close button */}
            <button
              onClick={() => setShowIncidentBanner(false)}
              className="absolute top-3 right-3 rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-red-100/50 dark:hover:bg-red-900/30 transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* Icon + Badge */}
              <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2">
                <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
                  <AlertTriangle className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                  </span>
                </div>
                <Badge variant="error" size="sm" className="md:mt-0 whitespace-nowrap">
                  Critical
                </Badge>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight pr-8 md:pr-0">
                  {activeIncident.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activeIncident.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Clock className="h-3.5 w-3.5" />
                    Started {activeIncident.startedAt}
                  </div>
                  <div className="h-3 w-px bg-[var(--border-default)]" />
                  <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                    <Activity className="h-3.5 w-3.5" />
                    Investigating
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:flex-col md:gap-2">
                <Button variant="primary" size="sm" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 shadow-sm shadow-red-500/20 text-white">
                  View Incident
                </Button>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== MAIN 3-COLUMN LAYOUT (UNIQUE!) ====== */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* ===== LEFT COLUMN (25%) - STATUS PANEL ===== */}
        <div className="min-w-0 space-y-4 lg:col-span-1">
          {/* Live Status */}
          <Card className="border-l-4 border-l-green-500">
            <Card.Content>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Live Status
                </span>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-40" />
              ) : (
                <>
                  <StatusIndicator status={systemStatus.status} />
                  <p className="mt-2 text-xs text-[var(--text-muted)]">
                    Last updated: {systemStatus.lastUpdate}
                  </p>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Queue Summary */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary-500" />
                Queue Summary
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 rounded-lg" />
                ))
              ) : (
                <>
                  <div className={`flex items-center justify-between rounded-lg p-2 border-l-4 ${queueSummary.unassigned > 10 ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' : 'border-l-secondary-300 bg-secondary-50 dark:bg-secondary-800/50'}`}>
                    <span className="text-sm text-[var(--text-secondary)]">Unassigned</span>
                    <span className={`font-bold ${queueSummary.unassigned > 10 ? 'text-red-600 dark:text-red-400' : 'text-[var(--text-primary)]'}`}>
                      {queueSummary.unassigned}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <span className="text-sm text-[var(--text-secondary)]">In Progress</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{queueSummary.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
                    <span className="text-sm text-[var(--text-secondary)]">Waiting Customer</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{queueSummary.waitingCustomer}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
                    <span className="text-sm text-[var(--text-secondary)]">Resolved Today</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{queueSummary.resolvedToday}</span>
                  </div>
                </>
              )}
            </Card.Content>
          </Card>

          {/* SLA Health */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-primary-500" />
                SLA Health
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-xs text-[var(--text-muted)] mb-1">First Response</p>
                    <GaugeChart
                      value={slaHealth.firstResponse}
                      variant="donut"
                      size="sm"
                      color="#22C55E"
                      strokeWidth={8}
                      showPercentage
                    />
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">On Target</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[var(--text-muted)] mb-1">Resolution Time</p>
                    <GaugeChart
                      value={slaHealth.resolutionTime}
                      variant="donut"
                      size="sm"
                      color="#F59E0B"
                      strokeWidth={8}
                      showPercentage
                    />
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="text-xs text-amber-600 dark:text-amber-400">Needs Attention</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[var(--text-muted)] mb-1">Customer Satisfaction</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                      <span className="text-2xl font-bold text-[var(--text-primary)]">{slaHealth.customerSatisfaction}</span>
                      <span className="text-sm text-[var(--text-muted)]">/5</span>
                    </div>
                  </div>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Top Agents Online */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Headphones className="h-4 w-4 text-primary-500" />
                Top Agents Online
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-2">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 rounded-lg" />
                ))
              ) : (
                agentsOnline.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-2 rounded-lg p-2 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                    <div className="relative">
                      <Avatar size="sm" fallback={agent.name.split(' ').map(n => n[0]).join('')} />
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-secondary-900 ${agent.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{agent.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{agent.ticketsToday} tickets today</p>
                    </div>
                  </div>
                ))
              )}
            </Card.Content>
          </Card>
        </div>

        {/* ===== CENTER COLUMN (50%) - MAIN CONTENT ===== */}
        <div className="min-w-0 space-y-4 lg:col-span-2">
          {/* Tickets by Priority */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : (
            <Card className="bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900/50 dark:to-secondary-900">
              <Card.Content>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Tickets by Priority</span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <PriorityBox label="Critical" count={ticketsByPriority.critical} color="red" pulse={ticketsByPriority.critical > 0} />
                  <PriorityBox label="High" count={ticketsByPriority.high} color="orange" />
                  <PriorityBox label="Medium" count={ticketsByPriority.medium} color="yellow" />
                  <PriorityBox label="Low" count={ticketsByPriority.low} color="green" />
                </div>
              </Card.Content>
            </Card>
          )}

          {/* Ticket Volume Chart */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary-500" />
                    Ticket Volume
                  </Card.Title>
                  <Card.Description>Last 24 hours by status</Card.Description>
                </div>
                <Badge variant="info" size="sm" className="animate-pulse">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Live
                  </span>
                </Badge>
              </div>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <Skeleton className="h-64 rounded-lg" />
              ) : (
                <div className="-mx-6 sm:mx-0">
                  <ChartWrapper
                    type="area"
                    data={ticketVolumeData}
                    series={[
                      { dataKey: 'new', name: 'New', color: '#3B82F6', fillOpacity: 0.3 },
                      { dataKey: 'inProgress', name: 'In Progress', color: '#F59E0B', fillOpacity: 0.3 },
                      { dataKey: 'resolved', name: 'Resolved', color: '#22C55E', fillOpacity: 0.3 },
                    ]}
                    xAxisKey="hour"
                    height={280}
                    showLegend
                    showTooltip
                    showGrid
                  />
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Recent Tickets Table */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary-500" />
                    Recent Tickets
                  </Card.Title>
                  <Card.Description>Latest support requests with SLA tracking</Card.Description>
                </div>
                <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Content padding="none">
              {isLoading ? (
                <div className="space-y-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-lg" />
                  ))}
                </div>
              ) : (
                <>
                  {/* Mobile Carousel */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 py-4 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {recentTickets.map((ticket) => {
                      const defaultColors = { bg: 'from-blue-50 to-sky-50/50 dark:from-blue-950/30 dark:to-sky-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/60 dark:border-blue-800/40' }
                      const priorityColors = {
                        critical: { bg: 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200/60 dark:border-red-800/40' },
                        high: { bg: 'from-orange-50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200/60 dark:border-orange-800/40' },
                        medium: defaultColors,
                        low: { bg: 'from-green-50 to-emerald-50/50 dark:from-green-950/30 dark:to-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200/60 dark:border-green-800/40' },
                      } as const
                      const statusLabels: Record<string, string> = { open: 'Open', 'in-progress': 'In Progress', waiting: 'Waiting', resolved: 'Resolved' }
                      const statusVariants: Record<string, 'default' | 'info' | 'warning' | 'success'> = { open: 'default', 'in-progress': 'info', waiting: 'warning', resolved: 'success' }
                      const typeIcons: Record<string, typeof Bug> = { bug: Bug, question: HelpCircle, feature: Zap, billing: CreditCard }
                      const TypeIcon = typeIcons[ticket.type] || HelpCircle
                      const colors = priorityColors[ticket.priority] ?? defaultColors

                      return (
                        <div
                          key={ticket.id}
                          className={`snap-start shrink-0 w-[75vw] max-w-[280px] p-4 rounded-xl border bg-gradient-to-br ${colors.bg} ${colors.border}`}
                        >
                          {/* Header: ID + Priority */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-4 w-4 text-[var(--text-muted)]" />
                              <span className="font-mono text-sm font-semibold text-primary-600 dark:text-primary-400">{ticket.id}</span>
                            </div>
                            <Badge variant={ticket.priority === 'critical' ? 'error' : ticket.priority === 'high' ? 'warning' : ticket.priority === 'medium' ? 'info' : 'success'} size="sm">
                              {ticket.priority}
                            </Badge>
                          </div>

                          {/* Subject */}
                          <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 mb-3">{ticket.subject}</p>

                          {/* Customer + Status */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-[var(--text-secondary)] truncate max-w-[140px]">{ticket.customer}</span>
                            <Badge variant={statusVariants[ticket.status]} size="sm">{statusLabels[ticket.status]}</Badge>
                          </div>

                          {/* Footer: Agent + SLA */}
                          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-default)]">
                            {ticket.agent ? (
                              <div className="flex items-center gap-1.5">
                                <Avatar size="xs" fallback={ticket.agent.split(' ').map(n => n[0]).join('')} />
                                <span className="text-xs text-[var(--text-muted)] truncate max-w-[100px]">{ticket.agent}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-[var(--text-muted)] italic">Unassigned</span>
                            )}
                            {ticket.status === 'resolved' ? (
                              <Badge variant="success" size="sm">Completed</Badge>
                            ) : (
                              <SLACountdown deadline={ticket.slaDeadline} />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden sm:block">
                    <DataTable
                      data={recentTickets}
                      columns={ticketColumns}
                      sortable
                      pagination
                      pageSize={5}
                      hoverable
                    />
                  </div>
                </>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* ===== RIGHT COLUMN (25%) - METRICS & ACTIVITY ===== */}
        <div className="min-w-0 space-y-4 lg:col-span-1">
          {/* Response Time Trend */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary-500" />
                Response Time
              </Card.Title>
              <Card.Description className="text-xs">Last 7 days average</Card.Description>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <Skeleton className="h-32 rounded-lg" />
              ) : (
                <>
                  <SparklineChart
                    data={responseTimeTrend}
                    type="area"
                    color="#14B89A"
                    width={200}
                    height={80}
                    gradient
                    showDot
                    animated
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">2.4h</span>
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <TrendingDown className="h-3 w-3" />
                      -0.3h from last week
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="h-1 flex-1 rounded-full bg-secondary-200 dark:bg-secondary-700">
                      <div className="h-1 w-3/4 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">Target: 3h</span>
                  </div>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-primary-500" />
                Customer Satisfaction
              </Card.Title>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <Skeleton className="h-40 rounded-lg" />
              ) : (
                <>
                  <div className="text-center mb-4">
                    <span className="text-4xl">
                      {slaHealth.customerSatisfaction >= 4.5 ? '😊' : slaHealth.customerSatisfaction >= 3.5 ? '😐' : '😟'}
                    </span>
                    <div className="mt-1">
                      <span className="text-3xl font-bold text-[var(--text-primary)]">{slaHealth.customerSatisfaction}</span>
                      <span className="text-lg text-[var(--text-muted)]">/5</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">Based on 234 responses</p>
                  </div>
                  <div className="space-y-1.5">
                    {satisfactionDistribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-2">
                        <span className="text-xs w-6">{item.stars}★</span>
                        <div className="flex-1 h-2 rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-muted)] w-8">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Categories Breakdown */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500" />
            <Card.Header className="pb-2">
              <Card.Title className="flex items-center gap-2 text-sm">
                <Settings className="h-4 w-4 text-primary-500" />
                Categories Breakdown
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-2">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 rounded-lg" />
                ))
              ) : (
                categoriesBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">{item.category}</span>
                      <span className="font-medium text-[var(--text-primary)]">{item.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </Card.Content>
          </Card>

          {/* Live Feed */}
          <Card className="relative max-h-[400px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 z-10" />
            <Card.Header className="pb-2">
              <div className="flex items-center justify-between">
                <Card.Title className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4 text-primary-500 animate-spin" style={{ animationDuration: '3s' }} />
                  Live Feed
                </Card.Title>
                <Badge variant="success" size="sm">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </Badge>
              </div>
            </Card.Header>
            <Card.Content className="overflow-y-auto max-h-[320px] -mx-2 px-2">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))}
                </div>
              ) : (
                <ActivityTimeline items={liveFeedActivities} variant="compact" />
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}
