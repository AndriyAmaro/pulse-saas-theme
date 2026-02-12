'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Users,
  UserPlus,
  Download,
  Search,
  Filter,
  LayoutGrid,
  List,
  Eye,
  Edit,
  Trash2,
  UserX,
  MoreHorizontal,
  ChevronDown,
  X,
  TrendingUp,
  Sparkles,
  Shield,
  UserCheck,
  Clock,
  Building2,
  Activity,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Avatar } from '@core/primitives/Avatar'
import { Badge } from '@core/primitives/Badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/primitives/Select'
import { SearchBar } from '@core/patterns/SearchBar'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { EmptyState } from '@core/patterns/EmptyState'
import { DataTable, type ColumnDef, type RowAction } from '@core/organisms/DataTable'
import { cn } from '@shared/utils/cn'

// ============================================================================
// TYPES
// ============================================================================

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'Admin' | 'Manager' | 'Member' | 'Viewer'
  department: 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'HR'
  status: 'Active' | 'Inactive' | 'Pending'
  lastActive: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ROLE_CONFIG: Record<User['role'], { variant: 'primary' | 'info' | 'secondary' | 'warning'; gradient: string; color: string }> = {
  Admin: { variant: 'primary', gradient: 'from-cyan-500 to-blue-500', color: '#06b6d4' },
  Manager: { variant: 'info', gradient: 'from-violet-500 to-purple-500', color: '#8b5cf6' },
  Member: { variant: 'secondary', gradient: 'from-slate-400 to-slate-500', color: '#94a3b8' },
  Viewer: { variant: 'warning', gradient: 'from-amber-500 to-orange-500', color: '#f59e0b' },
}

const STATUS_CONFIG: Record<User['status'], { variant: 'success' | 'secondary' | 'warning'; gradient: string; dot: string }> = {
  Active: { variant: 'success', gradient: 'from-emerald-500 to-green-500', dot: 'bg-emerald-500' },
  Inactive: { variant: 'secondary', gradient: 'from-slate-400 to-slate-500', dot: 'bg-slate-400' },
  Pending: { variant: 'warning', gradient: 'from-amber-500 to-yellow-500', dot: 'bg-amber-500' },
}

const DEPT_COLORS: Record<User['department'], { bg: string; text: string; gradient: string }> = {
  Engineering: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', gradient: 'from-blue-500 to-indigo-500' },
  Design: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300', gradient: 'from-violet-500 to-purple-500' },
  Marketing: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', gradient: 'from-pink-500 to-rose-500' },
  Sales: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', gradient: 'from-emerald-500 to-teal-500' },
  HR: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', gradient: 'from-amber-500 to-orange-500' },
}

// ============================================================================
// STATS DATA
// ============================================================================

const userStats = {
  total: { trend: [15, 16, 17, 18, 19, 20, 20, 21, 22, 23, 23, 24] },
  active: { trend: [10, 11, 12, 13, 14, 14, 15, 15, 16, 17, 17, 18] },
  inactive: { trend: [3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3] },
  pending: { trend: [2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3] },
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUsers: User[] = [
  { id: 'user-1', name: 'John Doe', email: 'john.doe@acme.com', role: 'Admin', department: 'Engineering', status: 'Active', lastActive: '2 minutes ago' },
  { id: 'user-2', name: 'Maria Garcia', email: 'maria.garcia@acme.com', role: 'Manager', department: 'Design', status: 'Active', lastActive: '15 minutes ago' },
  { id: 'user-3', name: 'Wei Chen', email: 'wei.chen@acme.com', role: 'Member', department: 'Engineering', status: 'Active', lastActive: '1 hour ago' },
  { id: 'user-4', name: 'Sarah Johnson', email: 'sarah.johnson@acme.com', role: 'Admin', department: 'HR', status: 'Active', lastActive: '3 hours ago' },
  { id: 'user-5', name: 'Michael Brown', email: 'michael.brown@acme.com', role: 'Member', department: 'Sales', status: 'Active', lastActive: '5 hours ago' },
  { id: 'user-6', name: 'Emily Davis', email: 'emily.davis@acme.com', role: 'Viewer', department: 'Marketing', status: 'Pending', lastActive: 'Never' },
  { id: 'user-7', name: 'James Wilson', email: 'james.wilson@acme.com', role: 'Manager', department: 'Engineering', status: 'Active', lastActive: '2 hours ago' },
  { id: 'user-8', name: 'Lisa Martinez', email: 'lisa.martinez@acme.com', role: 'Member', department: 'Design', status: 'Active', lastActive: '30 minutes ago' },
  { id: 'user-9', name: 'David Lee', email: 'david.lee@acme.com', role: 'Member', department: 'Engineering', status: 'Inactive', lastActive: '2 weeks ago' },
  { id: 'user-10', name: 'Anna Thompson', email: 'anna.thompson@acme.com', role: 'Viewer', department: 'Marketing', status: 'Active', lastActive: '1 day ago' },
  { id: 'user-11', name: 'Robert Kim', email: 'robert.kim@acme.com', role: 'Member', department: 'Sales', status: 'Active', lastActive: '4 hours ago' },
  { id: 'user-12', name: 'Jennifer White', email: 'jennifer.white@acme.com', role: 'Manager', department: 'HR', status: 'Active', lastActive: '1 hour ago' },
  { id: 'user-13', name: 'Thomas Anderson', email: 'thomas.anderson@acme.com', role: 'Member', department: 'Engineering', status: 'Active', lastActive: '45 minutes ago' },
  { id: 'user-14', name: 'Sandra Miller', email: 'sandra.miller@acme.com', role: 'Viewer', department: 'Design', status: 'Pending', lastActive: 'Never' },
  { id: 'user-15', name: 'Christopher Taylor', email: 'chris.taylor@acme.com', role: 'Member', department: 'Marketing', status: 'Active', lastActive: '6 hours ago' },
  { id: 'user-16', name: 'Michelle Harris', email: 'michelle.harris@acme.com', role: 'Member', department: 'Sales', status: 'Active', lastActive: '20 minutes ago' },
  { id: 'user-17', name: 'Daniel Clark', email: 'daniel.clark@acme.com', role: 'Admin', department: 'Engineering', status: 'Active', lastActive: '10 minutes ago' },
  { id: 'user-18', name: 'Patricia Lewis', email: 'patricia.lewis@acme.com', role: 'Viewer', department: 'HR', status: 'Inactive', lastActive: '1 month ago' },
  { id: 'user-19', name: 'Kevin Robinson', email: 'kevin.robinson@acme.com', role: 'Member', department: 'Design', status: 'Active', lastActive: '3 hours ago' },
  { id: 'user-20', name: 'Nancy Walker', email: 'nancy.walker@acme.com', role: 'Manager', department: 'Marketing', status: 'Active', lastActive: '1 hour ago' },
  { id: 'user-21', name: 'Steven Hall', email: 'steven.hall@acme.com', role: 'Member', department: 'Engineering', status: 'Pending', lastActive: 'Never' },
  { id: 'user-22', name: 'Betty Young', email: 'betty.young@acme.com', role: 'Viewer', department: 'Sales', status: 'Inactive', lastActive: '3 weeks ago' },
  { id: 'user-23', name: 'George Allen', email: 'george.allen@acme.com', role: 'Member', department: 'Engineering', status: 'Active', lastActive: '8 hours ago' },
  { id: 'user-24', name: 'Dorothy King', email: 'dorothy.king@acme.com', role: 'Member', department: 'Design', status: 'Active', lastActive: '2 days ago' },
]

// Stats
const stats = {
  total: mockUsers.length,
  active: mockUsers.filter((u) => u.status === 'Active').length,
  inactive: mockUsers.filter((u) => u.status === 'Inactive').length,
  pending: mockUsers.filter((u) => u.status === 'Pending').length,
}

// ============================================================================
// USER CARD — Premium Diamond (Grid View)
// ============================================================================

function UserCard({ user }: { user: User }) {
  const deptConfig = DEPT_COLORS[user.department]
  const roleConfig = ROLE_CONFIG[user.role]
  const statusConfig = STATUS_CONFIG[user.status]

  return (
    <Link href={`/users/${user.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] transition-all duration-300 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700 hover:scale-[1.01]">
        {/* Gradient top bar */}
        <div className={cn('h-1 w-full bg-gradient-to-r', roleConfig.gradient)} />

        <div className="p-5">
          <div className="flex flex-col items-center text-center">
            {/* Premium avatar ring */}
            <div className="relative mb-4">
              <div className={cn('absolute -inset-1 rounded-full bg-gradient-to-r opacity-50', roleConfig.gradient)} />
              <Avatar
                src={user.avatar}
                initials={user.name}
                size="xl"
                status={user.status === 'Active' ? 'online' : user.status === 'Inactive' ? 'offline' : 'away'}
                className="relative"
              />
            </div>

            <h3 className="font-bold text-[var(--text-primary)] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {user.name}
            </h3>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{user.email}</p>

            {/* Role + Status badges */}
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <span className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                'bg-gradient-to-r text-white shadow-sm',
                roleConfig.gradient
              )}>
                {user.role}
              </span>
              <span className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                user.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                user.status === 'Inactive' ? 'bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400' :
                'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              )}>
                <span className={cn('h-1.5 w-1.5 rounded-full', statusConfig.dot, user.status === 'Active' && 'animate-pulse')} />
                {user.status}
              </span>
            </div>

            {/* Department + Last Active */}
            <div className="mt-3 flex items-center gap-2">
              <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium', deptConfig.bg, deptConfig.text)}>
                <span className={cn('h-1 w-1 rounded-full bg-gradient-to-r', deptConfig.gradient)} />
                {user.department}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{user.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Bottom accent on hover */}
        <div className={cn('h-0.5 w-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity', roleConfig.gradient)} />
      </div>
    </Link>
  )
}

// ============================================================================
// BULK ACTIONS BAR — Premium Diamond
// ============================================================================

function BulkActionsBar({
  selectedCount,
  onDelete,
  onExport,
  onClear,
}: {
  selectedCount: number
  onDelete: () => void
  onExport: () => void
  onClear: () => void
}) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-bottom-4">
      <div className="relative overflow-hidden flex items-center gap-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-[var(--bg-base)] px-5 py-3 shadow-xl shadow-cyan-500/10">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-sm">
          <Users size={14} className="text-white" />
        </div>
        <span className="text-sm font-bold text-[var(--text-primary)]">
          {selectedCount} user{selectedCount > 1 ? 's' : ''} selected
        </span>
        <div className="h-5 w-px bg-[var(--border-default)]" />
        <div className="flex gap-2">
          <button onClick={onExport} className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:border-cyan-300 dark:hover:border-cyan-700 hover:text-cyan-600 transition-all">
            <Download size={12} /> Export
          </button>
          <button onClick={onDelete} className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:shadow-red-500/20 transition-all">
            <Trash2 size={12} /> Delete
          </button>
        </div>
        <button
          onClick={onClear}
          className="ml-1 rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-cyan-100 dark:hover:bg-cyan-900/20 hover:text-cyan-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE — Premium Diamond
// ============================================================================

export default function UsersPage() {
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [roleFilter, setRoleFilter] = React.useState<string>('all')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = React.useState<string>('all')
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

  const filteredUsers = React.useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment
    })
  }, [searchQuery, roleFilter, statusFilter, departmentFilter])

  const clearFilters = () => {
    setSearchQuery('')
    setRoleFilter('all')
    setStatusFilter('all')
    setDepartmentFilter('all')
  }

  const hasActiveFilters =
    searchQuery || roleFilter !== 'all' || statusFilter !== 'all' || departmentFilter !== 'all'

  // Table columns — Premium
  const columns: ColumnDef<User>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <Link href={`/users/${row.id}`} className="flex items-center gap-3 group">
          <Avatar
            src={row.avatar}
            initials={row.name}
            size="sm"
            status={row.status === 'Active' ? 'online' : row.status === 'Inactive' ? 'offline' : 'away'}
          />
          <div className="min-w-0">
            <p className="font-semibold text-[var(--text-primary)] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {row.name}
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">{row.email}</p>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
      cell: ({ value }) => {
        const config = ROLE_CONFIG[value as User['role']]
        return (
          <span className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r shadow-sm',
            config.gradient
          )}>
            {value as string}
          </span>
        )
      },
      sortable: true,
    },
    {
      id: 'department',
      accessorKey: 'department',
      header: 'Department',
      cell: ({ value }) => {
        const config = DEPT_COLORS[value as User['department']]
        return (
          <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium', config.bg, config.text)}>
            <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', config.gradient)} />
            {value as string}
          </span>
        )
      },
      sortable: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ value }) => {
        const config = STATUS_CONFIG[value as User['status']]
        return (
          <span className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
            value === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
            value === 'Inactive' ? 'bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400' :
            'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          )}>
            <span className={cn('h-1.5 w-1.5 rounded-full', config.dot, value === 'Active' && 'animate-pulse')} />
            {value as string}
          </span>
        )
      },
      sortable: true,
    },
    {
      id: 'lastActive',
      accessorKey: 'lastActive',
      header: 'Last Active',
      cell: ({ value }) => (
        <span className="text-xs text-[var(--text-muted)]">{value as string}</span>
      ),
    },
  ]

  const rowActions: RowAction<User>[] = [
    {
      label: 'View Profile',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row) => (window.location.href = `/users/${row.id}`),
    },
    {
      label: 'Edit User',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => console.log('Edit user:', row.id),
    },
    {
      label: 'Disable User',
      icon: <UserX className="h-4 w-4" />,
      onClick: (row) => console.log('Disable user:', row.id),
      hidden: (row) => row.status === 'Inactive',
    },
    {
      label: 'Delete User',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row) => console.log('Delete user:', row.id),
      destructive: true,
    },
  ]

  return (
    <div className="space-y-5">
      {/* ════════════════ PREMIUM HERO HEADER ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />

        <div className="relative flex items-center justify-between px-6 py-5 bg-gradient-to-r from-cyan-50/40 to-transparent dark:from-cyan-950/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
                <Users size={28} className="text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-md shadow-emerald-500/25">
                <Sparkles size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Users</h1>
              <p className="mt-0.5 text-sm text-[var(--text-muted)]">Manage all {stats.total} users in your organization</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active users badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/10 px-3 py-1.5 border border-emerald-200/50 dark:border-emerald-800/30">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{stats.active} online</span>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-cyan-300 dark:hover:border-cyan-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]">
              <UserPlus size={16} /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM STATS BAR ════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {/* Total Users */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-cyan-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/25">
                <Users size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Total Users</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{stats.total}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">+4 this month</span>
                </div>
              </div>
            </div>
            <SparklineChart data={userStats.total.trend} color="#06b6d4" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Active */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-emerald-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-md shadow-emerald-500/25">
                <UserCheck size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Active</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{stats.active}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">+12%</span>
                </div>
              </div>
            </div>
            <SparklineChart data={userStats.active.trend} color="#10b981" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Inactive */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-slate-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-400 to-slate-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 shadow-md shadow-slate-500/25">
                <UserX size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Inactive</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{stats.inactive}</p>
                  <span className="text-[10px] font-medium text-[var(--text-muted)]">stable</span>
                </div>
              </div>
            </div>
            <SparklineChart data={userStats.inactive.trend} color="#94a3b8" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Pending */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-amber-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-md shadow-amber-500/25">
                <Clock size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Pending</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{stats.pending}</p>
                  <span className="text-[10px] font-medium text-amber-500">awaiting</span>
                </div>
              </div>
            </div>
            <SparklineChart data={userStats.pending.trend} color="#f59e0b" width={64} height={28} showDot animated gradient />
          </div>
        </div>
      </div>

      {/* ════════════════ FILTERS — Premium Diamond ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-wrap gap-3">
              <SearchBar
                placeholder="Search by name or email..."
                value={searchQuery}
                onSearch={setSearchQuery}
                onClear={() => setSearchQuery('')}
                className="w-full sm:w-64"
              />

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-colors"
                >
                  <X size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* View Toggle — Premium */}
            <div className="flex items-center gap-0.5 rounded-lg border border-[var(--border-default)] p-0.5 bg-[var(--bg-subtle)]">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded-md p-2 transition-all',
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded-md p-2 transition-all',
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active filters summary */}
          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Filter size={12} className="text-cyan-500" />
              <span>Showing <span className="font-bold text-cyan-600 dark:text-cyan-400">{filteredUsers.length}</span> of {stats.total} users</span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════ CONTENT — Premium Diamond ════════════════ */}
      {filteredUsers.length === 0 ? (
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="relative mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl shadow-cyan-500/25">
                <Users size={36} className="text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
                <Search size={14} className="text-white" />
              </div>
            </div>
            <h3 className="mb-1 text-xl font-bold text-[var(--text-primary)]">No users found</h3>
            <p className="text-sm text-[var(--text-muted)] max-w-[300px]">
              {hasActiveFilters
                ? 'Try adjusting your filters to find what you are looking for.'
                : 'Get started by adding your first user.'}
            </p>
            <div className="mt-4">
              {hasActiveFilters ? (
                <button onClick={clearFilters} className="flex items-center gap-2 rounded-lg border border-cyan-200 dark:border-cyan-800 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-colors">
                  <X size={14} /> Clear Filters
                </button>
              ) : (
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all">
                  <UserPlus size={16} /> Add User
                </button>
              )}
            </div>
          </div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <DataTable
            data={filteredUsers}
            columns={columns}
            rowActions={rowActions}
            sortable
            selectable
            selectionMode="multiple"
            selectedRows={selectedUsers}
            onSelectionChange={setSelectedUsers}
            getRowId={(row) => row.id}
            pagination
            pageSize={10}
            hoverable
            stickyHeader
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* ════════════════ DEPARTMENT BREAKDOWN — Premium ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
        <div className="px-5 py-4 bg-gradient-to-r from-cyan-50/20 to-transparent dark:from-cyan-950/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/20">
              <Building2 size={14} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Department Breakdown</h3>
          </div>

          {/* Department bar */}
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-[var(--bg-muted)]">
            {(Object.entries(DEPT_COLORS) as [User['department'], typeof DEPT_COLORS[User['department']]][]).map(([dept, config]) => {
              const count = mockUsers.filter(u => u.department === dept).length
              const pct = (count / mockUsers.length) * 100
              return (
                <div
                  key={dept}
                  className={cn('h-full bg-gradient-to-r first:rounded-l-full last:rounded-r-full', config.gradient)}
                  style={{ width: `${pct}%` }}
                  title={`${dept}: ${count} (${Math.round(pct)}%)`}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
            {(Object.entries(DEPT_COLORS) as [User['department'], typeof DEPT_COLORS[User['department']]][]).map(([dept, config]) => {
              const count = mockUsers.filter(u => u.department === dept).length
              return (
                <div key={dept} className="flex items-center gap-1.5">
                  <div className={cn('h-2.5 w-2.5 rounded-full bg-gradient-to-r', config.gradient)} />
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">{dept} ({count})</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedUsers.length}
        onDelete={() => {
          console.log('Delete users:', selectedUsers.map((u) => u.id))
          setSelectedUsers([])
        }}
        onExport={() => {
          console.log('Export users:', selectedUsers.map((u) => u.id))
        }}
        onClear={() => setSelectedUsers([])}
      />
    </div>
  )
}
