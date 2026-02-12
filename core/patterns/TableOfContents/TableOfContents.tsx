'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { List } from 'lucide-react'

export interface TocItem {
  id: string
  title: string
  level?: number
}

export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[]
  title?: string
  sticky?: boolean
}

export const tocVariants = cva(
  'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5'
)

export const TableOfContents = React.forwardRef<HTMLElement, TableOfContentsProps>(
  ({ items, title = 'Table of Contents', sticky = true, className, ...props }, ref) => {
    const [activeId, setActiveId] = React.useState<string>('')

    React.useEffect(() => {
      const observers: IntersectionObserver[] = []

      items.forEach((item) => {
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

      return () => observers.forEach((obs) => obs.disconnect())
    }, [items])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
        setActiveId(id)
      }
    }

    return (
      <nav
        ref={ref}
        className={cn(tocVariants(), sticky && 'md:sticky md:top-24', className)}
        aria-label="Table of contents"
        {...props}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <List className="h-4 w-4 text-primary-500" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = activeId === item.id
            const level = item.level || 1
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    'block py-1.5 text-sm rounded-md transition-all duration-200',
                    level === 1 && 'pl-3',
                    level === 2 && 'pl-6',
                    level === 3 && 'pl-9',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className={cn('w-1 h-1 rounded-full shrink-0', isActive ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600')} />
                    {item.title}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)

TableOfContents.displayName = 'TableOfContents'
