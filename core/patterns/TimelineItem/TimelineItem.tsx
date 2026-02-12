'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

export interface TimelineEntry {
  year: string
  title: string
  description: string
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineEntry[]
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: TimelineEntry
  isLast?: boolean
  index?: number
}

export const timelineItemVariants = cva('relative pl-8 md:pl-12 pb-10 last:pb-0')

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ item, isLast = false, index = 0, className, ...props }, ref) => (
    <div ref={ref} className={cn(timelineItemVariants(), className)} {...props}>
      {!isLast && (
        <div className="absolute left-[11px] md:left-[19px] top-6 bottom-0 w-px bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-600 dark:to-primary-900" />
      )}
      <div className="absolute left-0 md:left-2 top-1">
        <div className="h-6 w-6 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 shadow-md shadow-primary-500/20" />
      </div>
      <div className="group">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 mb-2">
          {item.year}
        </span>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </div>
  )
)

TimelineItem.displayName = 'TimelineItem'

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, className, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {items.map((item, i) => (
        <TimelineItem key={item.year} item={item} isLast={i === items.length - 1} index={i} />
      ))}
    </div>
  )
)

Timeline.displayName = 'Timeline'
