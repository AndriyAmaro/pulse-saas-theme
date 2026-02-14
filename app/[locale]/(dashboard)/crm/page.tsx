'use client'

import * as React from 'react'
import {
  Users,
  Target,
  FileText,
  Trophy,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  UserPlus,
  Filter,
  Download,
  MoreHorizontal,
  ArrowRight,
  ArrowUpRight,
  Star,
  Flame,
  CheckCircle2,
  XCircle,
  Video,
  MessageSquare,
  Zap,
  Rocket,
  Activity,
  BarChart3,
  PieChart,
  Handshake,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { LeaderboardList, type LeaderboardItem } from '@core/patterns/LeaderboardList'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// MOCK DATA - Realistic CRM Data
// ============================================================================

// Hero Data
const heroData = {
  totalRevenue: 127450,
  changePercent: 18.4,
  changeValue: 19800,
  last30Days: [
    68000, 72000, 75000, 78000, 81000, 84000, 79000, 86000, 89000, 85000,
    92000, 95000, 90000, 98000, 94000, 101000, 97000, 104000, 100000, 108000,
    103000, 111000, 107000, 114000, 110000, 118000, 115000, 121000, 124000, 127450,
  ],
}

// KPI Data with sparklines
const kpiData = {
  totalLeads: { value: 847, change: 23, label: 'this week', sparkline: [580, 620, 660, 700, 730, 760, 790, 810, 800, 825, 835, 847] },
  qualified: { value: 312, conversionRate: 36.8, sparkline: [180, 200, 215, 230, 245, 255, 268, 275, 285, 295, 305, 312] },
  proposalsSent: { value: 89, change: 12, sparkline: [45, 50, 55, 58, 62, 65, 70, 72, 78, 82, 85, 89] },
  dealsWon: { value: 34, totalValue: 127450, sparkline: [12, 15, 17, 19, 21, 23, 24, 26, 28, 30, 32, 34] },
}

// Pipeline Stages
const pipelineStages = [
  { id: 'new', name: 'New Leads', count: 124, value: 186000, color: '#6B7280' },
  { id: 'contacted', name: 'Contacted', count: 98, value: 147000, color: '#3B82F6' },
  { id: 'qualified', name: 'Qualified', count: 76, value: 152000, color: '#0EA5E9' },
  { id: 'proposal', name: 'Proposal', count: 45, value: 135000, color: '#8B5CF6' },
  { id: 'negotiation', name: 'Negotiation', count: 23, value: 92000, color: '#F59E0B' },
  { id: 'won', name: 'Won', count: 34, value: 127450, color: '#22C55E' },
]

// Conversion Funnel
const funnelData = [
  { stage: 'Leads', count: 847, percentage: 100, color: '#6B7280' },
  { stage: 'MQL', count: 423, percentage: 49.9, color: '#3B82F6' },
  { stage: 'SQL', count: 198, percentage: 23.4, color: '#0EA5E9' },
  { stage: 'Opportunity', count: 89, percentage: 10.5, color: '#8B5CF6' },
  { stage: 'Customer', count: 34, percentage: 4.0, color: '#22C55E' },
]

// Revenue by Source (Pie)
const revenueBySourceData = [
  { name: 'Inbound', value: 48500 },
  { name: 'Outbound', value: 32200 },
  { name: 'Referral', value: 28400 },
  { name: 'Partner', value: 12850 },
  { name: 'Other', value: 5500 },
]

// Sales Performance (By rep)
const salesPerformanceData = [
  { name: 'Sarah Johnson', target: 50000, actual: 62400 },
  { name: 'Mike Chen', target: 50000, actual: 48200 },
  { name: 'Emily Davis', target: 45000, actual: 51800 },
  { name: 'James Wilson', target: 45000, actual: 38500 },
  { name: 'Lisa Anderson', target: 40000, actual: 44200 },
]

// Win Rate Trend (6 months)
const winRateTrendData = [
  { month: 'Aug', rate: 28, target: 35 },
  { month: 'Sep', rate: 32, target: 35 },
  { month: 'Oct', rate: 29, target: 35 },
  { month: 'Nov', rate: 36, target: 35 },
  { month: 'Dec', rate: 38, target: 35 },
  { month: 'Jan', rate: 41, target: 35 },
]

// Hot Leads
interface HotLead {
  id: string
  name: string
  company: string
  avatar?: string
  value: number
  stage: string
  stageColor: string
  score: number
  lastContact: string
  owner: {
    name: string
    avatar?: string
  }
}

const hotLeadsData: HotLead[] = [
  {
    id: '1',
    name: 'Robert Martinez',
    company: 'TechFlow Inc',
    value: 85000,
    stage: 'Negotiation',
    stageColor: '#F59E0B',
    score: 95,
    lastContact: '2h ago',
    owner: { name: 'Sarah J.' },
  },
  {
    id: '2',
    name: 'Amanda Foster',
    company: 'DataSync Corp',
    value: 62000,
    stage: 'Proposal',
    stageColor: '#8B5CF6',
    score: 88,
    lastContact: '4h ago',
    owner: { name: 'Mike C.' },
  },
  {
    id: '3',
    name: 'David Kim',
    company: 'CloudNine Ltd',
    value: 45000,
    stage: 'Negotiation',
    stageColor: '#F59E0B',
    score: 85,
    lastContact: '1d ago',
    owner: { name: 'Emily D.' },
  },
  {
    id: '4',
    name: 'Jennifer Lee',
    company: 'StartupX',
    value: 38000,
    stage: 'Qualified',
    stageColor: '#0EA5E9',
    score: 82,
    lastContact: '3h ago',
    owner: { name: 'James W.' },
  },
  {
    id: '5',
    name: 'Thomas Brown',
    company: 'Enterprise Co',
    value: 120000,
    stage: 'Proposal',
    stageColor: '#8B5CF6',
    score: 78,
    lastContact: '2d ago',
    owner: { name: 'Sarah J.' },
  },
  {
    id: '6',
    name: 'Michelle Wong',
    company: 'InnovateTech',
    value: 55000,
    stage: 'Qualified',
    stageColor: '#0EA5E9',
    score: 75,
    lastContact: '5h ago',
    owner: { name: 'Lisa A.' },
  },
]

// Top Performers
const topPerformersData: LeaderboardItem[] = [
  { id: '1', rank: 1, name: 'Sarah Johnson', value: 34, avatar: undefined, change: 2 },
  { id: '2', rank: 2, name: 'Emily Davis', value: 28, avatar: undefined, change: 1 },
  { id: '3', rank: 3, name: 'Mike Chen', value: 24, avatar: undefined, change: -1 },
  { id: '4', rank: 4, name: 'Lisa Anderson', value: 21, avatar: undefined, change: 3 },
  { id: '5', rank: 5, name: 'James Wilson', value: 18, avatar: undefined, change: -2 },
]

// Today's Activities
interface Activity {
  id: string
  type: 'call' | 'meeting' | 'email' | 'followup'
  description: string
  time: string
  contact: string
  icon: typeof Phone
}

const todayActivitiesData: Activity[] = [
  { id: '1', type: 'call', description: 'Discovery call', time: '10:00 AM', contact: 'Robert Martinez', icon: Phone },
  { id: '2', type: 'meeting', description: 'Demo presentation', time: '11:30 AM', contact: 'Amanda Foster', icon: Video },
  { id: '3', type: 'email', description: 'Send proposal', time: '2:00 PM', contact: 'David Kim', icon: Mail },
  { id: '4', type: 'followup', description: 'Follow up on quote', time: '3:30 PM', contact: 'Jennifer Lee', icon: MessageSquare },
  { id: '5', type: 'call', description: 'Contract negotiation', time: '4:00 PM', contact: 'Thomas Brown', icon: Phone },
]

// Table Columns
const hotLeadsColumns: ColumnDef<HotLead>[] = [
  {
    id: 'lead',
    accessorKey: 'name',
    header: 'Lead',
    sortable: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar
          src={row.avatar}
          fallback={row.name.charAt(0)}
          size="sm"
          alt={row.name}
        />
        <div>
          <p className="font-medium text-[var(--text-primary)]">{row.name}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.company}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'value',
    accessorKey: 'value',
    header: 'Value',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-semibold text-[var(--text-primary)]">
        ${(value as number).toLocaleString()}
      </span>
    ),
  },
  {
    id: 'stage',
    accessorKey: 'stage',
    header: 'Stage',
    sortable: true,
    cell: ({ row }) => (
      <Badge
        variant="default"
        size="sm"
        style={{ backgroundColor: `${row.stageColor}20`, color: row.stageColor }}
      >
        {row.stage}
      </Badge>
    ),
  },
  {
    id: 'score',
    accessorKey: 'score',
    header: 'Score',
    sortable: true,
    cell: ({ row }) => {
      const score = row.score
      const scoreColor = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${score}%`, backgroundColor: scoreColor }}
            />
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          {score >= 80 && <Flame className="h-3 w-3 text-orange-500" />}
        </div>
      )
    },
  },
  {
    id: 'lastContact',
    accessorKey: 'lastContact',
    header: 'Last Contact',
    sortable: true,
    cell: ({ value }) => (
      <span className="text-sm text-[var(--text-muted)]">{value as string}</span>
    ),
  },
  {
    id: 'owner',
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar
          fallback={row.owner.name.charAt(0)}
          size="xs"
          alt={row.owner.name}
        />
        <span className="text-sm text-[var(--text-secondary)]">{row.owner.name}</span>
      </div>
    ),
  },
]

// Date Range Options
const dateRangeOptions = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function CRMDashboard() {
  const [dateRange, setDateRange] = React.useState('month')
  const [isLoading, setIsLoading] = React.useState(true)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const totalPipelineValue = pipelineStages.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:flex-1">
          <h1 className="text-2xl font-bold md:text-3xl text-center bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Sales CRM
          </h1>
          <p className="mt-1 text-[var(--text-secondary)] text-center">
            Manage your leads, track conversions, and close more deals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-9 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button variant="primary" size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>
            Add Lead
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Import
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* ====== HERO: REVENUE OVERVIEW ====== */}
      {isLoading ? (
        <Skeleton className="h-52 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950/20 dark:via-slate-900 dark:to-amber-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_60%)]" />
          <Card.Content className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                    <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">Revenue This Month</p>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    +{heroData.changePercent}%
                  </Badge>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
                    ${heroData.totalRevenue.toLocaleString()}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400">
                  <TrendingUp className="h-4 w-4" />
                  +${heroData.changeValue.toLocaleString()} from last month
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{kpiData.dealsWon.value} deals closed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>{kpiData.proposalsSent.value} proposals active</span>
                  </div>
                </div>
              </div>

              {/* Center: Premium Revenue Breakdown Circle + Metrics (desktop only) */}
              <div className="hidden lg:flex items-center gap-8">
                {/* Premium Revenue Breakdown Circle */}
                <div className="relative">
                  <div className="relative h-28 w-28">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-orange-100 dark:text-orange-900/40" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="url(#revenueGradient)" strokeWidth="3" strokeDasharray="88 22" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="10" fill="none" stroke="currentColor" className="text-amber-100 dark:text-amber-900/40" strokeWidth="2" />
                      <circle cx="18" cy="18" r="10" fill="none" stroke="url(#dealGradient)" strokeWidth="2" strokeDasharray="56 8" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F97316" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                        <linearGradient id="dealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#FBBF24" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-[var(--text-muted)]">Target</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">80%</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/90 dark:bg-slate-900/90 px-3 py-1 shadow-lg border border-orange-200/50 dark:border-orange-800/30">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <span className="text-[9px] font-medium text-orange-600 dark:text-orange-400">$127K</span>
                    </div>
                    <div className="h-3 w-px bg-orange-200 dark:bg-orange-800" />
                    <span className="text-[9px] text-[var(--text-muted)]">On Track</span>
                  </div>
                </div>

                {/* CRM metrics panel */}
                <div className="flex items-center gap-6">
                  {[
                    { icon: Target, label: 'Conversion Rate', value: '4.0%', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
                    { icon: Trophy, label: 'Avg Deal Size', value: '$3.7K', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
                    { icon: Rocket, label: 'Sales Velocity', value: '18d', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
                  ].map((metric) => (
                    <div key={metric.label} className="flex flex-col items-center gap-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bg}`}>
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">{metric.label}</p>
                        <p className={`text-sm font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Revenue bars (desktop) */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-full lg:w-56">
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3 text-center">Revenue Trend (30 days)</p>
                  <div className="flex items-end gap-1 h-20 group cursor-pointer">
                    {heroData.last30Days.slice(-14).map((v, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-300 group-hover:scale-110 ${i === 13 ? 'bg-orange-500' : i >= 11 ? 'bg-orange-400 dark:bg-orange-500/80' : 'bg-orange-200 dark:bg-orange-700/50'}`}
                        style={{ height: `${((v - 68000) / (127450 - 68000)) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] text-[var(--text-muted)]">2w ago</span>
                    <span className="text-[9px] font-semibold text-orange-600 dark:text-orange-400">Today</span>
                  </div>
                </div>
              </div>

              {/* Mobile: compact version */}
              <div className="lg:hidden flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">Revenue (30d)</p>
                  <div className="flex items-end gap-1 h-16 group cursor-pointer">
                    {heroData.last30Days.slice(-14).map((v, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-300 group-hover:scale-110 ${i === 13 ? 'bg-orange-500' : i >= 11 ? 'bg-orange-400 dark:bg-orange-500/80' : 'bg-orange-200 dark:bg-orange-700/50'}`}
                        style={{ height: `${((v - 68000) / (127450 - 68000)) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[8px] text-[var(--text-muted)]">2w ago</span>
                    <span className="text-[8px] font-semibold text-orange-600 dark:text-orange-400">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 1: KPI CARDS ====== */}
      <DashboardGrid preset="4col" gap="lg" className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-3 pb-3 sm:grid sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {/* Total Leads */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Total Leads</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.totalLeads.value.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.totalLeads.change} {kpiData.totalLeads.label}
                    </div>
                  </div>
                  <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 h-8 group cursor-pointer">
                  {kpiData.totalLeads.sparkline.map((v, i) => (
                    <div key={i} className="relative flex flex-col items-center justify-end">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150 ${i === kpiData.totalLeads.sparkline.length - 1 ? 'bg-orange-500' : 'bg-orange-300 dark:bg-orange-600/50'}`} />
                      {i > 0 && (
                        <div className={`absolute bottom-0 w-px transition-all duration-300 ${i >= kpiData.totalLeads.sparkline.length - 3 ? 'bg-orange-400 dark:bg-orange-500/60' : 'bg-orange-200 dark:bg-orange-700/30'}`} style={{ height: `${Math.abs(v - (kpiData.totalLeads.sparkline[i-1] || 0)) / 847 * 60}%` }} />
                      )}
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Qualified */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Qualified</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.qualified.value.toLocaleString()}
                    </p>
                    <div className="mt-1 text-xs text-[var(--text-muted)]">
                      {kpiData.qualified.conversionRate}% conversion rate
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-0.5 h-8 group cursor-pointer">
                  {kpiData.qualified.sparkline.map((v, i) => (
                    <div key={i} className="relative flex-1">
                      <div className={`absolute bottom-0 w-full transition-all duration-300 group-hover:opacity-80 ${i >= kpiData.qualified.sparkline.length - 2 ? 'bg-blue-500/30' : 'bg-blue-200/20 dark:bg-blue-700/20'}`} style={{ height: `${(v / 312) * 100}%` }} />
                      {i === kpiData.qualified.sparkline.length - 1 && (
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 transition-all duration-300 group-hover:scale-150" />
                      )}
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Proposals Sent */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 to-purple-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Proposals Sent</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.proposalsSent.value}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.proposalsSent.change}% vs last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30">
                    <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 h-8 group cursor-pointer">
                  {kpiData.proposalsSent.sparkline.map((v, i) => (
                    <div key={i} className="relative flex-1">
                      <div className={`absolute bottom-0 w-1 transition-all duration-300 group-hover:bg-violet-400 ${i === kpiData.proposalsSent.sparkline.length - 1 ? 'bg-violet-500' : 'bg-violet-300 dark:bg-violet-600/50'}`} style={{ height: `${(v / 89) * 100}%` }} />
                      {i > 0 && v > (kpiData.proposalsSent.sparkline[i-1] || 0) && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-px h-1 bg-violet-400 transition-all duration-300" />
                      )}
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Deals Won */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Deals Won</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.dealsWon.value}
                    </p>
                    <div className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      ${kpiData.dealsWon.totalValue.toLocaleString()} total
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                    <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-0.5 h-8 group cursor-pointer">
                  {kpiData.dealsWon.sparkline.map((v, i) => (
                    <div key={i} className="relative flex-1">
                      <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 12 32" preserveAspectRatio="none">
                        <path
                          d={`M ${i * 3} ${32 - (v / 34) * 28} L ${(i + 1) * 3} ${32 - ((kpiData.dealsWon.sparkline[i + 1] || v) / 34) * 28}`}
                          className={`transition-all duration-300 ${i >= kpiData.dealsWon.sparkline.length - 2 ? 'stroke-emerald-500' : 'stroke-emerald-300 dark:stroke-emerald-600/50'}`}
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150 ${i === kpiData.dealsWon.sparkline.length - 1 ? 'bg-emerald-500' : 'bg-emerald-300 dark:bg-emerald-600/50'}`} style={{ bottom: `${(v / 34) * 28}px` }} />
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </>
        )}
      </DashboardGrid>

      {/* ====== ROW 2: PIPELINE VISUAL ====== */}
      {isLoading ? (
        <Skeleton className="h-48 rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 shadow-sm">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  Sales Pipeline
                </Card.Title>
                <Card.Description className="mt-1">
                  Total pipeline value: <span className="font-semibold text-teal-600 dark:text-teal-400">${totalPipelineValue.toLocaleString()}</span>
                </Card.Description>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Details
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {/* Pipeline Stages */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {pipelineStages.map((stage, idx) => {
                const prevStage = pipelineStages[idx - 1]
                const conversionRate = prevStage
                  ? ((stage.count / prevStage.count) * 100).toFixed(0)
                  : null

                return (
                  <React.Fragment key={stage.id}>
                    <div
                      className="group relative min-w-[120px] sm:min-w-[160px] flex-1 overflow-hidden rounded-xl border p-3 sm:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                      style={{ borderColor: stage.color + '30' }}
                    >
                      <div
                        className="absolute top-0 left-0 h-1 w-full"
                        style={{ background: `linear-gradient(to right, ${stage.color}, ${stage.color}80)` }}
                      />
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ background: `linear-gradient(to bottom right, ${stage.color}, transparent)` }}
                      />
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: stage.color }}
                          >
                            {stage.count}
                          </span>
                          <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {stage.count}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                          {stage.name}
                        </p>
                        <p className="text-xs font-medium" style={{ color: stage.color }}>
                          ${stage.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className="flex flex-col items-center justify-center px-1">
                        <ArrowRight className="h-5 w-5 text-[var(--text-muted)]" />
                        {conversionRate && (
                          <span className="mt-1 text-xs text-[var(--text-muted)]">
                            {conversionRate}%
                          </span>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Pipeline Progress Bar */}
            <div className="mt-6">
              <div className="flex h-3 overflow-hidden rounded-full">
                {pipelineStages.map((stage) => {
                  const width = (stage.count / pipelineStages.reduce((s, st) => s + st.count, 0)) * 100
                  return (
                    <div
                      key={stage.id}
                      className="transition-all duration-300"
                      style={{ width: `${width}%`, backgroundColor: stage.color }}
                      title={`${stage.name}: ${stage.count}`}
                    />
                  )
                })}
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 3: FUNNEL + REVENUE BY SOURCE ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              Conversion Funnel
            </Card.Title>
            <Card.Description className="mt-1">Lead to customer journey</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {funnelData.map((step, idx) => {
                  const prevStep = funnelData[idx - 1]
                  const conversionFromPrev = prevStep
                    ? ((step.count / prevStep.count) * 100).toFixed(1)
                    : null

                  return (
                    <div key={step.stage} className="flex items-center gap-4">
                      {/* Barra com largura proporcional */}
                      <div
                        className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          width: `${Math.max(step.percentage, 25)}%`,
                          backgroundColor: step.color + '20',
                        }}
                      >
                        <div
                          className="absolute inset-y-0 left-0"
                          style={{
                            width: '4px',
                            backgroundColor: step.color,
                          }}
                        />
                        <div className="p-3 pl-4">
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {step.stage}
                          </p>
                          <p className="text-lg font-bold text-[var(--text-primary)]">
                            {step.count.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {/* Informações FORA da barra - sempre visíveis */}
                      <div className="flex-shrink-0 text-right min-w-[80px]">
                        <p className="text-sm font-semibold" style={{ color: step.color }}>
                          {step.percentage}%
                        </p>
                        {conversionFromPrev && (
                          <p className="text-xs text-[var(--text-muted)]">
                            {conversionFromPrev}% conv.
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Revenue by Source */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-sm">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              Revenue by Source
            </Card.Title>
            <Card.Description className="mt-1">Where your revenue comes from</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="mx-auto h-64 w-64 rounded-full" />
            ) : (
              <ChartWrapper
                type="pie"
                data={revenueBySourceData}
                series={[{ dataKey: 'value', name: 'Revenue' }]}
                xAxisKey="name"
                height={280}
                showLegend
                showTooltip
                tooltipFormatter={(value) => '$' + value.toLocaleString()}
              />
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 4: SALES PERFORMANCE + WIN RATE TREND ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Performance */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              Sales Performance
            </Card.Title>
            <Card.Description className="mt-1">Target vs Actual by rep</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <ChartWrapper
                type="bar"
                data={salesPerformanceData}
                series={[
                  { dataKey: 'target', name: 'Target', color: '#CBD5E1' },
                  { dataKey: 'actual', name: 'Actual', color: '#22C55E' },
                ]}
                xAxisKey="name"
                height={260}
                showLegend
                showTooltip
                showGrid
                tooltipFormatter={(value) => '$' + value.toLocaleString()}
              />
            )}
          </Card.Content>
        </Card>

        {/* Win Rate Trend */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 dark:from-green-500/10 dark:to-teal-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-teal-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-500 shadow-sm">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Win Rate Trend
            </Card.Title>
            <Card.Description className="mt-1">6 month win rate evolution</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <ChartWrapper
                type="area"
                data={winRateTrendData}
                series={[
                  { dataKey: 'rate', name: 'Win Rate', fillOpacity: 0.4, color: '#22C55E' },
                  { dataKey: 'target', name: 'Target', color: '#94A3B8' },
                ]}
                xAxisKey="month"
                height={260}
                showLegend
                showTooltip
                showGrid
                tooltipFormatter={(value) => value + '%'}
              />
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 5: HOT LEADS TABLE + SIDEBAR ====== */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hot Leads Table - 2/3 */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 dark:from-red-500/10 dark:to-orange-500/10 pointer-events-none" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-orange-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-sm">
                    <Flame className="h-4 w-4 text-white" />
                  </div>
                  Hot Leads
                </Card.Title>
                <Card.Description className="mt-1">High-priority leads with score &gt; 75</Card.Description>
              </div>
              <div className="flex gap-2">
                <Badge variant="default" size="sm" className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800">
                  {hotLeadsData.length} hot
                </Badge>
                <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
                  Filter
                </Button>
                <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                  View All
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Content padding="none">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <DataTable
                data={hotLeadsData}
                columns={hotLeadsColumns}
                sortable
                pagination
                pageSize={5}
                hoverable
              />
            )}
          </Card.Content>
        </Card>

        {/* Sidebar: Top Performers + Activities */}
        <div className="space-y-6">
          {/* Top Performers */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 dark:from-yellow-500/10 dark:to-amber-500/10 pointer-events-none" />
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-500 to-amber-500" />
            <Card.Header className="relative">
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 shadow-sm">
                  <Star className="h-4 w-4 text-white" />
                </div>
                Top Performers
              </Card.Title>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 rounded-lg" />
                  ))}
                </div>
              ) : (
                <LeaderboardList
                  items={topPerformersData}
                  valueFormatter={(v) => `${v} deals`}
                  showMedals
                  maxVisible={5}
                  expandable={false}
                  variant="compact"
                />
              )}
            </Card.Content>
          </Card>

          {/* Activities Today */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 pointer-events-none" />
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <Card.Header className="relative">
              <div className="flex items-center justify-between">
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Activities Today
                </Card.Title>
                <Badge variant="default" size="sm" className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {todayActivitiesData.length} tasks
                </Badge>
              </div>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {todayActivitiesData.map((activity) => {
                    const iconColors: Record<string, string> = {
                      call: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
                      meeting: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
                      email: 'text-green-500 bg-green-100 dark:bg-green-900/30',
                      followup: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
                    }

                    return (
                      <div
                        key={activity.id}
                        className="group flex items-center gap-3 rounded-xl border border-[var(--border-default)] p-2.5 transition-all duration-200 hover:shadow-sm hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-800"
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconColors[activity.type]}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                            {activity.description}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">{activity.contact}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}
