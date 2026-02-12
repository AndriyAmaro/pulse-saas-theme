'use client'

import * as React from 'react'
import {
  Bell,
  BellOff,
  BellRing,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  MessageSquare,
  UserPlus,
  AlertTriangle,
  CreditCard,
  FileText,
  Shield,
  Calendar,
  Package,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Filter,
  ArrowUpRight,
  Mail,
  Zap,
  Eye,
  Volume2,
  Smartphone,
  Globe,
} from 'lucide-react'

import { Switch } from '@core/primitives/Switch'
import { Skeleton } from '@core/primitives/Skeleton'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { cn } from '@shared/utils/cn'

// ============================================================================
// PREMIUM CONFIGS
// ============================================================================

type NotificationType = 'message' | 'user' | 'alert' | 'payment' | 'report' | 'security' | 'calendar' | 'update' | 'achievement'

const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; gradient: string; shadow: string; lightBg: string; darkBg: string; text: string; border: string; dot: string; color: string }> = {
  message: { icon: MessageSquare, gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/25', lightBg: 'bg-blue-50', darkBg: 'dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/50 dark:border-blue-800/30', dot: 'from-blue-400 to-indigo-400', color: '#3b82f6' },
  user: { icon: UserPlus, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/25', lightBg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/50 dark:border-emerald-800/30', dot: 'from-emerald-400 to-teal-400', color: '#10b981' },
  alert: { icon: AlertTriangle, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/25', lightBg: 'bg-amber-50', darkBg: 'dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200/50 dark:border-amber-800/30', dot: 'from-amber-400 to-orange-400', color: '#f59e0b' },
  payment: { icon: CreditCard, gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/25', lightBg: 'bg-green-50', darkBg: 'dark:bg-green-950/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200/50 dark:border-green-800/30', dot: 'from-green-400 to-emerald-400', color: '#22c55e' },
  report: { icon: FileText, gradient: 'from-indigo-500 to-violet-500', shadow: 'shadow-indigo-500/25', lightBg: 'bg-indigo-50', darkBg: 'dark:bg-indigo-950/20', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200/50 dark:border-indigo-800/30', dot: 'from-indigo-400 to-violet-400', color: '#6366f1' },
  security: { icon: Shield, gradient: 'from-red-500 to-rose-500', shadow: 'shadow-red-500/25', lightBg: 'bg-red-50', darkBg: 'dark:bg-red-950/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200/50 dark:border-red-800/30', dot: 'from-red-400 to-rose-400', color: '#ef4444' },
  calendar: { icon: Calendar, gradient: 'from-purple-500 to-fuchsia-500', shadow: 'shadow-purple-500/25', lightBg: 'bg-purple-50', darkBg: 'dark:bg-purple-950/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200/50 dark:border-purple-800/30', dot: 'from-purple-400 to-fuchsia-400', color: '#a855f7' },
  update: { icon: Package, gradient: 'from-cyan-500 to-blue-500', shadow: 'shadow-cyan-500/25', lightBg: 'bg-cyan-50', darkBg: 'dark:bg-cyan-950/20', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200/50 dark:border-cyan-800/30', dot: 'from-cyan-400 to-blue-400', color: '#06b6d4' },
  achievement: { icon: Star, gradient: 'from-yellow-500 to-amber-500', shadow: 'shadow-yellow-500/25', lightBg: 'bg-yellow-50', darkBg: 'dark:bg-yellow-950/20', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-200/50 dark:border-yellow-800/30', dot: 'from-yellow-400 to-amber-400', color: '#eab308' },
}

// ============================================================================
// MOCK DATA
// ============================================================================

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
}

const notificationsData: Notification[] = [
  { id: '1', type: 'message', title: 'New message from Sarah', description: 'Hey, can you review the latest design mockups for the dashboard?', time: '2 min ago', read: false },
  { id: '2', type: 'alert', title: 'Server CPU usage high', description: 'Production server CPU usage has exceeded 85% threshold.', time: '15 min ago', read: false },
  { id: '3', type: 'payment', title: 'Payment received', description: 'Invoice #INV-2024-089 has been paid. Amount: $2,450.00', time: '1 hour ago', read: false },
  { id: '4', type: 'user', title: 'New team member joined', description: 'Alex Chen has joined the Engineering team.', time: '2 hours ago', read: true },
  { id: '5', type: 'report', title: 'Monthly report ready', description: 'Your January 2026 analytics report is ready for download.', time: '3 hours ago', read: true },
  { id: '6', type: 'security', title: 'New login detected', description: 'A new login was detected from Chrome on Windows. Location: San Francisco, CA.', time: '5 hours ago', read: true },
  { id: '7', type: 'calendar', title: 'Meeting reminder', description: 'Team standup meeting starts in 30 minutes.', time: '6 hours ago', read: true },
  { id: '8', type: 'update', title: 'System update completed', description: 'Platform has been updated to version 2.4.1 with new features.', time: '1 day ago', read: true },
  { id: '9', type: 'achievement', title: 'Goal achieved!', description: 'Your team has reached the Q1 sales target of $500K. Congratulations!', time: '1 day ago', read: true },
  { id: '10', type: 'payment', title: 'Subscription renewed', description: 'Your Pro plan subscription has been renewed for another year.', time: '2 days ago', read: true },
  { id: '11', type: 'message', title: 'Comment on your task', description: 'Mark Wilson commented on "Redesign landing page": Looking great!', time: '2 days ago', read: true },
  { id: '12', type: 'alert', title: 'Storage usage warning', description: 'Your storage usage is at 80%. Consider upgrading your plan.', time: '3 days ago', read: true },
]

const notificationPreferences = [
  { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email', enabled: true, icon: Mail, gradient: 'from-blue-500 to-indigo-500' },
  { key: 'push', label: 'Push Notifications', description: 'Browser push notifications', enabled: true, icon: Smartphone, gradient: 'from-violet-500 to-purple-500' },
  { key: 'messages', label: 'Direct Messages', description: 'Notify when someone sends you a message', enabled: true, icon: MessageSquare, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'mentions', label: 'Mentions', description: 'Notify when someone mentions you', enabled: true, icon: Volume2, gradient: 'from-amber-500 to-orange-500' },
  { key: 'updates', label: 'System Updates', description: 'Notify about platform updates', enabled: false, icon: Package, gradient: 'from-cyan-500 to-blue-500' },
  { key: 'marketing', label: 'Marketing', description: 'Product news and offers', enabled: false, icon: Globe, gradient: 'from-pink-500 to-rose-500' },
]

const notifStats = [
  { title: 'Total', value: '248', change: '+12%', gradient: 'from-fuchsia-500 to-purple-500', shadow: 'shadow-fuchsia-500/25', icon: Bell, trend: [18, 22, 19, 25, 23, 28, 26, 30, 32, 29, 35, 38], color: '#d946ef' },
  { title: 'Unread', value: '3', change: '-5', gradient: 'from-violet-500 to-indigo-500', shadow: 'shadow-violet-500/25', icon: BellRing, trend: [12, 8, 15, 10, 7, 14, 9, 6, 11, 5, 4, 3], color: '#8b5cf6' },
  { title: 'Today', value: '14', change: '+8%', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/25', icon: Clock, trend: [6, 9, 8, 11, 7, 13, 10, 14, 12, 15, 11, 14], color: '#3b82f6' },
  { title: 'Actioned', value: '92%', change: '+3%', gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/25', icon: CheckCheck, trend: [78, 82, 80, 85, 83, 88, 86, 90, 87, 91, 89, 92], color: '#10b981' },
]

const weeklyTrend = [32, 45, 38, 52, 41, 48, 55, 42, 60, 48, 53, 47, 58, 50]

// ============================================================================
// COMPONENT
// ============================================================================

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [notifications, setNotifications] = React.useState(notificationsData)
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all')
  const [typeFilter, setTypeFilter] = React.useState<string>('all')
  const [preferences, setPreferences] = React.useState(notificationPreferences)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread' && n.read) return false
    if (typeFilter !== 'all' && n.type !== typeFilter) return false
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const togglePreference = (key: string) => {
    setPreferences((prev) => prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p)))
  }

  // Type counts for sidebar
  const typeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of notifications) {
      counts[n.type] = (counts[n.type] ?? 0) + 1
    }
    return counts
  }, [notifications])

  return (
    <div className="flex flex-col gap-4">
      {/* ════════════════ PREMIUM HERO HEADER ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
        <div className="absolute top-6 right-6 h-32 w-32 rounded-full bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5 blur-2xl" />
        <div className="absolute bottom-0 right-24 h-20 w-20 rounded-full bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 blur-xl" />

        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-fuchsia-50/40 to-transparent dark:from-fuchsia-950/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-lg shadow-fuchsia-500/25">
                <Bell size={28} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-md">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Notifications</h1>
              <p className="text-sm text-[var(--text-muted)]">Stay updated with your latest alerts and messages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/20 dark:to-purple-950/10 px-3 py-1.5 border border-fuchsia-200/50 dark:border-fuchsia-800/30">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 animate-pulse" />
                <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">{unreadCount} new</span>
              </div>
            )}
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10 px-3 py-2 text-xs font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/30 hover:shadow-sm transition-all disabled:opacity-50"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all hover:scale-[1.02]">
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM STATS BAR ════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {notifStats.map((stat) => (
          <div key={stat.title} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]">
            <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', stat.gradient)} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', stat.gradient, stat.shadow)}>
                  <stat.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wide">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</span>
                    <span className="text-[10px] font-bold flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp size={10} /> {stat.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                <SparklineChart data={stat.trend} type="area" width={64} height={28} color={stat.color} gradient showDot={false} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════ MAIN GRID ════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

        {/* ════════════════ NOTIFICATION LIST ════════════════ */}
        <div className="flex flex-col gap-4">
          {/* Filter bar */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-sm shadow-fuchsia-500/25">
                  <Filter size={12} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-[var(--bg-muted)] p-0.5">
                  {(['all', 'unread'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-xs font-semibold transition-all capitalize',
                        filter === f
                          ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-md shadow-fuchsia-500/25'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[{ key: 'all', label: 'All Types' }, { key: 'message', label: 'Messages' }, { key: 'alert', label: 'Alerts' }, { key: 'payment', label: 'Payments' }, { key: 'security', label: 'Security' }].map((tf) => (
                  <button
                    key={tf.key}
                    onClick={() => setTypeFilter(tf.key)}
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all whitespace-nowrap border',
                      typeFilter === tf.key
                        ? 'bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/20 dark:to-purple-950/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200/50 dark:border-fuchsia-800/30'
                        : 'text-[var(--text-muted)] border-transparent hover:border-[var(--border-default)]'
                    )}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            {isLoading ? (
              <div className="divide-y divide-[var(--border-default)]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 p-4">
                    <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredNotifications.length === 0 ? (
              /* Premium Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-lg shadow-fuchsia-500/25">
                    <BellOff size={36} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-md">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  {filter === 'unread' ? "You're all caught up!" : 'No notifications yet'}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)] max-w-xs">
                  {filter === 'unread' ? 'All notifications have been read. Great job staying on top of things!' : 'When you receive notifications, they will appear here.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border-default)]">
                {filteredNotifications.map((notification) => {
                  const cfg = NOTIFICATION_TYPE_CONFIG[notification.type]
                  const Icon = cfg.icon
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        'group flex items-start gap-3 p-4 transition-all hover:bg-[var(--bg-muted)]',
                        !notification.read && 'bg-gradient-to-r from-fuchsia-50/30 to-transparent dark:from-fuchsia-950/10'
                      )}
                    >
                      {/* Unread indicator line */}
                      {!notification.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-500 to-purple-500" />
                      )}
                      {/* Icon */}
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm', cfg.gradient, cfg.shadow)}>
                        <Icon size={18} className="text-white" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn('text-sm text-[var(--text-primary)]', !notification.read && 'font-bold')}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 animate-pulse" />
                              )}
                            </div>
                            <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-2">{notification.description}</p>
                            <div className="mt-1.5 flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
                                <Clock size={10} /> {notification.time}
                              </span>
                              <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
                                <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', cfg.dot)} />
                                {notification.type}
                              </span>
                            </div>
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            {!notification.read ? (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30 hover:shadow-sm transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Mark as read"
                              >
                                <Check size={14} />
                              </button>
                            ) : (
                              <>
                                <button
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-all opacity-0 group-hover:opacity-100"
                                  aria-label="View"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all opacity-0 group-hover:opacity-100"
                                  aria-label="Delete notification"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {/* Bottom count bar */}
            {!isLoading && filteredNotifications.length > 0 && (
              <div className="flex items-center justify-between border-t border-[var(--border-default)] px-4 py-2.5 bg-gradient-to-r from-fuchsia-50/20 to-transparent dark:from-fuchsia-950/5">
                <span className="text-[10px] font-medium text-[var(--text-muted)]">
                  Showing {filteredNotifications.length} of {notifications.length} notifications
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/20 px-2 py-0.5 text-[10px] font-bold text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200/50 dark:border-fuchsia-800/30">
                  <Bell size={10} /> {unreadCount} unread
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════ PREMIUM SIDEBAR ════════════════ */}
        <div className="flex flex-col gap-4">
          {/* Weekly Trend */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-sm shadow-fuchsia-500/25">
                    <TrendingUp size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-[var(--text-primary)]">Weekly Trend</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp size={10} /> +15%
                </span>
              </div>
              <SparklineChart data={weeklyTrend} type="area" width={280} height={64} color="#d946ef" gradient showDot strokeWidth={2} animated />
              <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Summary by Type */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-sm shadow-fuchsia-500/25">
                  <Zap size={12} className="text-white" />
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)]">By Category</span>
              </div>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9" />)}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {(Object.entries(NOTIFICATION_TYPE_CONFIG) as [NotificationType, typeof NOTIFICATION_TYPE_CONFIG[NotificationType]][]).map(([type, cfg]) => {
                    const count = typeCounts[type] ?? 0
                    if (count === 0) return null
                    const Icon = cfg.icon
                    return (
                      <button
                        key={type}
                        onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
                        className={cn(
                          'flex items-center gap-2.5 w-full rounded-lg p-2 transition-all hover:bg-[var(--bg-muted)]',
                          typeFilter === type && 'bg-[var(--bg-muted)] ring-1 ring-fuchsia-200/50 dark:ring-fuchsia-800/30'
                        )}
                      >
                        <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', cfg.gradient)}>
                          <Icon size={12} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-[var(--text-primary)] capitalize flex-1 text-left">{type}s</span>
                        <div className="flex items-center gap-1.5">
                          <span className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
                            {count}
                          </span>
                          <ArrowUpRight size={12} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-sm shadow-fuchsia-500/25">
                  <Settings size={12} className="text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--text-primary)]">Preferences</span>
                  <p className="text-[10px] text-[var(--text-muted)]">Manage notification settings</p>
                </div>
              </div>
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
                </div>
              ) : (
                <div className="space-y-2">
                  {preferences.map((pref) => (
                    <div key={pref.key} className="group flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-[var(--bg-muted)] transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', pref.gradient, pref.enabled ? 'opacity-100' : 'opacity-40')}>
                          <pref.icon size={12} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{pref.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)] truncate">{pref.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={pref.enabled}
                        onCheckedChange={() => togglePreference(pref.key)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Distribution bar */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-sm shadow-fuchsia-500/25">
                  <Bell size={12} className="text-white" />
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)]">Distribution</span>
              </div>
              {/* Stacked bar */}
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-3">
                {(Object.entries(typeCounts) as [string, number][]).map(([type, count]) => {
                  const cfg = NOTIFICATION_TYPE_CONFIG[type as NotificationType]
                  return cfg ? (
                    <div
                      key={type}
                      className={cn('h-full bg-gradient-to-r first:rounded-l-full last:rounded-r-full', cfg.gradient)}
                      style={{ width: `${(count / notifications.length) * 100}%` }}
                      title={`${type}: ${count}`}
                    />
                  ) : null
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(typeCounts) as [string, number][]).map(([type, count]) => {
                  const cfg = NOTIFICATION_TYPE_CONFIG[type as NotificationType]
                  return cfg ? (
                    <div key={type} className="flex items-center gap-1">
                      <div className={cn('h-2 w-2 rounded-full bg-gradient-to-r', cfg.gradient)} />
                      <span className="text-[10px] text-[var(--text-muted)] capitalize">{type}</span>
                      <span className="text-[10px] font-bold text-[var(--text-primary)]">{count}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
