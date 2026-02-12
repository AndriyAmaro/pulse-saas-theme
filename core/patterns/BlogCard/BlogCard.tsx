'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Clock, ArrowRight } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor?: 'primary' | 'blue' | 'purple' | 'amber' | 'rose' | 'emerald'
  coverImage?: string
  author: {
    name: string
    avatar?: string
    initials?: string
  }
  publishedAt: string
  readTime: string
}

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
  showImage?: boolean
}

// ============================================================================
// VARIANTS
// ============================================================================

export const blogCardVariants = cva(
  'group relative overflow-hidden rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1',
        featured: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1',
        compact: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex flex-row items-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const categoryColors: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400',
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
}

// ============================================================================
// COMPONENT
// ============================================================================

export const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({ post, variant = 'default', showImage = true, className, ...props }, ref) => {
    const colorKey = post.categoryColor || 'primary'
    const badgeColor = categoryColors[colorKey] || categoryColors.primary || ''
    const initials = post.author.initials || post.author.name.split(' ').map(n => n[0]).join('')

    if (variant === 'featured') {
      return (
        <div ref={ref} className={cn(blogCardVariants({ variant }), className)} {...props}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white shadow-sm">
                  ★ Featured
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <span className={cn('inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4', badgeColor)}>
                {post.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 text-base leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-sm font-semibold shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{post.author.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{post.publishedAt}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (variant === 'compact') {
      return (
        <div ref={ref} className={cn(blogCardVariants({ variant }), 'p-4 gap-4', className)} {...props}>
          <div className="shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span>{post.publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(blogCardVariants({ variant }), className)} {...props}>
        {showImage && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20 dark:from-primary-500/30 dark:via-primary-400/20 dark:to-accent-500/30" />
            <div className="absolute bottom-3 left-3">
              <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeColor)}>
                {post.category}
              </span>
            </div>
          </div>
        )}
        <div className="p-5">
          {!showImage && (
            <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3', badgeColor)}>
              {post.category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-xs font-semibold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white">{post.author.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.publishedAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    )
  }
)

BlogCard.displayName = 'BlogCard'
