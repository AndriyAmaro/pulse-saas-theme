'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
  List,
  Share2,
  Hash,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  TrendingUp,
  Puzzle,
  Activity,
} from 'lucide-react'

// ============================================================================
// SCROLL REVEAL HOOK
// ============================================================================

function useScrollReveal(threshold = 0.1) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    const children = el.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
    children.forEach((child) => observer.observe(child))
    if (el.classList.contains('scroll-reveal')) observer.observe(el)

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

function RevealSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useScrollReveal()
  return <div ref={ref} className={className} {...props}>{children}</div>
}

// ============================================================================
// DATA
// ============================================================================

const postData = {
  title: 'Introducing Pulse: A Modern Dashboard Theme',
  excerpt: 'After months of development, I\'m excited to present Pulse — a complete dashboard theme built from scratch.',
  category: 'Product',
  author: {
    name: 'Andri Amaro',
    initials: 'AA',
    role: 'Full Stack Developer',
    bio: 'Andri is a Full Stack Developer from Brazil, passionate about creating web applications that are not only functional but also provide exceptional user experiences.',
  },
  publishedAt: 'February 5, 2026',
  readTime: 8,
  tags: ['dashboard', 'react', 'nextjs', 'tailwind'],
}

const tocItems = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'the-problem', title: 'The Problem' },
  { id: 'the-solution', title: 'The Solution' },
  { id: 'architecture', title: 'Architecture & Tech Stack' },
  { id: 'features', title: 'Features & Components' },
  { id: 'design-system', title: 'Design System' },
  { id: 'results', title: 'Results & Comparison' },
  { id: 'whats-next', title: "What's Next" },
]

const relatedPosts = [
  {
    slug: 'building-with-react-19-nextjs-16',
    title: 'Building with React 19 and Next.js 16',
    excerpt: 'Why I chose the latest React and Next.js versions for Pulse.',
    category: 'Engineering',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Feb 1, 2026',
    readTime: 12,
  },
  {
    slug: 'design-system-with-cva-tailwind',
    title: 'Design System with CVA and Tailwind CSS v4',
    excerpt: 'How I built a type-safe component system.',
    category: 'Design',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 28, 2026',
    readTime: 7,
  },
  {
    slug: 'creating-pulse-my-journey',
    title: 'Creating Pulse: My Journey as a Solo Developer',
    excerpt: 'The story of building a complete dashboard theme from scratch.',
    category: 'Company',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 15, 2026',
    readTime: 5,
  },
]

// ============================================================================
// TABLE OF CONTENTS SIDEBAR
// ============================================================================

const TocSidebar = () => {
  const t = useTranslations('blog')
  const [activeId, setActiveId] = React.useState('')

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(item.id)
          })
        },
        { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden xl:block">
      <div className="sticky top-24 space-y-6">
        {/* TOC */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <List className="h-4 w-4 text-primary-500" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t('onThisPage')}</h4>
          </div>
          <ul className="space-y-0.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    'flex items-center gap-2 py-1.5 pl-3 text-sm rounded-md transition-all duration-200',
                    activeId === item.id
                      ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  )}
                >
                  <span className={cn('w-1 h-1 rounded-full shrink-0', activeId === item.id ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600')} />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Share */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{t('share')}</h4>
          <div className="flex items-center gap-2">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Link2, label: t('copyLink') },
            ].map((s) => (
              <button
                key={s.label}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={s.label}
              >
                <s.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Author card */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{t('writtenBy')}</h4>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
              {postData.author.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{postData.author.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{postData.author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ARTICLE CONTENT (Prose)
// ============================================================================

const ArticleContent = () => (
  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 dark:prose-strong:text-white prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 dark:prose-blockquote:bg-primary-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-img:rounded-xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-800">

    <h2 id="introduction">Introduction</h2>
    <p>
      I&apos;m excited to introduce <strong>Pulse</strong> — a comprehensive dashboard theme that I built entirely from scratch
      as a solo developer. After months of intensive development, Pulse has grown into a complete solution with 96 components,
      16 themed dashboards, and support for 3 languages.
    </p>
    <p>
      This post walks you through the journey: why I created Pulse, the technical decisions I made,
      and what makes it stand out in a crowded marketplace.
    </p>

    <h2 id="the-problem">The Problem</h2>
    <p>
      As a developer working with dashboard templates, I kept running into the same issues:
    </p>
    <ul>
      <li>Templates built with outdated versions of React and Next.js</li>
      <li>Poorly organized code with no clear component architecture</li>
      <li>Weak or non-existent TypeScript support</li>
      <li>Dark mode that felt like an afterthought</li>
      <li>No internationalization support</li>
      <li>Designs that looked generic and uninspired</li>
    </ul>
    <p>
      I analyzed top-selling dashboard templates on ThemeForest and found that even $99 templates
      had significant gaps in code quality, accessibility, and modern best practices.
    </p>

    <h2 id="the-solution">The Solution</h2>
    <p>
      I set out to build a theme that I would actually want to use — one that embraces the latest
      technologies while maintaining clean, maintainable code throughout.
    </p>
    <blockquote>
      <p>
        The goal was simple: create a dashboard theme that scores higher than any competitor
        in both technical quality and visual design.
      </p>
    </blockquote>
    <p>
      Every decision was guided by three principles: <strong>modern architecture</strong>,
      <strong>premium design</strong>, and <strong>developer experience</strong>.
    </p>

    <h2 id="architecture">Architecture &amp; Tech Stack</h2>
    <p>
      Pulse is built on a modern, well-structured foundation:
    </p>
    <ul>
      <li><strong>React 19</strong> — Latest concurrent features for improved performance</li>
      <li><strong>Next.js 16</strong> — App Router with Server Components</li>
      <li><strong>TypeScript strict</strong> — Zero <code>any</code> types, full type safety</li>
      <li><strong>Tailwind CSS v4</strong> — Native CSS variables, custom design tokens</li>
      <li><strong>CVA</strong> — Type-safe component variants with Class Variance Authority</li>
      <li><strong>next-intl</strong> — Full internationalization with middleware-based routing</li>
    </ul>

    <h3>Component Architecture</h3>
    <pre className="!bg-slate-900 dark:!bg-slate-800 !text-slate-300 rounded-xl !p-5 overflow-x-auto">
      <code>{`// Atomic Design Structure
core/
├── primitives/    # 15 base components (Button, Input, Badge...)
├── patterns/      # 65+ composed components (ChatUI, StatCard...)
├── organisms/     # 8 complex components (DataTable, Modal...)
└── layouts/       # 6 layout components (Sidebar, Header...)`}</code>
    </pre>

    <h2 id="features">Features &amp; Components</h2>
    <p>
      Pulse includes everything you need to build production-ready dashboards:
    </p>
    <ul>
      <li><strong>16 Themed Dashboards</strong> — Finance, CRM, SaaS, Healthcare, Education, Crypto, Restaurant, Real Estate, and more</li>
      <li><strong>96 Components</strong> — All built with CVA for type-safe variants</li>
      <li><strong>Complete Apps</strong> — Calendar with 3 views, Chat with auto-response, Email with compose modal</li>
      <li><strong>Auth Pages</strong> — Login, Register, Forgot Password, Reset Password</li>
      <li><strong>Utility Pages</strong> — 404, 500, Coming Soon, Maintenance</li>
      <li><strong>Marketing Pages</strong> — Landing, About, Contact, Blog, Terms, Privacy</li>
    </ul>

    <h2 id="design-system">Design System</h2>
    <p>
      The design system was built from the ground up with careful attention to detail:
    </p>
    <ul>
      <li><strong>Premium Dark Mode</strong> — Custom design with glassmorphism, card glow, and animated gradients</li>
      <li><strong>CSS Variables</strong> — All colors, spacing, and typography managed through CSS custom properties</li>
      <li><strong>Responsive Design</strong> — Mobile-first approach tested across all breakpoints</li>
      <li><strong>Scroll Animations</strong> — Intersection Observer-based reveal effects</li>
      <li><strong>Accessibility</strong> — Keyboard navigation, ARIA labels, focus management</li>
    </ul>

    <h2 id="results">Results &amp; Comparison</h2>
    <p>
      I conducted a detailed comparison between Pulse and a leading $99 dashboard template on ThemeForest.
      The results speak for themselves:
    </p>
    <ul>
      <li><strong>Pulse: 91% overall score</strong> vs competitor&apos;s 56%</li>
      <li><strong>Architecture:</strong> Clean Atomic Design vs scattered folder structure</li>
      <li><strong>TypeScript:</strong> 100% strict typed vs loose with <code>any</code> types</li>
      <li><strong>i18n:</strong> 3 languages built-in vs no internationalization</li>
      <li><strong>Dark Mode:</strong> Premium custom design vs basic CSS filter</li>
      <li><strong>Components:</strong> 96 with CVA variants vs 40+ with inline styles</li>
    </ul>

    <h2 id="whats-next">What&apos;s Next</h2>
    <p>
      Pulse is ready for the world, and there&apos;s more to come:
    </p>
    <ul>
      <li><strong>ThemeForest Launch</strong> — Making Pulse available to the global developer community</li>
      <li><strong>More Dashboards</strong> — Additional industry-specific templates</li>
      <li><strong>Documentation</strong> — Comprehensive setup and customization guides</li>
      <li><strong>Component Playground</strong> — Interactive component showcase</li>
    </ul>
    <p>
      If you&apos;re interested in Pulse or want to collaborate, feel free to reach out.
      I&apos;m always open to feedback and new opportunities.
    </p>
  </div>
)

// ============================================================================
// RELATED POSTS
// ============================================================================

const RelatedPosts = () => {
  const t = useTranslations('blog')
  const authorGradients: Record<string, string> = {
    AA: 'from-primary-400 to-primary-600',
  }

  const categoryColors: Record<string, string> = {
    Product: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400',
    Engineering: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Design: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    Company: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  }

  return (
    <RevealSection>
      <section className="py-16 md:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 scroll-reveal">
            {t('relatedPosts')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post, i) => {
              const badgeColor = categoryColors[post.category] || categoryColors.Product || ''
              const gradient = authorGradients[post.author.initials] || 'from-primary-400 to-primary-600'
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <div
                    className={cn(
                      'scroll-reveal-scale group overflow-hidden rounded-xl border',
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
                      'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                    )}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
                      <div className="absolute bottom-3 left-3">
                        <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeColor)}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn('h-7 w-7 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-semibold', gradient)}>
                            {post.author.initials}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{post.author.name}</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" />{post.readTime} {t('minRead')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// BLOG POST PAGE
// ============================================================================

export default function BlogPostPage() {
  const t = useTranslations('blog')

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary-600 dark:text-primary-400 font-medium">{postData.category}</span>
          </nav>

          {/* Category badge */}
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 mb-4">
            {postData.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {postData.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-3xl">
            {postData.excerpt}
          </p>

          {/* Author + meta */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                {postData.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{postData.author.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{postData.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{postData.publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{postData.readTime} {t('minRead')}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Link2, label: t('copyLink') },
              ].map((s) => (
                <button
                  key={s.label}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured image — Pulse Dashboard Mockup */}
      <section className="pb-10 md:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-primary-500/10 dark:shadow-primary-500/5 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-slate-100/80 dark:bg-slate-700/50">
                  <LayoutDashboard className="h-3 w-3 text-primary-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pulse Dashboard</span>
                </div>
              </div>
              <div className="w-16" />
            </div>

            <div className="flex">
              {/* Mini Sidebar */}
              <div className="hidden sm:flex w-12 md:w-14 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex-col items-center py-4 gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                {[LayoutDashboard, BarChart3, Users, MessageSquare, Calendar, Settings].map((Icon, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      i === 0
                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-500'
                        : 'text-slate-400 dark:text-slate-600'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-3 md:p-5 min-w-0">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="h-2 w-24 md:w-32 rounded bg-slate-200 dark:bg-slate-700 mb-1.5" />
                    <div className="h-1.5 w-16 md:w-20 rounded bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600" />
                  </div>
                </div>

                {/* 4 Stat cards */}
                <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
                  {[
                    { value: '2.4K', color: 'from-primary-400 to-primary-600', icon: Users },
                    { value: '$12K', color: 'from-emerald-400 to-emerald-600', icon: TrendingUp },
                    { value: '96', color: 'from-blue-400 to-blue-600', icon: Puzzle },
                    { value: '99%', color: 'from-amber-400 to-amber-600', icon: Activity },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:p-3">
                      <div className={cn('w-5 h-5 md:w-6 md:h-6 rounded-md bg-gradient-to-br flex items-center justify-center mb-1.5 md:mb-2', stat.color)}>
                        <stat.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                      </div>
                      <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-none">{stat.value}</div>
                      <div className="h-1 w-8 rounded bg-slate-100 dark:bg-slate-800 mt-1" />
                    </div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  <div className="col-span-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:p-3">
                    <div className="h-1.5 w-16 rounded bg-slate-200 dark:bg-slate-700 mb-2 md:mb-3" />
                    <div className="flex items-end gap-1 md:gap-1.5 h-14 md:h-20">
                      {[40, 65, 85, 55, 70, 95, 60, 75, 50, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-500 to-primary-400"
                          style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 md:p-3 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-12 h-12 md:w-16 md:h-16 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" className="stroke-primary-500" strokeWidth="3" strokeDasharray="62 26" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" className="stroke-emerald-500" strokeWidth="3" strokeDasharray="0 62 18 8" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" className="stroke-amber-500" strokeWidth="3" strokeDasharray="0 80 8 0" strokeLinecap="round" />
                    </svg>
                    <div className="flex items-center gap-1 mt-2">
                      {['bg-primary-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                          <div className={cn('w-1.5 h-1.5 rounded-full', c)} />
                          <div className="h-1 w-4 rounded bg-slate-100 dark:bg-slate-800" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom status */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-primary-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" /> Live
                </span>
                <span>16 dashboards</span>
              </div>
              <span>Pulse v2.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area with sidebar */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-[1fr_260px] gap-10 xl:gap-16">
            {/* Article */}
            <div className="mx-auto max-w-3xl xl:max-w-none">
              <ArticleContent />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <Hash className="h-4 w-4 text-slate-400" />
                  {postData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author bio */}
              <div className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {postData.author.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{postData.author.name}</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">{postData.author.role}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{postData.author.bio}</p>
                </div>
              </div>

              {/* Share bar */}
              <div className="mt-8 flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> {t('shareArticle')}
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Link2, label: t('copyLink') },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label={s.label}
                    >
                      <s.icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <TocSidebar />
          </div>
        </div>
      </section>

      {/* Related */}
      <RelatedPosts />
    </>
  )
}
