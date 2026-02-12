'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Box,
  Puzzle,
  Building2,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  Code2,
  Palette,
  Shield,
  Accessibility,
  Moon,
  Layers,
  TrendingUp,
  Zap,
  Eye,
  GitBranch,
  Package,
} from 'lucide-react'
import { Badge } from '@core/primitives/Badge'
import { cn } from '@shared/utils/cn'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ─── Category Data ──────────────────────────────────────────────────────────

const categoryData = [
  {
    title: 'Primitives',
    description: 'Atomic building blocks — buttons, inputs, badges, and form controls.',
    icon: Box,
    href: '/components/primitives',
    count: 15,
    gradient: 'from-emerald-500 to-teal-500',
    lightBg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10',
    shadow: 'shadow-emerald-500/20',
    accent: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800/40',
    hoverBorder: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-700',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    trend: [8, 10, 9, 12, 11, 13, 14, 15, 15, 15, 15, 15],
    color: '#10b981',
    components: [
      'Avatar', 'Badge', 'Button', 'Checkbox', 'Divider',
      'Input', 'Radio', 'Select', 'Skeleton', 'Spinner',
      'Switch', 'Tag', 'Textarea', 'ThemeToggle', 'Tooltip',
    ],
  },
  {
    title: 'Patterns',
    description: 'Composite molecules — cards, charts, navigation, and domain-specific components.',
    icon: Puzzle,
    href: '/components/patterns',
    count: 65,
    gradient: 'from-blue-500 to-indigo-500',
    lightBg: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10',
    shadow: 'shadow-blue-500/20',
    accent: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/40',
    hoverBorder: 'group-hover:border-blue-300 dark:group-hover:border-blue-700',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    trend: [20, 28, 35, 40, 45, 48, 52, 55, 58, 61, 63, 65],
    color: '#3b82f6',
    components: [
      'StatCard', 'Alert', 'Tabs', 'Accordion', 'SearchBar', 'DatePicker',
      'KanbanBoard', 'CandlestickChart', 'TableGrid', 'PricingTable',
      'ChatUI', 'GaugeChart', 'SparklineChart', 'HeatmapCalendar',
      'CryptoCard', 'PropertyCard', 'CourseCard', 'AchievementBadge',
      'OrderTicket', 'CodeBlock', 'FileManager', 'ProgressBar',
    ],
  },
  {
    title: 'Organisms',
    description: 'Complex composites — data tables, modals, drawers, and forms.',
    icon: Building2,
    href: '/components/organisms',
    count: 8,
    gradient: 'from-amber-500 to-orange-500',
    lightBg: 'from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10',
    shadow: 'shadow-amber-500/20',
    accent: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800/40',
    hoverBorder: 'group-hover:border-amber-300 dark:group-hover:border-amber-700',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    trend: [3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8],
    color: '#f59e0b',
    components: [
      'Card', 'ChartWrapper', 'CommandPalette', 'DataTable',
      'Drawer', 'DropdownMenu', 'Form', 'Modal',
    ],
  },
  {
    title: 'Layouts',
    description: 'Page structure — grids, sidebars, headers, and content areas.',
    icon: LayoutGrid,
    href: '/components/layouts',
    count: 6,
    gradient: 'from-violet-500 to-purple-500',
    lightBg: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10',
    shadow: 'shadow-violet-500/20',
    accent: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-800/40',
    hoverBorder: 'group-hover:border-violet-300 dark:group-hover:border-violet-700',
    badgeBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
    trend: [2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6],
    color: '#8b5cf6',
    components: [
      'DashboardGrid', 'Footer', 'Header',
      'MainContent', 'PageHeader', 'Sidebar',
    ],
  },
]

// ─── Architecture Stats ─────────────────────────────────────────────────────

const architectureStats = [
  {
    label: 'CVA Variants',
    value: '100%',
    desc: 'Type-safe styling with class-variance-authority',
    icon: Code2,
    gradient: 'from-emerald-500 to-teal-500',
    color: '#10b981',
    trend: [85, 88, 90, 92, 94, 95, 97, 98, 99, 100, 100, 100],
  },
  {
    label: 'TypeScript Strict',
    value: '0 errors',
    desc: 'Full type coverage with strict mode enabled',
    icon: Shield,
    gradient: 'from-blue-500 to-indigo-500',
    color: '#3b82f6',
    trend: [12, 8, 5, 3, 2, 1, 0, 0, 0, 0, 0, 0],
  },
  {
    label: 'Accessibility',
    value: '126+',
    desc: 'ARIA labels, keyboard nav, WCAG 2.1 AA',
    icon: Accessibility,
    gradient: 'from-violet-500 to-purple-500',
    color: '#8b5cf6',
    trend: [40, 52, 60, 72, 80, 88, 95, 100, 108, 115, 120, 126],
  },
  {
    label: 'Dark Mode',
    value: 'Built-in',
    desc: 'CSS variables with automatic theme switching',
    icon: Moon,
    gradient: 'from-slate-500 to-zinc-600',
    color: '#64748b',
    trend: [30, 45, 55, 65, 72, 78, 82, 86, 90, 92, 94, 94],
  },
]

// ─── Total count ────────────────────────────────────────────────────────────

const totalComponents = categoryData.reduce((sum, cat) => sum + cat.count, 0)
const totalGrowth = [25, 35, 48, 55, 62, 70, 75, 80, 85, 88, 92, totalComponents]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ComponentsOverviewPage() {
  return (
    <div className="space-y-6">
      {/* ════════════════ PREMIUM HERO HEADER ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        {/* Subtle decorative circles */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
        <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-teal-500/5 to-cyan-500/5" />

        <div className="relative flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-50/40 to-transparent dark:from-emerald-950/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                <Layers size={28} className="text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-500/25">
                <Sparkles size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Component Library
              </h1>
              <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                {totalComponents} reusable components built with React 19, TypeScript strict, and CVA
              </p>
            </div>
          </div>

          {/* Category badges */}
          <div className="hidden md:flex items-center gap-2">
            {categoryData.map((cat) => (
              <div
                key={cat.title}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border',
                  cat.badgeBg, cat.border
                )}
              >
                <div className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', cat.gradient)} />
                {cat.count} {cat.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM STATS BAR ════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {categoryData.map((cat) => {
          const Icon = cat.icon
          return (
            <Link key={cat.title} href={cat.href} className="group">
              <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer">
                <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', cat.gradient)} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', cat.gradient, cat.shadow)}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{cat.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-[var(--text-primary)]">{cat.count}</p>
                        <span className="text-[10px] font-medium text-[var(--text-muted)]">components</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SparklineChart data={cat.trend} color={cat.color} width={56} height={26} showDot animated gradient />
                    <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ════════════════ CATEGORY CARDS — PREMIUM DIAMOND ════════════════ */}
      <div className="grid gap-5 sm:grid-cols-2">
        {categoryData.map((cat) => {
          const Icon = cat.icon
          return (
            <Link key={cat.title} href={cat.href} className="group">
              <div className={cn(
                'relative h-full overflow-hidden rounded-xl border bg-[var(--bg-base)] transition-all duration-300',
                'shadow-sm hover:shadow-lg',
                cat.border, cat.hoverBorder
              )}>
                {/* Gradient top bar */}
                <div className={cn('h-1 w-full bg-gradient-to-r', cat.gradient)} />

                {/* Subtle corner decoration */}
                <div className={cn('absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-[0.03]', cat.gradient)} />

                {/* Header */}
                <div className={cn('px-5 pt-4 pb-3 bg-gradient-to-r to-transparent', cat.lightBg)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-105',
                        cat.gradient, cat.shadow
                      )}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all" style={{ ['--tw-gradient-from' as string]: cat.color }}>
                          {cat.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={cn('text-sm font-bold', cat.accent)}>{cat.count}</span>
                          <span className="text-xs text-[var(--text-muted)]">components</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <SparklineChart data={cat.trend} color={cat.color} width={60} height={28} showDot animated gradient />
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border transition-all',
                        'bg-[var(--bg-base)] group-hover:bg-gradient-to-br group-hover:text-white group-hover:border-transparent group-hover:shadow-md',
                        cat.border, `group-hover:${cat.gradient}`, cat.shadow ? `group-hover:${cat.shadow}` : ''
                      )}>
                        <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 py-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Component badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.components.slice(0, 12).map((comp) => (
                      <span
                        key={comp}
                        className={cn(
                          'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors',
                          cat.badgeBg,
                          'hover:opacity-80'
                        )}
                      >
                        {comp}
                      </span>
                    ))}
                    {cat.components.length > 12 && (
                      <span className="inline-flex items-center rounded-md border border-[var(--border-default)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-muted)]">
                        +{cat.components.length - 12} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className={cn('h-0.5 w-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity', cat.gradient)} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* ════════════════ ARCHITECTURE HIGHLIGHTS — PREMIUM DIAMOND ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 via-violet-500 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-gradient-to-r from-emerald-50/30 to-transparent dark:from-emerald-950/5 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Architecture Highlights</h2>
              <p className="text-xs text-[var(--text-muted)]">Quality metrics and engineering standards</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10 px-3 py-1.5 border border-emerald-200/50 dark:border-emerald-800/30">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{totalComponents} total</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {architectureStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-[var(--bg-subtle)] to-[var(--bg-base)] p-4 hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', stat.gradient)} />

                <div className="flex items-start justify-between mb-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', stat.gradient)}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <SparklineChart data={stat.trend} color={stat.color} width={56} height={24} showDot animated gradient />
                </div>

                <p className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">{stat.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ════════════════ TOTAL GROWTH — PREMIUM CARD ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-50/30 to-transparent dark:from-emerald-950/5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Package size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Component Growth</h2>
              <p className="text-xs text-[var(--text-muted)]">Library evolution over development sprints</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SparklineChart data={totalGrowth} color="#10b981" width={120} height={36} showDot animated gradient strokeWidth={2} />
            <div className="text-right">
              <p className="text-2xl font-bold text-[var(--text-primary)]">{totalComponents}</p>
              <p className="text-[11px] font-medium text-emerald-500">+68 this quarter</p>
            </div>
          </div>
        </div>

        {/* Category breakdown mini bar */}
        <div className="px-5 pb-4">
          <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-[var(--bg-muted)]">
            {categoryData.map((cat) => {
              const pct = (cat.count / totalComponents) * 100
              return (
                <div
                  key={cat.title}
                  className={cn('h-full bg-gradient-to-r first:rounded-l-full last:rounded-r-full', cat.gradient)}
                  style={{ width: `${pct}%` }}
                  title={`${cat.title}: ${cat.count} (${Math.round(pct)}%)`}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            {categoryData.map((cat) => (
              <div key={cat.title} className="flex items-center gap-1.5">
                <div className={cn('h-2 w-2 rounded-full bg-gradient-to-r', cat.gradient)} />
                <span className="text-[10px] font-medium text-[var(--text-muted)]">{cat.title} ({cat.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ TECH STACK BADGES ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500" />
        <div className="px-5 py-4 bg-gradient-to-r from-teal-50/20 to-transparent dark:from-teal-950/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md shadow-teal-500/20">
              <GitBranch size={14} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'React 19', gradient: 'from-cyan-500 to-blue-500' },
              { name: 'Next.js 16', gradient: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100' },
              { name: 'TypeScript 5', gradient: 'from-blue-500 to-blue-700' },
              { name: 'Tailwind v4', gradient: 'from-sky-400 to-blue-500' },
              { name: 'CVA', gradient: 'from-violet-500 to-purple-600' },
              { name: 'Lucide Icons', gradient: 'from-orange-400 to-red-500' },
              { name: 'next-intl', gradient: 'from-emerald-500 to-teal-500' },
              { name: 'Dark Mode', gradient: 'from-slate-500 to-zinc-700' },
            ].map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:shadow-sm transition-all hover:scale-[1.02] cursor-default"
              >
                <span className={cn('h-2 w-2 rounded-full bg-gradient-to-r', tech.gradient)} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
