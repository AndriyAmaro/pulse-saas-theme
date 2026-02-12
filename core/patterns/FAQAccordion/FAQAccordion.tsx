'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Input } from '@core/primitives/Input'
import { ChevronDown, Plus, Minus, Search } from 'lucide-react'

// ============================================================================
// FAQ ACCORDION - Frequently Asked Questions Component
// ============================================================================

const faqAccordionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        bordered: '',
        separated: 'space-y-3',
      },
      columns: {
        1: '',
        2: 'md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      columns: 1,
    },
  }
)

const faqItemVariants = cva(
  'group',
  {
    variants: {
      variant: {
        default: 'border-b border-slate-200 dark:border-slate-700',
        bordered: [
          'border border-slate-200 dark:border-slate-700',
          'rounded-lg mb-3 last:mb-0',
        ],
        separated: [
          'bg-slate-50 dark:bg-slate-800/50',
          'rounded-xl border border-slate-200 dark:border-slate-700',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export interface FAQItem {
  /** Unique identifier */
  id?: string
  /** The question */
  question: string
  /** The answer (can be string or React node) */
  answer: string | React.ReactNode
  /** Category for filtering */
  category?: string
}

export interface FAQCategory {
  /** Category key */
  key: string
  /** Display label */
  label: string
  /** Icon (optional) */
  icon?: React.ReactNode
}

export interface FAQAccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof faqAccordionVariants> {
  /** FAQ items */
  items: FAQItem[]
  /** Available categories (enables tabs) */
  categories?: FAQCategory[]
  /** Enable search functionality */
  searchable?: boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Icon style: plus-minus or chevron */
  iconStyle?: 'plus-minus' | 'chevron'
  /** Allow multiple items open */
  allowMultiple?: boolean
  /** Default open item ids */
  defaultOpenItems?: string[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Section description */
  description?: string
}

// ============================================================================
// Category Tabs Component
// ============================================================================

interface CategoryTabsProps {
  categories: FAQCategory[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full',
              'text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              activeCategory === category.key
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            )}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Search Bar Component
// ============================================================================

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const FAQSearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="relative mb-8 max-w-md mx-auto md:mx-0">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search questions...'}
        className={cn(
          'w-full pl-11 pr-4 py-3',
          'rounded-xl border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-800',
          'text-slate-900 dark:text-white',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200'
        )}
      />
    </div>
  )
}

// ============================================================================
// FAQ Item Component
// ============================================================================

interface FAQItemComponentProps {
  item: FAQItem
  index: number
  variant: VariantProps<typeof faqItemVariants>['variant']
  iconStyle: 'plus-minus' | 'chevron'
}

const FAQItemComponent = React.forwardRef<
  HTMLDivElement,
  FAQItemComponentProps
>(({ item, index, variant, iconStyle }, ref) => {
  const itemId = item.id || `faq-${index}`

  return (
    <AccordionPrimitive.Item
      ref={ref}
      value={itemId}
      className={cn(faqItemVariants({ variant }))}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            'flex flex-1 items-center justify-between gap-4',
            'py-4 md:py-5 px-4 md:px-6',
            'text-left text-base md:text-lg font-medium',
            'text-slate-900 dark:text-white',
            'transition-colors',
            'hover:text-primary-600 dark:hover:text-primary-400',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
            '[&[data-state=open]>svg]:rotate-180',
            iconStyle === 'plus-minus' && '[&[data-state=open]>.icon-plus]:hidden [&[data-state=open]>.icon-minus]:block [&[data-state=closed]>.icon-minus]:hidden'
          )}
        >
          <span className="flex-1">{item.question}</span>

          {iconStyle === 'chevron' ? (
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300" />
          ) : (
            <>
              <Plus className="icon-plus h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200" />
              <Minus className="icon-minus h-5 w-5 shrink-0 text-primary-500 transition-transform duration-200" />
            </>
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden',
          'data-[state=closed]:animate-accordion-up',
          'data-[state=open]:animate-accordion-down'
        )}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          {typeof item.answer === 'string' ? (
            <p>{item.answer}</p>
          ) : (
            item.answer
          )}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
})
FAQItemComponent.displayName = 'FAQItemComponent'

// ============================================================================
// FAQ Header Component
// ============================================================================

interface FAQHeaderProps {
  title?: string
  subtitle?: string
  description?: string
}

const FAQHeader = ({ title, subtitle, description }: FAQHeaderProps) => {
  if (!title && !subtitle && !description) return null

  return (
    <div className="mb-10 md:mb-12 text-center">
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// No Results Component
// ============================================================================

const NoResults = ({ query }: { query: string }) => (
  <div className="py-12 text-center">
    <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
    <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
      No questions found
    </h3>
    <p className="mt-2 text-slate-500 dark:text-slate-400">
      No results for &quot;{query}&quot;. Try a different search term.
    </p>
  </div>
)

// ============================================================================
// Main FAQ Accordion Component
// ============================================================================

const FAQAccordion = React.forwardRef<HTMLDivElement, FAQAccordionProps>(
  (
    {
      className,
      variant = 'default',
      columns = 1,
      items,
      categories,
      searchable = false,
      searchPlaceholder,
      iconStyle = 'plus-minus',
      allowMultiple = false,
      defaultOpenItems,
      title,
      subtitle,
      description,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [activeCategory, setActiveCategory] = React.useState<string>(
      categories?.[0]?.key || 'all'
    )

    // Filter items based on search and category
    const filteredItems = React.useMemo(() => {
      let result = items

      // Filter by category
      if (categories && activeCategory && activeCategory !== 'all') {
        result = result.filter((item) => item.category === activeCategory)
      }

      // Filter by search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        result = result.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            (typeof item.answer === 'string' &&
              item.answer.toLowerCase().includes(query))
        )
      }

      return result
    }, [items, categories, activeCategory, searchQuery])

    // Split items for 2 columns
    const splitItems = React.useMemo(() => {
      if (columns !== 2) return { left: filteredItems, right: [] }

      const mid = Math.ceil(filteredItems.length / 2)
      return {
        left: filteredItems.slice(0, mid),
        right: filteredItems.slice(mid),
      }
    }, [filteredItems, columns])

    // Accordion props
    const accordionProps = allowMultiple
      ? { type: 'multiple' as const, defaultValue: defaultOpenItems || [] }
      : { type: 'single' as const, collapsible: true, defaultValue: defaultOpenItems?.[0] }

    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQHeader
            title={title}
            subtitle={subtitle}
            description={description}
          />

          {/* Search */}
          {searchable && (
            <FAQSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
            />
          )}

          {/* Category Tabs */}
          {categories && categories.length > 0 && (
            <CategoryTabs
              categories={[{ key: 'all', label: 'All' }, ...categories]}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}

          {/* FAQ Items */}
          {filteredItems.length === 0 && searchQuery ? (
            <NoResults query={searchQuery} />
          ) : columns === 2 ? (
            <div className={cn(faqAccordionVariants({ variant, columns }))}>
              {/* Left Column */}
              <AccordionPrimitive.Root {...accordionProps} className="space-y-0">
                {splitItems.left.map((item, index) => (
                  <FAQItemComponent
                    key={item.id || index}
                    item={item}
                    index={index}
                    variant={variant}
                    iconStyle={iconStyle}
                  />
                ))}
              </AccordionPrimitive.Root>

              {/* Right Column */}
              <AccordionPrimitive.Root {...accordionProps} className="space-y-0">
                {splitItems.right.map((item, index) => (
                  <FAQItemComponent
                    key={item.id || `right-${index}`}
                    item={item}
                    index={splitItems.left.length + index}
                    variant={variant}
                    iconStyle={iconStyle}
                  />
                ))}
              </AccordionPrimitive.Root>
            </div>
          ) : (
            <AccordionPrimitive.Root
              {...accordionProps}
              className={cn(faqAccordionVariants({ variant, columns }))}
            >
              {filteredItems.map((item, index) => (
                <FAQItemComponent
                  key={item.id || index}
                  item={item}
                  index={index}
                  variant={variant}
                  iconStyle={iconStyle}
                />
              ))}
            </AccordionPrimitive.Root>
          )}
        </div>
      </section>
    )
  }
)
FAQAccordion.displayName = 'FAQAccordion'

// ============================================================================
// Exports
// ============================================================================

export { FAQAccordion, faqAccordionVariants, faqItemVariants }
