'use client'

import * as React from 'react'
import {
  Users,
  Briefcase,
  UserPlus,
  GraduationCap,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  TrendingDown,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  DollarSign,
  Award,
  UserCheck,
  FileText,
  Video,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Eye,
  Edit2,
  Trash2,
  Zap,
  Activity,
  ArrowUpRight,
  Heart,
  Sparkles,
  Timer,
  BarChart3,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/patterns/Tabs'
import { Skeleton } from '@core/primitives/Skeleton'

// ============================================================================
// MOCK DATA - HR / Recruitment (Premium Diamond)
// ============================================================================

// Hero Overview
const heroData = {
  totalHeadcount: 247,
  changePercent: 8.2,
  newHiresThisMonth: 12,
  openPositions: 18,
  avgTimeToHire: 28,
  headcountTrend: [
    210, 215, 218, 222, 225, 228, 230, 232, 235, 237,
    238, 240, 241, 242, 243, 244, 244, 245, 245, 246,
    246, 246, 246, 247, 247, 247, 247, 247, 247, 247,
  ],
}

// KPIs with sparklines
const hrKPIs = [
  {
    id: 'headcount',
    label: 'Total Headcount',
    value: 247,
    change: 8,
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
    lightBg: 'from-violet-500/5 via-transparent to-transparent',
    topBar: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    sparkline: [210, 215, 220, 225, 228, 232, 235, 238, 240, 243, 245, 247],
    sparkColor: '#8B5CF6',
  },
  {
    id: 'openings',
    label: 'Open Positions',
    value: 18,
    change: 12,
    icon: Briefcase,
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'from-blue-500/5 via-transparent to-transparent',
    topBar: 'from-blue-500 to-indigo-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    sparkline: [10, 12, 14, 13, 15, 16, 14, 17, 16, 18, 17, 18],
    sparkColor: '#3B82F6',
  },
  {
    id: 'hired',
    label: 'Hired This Month',
    value: 12,
    change: 25,
    icon: UserPlus,
    gradient: 'from-emerald-500 to-green-600',
    lightBg: 'from-emerald-500/5 via-transparent to-transparent',
    topBar: 'from-emerald-500 to-green-500',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    sparkline: [5, 7, 6, 8, 9, 7, 10, 8, 11, 10, 11, 12],
    sparkColor: '#10B981',
  },
  {
    id: 'onboarding',
    label: 'In Onboarding',
    value: 8,
    change: 0,
    icon: GraduationCap,
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'from-amber-500/5 via-transparent to-transparent',
    topBar: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    sparkline: [3, 4, 5, 4, 6, 7, 5, 6, 8, 7, 9, 8],
    sparkColor: '#F59E0B',
  },
]

// Recruitment Metrics
const recruitmentMetrics = [
  {
    label: 'Avg. Time to Hire',
    value: '28 days',
    change: -3,
    benchmark: '32 days',
    isGood: true,
    icon: Timer,
    color: 'violet',
    sparkline: [35, 34, 33, 32, 31, 30, 31, 30, 29, 29, 28, 28],
  },
  {
    label: 'Cost per Hire',
    value: '$4,250',
    change: -5,
    benchmark: '$5,000',
    isGood: true,
    icon: DollarSign,
    color: 'emerald',
    sparkline: [5200, 5100, 4900, 4800, 4700, 4600, 4500, 4400, 4350, 4300, 4280, 4250],
  },
  {
    label: 'Offer Acceptance',
    value: '87%',
    change: 2,
    benchmark: '85%',
    isGood: true,
    icon: CheckCircle2,
    color: 'blue',
    sparkline: [80, 81, 82, 83, 84, 83, 85, 84, 86, 85, 86, 87],
  },
  {
    label: 'Quality of Hire',
    value: '4.2/5',
    change: 0.3,
    benchmark: '4.0',
    isGood: true,
    icon: Star,
    color: 'amber',
    sparkline: [3.6, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.1, 4.1, 4.2],
  },
]

// Hiring Pipeline Stages
const pipelineStages = [
  { id: 'applied', name: 'Applied', count: 156, color: '#6366F1', gradient: 'from-indigo-500 to-indigo-600' },
  { id: 'screening', name: 'Screening', count: 48, color: '#8B5CF6', gradient: 'from-violet-500 to-violet-600' },
  { id: 'interview', name: 'Interview', count: 24, color: '#D946EF', gradient: 'from-fuchsia-500 to-fuchsia-600' },
  { id: 'assessment', name: 'Assessment', count: 12, color: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
  { id: 'offer', name: 'Offer', count: 6, color: '#22C55E', gradient: 'from-emerald-500 to-emerald-600' },
  { id: 'hired', name: 'Hired', count: 4, color: '#14B89A', gradient: 'from-teal-500 to-teal-600' },
]

// Department Headcount
const departmentHeadcount = [
  { department: 'Engineering', current: 68, planned: 80, color: '#3B82F6', icon: '💻' },
  { department: 'Product', current: 24, planned: 28, color: '#8B5CF6', icon: '🎯' },
  { department: 'Design', current: 18, planned: 22, color: '#EC4899', icon: '🎨' },
  { department: 'Marketing', current: 32, planned: 35, color: '#F97316', icon: '📢' },
  { department: 'Sales', current: 45, planned: 52, color: '#22C55E', icon: '💰' },
  { department: 'Operations', current: 28, planned: 30, color: '#14B89A', icon: '⚙️' },
  { department: 'Finance', current: 16, planned: 18, color: '#FBBF24', icon: '📊' },
  { department: 'HR', current: 16, planned: 18, color: '#06B6D4', icon: '👥' },
]

// Open Positions
type JobStatus = 'urgent' | 'active' | 'on-hold' | 'filled'
type Job = {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary: string
  applicants: number
  posted: string
  status: JobStatus
  recruiter: string
}

const openPositions: Job[] = [
  { id: '1', title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$120K-$150K', applicants: 45, posted: '5 days ago', status: 'urgent', recruiter: 'Sarah Miller' },
  { id: '2', title: 'Product Manager', department: 'Product', location: 'New York', type: 'Full-time', salary: '$130K-$160K', applicants: 32, posted: '1 week ago', status: 'active', recruiter: 'John Davis' },
  { id: '3', title: 'UX Designer', department: 'Design', location: 'San Francisco', type: 'Full-time', salary: '$100K-$130K', applicants: 28, posted: '2 weeks ago', status: 'active', recruiter: 'Sarah Miller' },
  { id: '4', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$110K-$140K', applicants: 18, posted: '3 days ago', status: 'urgent', recruiter: 'John Davis' },
  { id: '5', title: 'Marketing Specialist', department: 'Marketing', location: 'Austin', type: 'Full-time', salary: '$70K-$90K', applicants: 52, posted: '1 week ago', status: 'active', recruiter: 'Emily Chen' },
  { id: '6', title: 'Sales Representative', department: 'Sales', location: 'Chicago', type: 'Full-time', salary: '$60K-$80K + Commission', applicants: 67, posted: '4 days ago', status: 'active', recruiter: 'Emily Chen' },
  { id: '7', title: 'Data Analyst', department: 'Product', location: 'Remote', type: 'Full-time', salary: '$90K-$110K', applicants: 24, posted: '2 weeks ago', status: 'on-hold', recruiter: 'Sarah Miller' },
  { id: '8', title: 'HR Coordinator', department: 'HR', location: 'New York', type: 'Full-time', salary: '$55K-$70K', applicants: 38, posted: '1 week ago', status: 'active', recruiter: 'John Davis' },
]

// Top Candidates (expanded)
type CandidateStage = 'screening' | 'interview' | 'assessment' | 'offer'
type Candidate = {
  id: string
  name: string
  avatar: string
  position: string
  stage: CandidateStage
  rating: number
  source: string
  appliedDate: string
  nextStep: string
  nextStepDate: string
}

const topCandidates: Candidate[] = [
  { id: '1', name: 'Alex Thompson', avatar: '', position: 'Senior Frontend Developer', stage: 'offer', rating: 4.8, source: 'LinkedIn', appliedDate: '2 weeks ago', nextStep: 'Offer Review', nextStepDate: 'Today' },
  { id: '2', name: 'Maria Santos', avatar: '', position: 'Product Manager', stage: 'assessment', rating: 4.6, source: 'Referral', appliedDate: '1 week ago', nextStep: 'Case Study', nextStepDate: 'Tomorrow' },
  { id: '3', name: 'James Wilson', avatar: '', position: 'DevOps Engineer', stage: 'interview', rating: 4.5, source: 'Indeed', appliedDate: '5 days ago', nextStep: 'Technical Interview', nextStepDate: 'Feb 8' },
  { id: '4', name: 'Emily Chen', avatar: '', position: 'UX Designer', stage: 'interview', rating: 4.4, source: 'Portfolio', appliedDate: '4 days ago', nextStep: 'Design Challenge', nextStepDate: 'Feb 9' },
  { id: '5', name: 'David Kim', avatar: '', position: 'Sales Representative', stage: 'screening', rating: 4.2, source: 'LinkedIn', appliedDate: '3 days ago', nextStep: 'Phone Screen', nextStepDate: 'Feb 7' },
  { id: '6', name: 'Sophie Laurent', avatar: '', position: 'Marketing Specialist', stage: 'interview', rating: 4.3, source: 'Company Site', appliedDate: '6 days ago', nextStep: 'Panel Interview', nextStepDate: 'Feb 10' },
  { id: '7', name: 'Carlos Rivera', avatar: '', position: 'Data Analyst', stage: 'assessment', rating: 4.1, source: 'Referral', appliedDate: '1 week ago', nextStep: 'SQL Assessment', nextStepDate: 'Feb 11' },
]

// Upcoming Interviews (expanded)
const upcomingInterviews = [
  { id: '1', candidate: 'James Wilson', position: 'DevOps Engineer', interviewer: 'Mike Chen', time: '10:00 AM', type: 'Technical', status: 'confirmed' },
  { id: '2', candidate: 'Emily Chen', position: 'UX Designer', interviewer: 'Lisa Park', time: '11:30 AM', type: 'Portfolio Review', status: 'confirmed' },
  { id: '3', candidate: 'Sarah Davis', position: 'Marketing Specialist', interviewer: 'John Smith', time: '2:00 PM', type: 'Culture Fit', status: 'pending' },
  { id: '4', candidate: 'Robert Brown', position: 'Sales Rep', interviewer: 'Anna Lee', time: '3:30 PM', type: 'Final Round', status: 'confirmed' },
  { id: '5', candidate: 'Michael Park', position: 'Data Analyst', interviewer: 'Tom Johnson', time: '4:00 PM', type: 'Case Study', status: 'rescheduled' },
  { id: '6', candidate: 'Sophie Laurent', position: 'Marketing Specialist', interviewer: 'Sarah Johnson', time: '4:30 PM', type: 'Panel Interview', status: 'confirmed' },
]

// Onboarding Employees (expanded)
const onboardingEmployees = [
  { id: '1', name: 'Jessica Brown', avatar: '', position: 'Frontend Developer', department: 'Engineering', startDate: 'Feb 1', progress: 75, manager: 'Mike Chen', tasks: { completed: 9, total: 12 } },
  { id: '2', name: 'Ryan Martinez', avatar: '', position: 'Product Designer', department: 'Design', startDate: 'Feb 3', progress: 60, manager: 'Lisa Park', tasks: { completed: 6, total: 10 } },
  { id: '3', name: 'Amanda Lee', avatar: '', position: 'Account Executive', department: 'Sales', startDate: 'Feb 5', progress: 45, manager: 'Tom Wilson', tasks: { completed: 5, total: 11 } },
  { id: '4', name: 'Chris Taylor', avatar: '', position: 'Marketing Coordinator', department: 'Marketing', startDate: 'Feb 5', progress: 40, manager: 'Sarah Johnson', tasks: { completed: 4, total: 10 } },
  { id: '5', name: 'Priya Sharma', avatar: '', position: 'Backend Developer', department: 'Engineering', startDate: 'Feb 7', progress: 25, manager: 'James Wu', tasks: { completed: 3, total: 12 } },
  { id: '6', name: 'Lucas Mendes', avatar: '', position: 'Financial Analyst', department: 'Finance', startDate: 'Feb 8', progress: 15, manager: 'Anna Kowalski', tasks: { completed: 2, total: 13 } },
]

// Hiring Trend Data
const hiringTrendData = [
  { month: 'Sep', applications: 320, hires: 8, offers: 12 },
  { month: 'Oct', applications: 280, hires: 6, offers: 10 },
  { month: 'Nov', applications: 420, hires: 10, offers: 14 },
  { month: 'Dec', applications: 180, hires: 4, offers: 6 },
  { month: 'Jan', applications: 480, hires: 12, offers: 16 },
  { month: 'Feb', applications: 156, hires: 4, offers: 6 },
]

// Source Distribution
const sourceDistribution = [
  { name: 'LinkedIn', value: 35, color: '#0A66C2' },
  { name: 'Indeed', value: 25, color: '#2164F3' },
  { name: 'Referrals', value: 20, color: '#22C55E' },
  { name: 'Company Site', value: 12, color: '#14B89A' },
  { name: 'Other', value: 8, color: '#94A3B8' },
]

// Employee Satisfaction (new data)
const satisfactionData = [
  { category: 'Work-Life Balance', score: 4.3, max: 5, color: '#8B5CF6' },
  { category: 'Career Growth', score: 3.9, max: 5, color: '#3B82F6' },
  { category: 'Compensation', score: 3.7, max: 5, color: '#22C55E' },
  { category: 'Team Culture', score: 4.5, max: 5, color: '#F59E0B' },
  { category: 'Management', score: 4.1, max: 5, color: '#EC4899' },
]

// Status badge variants
const jobStatusColors: Record<JobStatus, { bg: string; text: string; variant: 'error' | 'success' | 'warning' | 'default' }> = {
  urgent: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', variant: 'error' },
  active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', variant: 'success' },
  'on-hold': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', variant: 'warning' },
  filled: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', variant: 'default' },
}

const stageColors: Record<CandidateStage, { bg: string; border: string }> = {
  screening: { bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', border: 'border-l-purple-500' },
  interview: { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', border: 'border-l-amber-500' },
  assessment: { bg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', border: 'border-l-orange-500' },
  offer: { bg: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', border: 'border-l-green-500' },
}

const interviewStatusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/30',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30',
  rescheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30',
}

// Metric color mappings
const metricColorMap: Record<string, { iconBg: string; iconColor: string; valueBg: string; valueColor: string; sparkColor: string }> = {
  violet: {
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    iconColor: 'text-white',
    valueBg: 'from-violet-50/80 to-violet-100/40 dark:from-violet-950/30 dark:to-violet-900/10',
    valueColor: 'text-violet-700 dark:text-violet-300',
    sparkColor: '#8B5CF6',
  },
  emerald: {
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    iconColor: 'text-white',
    valueBg: 'from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/30 dark:to-emerald-900/10',
    valueColor: 'text-emerald-700 dark:text-emerald-300',
    sparkColor: '#10B981',
  },
  blue: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    valueBg: 'from-blue-50/80 to-blue-100/40 dark:from-blue-950/30 dark:to-blue-900/10',
    valueColor: 'text-blue-700 dark:text-blue-300',
    sparkColor: '#3B82F6',
  },
  amber: {
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    iconColor: 'text-white',
    valueBg: 'from-amber-50/80 to-amber-100/40 dark:from-amber-950/30 dark:to-amber-900/10',
    valueColor: 'text-amber-700 dark:text-amber-300',
    sparkColor: '#F59E0B',
  },
}

// ============================================================================
// HR DASHBOARD PAGE
// ============================================================================

export default function HRDashboardPage() {
  const [activeTab, setActiveTab] = React.useState('overview')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  // Jobs table columns
  const jobColumns: ColumnDef<Job>[] = [
    {
      id: 'title',
      header: 'Position',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{row.title}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.department} • {row.location}</p>
        </div>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      cell: ({ row }) => (
        <Badge variant="default" className="border border-violet-200/50 bg-violet-50 text-violet-700 dark:border-violet-800/30 dark:bg-violet-900/20 dark:text-violet-400">
          {row.type}
        </Badge>
      ),
    },
    {
      id: 'salary',
      header: 'Salary Range',
      accessorKey: 'salary',
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-[var(--text-primary)]">{row.salary}</span>
      ),
    },
    {
      id: 'applicants',
      header: 'Applicants',
      accessorKey: 'applicants',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10">
            <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-bold text-[var(--text-primary)]">{row.applicants}</span>
        </div>
      ),
    },
    {
      id: 'posted',
      header: 'Posted',
      accessorKey: 'posted',
      cell: ({ row }) => (
        <span className="text-sm text-[var(--text-muted)]">{row.posted}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = jobStatusColors[row.status]
        return (
          <Badge variant={status.variant} className="capitalize">
            {row.status === 'urgent' && <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-red-400" />}
            {row.status.replace('-', ' ')}
          </Badge>
        )
      },
    },
    {
      id: 'recruiter',
      header: 'Recruiter',
      accessorKey: 'recruiter',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar size="sm" fallback={row.recruiter.split(' ').map(n => n[0] ?? '').join('')} />
          <span className="text-sm text-[var(--text-secondary)]">{row.recruiter}</span>
        </div>
      ),
    },
  ]

  // Totals for pipeline
  const totalPipelineCount = pipelineStages.reduce((s, st) => s + st.count, 0)
  const totalDeptEmployees = departmentHeadcount.reduce((s, d) => s + d.current, 0)
  const totalDeptPlanned = departmentHeadcount.reduce((s, d) => s + d.planned, 0)

  return (
    <div className="space-y-6">
      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden sm:block sm:w-48" />
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            HR & Recruitment
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Manage hiring, onboarding, and employee lifecycle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Post Job
          </Button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TABS NAVIGATION */}
      {/* ================================================================ */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Open Positions</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>

        {/* ============================================================ */}
        {/* OVERVIEW TAB */}
        {/* ============================================================ */}
        <TabsContent value="overview" className="space-y-6 mt-6">

          {/* ====== HERO CARD ====== */}
          {isLoading ? (
            <Skeleton className="h-52 w-full rounded-xl" />
          ) : (
            <Card className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-violet-950/20 dark:via-slate-900 dark:to-purple-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_60%)]" />
              <Card.Content className="relative">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                        <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      </div>
                      <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">Total Headcount</p>
                      <Badge variant="success" size="sm" className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        +{heroData.changePercent}%
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                        {heroData.totalHeadcount}
                      </span>
                      <span className="text-lg text-[var(--text-muted)]">employees</span>
                    </div>
                    <p className="flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400">
                      <TrendingUp className="h-4 w-4" />
                      +{heroData.newHiresThisMonth} new hires this month
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>{heroData.openPositions} open positions</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span>Avg {heroData.avgTimeToHire} days to hire</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Stats */}
                  <div className="hidden lg:flex lg:flex-col lg:gap-0 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)]/60 divide-y divide-[var(--border-default)] min-w-[220px]">
                    {[
                      { label: 'Departments', value: '12', icon: <BarChart3 className="h-3.5 w-3.5 text-violet-500" />, trend: '+1' },
                      { label: 'Avg Tenure', value: '2.4y', icon: <Clock className="h-3.5 w-3.5 text-purple-500" />, trend: '+0.3' },
                      { label: 'Offer Rate', value: '68%', icon: <CheckCircle2 className="h-3.5 w-3.5 text-fuchsia-500" />, trend: '+5%' },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between gap-6 px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-subtle)]">
                            {stat.icon}
                          </div>
                          <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[var(--text-primary)]">{stat.value}</span>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">{stat.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-5 sm:gap-6 lg:gap-8">
                    {[
                      { label: 'Retention', value: 94, color: '#8B5CF6', trail: '#8B5CF620' },
                      { label: 'Satisfaction', value: 87, color: '#A855F7', trail: '#A855F720' },
                      { label: 'Growth', value: 78, color: '#D946EF', trail: '#D946EF20' },
                    ].map((ring) => {
                      const r = 28
                      const circ = 2 * Math.PI * r
                      const offset = circ - (ring.value / 100) * circ
                      return (
                        <div key={ring.label} className="flex flex-col items-center gap-1.5">
                          <div className="relative">
                            <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
                              <circle cx="36" cy="36" r={r} fill="none" stroke={ring.trail} strokeWidth="6" />
                              <circle
                                cx="36" cy="36" r={r} fill="none"
                                stroke={ring.color} strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={circ}
                                strokeDashoffset={offset}
                                style={{ filter: `drop-shadow(0 0 4px ${ring.color}60)` }}
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                              {ring.value}%
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-[var(--text-muted)]">{ring.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card.Content>
            </Card>
          )}

          {/* ====== KPI CARDS ====== */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-[150px] rounded-xl" />
                ))}
              </>
            ) : (
              <>
                {hrKPIs.map((kpi) => {
                  const Icon = kpi.icon
                  const isPositive = kpi.change > 0

                  return (
                    <Card key={kpi.id} className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${kpi.lightBg}`} />
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${kpi.topBar}`} />
                      <Card.Content className="relative">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-[var(--text-secondary)]">{kpi.label}</p>
                            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                              {kpi.value.toLocaleString()}
                            </p>
                            {kpi.change !== 0 && (
                              <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{kpi.change}%
                              </div>
                            )}
                            {kpi.change === 0 && (
                              <div className="mt-1 text-xs text-[var(--text-muted)]">No change</div>
                            )}
                          </div>
                          <div className={`rounded-lg p-2 ${kpi.iconBg}`}>
                            <Icon className={`h-5 w-5 ${kpi.iconColor}`} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <SparklineChart data={kpi.sparkline} type="area" color={kpi.sparkColor} width={140} height={32} gradient />
                        </div>
                      </Card.Content>
                    </Card>
                  )
                })}
              </>
            )}
          </div>

          {/* ====== HIRING PIPELINE (Premium Funnel) ====== */}
          {isLoading ? (
            <Skeleton className="h-48 rounded-xl" />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 dark:from-indigo-950/20 dark:to-fuchsia-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
              <Card.Header className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Hiring Pipeline</Card.Title>
                      <Card.Description className="mt-1">Active candidates by stage • {totalPipelineCount} total</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/30">
                    <Activity className="mr-1 h-3 w-3" />
                    Live
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {pipelineStages.map((stage, index) => {
                    const prevStage = pipelineStages[index - 1]
                    const conversionRate = prevStage
                      ? ((stage.count / prevStage.count) * 100).toFixed(0)
                      : null

                    return (
                      <React.Fragment key={stage.id}>
                        <div className="min-w-[130px] flex-1">
                          <div
                            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${stage.gradient} p-4 text-center text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105`}
                          >
                            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                            <p className="relative text-2xl font-bold">{stage.count}</p>
                            <p className="relative text-sm font-medium opacity-90">{stage.name}</p>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(stage.count / (pipelineStages[0]?.count ?? 1)) * 100}%`,
                                backgroundColor: stage.color,
                              }}
                            />
                          </div>
                        </div>
                        {index < pipelineStages.length - 1 && (
                          <div className="flex flex-col items-center gap-0.5 px-1">
                            <ChevronRight className="h-5 w-5 text-[var(--text-muted)]" />
                            {conversionRate && (
                              <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">{conversionRate}%</span>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>

                {/* Pipeline Summary Bar */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-50 via-violet-50 to-fuchsia-50 dark:from-indigo-900/15 dark:via-violet-900/15 dark:to-fuchsia-900/15 border border-indigo-200/50 dark:border-indigo-800/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
                        <BarChart3 className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Overall Conversion</span>
                    </div>
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400">
                      {((pipelineStages[pipelineStages.length - 1]?.count ?? 0) / (pipelineStages[0]?.count ?? 1) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full mt-2">
                    {pipelineStages.map((stage) => (
                      <div
                        key={stage.id}
                        className="transition-all duration-500"
                        style={{
                          width: `${(stage.count / totalPipelineCount) * 100}%`,
                          backgroundColor: stage.color,
                        }}
                        title={`${stage.name}: ${stage.count}`}
                      />
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          )}

          {/* ====== ROW: Recruitment Metrics + Hiring Trend ====== */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recruitment Metrics */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-950/20 dark:to-purple-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
              <Card.Header className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Recruitment Metrics</Card.Title>
                    <Card.Description className="mt-1">Key performance indicators</Card.Description>
                  </div>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                {isLoading ? (
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {recruitmentMetrics.map((metric) => {
                      const colors = metricColorMap[metric.color] ?? metricColorMap['violet']!
                      const MetricIcon = metric.icon

                      return (
                        <div
                          key={metric.label}
                          className={`group rounded-xl border border-[var(--border-default)] bg-gradient-to-br ${colors.valueBg} p-3.5 transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors.iconBg} shadow-sm`}>
                              <MetricIcon className={`h-3.5 w-3.5 ${colors.iconColor}`} />
                            </div>
                            <p className="text-xs font-medium text-[var(--text-muted)]">{metric.label}</p>
                          </div>
                          <p className={`text-xl font-bold ${colors.valueColor}`}>{metric.value}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <span className={`flex items-center gap-1 text-xs font-medium ${metric.isGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {metric.change > 0 ? '+' : ''}{metric.change}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)]">Bench: {metric.benchmark}</span>
                          </div>
                          <div className="mt-2">
                            <SparklineChart data={metric.sparkline} type="area" color={colors.sparkColor} width={120} height={28} gradient />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Hiring Trend */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-950/20 dark:to-indigo-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
              <Card.Header className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Hiring Trend</Card.Title>
                    <Card.Description className="mt-1">Applications, offers & hires over time</Card.Description>
                  </div>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                {isLoading ? (
                  <Skeleton className="h-64 rounded-lg" />
                ) : (
                  <>
                    {/* Quick stats row */}
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="rounded-lg border border-blue-200/50 bg-blue-50/50 p-2 text-center dark:border-blue-800/30 dark:bg-blue-950/20">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">1,836</p>
                        <p className="text-[10px] text-[var(--text-muted)]">Total Apps</p>
                      </div>
                      <div className="rounded-lg border border-amber-200/50 bg-amber-50/50 p-2 text-center dark:border-amber-800/30 dark:bg-amber-950/20">
                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400">64</p>
                        <p className="text-[10px] text-[var(--text-muted)]">Offers</p>
                      </div>
                      <div className="rounded-lg border border-emerald-200/50 bg-emerald-50/50 p-2 text-center dark:border-emerald-800/30 dark:bg-emerald-950/20">
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">44</p>
                        <p className="text-[10px] text-[var(--text-muted)]">Hires</p>
                      </div>
                    </div>
                    <ChartWrapper
                      type="bar"
                      data={hiringTrendData}
                      series={[
                        { dataKey: 'offers', name: 'Offers', color: '#F59E0B' },
                        { dataKey: 'hires', name: 'Hires', color: '#22C55E' },
                      ]}
                      xAxisKey="month"
                      height={320}
                      showGrid
                      showLegend
                    />
                  </>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* ====== ROW: Department Headcount + Source Distribution ====== */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Department Headcount */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-emerald-500/5 dark:from-teal-950/20 dark:to-emerald-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500" />
              <Card.Header className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm">
                      <Building2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Department Headcount</Card.Title>
                      <Card.Description className="mt-1">Current vs Planned staffing</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/30">
                    {totalDeptEmployees}/{totalDeptPlanned}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {departmentHeadcount.map((dept) => {
                      const fillPercent = Math.round((dept.current / dept.planned) * 100)
                      const needsHiring = dept.current < dept.planned
                      return (
                        <div key={dept.department} className="group rounded-lg border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-sm hover:scale-[1.01]">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{dept.icon}</span>
                              <span className="text-sm font-semibold text-[var(--text-primary)]">{dept.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold" style={{ color: dept.color }}>
                                {dept.current}
                              </span>
                              <span className="text-xs text-[var(--text-muted)]">/ {dept.planned}</span>
                              {needsHiring && (
                                <Badge variant="warning" size="sm" className="text-[10px]">
                                  +{dept.planned - dept.current}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${fillPercent}%`,
                                background: `linear-gradient(to right, ${dept.color}, ${dept.color}CC)`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}

                    {/* Overall Summary */}
                    <div className="rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-green-50 dark:from-teal-900/15 dark:via-emerald-900/15 dark:to-green-900/15 border border-teal-200/50 dark:border-teal-800/30 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Staffing Level</span>
                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                          {Math.round((totalDeptEmployees / totalDeptPlanned) * 100)}%
                        </span>
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">
                        {totalDeptPlanned - totalDeptEmployees} positions to fill across all departments
                      </div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Source Distribution + Employee Satisfaction */}
            <div className="space-y-6">
              {/* Application Sources */}
              <Card className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 dark:from-cyan-950/20 dark:to-blue-950/20" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
                <Card.Header className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-sm">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Application Sources</Card.Title>
                      <Card.Description className="mt-1">Where candidates come from</Card.Description>
                    </div>
                  </div>
                </Card.Header>
                <Card.Content className="relative">
                  {isLoading ? (
                    <Skeleton className="mx-auto h-48 w-48 rounded-full" />
                  ) : (
                    <ChartWrapper
                      type="donut"
                      data={sourceDistribution}
                      series={[{ dataKey: 'value', name: 'Applications' }]}
                      height={200}
                      showLegend
                    />
                  )}
                </Card.Content>
              </Card>

              {/* Employee Satisfaction */}
              <Card className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 dark:from-pink-950/20 dark:to-rose-950/20" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500" />
                <Card.Header className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 shadow-sm">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Employee Satisfaction</Card.Title>
                      <Card.Description className="mt-1">Latest pulse survey results</Card.Description>
                    </div>
                  </div>
                </Card.Header>
                <Card.Content className="relative">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-8 rounded-lg" />)}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {satisfactionData.map((item) => (
                        <div key={item.category} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{item.category}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}</span>
                              <span className="text-xs text-[var(--text-muted)]">/ {item.max}</span>
                            </div>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(item.score / item.max) * 100}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-center gap-2 pt-2 border-t border-[var(--border-default)]">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          Overall: {(satisfactionData.reduce((s, i) => s + i.score, 0) / satisfactionData.length).toFixed(1)}/5
                        </span>
                        <Badge variant="success" size="sm">Above benchmark</Badge>
                      </div>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* ====== ROW: Top Candidates + Upcoming Interviews ====== */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Candidates */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
              <Card.Header className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Top Candidates</Card.Title>
                      <Card.Description className="mt-1">Highest-rated applicants in pipeline</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/30">
                    {topCandidates.length} candidates
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {topCandidates.map((candidate, idx) => {
                      const stageConfig = stageColors[candidate.stage]
                      return (
                        <div
                          key={candidate.id}
                          className={`group flex items-center justify-between rounded-xl border border-[var(--border-default)] border-l-4 ${stageConfig.border} p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar size="sm" fallback={candidate.name.split(' ').map(n => n[0] ?? '').join('')} />
                              {idx === 0 && (
                                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                                  <Star className="h-2.5 w-2.5 text-white fill-current" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">{candidate.name}</p>
                              <p className="text-xs text-[var(--text-muted)]">{candidate.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                              <p className="text-xs text-[var(--text-muted)]">{candidate.nextStepDate}</p>
                              <p className="text-[10px] text-[var(--text-muted)]">{candidate.nextStep}</p>
                            </div>
                            <Badge className={stageConfig.bg} size="sm">
                              {candidate.stage}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span className="font-bold">{candidate.rating}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-950/20 dark:to-cyan-950/20" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
              <Card.Header className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-sm">
                      <Video className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Today&apos;s Interviews</Card.Title>
                      <Card.Description className="mt-1">Scheduled for today</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30">
                    {upcomingInterviews.length} scheduled
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content className="relative">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {upcomingInterviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="group flex items-center justify-between rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{interview.time.split(' ')[0]}</span>
                            <span className="text-[9px] text-blue-500 dark:text-blue-400">{interview.time.split(' ')[1]}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{interview.candidate}</p>
                            <p className="text-xs text-[var(--text-muted)]">{interview.position} • {interview.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="hidden sm:block text-right">
                            <p className="text-xs text-[var(--text-muted)]">{interview.interviewer}</p>
                          </div>
                          <Badge className={`text-xs ${interviewStatusColors[interview.status] ?? ''}`} size="sm">
                            {interview.status}
                          </Badge>
                        </div>
                      </div>
                    ))}

                    {/* Interview Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                      <div className="rounded-lg border border-green-200/50 bg-green-50/50 p-2 text-center dark:border-green-800/30 dark:bg-green-950/20">
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {upcomingInterviews.filter(i => i.status === 'confirmed').length}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">Confirmed</p>
                      </div>
                      <div className="rounded-lg border border-amber-200/50 bg-amber-50/50 p-2 text-center dark:border-amber-800/30 dark:bg-amber-950/20">
                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {upcomingInterviews.filter(i => i.status === 'pending').length}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">Pending</p>
                      </div>
                      <div className="rounded-lg border border-blue-200/50 bg-blue-50/50 p-2 text-center dark:border-blue-800/30 dark:bg-blue-950/20">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {upcomingInterviews.filter(i => i.status === 'rescheduled').length}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">Rescheduled</p>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/* POSITIONS TAB */}
        {/* ============================================================ */}
        <TabsContent value="positions" className="space-y-6 mt-6">
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-950/20 dark:to-indigo-950/20" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
            <Card.Header className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Open Positions</Card.Title>
                    <Card.Description className="mt-1">All active job openings</Card.Description>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="error" size="sm">
                    {openPositions.filter(j => j.status === 'urgent').length} urgent
                  </Badge>
                  <Badge variant="default" size="sm" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {openPositions.length} total
                  </Badge>
                </div>
              </div>
            </Card.Header>
            <Card.Content className="relative">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
                </div>
              ) : (
                <DataTable
                  data={openPositions}
                  columns={jobColumns}
                  sortable
                  filterable
                  filterPlaceholder="Search positions..."
                  pagination
                  pageSize={6}
                  hoverable
                />
              )}
            </Card.Content>
          </Card>
        </TabsContent>

        {/* ============================================================ */}
        {/* CANDIDATES TAB */}
        {/* ============================================================ */}
        <TabsContent value="candidates" className="space-y-6 mt-6">
          {/* Pipeline Summary Mini Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['screening', 'interview', 'assessment', 'offer'] as CandidateStage[]).map((stage) => {
              const count = topCandidates.filter(c => c.stage === stage).length
              const config = stageColors[stage]
              return (
                <div key={stage} className={`rounded-xl border border-[var(--border-default)] p-3 text-center ${config.bg} transition-all hover:shadow-sm hover:scale-[1.02]`}>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs font-medium capitalize">{stage}</p>
                </div>
              )
            })}
          </div>

          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-950/20 dark:to-purple-950/20" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
            <Card.Header className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>All Candidates</Card.Title>
                    <Card.Description className="mt-1">Candidates in the hiring pipeline</Card.Description>
                  </div>
                </div>
                <Badge variant="default" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/30">
                  {topCandidates.length} in pipeline
                </Badge>
              </div>
            </Card.Header>
            <Card.Content className="relative">
              {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {topCandidates.map((candidate) => {
                    const stageConfig = stageColors[candidate.stage]
                    return (
                      <div
                        key={candidate.id}
                        className={`group relative overflow-hidden rounded-xl border border-[var(--border-default)] border-l-4 ${stageConfig.border} p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar size="md" fallback={candidate.name.split(' ').map(n => n[0] ?? '').join('')} className="ring-2 ring-violet-100 dark:ring-violet-900/30" />
                              <div>
                                <p className="font-semibold text-[var(--text-primary)]">{candidate.name}</p>
                                <p className="text-sm text-[var(--text-muted)]">{candidate.position}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-bold">{candidate.rating}</span>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--text-muted)]">Stage</span>
                              <Badge className={stageConfig.bg} size="sm">{candidate.stage}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--text-muted)]">Source</span>
                              <span className="font-medium text-[var(--text-primary)]">{candidate.source}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--text-muted)]">Next Step</span>
                              <span className="font-medium text-[var(--text-primary)]">{candidate.nextStep}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--text-muted)]">Date</span>
                              <span className="font-bold text-violet-600 dark:text-violet-400">{candidate.nextStepDate}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" leftIcon={<Eye className="h-3 w-3" />}>
                              View
                            </Button>
                            <Button variant="primary" size="sm" className="flex-1" leftIcon={<Send className="h-3 w-3" />}>
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card.Content>
          </Card>
        </TabsContent>

        {/* ============================================================ */}
        {/* ONBOARDING TAB */}
        {/* ============================================================ */}
        <TabsContent value="onboarding" className="space-y-6 mt-6">
          {/* Onboarding Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-950/30 dark:to-purple-900/10 dark:border-purple-800/30 p-3 text-center transition-all hover:shadow-sm hover:scale-[1.02]">
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{onboardingEmployees.length}</p>
              <p className="text-xs text-[var(--text-muted)]">Currently Onboarding</p>
            </div>
            <div className="rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/30 dark:to-emerald-900/10 dark:border-emerald-800/30 p-3 text-center transition-all hover:shadow-sm hover:scale-[1.02]">
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {Math.round(onboardingEmployees.reduce((s, e) => s + e.progress, 0) / onboardingEmployees.length)}%
              </p>
              <p className="text-xs text-[var(--text-muted)]">Avg Progress</p>
            </div>
            <div className="rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/30 dark:to-blue-900/10 dark:border-blue-800/30 p-3 text-center transition-all hover:shadow-sm hover:scale-[1.02]">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {onboardingEmployees.reduce((s, e) => s + e.tasks.completed, 0)}
              </p>
              <p className="text-xs text-[var(--text-muted)]">Tasks Done</p>
            </div>
            <div className="rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/30 dark:to-amber-900/10 dark:border-amber-800/30 p-3 text-center transition-all hover:shadow-sm hover:scale-[1.02]">
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {onboardingEmployees.reduce((s, e) => s + e.tasks.total - e.tasks.completed, 0)}
              </p>
              <p className="text-xs text-[var(--text-muted)]">Tasks Remaining</p>
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5 dark:from-purple-950/20 dark:to-fuchsia-950/20" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />
            <Card.Header className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-sm">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>New Hire Onboarding</Card.Title>
                    <Card.Description className="mt-1">Track onboarding progress for new employees</Card.Description>
                  </div>
                </div>
                <Badge variant="default" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/30">
                  {onboardingEmployees.length} new hires
                </Badge>
              </div>
            </Card.Header>
            <Card.Content className="relative">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {onboardingEmployees.map((employee) => {
                    const progressColor = employee.progress >= 75
                      ? 'from-emerald-500 to-green-500'
                      : employee.progress >= 50
                        ? 'from-amber-500 to-orange-500'
                        : employee.progress >= 25
                          ? 'from-blue-500 to-indigo-500'
                          : 'from-purple-500 to-fuchsia-500'

                    const progressBg = employee.progress >= 75
                      ? 'bg-emerald-100 dark:bg-emerald-900/20'
                      : employee.progress >= 50
                        ? 'bg-amber-100 dark:bg-amber-900/20'
                        : 'bg-blue-100 dark:bg-blue-900/20'

                    return (
                      <div
                        key={employee.id}
                        className="group rounded-xl border border-[var(--border-default)] p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-purple-200 dark:hover:border-purple-800"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar
                              size="md"
                              fallback={employee.name.split(' ').map(n => n[0] ?? '').join('')}
                              className="ring-2 ring-purple-100 dark:ring-purple-900/30"
                            />
                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">{employee.name}</p>
                              <p className="text-sm text-[var(--text-muted)]">
                                {employee.position} • {employee.department}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-[var(--text-muted)]">Started {employee.startDate}</p>
                            <p className="text-xs text-[var(--text-muted)]">Manager: {employee.manager}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-xs text-[var(--text-muted)]">
                              Tasks: {employee.tasks.completed}/{employee.tasks.total}
                            </span>
                            <span className="text-sm font-bold text-[var(--text-primary)]">{employee.progress}%</span>
                          </div>
                          <div className={`h-2.5 overflow-hidden rounded-full ${progressBg}`}>
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${progressColor} transition-all duration-700`}
                              style={{ width: `${employee.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm" leftIcon={<FileText className="h-3 w-3" />}>
                            View Tasks
                          </Button>
                          <Button variant="outline" size="sm" leftIcon={<MessageSquare className="h-3 w-3" />}>
                            Check-in
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card.Content>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
