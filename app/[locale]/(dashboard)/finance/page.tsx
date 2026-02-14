'use client'

import * as React from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  PiggyBank,
  LineChart,
  Download,
  Plus,
  CreditCard,
  Building2,
  Smartphone,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Calendar,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MOCK DATA - Realistic Financial Data
// ============================================================================

// Current Balance & Overview
const balanceData = {
  current: 284592.0,
  change: 12450,
  changePercent: 4.6,
  last30Days: [
    265000, 268000, 271000, 269500, 273000, 275000, 272000, 278000, 280000, 276000,
    279000, 282000, 280500, 283000, 281000, 284000, 282500, 285000, 283000, 286000,
    284500, 287000, 285000, 288000, 286500, 289000, 287000, 284000, 286000, 284592,
  ],
}

// KPI Cards Data
const kpiData = {
  income: {
    value: 45240,
    change: 12.3,
    sparkline: [3200, 3800, 4100, 3900, 4500, 5200, 4800, 5400, 5100, 5800, 5500, 6200],
  },
  expenses: {
    value: 32180,
    change: -5.2,
    sparkline: [2800, 2600, 3100, 2900, 3200, 2700, 3000, 2800, 3300, 2900, 3100, 2680],
  },
  savings: {
    value: 13060,
    change: 28.5,
    sparkline: [800, 950, 1100, 1000, 1250, 1400, 1300, 1500, 1450, 1600, 1550, 1800],
  },
  investments: {
    value: 52400,
    change: 8.7,
    sparkline: [45000, 46200, 45800, 47000, 48500, 47800, 49000, 50200, 49500, 51000, 50800, 52400],
  },
}

// Cash Flow Data (6 months)
const cashFlowData = [
  { month: 'Aug', income: 38500, expenses: 28900 },
  { month: 'Sep', income: 41200, expenses: 31400 },
  { month: 'Oct', income: 39800, expenses: 29200 },
  { month: 'Nov', income: 43500, expenses: 32800 },
  { month: 'Dec', income: 47200, expenses: 35100 },
  { month: 'Jan', income: 45240, expenses: 32180 },
]

// Budget Overview
const budgetData = [
  { category: 'Marketing', used: 75, budget: 8000, spent: 6000, color: '#3B82F6' },
  { category: 'Operations', used: 45, budget: 12000, spent: 5400, color: '#10B981' },
  { category: 'Salaries', used: 90, budget: 45000, spent: 40500, color: '#EF4444' },
  { category: 'R&D', used: 30, budget: 15000, spent: 4500, color: '#8B5CF6' },
]

// Expense Breakdown (Donut)
const expenseBreakdownData = [
  { name: 'Salaries', value: 40500, color: '#EF4444' },
  { name: 'Marketing', value: 6000, color: '#3B82F6' },
  { name: 'Operations', value: 5400, color: '#10B981' },
  { name: 'Software', value: 3200, color: '#8B5CF6' },
  { name: 'Office', value: 2800, color: '#F59E0B' },
  { name: 'Other', value: 1580, color: '#6B7280' },
]

// Income Sources (Horizontal Bar)
const incomeSourcesData = [
  { source: 'Product Sales', value: 18500 },
  { source: 'Services', value: 12400 },
  { source: 'Subscriptions', value: 8900 },
  { source: 'Partnerships', value: 3800 },
  { source: 'Other', value: 1640 },
]

// Recent Transactions
interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: 'income' | 'expense'
  amount: number
  icon: typeof DollarSign
}

const transactionsData: Transaction[] = [
  { id: '1', date: '2026-02-05', description: 'Stripe Payment - Premium Plan', category: 'Subscriptions', type: 'income', amount: 2499, icon: CreditCard },
  { id: '2', date: '2026-02-05', description: 'AWS Cloud Services', category: 'Software', type: 'expense', amount: 892.5, icon: Building2 },
  { id: '3', date: '2026-02-04', description: 'Client Project - Acme Corp', category: 'Services', type: 'income', amount: 8500, icon: FileText },
  { id: '4', date: '2026-02-04', description: 'Slack Annual Subscription', category: 'Software', type: 'expense', amount: 150, icon: Smartphone },
  { id: '5', date: '2026-02-03', description: 'Product Sale - Enterprise License', category: 'Product Sales', type: 'income', amount: 4999, icon: DollarSign },
  { id: '6', date: '2026-02-03', description: 'Office Supplies', category: 'Office', type: 'expense', amount: 245.8, icon: Building2 },
  { id: '7', date: '2026-02-02', description: 'Consulting Fee - Tech Review', category: 'Services', type: 'income', amount: 3200, icon: FileText },
  { id: '8', date: '2026-02-02', description: 'Google Ads Campaign', category: 'Marketing', type: 'expense', amount: 1500, icon: LineChart },
  { id: '9', date: '2026-02-01', description: 'Partnership Bonus - Q4', category: 'Partnerships', type: 'income', amount: 5000, icon: DollarSign },
  { id: '10', date: '2026-02-01', description: 'Payroll - Engineering Team', category: 'Salaries', type: 'expense', amount: 28500, icon: Wallet },
]

// Upcoming Bills
interface Bill {
  id: string
  name: string
  dueDate: string
  amount: number
  status: 'due-soon' | 'overdue' | 'upcoming'
  icon: typeof DollarSign
}

const upcomingBillsData: Bill[] = [
  { id: '1', name: 'Office Rent', dueDate: '2026-02-10', amount: 4500, status: 'due-soon', icon: Building2 },
  { id: '2', name: 'Insurance Premium', dueDate: '2026-02-08', amount: 1200, status: 'due-soon', icon: FileText },
  { id: '3', name: 'Utility Bills', dueDate: '2026-02-15', amount: 380, status: 'upcoming', icon: Smartphone },
  { id: '4', name: 'SaaS Subscriptions', dueDate: '2026-02-20', amount: 890, status: 'upcoming', icon: CreditCard },
  { id: '5', name: 'Equipment Lease', dueDate: '2026-02-05', amount: 650, status: 'overdue', icon: Building2 },
]

// Table Columns
const transactionColumns: ColumnDef<Transaction>[] = [
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Date',
    sortable: true,
    cell: ({ value }) => {
      const date = new Date(value as string)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Description',
    sortable: true,
    cell: ({ row }) => {
      const Icon = row.icon
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-800">
            <Icon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
          </div>
          <span className="font-medium text-[var(--text-primary)]">{row.description}</span>
        </div>
      )
    },
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: 'Category',
    sortable: true,
    cell: ({ value }) => (
      <Badge variant="default" size="sm">
        {value as string}
      </Badge>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Type',
    sortable: true,
    cell: ({ value }) => (
      <Badge variant={value === 'income' ? 'success' : 'error'} size="sm">
        {value === 'income' ? 'Income' : 'Expense'}
      </Badge>
    ),
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right',
    cell: ({ row }) => {
      const isIncome = row.type === 'income'
      return (
        <span className={isIncome ? 'font-semibold text-green-600 dark:text-green-400' : 'font-semibold text-red-600 dark:text-red-400'}>
          {isIncome ? '+' : '-'}${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
  },
]

// Date Range Options
const dateRangeOptions = [
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function FinanceDashboard() {
  const [dateRange, setDateRange] = React.useState('month')
  const [isLoading, setIsLoading] = React.useState(true)

  // Simulate loading
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

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
            Financial Overview
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Track your income, expenses, and financial health
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
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Download Report
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Transaction
          </Button>
        </div>
      </div>

      {/* ====== ROW 1: MAIN BALANCE HERO ====== */}
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-slate-900 dark:to-emerald-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500" />
          <Card.Content className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Left: Balance + Change */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Portfolio Value</p>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
                    ${balanceData.current.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {balanceData.changePercent}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 px-2.5 py-1">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+${balanceData.change.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">from last month</span>
                </div>
                {/* Mini metrics row */}
                <div className="flex items-center gap-4 pt-1">
                  {[
                    { label: 'Daily Avg', value: '$9.5K', color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: '30d High', value: '$289K', color: 'text-[var(--text-primary)]' },
                    { label: '30d Low', value: '$265K', color: 'text-[var(--text-muted)]' },
                  ].map((m, i) => (
                    <React.Fragment key={m.label}>
                      {i > 0 && <div className="h-3 w-px bg-emerald-200 dark:bg-emerald-800" />}
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">{m.label}</p>
                        <p className={`text-xs font-bold ${m.color}`}>{m.value}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right: Allocation ring + Revenue bars */}
              <div className="flex items-center gap-8 lg:gap-10">
                {/* Portfolio allocation ring */}
                <div className="hidden sm:flex flex-col items-center gap-2.5">
                  <div className="relative h-[96px] w-[96px]">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-emerald-100 dark:text-emerald-900/40" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-40" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-65" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-85" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-[var(--text-muted)]">ROI</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">18.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { color: 'bg-emerald-500', label: 'Stocks' },
                      { color: 'bg-blue-500', label: 'Bonds' },
                      { color: 'bg-violet-500', label: 'Crypto' },
                      { color: 'bg-amber-500', label: 'Cash' },
                    ].map((a) => (
                      <div key={a.label} className="flex items-center gap-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${a.color}`} />
                        <span className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider">{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily revenue bars */}
                <div className="w-full lg:w-52">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">Daily Revenue</p>
                  <div className="flex items-end gap-1 h-20">
                    {[32, 45, 28, 52, 38, 61, 42, 55, 35, 68, 48, 72, 40, 58].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all ${i === 11 ? 'bg-emerald-500' : i >= 9 ? 'bg-emerald-400 dark:bg-emerald-500/80' : 'bg-emerald-200 dark:bg-emerald-700/50'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[8px] text-[var(--text-muted)]">2 weeks ago</span>
                    <span className="text-[8px] font-semibold text-emerald-600 dark:text-emerald-400">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 2: KPI CARDS ====== */}
      <DashboardGrid preset="4col" gap="lg" className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-3 pb-3 sm:grid sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {/* Income */}
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <Card className="relative overflow-hidden group transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Income</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {formatCurrency(kpiData.income.value)}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.income.change}% vs last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-3">
                  <SparklineChart
                    data={kpiData.income.sparkline}
                    type="area"
                    color="#22C55E"
                    width={140}
                    height={32}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>
            </div>

            {/* Expenses */}
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <Card className="relative overflow-hidden group transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-rose-400" />
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Expenses</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {formatCurrency(kpiData.expenses.value)}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingDown className="h-3 w-3" />
                      {kpiData.expenses.change}% vs last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                    <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="mt-3">
                  <SparklineChart
                    data={kpiData.expenses.sparkline}
                    type="area"
                    color="#EF4444"
                    width={140}
                    height={32}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>
            </div>

            {/* Savings */}
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <Card className="relative overflow-hidden group transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Savings</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {formatCurrency(kpiData.savings.value)}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.savings.change}% vs last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-3">
                  <SparklineChart
                    data={kpiData.savings.sparkline}
                    type="area"
                    color="#3B82F6"
                    width={140}
                    height={32}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>
            </div>

            {/* Investments */}
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <Card className="relative overflow-hidden group transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-violet-400" />
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Investments</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {formatCurrency(kpiData.investments.value)}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{kpiData.investments.change}% vs last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                    <LineChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-3">
                  <SparklineChart
                    data={kpiData.investments.sparkline}
                    type="area"
                    color="#8B5CF6"
                    width={140}
                    height={32}
                    gradient
                  />
                </div>
              </Card.Content>
            </Card>
            </div>
          </>
        )}
      </DashboardGrid>

      {/* ====== ROW 3: CASH FLOW + BUDGET OVERVIEW ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Cash Flow Chart - 60% */}
        <Card className="relative overflow-hidden lg:col-span-3">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary-500" />
                  Cash Flow
                </Card.Title>
                <Card.Description>Income vs Expenses over the last 6 months</Card.Description>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-72 rounded-lg" />
            ) : (
              <>
                <div className="-ml-7 -mr-5 sm:ml-0 sm:mr-0">
                  <ChartWrapper
                    type="area"
                    data={cashFlowData}
                    series={[
                      { dataKey: 'income', name: 'Income', fillOpacity: 0.4, color: '#22C55E' },
                      { dataKey: 'expenses', name: 'Expenses', fillOpacity: 0.4, color: '#EF4444' },
                    ]}
                    xAxisKey="month"
                    height={280}
                    showLegend
                    showTooltip
                    showGrid
                    tooltipFormatter={(value) => '$' + value.toLocaleString()}
                  />
                </div>
                {/* Desktop: extra metrics */}
                <div className="hidden sm:grid grid-cols-4 gap-px mt-4 border-t border-[var(--border-default)] bg-[var(--border-default)] rounded-b-lg overflow-hidden">
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Net Cash Flow</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+$13,060</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Savings Rate</p>
                    <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">28.9%</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Burn Rate</p>
                    <p className="text-sm font-bold text-red-500 dark:text-red-400 mt-0.5">$32.2K/mo</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Runway</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">8.8 mo</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-default)] bg-[var(--bg-subtle)]">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-[var(--text-muted)]">Best month: <span className="font-semibold text-[var(--text-primary)]">Dec ($47.2K)</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-xs text-[var(--text-muted)]">Highest expense: <span className="font-semibold text-[var(--text-primary)]">Dec ($35.1K)</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-[var(--text-muted)]">Avg margin: <span className="font-semibold text-emerald-600 dark:text-emerald-400">27.4%</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--text-muted)] mr-1">6mo</span>
                    {[38, 41, 39, 43, 47, 45].map((h, i) => (
                      <div key={i} className="w-1.5 rounded-full bg-emerald-400" style={{ height: `${h * 0.28}px` }} />
                    ))}
                  </div>
                </div>
                <div className="hidden sm:block h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-emerald-50/60 via-transparent to-green-50/60 dark:from-emerald-900/10 dark:via-transparent dark:to-green-900/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary-500" />
                      <span className="text-xs text-[var(--text-muted)]">Updated <span className="font-medium text-[var(--text-primary)]">just now</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-[var(--text-muted)]">YoY growth: <span className="font-semibold text-emerald-600 dark:text-emerald-400">+18.3%</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wallet className="h-3.5 w-3.5 text-violet-500" />
                      <span className="text-xs text-[var(--text-muted)]">Projected Q1: <span className="font-semibold text-[var(--text-primary)]">$138K</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Live</span>
                  </div>
                </div>
                <div className="hidden sm:block h-px bg-[var(--border-default)]" />
                <div className="hidden sm:grid grid-cols-4 gap-px bg-[var(--border-default)] overflow-hidden">
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Avg Income</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">$42.6K</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Avg Expense</p>
                    <p className="text-sm font-bold text-red-500 dark:text-red-400 mt-0.5">$31.6K</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">MoM Growth</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">+4.1%</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Profit Margin</p>
                    <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">28.9%</p>
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Budget Overview - 40% */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary-500" />
                  Budget Overview
                </Card.Title>
                <Card.Description>Monthly budget allocation</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {budgetData.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">
                          ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
                        </span>
                        <Badge
                          variant={item.used >= 90 ? 'error' : item.used >= 70 ? 'warning' : 'success'}
                          size="sm"
                        >
                          {item.used}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar
                          value={item.used}
                          size="sm"
                          variant={item.used >= 90 ? 'error' : item.used >= 70 ? 'warning' : 'success'}
                        />
                      </div>
                      <GaugeChart
                        value={item.used}
                        variant="donut"
                        size="sm"
                        showValue={false}
                        color={item.color}
                        strokeWidth={6}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 4: EXPENSE BREAKDOWN + INCOME SOURCES ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expense Breakdown - Donut */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-rose-500 to-pink-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary-500" />
              Expense Breakdown
            </Card.Title>
            <Card.Description>Where your money goes</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="mx-auto h-64 w-64 rounded-full" />
            ) : (
              <div className="flex flex-col items-center gap-0 sm:gap-6 lg:flex-row">
                <div className="w-full sm:w-64">
                  <div className="sm:hidden">
                    <ChartWrapper
                      type="donut"
                      data={expenseBreakdownData}
                      series={[{ dataKey: 'value', name: 'Amount' }]}
                      xAxisKey="name"
                      height={250}
                      showTooltip
                      tooltipFormatter={(value) => '$' + value.toLocaleString()}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <ChartWrapper
                      type="donut"
                      data={expenseBreakdownData}
                      series={[{ dataKey: 'value', name: 'Amount' }]}
                      xAxisKey="name"
                      height={280}
                      showTooltip
                      tooltipFormatter={(value) => '$' + value.toLocaleString()}
                    />
                  </div>
                </div>
                <div className="flex-1 w-full divide-y divide-[var(--border-default)]">
                  {expenseBreakdownData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-6 py-2 sm:py-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-[var(--text-secondary)]">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        ${item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Income Sources - Horizontal Bar */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-500" />
              Income Sources
            </Card.Title>
            <Card.Description>Revenue breakdown by source</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {incomeSourcesData.map((item, idx) => {
                  const maxValue = Math.max(...incomeSourcesData.map((d) => d.value))
                  const percentage = (item.value / maxValue) * 100
                  const colors = ['#22C55E', '#3B82F6', '#8B5CF6', '#F59E0B', '#6B7280']
                  return (
                    <div key={item.source} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">{item.source}</span>
                        <span className="font-medium text-[var(--text-primary)]">
                          ${item.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            background: `linear-gradient(90deg, ${colors[idx]}, ${colors[idx]}cc)`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 5: TRANSACTIONS TABLE + UPCOMING BILLS ====== */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transactions Table - 2/3 */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary-500" />
                  Recent Transactions
                </Card.Title>
                <Card.Description>Your latest financial activities</Card.Description>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Content padding="none">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Mobile: carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-3 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {transactionsData.slice(0, 8).map((tx) => {
                    const TxIcon = tx.icon
                    const isIncome = tx.type === 'income'
                    return (
                      <div key={tx.id} className="snap-start shrink-0 w-[72vw] rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-800">
                              <TxIcon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <Badge variant={isIncome ? 'success' : 'error'} size="sm">{isIncome ? 'Income' : 'Expense'}</Badge>
                          </div>
                          <span className={`text-sm font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isIncome ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{tx.description}</p>
                        <p className="text-xs text-[var(--text-muted)]">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    )
                  })}
                </div>
                {/* Desktop: full table */}
                <div className="hidden sm:block">
                  <DataTable
                    data={transactionsData}
                    columns={transactionColumns}
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

        {/* Upcoming Bills - 1/3 */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-yellow-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-500" />
                  Upcoming Bills
                </Card.Title>
                <Card.Description>Don't miss your payments</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBillsData.map((bill) => {
                  const dueDate = new Date(bill.dueDate)
                  const formattedDate = dueDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })

                  return (
                    <div
                      key={bill.id}
                      className="group flex items-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3 transition-all duration-200 hover:shadow-sm hover:border-[var(--border-muted)] overflow-hidden"
                    >
                      <div className={`w-1 self-stretch rounded-full ${bill.status === 'overdue' ? 'bg-red-500' : bill.status === 'due-soon' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-800">
                        <bill.icon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {bill.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">Due {formattedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          ${bill.amount.toLocaleString()}
                        </p>
                        <Badge
                          variant={
                            bill.status === 'overdue'
                              ? 'error'
                              : bill.status === 'due-soon'
                              ? 'warning'
                              : 'default'
                          }
                          size="sm"
                        >
                          {bill.status === 'overdue' ? (
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Overdue
                            </span>
                          ) : bill.status === 'due-soon' ? (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Due Soon
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Upcoming
                            </span>
                          )}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}
