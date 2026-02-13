'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Box,
  Puzzle,
  Building2,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@core/primitives/Badge'
import { cn } from '@shared/utils/cn'

// ─── Component Registry ─────────────────────────────────────────────────────

interface ComponentEntry {
  name: string
  id: string
}

interface CategoryEntry {
  title: string
  icon: React.ElementType
  href: string
  count: number
  components: ComponentEntry[]
}

const categories: CategoryEntry[] = [
  {
    title: 'Primitives',
    icon: Box,
    href: '/components/primitives',
    count: 15,
    components: [
      { name: 'Avatar', id: 'avatar' },
      { name: 'Badge', id: 'badge' },
      { name: 'Button', id: 'button' },
      { name: 'Checkbox', id: 'checkbox' },
      { name: 'Divider', id: 'divider' },
      { name: 'Input', id: 'input' },
      { name: 'Radio', id: 'radio' },
      { name: 'Select', id: 'select' },
      { name: 'Skeleton', id: 'skeleton' },
      { name: 'Spinner', id: 'spinner' },
      { name: 'Switch', id: 'switch' },
      { name: 'Tag', id: 'tag' },
      { name: 'Textarea', id: 'textarea' },
      { name: 'ThemeToggle', id: 'theme-toggle' },
      { name: 'Tooltip', id: 'tooltip' },
    ],
  },
  {
    title: 'Patterns',
    icon: Puzzle,
    href: '/components/patterns',
    count: 65,
    components: [
      { name: 'FormField', id: 'form-field' },
      { name: 'SearchBar', id: 'search-bar' },
      { name: 'DatePicker', id: 'date-picker' },
      { name: 'FileUpload', id: 'file-upload' },
      { name: 'PasswordInput', id: 'password-input' },
      { name: 'Pagination', id: 'pagination' },
      { name: 'Breadcrumbs', id: 'breadcrumbs' },
      { name: 'Tabs', id: 'tabs' },
      { name: 'Accordion', id: 'accordion' },
      { name: 'Stepper', id: 'stepper' },
      { name: 'TableOfContents', id: 'table-of-contents' },
      { name: 'Alert', id: 'alert' },
      { name: 'ProgressBar', id: 'progress-bar' },
      { name: 'EmptyState', id: 'empty-state' },
      { name: 'ErrorState', id: 'error-state' },
      { name: 'Toast', id: 'toast' },
      { name: 'StatCard', id: 'stat-card' },
      { name: 'MetricCardAdvanced', id: 'metric-card-advanced' },
      { name: 'ActivityTimeline', id: 'activity-timeline' },
      { name: 'LeaderboardList', id: 'leaderboard-list' },
      { name: 'RatingStars', id: 'rating-stars' },
      { name: 'RegionStats', id: 'region-stats' },
      { name: 'CountdownTimer', id: 'countdown-timer' },
      { name: 'HeatmapCalendar', id: 'heatmap-calendar' },
      { name: 'SparklineChart', id: 'sparkline-chart' },
      { name: 'GaugeChart', id: 'gauge-chart' },
      { name: 'CandlestickChart', id: 'candlestick-chart' },
      { name: 'HeroSection', id: 'hero-section' },
      { name: 'FeatureGrid', id: 'feature-grid' },
      { name: 'LogoCloud', id: 'logo-cloud' },
      { name: 'CTABanner', id: 'cta-banner' },
      { name: 'FAQAccordion', id: 'faq-accordion' },
      { name: 'FooterMarketing', id: 'footer-marketing' },
      { name: 'ShareButtons', id: 'share-buttons' },
      { name: 'BackToTop', id: 'back-to-top' },
      { name: 'CookieConsent', id: 'cookie-consent' },
      { name: 'ImageGallery', id: 'image-gallery' },
      { name: 'VideoPlayer', id: 'video-player' },
      { name: 'CodeBlock', id: 'code-block' },
      { name: 'ChatUI', id: 'chat-ui' },
      { name: 'NotificationCenter', id: 'notification-center' },
      { name: 'KanbanBoard', id: 'kanban-board' },
      { name: 'FileManager', id: 'file-manager' },
      { name: 'PricingTable', id: 'pricing-table' },
      { name: 'TestimonialCard', id: 'testimonial-card' },
      { name: 'OnboardingWizard', id: 'onboarding-wizard' },
      { name: 'CryptoCard', id: 'crypto-card' },
      { name: 'PriceAlertCard', id: 'price-alert-card' },
      { name: 'QuickTradeForm', id: 'quick-trade-form' },
      { name: 'MiniCalendar', id: 'mini-calendar' },
      { name: 'TableGrid', id: 'table-grid' },
      { name: 'OrderTicket', id: 'order-ticket' },
      { name: 'ReservationTimeline', id: 'reservation-timeline' },
      { name: 'PropertyCard', id: 'property-card' },
      { name: 'CourseCard', id: 'course-card' },
      { name: 'CertificateCard', id: 'certificate-card' },
      { name: 'AchievementBadge', id: 'achievement-badge' },
      { name: 'AuthCard', id: 'auth-card' },
      { name: 'SocialLoginButtons', id: 'social-login-buttons' },
      { name: 'EmailCapture', id: 'email-capture' },
      { name: 'BlogCard', id: 'blog-card' },
      { name: 'TeamMemberCard', id: 'team-member-card' },
      { name: 'TimelineItem', id: 'timeline-item' },
      { name: 'ProductCard', id: 'product-card' },
      { name: 'Illustrations', id: 'illustrations' },
    ],
  },
  {
    title: 'Organisms',
    icon: Building2,
    href: '/components/organisms',
    count: 8,
    components: [
      { name: 'Card', id: 'card' },
      { name: 'ChartWrapper', id: 'chart-wrapper' },
      { name: 'CommandPalette', id: 'command-palette' },
      { name: 'DataTable', id: 'data-table' },
      { name: 'Drawer', id: 'drawer' },
      { name: 'DropdownMenu', id: 'dropdown-menu' },
      { name: 'Form', id: 'form' },
      { name: 'Modal', id: 'modal' },
    ],
  },
  {
    title: 'Layouts',
    icon: LayoutGrid,
    href: '/components/layouts',
    count: 6,
    components: [
      { name: 'DashboardGrid', id: 'dashboard-grid' },
      { name: 'Footer', id: 'footer' },
      { name: 'Header', id: 'header' },
      { name: 'MainContent', id: 'main-content' },
      { name: 'PageHeader', id: 'page-header' },
      { name: 'Sidebar', id: 'sidebar' },
    ],
  },
]

// ─── Sidebar Navigation ─────────────────────────────────────────────────────

function ComponentNav() {
  const pathname = usePathname()
  const [search, setSearch] = React.useState('')
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const cat of categories) {
      initial[cat.title] = pathname.startsWith(cat.href)
    }
    // If on overview page, expand all
    if (pathname === '/components') {
      for (const cat of categories) {
        initial[cat.title] = true
      }
    }
    return initial
  })

  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) return categories
    const query = search.toLowerCase()
    return categories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter((c) =>
          c.name.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.components.length > 0)
  }, [search])

  // Auto-expand categories when searching
  React.useEffect(() => {
    if (search.trim()) {
      const newExpanded: Record<string, boolean> = {}
      for (const cat of filteredCategories) {
        newExpanded[cat.title] = true
      }
      setExpanded(newExpanded)
    }
  }, [search, filteredCategories])

  const toggleCategory = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <nav className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-default)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Components
          </h2>
          <Badge variant="primary" size="sm">94</Badge>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredCategories.map((cat) => {
          const isActive = pathname.startsWith(cat.href)
          const isExpanded = expanded[cat.title] ?? false
          const Icon = cat.icon

          return (
            <div key={cat.title}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.title)}
                className={cn(
                  'flex items-center w-full px-4 py-2 text-sm font-medium transition-colors',
                  'hover:bg-[var(--bg-muted)]',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-[var(--text-primary)]'
                )}
              >
                <Icon className="h-4 w-4 mr-2 shrink-0" />
                <span className="flex-1 text-left">{cat.title}</span>
                <Badge variant="outline" size="sm" className="mr-2 text-xs">
                  {search.trim() ? cat.components.length : cat.count}
                </Badge>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
                )}
              </button>

              {/* Component list */}
              {isExpanded && (
                <div className="pb-1">
                  {cat.components.map((comp) => {
                    const compHref = `${cat.href}#${comp.id}`
                    const isCompActive =
                      pathname === cat.href &&
                      typeof window !== 'undefined' &&
                      window.location.hash === `#${comp.id}`

                    return (
                      <Link
                        key={comp.id}
                        href={compHref}
                        className={cn(
                          'block pl-10 pr-4 py-1.5 text-sm transition-colors',
                          'hover:bg-[var(--bg-muted)] hover:text-primary-600 dark:hover:text-primary-400',
                          isCompActive
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                            : 'text-[var(--text-secondary)]'
                        )}
                      >
                        {comp.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {filteredCategories.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
            No components found for &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Mobile Tab Nav ──────────────────────────────────────────────────────────

function MobileTabNav() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Overview', href: '/components' },
    { label: 'Primitives', href: '/components/primitives' },
    { label: 'Patterns', href: '/components/patterns' },
    { label: 'Organisms', href: '/components/organisms' },
    { label: 'Layouts', href: '/components/layouts' },
  ]

  return (
    <div className="flex gap-1 overflow-x-auto pb-2 lg:hidden">
      {tabs.map((tab) => {
        const isActive =
          tab.href === '/components'
            ? pathname === '/components'
            : pathname.startsWith(tab.href)

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'shrink-0 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-primary-500 text-white'
                : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6 -mt-4 -mx-2 lg:-mx-4">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0 border-r border-[var(--border-default)] bg-[var(--bg-base)] sticky top-0 h-[calc(100vh-64px)] overflow-hidden rounded-l-lg">
        <ComponentNav />
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 py-4 pr-2 lg:pr-4">
        <MobileTabNav />
        {children}
      </div>
    </div>
  )
}
