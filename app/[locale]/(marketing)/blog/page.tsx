'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Input } from '@core/primitives/Input'
import {
  Search,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
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
    if (el.classList.contains('scroll-reveal') || el.classList.contains('scroll-reveal-left') || el.classList.contains('scroll-reveal-right') || el.classList.contains('scroll-reveal-scale')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

function RevealSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

// ============================================================================
// TYPES & DATA
// ============================================================================

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  author: { name: string; initials: string }
  publishedAt: string
  readTime: number
}

const categoryColorMap: Record<string, { badge: string; dot: string }> = {
  Product: {
    badge: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400',
    dot: 'bg-primary-500',
  },
  Engineering: {
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  Design: {
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    dot: 'bg-purple-500',
  },
  Company: {
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  Tutorials: {
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
}

const featuredPost: BlogPost = {
  slug: 'introducing-pulse-2-0',
  title: 'Introducing Pulse: A Modern Dashboard Theme',
  excerpt: 'After months of development, I\'m excited to present Pulse — a complete dashboard theme built from scratch with React 19, Next.js 16, TypeScript, and Tailwind CSS v4. 96 components, 16 dashboards, and 3 languages.',
  category: 'Product',
  categoryColor: 'primary',
  author: { name: 'Andri Amaro', initials: 'AA' },
  publishedAt: 'Feb 5, 2026',
  readTime: 8,
}

const posts: BlogPost[] = [
  {
    slug: 'building-with-react-19-nextjs-16',
    title: 'Building with React 19 and Next.js 16',
    excerpt: 'Why I chose the latest React and Next.js versions for Pulse, and how Server Components and the App Router shaped the architecture.',
    category: 'Engineering',
    categoryColor: 'blue',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Feb 1, 2026',
    readTime: 12,
  },
  {
    slug: 'design-system-with-cva-tailwind',
    title: 'Design System with CVA and Tailwind CSS v4',
    excerpt: 'How I built a type-safe component system using Class Variance Authority and Tailwind CSS v4\'s native CSS variables.',
    category: 'Design',
    categoryColor: 'purple',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 28, 2026',
    readTime: 7,
  },
  {
    slug: 'creating-pulse-my-journey',
    title: 'Creating Pulse: My Journey as a Solo Developer',
    excerpt: 'The story of building a complete dashboard theme from scratch — challenges, decisions, and lessons learned along the way.',
    category: 'Company',
    categoryColor: 'amber',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 15, 2026',
    readTime: 5,
  },
  {
    slug: 'building-realtime-dashboards',
    title: 'Building Real-time Dashboards with WebSockets',
    excerpt: 'A step-by-step tutorial on creating live-updating dashboards using WebSockets and React state management.',
    category: 'Tutorials',
    categoryColor: 'emerald',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 10, 2026',
    readTime: 15,
  },
  {
    slug: 'future-of-data-visualization',
    title: 'The Future of Data Visualization',
    excerpt: 'AI-generated charts, 3D data landscapes, and natural language queries: what\'s next for how we see our data.',
    category: 'Product',
    categoryColor: 'primary',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Jan 5, 2026',
    readTime: 6,
  },
  {
    slug: 'dark-mode-premium-design',
    title: 'Designing Premium Dark Mode',
    excerpt: 'How I crafted a premium dark mode experience with glassmorphism, card glow effects, and animated gradients.',
    category: 'Engineering',
    categoryColor: 'blue',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Dec 20, 2025',
    readTime: 10,
  },
  {
    slug: '16-dashboard-templates',
    title: '16 Dashboard Templates for Every Industry',
    excerpt: 'An overview of all 16 themed dashboards included in Pulse: Finance, CRM, SaaS, Healthcare, Education, and more.',
    category: 'Company',
    categoryColor: 'amber',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Dec 15, 2025',
    readTime: 4,
  },
  {
    slug: 'implementing-i18n-nextjs',
    title: 'Implementing i18n with next-intl in Next.js',
    excerpt: 'A complete guide to adding multi-language support to your Next.js app using next-intl — with 3 languages and locale-aware routing.',
    category: 'Tutorials',
    categoryColor: 'emerald',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Dec 10, 2025',
    readTime: 20,
  },
  {
    slug: 'accessibility-in-data-visualization',
    title: 'Accessibility in Data Visualization',
    excerpt: 'Making charts and graphs accessible to everyone: screen readers, color blindness, keyboard navigation, and ARIA labels.',
    category: 'Design',
    categoryColor: 'purple',
    author: { name: 'Andri Amaro', initials: 'AA' },
    publishedAt: 'Dec 5, 2025',
    readTime: 9,
  },
]

// Gradient colors for author avatars
const authorGradients: Record<string, string> = {
  AA: 'from-primary-400 to-primary-600',
}

// ============================================================================
// HERO
// ============================================================================

const HeroSection = () => {
  const t = useTranslations('blog')

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">{t('hero.badge')}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('hero.subtitle')}
        </p>
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder={t('search')} className="pl-10" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED POST
// ============================================================================

const FeaturedPostSection = () => {
  const t = useTranslations('blog')
  const colors = categoryColorMap[featuredPost.category]
  const badgeColor = colors?.badge || 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
  const gradient = authorGradients[featuredPost.author.initials] || 'from-primary-400 to-primary-600'

  return (
    <RevealSection>
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="scroll-reveal group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Cover */}
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-20" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white shadow-sm">
                      ★ {t('featured')}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <span className={cn('inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4', badgeColor)}>
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={cn('flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br text-white text-sm font-semibold shrink-0', gradient)}>
                      {featuredPost.author.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{featuredPost.author.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{featuredPost.publishedAt}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featuredPost.readTime} {t('minRead')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// CATEGORIES + POSTS GRID
// ============================================================================

const PostsSection = () => {
  const t = useTranslations('blog')
  const [activeCategory, setActiveCategory] = React.useState('All')

  const categories: { key: string; label: string }[] = [
    { key: 'All', label: t('categories.all') },
    { key: 'Product', label: t('categories.product') },
    { key: 'Engineering', label: t('categories.engineering') },
    { key: 'Design', label: t('categories.design') },
    { key: 'Company', label: t('categories.company') },
    { key: 'Tutorials', label: t('categories.tutorials') },
  ]

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <RevealSection>
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10 scroll-reveal">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key
              const colors = categoryColorMap[cat.key]
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                >
                  {cat.key !== 'All' && colors && (
                    <span className={cn('inline-block w-2 h-2 rounded-full mr-2', colors.dot)} />
                  )}
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => {
              const colors = categoryColorMap[post.category]
              const badgeColor = colors?.badge || 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
              const gradient = authorGradients[post.author.initials] || 'from-primary-400 to-primary-600'

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <div
                    className={cn(
                      'scroll-reveal-scale group relative overflow-hidden rounded-xl border',
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
                      'hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50',
                      'hover:-translate-y-1 transition-all duration-300',
                    )}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {/* Cover */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-20" />
                      <div className="absolute bottom-3 left-3">
                        <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeColor)}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={cn('flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br text-white text-xs font-semibold shrink-0', gradient)}>
                            {post.author.initials}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-900 dark:text-white">{post.author.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.publishedAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" />
                          {post.readTime} {t('minRead')}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {t('readMore')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={cn(
                  'inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition-colors',
                  page === 1
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                {page}
              </button>
            ))}
            <span className="text-slate-400 px-1">...</span>
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
              10
            </button>
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// NEWSLETTER CTA
// ============================================================================

const NewsletterSection = () => {
  const t = useTranslations('blog')

  return (
    <RevealSection>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-scale relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-10 md:p-16 text-center noise-overlay">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 mb-6">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('newsletter.title')}
              </h2>
              <p className="text-primary-100 max-w-md mx-auto mb-8">
                {t('newsletter.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Input placeholder={t('newsletter.placeholder')} className="bg-white/10 border-white/10 text-white placeholder:text-white/50 focus:border-white/30" />
                <Button className="w-full sm:w-auto gap-2 px-6 bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30 shrink-0">
                  {t('newsletter.subscribe')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  )
}

// ============================================================================
// BLOG PAGE
// ============================================================================

export default function BlogPage() {
  return (
    <>
      <HeroSection />
      <FeaturedPostSection />
      <PostsSection />
      <NewsletterSection />
    </>
  )
}
