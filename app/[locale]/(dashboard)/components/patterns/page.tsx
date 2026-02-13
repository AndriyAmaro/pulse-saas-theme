'use client'

import * as React from 'react'
import {
  Search,
  Mail,
  ArrowRight,
  Download,
  Plus,
  Heart,
  Star,
  Trash2,
  Check,
  X,
  Settings,
  Copy,
  Share,
  Zap,
  Globe,
  Lock,
  Home,
  Users,
  FileText,
  Upload,
  Image,
  Play,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Folder,
  File,
  MoreVertical,
  Eye,
  Rocket,
  MapPin,
  Bath,
  BedDouble,
  Maximize,
} from 'lucide-react'

// Primitives
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Input } from '@core/primitives/Input'

// Organisms
import { Card } from '@core/organisms/Card'

// Patterns — Forms & Inputs
import { FormField } from '@core/patterns/FormField'
import { SearchBar } from '@core/patterns/SearchBar'
import { DatePicker } from '@core/patterns/DatePicker'
import { FileUpload } from '@core/patterns/FileUpload'
import { PasswordInput } from '@core/patterns/PasswordInput'

// Patterns — Navigation
import { Pagination } from '@core/patterns/Pagination'
import { Breadcrumbs } from '@core/patterns/Breadcrumbs'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/patterns/Tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@core/patterns/Accordion'
import { Stepper } from '@core/patterns/Stepper'

// Patterns — Feedback
import { Alert } from '@core/patterns/Alert'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { EmptyState } from '@core/patterns/EmptyState'
import { ErrorState } from '@core/patterns/ErrorState'

// Patterns — Data Display
import { StatCard } from '@core/patterns/StatCard'
import { MetricCardAdvanced } from '@core/patterns/MetricCardAdvanced'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { LeaderboardList, type LeaderboardItem } from '@core/patterns/LeaderboardList'
import { RatingStars } from '@core/patterns/RatingStars'
import { CountdownTimer } from '@core/patterns/CountdownTimer'
import { HeatmapCalendar, type HeatmapDataPoint } from '@core/patterns/HeatmapCalendar'

// Patterns — Charts
import { SparklineChart } from '@core/patterns/SparklineChart'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { CandlestickChart, type CandleData } from '@core/patterns/CandlestickChart'

// Patterns — Social & Utility
import { ShareButtons } from '@core/patterns/ShareButtons'
import { CodeBlock } from '@core/patterns/CodeBlock'

// Patterns — Chat
import { NotificationCenter, type NotificationItem as NotifItem } from '@core/patterns/NotificationCenter'

// Patterns — Premium
import { PricingTable, type PricingPlan } from '@core/patterns/PricingTable'
import { TestimonialCard, type Testimonial } from '@core/patterns/TestimonialCard'

// Patterns — Crypto
import { CryptoCard } from '@core/patterns/CryptoCard'
import { PriceAlertCard, type PriceAlert } from '@core/patterns/PriceAlertCard'
import { QuickTradeForm, type CryptoOption } from '@core/patterns/QuickTradeForm'
import { MiniCalendar } from '@core/patterns/MiniCalendar'

// Patterns — Restaurant
import { TableGrid, type RestaurantTable } from '@core/patterns/TableGrid'
import { OrderTicket, type KitchenOrder } from '@core/patterns/OrderTicket'

// Patterns — Domain-specific
import { PropertyCard } from '@core/patterns/PropertyCard'
import { CourseCard } from '@core/patterns/CourseCard'
import { CertificateCard } from '@core/patterns/CertificateCard'
import { AchievementBadge } from '@core/patterns/AchievementBadge'

// Patterns — Auth
import { SocialLoginButtons } from '@core/patterns/SocialLoginButtons'
import { EmailCapture } from '@core/patterns/EmailCapture'

// Patterns — Blog
import { BlogCard } from '@core/patterns/BlogCard'
import { TeamMemberCard } from '@core/patterns/TeamMemberCard'

// Patterns — Misc
import { ProductCard } from '@core/patterns/ProductCard'
import { Illustration404, Illustration500, IllustrationRocket, IllustrationMaintenance } from '@core/patterns/Illustrations'

import { cn } from '@shared/utils/cn'

// ─── Shared ──────────────────────────────────────────────────────────────────

function Section({
  id,
  name,
  description,
  children,
}: {
  id: string
  name: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">{name}</h2>
        <Badge variant="info" size="sm">Pattern</Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
      <Card>
        <Card.Content className="space-y-4">{children}</Card.Content>
      </Card>
    </section>
  )
}

function CategoryHeader({ title }: { title: string }) {
  return (
    <div className="pt-4 first:pt-0">
      <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-2 mb-6">
        {title}
      </h3>
    </div>
  )
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const activityItems: ActivityItem[] = [
  { id: '1', type: 'success', title: 'Deployment completed', description: 'v2.4.0 deployed to production', timestamp: '2 hours ago' },
  { id: '2', type: 'info', title: 'PR merged', description: '#142 — Add user authentication', timestamp: '4 hours ago' },
  { id: '3', type: 'warning', title: 'Build warning', description: '3 deprecation warnings detected', timestamp: '6 hours ago' },
]

const leaderboardItems: LeaderboardItem[] = [
  { id: '1', rank: 1, name: 'Alice Johnson', value: 2840, change: 12 },
  { id: '2', rank: 2, name: 'Bob Smith', value: 2560, change: -3 },
  { id: '3', rank: 3, name: 'Carol White', value: 2310, change: 8 },
  { id: '4', rank: 4, name: 'David Brown', value: 1980, change: 0, isCurrentUser: true },
  { id: '5', rank: 5, name: 'Eva Davis', value: 1750, change: 15 },
]

const sparklineData = [
  { value: 10 }, { value: 25 }, { value: 18 }, { value: 35 }, { value: 28 },
  { value: 42 }, { value: 38 }, { value: 55 }, { value: 48 }, { value: 62 },
]

const heatmapData: HeatmapDataPoint[] = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2025, 0, 1)
  date.setDate(date.getDate() + i)
  return { date: date.toISOString().split('T')[0] ?? '', value: Math.floor(Math.random() * 5) }
})

const candleData: CandleData[] = [
  { time: '01/01', open: 100, high: 115, low: 95, close: 110 },
  { time: '01/02', open: 110, high: 120, low: 105, close: 108 },
  { time: '01/03', open: 108, high: 125, low: 107, close: 122 },
  { time: '01/04', open: 122, high: 130, low: 118, close: 125 },
  { time: '01/05', open: 125, high: 128, low: 112, close: 115 },
  { time: '01/06', open: 115, high: 122, low: 110, close: 120 },
  { time: '01/07', open: 120, high: 135, low: 118, close: 132 },
  { time: '01/08', open: 132, high: 140, low: 128, close: 138 },
]

const notifications: NotifItem[] = [
  { id: '1', type: 'info', title: 'New message', description: 'Alice sent you a message', timestamp: '5 min ago', read: false },
  { id: '2', type: 'warning', title: 'System alert', description: 'CPU usage above 90%', timestamp: '1h ago', read: false },
  { id: '3', type: 'success', title: 'Payment received', description: '$250.00 from Bob Smith', timestamp: '2h ago', read: true },
]

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals',
    price: { monthly: 19, yearly: 190 },
    features: [
      { text: '5 Projects', included: true },
      { text: '10GB Storage', included: true },
      { text: 'Email Support', included: true },
      { text: 'API Access', included: false },
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams',
    price: { monthly: 49, yearly: 490 },
    popular: true,
    features: [
      { text: 'Unlimited Projects', included: true },
      { text: '100GB Storage', included: true },
      { text: 'Priority Support', included: true },
      { text: 'API Access', included: true },
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations',
    price: { monthly: 99, yearly: 990 },
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: '1TB Storage', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Custom Integrations', included: true },
    ],
    cta: 'Contact Sales',
  },
]

const testimonial: Testimonial = {
  id: '1',
  quote: 'Pulse has transformed how we build dashboards. The component quality is outstanding.',
  author: { name: 'Sarah Chen', role: 'CTO', company: 'TechCorp' },
  rating: 5,
}

const cryptoOptions: CryptoOption[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67500 },
  { name: 'Ethereum', symbol: 'ETH', price: 3450 },
]

const restaurantTables: RestaurantTable[] = [
  { id: '1', number: '1', seats: 2, status: 'available' },
  { id: '2', number: '2', seats: 4, status: 'occupied', guestName: 'Johnson', occupiedTime: '12:30 PM' },
  { id: '3', number: '3', seats: 6, status: 'reserved', guestName: 'Smith', reservationTime: '7:00 PM' },
  { id: '4', number: '4', seats: 2, status: 'paying' },
  { id: '5', number: '5', seats: 4, status: 'available' },
  { id: '6', number: '6', seats: 8, status: 'occupied', guestName: 'Williams', occupiedTime: '1:00 PM' },
]

const kitchenOrder: KitchenOrder = {
  id: 'ORD-001',
  orderNumber: '#001',
  tableNumber: '5',
  items: [
    { id: '1', name: 'Grilled Salmon', quantity: 2, notes: 'No sauce' },
    { id: '2', name: 'Caesar Salad', quantity: 1 },
    { id: '3', name: 'Sparkling Water', quantity: 3 },
  ],
  status: 'preparing',
  priority: 'normal',
  createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
}

const priceAlerts: PriceAlert[] = [
  { id: '1', crypto: 'Bitcoin', symbol: 'BTC', targetPrice: 70000, currentPrice: 67500, condition: 'above', status: 'active' },
  { id: '2', crypto: 'Ethereum', symbol: 'ETH', targetPrice: 3000, currentPrice: 3450, condition: 'below', status: 'triggered' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PatternsShowcasePage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [stepperStep, setStepperStep] = React.useState(1)
  const [rating, setRating] = React.useState(3)

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
          Patterns
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          65 composite molecules — forms, navigation, charts, and domain-specific components
        </p>
      </div>

      {/* ═══════════════ FORMS & INPUTS ═══════════════ */}
      <CategoryHeader title="Forms & Inputs" />

      <Section id="form-field" name="FormField" description="Labeled input wrapper with description, error messages, and required indicator.">
        <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
          <FormField label="Full Name" required>
            <Input placeholder="John Doe" />
          </FormField>
          <FormField label="Email" description="We'll never share your email." error="Invalid email address">
            <Input placeholder="you@example.com" />
          </FormField>
        </div>
      </Section>

      <Section id="search-bar" name="SearchBar" description="Search input with debounce, clear button, and icon.">
        <div className="max-w-md">
          <SearchBar placeholder="Search components..." onSearch={(q) => {}} />
        </div>
      </Section>

      <Section id="date-picker" name="DatePicker" description="Calendar popup date selector with range mode support.">
        <div className="max-w-xs">
          <DatePicker placeholder="Select a date" />
        </div>
      </Section>

      <Section id="file-upload" name="FileUpload" description="Drag-and-drop file upload with preview and progress indicators.">
        <div className="max-w-lg">
          <FileUpload accept="image/*,.pdf" maxFiles={3} />
        </div>
      </Section>

      <Section id="password-input" name="PasswordInput" description="Password field with show/hide toggle and strength meter.">
        <div className="max-w-sm">
          <PasswordInput placeholder="Enter password" showStrength />
        </div>
      </Section>

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <CategoryHeader title="Navigation" />

      <Section id="pagination" name="Pagination" description="Page navigation with previous/next, page numbers, and ellipsis.">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </Section>

      <Section id="breadcrumbs" name="Breadcrumbs" description="Navigation trail showing the current location in hierarchy.">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Patterns', href: '#' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </Section>

      <Section id="tabs" name="Tabs" description="Tabbed content with 3 visual variants — default, underline, and pills.">
        <div className="space-y-6">
          {(['default', 'underline', 'pills'] as const).map((variant) => (
            <div key={variant}>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-2 capitalize">{variant}</p>
              <Tabs defaultValue="tab1" variant={variant}>
                <TabsList>
                  <TabsTrigger value="tab1">Overview</TabsTrigger>
                  <TabsTrigger value="tab2">Analytics</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p className="text-sm text-[var(--text-secondary)] p-3">Overview content goes here.</p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-sm text-[var(--text-secondary)] p-3">Analytics content goes here.</p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p className="text-sm text-[var(--text-secondary)] p-3">Settings content goes here.</p>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </Section>

      <Section id="accordion" name="Accordion" description="Collapsible content panels with 3 visual variants.">
        <div className="space-y-6">
          {(['default', 'bordered', 'separated'] as const).map((variant) => (
            <div key={variant}>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-2 capitalize">{variant}</p>
              <Accordion type="single" collapsible variant={variant}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Pulse?</AccordionTrigger>
                  <AccordionContent>Pulse is a premium SaaS dashboard theme built with React 19 and Next.js 16.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How many components?</AccordionTrigger>
                  <AccordionContent>94 reusable components across 4 categories.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is TypeScript supported?</AccordionTrigger>
                  <AccordionContent>Yes, with strict mode and noUncheckedIndexedAccess enabled.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </Section>

      <Section id="stepper" name="Stepper" description="Multi-step progress indicator with horizontal/vertical layouts.">
        <Stepper
          steps={[
            { label: 'Account', description: 'Create account' },
            { label: 'Profile', description: 'Set up profile' },
            { label: 'Review', description: 'Review & submit' },
          ]}
          currentStep={stepperStep}
          onStepClick={setStepperStep}
        />
      </Section>

      {/* ═══════════════ FEEDBACK ═══════════════ */}
      <CategoryHeader title="Feedback & Status" />

      <Section id="alert" name="Alert" description="Contextual feedback messages with 4 semantic variants.">
        <div className="space-y-3">
          <Alert variant="info" title="Information">This is an informational message.</Alert>
          <Alert variant="success" title="Success">Operation completed successfully.</Alert>
          <Alert variant="warning" title="Warning">Please review before proceeding.</Alert>
          <Alert variant="error" title="Error" dismissible>Something went wrong. Please try again.</Alert>
        </div>
      </Section>

      <Section id="progress-bar" name="ProgressBar" description="Visual progress indicator with animated fill and color variants.">
        <div className="space-y-4">
          <ProgressBar value={25} label="25% complete" />
          <ProgressBar value={60} variant="warning" label="Uploading..." />
          <ProgressBar value={90} variant="success" label="Almost done!" />
        </div>
      </Section>

      <Section id="empty-state" name="EmptyState" description="Placeholder for sections with no data, with icon and action.">
        <EmptyState
          icon={<FileText className="h-12 w-12" />}
          title="No documents yet"
          description="Get started by uploading your first document."
          action={<Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Upload Document</Button>}
        />
      </Section>

      <Section id="error-state" name="ErrorState" description="Error display with retry action and details.">
        <ErrorState
          title="Failed to load data"
          description="An unexpected error occurred while fetching the data."
          action={<Button size="sm" variant="outline">Retry</Button>}
        />
      </Section>

      {/* ═══════════════ DATA DISPLAY ═══════════════ */}
      <CategoryHeader title="Data Display" />

      <Section id="stat-card" name="StatCard" description="Metric display with trend indicators, sparklines, and loading states.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Revenue" value="$48,250" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: 12.5, direction: 'up', label: 'vs last month' }} />
          <StatCard title="Users" value="2,420" icon={<Users className="h-5 w-5" />} trend={{ value: 8.1, direction: 'up' }} />
          <StatCard title="Bounce Rate" value="24.5%" trend={{ value: 3.2, direction: 'down', label: 'improvement' }} />
          <StatCard title="Orders" value="1,205" trend={{ value: 0, direction: 'neutral' }} loading />
        </div>
      </Section>

      <Section id="metric-card-advanced" name="MetricCardAdvanced" description="Advanced metric display with sparkline, target progress, and breakdowns.">
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCardAdvanced
            title="Monthly Revenue"
            value="$48,250"
            change={12.5}
            changeLabel="vs last month"
            target={50000}
            progress={96}
            progressLabel="$50K target"
            sparkline={sparklineData.map((d) => d.value)}
          />
          <MetricCardAdvanced
            title="Active Users"
            value="2,420"
            change={8.0}
            changeLabel="vs last month"
            sparkline={sparklineData.map((d) => d.value)}
          />
        </div>
      </Section>

      <Section id="activity-timeline" name="ActivityTimeline" description="Chronological event feed with connected line, icons, and timestamps.">
        <div className="max-w-lg">
          <ActivityTimeline items={activityItems} />
        </div>
      </Section>

      <Section id="leaderboard-list" name="LeaderboardList" description="Ranked list with medals, change indicators, and current user highlight.">
        <div className="max-w-md">
          <LeaderboardList items={leaderboardItems} title="Top Contributors" />
        </div>
      </Section>

      <Section id="rating-stars" name="RatingStars" description="Interactive star rating with half-precision support.">
        <div className="flex items-center gap-4">
          <RatingStars value={rating} onChange={setRating} />
          <span className="text-sm text-[var(--text-secondary)]">{rating} / 5</span>
        </div>
      </Section>

      <Section id="countdown-timer" name="CountdownTimer" description="Flip-card countdown with urgency colors and pause control.">
        <CountdownTimer targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()} />
      </Section>

      <Section id="heatmap-calendar" name="HeatmapCalendar" description="GitHub-style contribution heatmap with tooltips and click handler.">
        <HeatmapCalendar data={heatmapData} />
      </Section>

      {/* ═══════════════ CHARTS ═══════════════ */}
      <CategoryHeader title="Charts" />

      <Section id="sparkline-chart" name="SparklineChart" description="Compact SVG charts — line, area, and bar variants with tooltips.">
        <div className="flex flex-wrap gap-8 items-end">
          <div className="text-center">
            <SparklineChart data={sparklineData} type="line" width={120} height={40} color="var(--primary-500)" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Line</p>
          </div>
          <div className="text-center">
            <SparklineChart data={sparklineData} type="area" width={120} height={40} color="var(--primary-500)" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Area</p>
          </div>
          <div className="text-center">
            <SparklineChart data={sparklineData} type="bar" width={120} height={40} color="var(--primary-500)" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Bar</p>
          </div>
        </div>
      </Section>

      <Section id="gauge-chart" name="GaugeChart" description="Radial progress display with 4 variants — semicircle, speedometer, donut, ring.">
        <div className="flex flex-wrap gap-8 items-center">
          <div className="text-center">
            <GaugeChart value={72} variant="semicircle" size="md" label="CPU" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Semicircle</p>
          </div>
          <div className="text-center">
            <GaugeChart value={85} variant="donut" size="md" label="Memory" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Donut</p>
          </div>
        </div>
      </Section>

      <Section id="candlestick-chart" name="CandlestickChart" description="Financial OHLCV chart with moving averages and volume bars.">
        <CandlestickChart data={candleData} showVolume showMA />
      </Section>

      {/* ═══════════════ SOCIAL & UTILITY ═══════════════ */}
      <CategoryHeader title="Social & Utility" />

      <Section id="share-buttons" name="ShareButtons" description="Social sharing with 7 networks and native share API fallback.">
        <ShareButtons data={{ url: 'https://pulse.dev', title: 'Pulse SaaS Theme' }} />
      </Section>

      <Section id="code-block" name="CodeBlock" description="Syntax-highlighted code display with line numbers and copy button.">
        <CodeBlock
          language="typescript"
          title="Example.tsx"
          code={[
            { content: "import { Button } from '@core/primitives/Button'" },
            { content: '' },
            { content: 'export function MyComponent() {' },
            { content: '  return <Button variant="primary">Click me</Button>' },
            { content: '}' },
          ]}
        />
      </Section>

      {/* ═══════════════ CHAT ═══════════════ */}
      <CategoryHeader title="Chat & Notifications" />

      <Section id="notification-center" name="NotificationCenter" description="Notification popover with tabs, mark all read, and type-based icons.">
        <div className="max-w-sm">
          <NotificationCenter
            notifications={notifications}
            onNotificationClick={() => {}}
            onMarkAllRead={() => {}}
          />
        </div>
      </Section>

      {/* ═══════════════ PREMIUM ═══════════════ */}
      <CategoryHeader title="Premium Components" />

      <Section id="pricing-table" name="PricingTable" description="Pricing cards with monthly/yearly toggle, popular highlight, and feature comparison.">
        <PricingTable plans={pricingPlans} />
      </Section>

      <Section id="testimonial-card" name="TestimonialCard" description="Customer testimonial display with quote, author, and optional rating.">
        <div className="max-w-md">
          <TestimonialCard testimonial={testimonial} />
        </div>
      </Section>

      {/* ═══════════════ CRYPTO ═══════════════ */}
      <CategoryHeader title="Crypto" />

      <Section id="crypto-card" name="CryptoCard" description="Cryptocurrency card with price, holdings, sparkline, and change indicator.">
        <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
          <CryptoCard
            name="Bitcoin"
            symbol="BTC"
            price={67500}
            change={2.4}
            holdings={0.5}
            sparklineData={sparklineData.map((d) => d.value)}
          />
          <CryptoCard
            name="Ethereum"
            symbol="ETH"
            price={3450}
            change={-1.2}
            holdings={4.2}
            sparklineData={[...sparklineData].reverse().map((d) => d.value)}
          />
        </div>
      </Section>

      <Section id="price-alert-card" name="PriceAlertCard" description="Active/triggered price alerts for crypto assets.">
        <div className="max-w-md">
          <PriceAlertCard alerts={priceAlerts} />
        </div>
      </Section>

      <Section id="quick-trade-form" name="QuickTradeForm" description="Buy/Sell form with crypto selection, fee calculation.">
        <div className="max-w-sm">
          <QuickTradeForm cryptos={cryptoOptions} />
        </div>
      </Section>

      <Section id="mini-calendar" name="MiniCalendar" description="Compact calendar with month navigation, highlights, and keyboard support.">
        <div className="max-w-xs">
          <MiniCalendar />
        </div>
      </Section>

      {/* ═══════════════ RESTAURANT ═══════════════ */}
      <CategoryHeader title="Restaurant" />

      <Section id="table-grid" name="TableGrid" description="Visual floor plan showing table status with color-coded indicators.">
        <TableGrid tables={restaurantTables} onTableClick={() => {}} />
      </Section>

      <Section id="order-ticket" name="OrderTicket" description="Kitchen ticket with items, priority, timer, and status actions.">
        <div className="max-w-sm">
          <OrderTicket order={kitchenOrder} onMarkReady={() => {}} onStartPreparing={() => {}} />
        </div>
      </Section>

      {/* ═══════════════ REAL ESTATE ═══════════════ */}
      <CategoryHeader title="Real Estate" />

      <Section id="property-card" name="PropertyCard" description="Property listing card with specs, status badge, and price.">
        <div className="max-w-sm">
          <PropertyCard
            address="123 Main St"
            city="Downtown"
            price={450000}
            status="for-sale"
            type="apartment"
            beds={2}
            baths={1}
            sqft={1200}
          />
        </div>
      </Section>

      {/* ═══════════════ EDUCATION ═══════════════ */}
      <CategoryHeader title="Education" />

      <Section id="course-card" name="CourseCard" description="Course display with progress ring, instructor, duration, and status.">
        <div className="max-w-sm">
          <CourseCard
            title="React Fundamentals"
            instructor={{ name: 'Jane Doe' }}
            progress={65}
            duration="12 hours"
            totalLessons={24}
            completedLessons={16}
            status="in-progress"
            category="development"
          />
        </div>
      </Section>

      <Section id="certificate-card" name="CertificateCard" description="Certificate display with decorative borders and verified badge.">
        <div className="max-w-md">
          <CertificateCard
            courseName="Advanced TypeScript"
            recipientName="John Smith"
            issueDate="January 2025"
            organizationName="Pulse Academy"
            credentialId="CERT-TS-2025-001"
            verified
          />
        </div>
      </Section>

      <Section id="achievement-badge" name="AchievementBadge" description="Gamification badges with 3 tiers, progress tracking, and shine effect.">
        <div className="flex flex-wrap gap-4">
          <AchievementBadge title="First Steps" description="Complete your first lesson" type="first-course" tier="bronze" />
          <AchievementBadge title="Fast Learner" description="Complete 10 lessons in a week" type="fast-learner" tier="silver" />
          <AchievementBadge title="Champion" description="Complete all advanced courses" type="champion" tier="gold" progress={75} locked />
        </div>
      </Section>

      {/* ═══════════════ AUTH ═══════════════ */}
      <CategoryHeader title="Auth & Onboarding" />

      <Section id="social-login-buttons" name="SocialLoginButtons" description="OAuth login buttons for Google, GitHub, and Apple.">
        <div className="max-w-sm">
          <SocialLoginButtons onProviderClick={() => {}} />
        </div>
      </Section>

      <Section id="email-capture" name="EmailCapture" description="Newsletter signup with inline/stacked layouts and subscriber count.">
        <div className="max-w-md">
          <EmailCapture
            variant="inline"
            placeholder="Enter your email"
            buttonText="Subscribe"
            helperText="No spam, unsubscribe anytime."
            subscriberCount={1250}
          />
        </div>
      </Section>

      {/* ═══════════════ BLOG ═══════════════ */}
      <CategoryHeader title="Blog" />

      <Section id="blog-card" name="BlogCard" description="Blog post card with featured variant, category, author, and read time.">
        <div className="max-w-sm">
          <BlogCard
            post={{
              slug: 'getting-started',
              title: 'Getting Started with Pulse',
              excerpt: 'A comprehensive guide to building dashboards with the Pulse design system.',
              category: 'Tutorial',
              categoryColor: 'primary',
              author: { name: 'Jane Doe', initials: 'JD' },
              publishedAt: 'Feb 1, 2026',
              readTime: '8 min read',
            }}
          />
        </div>
      </Section>

      <Section id="team-member-card" name="TeamMemberCard" description="Team member display with hover bio reveal and social links.">
        <div className="max-w-xs">
          <TeamMemberCard
            member={{
              name: 'Alice Johnson',
              role: 'Lead Designer',
              bio: 'Creative designer with 10+ years of experience in digital products.',
              initials: 'AJ',
              socials: { twitter: '#', linkedin: '#' },
            }}
          />
        </div>
      </Section>

      {/* ═══════════════ MISC ═══════════════ */}
      <CategoryHeader title="Miscellaneous" />

      <Section id="product-card" name="ProductCard" description="E-commerce product card with image, price, badges, and wishlist.">
        <div className="max-w-xs">
          <ProductCard
            name="Wireless Headphones"
            price={99.99}
            originalPrice={149.99}
            badge="sale"
            rating={4.5}
            reviewCount={128}
          />
        </div>
      </Section>

      <Section id="illustrations" name="Illustrations" description="Custom SVG illustrations for error pages — 404, 500, Coming Soon, Maintenance.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <Illustration404 className="w-full max-w-[160px] mx-auto h-auto" animated />
            <p className="text-sm text-[var(--text-muted)] mt-2">404 - Not Found</p>
          </div>
          <div className="text-center">
            <Illustration500 className="w-full max-w-[160px] mx-auto h-auto" animated />
            <p className="text-sm text-[var(--text-muted)] mt-2">500 - Server Error</p>
          </div>
          <div className="text-center">
            <IllustrationRocket className="w-full max-w-[160px] mx-auto h-auto" animated />
            <p className="text-sm text-[var(--text-muted)] mt-2">Coming Soon</p>
          </div>
          <div className="text-center">
            <IllustrationMaintenance className="w-full max-w-[160px] mx-auto h-auto" animated />
            <p className="text-sm text-[var(--text-muted)] mt-2">Maintenance</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
