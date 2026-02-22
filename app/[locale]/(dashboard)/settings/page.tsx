'use client'

import * as React from 'react'
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Users,
  Camera,
  Trash2,
  Shield,
  Mail,
  Plus,
  Download,
  Check,
  AlertTriangle,
  Send,
  X,
  Settings,
  Sparkles,
  TrendingUp,
  Crown,
  Zap,
  Eye,
  Smartphone,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
  Clock,
  FileText,
  Key,
  UserCog,
  Palette,
  BellRing,
  Receipt,
  UsersRound,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Input } from '@core/primitives/Input'
import { Textarea } from '@core/primitives/Textarea'
import { Avatar } from '@core/primitives/Avatar'
import { Switch, SwitchWithLabel } from '@core/primitives/Switch'
import { DataTable, type ColumnDef, type RowAction } from '@core/organisms/DataTable'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/primitives/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/patterns/Tabs'
import { PasswordInput } from '@core/patterns/PasswordInput'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { Skeleton } from '@core/primitives/Skeleton'
import { cn } from '@shared/utils/cn'

// ============================================================================
// PREMIUM CONFIGS
// ============================================================================

const TAB_CONFIG = [
  { value: 'profile', label: 'Profile', icon: User, gradient: 'from-green-500 to-emerald-500', desc: 'Personal information' },
  { value: 'account', label: 'Account', icon: Lock, gradient: 'from-blue-500 to-indigo-500', desc: 'Security & privacy' },
  { value: 'notifications', label: 'Notifications', icon: Bell, gradient: 'from-violet-500 to-purple-500', desc: 'Alert preferences' },
  { value: 'billing', label: 'Billing', icon: CreditCard, gradient: 'from-amber-500 to-orange-500', desc: 'Plans & payments' },
  { value: 'team', label: 'Team', icon: Users, gradient: 'from-cyan-500 to-blue-500', desc: 'Members & roles' },
]

const SOCIAL_FIELDS = [
  { key: 'twitter', label: 'Twitter', icon: Twitter, gradient: 'from-sky-500 to-blue-500', value: '@johndoe', placeholder: '@username' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, gradient: 'from-blue-600 to-indigo-600', value: 'johndoe', placeholder: 'linkedin.com/in/username' },
  { key: 'github', label: 'GitHub', icon: Github, gradient: 'from-gray-700 to-gray-900', value: 'johndoe', placeholder: 'github.com/username' },
  { key: 'website', label: 'Website', icon: Globe, gradient: 'from-emerald-500 to-teal-500', value: 'https://johndoe.design', placeholder: 'https://yourwebsite.com' },
]

// ============================================================================
// MOCK DATA
// ============================================================================

const currentUser = {
  firstName: 'John', lastName: 'Doe', email: 'john.doe@acme.com',
  phone: '+1 (555) 123-4567',
  bio: 'Passionate product designer with 8+ years of experience creating intuitive and beautiful digital experiences.',
  avatar: undefined as string | undefined,
}

const billingHistory = [
  { id: 'INV-001', date: 'Jan 15, 2026', amount: '$49.00', status: 'Paid' as const },
  { id: 'INV-002', date: 'Dec 15, 2025', amount: '$49.00', status: 'Paid' as const },
  { id: 'INV-003', date: 'Nov 15, 2025', amount: '$49.00', status: 'Paid' as const },
  { id: 'INV-004', date: 'Oct 15, 2025', amount: '$49.00', status: 'Paid' as const },
  { id: 'INV-005', date: 'Sep 15, 2025', amount: '$49.00', status: 'Failed' as const },
]

const teamMembers = [
  { id: '1', name: 'Jane Smith', email: 'jane@acme.com', role: 'Admin', status: 'Active' as const, avatar: undefined as string | undefined },
  { id: '2', name: 'Mike Johnson', email: 'mike@acme.com', role: 'Member', status: 'Active' as const, avatar: undefined as string | undefined },
  { id: '3', name: 'Sarah Wilson', email: 'sarah@acme.com', role: 'Member', status: 'Active' as const, avatar: undefined as string | undefined },
  { id: '4', name: 'Tom Brown', email: 'tom@acme.com', role: 'Viewer', status: 'Pending' as const, avatar: undefined as string | undefined },
  { id: '5', name: 'Emily Davis', email: 'emily@acme.com', role: 'Member', status: 'Inactive' as const, avatar: undefined as string | undefined },
]

const pendingInvites = [
  { email: 'alex@example.com', sentAt: '2 days ago' },
  { email: 'chris@example.com', sentAt: '5 days ago' },
]

const settingsStats = [
  { title: 'Profile', value: '85%', label: 'Complete', gradient: 'from-green-500 to-lime-500', color: '#22c55e', trend: [60, 65, 70, 72, 75, 78, 80, 82, 83, 84, 85, 85] },
  { title: 'Security', value: 'Strong', label: 'Score', gradient: 'from-blue-500 to-indigo-500', color: '#3b82f6', trend: [40, 50, 55, 60, 65, 70, 72, 75, 78, 80, 82, 85] },
  { title: 'Team', value: '5/10', label: 'Seats', gradient: 'from-violet-500 to-purple-500', color: '#8b5cf6', trend: [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5] },
  { title: 'Plan', value: 'Pro', label: '$49/mo', gradient: 'from-amber-500 to-orange-500', color: '#f59e0b', trend: [29, 29, 29, 39, 39, 39, 49, 49, 49, 49, 49, 49] },
]

// ============================================================================
// PREMIUM SECTION WRAPPER
// ============================================================================

function PremiumSection({ title, description, icon: Icon, gradient, children }: {
  title: string; description?: string; icon: React.ElementType; gradient: string; children: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
      <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', gradient)} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', gradient)}>
            <Icon size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
            {description && <p className="text-xs text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// PROFILE TAB
// ============================================================================

function ProfileTab() {
  const [bio, setBio] = React.useState(currentUser.bio)

  return (
    <div className="space-y-4">
      {/* Avatar Section */}
      <PremiumSection title="Profile Photo" description="This will be displayed on your profile" icon={Camera} gradient="from-green-500 to-lime-500">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar src={currentUser.avatar} initials={`${currentUser.firstName} ${currentUser.lastName}`} size="xl" />
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-lime-500 shadow-md border-2 border-[var(--bg-base)]">
              <Camera size={12} className="text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-green-500/25 hover:shadow-lg transition-all hover:scale-[1.02]">
                <Camera size={12} /> Change
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-red-500 hover:border-red-200 dark:hover:border-red-800/30 transition-all">
                <Trash2 size={12} /> Remove
              </button>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">JPG, PNG or GIF. Max file size 2MB.</p>
          </div>
        </div>
      </PremiumSection>

      {/* Personal Information */}
      <PremiumSection title="Personal Information" description="Your personal details" icon={User} gradient="from-green-500 to-emerald-500">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)]">First Name</label>
              <Input defaultValue={currentUser.firstName} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)]">Last Name</label>
              <Input defaultValue={currentUser.lastName} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">Email Address</label>
            <div className="flex items-center gap-2">
              <Input defaultValue={currentUser.email} disabled className="flex-1" />
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30">
                <Check size={10} /> Verified
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">Phone Number</label>
            <Input defaultValue={currentUser.phone} type="tel" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} showCount maxLength={200} placeholder="Write a short bio about yourself..." />
          </div>
        </div>
      </PremiumSection>

      {/* Social Profiles */}
      <PremiumSection title="Social Profiles" description="Add your social media profiles" icon={Link2} gradient="from-sky-500 to-blue-500">
        <div className="space-y-3">
          {SOCIAL_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-3">
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', field.gradient)}>
                <field.icon size={14} className="text-white" />
              </div>
              <label className="text-xs font-semibold text-[var(--text-primary)] w-16 shrink-0">{field.label}</label>
              <Input defaultValue={field.value} placeholder={field.placeholder} className="flex-1" />
            </div>
          ))}
        </div>
      </PremiumSection>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <button className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">Cancel</button>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-xl transition-all hover:scale-[1.02]">
          <Check size={14} /> Save Changes
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// ACCOUNT TAB
// ============================================================================

function AccountTab() {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)

  return (
    <div className="space-y-4">
      {/* Email */}
      <PremiumSection title="Email Address" description="Manage your email addresses" icon={Mail} gradient="from-blue-500 to-indigo-500">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-gradient-to-r from-blue-50/30 to-transparent dark:from-blue-950/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm">
                <Mail size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{currentUser.email}</p>
                <p className="text-[10px] text-[var(--text-muted)]">Primary email</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30">
              <Crown size={10} /> Primary
            </span>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all">
            <Plus size={12} /> Add Email Address
          </button>
        </div>
      </PremiumSection>

      {/* Password */}
      <PremiumSection title="Password" description="Ensure your account uses a strong password" icon={Key} gradient="from-violet-500 to-purple-500">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">Current Password</label>
            <PasswordInput placeholder="Enter current password" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">New Password</label>
            <PasswordInput placeholder="Enter new password" showStrength />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">Confirm New Password</label>
            <PasswordInput placeholder="Confirm new password" />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/25 hover:shadow-lg transition-all hover:scale-[1.02]">
            <Lock size={12} /> Update Password
          </button>
        </div>
      </PremiumSection>

      {/* 2FA */}
      <PremiumSection title="Two-Factor Authentication" description="Add an extra layer of security" icon={Shield} gradient="from-emerald-500 to-teal-500">
        <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-gradient-to-r from-emerald-50/30 to-transparent dark:from-emerald-950/10 p-4">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-md', twoFactorEnabled ? 'from-emerald-500 to-teal-500 shadow-emerald-500/25' : 'from-gray-400 to-gray-500 shadow-gray-400/25')}>
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Two-Factor Authentication</p>
              <p className="text-xs text-[var(--text-muted)]">
                {twoFactorEnabled ? 'Your account is protected with 2FA' : 'Protect your account with an authenticator app'}
              </p>
            </div>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>
        {twoFactorEnabled && (
          <button className="mt-3 flex items-center gap-1.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:shadow-sm transition-all">
            <Settings size={12} /> Configure 2FA
          </button>
        )}
      </PremiumSection>

      {/* Danger Zone */}
      <div className="relative overflow-hidden rounded-xl border border-red-200/50 dark:border-red-800/30 bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-500" />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-md shadow-red-500/25">
              <AlertTriangle size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
              <p className="text-xs text-[var(--text-muted)]">Irreversible actions</p>
            </div>
          </div>
          <div className="rounded-xl border border-red-200/50 dark:border-red-800/30 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-950/10 p-4">
            <p className="text-sm text-[var(--text-secondary)] mb-3">Once you delete your account, there is no going back. All your data will be permanently removed.</p>
            <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-red-500/25 hover:shadow-lg transition-all">
              <Trash2 size={12} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// NOTIFICATIONS TAB
// ============================================================================

function NotificationsTab() {
  const [emailNotifs, setEmailNotifs] = React.useState({ marketing: true, productUpdates: true, securityAlerts: true, weeklyDigest: false })
  const [pushNotifs, setPushNotifs] = React.useState({ newMessages: true, mentions: true, taskReminders: true, teamUpdates: false })
  const [schedule, setSchedule] = React.useState('always')

  return (
    <div className="space-y-4">
      <PremiumSection title="Email Notifications" description="Choose what emails you want to receive" icon={Mail} gradient="from-violet-500 to-purple-500">
        <div className="space-y-3">
          <SwitchWithLabel label="Marketing emails" description="Receive news, offers, and promotions." checked={emailNotifs.marketing} onCheckedChange={(c) => setEmailNotifs(p => ({ ...p, marketing: c }))} />
          <SwitchWithLabel label="Product updates" description="Get notified about new features." checked={emailNotifs.productUpdates} onCheckedChange={(c) => setEmailNotifs(p => ({ ...p, productUpdates: c }))} />
          <SwitchWithLabel label="Security alerts" description="Important account security notifications." checked={emailNotifs.securityAlerts} onCheckedChange={(c) => setEmailNotifs(p => ({ ...p, securityAlerts: c }))} />
          <SwitchWithLabel label="Weekly digest" description="A weekly summary of your activity." checked={emailNotifs.weeklyDigest} onCheckedChange={(c) => setEmailNotifs(p => ({ ...p, weeklyDigest: c }))} />
        </div>
      </PremiumSection>

      <PremiumSection title="Push Notifications" description="Browser and mobile push notifications" icon={Smartphone} gradient="from-blue-500 to-cyan-500">
        <div className="space-y-3">
          <SwitchWithLabel label="New messages" description="Get notified when you receive a new message." checked={pushNotifs.newMessages} onCheckedChange={(c) => setPushNotifs(p => ({ ...p, newMessages: c }))} />
          <SwitchWithLabel label="Mentions" description="Get notified when someone mentions you." checked={pushNotifs.mentions} onCheckedChange={(c) => setPushNotifs(p => ({ ...p, mentions: c }))} />
          <SwitchWithLabel label="Task reminders" description="Get reminded about upcoming deadlines." checked={pushNotifs.taskReminders} onCheckedChange={(c) => setPushNotifs(p => ({ ...p, taskReminders: c }))} />
          <SwitchWithLabel label="Team updates" description="Get notified about team activity." checked={pushNotifs.teamUpdates} onCheckedChange={(c) => setPushNotifs(p => ({ ...p, teamUpdates: c }))} />
        </div>
      </PremiumSection>

      <PremiumSection title="Notification Schedule" description="Control when you receive notifications" icon={Clock} gradient="from-amber-500 to-orange-500">
        <div className="max-w-xs">
          <Select value={schedule} onValueChange={setSchedule}>
            <SelectTrigger>
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="always">Always</SelectItem>
              <SelectItem value="work-hours">Work hours only (9am - 5pm)</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PremiumSection>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-xl transition-all hover:scale-[1.02]">
          <Check size={14} /> Save Preferences
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// BILLING TAB
// ============================================================================

function BillingTab() {
  const billingColumns: ColumnDef<(typeof billingHistory)[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'Invoice', cell: ({ value }) => <span className="font-semibold text-[var(--text-primary)]">{value as string}</span> },
    { id: 'date', accessorKey: 'date', header: 'Date' },
    { id: 'amount', accessorKey: 'amount', header: 'Amount', cell: ({ value }) => <span className="font-semibold text-[var(--text-primary)]">{value as string}</span> },
    { id: 'status', accessorKey: 'status', header: 'Status', cell: ({ value }) => {
      const isPaid = value === 'Paid'
      return (
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border',
          isPaid ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/30'
                 : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-800/30'
        )}>
          {isPaid ? <Check size={10} /> : <AlertTriangle size={10} />}
          {value as string}
        </span>
      )
    }},
  ]

  const billingActions: RowAction<(typeof billingHistory)[0]>[] = [
    { label: 'Download', icon: <Download className="h-4 w-4" />, onClick: () => {/* Handle download invoice */} },
  ]

  const planFeatures = ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom integrations']

  return (
    <div className="space-y-4">
      {/* Current Plan - Premium Card */}
      <div className="relative overflow-hidden rounded-xl border border-amber-200/50 dark:border-amber-800/30 bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />
        <div className="absolute top-8 right-8 h-32 w-32 rounded-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 blur-2xl" />
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                <Crown size={28} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Pro Plan</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/30">
                    <Zap size={10} /> Current
                  </span>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  $49<span className="text-sm font-normal text-[var(--text-muted)]">/month</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all hover:scale-[1.02]">
                <TrendingUp size={14} /> Upgrade Plan
              </button>
              <button className="rounded-xl border border-[var(--border-default)] px-4 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
                Cancel Plan
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
            <div className="grid gap-2 sm:grid-cols-2">
              {planFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                    <Check size={10} className="text-white" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <PremiumSection title="Payment Method" description="Manage your payment information" icon={CreditCard} gradient="from-blue-500 to-indigo-500">
        <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 shadow-sm">
              <span className="text-xs font-bold text-white tracking-wider">VISA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-[var(--text-muted)]">Expires 12/2025</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all">Update</button>
            <button className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-red-500 transition-all">Remove</button>
          </div>
        </div>
      </PremiumSection>

      {/* Billing History */}
      <PremiumSection title="Billing History" description="View and download past invoices" icon={Receipt} gradient="from-emerald-500 to-teal-500">
        <DataTable data={billingHistory} columns={billingColumns} rowActions={billingActions} pagination={false} hoverable />
      </PremiumSection>
    </div>
  )
}

// ============================================================================
// TEAM TAB
// ============================================================================

function TeamTab() {
  const ROLE_CONFIG: Record<string, { gradient: string; lightBg: string; darkBg: string; text: string; border: string }> = {
    Admin: { gradient: 'from-violet-500 to-purple-500', lightBg: 'bg-violet-50', darkBg: 'dark:bg-violet-950/20', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200/50 dark:border-violet-800/30' },
    Member: { gradient: 'from-blue-500 to-indigo-500', lightBg: 'bg-blue-50', darkBg: 'dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/50 dark:border-blue-800/30' },
    Viewer: { gradient: 'from-gray-400 to-gray-500', lightBg: 'bg-gray-50', darkBg: 'dark:bg-gray-950/20', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200/50 dark:border-gray-800/30' },
  }

  const STATUS_CONFIG: Record<string, { gradient: string; lightBg: string; darkBg: string; text: string; border: string; pulse: boolean }> = {
    Active: { gradient: 'from-emerald-500 to-green-500', lightBg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/50 dark:border-emerald-800/30', pulse: true },
    Pending: { gradient: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', darkBg: 'dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200/50 dark:border-amber-800/30', pulse: true },
    Inactive: { gradient: 'from-gray-400 to-gray-500', lightBg: 'bg-gray-50', darkBg: 'dark:bg-gray-950/20', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200/50 dark:border-gray-800/30', pulse: false },
  }

  const teamColumns: ColumnDef<(typeof teamMembers)[0]>[] = [
    { id: 'member', accessorKey: 'name', header: 'Member', cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.avatar} initials={row.name} size="sm" />
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{row.name}</p>
          <p className="text-[10px] text-[var(--text-muted)]">{row.email}</p>
        </div>
      </div>
    )},
    { id: 'role', accessorKey: 'role', header: 'Role', cell: ({ value }) => {
      const cfg = ROLE_CONFIG[value as string]
      return cfg ? (
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
          <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', cfg.gradient)} />
          {value as string}
        </span>
      ) : <span className="text-xs">{value as string}</span>
    }},
    { id: 'status', accessorKey: 'status', header: 'Status', cell: ({ value }) => {
      const cfg = STATUS_CONFIG[value as string]
      return cfg ? (
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border', cfg.lightBg, cfg.darkBg, cfg.text, cfg.border)}>
          <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', cfg.gradient, cfg.pulse && 'animate-pulse')} />
          {value as string}
        </span>
      ) : null
    }},
  ]

  const teamActions: RowAction<(typeof teamMembers)[0]>[] = [
    { label: 'Resend Invite', icon: <Send className="h-4 w-4" />, onClick: () => {/* Handle resend invite */}, hidden: (row) => row.status !== 'Pending' },
    { label: 'Remove', icon: <Trash2 className="h-4 w-4" />, onClick: () => {/* Handle remove member */}, destructive: true },
  ]

  return (
    <div className="space-y-4">
      <PremiumSection title="Team Members" description="Manage your team and permissions" icon={UsersRound} gradient="from-cyan-500 to-blue-500">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-primary)]">5</span> of <span className="font-bold text-[var(--text-primary)]">10</span> seats used
            </span>
            <div className="w-20 h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/25 hover:shadow-lg transition-all hover:scale-[1.02]">
            <Plus size={12} /> Invite Member
          </button>
        </div>
        <DataTable data={teamMembers} columns={teamColumns} rowActions={teamActions} pagination={false} hoverable />
      </PremiumSection>

      {/* Pending Invitations */}
      <PremiumSection title="Pending Invitations" description="Invitations that haven't been accepted yet" icon={Send} gradient="from-amber-500 to-orange-500">
        {pendingInvites.length > 0 ? (
          <div className="space-y-2">
            {pendingInvites.map((invite) => (
              <div key={invite.email} className="flex items-center justify-between rounded-xl border border-[var(--border-default)] p-3 hover:bg-[var(--bg-muted)] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                    <Mail size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{invite.email}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Sent {invite.sentAt}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all">
                    <Send size={10} /> Resend
                  </button>
                  <button className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)] hover:text-red-500 transition-all">
                    <X size={10} /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">No pending invitations.</p>
        )}
      </PremiumSection>
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function SettingsPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* ════════════════ SETTINGS HERO — PROFILE BANNER STYLE ════════════════ */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-md">
        {/* Full-width gradient banner */}
        <div className="h-28 bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
          <div className="absolute top-2.5 left-3 right-3 sm:top-auto sm:left-auto sm:bottom-4 sm:right-6 flex flex-wrap gap-1.5 sm:gap-2 z-10">
            {TAB_CONFIG.map((tab) => (
              <span key={tab.value} className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/20 sm:bg-white/15 backdrop-blur-sm px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium text-white border border-white/20 sm:border-white/10">
                <tab.icon size={11} className="shrink-0" />
                {tab.label}
              </span>
            ))}
          </div>
        </div>

        {/* Profile row overlapping banner */}
        <div className="relative px-6 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
            {/* Avatar with ring */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-400 to-lime-500 p-[3px] shadow-xl shadow-green-500/30">
                <div className="h-full w-full rounded-[13px] bg-[var(--bg-base)] flex items-center justify-center">
                  <Avatar src={currentUser.avatar} initials={`${currentUser.firstName} ${currentUser.lastName}`} size="xl" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg border-2 border-[var(--bg-base)]">
                <Settings size={13} className="text-white" />
              </div>
            </div>

            {/* User info + actions */}
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{currentUser.firstName} {currentUser.lastName}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm text-[var(--text-muted)]">{currentUser.email}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30">
                    <Crown size={9} /> Pro Plan
                  </span>
                </div>
              </div>
              {/* Profile completeness */}
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50/60 to-lime-50/40 dark:from-green-950/15 dark:to-lime-950/10 px-4 py-2.5 border border-green-200/40 dark:border-green-800/20">
                <div className="relative h-11 w-11">
                  <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-default)" strokeWidth="3" />
                    <circle cx="22" cy="22" r="18" fill="none" stroke="url(#settingsGrad)" strokeWidth="3" strokeDasharray={`${0.85 * 113.1} ${113.1}`} strokeLinecap="round" />
                    <defs><linearGradient id="settingsGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#84cc16" /></linearGradient></defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-green-600 dark:text-green-400">85%</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Profile Complete</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Add bio to reach 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ SETTINGS STATS — LARGE CARDS ════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {settingsStats.map((stat) => (
          <div key={stat.title} className="group relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-base)] p-5 shadow-sm hover:shadow-lg hover:shadow-green-500/5 transition-all hover:-translate-y-0.5">
            <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', stat.gradient)} />
            <div className="flex items-start justify-between mb-3">
              <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg', stat.gradient)}>
                {stat.title === 'Profile' && <User size={20} className="text-white" />}
                {stat.title === 'Security' && <Shield size={20} className="text-white" />}
                {stat.title === 'Team' && <Users size={20} className="text-white" />}
                {stat.title === 'Plan' && <Crown size={20} className="text-white" />}
              </div>
              <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                <SparklineChart data={stat.trend} type="area" width={72} height={32} color={stat.color} gradient showDot strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{stat.title}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            </div>
            {/* Bottom progress accent */}
            <div className="mt-3 h-1 rounded-full bg-[var(--bg-muted)] overflow-hidden">
              <div className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', stat.gradient)} style={{ width: stat.title === 'Profile' ? '85%' : stat.title === 'Team' ? '50%' : stat.title === 'Plan' ? '100%' : '82%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════ PREMIUM TABS ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500" />

        <Tabs defaultValue="profile" variant="underline">
          <div className="border-b border-[var(--border-default)] px-5 pt-4 pb-0">
            <TabsList className="w-full justify-start overflow-x-auto gap-1">
              {TAB_CONFIG.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  leftIcon={<tab.icon className="h-4 w-4" />}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-5">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
              </div>
            ) : (
              <>
                <TabsContent value="profile"><ProfileTab /></TabsContent>
                <TabsContent value="account"><AccountTab /></TabsContent>
                <TabsContent value="notifications"><NotificationsTab /></TabsContent>
                <TabsContent value="billing"><BillingTab /></TabsContent>
                <TabsContent value="team"><TeamTab /></TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
