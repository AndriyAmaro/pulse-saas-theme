'use client'

import * as React from 'react'
import {
  Briefcase,
  Users,
  CheckCircle2,
  DollarSign,
  Plus,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  MessageSquare,
  GitPullRequest,
  Bug,
  Rocket,
  TrendingUp,
  Zap,
  ArrowUpRight,
  MoreHorizontal,
  Filter,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { MetricCardAdvanced } from '@core/patterns/MetricCardAdvanced'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { MiniCalendar } from '@core/patterns/MiniCalendar'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { LeaderboardList, type LeaderboardItem } from '@core/patterns/LeaderboardList'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { cn } from '@shared/utils/cn'

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getGreeting(): { greeting: string; emoji: string } {
  const hour = new Date().getHours()
  if (hour < 12) return { greeting: 'Good morning', emoji: '☀️' }
  if (hour < 18) return { greeting: 'Good afternoon', emoji: '🌤️' }
  return { greeting: 'Good evening', emoji: '🌙' }
}

// ============================================================================
// MOCK DATA
// ============================================================================

const userName = 'John'

// KPIs with Sparklines — each with unique gradient colors + border accent
const kpiData = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$45,231',
    change: 12.5,
    changeLabel: 'vs last month',
    sparkline: [28, 35, 42, 38, 52, 48, 56, 62, 58, 72, 68, 85],
    sparklineColor: '#10B981',
    icon: <DollarSign className="h-5 w-5" />,
    iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    accentColor: 'emerald',
    decorBg: 'from-emerald-500/10 to-emerald-500/5',
    borderGradient: 'from-emerald-400 via-emerald-500 to-teal-500',
    glowColor: 'rgba(16,185,129,0.2)',
    glowColorDark: 'rgba(16,185,129,0.35)',
  },
  {
    id: 'projects',
    title: 'Active Projects',
    value: 12,
    change: 2,
    changeLabel: 'new this week',
    sparkline: [4, 6, 5, 8, 7, 9, 10, 11, 9, 12, 11, 12],
    sparklineColor: '#3B82F6',
    icon: <Briefcase className="h-5 w-5" />,
    iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    accentColor: 'blue',
    decorBg: 'from-blue-500/10 to-blue-500/5',
    borderGradient: 'from-blue-400 via-blue-500 to-indigo-500',
    glowColor: 'rgba(59,130,246,0.2)',
    glowColorDark: 'rgba(59,130,246,0.35)',
    progress: 75,
    target: 100,
    progressLabel: 'Sprint progress',
  },
  {
    id: 'team',
    title: 'Team Members',
    value: 24,
    change: 8.3,
    changeLabel: 'active now',
    sparkline: [18, 20, 19, 22, 21, 23, 24, 22, 23, 24, 23, 24],
    sparklineColor: '#8B5CF6',
    icon: <Users className="h-5 w-5" />,
    iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600',
    accentColor: 'violet',
    decorBg: 'from-violet-500/10 to-violet-500/5',
    borderGradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    glowColor: 'rgba(139,92,246,0.2)',
    glowColorDark: 'rgba(139,92,246,0.35)',
    breakdown: [
      { label: 'online', value: '18', isPositive: true as const },
      { label: 'away', value: '4' },
      { label: 'offline', value: '2', isPositive: false as const },
    ],
  },
  {
    id: 'tasks',
    title: 'Tasks Completed',
    value: '156',
    change: 23.4,
    changeLabel: 'this week',
    sparkline: [12, 18, 24, 32, 28, 42, 38, 45, 52, 48, 56, 62],
    sparklineColor: '#14B8A6',
    icon: <CheckCircle2 className="h-5 w-5" />,
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-600',
    accentColor: 'teal',
    decorBg: 'from-teal-500/10 to-teal-500/5',
    borderGradient: 'from-teal-400 via-teal-500 to-emerald-500',
    glowColor: 'rgba(20,184,166,0.2)',
    glowColorDark: 'rgba(20,184,166,0.35)',
  },
]

// Quick Actions
const quickActions = [
  { label: 'New Project', icon: Plus, color: 'from-primary-500 to-primary-600' },
  { label: 'Reports', icon: FileText, color: 'from-blue-500 to-blue-600' },
  { label: 'Team', icon: Users, color: 'from-violet-500 to-violet-600' },
  { label: 'Settings', icon: Settings, color: 'from-slate-500 to-slate-600' },
]

// Projects with Progress
interface Project {
  id: string
  name: string
  progress: number
  deadline: string
  status: 'on-track' | 'at-risk' | 'delayed'
  team: string[]
  color: string
}

const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    progress: 78,
    deadline: 'Feb 15, 2026',
    status: 'on-track',
    team: ['Alice', 'Bob', 'Charlie'],
    color: '#10B981',
  },
  {
    id: '2',
    name: 'Mobile App v2.0',
    progress: 45,
    deadline: 'Feb 28, 2026',
    status: 'at-risk',
    team: ['David', 'Eva'],
    color: '#F59E0B',
  },
  {
    id: '3',
    name: 'API Integration Hub',
    progress: 92,
    deadline: 'Feb 10, 2026',
    status: 'on-track',
    team: ['Frank', 'Grace', 'Henry'],
    color: '#3B82F6',
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    progress: 15,
    deadline: 'Mar 15, 2026',
    status: 'delayed',
    team: ['Ivy', 'Jack'],
    color: '#EF4444',
  },
  {
    id: '5',
    name: 'Payment Gateway Integration',
    progress: 63,
    deadline: 'Mar 5, 2026',
    status: 'on-track',
    team: ['Karen', 'Leo', 'Mike'],
    color: '#EF4444',
  },
]

// Upcoming Deadlines
const upcomingDeadlines = [
  { id: '1', title: 'API Integration Hub', date: new Date(2026, 1, 10), color: '#22C55E', daysLeft: 0 },
  { id: '2', title: 'E-commerce Redesign', date: new Date(2026, 1, 15), color: '#3B82F6', daysLeft: 5 },
  { id: '3', title: 'Mobile App v2.0', date: new Date(2026, 1, 28), color: '#F59E0B', daysLeft: 18 },
]

// Today's Schedule
const todaySchedule = [
  { id: '1', title: 'Sprint Planning', time: '09:00 — 10:00', type: 'meeting' as const, color: 'bg-blue-500' },
  { id: '2', title: 'Design Review', time: '11:30 — 12:00', type: 'review' as const, color: 'bg-violet-500' },
  { id: '3', title: 'Client Demo', time: '14:00 — 15:00', type: 'meeting' as const, color: 'bg-emerald-500' },
  { id: '4', title: '1:1 with Sarah', time: '16:00 — 16:30', type: 'meeting' as const, color: 'bg-amber-500' },
]

// Project Health Summary
const projectHealth = {
  onTrack: 3,
  atRisk: 1,
  delayed: 1,
  total: 5,
  completionRate: 72,
  sprintVelocity: 85,
}

// Activity Timeline
const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'New feature deployed to production',
    description: 'User authentication module v2.1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'success',
    icon: Rocket,
  },
  {
    id: '2',
    title: 'Pull request merged',
    description: 'feat: Add dark mode support #342',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'info',
    icon: GitPullRequest,
  },
  {
    id: '3',
    title: 'Bug reported by QA team',
    description: 'Login page not loading on Safari',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'warning',
    icon: Bug,
  },
  {
    id: '4',
    title: 'Team meeting scheduled',
    description: 'Sprint planning for Week 7',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'default',
    icon: Calendar,
  },
  {
    id: '5',
    title: 'New comment on task',
    description: 'Design review for checkout flow',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    type: 'info',
    icon: MessageSquare,
  },
]

// Team Leaderboard
const teamLeaderboardData: LeaderboardItem[] = [
  { id: '1', rank: 1, name: 'Sarah Chen', value: 47, avatar: undefined },
  { id: '2', rank: 2, name: 'Mike Johnson', value: 42 },
  { id: '3', rank: 3, name: 'Emily Davis', value: 38 },
  { id: '4', rank: 4, name: 'Alex Morgan', value: 35, isCurrentUser: true },
  { id: '5', rank: 5, name: 'Jordan Lee', value: 31 },
]

// My Tasks
interface Task {
  id: string
  title: string
  project: string
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  status: 'todo' | 'in-progress' | 'review'
}

const myTasksData: Task[] = [
  { id: '1', title: 'Review pull request #342', project: 'E-commerce Platform', priority: 'high', dueDate: 'Today', status: 'in-progress' },
  { id: '2', title: 'Update API documentation', project: 'API Hub', priority: 'medium', dueDate: 'Tomorrow', status: 'todo' },
  { id: '3', title: 'Fix Safari login bug', project: 'Mobile App v2.0', priority: 'high', dueDate: 'Today', status: 'in-progress' },
  { id: '4', title: 'Design system audit', project: 'E-commerce Platform', priority: 'low', dueDate: 'Feb 10', status: 'review' },
  { id: '5', title: 'Performance optimization', project: 'Analytics Dashboard', priority: 'medium', dueDate: 'Feb 12', status: 'todo' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function OverviewPage() {
  const { greeting, emoji } = getGreeting()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const highlightedDates = upcomingDeadlines.map(d => d.date)
  const calendarEvents = upcomingDeadlines.map(d => ({
    date: d.date,
    label: d.title,
    color: d.color,
  }))

  const getStatusConfig = (status: Project['status']) => {
    switch (status) {
      case 'on-track':
        return { badge: <Badge variant="success" size="sm">On Track</Badge>, dotColor: 'bg-green-500' }
      case 'at-risk':
        return { badge: <Badge variant="warning" size="sm">At Risk</Badge>, dotColor: 'bg-amber-500' }
      case 'delayed':
        return { badge: <Badge variant="error" size="sm">Delayed</Badge>, dotColor: 'bg-red-500' }
    }
  }

  const getPriorityConfig = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return { badge: <Badge variant="error" size="sm">High</Badge>, dot: 'bg-red-500' }
      case 'medium':
        return { badge: <Badge variant="warning" size="sm">Medium</Badge>, dot: 'bg-amber-500' }
      case 'low':
        return { badge: <Badge variant="default" size="sm">Low</Badge>, dot: 'bg-slate-400' }
    }
  }

  const getStatusPill = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            To Do
          </span>
        )
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            In Progress
          </span>
        )
      case 'review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Review
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* ====== WELCOME SECTION — Premium Hero Banner ====== */}
      <div className="relative overflow-hidden rounded-2xl border border-primary-200/40 dark:border-primary-800/40">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-violet-500/5 dark:from-primary-500/15 dark:via-transparent dark:to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(20,184,154,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(45,209,177,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_100%,rgba(139,92,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_50%_80%_at_0%_100%,rgba(139,92,246,0.12),transparent)]" />

        {/* Decorative orbs */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-bl from-primary-400/20 to-primary-600/5 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-gradient-to-tr from-violet-400/15 to-transparent blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-gradient-to-r from-accent-400/10 to-transparent blur-2xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(20,184,154,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,154,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 rounded-full bg-primary-500/10 dark:bg-primary-500/20 px-3 py-1">
                  <Zap className="h-3.5 w-3.5 text-primary-500" />
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  All systems operational
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {greeting}, {userName}! {emoji}
              </h1>
              <p className="mt-2 text-[var(--text-secondary)] max-w-lg">
                Here&apos;s what&apos;s happening with your projects today. You have
                <span className="font-semibold text-primary-600 dark:text-primary-400"> 3 tasks </span>
                due and
                <span className="font-semibold text-violet-600 dark:text-violet-400"> 2 meetings </span>
                scheduled.
              </p>
            </div>

            {/* Quick Actions — Premium pills */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={cn(
                    'group/qa flex items-center gap-2 rounded-xl px-4 py-2.5',
                    'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm',
                    'border border-slate-200/60 dark:border-slate-700/60',
                    'hover:border-primary-300 dark:hover:border-primary-700',
                    'hover:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.15)] dark:hover:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.25)]',
                    'transition-all duration-200',
                    'text-sm font-medium text-[var(--text-secondary)]',
                    'hover:text-[var(--text-primary)]'
                  )}
                >
                  <span className={cn(
                    'flex items-center justify-center h-6 w-6 rounded-lg bg-gradient-to-br text-white',
                    'transition-transform duration-200 group-hover/qa:scale-110',
                    action.color
                  )}>
                    <action.icon className="h-3.5 w-3.5" />
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats row */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Revenue today', value: '$2,847', icon: TrendingUp, color: 'text-emerald-500' },
              { label: 'Active users', value: '1,429', icon: Users, color: 'text-blue-500' },
              { label: 'Completed', value: '24 tasks', icon: CheckCircle2, color: 'text-teal-500' },
              { label: 'Avg. response', value: '1.2s', icon: Zap, color: 'text-amber-500' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-3 border border-white/60 dark:border-slate-700/40"
              >
                <stat.icon className={cn('h-4 w-4 shrink-0', stat.color)} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{stat.value}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== KPI CARDS — Premium with Gradient Border ====== */}
      <DashboardGrid preset="4col" gap="lg">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[180px] rounded-2xl" />
            ))}
          </>
        ) : (
          <>
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="group relative">
                {/* Hover glow — top only */}
                <div
                  className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${kpi.glowColor}, transparent 70%)` }}
                />
                {/* Card with top accent only */}
                <div className="relative rounded-xl overflow-hidden border border-teal-200/30 dark:border-teal-800/50 bg-white dark:bg-slate-900 shadow-[0_4px_12px_-2px_rgba(20,184,154,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.18)] dark:shadow-[0_4px_12px_-2px_rgba(20,184,154,0.2)] dark:hover:shadow-[0_8px_24px_-4px_rgba(20,184,154,0.35)] transition-all duration-300">
                  {/* Top gradient accent line */}
                  <div className={cn(
                    'h-1 w-full bg-gradient-to-r',
                    kpi.borderGradient
                  )} />
                  <MetricCardAdvanced
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    changeLabel={kpi.changeLabel}
                    sparkline={kpi.sparkline}
                    sparklineColor={kpi.sparklineColor}
                    progress={kpi.progress}
                    target={kpi.target}
                    progressLabel={kpi.progressLabel}
                    breakdown={kpi.breakdown}
                    icon={
                      <span className="text-white">{kpi.icon}</span>
                    }
                    iconBgColor={kpi.iconBg}
                    variant="elevated"
                    className="border-0 shadow-none rounded-none"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </DashboardGrid>

      {/* ====== ROW 2: Projects + Calendar ====== */}
      <DashboardGrid preset="content-sidebar" gap="lg">
        {/* Project Progress — Premium (compact) */}
        <Card variant="elevated" className="overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-primary-500 to-teal-500" />
          <Card.Header padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/25">
                  <Target className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <Card.Title>Project Progress</Card.Title>
                  <Card.Description>Track your active projects</Card.Description>
                </div>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Content padding="sm">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                {projectsData.map((project) => {
                  const statusConfig = getStatusConfig(project.status)
                  return (
                    <div
                      key={project.id}
                      className={cn(
                        'group/proj relative rounded-xl border border-[var(--border-default)] p-3',
                        'transition-all duration-300',
                        'hover:border-primary-200 dark:hover:border-primary-800',
                        'hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.12)] dark:hover:shadow-[0_4px_16px_-4px_rgba(20,184,154,0.25)]',
                        'bg-white dark:bg-slate-900'
                      )}
                    >
                      {/* Color accent bar */}
                      <div
                        className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />

                      <div className="pl-3">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover/proj:text-primary-600 dark:group-hover/proj:text-primary-400 transition-colors">
                              {project.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                              {project.deadline}
                            </span>
                            {statusConfig.badge}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <ProgressBar
                              value={project.progress}
                              size="xs"
                              variant={project.status === 'delayed' ? 'error' : project.status === 'at-risk' ? 'warning' : 'gradient'}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[var(--text-primary)] w-8 text-right">{project.progress}%</span>
                          <div className="flex -space-x-1.5 shrink-0">
                            {project.team.slice(0, 3).map((member, idx) => (
                              <Avatar
                                key={idx}
                                size="xs"
                                initials={member}
                                className="ring-2 ring-white dark:ring-slate-900"
                              />
                            ))}
                            {project.team.length > 3 && (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 ring-2 ring-white dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-900">
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Sidebar: Calendar + Deadlines */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/25">
                <Calendar className="h-4.5 w-4.5 text-white" />
              </div>
              <Card.Title>Upcoming Deadlines</Card.Title>
            </div>
          </Card.Header>
          <Card.Content>
            <MiniCalendar
              value={selectedDate}
              onChange={setSelectedDate}
              highlightedDates={highlightedDates}
              events={calendarEvents}
              size="sm"
            />
            <div className="mt-4 space-y-1.5">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className={cn(
                    'group/dl flex items-center gap-3 rounded-xl p-3',
                    'border border-transparent',
                    'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                    'hover:border-slate-200 dark:hover:border-slate-700',
                    'transition-all duration-200'
                  )}
                >
                  <div
                    className="h-8 w-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover/dl:h-10"
                    style={{ backgroundColor: deadline.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {deadline.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={cn(
                    'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full',
                    deadline.daysLeft === 0
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : deadline.daysLeft <= 7
                      ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  )}>
                    {deadline.daysLeft === 0 ? 'Today' : `${deadline.daysLeft}d`}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 2b: Today's Schedule + Project Health (horizontal) ====== */}
      <DashboardGrid preset="2col" gap="lg">
        {/* Today's Schedule */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg shadow-violet-500/25">
                  <Clock className="h-4.5 w-4.5 text-white" />
                </div>
                <Card.Title>Today&apos;s Schedule</Card.Title>
              </div>
              <Badge variant="default" size="sm">{todaySchedule.length} events</Badge>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2">
              {todaySchedule.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    'group/ev flex items-center gap-3 rounded-xl p-3',
                    'border border-transparent',
                    'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                    'hover:border-slate-200 dark:hover:border-slate-700',
                    'transition-all duration-200'
                  )}
                >
                  <div className={cn('h-2 w-2 rounded-full shrink-0', event.color)} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Project Health */}
        <Card variant="elevated" className="overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
          <Card.Header>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25">
                <Target className="h-4.5 w-4.5 text-white" />
              </div>
              <Card.Title>Project Health</Card.Title>
            </div>
          </Card.Header>
          <Card.Content>
            {/* Health bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700" style={{ width: `${(projectHealth.onTrack / projectHealth.total) * 100}%` }} />
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700" style={{ width: `${(projectHealth.atRisk / projectHealth.total) * 100}%` }} />
              <div className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-700" style={{ width: `${(projectHealth.delayed / projectHealth.total) * 100}%` }} />
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{projectHealth.onTrack}</p>
                <p className="text-[10px] font-medium text-emerald-500/80 dark:text-emerald-400/60 uppercase tracking-wider">On Track</p>
              </div>
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3 text-center border border-amber-100 dark:border-amber-800/30">
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{projectHealth.atRisk}</p>
                <p className="text-[10px] font-medium text-amber-500/80 dark:text-amber-400/60 uppercase tracking-wider">At Risk</p>
              </div>
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3 text-center border border-red-100 dark:border-red-800/30">
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{projectHealth.delayed}</p>
                <p className="text-[10px] font-medium text-red-500/80 dark:text-red-400/60 uppercase tracking-wider">Delayed</p>
              </div>
            </div>

            {/* Completion rate */}
            <div className="mt-4 rounded-xl bg-gradient-to-br from-primary-50 to-teal-50 dark:from-primary-900/15 dark:to-teal-900/15 p-4 border border-primary-100 dark:border-primary-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-muted)]">Overall Completion</span>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{projectHealth.completionRate}%</span>
              </div>
              <ProgressBar value={projectHealth.completionRate} size="sm" variant="gradient" />
            </div>

            {/* Sprint velocity */}
            <div className="mt-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 p-4 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-muted)]">Sprint Velocity</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{projectHealth.sprintVelocity}%</span>
              </div>
              <ProgressBar value={projectHealth.sprintVelocity} size="sm" variant="info" />
            </div>
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 3: Activity + Gauge + Leaderboard ====== */}
      <DashboardGrid preset="3col" gap="lg">
        {/* Activity Timeline — Premium */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <Card.Title>Recent Activity</Card.Title>
              </div>
              <Badge variant="info" size="sm" className="animate-pulse">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  Live
                </span>
              </Badge>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ActivityTimeline items={activityData} variant="compact" />
            )}
          </Card.Content>
          <Card.Footer padding="md" justify="center">
            <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400 w-full justify-center"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              View All Activity
            </Button>
          </Card.Footer>
        </Card>

        {/* Monthly Goal Gauge — Premium */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg shadow-teal-500/25">
                <Target className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <Card.Title>Monthly Goal</Card.Title>
                <Card.Description>Task completion target</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col items-center">
              {isLoading ? (
                <Skeleton className="h-32 w-32 rounded-full" />
              ) : (
                <GaugeChart
                  value={78}
                  min={0}
                  max={100}
                  variant="donut"
                  size="lg"
                  label="completed"
                  color="#14B8A6"
                  animated
                />
              )}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-3 text-center border border-teal-100 dark:border-teal-800/30">
                  <p className="text-xl font-bold text-teal-700 dark:text-teal-400">156</p>
                  <p className="text-xs text-teal-600/70 dark:text-teal-400/60 font-medium">Completed</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/20 p-3 text-center border border-slate-200 dark:border-slate-700/30">
                  <p className="text-xl font-bold text-slate-700 dark:text-slate-300">44</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Remaining</p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Team Leaderboard — Premium */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg shadow-violet-500/25">
                  <BarChart3 className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <Card.Title>Team Performance</Card.Title>
                  <Card.Description>Tasks completed this week</Card.Description>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[var(--text-muted)]">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            ) : (
              <LeaderboardList
                items={teamLeaderboardData}
                showMedals
                maxVisible={5}
                expandable={false}
                valueFormatter={(v) => `${v} tasks`}
              />
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 4: My Tasks — Premium Table ====== */}
      <Card variant="elevated">
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary-400 to-teal-600 shadow-lg shadow-primary-500/25">
                <CheckCircle2 className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <Card.Title>My Tasks</Card.Title>
                <Card.Description>Your assigned tasks across all projects</Card.Description>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Filter className="h-3.5 w-3.5" />}>
                Filter
              </Button>
              <Button
                size="sm"
                leftIcon={<Plus className="h-4 w-4" />}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/20"
              >
                Add Task
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Content padding="none">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-gradient-to-r from-slate-50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-800/30">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Task
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Project
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Priority
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Due Date
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Status
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {myTasksData.map((task) => {
                    const priorityConfig = getPriorityConfig(task.priority)
                    return (
                      <tr
                        key={task.id}
                        className="group transition-colors hover:bg-primary-50/30 dark:hover:bg-primary-900/5"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn('h-2 w-2 rounded-full shrink-0', priorityConfig.dot)} />
                            <span className="font-medium text-[var(--text-primary)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {task.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-[var(--text-secondary)] rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1">
                            {task.project}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {priorityConfig.badge}
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn(
                            'text-sm font-medium',
                            task.dueDate === 'Today'
                              ? 'text-red-600 dark:text-red-400'
                              : task.dueDate === 'Tomorrow'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-[var(--text-secondary)]'
                          )}>
                            {task.dueDate}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {getStatusPill(task.status)}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400">
                              Complete
                            </Button>
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
        <Card.Footer padding="md" justify="between" className="border-t border-[var(--border-default)]">
          <span className="text-sm text-[var(--text-muted)]">
            Showing <span className="font-medium text-[var(--text-primary)]">5</span> of <span className="font-medium text-[var(--text-primary)]">12</span> tasks
          </span>
          <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            View All Tasks
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}
