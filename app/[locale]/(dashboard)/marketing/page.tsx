'use client'

import * as React from 'react'
import {
  Megaphone,
  Eye,
  BarChart3,
  MousePointer,
  Percent,
  Target,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Play,
  Image,
  Video,
  FileText,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Download,
  Plus,
  Zap,
  DollarSign,
  Users,
  ExternalLink,
  ArrowUpRight,
  Star,
  Crown,
  Rocket,
  Activity,
  Globe,
  Mail,
  MousePointerClick,
  PieChart,
  MailOpen,
  UserPlus,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { CountdownTimer } from '@core/patterns/CountdownTimer'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { MiniCalendar, type CalendarEvent } from '@core/patterns/MiniCalendar'

// ============================================================================
// MOCK DATA - Marketing & Social Media
// ============================================================================

// Hero Campaign
const heroCampaign = {
  name: 'Summer Sale 2026',
  status: 'live' as const,
  impressions: '2.4M',
  clicks: '124K',
  conversions: '3,847',
  revenue: '$48,350',
  budgetTotal: 5000,
  budgetSpent: 3350,
  startDate: new Date('2026-02-01'),
  endDate: new Date('2026-02-28'),
  sparkline: [18, 22, 25, 28, 32, 35, 38, 42, 40, 45, 48, 52, 50, 55, 58, 62, 60, 65, 68, 72, 70, 75, 78, 82, 80, 85, 88, 92],
}

// KPIs Marketing
const marketingKPIs = [
  {
    id: 'reach',
    label: 'Total Reach',
    value: '2.4M',
    change: 12.3,
    icon: Eye,
    color: 'from-pink-500 to-rose-500',
    bgLight: 'from-pink-50 to-rose-50',
    bgDark: 'dark:from-pink-950/20 dark:to-rose-950/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    sparkline: [18, 22, 19, 25, 28, 24, 30, 27, 32, 35, 33, 38],
    sparkColor: '#EC4899',
  },
  {
    id: 'impressions',
    label: 'Impressions',
    value: '5.8M',
    change: 8.7,
    icon: BarChart3,
    color: 'from-purple-500 to-violet-500',
    bgLight: 'from-purple-50 to-violet-50',
    bgDark: 'dark:from-purple-950/20 dark:to-violet-950/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    sparkline: [45, 52, 48, 55, 60, 58, 62, 65, 63, 70, 68, 75],
    sparkColor: '#8B5CF6',
  },
  {
    id: 'clicks',
    label: 'Clicks',
    value: '124K',
    change: 15.2,
    icon: MousePointerClick,
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'from-blue-50 to-cyan-50',
    bgDark: 'dark:from-blue-950/20 dark:to-cyan-950/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    sparkline: [8, 10, 9, 12, 14, 13, 16, 15, 18, 17, 20, 22],
    sparkColor: '#3B82F6',
  },
  {
    id: 'ctr',
    label: 'CTR',
    value: '2.14%',
    change: 3.4,
    icon: Percent,
    color: 'from-amber-500 to-orange-500',
    bgLight: 'from-amber-50 to-orange-50',
    bgDark: 'dark:from-amber-950/20 dark:to-orange-950/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    sparkline: [1.8, 1.9, 1.95, 2.0, 2.1, 2.05, 2.1, 2.15, 2.2, 2.1, 2.14, 2.18],
    sparkColor: '#F59E0B',
  },
  {
    id: 'conversions',
    label: 'Conversions',
    value: '3,847',
    change: 22.1,
    icon: Target,
    color: 'from-emerald-500 to-green-500',
    bgLight: 'from-emerald-50 to-green-50',
    bgDark: 'dark:from-emerald-950/20 dark:to-green-950/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    sparkline: [250, 280, 290, 320, 310, 350, 380, 360, 400, 420, 410, 450],
    sparkColor: '#10B981',
  },
]

// Social Media Stats
const socialMediaStats = [
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
    lightBg: 'from-pink-50 to-purple-50',
    darkBg: 'dark:from-pink-950/20 dark:to-purple-950/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    borderColor: 'border-pink-200/50 dark:border-pink-800/30',
    followers: '45.2K',
    followersGrowth: '+2.3K',
    engagementRate: '4.8%',
    postsThisWeek: 12,
    topPostLikes: '12.4K',
    topPostComments: '342',
    reachRate: '18.2%',
    chartData: [40, 42, 41, 43, 44, 43, 45, 45.2],
    chartColor: '#EC4899',
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    icon: Facebook,
    color: 'from-blue-500 to-blue-700',
    lightBg: 'from-blue-50 to-indigo-50',
    darkBg: 'dark:from-blue-950/20 dark:to-indigo-950/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200/50 dark:border-blue-800/30',
    followers: '128K',
    followersGrowth: '+4.1K',
    engagementRate: '2.1%',
    postsThisWeek: 8,
    reach: '340K',
    pageViews: '12.8K',
    reachRate: '12.4%',
    chartData: [115, 118, 120, 122, 124, 125, 127, 128],
    chartColor: '#3B82F6',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: Linkedin,
    color: 'from-blue-600 to-blue-800',
    lightBg: 'from-sky-50 to-blue-50',
    darkBg: 'dark:from-sky-950/20 dark:to-blue-950/20',
    textColor: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-200/50 dark:border-sky-800/30',
    followers: '23K',
    followersGrowth: '+1.8K',
    engagementRate: '3.4%',
    postsThisWeek: 5,
    impressions: '89K',
    profileViews: '4.2K',
    reachRate: '22.1%',
    chartData: [18, 19, 20, 20.5, 21, 21.5, 22, 23],
    chartColor: '#0EA5E9',
  },
]

// Campaign Performance Data
const campaignPerformanceData = [
  { name: 'Summer Sale', spend: 3350, revenue: 18420, roi: 450 },
  { name: 'Product Launch', spend: 2800, revenue: 12600, roi: 350 },
  { name: 'Brand Awareness', spend: 1500, revenue: 4200, roi: 180 },
  { name: 'Retargeting', spend: 980, revenue: 5880, roi: 500 },
  { name: 'Email Blast', spend: 450, revenue: 2250, roi: 400 },
]

// Channel ROI Data
const channelROIData = [
  { channel: 'Google Ads', roi: 340, spend: 2400, revenue: 8160, color: '#22C55E', icon: Globe },
  { channel: 'Facebook Ads', roi: 280, spend: 1800, revenue: 5040, color: '#3B82F6', icon: Facebook },
  { channel: 'Instagram', roi: 220, spend: 1200, revenue: 2640, color: '#EC4899', icon: Instagram },
  { channel: 'Email', roi: 680, spend: 320, revenue: 2176, color: '#F59E0B', icon: Mail },
  { channel: 'LinkedIn', roi: 190, spend: 900, revenue: 1710, color: '#0EA5E9', icon: Linkedin },
]

// Audience Demographics
const audienceData = [
  { age: '18-24', percentage: 22, gender: { male: 45, female: 55 }, color: '#EC4899' },
  { age: '25-34', percentage: 35, gender: { male: 48, female: 52 }, color: '#8B5CF6' },
  { age: '35-44', percentage: 24, gender: { male: 52, female: 48 }, color: '#3B82F6' },
  { age: '45-54', percentage: 12, gender: { male: 50, female: 50 }, color: '#F59E0B' },
  { age: '55+', percentage: 7, gender: { male: 55, female: 45 }, color: '#10B981' },
]

// Email Marketing Stats
const emailStats = {
  sent: 45200,
  delivered: 44100,
  opened: 18040,
  clicked: 5412,
  openRate: 40.9,
  clickRate: 12.3,
  unsubscribed: 23,
  bounced: 1100,
  sparkline: [35, 38, 36, 40, 42, 39, 41, 43, 40, 42, 44, 41],
}

// Content Calendar Events
const today = new Date()
const calendarEvents: CalendarEvent[] = [
  { date: new Date(today.getFullYear(), today.getMonth(), 5), label: 'Instagram Post', color: '#E1306C' },
  { date: new Date(today.getFullYear(), today.getMonth(), 8), label: 'Facebook Ad', color: '#1877F2' },
  { date: new Date(today.getFullYear(), today.getMonth(), 10), label: 'Blog Post', color: '#14B89A' },
  { date: new Date(today.getFullYear(), today.getMonth(), 12), label: 'Instagram Story', color: '#E1306C' },
  { date: new Date(today.getFullYear(), today.getMonth(), 15), label: 'LinkedIn Post', color: '#0A66C2' },
  { date: new Date(today.getFullYear(), today.getMonth(), 18), label: 'Email Campaign', color: '#F59E0B' },
  { date: new Date(today.getFullYear(), today.getMonth(), 20), label: 'Instagram Reel', color: '#E1306C' },
  { date: new Date(today.getFullYear(), today.getMonth(), 22), label: 'Facebook Live', color: '#1877F2' },
  { date: new Date(today.getFullYear(), today.getMonth(), 25), label: 'Newsletter', color: '#F59E0B' },
]

// Upcoming Posts
const upcomingPosts = [
  { id: '1', type: 'image' as const, platform: 'instagram', title: 'Summer Collection Reveal', scheduledFor: 'Feb 8, 10:00 AM', engagement: 'High' },
  { id: '2', type: 'video' as const, platform: 'facebook', title: 'Behind the Scenes', scheduledFor: 'Feb 9, 2:00 PM', engagement: 'Medium' },
  { id: '3', type: 'carousel' as const, platform: 'instagram', title: 'Product Features', scheduledFor: 'Feb 10, 11:00 AM', engagement: 'High' },
  { id: '4', type: 'article' as const, platform: 'linkedin', title: 'Industry Insights Report', scheduledFor: 'Feb 11, 9:00 AM', engagement: 'Medium' },
  { id: '5', type: 'image' as const, platform: 'instagram', title: 'Customer Testimonial', scheduledFor: 'Feb 12, 3:00 PM', engagement: 'High' },
]

// Top Performing Content
const topContent = [
  {
    id: '1',
    platform: 'instagram',
    platformIcon: Instagram,
    platformColor: 'text-pink-500',
    platformBg: 'bg-pink-50 dark:bg-pink-900/20',
    caption: 'Summer vibes are here! Check out our new collection...',
    likes: 12400,
    comments: 342,
    shares: 89,
    postedAt: '2 days ago',
    rank: 1,
  },
  {
    id: '2',
    platform: 'facebook',
    platformIcon: Facebook,
    platformColor: 'text-blue-600',
    platformBg: 'bg-blue-50 dark:bg-blue-900/20',
    caption: 'Flash sale starts now! 50% off selected items...',
    likes: 8200,
    comments: 156,
    shares: 234,
    postedAt: '3 days ago',
    rank: 2,
  },
  {
    id: '3',
    platform: 'linkedin',
    platformIcon: Linkedin,
    platformColor: 'text-sky-600',
    platformBg: 'bg-sky-50 dark:bg-sky-900/20',
    caption: "We're excited to announce our partnership with...",
    likes: 3400,
    comments: 89,
    shares: 156,
    postedAt: '5 days ago',
    rank: 3,
  },
  {
    id: '4',
    platform: 'instagram',
    platformIcon: Instagram,
    platformColor: 'text-pink-500',
    platformBg: 'bg-pink-50 dark:bg-pink-900/20',
    caption: 'Behind the scenes of our photo shoot...',
    likes: 9800,
    comments: 278,
    shares: 67,
    postedAt: '4 days ago',
    rank: 4,
  },
  {
    id: '5',
    platform: 'facebook',
    platformIcon: Facebook,
    platformColor: 'text-blue-600',
    platformBg: 'bg-blue-50 dark:bg-blue-900/20',
    caption: 'Customer spotlight: How TechFlow grew 300% using our platform...',
    likes: 6700,
    comments: 198,
    shares: 312,
    postedAt: '6 days ago',
    rank: 5,
  },
  {
    id: '6',
    platform: 'linkedin',
    platformIcon: Linkedin,
    platformColor: 'text-sky-600',
    platformBg: 'bg-sky-50 dark:bg-sky-900/20',
    caption: 'Industry report: Top 10 marketing trends for 2026...',
    likes: 5100,
    comments: 134,
    shares: 287,
    postedAt: '1 week ago',
    rank: 6,
  },
]

// Campaigns Table Data
type Campaign = {
  id: string
  name: string
  platform: string
  status: 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  roi: number
  sparkline: number[]
}

const campaignsData: Campaign[] = [
  { id: '1', name: 'Summer Sale 2026', platform: 'Multi-channel', status: 'active', budget: 5000, spent: 3350, impressions: 2400000, clicks: 124000, ctr: 5.17, conversions: 3847, roi: 450, sparkline: [20, 25, 22, 28, 30, 35, 32, 38] },
  { id: '2', name: 'Spring Collection', platform: 'Instagram', status: 'active', budget: 2500, spent: 1800, impressions: 890000, clicks: 45000, ctr: 5.06, conversions: 1234, roi: 320, sparkline: [15, 18, 20, 19, 22, 25, 23, 28] },
  { id: '3', name: 'Brand Awareness Q1', platform: 'Facebook', status: 'active', budget: 3000, spent: 2100, impressions: 1500000, clicks: 32000, ctr: 2.13, conversions: 567, roi: 180, sparkline: [30, 35, 32, 38, 40, 42, 45, 48] },
  { id: '4', name: 'B2B Leads Gen', platform: 'LinkedIn', status: 'paused', budget: 4000, spent: 2800, impressions: 450000, clicks: 18000, ctr: 4.0, conversions: 289, roi: 220, sparkline: [10, 12, 15, 14, 16, 15, 14, 13] },
  { id: '5', name: 'Holiday Promo 2025', platform: 'Multi-channel', status: 'completed', budget: 8000, spent: 8000, impressions: 5200000, clicks: 280000, ctr: 5.38, conversions: 8542, roi: 520, sparkline: [50, 60, 70, 80, 85, 82, 78, 75] },
  { id: '6', name: 'Email Re-engagement', platform: 'Email', status: 'active', budget: 500, spent: 320, impressions: 85000, clicks: 12000, ctr: 14.12, conversions: 890, roi: 680, sparkline: [5, 8, 10, 12, 15, 18, 20, 22] },
  { id: '7', name: 'Product Launch Video', platform: 'YouTube', status: 'active', budget: 3500, spent: 1200, impressions: 320000, clicks: 28000, ctr: 8.75, conversions: 456, roi: 280, sparkline: [8, 12, 18, 25, 30, 28, 32, 35] },
  { id: '8', name: 'Local SEO Campaign', platform: 'Google', status: 'active', budget: 1500, spent: 890, impressions: 180000, clicks: 22000, ctr: 12.22, conversions: 678, roi: 380, sparkline: [12, 14, 16, 18, 20, 22, 24, 26] },
]

// Platform badge colors
const platformColors: Record<string, string> = {
  'Multi-channel': 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
  Instagram: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
  Facebook: 'bg-blue-600 text-white',
  LinkedIn: 'bg-sky-700 text-white',
  Email: 'bg-amber-500 text-white',
  YouTube: 'bg-red-600 text-white',
  Google: 'bg-green-500 text-white',
}

// Status badge variants
const statusVariants: Record<string, 'success' | 'warning' | 'default'> = {
  active: 'success',
  paused: 'warning',
  completed: 'default',
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// ============================================================================
// MARKETING DASHBOARD PAGE
// ============================================================================

export default function MarketingDashboardPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Table columns
  const columns: ColumnDef<Campaign>[] = [
    {
      id: 'name',
      header: 'Campaign',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <Megaphone className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <p className="font-medium text-[var(--text-primary)]">{row.name}</p>
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[row.platform] ?? 'bg-secondary-200 text-secondary-700'}`}>
              {row.platform}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge variant={statusVariants[row.status] ?? 'default'} className="capitalize">
          {row.status === 'active' && <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />}
          {row.status}
        </Badge>
      ),
    },
    {
      id: 'budget',
      header: 'Budget',
      accessorKey: 'budget',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-[var(--text-primary)]">{formatCurrency(row.spent)}</p>
          <p className="text-xs text-[var(--text-muted)]">of {formatCurrency(row.budget)}</p>
        </div>
      ),
    },
    {
      id: 'impressions',
      header: 'Impressions',
      accessorKey: 'impressions',
      cell: ({ row }) => <span className="font-medium text-[var(--text-primary)]">{formatNumber(row.impressions)}</span>,
    },
    {
      id: 'ctr',
      header: 'CTR',
      accessorKey: 'ctr',
      cell: ({ row }) => <span className="font-medium text-[var(--text-primary)]">{row.ctr.toFixed(2)}%</span>,
    },
    {
      id: 'conversions',
      header: 'Conv.',
      accessorKey: 'conversions',
      cell: ({ row }) => <span className="font-medium text-[var(--text-primary)]">{formatNumber(row.conversions)}</span>,
    },
    {
      id: 'roi',
      header: 'ROI',
      accessorKey: 'roi',
      cell: ({ row }) => (
        <span className={`font-bold ${row.roi > 300 ? 'text-green-600 dark:text-green-400' : row.roi > 200 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'}`}>
          {row.roi}%
        </span>
      ),
    },
    {
      id: 'trend',
      header: 'Trend',
      accessorKey: 'sparkline',
      cell: ({ row }) => (
        <SparklineChart
          data={row.sparkline}
          type="area"
          color={row.status === 'active' ? '#EC4899' : '#94A3B8'}
          width={80}
          height={30}
          showDot
          gradient
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden sm:block sm:w-48" />
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-pink-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Marketing Hub
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Track campaigns, social media performance, and ROI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Campaign
          </Button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* HERO CAMPAIGN CARD */}
      {/* ================================================================ */}
      {isLoading ? (
        <Skeleton className="h-56 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-0">
          {/* Background overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.3),transparent_50%)]" />

          <div className="relative p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Campaign Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm">
                    <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    Live Campaign
                  </Badge>
                  <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm">
                    <Crown className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                </div>

                <h2 className="text-3xl font-bold text-white md:text-4xl">{heroCampaign.name}</h2>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-white/70">Impressions</p>
                    <p className="text-xl font-bold text-white">{heroCampaign.impressions}</p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-white/70">Clicks</p>
                    <p className="text-xl font-bold text-white">{heroCampaign.clicks}</p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-white/70">Conversions</p>
                    <p className="text-xl font-bold text-white">{heroCampaign.conversions}</p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs text-white/70">Revenue</p>
                    <p className="text-xl font-bold text-white">{heroCampaign.revenue}</p>
                  </div>
                </div>

                {/* Performance Bars */}
                <div className="mt-4 space-y-2.5 max-w-sm">
                  {[
                    { label: 'CTR', value: 5.17, max: 10, suffix: '%', color: 'from-white/90 to-white/60' },
                    { label: 'Conv. Rate', value: 3.1, max: 8, suffix: '%', color: 'from-white/80 to-white/50' },
                    { label: 'ROI', value: 450, max: 600, suffix: '%', color: 'from-white/70 to-white/40' },
                  ].map((bar) => (
                    <div key={bar.label} className="flex items-center gap-3">
                      <span className="w-20 text-xs font-medium text-white/70 text-right shrink-0">{bar.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                          style={{ width: `${Math.min((bar.value / bar.max) * 100, 100)}%`, boxShadow: '0 0 8px rgba(255,255,255,0.3)' }}
                        />
                      </div>
                      <span className="w-12 text-xs font-bold text-white shrink-0">{bar.value}{bar.suffix}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Countdown & Budget */}
              <div className="flex flex-col gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm lg:min-w-[320px]">
                <div>
                  <p className="mb-2 text-sm font-medium text-white/70">Campaign Ends In</p>
                  <CountdownTimer
                    targetDate={heroCampaign.endDate}
                    variant="default"
                    size="lg"
                    showLabels
                    showDays
                    className="[&_.uppercase]:text-white/70"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-white/70">Budget Used</p>
                    <p className="font-bold text-white">
                      {Math.round((heroCampaign.budgetSpent / heroCampaign.budgetTotal) * 100)}%
                    </p>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-white to-white/80 transition-all duration-500"
                      style={{ width: `${(heroCampaign.budgetSpent / heroCampaign.budgetTotal) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-white/70">
                    ${heroCampaign.budgetSpent.toLocaleString()} of ${heroCampaign.budgetTotal.toLocaleString()}
                  </p>
                </div>

                <Button className="mt-2 border-0 bg-white text-purple-600 hover:bg-white/90 shadow-lg shadow-purple-900/20">
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ================================================================ */}
      {/* ROW 1 - KPIs (5 Cards Horizontal) */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[160px] rounded-xl" />
          ))
        ) : (
          marketingKPIs.map((kpi) => {
            const Icon = kpi.icon
            const isPositive = kpi.change > 0

            return (
              <Card key={kpi.id} className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${kpi.bgLight} ${kpi.bgDark}`} />
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${kpi.color}`} />
                <Card.Content className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${kpi.color} shadow-sm`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(kpi.change)}%
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{kpi.label}</p>
                  </div>
                  <div className="mt-3">
                    <SparklineChart
                      data={kpi.sparkline}
                      type="area"
                      color={kpi.sparkColor}
                      width={120}
                      height={32}
                      showDot
                      gradient
                      animated
                    />
                  </div>
                </Card.Content>
              </Card>
            )
          })
        )}
      </div>

      {/* ================================================================ */}
      {/* ROW 2 - SOCIAL MEDIA GRID (3 Cards) */}
      {/* ================================================================ */}
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[320px] rounded-xl" />
          ))
        ) : (
          socialMediaStats.map((social) => {
            const Icon = social.icon

            return (
              <Card key={social.id} className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${social.lightBg} ${social.darkBg}`} />
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${social.color}`} />

                <Card.Content className="relative space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${social.color} shadow-md`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{social.platform}</h3>
                        <p className={`text-xs font-medium ${social.textColor}`}>
                          <TrendingUp className="mr-1 inline h-3 w-3" />
                          {social.followersGrowth} this month
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" size="sm" className={`${social.textColor} border ${social.borderColor}`}>
                      {social.postsThisWeek} posts/wk
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[var(--bg-subtle)] p-3 transition-all hover:shadow-sm">
                      <p className="text-xs text-[var(--text-muted)]">Followers</p>
                      <p className="text-xl font-bold text-[var(--text-primary)]">{social.followers}</p>
                    </div>
                    <div className="rounded-xl bg-[var(--bg-subtle)] p-3 transition-all hover:shadow-sm">
                      <p className="text-xs text-[var(--text-muted)]">Engagement</p>
                      <p className="text-xl font-bold text-[var(--text-primary)]">{social.engagementRate}</p>
                    </div>
                  </div>

                  {/* Follower Growth Chart */}
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Follower Growth</p>
                      <span className={`text-xs font-medium ${social.textColor}`}>{social.reachRate} reach</span>
                    </div>
                    <SparklineChart
                      data={social.chartData}
                      type="area"
                      color={social.chartColor}
                      width={220}
                      height={48}
                      showDot
                      gradient
                      animated
                    />
                  </div>

                  {/* Platform specific extra */}
                  {social.id === 'instagram' && (
                    <div className="flex items-center gap-4 rounded-xl border border-pink-200/50 bg-gradient-to-r from-pink-50/50 to-purple-50/50 p-3 dark:border-pink-800/30 dark:from-pink-950/10 dark:to-purple-950/10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                        <Image className="h-5 w-5 text-pink-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[var(--text-muted)]">Top Post</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-sm font-medium"><Heart className="h-3.5 w-3.5 text-red-500" />{social.topPostLikes}</span>
                          <span className="flex items-center gap-1 text-sm font-medium"><MessageCircle className="h-3.5 w-3.5 text-blue-500" />{social.topPostComments}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {social.id === 'facebook' && (
                    <div className="flex items-center justify-between rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-3 dark:border-blue-800/30 dark:from-blue-950/10 dark:to-indigo-950/10">
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Total Reach</p>
                        <p className="text-lg font-bold text-[var(--text-primary)]">{social.reach}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--text-muted)]">Page Views</p>
                        <p className="text-lg font-bold text-[var(--text-primary)]">{social.pageViews}</p>
                      </div>
                    </div>
                  )}

                  {social.id === 'linkedin' && (
                    <div className="flex items-center justify-between rounded-xl border border-sky-200/50 bg-gradient-to-r from-sky-50/50 to-blue-50/50 p-3 dark:border-sky-800/30 dark:from-sky-950/10 dark:to-blue-950/10">
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Impressions</p>
                        <p className="text-lg font-bold text-[var(--text-primary)]">{social.impressions}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--text-muted)]">Profile Views</p>
                        <p className="text-lg font-bold text-[var(--text-primary)]">{social.profileViews}</p>
                      </div>
                    </div>
                  )}
                </Card.Content>
              </Card>
            )
          })
        )}
      </div>

      {/* ================================================================ */}
      {/* ROW 3 - Campaign Performance & Channel ROI */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Performance Chart */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 dark:from-pink-950/20 dark:to-purple-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-sm">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Campaign Performance</Card.Title>
                  <Card.Description className="mt-1">Spend vs Revenue comparison</Card.Description>
                </div>
              </div>
              <Badge variant="default" size="sm" className="text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-800/30">
                {campaignPerformanceData.length} campaigns
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-72 rounded-lg" />
            ) : (
              <>
                <ChartWrapper
                  type="bar"
                  data={campaignPerformanceData}
                  series={[
                    { dataKey: 'spend', name: 'Spend', color: '#94A3B8' },
                    { dataKey: 'revenue', name: 'Revenue', color: '#EC4899' },
                  ]}
                  xAxisKey="name"
                  height={280}
                  showGrid
                  showLegend
                />
                {/* ROI Summary */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {campaignPerformanceData.map((campaign) => (
                    <div key={campaign.name} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-2.5 py-1.5 text-xs transition-all hover:shadow-sm hover:scale-[1.02]">
                      <span className="text-[var(--text-muted)]">{campaign.name}:</span>
                      <span className="ml-1 font-bold text-green-600 dark:text-green-400">{campaign.roi}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Channel ROI */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 dark:from-emerald-950/20 dark:to-green-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-sm">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Channel ROI</Card.Title>
                  <Card.Description className="mt-1">Return on investment by channel</Card.Description>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-muted)]">Avg ROI</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">342%</p>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {channelROIData.map((channel, idx) => {
                  const ChannelIcon = channel.icon
                  const maxROI = Math.max(...channelROIData.map(c => c.roi))
                  return (
                    <div key={channel.channel} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${channel.color}20, ${channel.color}40)` }}
                        >
                          <ChannelIcon className="h-4 w-4" style={{ color: channel.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-semibold text-[var(--text-primary)]">{channel.channel}</span>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-[var(--text-muted)]">{formatCurrency(channel.spend)} → {formatCurrency(channel.revenue)}</span>
                              <span className="font-bold" style={{ color: channel.color }}>{channel.roi}%</span>
                            </div>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(channel.roi / maxROI) * 100}%`,
                                background: `linear-gradient(to right, ${channel.color}, ${channel.color}80)`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Total Summary */}
                <div className="rounded-xl bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/15 dark:via-green-900/15 dark:to-teal-900/15 border border-emerald-200/50 dark:border-emerald-800/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-green-600 shadow-sm">
                        <Zap className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Total Spend</span>
                    </div>
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                      {formatCurrency(channelROIData.reduce((s, c) => s + c.spend, 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ================================================================ */}
      {/* ROW 4 - Audience Demographics + Email Performance */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Audience Demographics */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-950/20 dark:to-purple-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
          <Card.Header className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <Card.Title>Audience Demographics</Card.Title>
                <Card.Description className="mt-1">Age & gender distribution</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="space-y-3">
                {audienceData.map((segment) => (
                  <div key={segment.age} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-sm hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{segment.age}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: segment.color }}>{segment.percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${segment.percentage * 2.5}%`,
                          backgroundColor: segment.color,
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                        Male {segment.gender.male}%
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-pink-400" />
                        Female {segment.gender.female}%
                      </span>
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/15 border border-violet-200/50 dark:border-violet-800/30 p-2.5 text-center">
                    <p className="text-xs text-[var(--text-muted)]">Top Age</p>
                    <p className="text-sm font-bold text-violet-600 dark:text-violet-400">25-34</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/15 dark:to-cyan-900/15 border border-blue-200/50 dark:border-blue-800/30 p-2.5 text-center">
                    <p className="text-xs text-[var(--text-muted)]">Avg Age</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">31.4</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/15 dark:to-rose-900/15 border border-pink-200/50 dark:border-pink-800/30 p-2.5 text-center">
                    <p className="text-xs text-[var(--text-muted)]">Gender</p>
                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400">50/50</p>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Email Performance */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Email Performance</Card.Title>
                  <Card.Description className="mt-1">Newsletter & email campaign metrics</Card.Description>
                </div>
              </div>
              <Badge variant="default" size="sm" className="text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30">
                <Zap className="mr-1 h-3 w-3" />
                {emailStats.openRate}% open rate
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="space-y-4">
                {/* Funnel visualization */}
                <div className="space-y-2">
                  {[
                    { label: 'Sent', value: emailStats.sent, icon: Mail, color: '#94A3B8', pct: 100 },
                    { label: 'Delivered', value: emailStats.delivered, icon: MailOpen, color: '#3B82F6', pct: Math.round((emailStats.delivered / emailStats.sent) * 100) },
                    { label: 'Opened', value: emailStats.opened, icon: Eye, color: '#F59E0B', pct: Math.round((emailStats.opened / emailStats.sent) * 100) },
                    { label: 'Clicked', value: emailStats.clicked, icon: MousePointerClick, color: '#EC4899', pct: Math.round((emailStats.clicked / emailStats.sent) * 100) },
                  ].map((step, idx) => {
                    const StepIcon = step.icon
                    return (
                      <div key={step.label} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-sm">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)` }}
                          >
                            <StepIcon className="h-4 w-4" style={{ color: step.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-[var(--text-primary)]">{step.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[var(--text-primary)]">{step.value.toLocaleString()}</span>
                                <span className="text-xs font-medium" style={{ color: step.color }}>{step.pct}%</span>
                              </div>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${step.pct}%`, backgroundColor: step.color }}
                              />
                            </div>
                          </div>
                        </div>
                        {idx < 3 && (
                          <div className="flex justify-center mt-1">
                            <ChevronRight className="h-3 w-3 rotate-90 text-[var(--text-muted)]" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Email sparkline */}
                <div className="rounded-xl bg-[var(--bg-subtle)] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Open Rate Trend</span>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Last 12 weeks</span>
                  </div>
                  <SparklineChart
                    data={emailStats.sparkline}
                    height={48}
                    color="#F59E0B"
                    gradient
                    animated
                    showDot
                  />
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-red-200/50 bg-gradient-to-br from-red-50/50 to-orange-50/50 p-2.5 dark:border-red-800/30 dark:from-red-950/10 dark:to-orange-950/10">
                    <p className="text-xs text-[var(--text-muted)]">Bounced</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{emailStats.bounced.toLocaleString()}</p>
                    <p className="text-xs text-[var(--text-muted)]">{((emailStats.bounced / emailStats.sent) * 100).toFixed(1)}% rate</p>
                  </div>
                  <div className="rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 p-2.5 dark:border-amber-800/30 dark:from-amber-950/10 dark:to-yellow-950/10">
                    <p className="text-xs text-[var(--text-muted)]">Unsubscribed</p>
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{emailStats.unsubscribed}</p>
                    <p className="text-xs text-[var(--text-muted)]">{((emailStats.unsubscribed / emailStats.sent) * 100).toFixed(2)}% rate</p>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ================================================================ */}
      {/* ROW 5 - Content Calendar & Top Performing Content */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Calendar */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 dark:from-indigo-950/20 dark:to-violet-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Content Calendar</Card.Title>
                  <Card.Description className="mt-1">Scheduled posts & campaigns</Card.Description>
                </div>
              </div>
              <Badge variant="default" size="sm" className="text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/30">
                {calendarEvents.length} scheduled
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-64 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Calendar */}
                <div className="rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-3 dark:border-indigo-900/30 dark:from-[var(--bg-elevated)] dark:to-indigo-950/20">
                  <MiniCalendar
                    size="md"
                    value={selectedDate ?? undefined}
                    onChange={setSelectedDate}
                    events={calendarEvents}
                    highlightedDates={calendarEvents.map((e) => e.date)}
                    className="!max-w-none"
                  />
                </div>

                {/* Upcoming Posts */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Upcoming Posts</h4>
                  {upcomingPosts.map((post) => {
                    const platformIcon = post.platform === 'instagram' ? Instagram : post.platform === 'facebook' ? Facebook : Linkedin
                    const platformColor = post.platform === 'instagram' ? 'border-l-pink-500' : post.platform === 'facebook' ? 'border-l-blue-500' : 'border-l-sky-500'
                    const typeIcon = post.type === 'image' ? Image : post.type === 'video' ? Video : post.type === 'carousel' ? FileText : FileText
                    const TypeIcon = typeIcon
                    const PlatformIcon = platformIcon

                    return (
                      <div
                        key={post.id}
                        className={`group flex items-center gap-3 rounded-xl border border-[var(--border-default)] border-l-4 ${platformColor} p-3 transition-all duration-200 hover:shadow-sm hover:scale-[1.01]`}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-subtle)]">
                          <TypeIcon className="h-4 w-4 text-[var(--text-secondary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-[var(--text-primary)]">{post.title}</p>
                          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            <Clock className="h-3 w-3" />
                            {post.scheduledFor}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="default"
                            size="sm"
                            className={post.engagement === 'High' ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400'}
                          >
                            {post.engagement}
                          </Badge>
                          <PlatformIcon className="h-4 w-4 text-[var(--text-muted)]" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Top Performing Content */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-pink-500/5 dark:from-amber-950/20 dark:to-pink-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-pink-600 shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Top Performing Content</Card.Title>
                  <Card.Description className="mt-1">Best engagement from recent posts</Card.Description>
                </div>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topContent.map((content) => {
                  const PlatformIcon = content.platformIcon
                  const totalEngagement = content.likes + content.comments + content.shares

                  return (
                    <div
                      key={content.id}
                      className="group relative rounded-xl border border-[var(--border-default)] p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                    >
                      {/* Rank badge */}
                      {content.rank === 1 && (
                        <div className="absolute -top-2 -right-2">
                          <Badge variant="primary" size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white shadow-lg shadow-amber-500/25">
                            <Star className="h-3 w-3 mr-0.5" />
                            #1
                          </Badge>
                        </div>
                      )}

                      <div className="flex gap-4">
                        {/* Thumbnail placeholder */}
                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${content.platformBg}`}>
                          <PlatformIcon className={`h-6 w-6 ${content.platformColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="mb-1.5 flex items-center gap-2">
                            <PlatformIcon className={`h-3.5 w-3.5 ${content.platformColor}`} />
                            <span className="text-xs text-[var(--text-muted)]">{content.postedAt}</span>
                            <span className="text-xs font-medium text-[var(--text-muted)]">
                              {formatNumber(totalEngagement)} total
                            </span>
                          </div>
                          <p className="line-clamp-2 text-sm text-[var(--text-primary)]">{content.caption}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                              <Heart className="h-3.5 w-3.5" />
                              {formatNumber(content.likes)}
                            </div>
                            <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                              <MessageCircle className="h-3.5 w-3.5" />
                              {content.comments}
                            </div>
                            <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                              <Share2 className="h-3.5 w-3.5" />
                              {content.shares}
                            </div>
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
      </div>

      {/* ================================================================ */}
      {/* ROW 6 - CAMPAIGNS OVERVIEW TABLE */}
      {/* ================================================================ */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 dark:from-pink-950/20 dark:to-purple-950/20" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-sm">
                <Megaphone className="h-4 w-4 text-white" />
              </div>
              <div>
                <Card.Title>Campaigns Overview</Card.Title>
                <Card.Description className="mt-1">All marketing campaigns with performance metrics</Card.Description>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm">
                {campaignsData.filter(c => c.status === 'active').length} active
              </Badge>
              <Badge variant="warning" size="sm">
                {campaignsData.filter(c => c.status === 'paused').length} paused
              </Badge>
              <Badge variant="default" size="sm">
                {campaignsData.filter(c => c.status === 'completed').length} done
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="relative">
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
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="group rounded-xl bg-gradient-to-br from-pink-50 to-rose-50/50 dark:from-pink-900/15 dark:to-rose-900/10 border border-pink-200/50 dark:border-pink-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/20">
                      <Megaphone className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Total Campaigns</span>
                  </div>
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{campaignsData.length}</p>
                </div>
                <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-violet-50/50 dark:from-purple-900/15 dark:to-violet-900/10 border border-purple-200/50 dark:border-purple-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20">
                      <DollarSign className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Total Spend</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(campaignsData.reduce((s, c) => s + c.spent, 0))}</p>
                </div>
                <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50/50 dark:from-blue-900/15 dark:to-cyan-900/10 border border-blue-200/50 dark:border-blue-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/20">
                      <Eye className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Total Impressions</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(campaignsData.reduce((s, c) => s + c.impressions, 0))}</p>
                </div>
                <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-green-50/50 dark:from-emerald-900/15 dark:to-green-900/10 border border-emerald-200/50 dark:border-emerald-800/50 p-3 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20">
                      <Target className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Total Conversions</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(campaignsData.reduce((s, c) => s + c.conversions, 0))}</p>
                </div>
              </div>

              {/* Data Table */}
              <div className="-mx-5 -mb-1">
                <DataTable
                  data={campaignsData}
                  columns={columns}
                  sortable
                  filterable
                  filterPlaceholder="Search campaigns..."
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
