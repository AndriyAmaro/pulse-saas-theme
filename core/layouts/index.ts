/**
 * Pulse Design System - Layouts
 * Layout components for building dashboard interfaces
 */

export const LAYOUTS_VERSION = '1.0.0'

// Sidebar
export {
  Sidebar,
  SidebarComponent,
  SidebarToggle,
  SidebarLogo,
  SidebarNav,
  SidebarSection,
  SidebarItem,
  SidebarUserInfo,
  SidebarFooter,
  useSidebar,
  sidebarVariants,
  sidebarItemVariants,
} from './Sidebar'
export type {
  SidebarProps,
  SidebarItemType,
  SidebarUser,
  SidebarContextValue,
} from './Sidebar'

// Header / TopBar
export {
  Header,
  HeaderComponent,
  TopBar,
  TopBarComponent,
  HeaderMobileMenuButton,
  HeaderSearch,
  HeaderBreadcrumbs,
  HeaderNotifications,
  HeaderUserMenu,
  HeaderActions,
  useHeader,
  headerVariants,
} from './Header'
export type {
  HeaderProps,
  HeaderNotification,
  HeaderUserMenuItem,
  HeaderUser,
} from './Header'

// MainContent
export { MainContent, mainContentVariants } from './MainContent'
export type { MainContentProps } from './MainContent'

// PageHeader
export {
  PageHeader,
  PageHeaderComponent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderTabs,
  pageHeaderVariants,
} from './PageHeader'
export type { PageHeaderProps } from './PageHeader'

// Footer
export {
  Footer,
  FooterComponent,
  FooterLinks,
  FooterCopyright,
  footerVariants,
} from './Footer'
export type { FooterProps, FooterLink } from './Footer'

// DashboardGrid
export {
  DashboardGrid,
  DashboardGridComponent,
  DashboardGridItem,
  DashboardGridRow,
  DashboardGridSection,
  dashboardGridVariants,
  dashboardGridItemVariants,
} from './DashboardGrid'
export type { DashboardGridProps, DashboardGridItemProps } from './DashboardGrid'
