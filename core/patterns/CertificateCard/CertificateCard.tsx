'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  CheckCircle,
  Medal
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const certificateCardVariants = cva(
  [
    'group relative overflow-hidden rounded-xl',
    'transition-all duration-300',
    'hover:shadow-xl hover:-translate-y-1',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gradient-to-br from-white via-white to-purple-50',
          'dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/30',
          'border-2 border-purple-200 dark:border-purple-800/50',
        ],
        gold: [
          'bg-gradient-to-br from-amber-50 via-white to-amber-50',
          'dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/30',
          'border-2 border-amber-300 dark:border-amber-700/50',
        ],
        platinum: [
          'bg-gradient-to-br from-slate-50 via-white to-slate-100',
          'dark:from-slate-800 dark:via-slate-900 dark:to-slate-800',
          'border-2 border-slate-300 dark:border-slate-600',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface CertificateCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof certificateCardVariants> {
  courseName: string
  issueDate: string
  credentialId?: string
  instructorName?: string
  organizationName?: string
  organizationLogo?: string
  recipientName?: string
  skills?: string[]
  onDownload?: () => void
  onShare?: () => void
  onView?: () => void
  verified?: boolean
}

const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  (
    {
      className,
      variant,
      size,
      courseName,
      issueDate,
      credentialId,
      instructorName,
      organizationName = 'Pulse Academy',
      organizationLogo,
      recipientName,
      skills = [],
      onDownload,
      onShare,
      onView,
      verified = true,
      ...props
    },
    ref
  ) => {
    const iconColor = variant === 'gold'
      ? 'text-amber-500 dark:text-amber-400'
      : variant === 'platinum'
        ? 'text-slate-500 dark:text-slate-400'
        : 'text-purple-500 dark:text-purple-400'

    const borderPattern = variant === 'gold'
      ? 'border-amber-300/50 dark:border-amber-700/30'
      : variant === 'platinum'
        ? 'border-slate-300/50 dark:border-slate-600/30'
        : 'border-purple-200/50 dark:border-purple-700/30'

    return (
      <div
        ref={ref}
        className={cn(certificateCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* Decorative Corner Elements */}
        <div className={cn(
          'absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-xl',
          borderPattern
        )} />
        <div className={cn(
          'absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 rounded-tr-xl',
          borderPattern
        )} />
        <div className={cn(
          'absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 rounded-bl-xl',
          borderPattern
        )} />
        <div className={cn(
          'absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-xl',
          borderPattern
        )} />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {organizationLogo ? (
                <img
                  src={organizationLogo}
                  alt={organizationName}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  variant === 'gold'
                    ? 'bg-amber-100 dark:bg-amber-900/30'
                    : variant === 'platinum'
                      ? 'bg-slate-100 dark:bg-slate-800'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                )}>
                  <Award className={cn('h-5 w-5', iconColor)} />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Certificate of Completion
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {organizationName}
                </p>
              </div>
            </div>

            {verified && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium">
                <CheckCircle className="h-3 w-3" />
                Verified
              </div>
            )}
          </div>

          {/* Medal Icon */}
          <div className="flex justify-center py-4">
            <div className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center',
              'shadow-lg',
              variant === 'gold'
                ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                : variant === 'platinum'
                  ? 'bg-gradient-to-br from-slate-300 to-slate-500'
                  : 'bg-gradient-to-br from-purple-400 to-purple-600'
            )}>
              <Medal className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Course Name */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {courseName}
            </h3>
            {recipientName && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Awarded to <span className="font-semibold">{recipientName}</span>
              </p>
            )}
            {instructorName && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instructor: {instructorName}
              </p>
            )}
          </div>

          {/* Issue Date & Credential */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {issueDate}
            </div>
            {credentialId && (
              <div className="font-mono">
                ID: {credentialId}
              </div>
            )}
          </div>

          {/* Skills Tags */}
          {skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    'px-2 py-0.5 text-xs font-medium rounded-full',
                    variant === 'gold'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                      : variant === 'platinum'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            {onDownload && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDownload()
                }}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
                  'text-slate-700 dark:text-slate-300'
                )}
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            )}
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onShare()
                }}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
                  'text-slate-700 dark:text-slate-300'
                )}
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            )}
            {onView && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onView()
                }}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  variant === 'gold'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : variant === 'platinum'
                      ? 'bg-slate-500 hover:bg-slate-600 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                )}
              >
                <ExternalLink className="h-4 w-4" />
                View
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

CertificateCard.displayName = 'CertificateCard'

export { CertificateCard, certificateCardVariants }
