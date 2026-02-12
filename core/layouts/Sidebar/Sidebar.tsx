'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronLeft, ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Drawer } from '@core/organisms/Drawer'
import { Avatar } from '@core/primitives/Avatar'
import { SimpleTooltip } from '@core/primitives/Tooltip'

// ============ CONTEXT ============

interface SidebarContextValue {
  expanded: boolean
  setExpanded: (value: boolean) => void
  hovered: boolean
  setHovered: (value: boolean) => void
  isMobile: boolean
  mobileOpen: boolean
  setMobileOpen: (value: boolean) => void
  activeItem: string | null
  setActiveItem: (id: string | null) => void
  openSubmenus: Set<string>
  toggleSubmenu: (id: string) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}

// ============ TYPES ============

export interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: string | number
  children?: SidebarItem[]
  disabled?: boolean
}

export interface SidebarUser {
  name: string
  email?: string
  avatar?: string
  role?: string
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of menu items */
  items: SidebarItem[]
  /** Logo element to display at top */
  logo?: React.ReactNode
  /** Collapsed logo (smaller version) */
  logoCollapsed?: React.ReactNode
  /** User info to display at bottom */
  user?: SidebarUser
  /** Initially expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Currently active item ID */
  activeItemId?: string
  /** Callback when active item changes */
  onActiveItemChange?: (id: string) => void
  /** Width when expanded */
  expandedWidth?: string
  /** Width when collapsed */
  collapsedWidth?: string
  /** Enable hover to expand when collapsed */
  hoverExpand?: boolean
  /** Persist state to localStorage */
  persistState?: boolean
  /** localStorage key for persistence */
  storageKey?: string
  /** Mobile breakpoint in pixels */
  mobileBreakpoint?: number
  /** Custom render for menu items */
  renderLink?: (item: SidebarItem, children: React.ReactNode) => React.ReactNode
  /** Footer content (below user info) */
  footer?: React.ReactNode
  /** Header content (below logo) */
  header?: React.ReactNode
}

// ============ VARIANTS ============

const sidebarVariants = cva(
  [
    'flex flex-col h-full',
    'bg-[var(--bg-base)] border-r border-[var(--border-default)]',
    'transition-all duration-300 ease-in-out',
  ],
  {
    variants: {
      expanded: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      expanded: true,
    },
  }
)

const sidebarItemVariants = cva(
  [
    'flex items-center gap-3 rounded-lg',
    'transition-all duration-150',
    'cursor-pointer select-none',
    'text-[var(--text-secondary)]',
  ],
  {
    variants: {
      active: {
        true: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium',
        false: 'hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
      expanded: {
        true: 'px-3 py-2.5',
        false: 'px-3 py-2.5 justify-center',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
      expanded: true,
    },
  }
)

// ============ STORAGE HELPER ============

const STORAGE_KEY_DEFAULT = 'pulse-sidebar-expanded'

function getStoredState(key: string): boolean | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function setStoredState(key: string, value: boolean) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage errors
  }
}

// ============ MOBILE DETECTION ============

function useIsMobile(breakpoint: number) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

// ============ SUB-COMPONENTS ============

interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, ...props }, ref) => {
    const { expanded, setExpanded, isMobile, mobileOpen, setMobileOpen } = useSidebar()

    const handleClick = () => {
      if (isMobile) {
        setMobileOpen(!mobileOpen)
      } else {
        setExpanded(!expanded)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'flex items-center justify-center rounded-lg p-2',
          'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
          'hover:bg-[var(--bg-muted)]',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
          className
        )}
        aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        {...props}
      >
        {isMobile ? (
          mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />
        ) : (
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform duration-300',
              !expanded && 'rotate-180'
            )}
          />
        )}
      </button>
    )
  }
)

SidebarToggle.displayName = 'Sidebar.Toggle'

interface SidebarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: React.ReactNode
}

const SidebarLogo = React.forwardRef<HTMLDivElement, SidebarLogoProps>(
  ({ className, children, collapsed, ...props }, ref) => {
    const { expanded, hovered } = useSidebar()
    const showFull = expanded || hovered

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center h-16 px-4 border-b border-[var(--border-default)]',
          'transition-all duration-300',
          showFull ? 'justify-start' : 'justify-center',
          className
        )}
        {...props}
      >
        {showFull ? children : collapsed || children}
      </div>
    )
  }
)

SidebarLogo.displayName = 'Sidebar.Logo'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('flex-1 overflow-y-auto p-3 space-y-1', className)}
        {...props}
      >
        {children}
      </nav>
    )
  }
)

SidebarNav.displayName = 'Sidebar.Nav'

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    const { expanded, hovered } = useSidebar()
    const isExpanded = expanded || hovered

    return (
      <div ref={ref} className={cn('space-y-1', className)} {...props}>
        {isExpanded && title ? (
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {title}
          </div>
        ) : title ? (
          <div className="mx-3 my-2 border-t border-[var(--border-default)]" />
        ) : null}
        {children}
      </div>
    )
  }
)

SidebarSection.displayName = 'Sidebar.Section'

interface SidebarItemComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  item: SidebarItem
  renderLink?: (item: SidebarItem, children: React.ReactNode) => React.ReactNode
}

const SidebarItemComponent = React.forwardRef<HTMLDivElement, SidebarItemComponentProps>(
  ({ className, item, renderLink, ...props }, ref) => {
    const {
      expanded,
      hovered,
      activeItem,
      setActiveItem,
      openSubmenus,
      toggleSubmenu,
    } = useSidebar()

    const isExpanded = expanded || hovered
    const isActive = activeItem === item.id
    const hasChildren = item.children && item.children.length > 0
    const isSubmenuOpen = openSubmenus.has(item.id)

    const handleClick = () => {
      if (item.disabled) return

      if (hasChildren) {
        toggleSubmenu(item.id)
      } else {
        setActiveItem(item.id)
        item.onClick?.()
      }
    }

    const content = (
      <div
        ref={ref}
        className={cn(
          sidebarItemVariants({
            active: isActive,
            disabled: item.disabled,
            expanded: isExpanded,
          }),
          className
        )}
        onClick={handleClick}
        role="button"
        tabIndex={item.disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={item.disabled}
        {...props}
      >
        {item.icon && (
          <span
            className={cn(
              'flex-shrink-0 h-5 w-5',
              isActive ? 'text-primary-500' : 'text-[var(--text-muted)]'
            )}
          >
            {item.icon}
          </span>
        )}

        {isExpanded && (
          <>
            <span className="flex-1 truncate">{item.label}</span>

            {item.badge && (
              <span
                className={cn(
                  'flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium',
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-[var(--bg-emphasis)] text-[var(--text-secondary)]'
                )}
              >
                {item.badge}
              </span>
            )}

            {hasChildren && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isSubmenuOpen && 'rotate-180'
                )}
              />
            )}
          </>
        )}
      </div>
    )

    // Wrap with tooltip when collapsed
    const wrappedContent =
      !isExpanded && !hasChildren ? (
        <SimpleTooltip content={item.label} side="right">
          {content}
        </SimpleTooltip>
      ) : (
        content
      )

    // Use custom link renderer if provided and item has href
    const linkedContent =
      renderLink && item.href && !hasChildren
        ? renderLink(item, wrappedContent)
        : wrappedContent

    return (
      <div>
        {linkedContent}

        {/* Submenu */}
        {hasChildren && isExpanded && isSubmenuOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l border-[var(--border-default)] pl-3">
            {item.children?.map((child) => (
              <SidebarItemComponent
                key={child.id}
                item={child}
                renderLink={renderLink}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

SidebarItemComponent.displayName = 'Sidebar.Item'

interface SidebarUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SidebarUser
}

const SidebarUserInfo = React.forwardRef<HTMLDivElement, SidebarUserInfoProps>(
  ({ className, user, ...props }, ref) => {
    const { expanded, hovered } = useSidebar()
    const isExpanded = expanded || hovered

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-3 border-t border-[var(--border-default)]',
          !isExpanded && 'justify-center',
          className
        )}
        {...props}
      >
        <Avatar
          src={user.avatar}
          initials={user.name}
          size="sm"
          status="online"
        />

        {isExpanded && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[var(--text-primary)] truncate">
              {user.name}
            </div>
            {user.email && (
              <div className="text-xs text-[var(--text-muted)] truncate">
                {user.email}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

SidebarUserInfo.displayName = 'Sidebar.UserInfo'

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-3 border-t border-[var(--border-default)]', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarFooter.displayName = 'Sidebar.Footer'

// ============ MOBILE SIDEBAR ============

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content side="left" size="sm" showCloseButton={false}>
        {children}
      </Drawer.Content>
    </Drawer>
  )
}

// ============ MAIN COMPONENT ============

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      items,
      logo,
      logoCollapsed,
      user,
      defaultExpanded = true,
      expanded: controlledExpanded,
      onExpandedChange,
      activeItemId,
      onActiveItemChange,
      expandedWidth = '260px',
      collapsedWidth = '72px',
      hoverExpand = true,
      persistState = true,
      storageKey = STORAGE_KEY_DEFAULT,
      mobileBreakpoint = 1024,
      renderLink,
      footer,
      header,
      children,
      ...props
    },
    ref
  ) => {
    // Mobile detection
    const isMobile = useIsMobile(mobileBreakpoint)
    const [mobileOpen, setMobileOpen] = React.useState(false)

    // Expanded state with persistence
    const [internalExpanded, setInternalExpanded] = React.useState(() => {
      if (persistState) {
        const stored = getStoredState(storageKey)
        if (stored !== null) return stored
      }
      return defaultExpanded
    })

    const expanded = controlledExpanded ?? internalExpanded

    const setExpanded = React.useCallback(
      (value: boolean) => {
        if (controlledExpanded === undefined) {
          setInternalExpanded(value)
        }
        if (persistState) {
          setStoredState(storageKey, value)
        }
        onExpandedChange?.(value)
      },
      [controlledExpanded, persistState, storageKey, onExpandedChange]
    )

    // Hover state
    const [hovered, setHovered] = React.useState(false)

    // Active item state
    const [internalActiveItem, setInternalActiveItem] = React.useState<string | null>(
      activeItemId ?? null
    )

    const activeItem = activeItemId ?? internalActiveItem

    const setActiveItem = React.useCallback(
      (id: string | null) => {
        if (activeItemId === undefined) {
          setInternalActiveItem(id)
        }
        if (id) {
          onActiveItemChange?.(id)
        }
      },
      [activeItemId, onActiveItemChange]
    )

    // Submenu state
    const [openSubmenus, setOpenSubmenus] = React.useState<Set<string>>(new Set())

    const toggleSubmenu = React.useCallback((id: string) => {
      setOpenSubmenus((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }, [])

    // Close mobile sidebar on route change (when active item changes)
    React.useEffect(() => {
      if (isMobile && mobileOpen) {
        setMobileOpen(false)
      }
    }, [activeItem])

    const contextValue: SidebarContextValue = {
      expanded,
      setExpanded,
      hovered: hoverExpand ? hovered : false,
      setHovered,
      isMobile,
      mobileOpen,
      setMobileOpen,
      activeItem,
      setActiveItem,
      openSubmenus,
      toggleSubmenu,
    }

    const isVisuallyExpanded = expanded || (hoverExpand ? hovered : false)

    const sidebarContent = (
      <>
        {/* Logo + Toggle */}
        {logo && (
          <div
            className={cn(
              'flex border-b border-[var(--border-default)] transition-all duration-300',
              isVisuallyExpanded
                ? 'items-center h-16 px-4'
                : 'flex-col items-center py-3 px-2 gap-1'
            )}
          >
            <div className="flex items-center">
              {isVisuallyExpanded ? logo : logoCollapsed || logo}
            </div>
            {!isMobile && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  'flex items-center justify-center rounded-lg p-1.5',
                  'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  'hover:bg-[var(--bg-muted)]',
                  'transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
                  isVisuallyExpanded && 'ml-auto',
                )}
                aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                <ChevronLeft
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    !expanded && 'rotate-180'
                  )}
                />
              </button>
            )}
          </div>
        )}

        {/* Header */}
        {header && (
          <div className="px-3 py-2 border-b border-[var(--border-default)]">
            {header}
          </div>
        )}

        {/* Navigation */}
        <SidebarNav>
          {items.map((item) => (
            <SidebarItemComponent
              key={item.id}
              item={item}
              renderLink={renderLink}
            />
          ))}
          {children}
        </SidebarNav>

        {/* User Info */}
        {user && <SidebarUserInfo user={user} />}

        {/* Footer */}
        {footer && <SidebarFooter>{footer}</SidebarFooter>}
      </>
    )

    // Mobile version
    if (isMobile) {
      return (
        <SidebarContext.Provider value={contextValue}>
          <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen}>
            <aside
              ref={ref as React.Ref<HTMLElement>}
              className={cn(sidebarVariants({ expanded: true }), 'w-full', className)}
              {...props}
            >
              {sidebarContent}
            </aside>
          </MobileSidebar>
        </SidebarContext.Provider>
      )
    }

    // Desktop version
    return (
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          className={cn(
            sidebarVariants({ expanded: isVisuallyExpanded }),
            className
          )}
          style={{
            width: isVisuallyExpanded ? expandedWidth : collapsedWidth,
          }}
          onMouseEnter={() => hoverExpand && !expanded && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          {...props}
        >
          {sidebarContent}
        </aside>
      </SidebarContext.Provider>
    )
  }
)

Sidebar.displayName = 'Sidebar'

// ============ COMPOUND EXPORT ============

export const SidebarComponent = Object.assign(Sidebar, {
  Toggle: SidebarToggle,
  Logo: SidebarLogo,
  Nav: SidebarNav,
  Section: SidebarSection,
  Item: SidebarItemComponent,
  UserInfo: SidebarUserInfo,
  Footer: SidebarFooter,
})

export {
  Sidebar,
  SidebarToggle,
  SidebarLogo,
  SidebarNav,
  SidebarSection,
  SidebarItemComponent as SidebarItem,
  SidebarUserInfo,
  SidebarFooter,
  useSidebar,
  sidebarVariants,
  sidebarItemVariants,
}

export type { SidebarContextValue }
