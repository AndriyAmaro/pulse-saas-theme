'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@shared/utils/cn'

// ============ TYPES ============

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  keywords?: string[]
  onSelect: () => void
  disabled?: boolean
}

export interface CommandGroup {
  id: string
  label: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  groups: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  className?: string
  overlayClassName?: string
  // Keyboard shortcut to open
  shortcut?: string
  disableShortcut?: boolean
  // Callbacks
  onSearch?: (query: string) => void
  onSelect?: (item: CommandItem) => void
}

// ============ CONTEXT ============

interface CommandPaletteContextValue {
  search: string
  setSearch: (value: string) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  flatItems: CommandItem[]
  onSelect: (item: CommandItem) => void
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null)

function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext)
  if (!context) {
    throw new Error('useCommandPalette must be used within CommandPalette')
  }
  return context
}

// ============ VARIANTS ============

const commandItemVariants = cva(
  [
    'flex items-center gap-3 rounded-lg px-3 py-2.5',
    'cursor-pointer select-none',
    'transition-colors duration-fast',
    'text-sm text-[var(--text-primary)]',
  ],
  {
    variants: {
      selected: {
        true: 'bg-primary-500 text-white',
        false: 'hover:bg-[var(--bg-muted)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
)

// ============ HELPER FUNCTIONS ============

function filterItems(groups: CommandGroup[], search: string): CommandGroup[] {
  if (!search) return groups

  const searchLower = search.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const labelMatch = item.label.toLowerCase().includes(searchLower)
        const descMatch = item.description?.toLowerCase().includes(searchLower)
        const keywordsMatch = item.keywords?.some((k) => k.toLowerCase().includes(searchLower))
        return labelMatch || descMatch || keywordsMatch
      }),
    }))
    .filter((group) => group.items.length > 0)
}

function getFlatItems(groups: CommandGroup[]): CommandItem[] {
  return groups.flatMap((group) => group.items)
}

// ============ SUB-COMPONENTS ============

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const { search, setSearch } = useCommandPalette()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearch(value)
      onValueChange?.(value)
    }

    return (
      <div className="flex items-center gap-3 border-b border-[var(--border-default)] px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-[var(--text-muted)]" />
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={handleChange}
          className={cn(
            'flex-1 bg-transparent text-base',
            'placeholder:text-[var(--text-muted)]',
            'focus:outline-none',
            'text-[var(--text-primary)]',
            className
          )}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          {...props}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className={cn(
              'rounded-md p-1',
              'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--bg-muted)]',
              'transition-colors duration-fast'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)

CommandInput.displayName = 'CommandInput'

interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  emptyMessage?: string
}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, emptyMessage = 'No results found.', children, ...props }, ref) => {
    const { flatItems } = useCommandPalette()

    return (
      <div
        ref={ref}
        className={cn('max-h-[300px] overflow-y-auto p-2', className)}
        {...props}
      >
        {flatItems.length === 0 ? (
          <div className="py-8 text-center text-sm text-[var(--text-muted)]">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </div>
    )
  }
)

CommandList.displayName = 'CommandList'

interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
  items: CommandItem[]
  startIndex: number
}

const CommandGroupComponent = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, items, startIndex, ...props }, ref) => {
    const { selectedIndex, setSelectedIndex, onSelect } = useCommandPalette()

    if (items.length === 0) return null

    return (
      <div ref={ref} className={cn('mb-2', className)} {...props}>
        {heading && (
          <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {heading}
          </div>
        )}
        <div role="group">
          {items.map((item, idx) => {
            const globalIndex = startIndex + idx
            const isSelected = selectedIndex === globalIndex

            return (
              <div
                key={item.id}
                role="option"
                aria-selected={isSelected}
                aria-disabled={item.disabled}
                className={cn(commandItemVariants({ selected: isSelected, disabled: item.disabled }))}
                onMouseEnter={() => !item.disabled && setSelectedIndex(globalIndex)}
                onClick={() => !item.disabled && onSelect(item)}
              >
                {item.icon && (
                  <span className={cn('shrink-0', isSelected ? 'text-white' : 'text-[var(--text-muted)]')}>
                    {item.icon}
                  </span>
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.label}</div>
                  {item.description && (
                    <div
                      className={cn(
                        'text-xs truncate',
                        isSelected ? 'text-white/70' : 'text-[var(--text-muted)]'
                      )}
                    >
                      {item.description}
                    </div>
                  )}
                </div>

                {item.shortcut && item.shortcut.length > 0 && (
                  <div className="flex items-center gap-1 shrink-0">
                    {item.shortcut.map((key, keyIdx) => (
                      <kbd
                        key={keyIdx}
                        className={cn(
                          'inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1.5',
                          'text-[10px] font-medium',
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                        )}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

CommandGroupComponent.displayName = 'CommandGroup'

interface CommandFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between gap-4 border-t border-[var(--border-default)] px-4 py-2',
          'text-xs text-[var(--text-muted)]',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-[var(--bg-muted)] px-1.5 text-[10px] font-medium">
              <ArrowUp className="h-3 w-3" />
            </kbd>
            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-[var(--bg-muted)] px-1.5 text-[10px] font-medium">
              <ArrowDown className="h-3 w-3" />
            </kbd>
            <span>navigate</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-[var(--bg-muted)] px-1.5 text-[10px] font-medium">
              <CornerDownLeft className="h-3 w-3" />
            </kbd>
            <span>select</span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-[var(--bg-muted)] px-1.5 text-[10px] font-medium">
              esc
            </kbd>
            <span>close</span>
          </div>
        </div>
      </div>
    )
  }
)

CommandFooter.displayName = 'CommandFooter'

// ============ MAIN COMPONENT ============

const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      groups,
      placeholder = 'Search commands...',
      emptyMessage = 'No results found.',
      className,
      overlayClassName,
      shortcut = 'k',
      disableShortcut = false,
      onSearch,
      onSelect,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const isOpen = controlledOpen ?? internalOpen

    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(open)
        }
        onOpenChange?.(open)

        if (open) {
          setSearch('')
          setSelectedIndex(0)
          // Focus input when opened
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      },
      [controlledOpen, onOpenChange]
    )

    // Filter and flatten items
    const filteredGroups = React.useMemo(() => filterItems(groups, search), [groups, search])
    const flatItems = React.useMemo(() => getFlatItems(filteredGroups), [filteredGroups])

    // Reset selection when filtered results change
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [search])

    // Handle search change
    const handleSearchChange = React.useCallback(
      (value: string) => {
        setSearch(value)
        onSearch?.(value)
      },
      [onSearch]
    )

    // Handle item selection
    const handleSelect = React.useCallback(
      (item: CommandItem) => {
        item.onSelect()
        onSelect?.(item)
        handleOpenChange(false)
      },
      [onSelect, handleOpenChange]
    )

    // Keyboard shortcut to open
    React.useEffect(() => {
      if (disableShortcut) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
          e.preventDefault()
          handleOpenChange(!isOpen)
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [shortcut, disableShortcut, isOpen, handleOpenChange])

    // Keyboard navigation inside the palette
    React.useEffect(() => {
      if (!isOpen) return

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setSelectedIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1))
            break
          case 'ArrowUp':
            e.preventDefault()
            setSelectedIndex((prev) => (prev - 1 + flatItems.length) % Math.max(flatItems.length, 1))
            break
          case 'Enter':
            e.preventDefault()
            const selectedItem = flatItems[selectedIndex]
            if (selectedItem && !selectedItem.disabled) {
              handleSelect(selectedItem)
            }
            break
          case 'Escape':
            e.preventDefault()
            handleOpenChange(false)
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, selectedIndex, flatItems, handleSelect, handleOpenChange])

    // Build group start indices
    const groupStartIndices = React.useMemo(() => {
      let startIndex = 0
      return filteredGroups.map((group) => {
        const idx = startIndex
        startIndex += group.items.length
        return idx
      })
    }, [filteredGroups])

    const contextValue: CommandPaletteContextValue = {
      search,
      setSearch: handleSearchChange,
      selectedIndex,
      setSelectedIndex,
      flatItems,
      onSelect: handleSelect,
    }

    return (
      <CommandPaletteContext.Provider value={contextValue}>
        <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
              className={cn(
                'fixed inset-0 z-modal bg-black/50 backdrop-blur-sm',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                overlayClassName
              )}
            />
            <DialogPrimitive.Content
              ref={ref}
              className={cn(
                'fixed z-modal',
                'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'w-full max-w-lg',
                'rounded-xl border border-[var(--border-default)]',
                'bg-[var(--bg-base)] shadow-2xl',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
                'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
                'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
                'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
                className
              )}
            >
              <DialogPrimitive.Title className="sr-only">
                Command Palette
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Search for commands and actions
              </DialogPrimitive.Description>

              <CommandInput ref={inputRef} placeholder={placeholder} />

              <CommandList emptyMessage={emptyMessage}>
                {filteredGroups.map((group, groupIdx) => (
                  <CommandGroupComponent
                    key={group.id}
                    heading={group.label}
                    items={group.items}
                    startIndex={groupStartIndices[groupIdx] ?? 0}
                  />
                ))}
              </CommandList>

              <CommandFooter />
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </CommandPaletteContext.Provider>
    )
  }
)

CommandPalette.displayName = 'CommandPalette'

// ============ TRIGGER BUTTON ============

interface CommandPaletteTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showShortcut?: boolean
  shortcutKey?: string
}

const CommandPaletteTrigger = React.forwardRef<HTMLButtonElement, CommandPaletteTriggerProps>(
  ({ className, children, showShortcut = true, shortcutKey = '⌘K', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-3 py-2',
          'border border-[var(--border-default)] bg-[var(--bg-base)]',
          'text-sm text-[var(--text-muted)]',
          'hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
          'transition-colors duration-fast',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          className
        )}
        {...props}
      >
        <Search className="h-4 w-4" />
        {children || <span>Search...</span>}
        {showShortcut && (
          <kbd className="ml-2 hidden rounded bg-[var(--bg-muted)] px-1.5 py-0.5 text-xs font-medium sm:inline-block">
            {shortcutKey}
          </kbd>
        )}
      </button>
    )
  }
)

CommandPaletteTrigger.displayName = 'CommandPaletteTrigger'

// ============ EXPORTS ============

export {
  CommandPalette,
  CommandPaletteTrigger,
  CommandInput,
  CommandList,
  CommandGroupComponent as CommandGroup,
  CommandFooter,
  commandItemVariants,
}
