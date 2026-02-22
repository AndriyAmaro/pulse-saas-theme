'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

import { Sidebar, type SidebarItem } from '@core/layouts/Sidebar'
import { Header, type HeaderNotification, type HeaderUser } from '@core/layouts/Header'
import { MainContent } from '@core/layouts/MainContent'
import { LanguageSwitcher } from '@core/patterns/LanguageSwitcher'
import { PulseLogo } from '@core/primitives/PulseLogo'
import { mainNavigation } from '@config/navigation'

// Mock user data
const currentUser: HeaderUser = {
  name: 'Andri User',
  email: 'andri@pulse.dev',
  avatar: undefined,
  role: 'Admin',
}

// Notifications are created inside the component to use translations

// Custom link renderer for Next.js navigation (locale-aware)
function renderLink(
  item: SidebarItem,
  children: React.ReactNode
): React.ReactNode {
  if (!item.href) return children

  return (
    <Link href={item.href} className="block">
      {children}
    </Link>
  )
}

// Sidebar state context to share between sidebar and header
const SidebarStateContext = React.createContext<{
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function useSidebarState() {
  const context = React.useContext(SidebarStateContext)
  if (!context) {
    throw new Error('useSidebarState must be used within DashboardLayout')
  }
  return context
}

// Inner layout component that can use sidebar context
function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { mobileOpen, setMobileOpen } = useSidebarState()
  const [sidebarExpanded, setSidebarExpanded] = React.useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const stored = localStorage.getItem('pulse-sidebar-expanded')
      return stored !== null ? JSON.parse(stored) === true : true
    } catch {
      return true
    }
  })
  const t = useTranslations('navigation')
  const tHeader = useTranslations('header')

  // Translated mock notifications
  const notifications: HeaderNotification[] = React.useMemo(() => [
    {
      id: '1',
      title: tHeader('mockNotifications.n1Title'),
      description: tHeader('mockNotifications.n1Desc'),
      timestamp: tHeader('mockNotifications.n1Time'),
      read: false,
    },
    {
      id: '2',
      title: tHeader('mockNotifications.n2Title'),
      description: tHeader('mockNotifications.n2Desc'),
      timestamp: tHeader('mockNotifications.n2Time'),
      read: false,
    },
    {
      id: '3',
      title: tHeader('mockNotifications.n3Title'),
      description: tHeader('mockNotifications.n3Desc'),
      timestamp: tHeader('mockNotifications.n3Time'),
      read: true,
    },
  ], [tHeader])

  // Convert navigation config to sidebar items with translations
  const sidebarItems: SidebarItem[] = React.useMemo(
    () =>
      mainNavigation.flatMap((section) =>
        section.items.map((item) => ({
          id: item.href,
          label: t(item.i18nKey),
          icon: <item.icon className="h-5 w-5" />,
          href: item.href,
          badge: item.badge,
          disabled: item.disabled,
          children: item.children?.map((child) => ({
            id: child.href,
            label: child.i18nKey ? t(child.i18nKey) : child.title,
            href: child.href,
          })),
        }))
      ),
    [t]
  )

  // Get breadcrumb items from pathname — strip locale prefix
  const breadcrumbItems = React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const filteredSegments = segments.filter(
      (s) => s !== 'pt' && s !== 'en' && s !== 'es'
    )
    return filteredSegments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + filteredSegments.slice(0, index + 1).join('/'),
    }))
  }, [pathname])

  // Determine current active item ID — strip locale prefix for matching
  const activeItemId = React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const filteredSegments = segments.filter(
      (s) => s !== 'pt' && s !== 'en' && s !== 'es'
    )
    return '/' + filteredSegments.join('/')
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-subtle)]">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        logo={<PulseLogo variant="full" />}
        logoCollapsed={<PulseLogo variant="icon-only" />}
        user={{
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar,
        }}
        activeItemId={activeItemId}
        renderLink={renderLink}
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        persistState
      />

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          breadcrumbs={breadcrumbItems}
          renderBreadcrumbLink={(item, isLast, children) =>
            isLast ? (
              children
            ) : (
              <Link href={item.href || '#'} className="hover:text-primary-500">
                {children}
              </Link>
            )
          }
          showSearch
          searchProps={{
            placeholder: tHeader('search'),
            onSearch: () => {/* Handle search */},
          }}
          notifications={notifications}
          onNotificationClick={() => {/* Handle notification click */}}
          onNotificationsViewAll={() => {/* Handle view all notifications */}}
          user={currentUser}
          onMobileMenuClick={() => setMobileOpen((prev) => !prev)}
          showMobileMenu
          sticky
        >
          <LanguageSwitcher />
        </Header>

        {/* Main Content */}
        <MainContent padding="lg" className="flex-1 overflow-y-auto px-0 py-2">
          {children}
        </MainContent>
      </div>

      {/* Mobile sidebar overlay is handled by the Drawer component inside Sidebar */}
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <SidebarStateContext.Provider value={{ mobileOpen, setMobileOpen }}>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SidebarStateContext.Provider>
  )
}
