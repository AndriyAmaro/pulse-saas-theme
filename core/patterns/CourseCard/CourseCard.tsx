'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Play,
  Clock,
  BookOpen,
  User,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const courseCardVariants = cva(
  [
    'group relative overflow-hidden rounded-xl border',
    'bg-white dark:bg-slate-900',
    'border-slate-200 dark:border-slate-700',
    'transition-all duration-300',
    'hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/5',
    'hover:-translate-y-1',
  ],
  {
    variants: {
      variant: {
        default: '',
        featured: 'ring-2 ring-purple-400 dark:ring-purple-500',
        compact: 'flex flex-row',
        minimal: 'border-0 shadow-none hover:shadow-none hover:translate-y-0 bg-slate-50 dark:bg-slate-800/50',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export type CourseStatus = 'not-started' | 'in-progress' | 'completed'
export type CourseCategory = 'development' | 'design' | 'business' | 'marketing' | 'data-science' | 'other'

export interface CourseCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof courseCardVariants> {
  thumbnail?: string
  thumbnailIcon?: React.ReactNode
  thumbnailGradient?: string
  title: string
  instructor: {
    name: string
    avatar?: string
  }
  progress?: number
  totalLessons: number
  completedLessons?: number
  duration: string
  remainingTime?: string
  rating?: number
  studentsEnrolled?: number
  category?: CourseCategory
  status?: CourseStatus
  isNew?: boolean
  isPopular?: boolean
  onContinueClick?: () => void
  onEnrollClick?: () => void
}

// Progress Ring Component
const ProgressRing = ({ progress, size = 48 }: { progress: number; size?: number }) => {
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-purple-500 dark:text-purple-400 transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

const categoryColors: Record<CourseCategory, string> = {
  development: 'from-blue-500 to-cyan-400',
  design: 'from-pink-500 to-rose-400',
  business: 'from-emerald-500 to-teal-400',
  marketing: 'from-orange-500 to-amber-400',
  'data-science': 'from-purple-500 to-violet-400',
  other: 'from-slate-500 to-slate-400',
}

const categoryLabels: Record<CourseCategory, string> = {
  development: 'Development',
  design: 'Design',
  business: 'Business',
  marketing: 'Marketing',
  'data-science': 'Data Science',
  other: 'Other',
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
  (
    {
      className,
      variant,
      size,
      thumbnail,
      thumbnailIcon,
      thumbnailGradient,
      title,
      instructor,
      progress = 0,
      totalLessons,
      completedLessons = 0,
      duration,
      remainingTime,
      rating,
      studentsEnrolled,
      category = 'other',
      status = 'not-started',
      isNew = false,
      isPopular = false,
      onContinueClick,
      onEnrollClick,
      ...props
    },
    ref
  ) => {
    const isCompleted = status === 'completed' || progress >= 100
    const isInProgress = status === 'in-progress' || (progress > 0 && progress < 100)
    const almostComplete = progress >= 75 && progress < 100

    return (
      <div
        ref={ref}
        className={cn(courseCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* Thumbnail Section */}
        <div
          className={cn(
            'relative aspect-video overflow-hidden',
            thumbnail
              ? 'bg-slate-100 dark:bg-slate-800'
              : `bg-gradient-to-br ${thumbnailGradient || categoryColors[category]}`
          )}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              {thumbnailIcon || <BookOpen className="h-12 w-12 text-white/80" />}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isNew && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500 text-white shadow-lg">
                New
              </span>
            )}
            {isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white shadow-lg">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </span>
            )}
            {almostComplete && !isCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500 text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                Almost there!
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500 text-white shadow-lg">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            )}
          </div>

          {/* Play Button Overlay */}
          {isInProgress && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onContinueClick?.()
                }}
                className="p-4 rounded-full bg-white shadow-xl hover:scale-110 transition-transform"
              >
                <Play className="h-6 w-6 text-purple-600 fill-current" />
              </button>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
            {duration}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
              {instructor.avatar ? (
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {instructor.name}
            </span>
          </div>

          {/* Progress Section (if in progress) */}
          {isInProgress && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <ProgressRing progress={progress} size={44} />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {completedLessons} of {totalLessons} lessons
                  </p>
                  {remainingTime && (
                    <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      {remainingTime} remaining
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onContinueClick?.()
                }}
                className="px-3 py-1.5 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Rating & Students (if not in progress) */}
          {!isInProgress && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                {rating !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {studentsEnrolled !== undefined && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {studentsEnrolled.toLocaleString()} students
                  </span>
                )}
              </div>
              {onEnrollClick && !isCompleted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEnrollClick()
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Enroll
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Category Tag */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
                'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              )}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {categoryLabels[category]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {totalLessons} lessons
            </span>
          </div>
        </div>
      </div>
    )
  }
)

CourseCard.displayName = 'CourseCard'

export { CourseCard, courseCardVariants, ProgressRing }
