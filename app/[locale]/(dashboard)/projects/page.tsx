'use client'

import * as React from 'react'
import {
  FolderKanban,
  CheckSquare,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  Users,
  MoreHorizontal,
  ArrowUpRight,
  Flame,
  Target,
  CheckCircle2,
  Circle,
  Timer,
  CalendarDays,
  User,
  TrendingUp,
  TrendingDown,
  Zap,
  Rocket,
  Activity,
  BarChart3,
  PieChart,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { KanbanBoard, type KanbanColumn, type KanbanCard } from '@core/patterns/KanbanBoard'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { MiniCalendar } from '@core/patterns/MiniCalendar'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// MOCK DATA - Realistic Project Management Data
// ============================================================================

// Hero Sprint Data
const sprintData = {
  name: 'Sprint 23',
  startDate: '2026-02-03',
  endDate: '2026-02-14',
  daysRemaining: 5,
  totalDays: 12,
  tasksTotal: 89,
  tasksCompleted: 42,
  velocity: [62, 58, 71, 65, 78, 82, 75, 89],
  burndown: [89, 82, 76, 70, 63, 58, 52, 47, 47, 47, 47, 47],
  ideal:    [89, 81, 73, 65, 56, 48, 40, 32, 24, 16, 8,  0],
}

// Stats Overview with sparklines
const statsData = {
  activeProjects: {
    value: 12,
    change: 2,
    sparkline: [6, 7, 7, 8, 9, 8, 10, 9, 11, 10, 12, 12],
  },
  tasksThisWeek: {
    value: 47,
    total: 89,
    sparkline: [28, 32, 35, 38, 40, 42, 39, 44, 41, 45, 43, 47],
  },
  completed: {
    value: 23,
    percentage: 48.9,
    sparkline: [8, 10, 12, 14, 15, 16, 18, 17, 19, 20, 21, 23],
  },
  overdue: {
    value: 8,
    urgent: true,
    sparkline: [3, 4, 5, 4, 6, 7, 5, 6, 8, 7, 9, 8],
  },
}

// Kanban Board Data
const initialKanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: 't1',
        title: 'Design system documentation',
        description: 'Create comprehensive docs for all components',
        priority: 'high',
        dueDate: '2026-02-12',
        assignee: { id: '1', name: 'Sarah J.', avatar: undefined },
        tags: [{ id: 'design', label: 'Design', color: '#8B5CF6' }],
      },
      {
        id: 't2',
        title: 'User authentication flow',
        description: 'Implement OAuth2 and JWT tokens',
        priority: 'urgent',
        dueDate: '2026-02-08',
        assignee: { id: '2', name: 'Mike C.', avatar: undefined },
        tags: [{ id: 'backend', label: 'Backend', color: '#22C55E' }],
      },
      {
        id: 't3',
        title: 'Dashboard analytics widget',
        description: 'Add real-time analytics charts',
        priority: 'medium',
        dueDate: '2026-02-15',
        assignee: { id: '3', name: 'Emily D.', avatar: undefined },
        tags: [{ id: 'frontend', label: 'Frontend', color: '#3B82F6' }],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      {
        id: 't4',
        title: 'Mobile responsive redesign',
        description: 'Optimize all pages for mobile devices',
        priority: 'high',
        dueDate: '2026-02-10',
        assignee: { id: '1', name: 'Sarah J.', avatar: undefined },
        tags: [{ id: 'design', label: 'Design', color: '#8B5CF6' }, { id: 'frontend', label: 'Frontend', color: '#3B82F6' }],
      },
      {
        id: 't5',
        title: 'API rate limiting',
        description: 'Implement throttling for public endpoints',
        priority: 'medium',
        dueDate: '2026-02-14',
        assignee: { id: '2', name: 'Mike C.', avatar: undefined },
        tags: [{ id: 'backend', label: 'Backend', color: '#22C55E' }],
      },
      {
        id: 't10',
        title: 'Email notification service',
        description: 'Build transactional email system with templates',
        priority: 'low',
        dueDate: '2026-02-18',
        assignee: { id: '3', name: 'Emily D.', avatar: undefined },
        tags: [{ id: 'backend', label: 'Backend', color: '#22C55E' }, { id: 'infra', label: 'Infra', color: '#06B6D4' }],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: 't6',
        title: 'Payment integration tests',
        description: 'Complete Stripe webhook testing',
        priority: 'high',
        dueDate: '2026-02-07',
        assignee: { id: '4', name: 'James W.', avatar: undefined },
        tags: [{ id: 'testing', label: 'Testing', color: '#F59E0B' }],
      },
      {
        id: 't7',
        title: 'User onboarding flow',
        description: 'Review new user welcome sequence',
        priority: 'medium',
        dueDate: '2026-02-11',
        assignee: { id: '5', name: 'Lisa A.', avatar: undefined },
        tags: [{ id: 'ux', label: 'UX', color: '#EC4899' }],
      },
      {
        id: 't11',
        title: 'Accessibility compliance check',
        description: 'WCAG 2.1 AA audit on all dashboard pages',
        priority: 'high',
        dueDate: '2026-02-09',
        assignee: { id: '1', name: 'Sarah J.', avatar: undefined },
        tags: [{ id: 'frontend', label: 'Frontend', color: '#3B82F6' }, { id: 'qa', label: 'QA', color: '#EF4444' }],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: 't8',
        title: 'Database migration',
        description: 'Migrate to PostgreSQL 15',
        priority: 'low',
        dueDate: '2026-02-01',
        assignee: { id: '2', name: 'Mike C.', avatar: undefined },
        tags: [{ id: 'backend', label: 'Backend', color: '#22C55E' }],
      },
      {
        id: 't9',
        title: 'Performance audit',
        description: 'Lighthouse score optimization',
        priority: 'low',
        dueDate: '2026-02-03',
        assignee: { id: '1', name: 'Sarah J.', avatar: undefined },
        tags: [{ id: 'frontend', label: 'Frontend', color: '#3B82F6' }],
      },
      {
        id: 't12',
        title: 'CI/CD pipeline setup',
        description: 'GitHub Actions with automated testing and deployment',
        priority: 'medium',
        dueDate: '2026-01-30',
        assignee: { id: '4', name: 'James W.', avatar: undefined },
        tags: [{ id: 'infra', label: 'Infra', color: '#06B6D4' }, { id: 'devops', label: 'DevOps', color: '#F97316' }],
      },
    ],
  },
]

// Project Progress Data
interface Project {
  id: string
  name: string
  progress: number
  deadline: string
  status: 'on-track' | 'at-risk' | 'delayed'
  team: { name: string; avatar?: string }[]
}

const projectsData: Project[] = [
  {
    id: '1',
    name: 'Mobile App v2.0',
    progress: 75,
    deadline: '2026-02-28',
    status: 'on-track',
    team: [{ name: 'Sarah' }, { name: 'Mike' }, { name: 'Emily' }],
  },
  {
    id: '2',
    name: 'API Gateway Redesign',
    progress: 45,
    deadline: '2026-03-15',
    status: 'on-track',
    team: [{ name: 'Mike' }, { name: 'James' }],
  },
  {
    id: '3',
    name: 'Customer Portal',
    progress: 30,
    deadline: '2026-02-20',
    status: 'at-risk',
    team: [{ name: 'Emily' }, { name: 'Lisa' }, { name: 'Sarah' }],
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    progress: 60,
    deadline: '2026-02-10',
    status: 'delayed',
    team: [{ name: 'James' }],
  },
  {
    id: '5',
    name: 'Payment Integration',
    progress: 90,
    deadline: '2026-02-08',
    status: 'on-track',
    team: [{ name: 'Mike' }, { name: 'Lisa' }],
  },
  {
    id: '6',
    name: 'Design System v3',
    progress: 55,
    deadline: '2026-03-01',
    status: 'on-track',
    team: [{ name: 'Sarah' }, { name: 'Emily' }, { name: 'Lisa' }, { name: 'James' }],
  },
]

// Workload Distribution
interface TeamMember {
  id: string
  name: string
  avatar?: string
  todo: number
  inProgress: number
  review: number
  done: number
}

const workloadData: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', todo: 5, inProgress: 3, review: 2, done: 8 },
  { id: '2', name: 'Mike Chen', todo: 4, inProgress: 2, review: 1, done: 12 },
  { id: '3', name: 'Emily Davis', todo: 6, inProgress: 4, review: 3, done: 6 },
  { id: '4', name: 'James Wilson', todo: 3, inProgress: 1, review: 2, done: 9 },
  { id: '5', name: 'Lisa Anderson', todo: 2, inProgress: 2, review: 1, done: 7 },
  { id: '6', name: 'Alex Rivera', todo: 3, inProgress: 4, review: 2, done: 5 },
]

// Upcoming Deadlines
interface Deadline {
  id: string
  project: string
  task: string
  date: string
  assignee: { name: string; avatar?: string }
}

const upcomingDeadlines: Deadline[] = [
  { id: '1', project: 'Payment Integration', task: 'Stripe webhooks', date: '2026-02-07', assignee: { name: 'James W.' } },
  { id: '2', project: 'Mobile App v2.0', task: 'Auth flow', date: '2026-02-08', assignee: { name: 'Mike C.' } },
  { id: '3', project: 'Analytics Dashboard', task: 'Chart components', date: '2026-02-10', assignee: { name: 'Sarah J.' } },
  { id: '4', project: 'Customer Portal', task: 'User onboarding', date: '2026-02-11', assignee: { name: 'Lisa A.' } },
  { id: '5', project: 'Mobile App v2.0', task: 'Responsive design', date: '2026-02-12', assignee: { name: 'Emily D.' } },
  { id: '6', project: 'API Gateway', task: 'Rate limiter config', date: '2026-02-14', assignee: { name: 'Mike C.' } },
  { id: '7', project: 'Analytics Dashboard', task: 'Export reports', date: '2026-02-15', assignee: { name: 'Emily D.' } },
]

// Team Activity
const teamActivityData: ActivityItem[] = [
  { id: '1', title: 'Sarah completed "Database migration"', description: 'Mobile App v2.0', timestamp: new Date(Date.now() - 15 * 60000), type: 'success' },
  { id: '2', title: 'Mike moved "API rate limiting" to In Progress', description: 'API Gateway Redesign', timestamp: new Date(Date.now() - 45 * 60000), type: 'info' },
  { id: '3', title: 'Emily commented on "User onboarding flow"', description: 'Customer Portal', timestamp: new Date(Date.now() - 2 * 3600000), type: 'default' },
  { id: '4', title: 'James flagged "Payment tests" as blocked', description: 'Payment Integration', timestamp: new Date(Date.now() - 3 * 3600000), type: 'warning' },
  { id: '5', title: 'Lisa created new task "Email templates"', description: 'Customer Portal', timestamp: new Date(Date.now() - 5 * 3600000), type: 'info' },
  { id: '6', title: 'Sprint 23 started', description: '47 tasks planned', timestamp: new Date(Date.now() - 24 * 3600000), type: 'success' },
  { id: '7', title: 'Mike resolved merge conflict', description: 'API Gateway Redesign', timestamp: new Date(Date.now() - 26 * 3600000), type: 'default' },
  { id: '8', title: 'Sarah assigned to "Design system docs"', description: 'Mobile App v2.0', timestamp: new Date(Date.now() - 48 * 3600000), type: 'info' },
  { id: '9', title: 'Emily completed "Dark mode toggle"', description: 'Analytics Dashboard', timestamp: new Date(Date.now() - 52 * 3600000), type: 'success' },
  { id: '10', title: 'James pushed 12 commits to main', description: 'Payment Integration', timestamp: new Date(Date.now() - 55 * 3600000), type: 'info' },
  { id: '11', title: 'Lisa reported bug in "Checkout flow"', description: 'Customer Portal', timestamp: new Date(Date.now() - 72 * 3600000), type: 'error' },
  { id: '12', title: 'Sprint 22 review completed', description: '38/42 tasks delivered', timestamp: new Date(Date.now() - 96 * 3600000), type: 'success' },
]

// Tasks Table Data
interface Task {
  id: string
  task: string
  project: string
  assignee: { name: string; avatar?: string }
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in-progress' | 'review' | 'done'
  dueDate: string
  progress: number
}

const tasksData: Task[] = [
  { id: '1', task: 'Design system documentation', project: 'Mobile App v2.0', assignee: { name: 'Sarah J.' }, priority: 'high', status: 'todo', dueDate: '2026-02-12', progress: 0 },
  { id: '2', task: 'User authentication flow', project: 'Mobile App v2.0', assignee: { name: 'Mike C.' }, priority: 'urgent', status: 'todo', dueDate: '2026-02-08', progress: 0 },
  { id: '3', task: 'Mobile responsive redesign', project: 'Mobile App v2.0', assignee: { name: 'Sarah J.' }, priority: 'high', status: 'in-progress', dueDate: '2026-02-10', progress: 45 },
  { id: '4', task: 'API rate limiting', project: 'API Gateway', assignee: { name: 'Mike C.' }, priority: 'medium', status: 'in-progress', dueDate: '2026-02-14', progress: 30 },
  { id: '5', task: 'Payment integration tests', project: 'Payment Integration', assignee: { name: 'James W.' }, priority: 'high', status: 'review', dueDate: '2026-02-07', progress: 80 },
  { id: '6', task: 'User onboarding flow', project: 'Customer Portal', assignee: { name: 'Lisa A.' }, priority: 'medium', status: 'review', dueDate: '2026-02-11', progress: 90 },
  { id: '7', task: 'Database migration', project: 'API Gateway', assignee: { name: 'Mike C.' }, priority: 'low', status: 'done', dueDate: '2026-02-01', progress: 100 },
  { id: '8', task: 'Performance audit', project: 'Mobile App v2.0', assignee: { name: 'Sarah J.' }, priority: 'low', status: 'done', dueDate: '2026-02-03', progress: 100 },
  { id: '9', task: 'Dashboard analytics widget', project: 'Analytics Dashboard', assignee: { name: 'Emily D.' }, priority: 'medium', status: 'todo', dueDate: '2026-02-15', progress: 0 },
  { id: '10', task: 'Email notification system', project: 'Customer Portal', assignee: { name: 'Emily D.' }, priority: 'high', status: 'in-progress', dueDate: '2026-02-18', progress: 25 },
]

// Calendar Events
const calendarEvents = [
  new Date('2026-02-07'),
  new Date('2026-02-08'),
  new Date('2026-02-10'),
  new Date('2026-02-11'),
  new Date('2026-02-12'),
  new Date('2026-02-14'),
  new Date('2026-02-15'),
  new Date('2026-02-20'),
]

// Table Columns
const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'task',
    accessorKey: 'task',
    header: 'Task',
    sortable: true,
    cell: ({ value }) => (
      <span className="font-medium text-[var(--text-primary)]">{value as string}</span>
    ),
  },
  {
    id: 'project',
    accessorKey: 'project',
    header: 'Project',
    sortable: true,
    cell: ({ value }) => (
      <span className="text-sm text-[var(--text-secondary)]">{value as string}</span>
    ),
  },
  {
    id: 'assignee',
    accessorKey: 'assignee',
    header: 'Assignee',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar fallback={row.assignee.name.charAt(0)} size="xs" alt={row.assignee.name} />
        <span className="text-sm text-[var(--text-secondary)]">{row.assignee.name}</span>
      </div>
    ),
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    sortable: true,
    cell: ({ value }) => {
      const priorityColors: Record<string, string> = {
        low: 'default',
        medium: 'warning',
        high: 'error',
        urgent: 'error',
      }
      return (
        <Badge variant={priorityColors[value as string] as 'default' | 'warning' | 'error'} size="sm">
          {value === 'urgent' && <Flame className="mr-1 h-3 w-3" />}
          {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
        </Badge>
      )
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => {
      const statusConfig: Record<string, { label: string; color: string; icon: typeof Circle }> = {
        'todo': { label: 'To Do', color: '#6B7280', icon: Circle },
        'in-progress': { label: 'In Progress', color: '#3B82F6', icon: Timer },
        'review': { label: 'Review', color: '#8B5CF6', icon: Clock },
        'done': { label: 'Done', color: '#22C55E', icon: CheckCircle2 },
      }
      const config = statusConfig[value as string] ?? { label: 'Unknown', color: '#6B7280', icon: Circle }
      const Icon = config.icon
      return (
        <Badge variant="default" size="sm" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
          <Icon className="mr-1 h-3 w-3" />
          {config.label}
        </Badge>
      )
    },
  },
  {
    id: 'dueDate',
    accessorKey: 'dueDate',
    header: 'Due Date',
    sortable: true,
    cell: ({ value }) => {
      const date = new Date(value as string)
      const isOverdue = date < new Date() && tasksData.find(t => t.dueDate === value)?.status !== 'done'
      return (
        <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-[var(--text-muted)]'}`}>
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      )
    },
  },
  {
    id: 'progress',
    accessorKey: 'progress',
    header: 'Progress',
    sortable: true,
    cell: ({ value }) => {
      const progress = value as number
      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-[var(--text-muted)]">{progress}%</span>
        </div>
      )
    },
  },
]

// View Options
const viewOptions = [
  { value: 'board', label: 'Board', icon: LayoutGrid },
  { value: 'list', label: 'List', icon: List },
  { value: 'timeline', label: 'Timeline', icon: Calendar },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProjectsDashboard() {
  const [activeView, setActiveView] = React.useState('board')
  const [isLoading, setIsLoading] = React.useState(true)
  const [kanbanColumns, setKanbanColumns] = React.useState(initialKanbanColumns)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleKanbanChange = (newColumns: KanbanColumn[]) => {
    setKanbanColumns(newColumns)
  }

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:flex-1">
          <h1 className="text-2xl font-bold md:text-3xl text-center bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="mt-1 text-[var(--text-secondary)] text-center">
            Track progress, manage tasks, and collaborate with your team
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-1">
            {viewOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  onClick={() => setActiveView(option.value)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    activeView === option.value
                      ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-secondary-800'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {option.label}
                </button>
              )
            })}
          </div>

          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Project
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Task
          </Button>
        </div>
      </div>

      {/* ====== HERO: SPRINT OVERVIEW ====== */}
      {isLoading ? (
        <Skeleton className="h-52 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-violet-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_60%)]" />
          <Card.Content className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Sprint Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                    <Rocket className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{sprintData.name}</p>
                  <Badge variant="info" size="sm" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {sprintData.daysRemaining} days left
                  </Badge>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                    {sprintData.tasksCompleted}
                    <span className="text-2xl text-[var(--text-muted)] md:text-3xl">/{sprintData.tasksTotal}</span>
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">tasks completed this sprint</p>

                {/* Sprint Progress Bar */}
                <div className="max-w-sm">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Sprint progress</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {Math.round((sprintData.tasksCompleted / sprintData.tasksTotal) * 100)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                      style={{ width: `${(sprintData.tasksCompleted / sprintData.tasksTotal) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Velocity bars + Sprint metrics */}
              <div className="flex items-center gap-6 lg:gap-8">
                {/* Sprint velocity bars */}
                <div className="w-full lg:w-48">
                  <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">Velocity (tasks/sprint)</p>
                  <div className="flex items-end gap-1 h-16">
                    {sprintData.velocity.map((v, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all ${i === sprintData.velocity.length - 1 ? 'bg-indigo-500' : i >= sprintData.velocity.length - 3 ? 'bg-indigo-400 dark:bg-indigo-500/80' : 'bg-indigo-200 dark:bg-indigo-700/50'}`}
                        style={{ height: `${(v / 100) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[8px] text-[var(--text-muted)]">S16</span>
                    <span className="text-[8px] font-semibold text-indigo-600 dark:text-indigo-400">S23</span>
                  </div>
                </div>

                {/* Sprint metrics panel */}
                <div className="hidden lg:flex flex-col gap-3 pl-8 border-l border-indigo-200/50 dark:border-indigo-800/30">
                  {[
                    { icon: Zap, label: 'Avg Velocity', value: '72 pts', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
                    { icon: Target, label: 'Sprint Goal', value: '89%', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-100 dark:bg-violet-900/30' },
                    { icon: TrendingUp, label: 'Velocity Trend', value: '+12%', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.bg}`}>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">{metric.label}</p>
                        <p className={`text-sm font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 1: STATS OVERVIEW ====== */}
      <DashboardGrid preset="4col" gap="lg" className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-3 pb-3 sm:grid sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            {/* Active Projects */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-indigo-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Active Projects</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {statsData.activeProjects.value}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +{statsData.activeProjects.change} new this month
                    </div>
                  </div>
                  <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
                    <FolderKanban className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-[3px] h-8">
                  {statsData.activeProjects.sparkline.map((v, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i === statsData.activeProjects.sparkline.length - 1 ? 'bg-indigo-500' : 'bg-indigo-200 dark:bg-indigo-700/50'}`} style={{ height: `${(v / 14) * 100}%` }} />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Tasks This Week */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Tasks This Week</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {statsData.tasksThisWeek.value}
                      <span className="text-base font-normal text-[var(--text-muted)]">
                        /{statsData.tasksThisWeek.total}
                      </span>
                    </p>
                    <div className="mt-1 text-xs text-[var(--text-muted)]">
                      {Math.round((statsData.tasksThisWeek.value / statsData.tasksThisWeek.total) * 100)}% of sprint
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-[3px] h-8">
                  {statsData.tasksThisWeek.sparkline.map((v, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i >= statsData.tasksThisWeek.sparkline.length - 2 ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-700/50'}`} style={{ height: `${(v / 50) * 100}%` }} />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Completed */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-green-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Completed</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {statsData.completed.value}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="h-3 w-3" />
                      {statsData.completed.percentage}% completion rate
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-[3px] h-8">
                  {statsData.completed.sparkline.map((v, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i === statsData.completed.sparkline.length - 1 ? 'bg-emerald-500' : 'bg-emerald-200 dark:bg-emerald-700/50'}`} style={{ height: `${(v / 25) * 100}%` }} />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Overdue */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-rose-400" />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">Overdue</p>
                    <p className="mt-1 text-2xl font-bold text-red-700 dark:text-red-300">
                      {statsData.overdue.value}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                      <AlertTriangle className="h-3 w-3" />
                      Requires attention
                    </div>
                  </div>
                  <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                    <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-[3px] h-8">
                  {statsData.overdue.sparkline.map((v, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i === statsData.overdue.sparkline.length - 1 ? 'bg-red-500' : 'bg-red-200 dark:bg-red-700/50'}`} style={{ height: `${(v / 10) * 100}%` }} />
                  ))}
                </div>
              </Card.Content>
            </Card>
          </>
        )}
      </DashboardGrid>

      {/* ====== ROW 2: KANBAN BOARD (HIGHLIGHT) ====== */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary-500" />
                Sprint Board
              </Card.Title>
              <Card.Description>Drag and drop tasks between columns</Card.Description>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              Full View
            </Button>
          </div>
        </Card.Header>
        <Card.Content padding="none">
          <div className="overflow-x-auto p-4">
            {isLoading ? (
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-96 w-80 shrink-0 rounded-xl" />
                ))}
              </div>
            ) : (
              <KanbanBoard
                columns={kanbanColumns}
                onColumnsChange={handleKanbanChange}
                variant="default"
              />
            )}
          </div>
        </Card.Content>
      </Card>

      {/* ====== ROW 3: PROJECT PROGRESS + WORKLOAD ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Progress */}
        <Card className="relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 pointer-events-none" />
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  Project Progress
                </Card.Title>
                <Card.Description className="mt-1">Active projects overview</Card.Description>
              </div>
              <Badge variant="default" size="sm" className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {projectsData.length} projects
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {projectsData.map((project) => {
                  const statusColors: Record<string, { bg: string; text: string; label: string; border: string }> = {
                    'on-track': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', label: 'On Track', border: 'border-green-200 dark:border-green-800/40' },
                    'at-risk': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', label: 'At Risk', border: 'border-yellow-200 dark:border-yellow-800/40' },
                    'delayed': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', label: 'Delayed', border: 'border-red-200 dark:border-red-800/40' },
                  }
                  const statusConfig = statusColors[project.status] ?? { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-600 dark:text-gray-400', label: 'Unknown', border: 'border-[var(--border-default)]' }
                  const progressColor = project.status === 'on-track' ? 'success' : project.status === 'at-risk' ? 'warning' : 'error'
                  const progressBarColor = project.status === 'on-track'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                    : project.status === 'at-risk'
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                      : 'bg-gradient-to-r from-red-500 to-rose-400'
                  const progressBg = project.status === 'on-track'
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : project.status === 'at-risk'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'

                  return (
                    <div key={project.id} className="group rounded-xl border border-[var(--border-default)] p-3.5 transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-800">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                              {project.name}
                            </h4>
                            <Badge variant="default" size="sm" className={`${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <CalendarDays className="h-3 w-3" />
                            Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, idx) => (
                            <Avatar
                              key={idx}
                              fallback={member.name.charAt(0)}
                              size="xs"
                              alt={member.name}
                              className="ring-2 ring-white dark:ring-secondary-900"
                            />
                          ))}
                          {project.team.length > 3 && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600 ring-2 ring-white dark:bg-blue-900/40 dark:text-blue-400 dark:ring-secondary-900">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1">
                          <div className={`h-2 w-full overflow-hidden rounded-full ${progressBg}`}>
                            <div
                              className={`h-full rounded-full ${progressBarColor} transition-all duration-500`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="min-w-[2.5rem] text-right text-sm font-bold text-[var(--text-primary)]">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Workload Distribution */}
        <Card className="relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-500/10 dark:to-purple-500/10 pointer-events-none" />
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 to-purple-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-sm">
                    <PieChart className="h-4 w-4 text-white" />
                  </div>
                  Workload Distribution
                </Card.Title>
                <Card.Description className="mt-1">Tasks per team member</Card.Description>
              </div>
              <Badge variant="default" size="sm" className="bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                {workloadData.length} members
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {workloadData.map((member) => {
                  const total = member.todo + member.inProgress + member.review + member.done
                  const maxTasks = Math.max(...workloadData.map(m => m.todo + m.inProgress + m.review + m.done))
                  const isOverloaded = (member.todo + member.inProgress + member.review) > 10
                  const completionRate = Math.round((member.done / total) * 100)

                  return (
                    <div key={member.id} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-violet-200 dark:hover:border-violet-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar fallback={member.name.charAt(0)} size="sm" alt={member.name} className="ring-2 ring-violet-100 dark:ring-violet-900/30" />
                          <div>
                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                              {member.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                              <span>{total} tasks</span>
                              <span className="text-[var(--border-default)]">&middot;</span>
                              <span className="text-green-600 dark:text-green-400">{completionRate}% done</span>
                            </div>
                          </div>
                        </div>
                        {isOverloaded && (
                          <Badge variant="warning" size="sm" className="border border-yellow-200 dark:border-yellow-800/40">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Heavy
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2.5 flex h-2.5 overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800">
                        <div
                          className="bg-slate-400 transition-all duration-500"
                          style={{ width: `${(member.todo / maxTasks) * 100}%` }}
                          title={`To Do: ${member.todo}`}
                        />
                        <div
                          className="bg-blue-500 transition-all duration-500"
                          style={{ width: `${(member.inProgress / maxTasks) * 100}%` }}
                          title={`In Progress: ${member.inProgress}`}
                        />
                        <div
                          className="bg-violet-500 transition-all duration-500"
                          style={{ width: `${(member.review / maxTasks) * 100}%` }}
                          title={`Review: ${member.review}`}
                        />
                        <div
                          className="bg-emerald-500 transition-all duration-500"
                          style={{ width: `${(member.done / maxTasks) * 100}%` }}
                          title={`Done: ${member.done}`}
                        />
                      </div>
                    </div>
                  )
                })}
                {/* Legend */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    <span className="font-medium text-[var(--text-muted)]">To Do</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-[var(--text-muted)]">In Progress</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="font-medium text-[var(--text-muted)]">Review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-[var(--text-muted)]">Done</span>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 4: CALENDAR + ACTIVITY ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines with Mini Calendar */}
        <Card className="relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 dark:from-indigo-500/10 dark:to-violet-500/10 pointer-events-none" />
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Upcoming Deadlines
                </Card.Title>
                <Card.Description className="mt-1">Sprint milestones & due dates</Card.Description>
              </div>
              <Badge variant="default" size="sm" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {upcomingDeadlines.length} upcoming
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-72 rounded-lg" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 rounded-lg" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Calendar - full width with enhanced styling */}
                <div className="rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-4 dark:border-indigo-900/30 dark:from-[var(--bg-elevated)] dark:to-indigo-950/20">
                  <MiniCalendar
                    size="lg"
                    value={selectedDate ?? undefined}
                    onChange={setSelectedDate}
                    highlightedDates={calendarEvents}
                    className="!max-w-none"
                  />
                </div>
                {/* Deadlines list */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Deadlines
                  </h4>
                  {upcomingDeadlines.map((deadline) => {
                    const deadlineDate = new Date(deadline.date)
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const isOverdue = deadlineDate < today
                    const isToday = deadlineDate.toDateString() === today.toDateString()
                    const isSoon = !isOverdue && !isToday && (deadlineDate.getTime() - today.getTime()) < 3 * 24 * 60 * 60 * 1000

                    const dateBg = isOverdue
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : isToday
                        ? 'bg-amber-100 dark:bg-amber-900/30'
                        : isSoon
                          ? 'bg-indigo-100 dark:bg-indigo-900/30'
                          : 'bg-violet-50 dark:bg-violet-900/20'
                    const dateText = isOverdue
                      ? 'text-red-600 dark:text-red-400'
                      : isToday
                        ? 'text-amber-600 dark:text-amber-400'
                        : isSoon
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-violet-600 dark:text-violet-400'
                    const dateBold = isOverdue
                      ? 'text-red-700 dark:text-red-300'
                      : isToday
                        ? 'text-amber-700 dark:text-amber-300'
                        : isSoon
                          ? 'text-indigo-700 dark:text-indigo-300'
                          : 'text-violet-700 dark:text-violet-300'
                    const borderColor = isOverdue
                      ? 'border-red-200 dark:border-red-800/40 hover:border-red-300'
                      : isToday
                        ? 'border-amber-200 dark:border-amber-800/40 hover:border-amber-300'
                        : 'border-[var(--border-default)] hover:border-indigo-200 dark:hover:border-indigo-800'

                    return (
                      <div
                        key={deadline.id}
                        className={`group flex items-center gap-3 rounded-xl border ${borderColor} p-3 transition-all hover:shadow-sm hover:scale-[1.01]`}
                      >
                        <div className={`flex h-11 w-11 flex-col items-center justify-center rounded-lg ${dateBg}`}>
                          <span className={`text-[10px] font-semibold uppercase ${dateText}`}>
                            {deadlineDate.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className={`text-sm font-bold leading-none ${dateBold}`}>
                            {deadlineDate.getDate()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                            {deadline.task}
                          </p>
                          <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                            {deadline.project}
                            {isOverdue && (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600 dark:bg-red-900/40 dark:text-red-400">
                                Overdue
                              </span>
                            )}
                            {isToday && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                                Today
                              </span>
                            )}
                          </p>
                        </div>
                        <Avatar fallback={deadline.assignee.name.charAt(0)} size="xs" alt={deadline.assignee.name} className="ring-2 ring-white dark:ring-secondary-900" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Team Activity */}
        <Card className="relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 pointer-events-none" />
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  Team Activity
                </Card.Title>
                <Card.Description className="mt-1">Recent updates from your team</Card.Description>
              </div>
              <Badge variant="default" size="sm" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {teamActivityData.length} updates
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Mobile: carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {teamActivityData.slice(0, 8).map((item) => {
                    const typeColors: Record<string, string> = { success: 'border-l-emerald-500', info: 'border-l-blue-500', warning: 'border-l-amber-500', error: 'border-l-red-500', default: 'border-l-slate-400' }
                    return (
                      <div key={item.id} className={`snap-start shrink-0 w-[72vw] rounded-xl border border-[var(--border-default)] border-l-[3px] ${typeColors[item.type ?? 'default']} bg-[var(--bg-subtle)] p-3 space-y-1.5`}>
                        <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">{item.title}</p>
                        <p className="text-xs text-[var(--text-muted)]">{item.description}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{new Date(item.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                      </div>
                    )
                  })}
                </div>
                {/* Desktop: full timeline + metrics */}
                <div className="hidden sm:block">
                  <div className="rounded-xl border border-emerald-100/50 bg-gradient-to-b from-white/50 to-emerald-50/20 p-4 dark:border-emerald-900/20 dark:from-[var(--bg-elevated)]/50 dark:to-emerald-950/10">
                    <ActivityTimeline items={teamActivityData} variant="compact" />
                  </div>
                  <div className="grid grid-cols-4 gap-px mt-4 border-t border-[var(--border-default)] bg-[var(--border-default)] rounded-b-lg overflow-hidden">
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Commits Today</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">24</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">PRs Merged</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">7</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Active Now</p>
                      <p className="text-sm font-bold text-violet-600 dark:text-violet-400 mt-0.5">4/6</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Avg Response</p>
                      <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">18min</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-px mt-px border-t border-[var(--border-default)] bg-[var(--border-default)] rounded-b-lg overflow-hidden">
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Tasks Created</p>
                      <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">12</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Code Reviews</p>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">8</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Meetings</p>
                      <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-0.5">3</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Issues Closed</p>
                      <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-0.5">5</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-px mt-px border-t border-[var(--border-default)] bg-[var(--border-default)] rounded-b-lg overflow-hidden">
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Deployments</p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-0.5">4</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Test Coverage</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">87%</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Build Time</p>
                      <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-0.5">2.3m</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center border-l border-[var(--border-default)]">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Uptime</p>
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5">99.9%</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 5: TASKS TABLE ====== */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary-500" />
                Tasks Overview
              </Card.Title>
              <Card.Description>All tasks across projects</Card.Description>
            </div>
            <div className="flex gap-2">
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
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Mobile: carousel */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-3 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {tasksData.slice(0, 8).map((task) => {
                  const statusColors: Record<string, string> = { 'todo': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', 'in-progress': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', 'review': 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400', 'done': 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' }
                  const priorityColors: Record<string, string> = { low: 'text-slate-500', medium: 'text-amber-500', high: 'text-red-500', urgent: 'text-red-600' }
                  return (
                    <div key={task.id} className="snap-start shrink-0 w-[72vw] rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>{task.status.replace('-', ' ')}</span>
                        <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">{task.task}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)]">{task.project}</span>
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-10 rounded-full bg-secondary-200 dark:bg-secondary-700 overflow-hidden">
                            <div className="h-full rounded-full bg-primary-500" style={{ width: `${task.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-[var(--text-muted)]">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Desktop: full table */}
              <div className="hidden sm:block">
                <DataTable
                  data={tasksData}
                  columns={tasksColumns}
                  sortable
                  filterable
                  filterPlaceholder="Search tasks..."
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
  )
}
