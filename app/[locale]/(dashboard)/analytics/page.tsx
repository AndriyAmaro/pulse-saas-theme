'use client'

import * as React from 'react'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointerClick,
  Download,
  Calendar,
  RefreshCw,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  ArrowRight,
  Activity,
  Filter,
  FileSpreadsheet,
  BarChart3,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { RegionStats, type RegionItem } from '@core/patterns/RegionStats'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
// Native select used below
import { Skeleton } from '@core/primitives/Skeleton'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MOCK DATA
// ============================================================================

// Hero overview data
const heroData = {
  pageViews: 182450,
  changePercent: 14.8,
  changeValue: 23580,
  last30Days: [
    142000, 145000, 148000, 146000, 151000, 154000, 149000, 156000, 158000, 155000,
    160000, 163000, 159000, 165000, 162000, 168000, 164000, 170000, 167000, 173000,
    169000, 175000, 171000, 177000, 174000, 179000, 176000, 180000, 178000, 182450,
  ],
  visitors30Days: [
    32000, 33500, 34200, 33800, 35600, 36100, 34800, 37200, 38000, 36900,
    38500, 39200, 37800, 40100, 39500, 41200, 40000, 42300, 41500, 43100,
    42000, 43800, 42500, 44200, 43500, 44800, 44000, 45100, 44600, 45289,
  ],
}

// KPI Data with comparison and sparklines
const kpiData = {
  totalVisitors: {
    value: 45289,
    change: 12.5,
    previous: 40257,
    sparkline: [3200, 3600, 3400, 3900, 4200, 3800, 4500, 4100, 4800, 4600, 5100, 5289],
  },
  uniqueSessions: {
    value: 38420,
    change: 8.2,
    previous: 35508,
    sparkline: [2800, 3000, 2900, 3200, 3400, 3100, 3600, 3500, 3800, 3700, 3900, 3820],
  },
  bounceRate: {
    value: 42.3,
    change: -2.4,
    previous: 44.7,
    sparkline: [48.2, 47.1, 46.5, 45.8, 45.0, 44.7, 44.2, 43.8, 43.5, 43.0, 42.6, 42.3],
  },
  avgDuration: {
    value: '4:32',
    change: 15,
    previous: '3:56',
    sparkline: [3.2, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.53],
  },
}

// Real-time data
const realTimeData = {
  activeNow: 127,
  peakToday: 342,
  peakTime: '2:30 PM',
  last30min: [45, 52, 48, 61, 78, 95, 88, 102, 118, 127, 115, 98, 112, 127],
}

// Traffic over time (30 days)
const trafficData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 29 + i)
  const baseVisitors = 1200 + Math.sin(i / 3) * 400
  const pageViews = baseVisitors * (1.8 + Math.random() * 0.4)
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    visitors: Math.round(baseVisitors + Math.random() * 200),
    pageViews: Math.round(pageViews),
  }
})

// Traffic sources
const trafficSourcesData = [
  { source: 'Organic Search', value: 18420, percentage: 40.7 },
  { source: 'Direct', value: 11580, percentage: 25.6 },
  { source: 'Social Media', value: 7240, percentage: 16.0 },
  { source: 'Referral', value: 5120, percentage: 11.3 },
  { source: 'Paid Ads', value: 2929, percentage: 6.4 },
]

// Browsers data
const browsersData = [
  { browser: 'Chrome', users: 24150, percentage: 53.3 },
  { browser: 'Safari', users: 10870, percentage: 24.0 },
  { browser: 'Firefox', users: 5440, percentage: 12.0 },
  { browser: 'Edge', users: 3620, percentage: 8.0 },
  { browser: 'Other', users: 1209, percentage: 2.7 },
]

// Device breakdown
const deviceData = [
  { device: 'Desktop', users: 24150, icon: Monitor, color: '#3B82F6' },
  { device: 'Mobile', users: 16320, icon: Smartphone, color: '#10B981' },
  { device: 'Tablet', users: 4819, icon: Tablet, color: '#8B5CF6' },
]

// Geographic data
const geoData: RegionItem[] = [
  { id: '1', name: 'United States', flag: '🇺🇸', value: 15420 },
  { id: '2', name: 'United Kingdom', flag: '🇬🇧', value: 8240 },
  { id: '3', name: 'Germany', flag: '🇩🇪', value: 5890 },
  { id: '4', name: 'France', flag: '🇫🇷', value: 4210 },
  { id: '5', name: 'Brazil', flag: '🇧🇷', value: 3840 },
  { id: '6', name: 'Canada', flag: '🇨🇦', value: 2910 },
  { id: '7', name: 'Australia', flag: '🇦🇺', value: 2450 },
  { id: '8', name: 'Japan', flag: '🇯🇵', value: 1890 },
  { id: '9', name: 'India', flag: '🇮🇳', value: 1650 },
  { id: '10', name: 'Netherlands', flag: '🇳🇱', value: 1230 },
]

// Top pages
interface TopPage {
  id: string
  page: string
  views: number
  uniques: number
  bounceRate: number
  avgTime: string
}

const topPagesData: TopPage[] = [
  { id: '1', page: '/dashboard', views: 24580, uniques: 18420, bounceRate: 28.4, avgTime: '4:32' },
  { id: '2', page: '/pricing', views: 18920, uniques: 15680, bounceRate: 35.2, avgTime: '3:18' },
  { id: '3', page: '/features', views: 15340, uniques: 12890, bounceRate: 32.1, avgTime: '2:45' },
  { id: '4', page: '/blog/getting-started', views: 12780, uniques: 10540, bounceRate: 41.8, avgTime: '5:12' },
  { id: '5', page: '/docs/api', views: 11450, uniques: 8920, bounceRate: 22.3, avgTime: '6:48' },
  { id: '6', page: '/about', views: 9870, uniques: 8340, bounceRate: 45.6, avgTime: '2:15' },
  { id: '7', page: '/contact', views: 8540, uniques: 7280, bounceRate: 38.9, avgTime: '1:52' },
  { id: '8', page: '/blog/tips-tricks', views: 7650, uniques: 6420, bounceRate: 44.2, avgTime: '4:05' },
  { id: '9', page: '/integrations', views: 6890, uniques: 5780, bounceRate: 36.7, avgTime: '3:28' },
  { id: '10', page: '/changelog', views: 5420, uniques: 4650, bounceRate: 29.8, avgTime: '2:38' },
]

// Conversion funnel
const funnelData = [
  { stage: 'Visitors', count: 45289, percentage: 100 },
  { stage: 'Signups', count: 12847, percentage: 28.4 },
  { stage: 'Trial Started', count: 4820, percentage: 10.6 },
  { stage: 'Paid Conversion', count: 1465, percentage: 3.2 },
]

// Table columns
const topPagesColumns: ColumnDef<TopPage>[] = [
  {
    id: 'page',
    accessorKey: 'page',
    header: 'Page URL',
    sortable: true,
    cell: ({ value }) => (
      <span className="font-medium text-[var(--text-primary)]">{value as string}</span>
    ),
  },
  {
    id: 'views',
    accessorKey: 'views',
    header: 'Views',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (value as number).toLocaleString(),
  },
  {
    id: 'uniques',
    accessorKey: 'uniques',
    header: 'Unique',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (value as number).toLocaleString(),
  },
  {
    id: 'bounceRate',
    accessorKey: 'bounceRate',
    header: 'Bounce Rate',
    sortable: true,
    align: 'right',
    cell: ({ value }) => {
      const rate = value as number
      return (
        <Badge variant={rate > 40 ? 'error' : rate > 30 ? 'warning' : 'success'} size="sm">
          {rate}%
        </Badge>
      )
    },
  },
  {
    id: 'avgTime',
    accessorKey: 'avgTime',
    header: 'Avg Time',
    sortable: true,
    align: 'right',
  },
]

// Date range options
const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'custom', label: 'Custom range' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState('30d')
  const [isLoading, setIsLoading] = React.useState(true)
  const [animatedActiveUsers, setAnimatedActiveUsers] = React.useState(0)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Animate active users counter
  React.useEffect(() => {
    if (isLoading) return

    const target = realTimeData.activeNow
    const duration = 1500
    const start = Date.now()

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setAnimatedActiveUsers(Math.round(target * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isLoading])

  const totalDeviceUsers = deviceData.reduce((sum, d) => sum + d.users, 0)

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Track your key metrics, user engagement, and business performance
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-9 w-40 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-1.5 text-sm text-[var(--text-primary)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileSpreadsheet className="h-4 w-4" />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Calendar className="h-4 w-4" />}
          >
            Schedule Report
          </Button>
        </div>
      </div>

      {/* ====== HERO OVERVIEW CARD ====== */}
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-2xl" />
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-blue-200/40 dark:border-blue-800/40 bg-[var(--bg-base)] shadow-md">
          {/* Top gradient accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

          {/* Multi-layer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-indigo-500/5 dark:from-blue-500/15 dark:via-transparent dark:to-indigo-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(59,130,246,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(59,130,246,0.2),transparent)]" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-bl from-blue-400/15 to-transparent blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-400/10 to-transparent blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          <div className="relative p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Left: Main metric */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">Total Page Views</p>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      Updated just now
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                    {heroData.pageViews.toLocaleString()}
                  </span>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {heroData.changePercent}%
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +{heroData.changeValue.toLocaleString()} from last month
                </p>

                {/* Quick stats pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: 'Visitors', value: '45.3K', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/30' },
                    { label: 'Bounce', value: '42.3%', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30' },
                    { label: 'Avg Time', value: '4:32', color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border-violet-200/50 dark:border-violet-800/30' },
                  ].map((pill) => (
                    <span key={pill.label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${pill.color}`}>
                      {pill.label}: {pill.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center: Performance ring + metrics */}
              <div className="hidden xl:flex flex-col items-center gap-4 px-4">
                {/* Conversion ring */}
                <div className="relative">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-default)" strokeWidth="8" opacity="0.3" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#analyticsRing)" strokeWidth="8" strokeDasharray={`${0.032 * 314.16} ${314.16}`} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="analyticsRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">3.2%</span>
                    <span className="text-[10px] font-medium text-[var(--text-muted)]">Conversion</span>
                  </div>
                </div>
                {/* Mini metrics */}
                <div className="space-y-2 w-full">
                  {[
                    { label: 'Sessions', value: '38.4K', icon: Eye, color: 'text-blue-500' },
                    { label: 'Pages/Session', value: '4.2', icon: Activity, color: 'text-indigo-500' },
                    { label: 'New Users', value: '62%', icon: Users, color: 'text-violet-500' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-2.5 rounded-lg bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm px-3 py-2 border border-white/40 dark:border-slate-700/30">
                      <m.icon className={`h-3.5 w-3.5 shrink-0 ${m.color}`} />
                      <span className="text-xs text-[var(--text-muted)] flex-1">{m.label}</span>
                      <span className="text-xs font-bold text-[var(--text-primary)]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dual sparklines */}
              <div className="w-full lg:w-[380px] space-y-4">
                <div className="rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-white/60 dark:border-slate-700/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[var(--text-secondary)]">Page Views — 30 days</p>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">182.4K</span>
                  </div>
                  <SparklineChart
                    data={heroData.last30Days}
                    type="area"
                    color="#3B82F6"
                    width={340}
                    height={60}
                    showDot
                    gradient
                    animated
                  />
                </div>
                <div className="rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-white/60 dark:border-slate-700/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[var(--text-secondary)]">Visitors — 30 days</p>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">45.3K</span>
                  </div>
                  <SparklineChart
                    data={heroData.visitors30Days}
                    type="area"
                    color="#6366F1"
                    width={340}
                    height={60}
                    showDot
                    gradient
                    animated
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== KPI CARDS ====== */}
      <DashboardGrid preset="4col" gap="lg" className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-3 pb-3 sm:grid sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {/* Total Visitors */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent sm:from-blue-500/5 sm:via-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-blue-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Total Visitors</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.totalVisitors.value.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.totalVisitors.change}% vs last period
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg">
                  <SparklineChart
                    data={kpiData.totalVisitors.sparkline}
                    type="area"
                    color="#3B82F6"
                    width={180}
                    height={40}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Unique Sessions */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-transparent sm:from-teal-500/5 sm:via-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-emerald-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Unique Sessions</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.uniqueSessions.value.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.uniqueSessions.change}% vs last period
                    </div>
                  </div>
                  <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
                    <Eye className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg">
                  <SparklineChart
                    data={kpiData.uniqueSessions.sparkline}
                    type="area"
                    color="#14B8A6"
                    width={180}
                    height={40}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Bounce Rate */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent sm:from-emerald-500/5 sm:via-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Bounce Rate</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.bounceRate.value}%
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingDown className="h-3 w-3" />
                      {kpiData.bounceRate.change}% vs last period
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                    <MousePointerClick className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg">
                  <SparklineChart
                    data={kpiData.bounceRate.sparkline}
                    type="area"
                    color="#10B981"
                    width={180}
                    height={40}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Avg Session Duration */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-violet-400/5 to-transparent sm:from-violet-500/5 sm:via-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 to-purple-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Avg. Session Duration</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {kpiData.avgDuration.value}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.avgDuration.change}s more
                    </div>
                  </div>
                  <div className="rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30">
                    <Clock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg">
                  <SparklineChart
                    data={kpiData.avgDuration.sparkline}
                    type="area"
                    color="#8B5CF6"
                    width={180}
                    height={40}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>
          </>
        )}
      </DashboardGrid>

      {/* ====== MAIN CHART ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary-500" />
                Traffic Overview
              </Card.Title>
              <Card.Description>Visitors and page views over time</Card.Description>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">Daily</Badge>
              <Badge variant="info" size="sm">Weekly</Badge>
              <Badge variant="default" size="sm">Monthly</Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <Skeleton className="h-[350px] rounded-lg" />
          ) : (
            <div className="-ml-7 -mr-5 sm:ml-0 sm:mr-0">
              <ChartWrapper
                type="area"
                data={trafficData}
                series={[
                  { dataKey: 'visitors', name: 'Visitors', fillOpacity: 0.4 },
                  { dataKey: 'pageViews', name: 'Page Views', fillOpacity: 0.2 },
                ]}
                xAxisKey="date"
                height={350}
                showLegend
                showTooltip
                showGrid
                tooltipFormatter={(value) => value.toLocaleString()}
              />
            </div>
          )}
        </Card.Content>
      </Card>

      {/* ====== ROW 2: Traffic Sources + Browsers + Devices ====== */}
      <DashboardGrid preset="3col" gap="lg">
        {/* Traffic Sources */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary-500" />
              Traffic Sources
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-8 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {trafficSourcesData.map((source, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--text-primary)]">
                        {source.source}
                      </span>
                      <span className="text-[var(--text-muted)]">
                        {source.value.toLocaleString()} ({source.percentage}%)
                      </span>
                    </div>
                    <ProgressBar value={source.percentage} size="sm" variant="default" />
                  </div>
                ))}

                {/* Desktop only: summary */}
                <div className="hidden lg:block pt-4 mt-2 border-t border-[var(--border-default)]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Total Traffic</p>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">
                        {trafficSourcesData.reduce((sum, s) => sum + s.value, 0).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="success" size="sm" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.3% growth
                    </Badge>
                  </div>
                  <div className="rounded-lg bg-[var(--bg-subtle)] p-3 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Globe className="h-3.5 w-3.5 text-primary-500" />
                      <span className="text-[var(--text-secondary)]">
                        <span className="font-semibold text-[var(--text-primary)]">Organic Search</span> is your top source at 40.7%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3">
                    {trafficSourcesData.map((source, i) => {
                      const colors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444']
                      return (
                        <div
                          key={source.source}
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${source.percentage}%`, backgroundColor: colors[i] }}
                        />
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                    {trafficSourcesData.map((source, i) => {
                      const colors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444']
                      return (
                        <div key={source.source} className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                          {source.source}: {source.percentage}%
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Top Browsers */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-primary-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary-500" />
              Top Browsers
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-[200px] rounded-lg" />
            ) : (
              <ChartWrapper
                type="bar"
                data={browsersData}
                series={[{ dataKey: 'users', name: 'Users' }]}
                xAxisKey="browser"
                height={300}
                showLegend={false}
                showTooltip
                tooltipFormatter={(value) => value.toLocaleString()}
              />
            )}

            {/* Desktop only: browser metrics */}
            {!isLoading && (
              <div className="hidden lg:block pt-4 mt-2 border-t border-[var(--border-default)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Total Users</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">
                      {browsersData.reduce((s, b) => s + b.users, 0).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +5.8% vs last period
                  </Badge>
                </div>

                <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3">
                  {browsersData.map((b, i) => {
                    const colors = ['#3B82F6', '#14B8A6', '#F59E0B', '#8B5CF6', '#94A3B8']
                    return (
                      <div
                        key={b.browser}
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${b.percentage}%`, backgroundColor: colors[i] }}
                      />
                    )
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                  {browsersData.map((b, i) => {
                    const colors = ['#3B82F6', '#14B8A6', '#F59E0B', '#8B5CF6', '#94A3B8']
                    return (
                      <div key={b.browser} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                        {b.browser}: {b.percentage}%
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Device Breakdown */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-primary-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary-500" />
              Device Breakdown
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-[200px] rounded-lg" />
            ) : (
              <div className="space-y-4 lg:space-y-6">
                {deviceData.map((device) => {
                  const DeviceIcon = device.icon
                  const percentage = ((device.users / totalDeviceUsers) * 100).toFixed(1)
                  return (
                    <div key={device.device} className="flex items-center gap-3 lg:gap-4 lg:rounded-lg lg:border lg:border-[var(--border-default)] lg:p-3 lg:relative lg:overflow-hidden">
                      <div
                        className="hidden lg:block absolute left-0 top-0 h-full w-1 rounded-l-lg"
                        style={{ backgroundColor: device.color }}
                      />
                      <div
                        className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${device.color}20` }}
                      >
                        <DeviceIcon className="h-5 w-5" style={{ color: device.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[var(--text-primary)]">
                            {device.device}
                          </span>
                          <span className="text-sm lg:text-base lg:font-semibold text-[var(--text-muted)]">
                            {percentage}%
                          </span>
                        </div>
                        <ProgressBar
                          value={Number(percentage)}
                          size="sm"
                          className="h-1.5 lg:h-2"
                        />
                      </div>
                    </div>
                  )
                })}

                {/* Desktop only: summary section */}
                <div className="hidden lg:block pt-4 mt-2 border-t border-[var(--border-default)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Total Users</p>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">
                        {totalDeviceUsers.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="success" size="sm" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8.4% vs last period
                    </Badge>
                  </div>

                  <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3">
                    {deviceData.map((device) => {
                      const pct = (device.users / totalDeviceUsers) * 100
                      return (
                        <div
                          key={device.device}
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: device.color }}
                        />
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    {deviceData.map((device) => (
                      <div key={device.device} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: device.color }} />
                        {device.device}: {device.users.toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 3: Geographic + Real-time ====== */}
      <DashboardGrid preset="content-sidebar" gap="lg">
        {/* Geographic Distribution */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-rose-500 to-pink-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary-500" />
                  Geographic Distribution
                </Card.Title>
                <Card.Description>Top countries by visitor count</Card.Description>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Map
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 rounded" />
                ))}
              </div>
            ) : (
              <RegionStats
                items={geoData}
                maxVisible={6}
                formatValue={(v) => v.toLocaleString()}
                progressVariant="gradient"
              />
            )}
          </Card.Content>
        </Card>

        {/* Real-time Visitors */}
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Real-time Visitors
              </Card.Title>
              <Badge className="bg-white/20 text-white border-0">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-400 animate-pulse inline-block" />
                Live
              </Badge>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-32 rounded-lg bg-white/20" />
            ) : (
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">
                  {animatedActiveUsers}
                </div>
                <p className="text-white/80 mb-6">active users right now</p>

                <div className="mb-4">
                  <SparklineChart
                    data={realTimeData.last30min}
                    type="area"
                    color="#ffffff"
                    width={240}
                    height={48}
                    showDot
                    gradient
                    animated
                  />
                </div>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div>
                    <p className="text-white/60">Peak today</p>
                    <p className="font-semibold">{realTimeData.peakToday}</p>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div>
                    <p className="text-white/60">Peak time</p>
                    <p className="font-semibold">{realTimeData.peakTime}</p>
                  </div>
                </div>

                {/* Desktop only: extra metrics */}
                <div className="hidden lg:block mt-5 pt-4 border-t border-white/15">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="rounded-lg bg-white/10 p-2.5 text-center">
                      <p className="text-xs text-white/50">Avg Duration</p>
                      <p className="text-sm font-bold mt-0.5">3m 42s</p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5 text-center">
                      <p className="text-xs text-white/50">Pages</p>
                      <p className="text-sm font-bold mt-0.5">4.2</p>
                      <p className="text-xs text-white/50 mt-0.5">Session</p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5 text-center">
                      <p className="text-xs text-white/50">Bounce Rate</p>
                      <p className="text-sm font-bold mt-0.5">24.1%</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 px-3 py-2.5 flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-white/60 shrink-0" />
                    <span className="text-xs text-white/70">Top page: <span className="font-semibold text-white">/dashboard</span> — 34 active</span>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 4: Top Pages + Conversion Funnel ====== */}
      <DashboardGrid preset="content-sidebar" gap="lg">
        {/* Top Pages Table */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary-500" />
                  Top Pages
                </Card.Title>
                <Card.Description>Most visited pages with engagement metrics</Card.Description>
              </div>
              <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
                Filter
              </Button>
            </div>
          </Card.Header>
          <Card.Content padding="none">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Mobile: premium horizontal scroll cards */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 p-4 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {topPagesData.map((page, idx) => (
                    <div
                      key={page.id}
                      className="snap-start shrink-0 w-[260px] rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-[var(--bg-base)] to-[var(--bg-subtle)] p-4 space-y-3 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-500/10 text-xs font-bold text-primary-500">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
                          {page.page}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                          {page.views.toLocaleString()}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">views</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[10px] text-[var(--text-muted)]">Unique</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{(page.uniques / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[var(--text-muted)]">Bounce</p>
                          <Badge variant={page.bounceRate > 40 ? 'error' : page.bounceRate > 30 ? 'warning' : 'success'} size="sm">
                            {page.bounceRate}%
                          </Badge>
                        </div>
                        <div>
                          <p className="text-[10px] text-[var(--text-muted)]">Time</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{page.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Desktop: full data table */}
                <div className="hidden sm:block">
                  <DataTable
                    data={topPagesData}
                    columns={topPagesColumns}
                    sortable
                    pagination
                    pageSize={8}
                    hoverable
                  />
                  {/* Desktop summary footer */}
                  <div className="hidden lg:flex items-center justify-between border-t border-[var(--border-default)] px-4 py-3">
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span>Total: <span className="font-semibold text-[var(--text-primary)]">{topPagesData.reduce((s, p) => s + p.views, 0).toLocaleString()}</span> views</span>
                      <span>Avg Bounce: <span className="font-semibold text-[var(--text-primary)]">{(topPagesData.reduce((s, p) => s + p.bounceRate, 0) / topPagesData.length).toFixed(1)}%</span></span>
                    </div>
                    <Badge variant="info" size="sm" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {topPagesData.length} pages tracked
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Conversion Funnel */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-500" />
              Conversion Funnel
            </Card.Title>
            <Card.Description>User journey to paid</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
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

                  // Gradient width based on percentage
                  const widthPercent = step.percentage

                  return (
                    <div key={step.stage}>
                      <div
                        className="relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-secondary-200 dark:border-secondary-700 bg-secondary-100 dark:bg-secondary-800"
                      >
                        {/* Colored bar - absolute positioned */}
                        <div
                          className="absolute inset-y-0 left-0 bg-primary-500"
                          style={{ width: `${widthPercent}%` }}
                        />
                        <div className="relative z-10 flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium text-secondary-900 dark:text-white">
                              {step.stage}
                            </p>
                            <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                              {step.count.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                              {step.percentage}%
                            </p>
                            {conversionFromPrev && (
                              <p className="text-xs text-secondary-600 dark:text-secondary-400">
                                {conversionFromPrev}% from prev
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {idx < funnelData.length - 1 && (
                        <div className="flex justify-center py-1">
                          <TrendingDown className="h-4 w-4 text-[var(--text-muted)]" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>
    </div>
  )
}
