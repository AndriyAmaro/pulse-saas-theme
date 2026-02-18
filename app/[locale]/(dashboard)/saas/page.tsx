'use client'

import * as React from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Repeat,
  UserPlus,
  Target,
  AlertTriangle,
  BarChart3,
  PieChart,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Sparkles,
  Zap,
  Mail,
  Clock,
  MoreHorizontal,
  Download,
  Filter,
  RefreshCw,
  Rocket,
  Shield,
  Eye,
  Heart,
  Star,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { HeatmapCalendar } from '@core/patterns/HeatmapCalendar'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MOCK DATA - SaaS Metrics
// ============================================================================

// Hero Metrics
const heroMetrics = {
  mrr: { value: 127450, change: 12.3, sparkline: [98000, 102000, 108000, 112000, 118000, 124000, 127450] },
  arr: { value: 1529400, change: 12.3, sparkline: [1180000, 1220000, 1300000, 1360000, 1420000, 1480000, 1529400] },
  activeUsers: { value: 8234, change: 8.7, sparkline: [7200, 7400, 7650, 7800, 7950, 8100, 8234] },
  churnRate: { value: 2.1, change: -0.4, sparkline: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1] },
  ltv: { value: 2340, change: 5.2, sparkline: [2100, 2150, 2200, 2250, 2280, 2310, 2340] },
  nrr: { value: 112, change: 3.1, sparkline: [105, 107, 108, 109, 110, 111, 112] },
}

// Revenue Growth (12 months with annotations)
const revenueGrowthData = [
  { month: 'Mar', mrr: 68000 },
  { month: 'Apr', mrr: 72000 },
  { month: 'May', mrr: 78000 },
  { month: 'Jun', mrr: 85000 },
  { month: 'Jul', mrr: 89000 },
  { month: 'Aug', mrr: 95000 },
  { month: 'Sep', mrr: 102000 },
  { month: 'Oct', mrr: 108000 },
  { month: 'Nov', mrr: 115000 },
  { month: 'Dec', mrr: 120000 },
  { month: 'Jan', mrr: 127450 },
]

// MRR Breakdown (Donut)
const mrrBreakdownData = [
  { name: 'New', value: 12340, color: '#22C55E' },
  { name: 'Expand', value: 8230, color: '#3B82F6' },
  { name: 'Contract', value: 2100, color: '#F59E0B' },
  { name: 'Churn', value: 4500, color: '#EF4444' },
]
const netMRR = 12340 + 8230 - 2100 - 4500 // = $13,970

// Acquisition Metrics
const acquisitionMetrics = {
  cac: 145,
  cacTrend: [165, 160, 158, 155, 150, 148, 145],
  paybackPeriod: 4.2,
  trialToPaid: 24,
  trialToPaidTrend: [18, 19, 20, 21, 22, 23, 24],
}

// Engagement Metrics
const engagementMetrics = {
  dauMau: 34,
  avgSession: 12,
  featureAdoption: 67,
  engagementTrend: [28, 29, 30, 31, 32, 33, 34],
}

// Retention Metrics
const retentionMetrics = {
  netRevenueRetention: 112,
  logoRetention: 94,
  expansionRevenue: 8200,
  retentionTrend: [105, 106, 108, 109, 110, 111, 112],
}

// Cohort Retention Data (for heatmap)
const generateCohortData = () => {
  const data: { date: string; value: number }[] = []

  // Generate 6 months of cohort data (rows) x 6 months retention (cols)
  for (let cohortMonth = 0; cohortMonth < 6; cohortMonth++) {
    for (let retentionMonth = 0; retentionMonth <= 5 - cohortMonth; retentionMonth++) {
      // Retention decreases over time but varies
      const baseRetention = 100 - retentionMonth * 12
      const variance = Math.random() * 10 - 5
      const retention = Math.max(40, Math.min(100, baseRetention + variance))

      const date = new Date(2025, 7 + cohortMonth + retentionMonth, 1)
      data.push({
        date: date.toISOString().split('T')[0] || '',
        value: Math.round(retention),
      })
    }
  }
  return data
}
const cohortData = generateCohortData()

// Plan Distribution
const planDistribution = [
  { plan: 'Free', users: 4230, percentage: 42, revenue: 0, color: '#6B7280', icon: Users },
  { plan: 'Starter', users: 1580, percentage: 16, revenue: 23700, color: '#10B981', icon: Rocket },
  { plan: 'Pro', users: 3104, percentage: 31, revenue: 77600, color: '#3B82F6', icon: Zap },
  { plan: 'Enterprise', users: 900, percentage: 11, revenue: 49850, color: '#8B5CF6', icon: Crown },
]

// Customer Growth (Recent)
interface Customer {
  id: string
  name: string
  email: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  mrr: number
  status: 'active' | 'trial' | 'churned'
  signupDate: string
  isUpgrade?: boolean
}

const recentCustomers: Customer[] = [
  { id: '1', name: 'TechFlow Inc', email: 'admin@techflow.io', plan: 'Enterprise', mrr: 499, status: 'active', signupDate: '2026-02-08', isUpgrade: true },
  { id: '2', name: 'DataSync Corp', email: 'billing@datasync.co', plan: 'Pro', mrr: 49, status: 'active', signupDate: '2026-02-08' },
  { id: '3', name: 'CloudNine Ltd', email: 'info@cloudnine.com', plan: 'Pro', mrr: 49, status: 'trial', signupDate: '2026-02-07' },
  { id: '4', name: 'StartupXYZ', email: 'founder@startupxyz.io', plan: 'Free', mrr: 0, status: 'active', signupDate: '2026-02-07' },
  { id: '5', name: 'GrowthCo', email: 'team@growthco.io', plan: 'Enterprise', mrr: 499, status: 'active', signupDate: '2026-02-06', isUpgrade: true },
  { id: '6', name: 'Innovate Inc', email: 'contact@innovate.com', plan: 'Pro', mrr: 49, status: 'active', signupDate: '2026-02-06' },
  { id: '7', name: 'NextGen Labs', email: 'hello@nextgen.dev', plan: 'Free', mrr: 0, status: 'trial', signupDate: '2026-02-05' },
  { id: '8', name: 'Alpha Systems', email: 'support@alpha.systems', plan: 'Pro', mrr: 49, status: 'active', signupDate: '2026-02-05' },
  { id: '9', name: 'Nebula AI', email: 'ops@nebula-ai.com', plan: 'Enterprise', mrr: 499, status: 'active', signupDate: '2026-02-04', isUpgrade: true },
  { id: '10', name: 'Velocity Labs', email: 'dev@velocitylabs.io', plan: 'Pro', mrr: 49, status: 'active', signupDate: '2026-02-04' },
  { id: '11', name: 'BrightPath Co', email: 'hello@brightpath.co', plan: 'Free', mrr: 0, status: 'trial', signupDate: '2026-02-03' },
  { id: '12', name: 'Quantum Edge', email: 'info@quantumedge.dev', plan: 'Pro', mrr: 49, status: 'active', signupDate: '2026-02-03', isUpgrade: true },
  { id: '13', name: 'Pinnacle SaaS', email: 'team@pinnaclesaas.com', plan: 'Enterprise', mrr: 499, status: 'active', signupDate: '2026-02-02' },
  { id: '14', name: 'SwiftDeploy', email: 'admin@swiftdeploy.io', plan: 'Pro', mrr: 49, status: 'trial', signupDate: '2026-02-02' },
]

// Churn Risk Customers
interface ChurnRisk {
  id: string
  name: string
  mrr: number
  daysWithoutLogin: number
  healthScore: number
  riskLevel: 'high' | 'medium' | 'low'
}

const churnRiskCustomers: ChurnRisk[] = [
  { id: '1', name: 'Legacy Corp', mrr: 199, daysWithoutLogin: 45, healthScore: 15, riskLevel: 'high' },
  { id: '2', name: 'OldSchool Inc', mrr: 99, daysWithoutLogin: 32, healthScore: 28, riskLevel: 'high' },
  { id: '3', name: 'Dormant LLC', mrr: 149, daysWithoutLogin: 21, healthScore: 42, riskLevel: 'medium' },
  { id: '4', name: 'Inactive Co', mrr: 49, daysWithoutLogin: 18, healthScore: 55, riskLevel: 'medium' },
  { id: '5', name: 'SlowStart Ltd', mrr: 299, daysWithoutLogin: 14, healthScore: 65, riskLevel: 'low' },
]

// Key Metrics Comparison
const metricsComparison = [
  { metric: 'MRR', thisMonth: 127450, lastMonth: 120000, goal: 130000, sparkline: [108000, 112000, 118000, 120000, 124000, 127450] },
  { metric: 'New Signups', thisMonth: 342, lastMonth: 298, goal: 350, sparkline: [280, 290, 305, 298, 320, 342] },
  { metric: 'Churn Rate', thisMonth: 2.1, lastMonth: 2.4, goal: 2.0, sparkline: [2.8, 2.6, 2.5, 2.4, 2.2, 2.1], inverse: true },
  { metric: 'NPS Score', thisMonth: 72, lastMonth: 68, goal: 75, sparkline: [62, 64, 66, 68, 70, 72] },
  { metric: 'ARPU', thisMonth: 45.20, lastMonth: 43.80, goal: 48.00, sparkline: [41, 42, 43, 43.8, 44.5, 45.2] },
]

// Table Columns for Customers
const customerColumns: ColumnDef<Customer>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Customer',
    sortable: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size="sm" fallback={row.name.split(' ').map((n: string) => n[0]).join('')} />
        <div>
          <p className="font-medium text-[var(--text-primary)]">{row.name}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.email}</p>
        </div>
        {row.isUpgrade && (
          <Badge variant="success" size="sm" className="ml-1">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            Upgrade
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: 'plan',
    accessorKey: 'plan',
    header: 'Plan',
    sortable: true,
    cell: ({ value }) => {
      const variants: Record<string, 'default' | 'info' | 'primary'> = {
        Free: 'default',
        Pro: 'info',
        Enterprise: 'primary',
      }
      const icons: Record<string, typeof Zap> = {
        Free: Users,
        Pro: Zap,
        Enterprise: Crown,
      }
      const Icon = icons[value as string] || Users
      return (
        <Badge variant={variants[value as string] || 'default'} size="sm">
          <Icon className="h-3 w-3 mr-1" />
          {String(value)}
        </Badge>
      )
    },
  },
  {
    id: 'mrr',
    accessorKey: 'mrr',
    header: 'MRR',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-semibold text-[var(--text-primary)]">
        ${(value as number).toLocaleString()}
      </span>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => {
      const variants: Record<string, 'success' | 'warning' | 'error'> = {
        active: 'success',
        trial: 'warning',
        churned: 'error',
      }
      return <Badge variant={variants[value as string]} size="sm">{value as string}</Badge>
    },
  },
  {
    id: 'signupDate',
    accessorKey: 'signupDate',
    header: 'Signed Up',
    sortable: true,
    cell: ({ value }) => {
      const date = new Date(value as string)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    },
  },
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Hero Metric Card
function HeroMetric({
  label,
  value,
  change,
  prefix = '',
  suffix = '',
  sparkline,
  inverse = false,
}: {
  label: string
  value: number
  change: number
  prefix?: string
  suffix?: string
  sparkline?: number[]
  inverse?: boolean
}) {
  const isPositive = inverse ? change < 0 : change > 0

  return (
    <div className="min-w-0 lg:flex-1 lg:min-w-[140px]">
      <p className="text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
        <span className="text-lg sm:text-2xl font-bold text-white">
          {prefix}{typeof value === 'number' && value >= 1000
            ? value >= 1000000
              ? `${(value / 1000000).toFixed(2)}M`
              : `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`
            : value.toLocaleString()}{suffix}
        </span>
        <span className={`flex items-center text-[10px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded-full ${isPositive ? 'bg-green-400/20 text-green-200' : 'bg-red-400/20 text-red-200'}`}>
          {isPositive ? <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />}
          {Math.abs(change)}%
        </span>
      </div>
      {sparkline && (
        <div className="mt-1.5 sm:mt-2 hidden sm:flex items-end gap-[3px] h-7">
          {sparkline.slice(-8).map((val, i, arr) => {
            const maxVal = Math.max(...arr)
            const minVal = Math.min(...arr)
            const range = maxVal - minVal || 1
            const height = 20 + ((val - minVal) / range) * 80
            const isLast = i === arr.length - 1
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: `${height}%`,
                  background: isLast
                    ? 'rgba(255,255,255,0.9)'
                    : `rgba(255,255,255,${0.2 + (i / arr.length) * 0.35})`,
                  boxShadow: isLast ? '0 0 8px rgba(255,255,255,0.4)' : 'none',
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Cohort Heatmap Table (UNIQUE COMPONENT!)
function CohortRetentionTable() {
  const cohorts = ['Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026']
  const months = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']

  // Generate retention data (deterministic based on indices)
  const retentionData = cohorts.map((_, cohortIdx) => {
    return months.slice(0, 8 - cohortIdx).map((_, monthIdx) => {
      const baseRetention = 100 - monthIdx * 10
      // Use deterministic pseudo-random based on cohort + month
      const seed = (cohortIdx * 7 + monthIdx * 13 + 5) % 10
      const variance = seed - 5
      return Math.round(Math.max(35, Math.min(100, baseRetention + variance)))
    })
  })

  // Calculate averages per month column
  const monthAverages = months.map((_, monthIdx) => {
    const values: number[] = []
    retentionData.forEach((row) => {
      const val = row[monthIdx]
      if (val !== undefined) values.push(val)
    })
    return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0
  })

  // Find best cohort (highest M3 retention)
  let bestCohortIdx = 0
  let bestM3 = 0
  retentionData.forEach((row, idx) => {
    const m3 = row[3]
    if (m3 !== undefined && m3 > bestM3) {
      bestM3 = m3
      bestCohortIdx = idx
    }
  })

  const getColor = (value: number) => {
    if (value >= 85) return 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm shadow-green-500/20'
    if (value >= 70) return 'bg-gradient-to-br from-green-400 to-green-500 shadow-sm shadow-green-400/20'
    if (value >= 55) return 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-sm shadow-yellow-400/20'
    if (value >= 40) return 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-sm shadow-orange-400/20'
    return 'bg-gradient-to-br from-red-400 to-red-500 shadow-sm shadow-red-400/20'
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2.5 px-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Cohort</th>
              {months.map((month) => (
                <th key={month} className="text-center py-2.5 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, cohortIdx) => (
              <tr key={cohort} className={cohortIdx === bestCohortIdx ? 'bg-green-50/50 dark:bg-green-900/5' : ''}>
                <td className="py-2 px-2.5 text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {cohort}
                    {cohortIdx === bestCohortIdx && (
                      <Star className="h-3 w-3 text-amber-500" />
                    )}
                  </div>
                </td>
                {months.map((_, monthIdx) => {
                  const value = retentionData[cohortIdx]?.[monthIdx]
                  if (value === undefined) {
                    return <td key={monthIdx} className="py-2 px-1.5" />
                  }
                  return (
                    <td key={monthIdx} className="py-2 px-1.5">
                      <div
                        className={`rounded-lg px-2 py-2 text-center text-white font-bold transition-all duration-200 hover:scale-110 cursor-default ${getColor(value)}`}
                        title={`${cohort} - Month ${monthIdx}: ${value}% retention`}
                      >
                        {value}%
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
            {/* Average row */}
            <tr className="border-t-2 border-[var(--border-default)]">
              <td className="py-2.5 px-2.5 text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">Avg</td>
              {monthAverages.map((avg, idx) => (
                <td key={idx} className="py-2.5 px-1.5">
                  {avg > 0 && (
                    <div className="text-center text-xs font-bold text-[var(--text-primary)]">
                      {avg}%
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/15 dark:to-emerald-900/15 p-3 border border-green-200/50 dark:border-green-800/30">
          <p className="text-xs font-medium text-green-600 dark:text-green-400">Best Cohort</p>
          <p className="text-lg font-bold text-green-700 dark:text-green-300">{cohorts[bestCohortIdx]}</p>
          <p className="text-xs text-green-600/70 dark:text-green-400/70">M3: {bestM3}% retention</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/15 p-3 border border-violet-200/50 dark:border-violet-800/30">
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Avg M1 Retention</p>
          <p className="text-lg font-bold text-violet-700 dark:text-violet-300">{monthAverages[1]}%</p>
          <p className="text-xs text-violet-600/70 dark:text-violet-400/70">First month drop-off</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 p-3 border border-blue-200/50 dark:border-blue-800/30">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Avg M6 Retention</p>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{monthAverages[6] || '—'}%</p>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Long-term stickiness</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-default)]">
        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
          <Star className="h-3 w-3 text-amber-500" />
          <span>Best performing cohort</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[var(--text-muted)]">Retention:</span>
          {[
            { color: 'bg-red-400', label: '<40%' },
            { color: 'bg-orange-400', label: '40-55%' },
            { color: 'bg-yellow-400', label: '55-70%' },
            { color: 'bg-green-400', label: '70-85%' },
            { color: 'bg-green-500', label: '>85%' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${item.color}`} />
              <span className="text-xs text-[var(--text-muted)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SaaSMetricsDashboard() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const totalAtRiskMRR = churnRiskCustomers.reduce((sum, c) => sum + c.mrr, 0)

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hidden md:block md:w-48" />
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            SaaS Metrics
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Growth metrics, revenue analytics, and customer insights
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
            Refresh Data
          </Button>
        </div>
      </div>

      {/* ====== HERO METRICS BAR (PREMIUM!) ====== */}
      {isLoading ? (
        <Skeleton className="h-36 rounded-2xl" />
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 sm:p-6 shadow-xl shadow-violet-500/20">
          {/* Premium overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.15),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_60%)]" />
          {/* Decorative dots */}
          <div className="absolute top-4 right-8 opacity-20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:items-start lg:justify-between lg:gap-6">
            <HeroMetric
              label="MRR"
              value={heroMetrics.mrr.value}
              change={heroMetrics.mrr.change}
              prefix="$"
              sparkline={heroMetrics.mrr.sparkline}
            />
            <div className="hidden lg:block w-px h-20 bg-white/20 self-center" />
            <HeroMetric
              label="ARR"
              value={heroMetrics.arr.value}
              change={heroMetrics.arr.change}
              prefix="$"
              sparkline={heroMetrics.arr.sparkline}
            />
            <div className="hidden lg:block w-px h-20 bg-white/20 self-center" />
            <HeroMetric
              label="Active Users"
              value={heroMetrics.activeUsers.value}
              change={heroMetrics.activeUsers.change}
              sparkline={heroMetrics.activeUsers.sparkline}
            />
            <div className="hidden lg:block w-px h-20 bg-white/20 self-center" />
            <HeroMetric
              label="Churn Rate"
              value={heroMetrics.churnRate.value}
              change={heroMetrics.churnRate.change}
              suffix="%"
              sparkline={heroMetrics.churnRate.sparkline}
              inverse
            />
            <div className="hidden lg:block w-px h-20 bg-white/20 self-center" />
            <HeroMetric
              label="LTV"
              value={heroMetrics.ltv.value}
              change={heroMetrics.ltv.change}
              prefix="$"
              sparkline={heroMetrics.ltv.sparkline}
            />
            <div className="hidden lg:block w-px h-20 bg-white/20 self-center" />
            <HeroMetric
              label="NRR"
              value={heroMetrics.nrr.value}
              change={heroMetrics.nrr.change}
              suffix="%"
              sparkline={heroMetrics.nrr.sparkline}
            />
          </div>
        </div>
      )}

      {/* ====== ROW 1: REVENUE GROWTH + MRR BREAKDOWN ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue Growth - 60% */}
        <Card className="relative overflow-hidden lg:col-span-3">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-950/20 dark:to-purple-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm shadow-violet-500/25">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  Revenue Growth
                </Card.Title>
                <Card.Description className="mt-1">MRR over the last 12 months with projections</Card.Description>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  <Target className="h-3 w-3 mr-1" />
                  $150K Goal
                </Badge>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-72 rounded-lg" />
            ) : (
              <div className="relative -mx-6 sm:mx-0">
                <ChartWrapper
                  type="area"
                  data={revenueGrowthData}
                  series={[
                    { dataKey: 'mrr', name: 'MRR', color: '#8B5CF6', fillOpacity: 0.4 },
                  ]}
                  xAxisKey="month"
                  height={320}
                  showLegend
                  showTooltip
                  showGrid
                  tooltipFormatter={(value) => '$' + (value as number).toLocaleString()}
                />
                {/* Annotations */}
                <div className="absolute top-4 left-[30%] text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full shadow-sm font-medium hidden sm:block">
                  Launched Pro Plan
                </div>
                <div className="absolute top-4 left-[55%] text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full shadow-sm font-medium hidden sm:block">
                  Price Increase
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* MRR Breakdown - 40% */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 dark:from-emerald-950/20 dark:to-blue-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 shadow-sm shadow-emerald-500/25">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              MRR Breakdown
            </Card.Title>
            <Card.Description className="mt-1">Monthly recurring revenue changes</Card.Description>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <ChartWrapper
                    type="donut"
                    data={mrrBreakdownData}
                    series={[{ dataKey: 'value', name: 'Amount' }]}
                    xAxisKey="name"
                    height={192}
                    showTooltip
                    tooltipFormatter={(value) => '$' + (value as number).toLocaleString()}
                  />
                  {/* Center Net MRR */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="bg-[var(--bg-base)] rounded-full px-4 py-2 flex flex-col items-center shadow-sm">
                      <span className="text-xs text-[var(--text-muted)]">Net MRR</span>
                      <span className="text-xl font-bold text-green-600 dark:text-green-400">
                        +${netMRR.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                  {mrrBreakdownData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5 min-w-0 rounded-lg p-1.5 transition-colors hover:bg-[var(--bg-muted)]">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white dark:ring-secondary-800" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[var(--text-secondary)] truncate">{item.name}</span>
                      <span className={`text-xs font-bold ml-auto whitespace-nowrap flex-shrink-0 ${item.name === 'Churn' || item.name === 'Contract' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {item.name === 'Churn' || item.name === 'Contract' ? '-' : '+'}${item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 2: 3 METRIC CARDS (PREMIUM KPI) ====== */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Acquisition */}
        <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-950/20 dark:to-cyan-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <Card.Content className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                  <UserPlus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-[var(--text-primary)]">Acquisition</span>
                  <p className="text-xs text-[var(--text-muted)]">Customer acquisition cost</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <TrendingDown className="h-3 w-3 mr-0.5" />
                Improving
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-40 mt-4 rounded-lg" />
            ) : (
              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">CAC</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${acquisitionMetrics.cac}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Payback Period</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">{acquisitionMetrics.paybackPeriod} mo</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Trial to Paid</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{acquisitionMetrics.trialToPaid}%</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1.5">CAC Trend (decreasing is good)</p>
                  <SparklineChart
                    data={acquisitionMetrics.cacTrend}
                    type="area"
                    color="#3B82F6"
                    width={220}
                    height={36}
                    gradient
                    animated
                  />
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Engagement */}
        <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 dark:from-emerald-950/20 dark:to-green-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
          <Card.Content className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/25">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-[var(--text-primary)]">Engagement</span>
                  <p className="text-xs text-[var(--text-muted)]">User activity metrics</p>
                </div>
              </div>
              <Badge variant="info" size="sm">
                <Eye className="h-3 w-3 mr-0.5" />
                Active
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-40 mt-4 rounded-lg" />
            ) : (
              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">DAU/MAU</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{engagementMetrics.dauMau}%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Avg Session</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">{engagementMetrics.avgSession} min</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Feature Adoption</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">{engagementMetrics.featureAdoption}%</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1.5">Engagement Trend</p>
                  <SparklineChart
                    data={engagementMetrics.engagementTrend}
                    type="area"
                    color="#10B981"
                    width={220}
                    height={36}
                    gradient
                    animated
                  />
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Retention */}
        <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 dark:from-purple-950/20 dark:to-violet-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-400" />
          <Card.Content className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/25">
                  <Repeat className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-[var(--text-primary)]">Retention</span>
                  <p className="text-xs text-[var(--text-muted)]">Revenue retention metrics</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <Heart className="h-3 w-3 mr-0.5" />
                Healthy
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-40 mt-4 rounded-lg" />
            ) : (
              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between rounded-lg bg-green-50 dark:bg-green-900/20 p-2.5 border border-green-200 dark:border-green-800">
                  <span className="text-sm text-[var(--text-secondary)]">Net Revenue Retention</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{retentionMetrics.netRevenueRetention}%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Logo Retention</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">{retentionMetrics.logoRetention}%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[var(--bg-subtle)] p-2.5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-sm text-[var(--text-secondary)]">Expansion Revenue</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">${retentionMetrics.expansionRevenue.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1.5">NRR Trend</p>
                  <SparklineChart
                    data={retentionMetrics.retentionTrend}
                    type="area"
                    color="#8B5CF6"
                    width={220}
                    height={36}
                    gradient
                    animated
                  />
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 3: COHORT RETENTION + PLAN DISTRIBUTION ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cohort Retention Heatmap (UNIQUE!) */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-950/20 dark:to-purple-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm shadow-indigo-500/25">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Cohort Retention
                </Card.Title>
                <Card.Description className="mt-1">Monthly cohort retention analysis</Card.Description>
              </div>
              <Badge variant="info" size="sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Exclusive
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <CohortRetentionTable />
            )}
          </Card.Content>
        </Card>

        {/* Plan Distribution */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 dark:from-violet-950/20 dark:to-blue-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 shadow-sm shadow-violet-500/25">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Plan Distribution
                </Card.Title>
                <Card.Description className="mt-1">Users and revenue by plan tier</Card.Description>
              </div>
              <Badge variant="primary" size="sm">
                {planDistribution.reduce((s, p) => s + p.users, 0).toLocaleString()} total
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="space-y-4">
                {planDistribution.map((plan, idx) => {
                  const PlanIcon = plan.icon
                  const planStyle = plan.plan === 'Enterprise'
                    ? 'border-purple-400 dark:border-purple-600 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/20'
                    : plan.plan === 'Pro'
                    ? 'border-blue-400 dark:border-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                    : plan.plan === 'Starter'
                    ? 'border-emerald-400 dark:border-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
                    : 'border-secondary-300 dark:border-secondary-600 bg-[var(--bg-subtle)]'
                  const progressVariant = plan.plan === 'Enterprise' ? 'gradient' : plan.plan === 'Pro' ? 'info' : plan.plan === 'Starter' ? 'success' : 'default'

                  return (
                    <div key={plan.plan} className="relative">
                      <div className={`group rounded-xl p-4 border-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${planStyle}`}>
                        {plan.plan === 'Enterprise' && (
                          <div className="absolute -top-2.5 -right-2">
                            <Badge variant="primary" size="sm" className="shadow-lg shadow-violet-500/25">
                              <Crown className="h-3 w-3 mr-0.5" />
                              Premium
                            </Badge>
                          </div>
                        )}
                        {plan.plan === 'Starter' && (
                          <div className="absolute -top-2.5 -right-2">
                            <Badge variant="success" size="sm" className="shadow-lg shadow-emerald-500/25">
                              <Rocket className="h-3 w-3 mr-0.5" />
                              Popular
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm"
                              style={{ background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)` }}
                            >
                              <PlanIcon className="h-4 w-4" style={{ color: plan.color }} />
                            </div>
                            <div>
                              <span className="font-bold text-[var(--text-primary)]">{plan.plan}</span>
                              <p className="text-xs text-[var(--text-muted)]">{plan.percentage}% of users</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {plan.users.toLocaleString()}
                            <span className="text-sm font-normal text-[var(--text-muted)] ml-1">users</span>
                          </span>
                          <span className="text-lg font-bold" style={{ color: plan.color }}>
                            ${plan.revenue.toLocaleString()}
                            <span className="text-xs font-normal text-[var(--text-muted)]">/mo</span>
                          </span>
                        </div>
                        <div className="mt-3">
                          <ProgressBar
                            value={plan.percentage}
                            size="sm"
                            variant={progressVariant}
                          />
                        </div>
                      </div>
                      {idx < planDistribution.length - 1 && (
                        <div className="flex justify-center my-1.5">
                          <div className="flex items-center gap-1 text-xs text-green-500">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            <span className="font-medium">Upgrade path</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Revenue Summary Bar */}
                <div className="rounded-xl bg-gradient-to-r from-violet-50 via-blue-50 to-emerald-50 dark:from-violet-900/15 dark:via-blue-900/15 dark:to-emerald-900/15 border border-violet-200/50 dark:border-violet-800/30 p-3 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-blue-600 shadow-sm">
                        <DollarSign className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Total MRR</span>
                    </div>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
                      ${planDistribution.reduce((s, p) => s + p.revenue, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full mt-2.5">
                    {planDistribution.filter(p => p.revenue > 0).map((plan) => {
                      const totalRev = planDistribution.reduce((s, p) => s + p.revenue, 0)
                      return (
                        <div
                          key={plan.plan}
                          className="transition-all duration-500"
                          style={{
                            width: `${(plan.revenue / totalRev) * 100}%`,
                            backgroundColor: plan.color,
                          }}
                          title={`${plan.plan}: $${plan.revenue.toLocaleString()}`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                    {planDistribution.filter(p => p.revenue > 0).map((plan) => (
                      <div key={plan.plan} className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: plan.color }} />
                        <span className="font-medium">{plan.plan}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 4: CUSTOMER GROWTH + CHURN RISK ====== */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Growth Table */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-emerald-500/5 dark:from-teal-950/20 dark:to-emerald-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm shadow-teal-500/25">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                  Customer Growth
                </Card.Title>
                <Card.Description className="mt-1">Recent signups, upgrades and trial conversions</Card.Description>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="relative space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 rounded-lg" />
                  ))}
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={`row-${i}`} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="group rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/20">
                        <UserPlus className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-muted)]">New This Week</span>
                    </div>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">14</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">+23%</span>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20">
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-muted)]">Upgrades</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">4</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">+33%</span>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-cyan-800/10 border border-cyan-200/50 dark:border-cyan-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/20">
                        <Rocket className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-muted)]">Trial → Paid</span>
                    </div>
                    <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">24%</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">+2pp</span>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-800/10 border border-violet-200/50 dark:border-violet-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/20">
                        <DollarSign className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-muted)]">New MRR</span>
                    </div>
                    <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">$1,838</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">+18%</span>
                    </div>
                  </div>
                </div>

                {/* Weekly Growth Sparkline */}
                <div className="rounded-xl bg-[var(--bg-subtle)] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Weekly Signup Trend</span>
                    <span className="text-xs font-medium text-teal-600 dark:text-teal-400">Last 8 weeks</span>
                  </div>
                  <SparklineChart
                    data={[18, 22, 19, 25, 28, 24, 31, 34]}
                    height={48}
                    color="rgb(20, 184, 154)"
                    gradient
                    animated
                    showDot
                  />
                </div>

                {/* Mobile Carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-6 px-6 py-1 sm:hidden scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {recentCustomers.slice(0, 8).map((customer) => {
                    const planColors: Record<string, string> = {
                      Enterprise: 'from-violet-500 to-purple-600',
                      Pro: 'from-blue-500 to-indigo-600',
                      Free: 'from-gray-400 to-gray-500',
                    }
                    const statusColors: Record<string, string> = {
                      active: 'bg-green-400/20 text-green-600 dark:text-green-400',
                      trial: 'bg-amber-400/20 text-amber-600 dark:text-amber-400',
                      churned: 'bg-red-400/20 text-red-600 dark:text-red-400',
                    }
                    return (
                      <div
                        key={customer.id}
                        className="w-[72vw] max-w-[260px] flex-shrink-0 snap-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar size="md" fallback={customer.name.split(' ').map((n: string) => n[0]).join('')} />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{customer.name}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{customer.email}</p>
                          </div>
                        </div>
                        {customer.isUpgrade && (
                          <div className="mb-2">
                            <Badge variant="success" size="sm">
                              <ArrowUpRight className="h-3 w-3 mr-0.5" />
                              Upgrade
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant={customer.plan === 'Enterprise' ? 'primary' : customer.plan === 'Pro' ? 'info' : 'default'} size="sm">
                            {customer.plan === 'Enterprise' ? <Crown className="h-3 w-3 mr-1" /> : customer.plan === 'Pro' ? <Zap className="h-3 w-3 mr-1" /> : <Users className="h-3 w-3 mr-1" />}
                            {customer.plan}
                          </Badge>
                          <span className="text-sm font-bold text-[var(--text-primary)]">${customer.mrr}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-default)]">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[customer.status]}`}>
                            {customer.status}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {new Date(customer.signupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Data Table (desktop) */}
                <div className="-mx-5 -mb-1 hidden sm:block">
                  <DataTable
                    data={recentCustomers}
                    columns={customerColumns}
                    sortable
                    pagination
                    pageSize={8}
                    hoverable
                  />
                </div>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Churn Risk */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 dark:from-red-950/20 dark:to-orange-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-600 shadow-sm shadow-red-500/25">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-red-600 dark:text-red-400">Churn Risk</span>
                </Card.Title>
                <Card.Description className="mt-1">
                  <span className="font-semibold text-red-600 dark:text-red-400">${totalAtRiskMRR}/mo</span> at risk
                </Card.Description>
              </div>
              <Badge variant="error" size="sm">
                {churnRiskCustomers.length} accounts
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {churnRiskCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`group rounded-xl border p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
                      customer.riskLevel === 'high'
                        ? 'border-red-300 dark:border-red-800 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10'
                        : customer.riskLevel === 'medium'
                        ? 'border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-amber-900/20 dark:to-amber-900/10'
                        : 'border-[var(--border-default)] bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{customer.name}</span>
                      <Badge
                        variant={customer.riskLevel === 'high' ? 'error' : customer.riskLevel === 'medium' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {customer.riskLevel === 'high' ? <AlertTriangle className="h-3 w-3 mr-0.5" /> : null}
                        {customer.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-medium">${customer.mrr}/mo at risk</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {customer.daysWithoutLogin}d inactive
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[var(--text-muted)]">Health Score</span>
                        <span className={`font-bold ${customer.healthScore < 30 ? 'text-red-600 dark:text-red-400' : customer.healthScore < 60 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                          {customer.healthScore}%
                        </span>
                      </div>
                      <ProgressBar
                        value={customer.healthScore}
                        size="sm"
                        variant={customer.healthScore < 30 ? 'error' : customer.healthScore < 60 ? 'warning' : 'success'}
                      />
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" leftIcon={<Mail className="h-3 w-3" />}>
                      Reach Out
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 5: KEY METRICS COMPARISON ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 dark:from-violet-950/20 dark:to-indigo-950/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm shadow-violet-500/25">
                  <Target className="h-4 w-4 text-white" />
                </div>
                Key Metrics Comparison
              </Card.Title>
              <Card.Description className="mt-1">This month vs last month vs goal</Card.Description>
            </div>
            <Badge variant="info" size="sm">
              <Star className="h-3 w-3 mr-1" />
              Monthly Review
            </Badge>
          </div>
        </Card.Header>
        <Card.Content padding="none" className="relative">
          {isLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--bg-subtle)]">
                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Metric</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">This Month</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Last Month</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Goal</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">vs Goal</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {metricsComparison.map((item, idx) => {
                    const vsGoal = item.inverse
                      ? ((item.goal - item.thisMonth) / item.goal * 100)
                      : ((item.thisMonth - item.goal) / item.goal * 100)
                    const isAboveGoal = item.inverse ? item.thisMonth <= item.goal : item.thisMonth >= item.goal
                    const isPrefix = item.metric === 'MRR' || item.metric === 'ARPU'

                    return (
                      <tr key={item.metric} className="border-b border-[var(--border-default)] last:border-b-0 transition-colors hover:bg-violet-50/50 dark:hover:bg-violet-900/10">
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[var(--text-primary)]">{item.metric}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-lg text-[var(--text-primary)]">
                            {isPrefix ? '$' : ''}{typeof item.thisMonth === 'number' ? item.thisMonth.toLocaleString() : item.thisMonth}{item.metric === 'Churn Rate' ? '%' : ''}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-[var(--text-secondary)]">
                            {isPrefix ? '$' : ''}{typeof item.lastMonth === 'number' ? item.lastMonth.toLocaleString() : item.lastMonth}{item.metric === 'Churn Rate' ? '%' : ''}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-[var(--text-muted)] font-medium">
                            {isPrefix ? '$' : ''}{typeof item.goal === 'number' ? item.goal.toLocaleString() : item.goal}{item.metric === 'Churn Rate' ? '%' : ''}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Badge variant={isAboveGoal ? 'success' : 'error'} size="sm">
                            {isAboveGoal ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                            {Math.abs(vsGoal).toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex justify-end">
                            <SparklineChart
                              data={item.sparkline}
                              type="area"
                              color={isAboveGoal ? '#22C55E' : '#EF4444'}
                              width={80}
                              height={28}
                              gradient
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
