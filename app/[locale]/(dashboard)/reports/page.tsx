'use client'

import * as React from 'react'
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Eye,
  Share2,
  Trash2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  FileBarChart,
  FolderOpen,
  Zap,
  PieChart,
  ArrowRight,
  Activity,
  Timer,
  FileCheck,
  Send,
  Layers,
} from 'lucide-react'

import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { Skeleton } from '@core/primitives/Skeleton'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { cn } from '@shared/utils/cn'

// ============================================================================
// PREMIUM CONFIGS
// ============================================================================

const REPORT_TYPE_CONFIG: Record<string, { gradient: string; lightBg: string; darkBg: string; text: string; border: string; dot: string }> = {
  financial: { gradient: 'from-emerald-500 to-teal-500', lightBg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/50 dark:border-emerald-800/30', dot: 'from-emerald-400 to-teal-400' },
  analytics: { gradient: 'from-indigo-500 to-violet-500', lightBg: 'bg-indigo-50', darkBg: 'dark:bg-indigo-950/20', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200/50 dark:border-indigo-800/30', dot: 'from-indigo-400 to-violet-400' },
  sales: { gradient: 'from-amber-500 to-yellow-500', lightBg: 'bg-amber-50', darkBg: 'dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200/50 dark:border-amber-800/30', dot: 'from-amber-400 to-yellow-400' },
  inventory: { gradient: 'from-red-500 to-rose-500', lightBg: 'bg-red-50', darkBg: 'dark:bg-red-950/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200/50 dark:border-red-800/30', dot: 'from-red-400 to-rose-400' },
  hr: { gradient: 'from-purple-500 to-fuchsia-500', lightBg: 'bg-purple-50', darkBg: 'dark:bg-purple-950/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200/50 dark:border-purple-800/30', dot: 'from-purple-400 to-fuchsia-400' },
  custom: { gradient: 'from-pink-500 to-rose-500', lightBg: 'bg-pink-50', darkBg: 'dark:bg-pink-950/20', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-200/50 dark:border-pink-800/30', dot: 'from-pink-400 to-rose-400' },
}

const STATUS_CONFIG: Record<string, { gradient: string; lightBg: string; darkBg: string; text: string; border: string; animated: boolean; icon: React.ReactNode }> = {
  completed: { gradient: 'from-emerald-500 to-green-500', lightBg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/50 dark:border-emerald-800/30', animated: false, icon: <CheckCircle2 className="h-3 w-3" /> },
  processing: { gradient: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', darkBg: 'dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200/50 dark:border-amber-800/30', animated: true, icon: <RefreshCw className="h-3 w-3 animate-spin" /> },
  scheduled: { gradient: 'from-blue-500 to-indigo-500', lightBg: 'bg-blue-50', darkBg: 'dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/50 dark:border-blue-800/30', animated: false, icon: <Clock className="h-3 w-3" /> },
  failed: { gradient: 'from-red-500 to-rose-500', lightBg: 'bg-red-50', darkBg: 'dark:bg-red-950/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200/50 dark:border-red-800/30', animated: true, icon: <AlertCircle className="h-3 w-3" /> },
}

// ============================================================================
// MOCK DATA
// ============================================================================

const reportStats = [
  { title: 'Total Reports', value: '248', change: '+12%', positive: true, icon: FileText, gradient: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-500/25', trend: [18, 22, 19, 25, 23, 28, 26, 30, 32, 29, 35, 38] },
  { title: 'Generated Today', value: '18', change: '+3', positive: true, icon: BarChart3, gradient: 'from-amber-500 to-yellow-500', shadow: 'shadow-amber-500/25', trend: [5, 8, 12, 7, 15, 10, 18, 14, 9, 16, 11, 18] },
  { title: 'Scheduled', value: '34', change: '0%', positive: true, icon: Calendar, gradient: 'from-violet-500 to-purple-500', shadow: 'shadow-violet-500/25', trend: [30, 31, 32, 30, 33, 34, 34, 33, 34, 34, 35, 34] },
  { title: 'Downloads', value: '1,847', change: '+28%', positive: true, icon: Download, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/25', trend: [120, 145, 180, 160, 195, 210, 230, 250, 220, 270, 290, 310] },
]

type ReportStatus = 'completed' | 'processing' | 'scheduled' | 'failed'
type ReportType = 'financial' | 'analytics' | 'sales' | 'inventory' | 'hr' | 'custom'

interface Report {
  id: string
  name: string
  type: ReportType
  status: ReportStatus
  createdAt: string
  createdBy: string
  size: string
  downloads: number
  schedule: string | null
}

const reportsData: Report[] = [
  { id: 'RPT-001', name: 'Monthly Revenue Report', type: 'financial', status: 'completed', createdAt: '2026-02-08', createdBy: 'John Doe', size: '2.4 MB', downloads: 45, schedule: 'Monthly' },
  { id: 'RPT-002', name: 'Q1 Sales Analysis', type: 'sales', status: 'completed', createdAt: '2026-02-07', createdBy: 'Jane Smith', size: '5.1 MB', downloads: 32, schedule: 'Quarterly' },
  { id: 'RPT-003', name: 'User Engagement Metrics', type: 'analytics', status: 'processing', createdAt: '2026-02-08', createdBy: 'Alex Chen', size: '—', downloads: 0, schedule: null },
  { id: 'RPT-004', name: 'Inventory Turnover', type: 'inventory', status: 'completed', createdAt: '2026-02-06', createdBy: 'Sarah Lee', size: '1.8 MB', downloads: 18, schedule: 'Weekly' },
  { id: 'RPT-005', name: 'Employee Satisfaction Survey', type: 'hr', status: 'completed', createdAt: '2026-02-05', createdBy: 'Mark Wilson', size: '3.2 MB', downloads: 67, schedule: 'Quarterly' },
  { id: 'RPT-006', name: 'Marketing Campaign ROI', type: 'analytics', status: 'scheduled', createdAt: '2026-02-09', createdBy: 'System', size: '—', downloads: 0, schedule: 'Monthly' },
  { id: 'RPT-007', name: 'Custom Dashboard Export', type: 'custom', status: 'completed', createdAt: '2026-02-08', createdBy: 'John Doe', size: '890 KB', downloads: 5, schedule: null },
  { id: 'RPT-008', name: 'Daily Transaction Log', type: 'financial', status: 'failed', createdAt: '2026-02-08', createdBy: 'System', size: '—', downloads: 0, schedule: 'Daily' },
  { id: 'RPT-009', name: 'Product Performance', type: 'sales', status: 'completed', createdAt: '2026-02-04', createdBy: 'Jane Smith', size: '4.7 MB', downloads: 23, schedule: 'Weekly' },
  { id: 'RPT-010', name: 'Annual Compliance Report', type: 'hr', status: 'completed', createdAt: '2026-02-01', createdBy: 'Legal Team', size: '8.3 MB', downloads: 89, schedule: 'Yearly' },
]

const reportTypeData = [
  { name: 'Financial', value: 68, color: '#14B89A', gradient: 'from-emerald-500 to-teal-500', lightBg: 'bg-emerald-50 dark:bg-emerald-950/20', trend: [8, 12, 10, 15, 11, 14, 13, 16, 14, 18, 16, 20] },
  { name: 'Analytics', value: 52, color: '#6366F1', gradient: 'from-indigo-500 to-violet-500', lightBg: 'bg-indigo-50 dark:bg-indigo-950/20', trend: [6, 9, 7, 11, 10, 8, 12, 14, 11, 13, 15, 16] },
  { name: 'Sales', value: 45, color: '#F59E0B', gradient: 'from-amber-500 to-yellow-500', lightBg: 'bg-amber-50 dark:bg-amber-950/20', trend: [5, 7, 8, 6, 9, 10, 8, 11, 12, 10, 13, 14] },
  { name: 'Inventory', value: 38, color: '#EF4444', gradient: 'from-red-500 to-rose-500', lightBg: 'bg-red-50 dark:bg-red-950/20', trend: [4, 5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 11] },
  { name: 'HR', value: 28, color: '#8B5CF6', gradient: 'from-purple-500 to-fuchsia-500', lightBg: 'bg-purple-50 dark:bg-purple-950/20', trend: [3, 4, 3, 5, 4, 6, 5, 7, 6, 7, 8, 8] },
  { name: 'Custom', value: 17, color: '#EC4899', gradient: 'from-pink-500 to-rose-500', lightBg: 'bg-pink-50 dark:bg-pink-950/20', trend: [1, 2, 2, 3, 2, 3, 4, 3, 4, 5, 4, 5] },
]

const monthlyReportsData = [
  { month: 'Sep', reports: 142, downloads: 1120 },
  { month: 'Oct', reports: 168, downloads: 1340 },
  { month: 'Nov', reports: 155, downloads: 1280 },
  { month: 'Dec', reports: 189, downloads: 1560 },
  { month: 'Jan', reports: 210, downloads: 1720 },
  { month: 'Feb', reports: 248, downloads: 1847 },
]

const recentActivity = [
  { user: 'John Doe', action: 'Generated', report: 'Monthly Revenue Report', time: '5 min ago', actionColor: 'from-emerald-500 to-green-500', actionBg: 'bg-emerald-50 dark:bg-emerald-950/20', actionText: 'text-emerald-700 dark:text-emerald-300' },
  { user: 'System', action: 'Auto-generated', report: 'Daily Transaction Log', time: '1 hour ago', actionColor: 'from-blue-500 to-indigo-500', actionBg: 'bg-blue-50 dark:bg-blue-950/20', actionText: 'text-blue-700 dark:text-blue-300' },
  { user: 'Jane Smith', action: 'Downloaded', report: 'Q1 Sales Analysis', time: '2 hours ago', actionColor: 'from-violet-500 to-purple-500', actionBg: 'bg-violet-50 dark:bg-violet-950/20', actionText: 'text-violet-700 dark:text-violet-300' },
  { user: 'Alex Chen', action: 'Scheduled', report: 'User Engagement Metrics', time: '3 hours ago', actionColor: 'from-amber-500 to-orange-500', actionBg: 'bg-amber-50 dark:bg-amber-950/20', actionText: 'text-amber-700 dark:text-amber-300' },
  { user: 'Sarah Lee', action: 'Shared', report: 'Inventory Turnover', time: '5 hours ago', actionColor: 'from-pink-500 to-rose-500', actionBg: 'bg-pink-50 dark:bg-pink-950/20', actionText: 'text-pink-700 dark:text-pink-300' },
]

const quickActions = [
  { title: 'Generate Report', desc: 'Create a new custom report', icon: FileBarChart, gradient: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-500/20', lightBg: 'from-orange-50/50 to-amber-50/30', darkBg: 'dark:from-orange-950/10 dark:to-amber-950/5' },
  { title: 'Schedule Report', desc: 'Set up automated reports', icon: Timer, gradient: 'from-violet-500 to-purple-500', shadow: 'shadow-violet-500/20', lightBg: 'from-violet-50/50 to-purple-50/30', darkBg: 'dark:from-violet-950/10 dark:to-purple-950/5' },
  { title: 'Export Data', desc: 'Download reports as CSV/PDF', icon: Send, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20', lightBg: 'from-emerald-50/50 to-teal-50/30', darkBg: 'dark:from-emerald-950/10 dark:to-teal-950/5' },
  { title: 'Templates', desc: 'Browse report templates', icon: Layers, gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/20', lightBg: 'from-blue-50/50 to-indigo-50/30', darkBg: 'dark:from-blue-950/10 dark:to-indigo-950/5' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function ReportsPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeFilter, setActiveFilter] = React.useState<string>('all')

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredReports = activeFilter === 'all'
    ? reportsData
    : reportsData.filter(r => r.type === activeFilter)

  const totalReports = reportTypeData.reduce((sum, r) => sum + r.value, 0)

  const columns: ColumnDef<Report>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Report Name',
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', REPORT_TYPE_CONFIG[row.type]?.gradient ?? 'from-gray-500 to-gray-600')}>
            <FileText size={14} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{row.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{row.id} · {row.createdBy}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Type',
      sortable: true,
      cell: ({ row }) => {
        const cfg = REPORT_TYPE_CONFIG[row.type]
        return cfg ? (
          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
            <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', cfg.dot)} />
            {row.type}
          </span>
        ) : <span className="text-xs capitalize">{row.type}</span>
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      sortable: true,
      cell: ({ row }) => {
        const cfg = STATUS_CONFIG[row.status]
        return cfg ? (
          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
            {cfg.animated && <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r animate-pulse', cfg.gradient)} />}
            {cfg.icon}
            {row.status}
          </span>
        ) : null
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created',
      sortable: true,
      cell: ({ row }) => (
        <span className="text-sm text-[var(--text-secondary)]">{row.createdAt}</span>
      ),
    },
    {
      id: 'size',
      accessorKey: 'size',
      header: 'Size',
      cell: ({ row }) => (
        <span className="text-sm text-[var(--text-muted)]">{row.size}</span>
      ),
    },
    {
      id: 'downloads',
      accessorKey: 'downloads',
      header: 'Downloads',
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)]">{row.downloads}</span>
          {row.downloads > 30 && (
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={10} /> Popular
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'schedule',
      accessorKey: 'schedule',
      header: 'Schedule',
      cell: ({ row }) => row.schedule ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30">
          <Clock size={10} /> {row.schedule}
        </span>
      ) : <span className="text-xs text-[var(--text-muted)]">—</span>,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* ════════════════ PREMIUM HERO HEADER ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        {/* Decorative circles */}
        <div className="absolute top-6 right-6 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/5 to-amber-500/5 blur-2xl" />
        <div className="absolute bottom-0 right-24 h-20 w-20 rounded-full bg-gradient-to-br from-yellow-500/5 to-orange-500/5 blur-xl" />

        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-orange-50/40 to-transparent dark:from-orange-950/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                <FileBarChart size={28} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-md">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Reports & Analytics</h1>
              <p className="text-sm text-[var(--text-muted)]">Generate, schedule, and manage your business reports</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Summary badges */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30">
                <CheckCircle2 size={12} />
                {reportsData.filter(r => r.status === 'completed').length} completed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/30">
                <RefreshCw size={12} className="animate-spin" />
                {reportsData.filter(r => r.status === 'processing').length} processing
              </span>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:scale-[1.02]">
              <Plus size={16} /> New Report
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM STATS BAR ════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {reportStats.map((stat) => (
          <div key={stat.title} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]" style={{ '--hover-shadow': stat.shadow } as React.CSSProperties}>
            <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', stat.gradient)} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', stat.gradient, stat.shadow)}>
                  <stat.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</span>
                    <span className={cn('text-[10px] font-bold flex items-center gap-0.5', stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                      <TrendingUp size={10} /> {stat.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                <SparklineChart data={stat.trend} type="area" width={64} height={28} color={stat.gradient.includes('orange') ? '#f97316' : stat.gradient.includes('amber') ? '#f59e0b' : stat.gradient.includes('violet') ? '#8b5cf6' : '#10b981'} gradient showDot={false} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════ QUICK ACTIONS ════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button key={action.title} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] text-left">
            <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity', action.gradient)} />
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity', action.lightBg, action.darkBg)} />
            <div className="relative flex items-center gap-3">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-md transition-transform group-hover:scale-110', action.gradient, action.shadow)}>
                <action.icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{action.title}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{action.desc}</p>
              </div>
              <ArrowRight size={16} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>

      {/* ════════════════ CHARTS ROW ════════════════ */}
      <div className="grid grid-cols-2 gap-4">
        {/* Reports Generated */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Reports Generated</h3>
                  <p className="text-xs text-[var(--text-muted)]">Monthly generation trend</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 border border-emerald-200/50 dark:border-emerald-800/30">
                <TrendingUp size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">+18% growth</span>
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-[260px]" />
            ) : (
              <ChartWrapper
                type="bar"
                data={monthlyReportsData}
                series={[{ dataKey: 'reports', name: 'Reports', color: '#f97316' }]}
                xAxisKey="month"
                height={260}
              />
            )}
          </div>
        </div>

        {/* Report Types Distribution - Premium */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25">
                  <PieChart size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Report Types</h3>
                  <p className="text-xs text-[var(--text-muted)]">Distribution by category</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--text-muted)]">{totalReports} total</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-[260px]" />
            ) : (
              <div className="space-y-3">
                {reportTypeData.map((type) => (
                  <div key={type.name} className="group flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-[var(--bg-muted)] transition-colors">
                    <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', type.gradient)}>
                      <FolderOpen size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)] w-20">{type.name}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                      <div
                        className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', type.gradient)}
                        style={{ width: `${(type.value / totalReports) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-20 justify-end">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{type.value}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({Math.round((type.value / totalReports) * 100)}%)</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <SparklineChart data={type.trend} type="line" width={48} height={20} color={type.color} showDot={false} strokeWidth={1.5} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════ REPORT TYPE BREAKDOWN ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 via-emerald-500 via-indigo-500 to-purple-500" />
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
                <Activity size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Report Category Trends</h3>
                <p className="text-xs text-[var(--text-muted)]">Growth by report type over time</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {reportTypeData.map((type) => (
              <div key={type.name} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-3 hover:shadow-md transition-all hover:scale-[1.02]">
                <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', type.gradient)} />
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn('flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br shadow-sm', type.gradient)}>
                    <FileText size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{type.name}</span>
                </div>
                <div className="text-lg font-bold text-[var(--text-primary)]">{type.value}</div>
                <div className="mt-1">
                  <SparklineChart data={type.trend} type="area" width={100} height={32} color={type.color} gradient showDot strokeWidth={1.5} animated />
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <TrendingUp size={10} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">+{Math.round((type.trend[11]! - type.trend[0]!) / type.trend[0]! * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM FILTER BAR ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm shadow-orange-500/25">
              <Filter size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Filter by Type</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[{ key: 'all', label: 'All' }, ...reportTypeData.map(t => ({ key: t.name.toLowerCase(), label: t.name }))].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/20 px-2.5 py-1 border border-orange-200/50 dark:border-orange-800/30">
            <FileText size={12} className="text-orange-600 dark:text-orange-400" />
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">{filteredReports.length} reports</span>
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM REPORTS TABLE ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
                <FileCheck size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">All Reports</h3>
                <p className="text-xs text-[var(--text-muted)]">View and manage all generated reports</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/10 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-800/30 hover:shadow-sm transition-all">
              <Download size={12} /> Export All
            </button>
          </div>
          <DataTable
            data={filteredReports}
            columns={columns}
            filterable
            filterPlaceholder="Search reports..."
            pagination
            pageSize={10}
            loading={isLoading}
            hoverable
            rowActions={[
              {
                label: 'View',
                icon: <Eye className="h-4 w-4" />,
                onClick: (row) => console.log('View', row.id),
              },
              {
                label: 'Download',
                icon: <Download className="h-4 w-4" />,
                onClick: (row) => console.log('Download', row.id),
                disabled: (row) => row.status !== 'completed',
              },
              {
                label: 'Share',
                icon: <Share2 className="h-4 w-4" />,
                onClick: (row) => console.log('Share', row.id),
              },
              {
                label: 'Delete',
                icon: <Trash2 className="h-4 w-4" />,
                onClick: (row) => console.log('Delete', row.id),
                destructive: true,
              },
            ]}
          />
        </div>
      </div>

      {/* ════════════════ RECENT ACTIVITY - PREMIUM ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
                <Zap size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Recent Activity</h3>
                <p className="text-xs text-[var(--text-muted)]">Latest report actions and events</p>
              </div>
            </div>
            <span className="text-xs text-[var(--text-muted)]">Last 24 hours</span>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between rounded-xl border border-[var(--border-default)] p-3 transition-all hover:shadow-sm hover:scale-[1.005]"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', activity.actionColor)}>
                      <FileText size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">
                        <span className="font-semibold">{activity.user}</span>{' '}
                        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold mx-1 border', activity.actionBg, activity.actionText, 'border-transparent')}>
                          {activity.action}
                        </span>{' '}
                        <span className="font-medium">{activity.report}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
                      <Clock size={10} /> {activity.time}
                    </span>
                    <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════ STACKED CATEGORY BAR ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
              <Layers size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Category Distribution</h3>
              <p className="text-xs text-[var(--text-muted)]">{totalReports} reports across {reportTypeData.length} categories</p>
            </div>
          </div>
          {/* Stacked bar */}
          <div className="flex h-4 rounded-full overflow-hidden gap-0.5 mb-4">
            {reportTypeData.map((type) => (
              <div
                key={type.name}
                className={cn('h-full bg-gradient-to-r transition-all duration-500 first:rounded-l-full last:rounded-r-full', type.gradient)}
                style={{ width: `${(type.value / totalReports) * 100}%` }}
                title={`${type.name}: ${type.value}`}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4">
            {reportTypeData.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div className={cn('h-2.5 w-2.5 rounded-full bg-gradient-to-r', type.gradient)} />
                <span className="text-xs font-medium text-[var(--text-secondary)]">{type.name}</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{type.value}</span>
                <span className="text-[10px] text-[var(--text-muted)]">({Math.round((type.value / totalReports) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
