'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Building2,
  Users,
  Briefcase,
  Clock,
  Shield,
  Edit,
  UserX,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Smartphone,
  Chrome,
  Globe2,
  AlertCircle,
  Check,
  X,
} from 'lucide-react'

import { PageHeader } from '@core/layouts/PageHeader'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Avatar } from '@core/primitives/Avatar'
import { Badge } from '@core/primitives/Badge'
import { Tag, TagGroup } from '@core/primitives/Tag'
import { Checkbox } from '@core/primitives/Checkbox'
import { Divider } from '@core/primitives/Divider'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { Breadcrumbs } from '@core/patterns/Breadcrumbs'
import { cn } from '@shared/utils/cn'

// Mock user data - varies by ID
const usersData: Record<string, {
  id: string
  name: string
  role: string
  location: string
  email: string
  phone: string
  birthday: string
  gender: string
  language: string
  timezone: string
  company: string
  department: string
  position: string
  startDate: string
  reportsTo: string
  employeeId: string
  avatar?: string
  isPro: boolean
  isVerified: boolean
  status: 'Active' | 'Inactive' | 'Pending'
  userRole: 'Admin' | 'Manager' | 'Member' | 'Viewer'
  stats: { projects: number; followers: number; following: number }
  bio: string
  skills: string[]
}> = {
  'user-1': {
    id: 'user-1',
    name: 'John Doe',
    role: 'Senior Product Designer',
    location: 'San Francisco, CA',
    email: 'john.doe@acme.com',
    phone: '+1 (555) 123-4567',
    birthday: 'March 15, 1992',
    gender: 'Male',
    language: 'English',
    timezone: 'PST (UTC-8)',
    company: 'Acme Inc',
    department: 'Design',
    position: 'Senior Designer',
    startDate: 'January 2022',
    reportsTo: 'Jane Smith',
    employeeId: 'EMP-2847',
    isPro: true,
    isVerified: true,
    status: 'Active',
    userRole: 'Admin',
    stats: { projects: 24, followers: 1200, following: 340 },
    bio: 'Passionate product designer with 8+ years of experience.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
  },
  'user-2': {
    id: 'user-2',
    name: 'Maria Garcia',
    role: 'Design Manager',
    location: 'New York, NY',
    email: 'maria.garcia@acme.com',
    phone: '+1 (555) 234-5678',
    birthday: 'July 22, 1988',
    gender: 'Female',
    language: 'English, Spanish',
    timezone: 'EST (UTC-5)',
    company: 'Acme Inc',
    department: 'Design',
    position: 'Design Manager',
    startDate: 'March 2020',
    reportsTo: 'David Wilson',
    employeeId: 'EMP-1923',
    isPro: true,
    isVerified: true,
    status: 'Active',
    userRole: 'Manager',
    stats: { projects: 45, followers: 2300, following: 180 },
    bio: 'Leading design teams to create exceptional user experiences.',
    skills: ['Leadership', 'Design Strategy', 'Team Management', 'UI Design'],
  },
  'user-3': {
    id: 'user-3',
    name: 'Wei Chen',
    role: 'Software Engineer',
    location: 'Seattle, WA',
    email: 'wei.chen@acme.com',
    phone: '+1 (555) 345-6789',
    birthday: 'December 3, 1995',
    gender: 'Male',
    language: 'English, Mandarin',
    timezone: 'PST (UTC-8)',
    company: 'Acme Inc',
    department: 'Engineering',
    position: 'Senior Engineer',
    startDate: 'August 2021',
    reportsTo: 'James Wilson',
    employeeId: 'EMP-3156',
    isPro: false,
    isVerified: true,
    status: 'Active',
    userRole: 'Member',
    stats: { projects: 32, followers: 890, following: 210 },
    bio: 'Full-stack developer passionate about clean code.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  },
}

// Default user for unknown IDs
const defaultUser = {
  id: 'unknown',
  name: 'Unknown User',
  role: 'Team Member',
  location: 'Unknown',
  email: 'user@acme.com',
  phone: '+1 (555) 000-0000',
  birthday: 'January 1, 1990',
  gender: 'Not specified',
  language: 'English',
  timezone: 'UTC',
  company: 'Acme Inc',
  department: 'General',
  position: 'Member',
  startDate: 'January 2024',
  reportsTo: 'Manager',
  employeeId: 'EMP-0000',
  isPro: false,
  isVerified: false,
  status: 'Pending' as const,
  userRole: 'Member' as const,
  stats: { projects: 0, followers: 0, following: 0 },
  bio: 'No bio available.',
  skills: [],
}

// Permissions data
const permissions = [
  { id: 'users.view', label: 'View Users', description: 'Can view user profiles and list' },
  { id: 'users.create', label: 'Create Users', description: 'Can invite and create new users' },
  { id: 'users.edit', label: 'Edit Users', description: 'Can modify user information' },
  { id: 'users.delete', label: 'Delete Users', description: 'Can remove users from the system' },
  { id: 'projects.view', label: 'View Projects', description: 'Can view project details' },
  { id: 'projects.create', label: 'Create Projects', description: 'Can create new projects' },
  { id: 'projects.edit', label: 'Edit Projects', description: 'Can modify project settings' },
  { id: 'projects.delete', label: 'Delete Projects', description: 'Can delete projects' },
  { id: 'billing.view', label: 'View Billing', description: 'Can view billing information' },
  { id: 'billing.manage', label: 'Manage Billing', description: 'Can update payment methods' },
  { id: 'settings.view', label: 'View Settings', description: 'Can view system settings' },
  { id: 'settings.manage', label: 'Manage Settings', description: 'Can modify system settings' },
]

// Role permissions map
const rolePermissions: Record<string, string[]> = {
  Admin: permissions.map((p) => p.id),
  Manager: [
    'users.view',
    'users.create',
    'users.edit',
    'projects.view',
    'projects.create',
    'projects.edit',
    'projects.delete',
    'billing.view',
    'settings.view',
  ],
  Member: ['users.view', 'projects.view', 'projects.create', 'projects.edit'],
  Viewer: ['users.view', 'projects.view'],
}

// Login history data
interface LoginEntry {
  id: string
  timestamp: string
  device: string
  browser: string
  location: string
  ip: string
  status: 'Success' | 'Failed'
}

const loginHistory: LoginEntry[] = [
  {
    id: '1',
    timestamp: '2026-02-06 14:30:00',
    device: 'Desktop',
    browser: 'Chrome 121',
    location: 'San Francisco, CA',
    ip: '192.168.1.100',
    status: 'Success',
  },
  {
    id: '2',
    timestamp: '2026-02-06 09:15:00',
    device: 'Mobile',
    browser: 'Safari 17',
    location: 'San Francisco, CA',
    ip: '192.168.1.101',
    status: 'Success',
  },
  {
    id: '3',
    timestamp: '2026-02-05 18:45:00',
    device: 'Desktop',
    browser: 'Chrome 121',
    location: 'San Francisco, CA',
    ip: '192.168.1.100',
    status: 'Success',
  },
  {
    id: '4',
    timestamp: '2026-02-05 08:00:00',
    device: 'Desktop',
    browser: 'Firefox 122',
    location: 'Unknown',
    ip: '45.33.32.156',
    status: 'Failed',
  },
  {
    id: '5',
    timestamp: '2026-02-04 16:20:00',
    device: 'Mobile',
    browser: 'Chrome Mobile',
    location: 'Oakland, CA',
    ip: '192.168.2.50',
    status: 'Success',
  },
]

// Activity data
const activityItems: ActivityItem[] = [
  {
    id: '1',
    title: 'Updated profile information',
    description: 'Changed bio and skills',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'info',
  },
  {
    id: '2',
    title: 'Completed security verification',
    description: 'Two-factor authentication enabled',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: 'success',
  },
  {
    id: '3',
    title: 'Changed password',
    description: 'Password updated successfully',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    type: 'default',
  },
  {
    id: '4',
    title: 'Failed login attempt',
    description: 'From unknown IP address',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    type: 'error',
  },
  {
    id: '5',
    title: 'Role changed to Admin',
    description: 'Promoted by Jane Smith',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: 'success',
  },
]

// Info Row Component
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-muted)]">
        <Icon className="h-4 w-4 text-[var(--text-muted)]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export default function UserDetailPage() {
  const params = useParams()
  const userId = params.id as string

  // Get user data or default
  const userData = usersData[userId] || { ...defaultUser, id: userId }
  const userPermissions = rolePermissions[userData.userRole] || []

  // Login history columns
  const loginColumns: ColumnDef<LoginEntry>[] = [
    {
      id: 'timestamp',
      accessorKey: 'timestamp',
      header: 'Date & Time',
      cell: ({ value }) => (
        <span className="text-sm text-[var(--text-primary)]">{value as string}</span>
      ),
    },
    {
      id: 'device',
      accessorKey: 'device',
      header: 'Device',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.device === 'Desktop' ? (
            <Monitor className="h-4 w-4 text-[var(--text-muted)]" />
          ) : (
            <Smartphone className="h-4 w-4 text-[var(--text-muted)]" />
          )}
          <span>{row.device}</span>
        </div>
      ),
    },
    {
      id: 'browser',
      accessorKey: 'browser',
      header: 'Browser',
    },
    {
      id: 'location',
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-[var(--text-muted)]" />
          <span>{row.location}</span>
        </div>
      ),
    },
    {
      id: 'ip',
      accessorKey: 'ip',
      header: 'IP Address',
      cell: ({ value }) => (
        <code className="rounded bg-[var(--bg-muted)] px-1.5 py-0.5 text-xs">
          {value as string}
        </code>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ value }) => (
        <Badge
          variant={value === 'Success' ? 'success' : 'error'}
          size="sm"
        >
          {value as string}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header with Breadcrumbs */}
      <PageHeader
        title={userData.name}
        description={userData.role}
        breadcrumbs={[
          { label: 'Users', href: '/users' },
          { label: userData.name },
        ]}
        renderBreadcrumbLink={(item, isLast, children) =>
          isLast ? (
            children
          ) : (
            <Link href={item.href || '#'} className="hover:text-primary-500">
              {children}
            </Link>
          )
        }
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />}>
              Edit User
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UserX className="h-4 w-4" />}
            >
              Disable
            </Button>
            <Button
              variant="danger-outline"
              size="sm"
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Delete
            </Button>
          </>
        }
      />

      {/* Profile Hero Card */}
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div
          className={cn(
            'relative h-32 sm:h-40',
            'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500'
          )}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative px-4 pb-6 sm:px-6">
          {/* Avatar */}
          <div className="-mt-12 sm:-mt-16">
            <div className="relative inline-block">
              <Avatar
                src={userData.avatar}
                initials={userData.name}
                size="2xl"
                status={userData.status === 'Active' ? 'online' : userData.status === 'Inactive' ? 'offline' : 'away'}
                className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-[var(--bg-base)]"
              />
              {userData.isVerified && (
                <div className="absolute -right-1 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 ring-2 ring-[var(--bg-base)]">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Badges */}
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {userData.name}
              </h2>
              <Badge
                variant={
                  userData.userRole === 'Admin'
                    ? 'primary'
                    : userData.userRole === 'Manager'
                      ? 'info'
                      : 'secondary'
                }
                size="sm"
              >
                {userData.userRole}
              </Badge>
              <Badge
                variant={
                  userData.status === 'Active'
                    ? 'success'
                    : userData.status === 'Inactive'
                      ? 'secondary'
                      : 'warning'
                }
                size="sm"
                dot
              >
                {userData.status}
              </Badge>
              {userData.isPro && (
                <Badge variant="primary" size="sm">
                  Pro Member
                </Badge>
              )}
            </div>
            <p className="mt-1 text-[var(--text-muted)]">{userData.role}</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <MapPin className="h-4 w-4" />
              <span>{userData.location}</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-6 flex items-center gap-6 border-t border-[var(--border-default)] pt-6">
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {userData.stats.projects}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Projects</p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {formatNumber(userData.stats.followers)}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Followers</p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {userData.stats.following}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Following</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Two Column Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Info */}
        <Card>
          <Card.Header>
            <Card.Title>Personal Information</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-1">
            <InfoRow icon={Mail} label="Email" value={userData.email} />
            <InfoRow icon={Phone} label="Phone" value={userData.phone} />
            <InfoRow icon={Calendar} label="Birthday" value={userData.birthday} />
            <InfoRow icon={Users} label="Gender" value={userData.gender} />
            <InfoRow icon={Globe} label="Language" value={userData.language} />
            <InfoRow icon={Clock} label="Timezone" value={userData.timezone} />
          </Card.Content>
        </Card>

        {/* Work Info */}
        <Card>
          <Card.Header>
            <Card.Title>Work Information</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-1">
            <InfoRow icon={Building2} label="Company" value={userData.company} />
            <InfoRow icon={Users} label="Department" value={userData.department} />
            <InfoRow icon={Briefcase} label="Position" value={userData.position} />
            <InfoRow icon={Calendar} label="Start Date" value={userData.startDate} />
            <InfoRow icon={Users} label="Reports to" value={userData.reportsTo} />
            <InfoRow icon={Shield} label="Employee ID" value={userData.employeeId} />
          </Card.Content>
        </Card>
      </div>

      {/* Permissions Section */}
      <Card>
        <Card.Header>
          <Card.Title>Permissions</Card.Title>
          <Card.Description>
            Based on the {userData.userRole} role. Contact an admin to modify permissions.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {permissions.map((permission) => {
              const hasPermission = userPermissions.includes(permission.id)
              return (
                <div
                  key={permission.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3 transition-colors',
                    hasPermission
                      ? 'border-success-200 bg-success-50/50 dark:border-success-800 dark:bg-success-950/20'
                      : 'border-[var(--border-default)] bg-[var(--bg-subtle)]'
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                      hasPermission
                        ? 'bg-success-500 text-white'
                        : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                    )}
                  >
                    {hasPermission ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        hasPermission
                          ? 'text-[var(--text-primary)]'
                          : 'text-[var(--text-muted)]'
                      )}
                    >
                      {permission.label}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {permission.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card.Content>
      </Card>

      {/* Login History Section */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between">
          <div>
            <Card.Title>Login History</Card.Title>
            <Card.Description>Recent account access logs</Card.Description>
          </div>
          <Button variant="link" size="sm" rightIcon={<ExternalLink className="h-3 w-3" />}>
            View All
          </Button>
        </Card.Header>
        <Card.Content>
          <DataTable
            data={loginHistory}
            columns={loginColumns}
            pagination={false}
            hoverable
            compact
          />
        </Card.Content>
      </Card>

      {/* Activity Section */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between">
          <Card.Title>Audit Log</Card.Title>
          <Button variant="link" size="sm" rightIcon={<ExternalLink className="h-3 w-3" />}>
            View All
          </Button>
        </Card.Header>
        <Card.Content>
          <ActivityTimeline items={activityItems} />
        </Card.Content>
      </Card>
    </div>
  )
}
