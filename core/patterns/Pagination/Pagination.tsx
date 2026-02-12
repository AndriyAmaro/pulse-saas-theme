'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const paginationVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const paginationItemVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 min-w-7 px-2 text-xs',
        md: 'h-9 min-w-9 px-3 text-sm',
        lg: 'h-11 min-w-11 px-4 text-base',
      },
      variant: {
        default: [
          'bg-transparent text-[var(--text-secondary)]',
          'hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
        ],
        active: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
        ],
        outline: [
          'border border-[var(--border-default)] bg-transparent text-[var(--text-secondary)]',
          'hover:bg-[var(--bg-muted)] hover:border-[var(--secondary-400)]',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showFirstLast?: boolean
  showPrevNext?: boolean
}

function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 3
  const totalBlocks = totalNumbers + 2

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftEllipsis = leftSiblingIndex > 2
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, 'ellipsis', totalPages]
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    )
    return [1, 'ellipsis', ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages]
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      size,
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = false,
      showPrevNext = true,
      ...props
    },
    ref
  ) => {
    const paginationRange = generatePaginationRange(
      currentPage,
      totalPages,
      siblingCount
    )

    const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(paginationVariants({ size }), className)}
        {...props}
      >
        {showFirstLast && (
          <button
            className={cn(paginationItemVariants({ size, variant: 'default' }))}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            <ChevronLeft className={cn(iconSize, '-mr-1')} />
            <ChevronLeft className={cn(iconSize, '-ml-1')} />
          </button>
        )}

        {showPrevNext && (
          <button
            className={cn(paginationItemVariants({ size, variant: 'default' }))}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className={iconSize} />
          </button>
        )}

        {paginationRange.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                paginationItemVariants({ size, variant: 'default' }),
                'pointer-events-none'
              )}
              aria-hidden="true"
            >
              <MoreHorizontal className={iconSize} />
            </span>
          ) : (
            <button
              key={page}
              className={cn(
                paginationItemVariants({
                  size,
                  variant: currentPage === page ? 'active' : 'default',
                })
              )}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          )
        )}

        {showPrevNext && (
          <button
            className={cn(paginationItemVariants({ size, variant: 'default' }))}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className={iconSize} />
          </button>
        )}

        {showFirstLast && (
          <button
            className={cn(paginationItemVariants({ size, variant: 'default' }))}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
          >
            <ChevronRight className={cn(iconSize, '-mr-1')} />
            <ChevronRight className={cn(iconSize, '-ml-1')} />
          </button>
        )}
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'

export { Pagination, paginationVariants, paginationItemVariants }
