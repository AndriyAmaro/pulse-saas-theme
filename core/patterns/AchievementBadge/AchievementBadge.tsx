'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Trophy,
  Flame,
  Brain,
  Moon,
  Star,
  Zap,
  Target,
  Crown,
  Rocket,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const achievementBadgeVariants = cva(
  [
    'relative overflow-hidden rounded-2xl',
    'transition-all duration-300',
    'flex flex-col items-center justify-center text-center',
  ],
  {
    variants: {
      variant: {
        default: 'bg-slate-100 dark:bg-slate-800',
        bronze: 'bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-900/50 dark:to-orange-700/50',
        silver: 'bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-600',
        gold: 'bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-900/50 dark:to-amber-700/50',
        platinum: 'bg-gradient-to-br from-purple-200 to-purple-400 dark:from-purple-900/50 dark:to-purple-700/50',
        legendary: 'bg-gradient-to-br from-rose-300 via-purple-400 to-cyan-400 dark:from-rose-900/50 dark:via-purple-900/50 dark:to-cyan-900/50',
      },
      size: {
        sm: 'w-20 h-20 p-2',
        md: 'w-28 h-28 p-3',
        lg: 'w-36 h-36 p-4',
        xl: 'w-44 h-44 p-5',
      },
      state: {
        earned: 'hover:scale-105 hover:shadow-lg cursor-pointer',
        locked: 'grayscale opacity-60 cursor-not-allowed',
        progress: 'opacity-90',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'earned',
    },
  }
)

export type AchievementType =
  | 'first-course'
  | 'streak-7'
  | 'streak-30'
  | 'quiz-master'
  | 'night-owl'
  | 'early-bird'
  | 'fast-learner'
  | 'perfectionist'
  | 'explorer'
  | 'bookworm'
  | 'dedicated'
  | 'champion'
  | 'legend'
  | 'custom'

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary'

export interface AchievementBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof achievementBadgeVariants> {
  type?: AchievementType
  customIcon?: React.ReactNode
  title: string
  description?: string
  earnedDate?: string
  progress?: number // 0-100 for progress state
  tier?: AchievementTier
  locked?: boolean
  showDetails?: boolean
  onBadgeClick?: () => void
}

const achievementIcons: Record<AchievementType, React.ElementType> = {
  'first-course': Trophy,
  'streak-7': Flame,
  'streak-30': Flame,
  'quiz-master': Brain,
  'night-owl': Moon,
  'early-bird': Star,
  'fast-learner': Zap,
  perfectionist: Target,
  explorer: Rocket,
  bookworm: BookOpen,
  dedicated: Clock,
  champion: Crown,
  legend: Award,
  custom: Star,
}

const achievementEmojis: Record<AchievementType, string> = {
  'first-course': '🏆',
  'streak-7': '🔥',
  'streak-30': '🔥',
  'quiz-master': '🧠',
  'night-owl': '🦉',
  'early-bird': '🌅',
  'fast-learner': '⚡',
  perfectionist: '🎯',
  explorer: '🚀',
  bookworm: '📚',
  dedicated: '⏰',
  champion: '👑',
  legend: '🏅',
  custom: '⭐',
}

const tierColors: Record<AchievementTier, string> = {
  bronze: 'from-orange-400 to-orange-600',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-amber-300 to-amber-500',
  platinum: 'from-purple-400 to-purple-600',
  legendary: 'from-rose-400 via-purple-500 to-cyan-400',
}

const AchievementBadge = React.forwardRef<HTMLDivElement, AchievementBadgeProps>(
  (
    {
      className,
      variant,
      size,
      state,
      type = 'custom',
      customIcon,
      title,
      description,
      earnedDate,
      progress,
      tier,
      locked = false,
      showDetails = true,
      onBadgeClick,
      ...props
    },
    ref
  ) => {
    const Icon = achievementIcons[type]
    const emoji = achievementEmojis[type]
    const effectiveState = locked ? 'locked' : progress !== undefined && progress < 100 ? 'progress' : state
    const effectiveVariant = tier || variant || 'default'

    const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : size === 'xl' ? 'h-12 w-12' : 'h-8 w-8'
    const emojiSize = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : size === 'xl' ? 'text-5xl' : 'text-3xl'
    const titleSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : size === 'xl' ? 'text-base' : 'text-xs'

    return (
      <div
        ref={ref}
        className={cn(
          achievementBadgeVariants({ variant: effectiveVariant as any, size, state: effectiveState }),
          className
        )}
        onClick={() => !locked && onBadgeClick?.()}
        {...props}
      >
        {/* Locked Overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl z-10">
            <Lock className="h-6 w-6 text-white/80" />
          </div>
        )}

        {/* Progress Ring (for in-progress badges) */}
        {progress !== undefined && progress < 100 && !locked && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-white/30"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.89} ${289 - progress * 2.89}`}
              className="text-white transition-all duration-500"
            />
          </svg>
        )}

        {/* Badge Content */}
        <div className="relative z-5 flex flex-col items-center gap-1">
          {/* Icon/Emoji */}
          <div className="mb-1">
            {customIcon ? (
              customIcon
            ) : (
              <span className={emojiSize}>{emoji}</span>
            )}
          </div>

          {/* Title */}
          {showDetails && (
            <span className={cn(
              'font-bold leading-tight',
              titleSize,
              effectiveVariant === 'default'
                ? 'text-slate-700 dark:text-slate-200'
                : 'text-white dark:text-white/90',
              'drop-shadow-sm'
            )}>
              {title}
            </span>
          )}

          {/* Progress Text */}
          {progress !== undefined && progress < 100 && showDetails && !locked && (
            <span className={cn(
              'text-[10px] font-medium',
              effectiveVariant === 'default'
                ? 'text-slate-500 dark:text-slate-400'
                : 'text-white/80'
            )}>
              {progress}%
            </span>
          )}

          {/* Earned Checkmark */}
          {effectiveState === 'earned' && (progress === undefined || progress >= 100) && !locked && (
            <CheckCircle2 className={cn(
              'absolute -top-1 -right-1 h-5 w-5 p-0.5 rounded-full bg-white dark:bg-slate-900',
              'text-green-500 dark:text-green-400'
            )} />
          )}
        </div>

        {/* Shine Effect on Hover (for earned badges) */}
        {effectiveState === 'earned' && !locked && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
      </div>
    )
  }
)

AchievementBadge.displayName = 'AchievementBadge'

// Achievement Grid Component for displaying multiple badges
export interface AchievementGridProps extends React.HTMLAttributes<HTMLDivElement> {
  achievements: AchievementBadgeProps[]
  columns?: 2 | 3 | 4 | 5 | 6
  size?: 'sm' | 'md' | 'lg'
}

const AchievementGrid = React.forwardRef<HTMLDivElement, AchievementGridProps>(
  ({ className, achievements, columns = 4, size = 'md', ...props }, ref) => {
    const gridCols = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }

    return (
      <div
        ref={ref}
        className={cn('grid gap-4', gridCols[columns], className)}
        {...props}
      >
        {achievements.map((achievement, index) => (
          <AchievementBadge key={index} {...achievement} size={size} />
        ))}
      </div>
    )
  }
)

AchievementGrid.displayName = 'AchievementGrid'

export { AchievementBadge, AchievementGrid, achievementBadgeVariants }
