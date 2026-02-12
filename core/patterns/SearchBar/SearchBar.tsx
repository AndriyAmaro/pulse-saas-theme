'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const searchBarVariants = cva(
  [
    'flex items-center gap-2 rounded-lg border bg-[var(--bg-base)]',
    'transition-all duration-150',
    'focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      variant: {
        default: 'border-[var(--border-default)]',
        filled: 'border-transparent bg-[var(--bg-muted)]',
        ghost: 'border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof searchBarVariants> {
  onSearch?: (value: string) => void
  onClear?: () => void
  loading?: boolean
  showClearButton?: boolean
  debounceMs?: number
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      size,
      variant,
      onSearch,
      onClear,
      loading = false,
      showClearButton = true,
      debounceMs = 300,
      value,
      onChange,
      placeholder = 'Search...',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || '')
    const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(e)

      if (onSearch) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
          onSearch(newValue)
        }, debounceMs)
      }
    }

    const handleClear = () => {
      setInternalValue('')
      onClear?.()
      onSearch?.('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        onSearch(internalValue as string)
      }
      if (e.key === 'Escape') {
        handleClear()
      }
    }

    const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

    return (
      <div className={cn(searchBarVariants({ size, variant }), className)}>
        <div className="flex-shrink-0 text-[var(--text-muted)]">
          {loading ? (
            <Loader2 className={cn(iconSize, 'animate-spin')} />
          ) : (
            <Search className={iconSize} />
          )}
        </div>

        <input
          ref={ref}
          type="search"
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent outline-none',
            'placeholder:text-[var(--text-muted)]',
            'text-[var(--text-primary)]',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
          aria-label={placeholder}
          {...props}
        />

        {showClearButton && internalValue && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'flex-shrink-0 rounded-sm p-0.5',
              'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              'transition-colors duration-150'
            )}
            aria-label="Clear search"
          >
            <X className={iconSize} />
          </button>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export { SearchBar, searchBarVariants }
