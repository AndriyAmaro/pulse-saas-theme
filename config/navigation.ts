import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  FileText,
  Bell,
  ShoppingCart,
  Wallet,
  FolderKanban,
  UsersRound,
  Package,
  HeadphonesIcon,
  Rocket,
  Heart,
  UserCog,
  Megaphone,
  Home,
  GraduationCap,
  Bitcoin,
  UtensilsCrossed,
  CalendarDays,
  MessageSquare,
  Mail,
  Layers,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  title: string
  i18nKey: string
  href: string
  icon: LucideIcon
  badge?: string
  disabled?: boolean
  children?: Omit<NavItem, 'icon' | 'children'>[]
}

export interface NavSection {
  title?: string
  i18nKey?: string
  items: NavItem[]
}

export const mainNavigation: NavSection[] = [
  {
    title: 'Main',
    i18nKey: 'sectionMain',
    items: [
      {
        title: 'Overview',
        i18nKey: 'overview',
        href: '/overview',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        i18nKey: 'analytics',
        href: '/analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'Dashboards',
    i18nKey: 'sectionDashboards',
    items: [
      {
        title: 'E-commerce',
        i18nKey: 'ecommerce',
        href: '/ecommerce',
        icon: ShoppingCart,
        badge: 'New',
      },
      {
        title: 'Finance',
        i18nKey: 'finance',
        href: '/finance',
        icon: Wallet,
        badge: 'New',
      },
      {
        title: 'Projects',
        i18nKey: 'projects',
        href: '/projects',
        icon: FolderKanban,
      },
      {
        title: 'CRM',
        i18nKey: 'crm',
        href: '/crm',
        icon: UsersRound,
      },
      {
        title: 'Inventory',
        i18nKey: 'inventory',
        href: '/inventory',
        icon: Package,
      },
      {
        title: 'Helpdesk',
        i18nKey: 'helpdesk',
        href: '/helpdesk',
        icon: HeadphonesIcon,
        badge: 'New',
      },
      {
        title: 'SaaS',
        i18nKey: 'saas',
        href: '/saas',
        icon: Rocket,
      },
      {
        title: 'Healthcare',
        i18nKey: 'healthcare',
        href: '/healthcare',
        icon: Heart,
      },
      {
        title: 'HR',
        i18nKey: 'hr',
        href: '/hr',
        icon: UserCog,
      },
      {
        title: 'Marketing',
        i18nKey: 'marketing',
        href: '/marketing',
        icon: Megaphone,
      },
      {
        title: 'Real Estate',
        i18nKey: 'realEstate',
        href: '/real-estate',
        icon: Home,
      },
      {
        title: 'Education',
        i18nKey: 'education',
        href: '/education',
        icon: GraduationCap,
        badge: 'New',
      },
      {
        title: 'Crypto Trading',
        i18nKey: 'cryptoTrading',
        href: '/crypto',
        icon: Bitcoin,
        badge: 'New',
      },
      {
        title: 'Restaurant',
        i18nKey: 'restaurant',
        href: '/restaurant',
        icon: UtensilsCrossed,
        badge: 'New',
      },
    ],
  },
  {
    title: 'Systems',
    i18nKey: 'sectionSystems',
    items: [
      {
        title: 'Calendar',
        i18nKey: 'calendar',
        href: '/calendar',
        icon: CalendarDays,
        badge: 'New',
      },
      {
        title: 'Chat',
        i18nKey: 'chat',
        href: '/chat',
        icon: MessageSquare,
        badge: 'New',
      },
      {
        title: 'Email',
        i18nKey: 'email',
        href: '/email',
        icon: Mail,
        badge: 'New',
      },
    ],
  },
  {
    title: 'Showcase',
    i18nKey: 'sectionShowcase',
    items: [
      {
        title: 'Components',
        i18nKey: 'components',
        href: '/components',
        icon: Layers,
        badge: '94',
      },
    ],
  },
  {
    title: 'Management',
    i18nKey: 'sectionManagement',
    items: [
      {
        title: 'Users',
        i18nKey: 'users',
        href: '/users',
        icon: Users,
      },
      {
        title: 'Reports',
        i18nKey: 'reports',
        href: '/reports',
        icon: FileText,
      },
    ],
  },
  {
    title: 'System',
    i18nKey: 'sectionSystem',
    items: [
      {
        title: 'Notifications',
        i18nKey: 'notifications',
        href: '/notifications',
        icon: Bell,
        badge: '3',
      },
      {
        title: 'Settings',
        i18nKey: 'settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
]

export const userNavigation = [
  { title: 'Profile', href: '/profile' },
  { title: 'Settings', href: '/settings' },
  { title: 'Logout', href: '/logout' },
] as const
