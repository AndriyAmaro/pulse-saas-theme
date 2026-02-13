'use client'

import * as React from 'react'
import {
  Settings,
  User,
  LogOut,
  FileText,
  Search,
  Home,
  Trash2,
  Copy,
  Share,
  LayoutDashboard,
  BarChart3,
  Users,
  Mail,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Input } from '@core/primitives/Input'
import { Card } from '@core/organisms/Card'
import { Modal } from '@core/organisms/Modal'
import { Drawer } from '@core/organisms/Drawer'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@core/organisms/DropdownMenu'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { CommandPalette, type CommandItem as CmdItem, type CommandGroup as CmdGroup } from '@core/organisms/CommandPalette'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { cn } from '@shared/utils/cn'

// ─── Shared Section Wrapper ─────────────────────────────────────────────────

function Section({
  id,
  name,
  description,
  children,
}: {
  id: string
  name: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {name}
        </h2>
        <Badge variant="warning" size="sm">Organism</Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
      <Card>
        <Card.Content className="space-y-6">{children}</Card.Content>
      </Card>
    </section>
  )
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

interface TableRow {
  id: string
  name: string
  email: string
  role: string
  status: string
}

const tableData: TableRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@pulse.dev', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@pulse.dev', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Carol White', email: 'carol@pulse.dev', role: 'Viewer', status: 'Inactive' },
  { id: '4', name: 'David Brown', email: 'david@pulse.dev', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Eva Davis', email: 'eva@pulse.dev', role: 'Admin', status: 'Active' },
]

const tableColumns: ColumnDef<TableRow>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name', sortable: true },
  { id: 'email', accessorKey: 'email', header: 'Email', sortable: true },
  { id: 'role', accessorKey: 'role', header: 'Role', sortable: true },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => (
      <Badge variant={value === 'Active' ? 'success' : 'default'} size="sm">
        {String(value)}
      </Badge>
    ),
  },
]

const chartData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 5000, users: 3800 },
  { month: 'Apr', revenue: 4780, users: 3908 },
  { month: 'May', revenue: 5890, users: 4800 },
  { month: 'Jun', revenue: 6390, users: 3800 },
]

const commandGroups: CmdGroup[] = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" />, onSelect: () => {} },
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, onSelect: () => {} },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, onSelect: () => {} },
      { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" />, onSelect: () => {} },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, shortcut: ['⌘', ','], onSelect: () => {} },
      { id: 'mail', label: 'Send Email', icon: <Mail className="h-4 w-4" />, shortcut: ['⌘', 'E'], onSelect: () => {} },
    ],
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OrganismsShowcasePage() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [modalSize, setModalSize] = React.useState<'sm' | 'md' | 'lg'>('md')
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [drawerSide, setDrawerSide] = React.useState<'left' | 'right' | 'top' | 'bottom'>('right')
  const [cmdOpen, setCmdOpen] = React.useState(false)

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
          Organisms
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          8 complex composites — data tables, modals, drawers, and interactive systems
        </p>
      </div>

      {/* ─── CARD ─────────────────────────────────────────────────────── */}
      <Section id="card" name="Card" description="Compound component with Header, Title, Description, Content, Footer. 5 variants with flexible padding.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(['default', 'outline', 'ghost', 'elevated', 'interactive'] as const).map(
            (variant) => (
              <Card key={variant} variant={variant}>
                <Card.Header>
                  <Card.Title as="h4">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Card.Title>
                  <Card.Description>Card variant: {variant}</Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm text-[var(--text-secondary)]">
                    This is the card content area.
                  </p>
                </Card.Content>
                <Card.Footer justify="end">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Action</Button>
                </Card.Footer>
              </Card>
            )
          )}
        </div>
      </Section>

      {/* ─── CHART WRAPPER ─────────────────────────────────────────────── */}
      <Section id="chart-wrapper" name="ChartWrapper" description="Unified Recharts wrapper supporting area, bar, line, pie charts with dark mode.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Area Chart</h4>
            <ChartWrapper
              type="area"
              data={chartData}
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
                { dataKey: 'users', name: 'Users' },
              ]}
              xAxisKey="month"
              height={220}
              showGrid
              showLegend
              showTooltip
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Bar Chart</h4>
            <ChartWrapper
              type="bar"
              data={chartData}
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
              ]}
              xAxisKey="month"
              height={220}
              showGrid
              showTooltip
            />
          </div>
        </div>
      </Section>

      {/* ─── COMMAND PALETTE ──────────────────────────────────────────── */}
      <Section id="command-palette" name="CommandPalette" description="Spotlight-style command palette (Cmd+K) with search, keyboard navigation, and grouped items.">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setCmdOpen(true)}>
            Open Command Palette
          </Button>
          <span className="text-sm text-[var(--text-muted)]">or press <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-default)] bg-[var(--bg-subtle)] text-xs font-mono">Cmd+K</kbd></span>
        </div>
        <CommandPalette
          open={cmdOpen}
          onOpenChange={setCmdOpen}
          groups={commandGroups}
          placeholder="Type a command or search..."
        />
      </Section>

      {/* ─── DATA TABLE ──────────────────────────────────────────────── */}
      <Section id="data-table" name="DataTable" description="Generic typed table with sorting, filtering, pagination, selection, and mobile card view.">
        <DataTable
          data={tableData}
          columns={tableColumns}
          sortable
          filterable
          filterPlaceholder="Search users..."
          pagination
          pageSize={5}
          selectable
          selectionMode="multiple"
          hoverable
          striped
          getRowId={(row) => row.id}
        />
      </Section>

      {/* ─── DRAWER ──────────────────────────────────────────────────── */}
      <Section id="drawer" name="Drawer" description="Slide-out panel from any edge with 4 directions and 5 sizes.">
        <div className="flex flex-wrap gap-3">
          {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
            <Button
              key={side}
              variant="outline"
              onClick={() => {
                setDrawerSide(side)
                setDrawerOpen(true)
              }}
            >
              Open {side}
            </Button>
          ))}
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Drawer.Content side={drawerSide}>
            <Drawer.Header>
              <Drawer.Title>Drawer — {drawerSide}</Drawer.Title>
              <Drawer.Description>
                This drawer slides in from the {drawerSide}.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <p className="text-sm text-[var(--text-secondary)]">
                Drawer content goes here. You can put forms, lists, or any content.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Close</Button>
              <Button>Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </Section>

      {/* ─── DROPDOWN MENU ───────────────────────────────────────────── */}
      <Section id="dropdown-menu" name="DropdownMenu" description="Context menu with items, sub-menus, separators, and keyboard navigation.">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error-base">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      {/* ─── FORM ────────────────────────────────────────────────────── */}
      <Section id="form" name="Form" description="Form system built on React Hook Form + Zod with controlled fields and validation.">
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">Name</label>
            <Input placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Full form with Zod validation, ControlledField, FormSection, FormActions available.
          </p>
        </div>
      </Section>

      {/* ─── MODAL ───────────────────────────────────────────────────── */}
      <Section id="modal" name="Modal" description="Dialog overlay with 8 sizes, compound components, and smooth animations.">
        <div className="flex flex-wrap gap-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => {
                setModalSize(size)
                setModalOpen(true)
              }}
            >
              Open {size.toUpperCase()}
            </Button>
          ))}
        </div>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <Modal.Content size={modalSize}>
            <Modal.Header>
              <Modal.Title>Modal — {modalSize.toUpperCase()}</Modal.Title>
              <Modal.Description>
                This is a {modalSize} sized modal dialog.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-[var(--text-secondary)]">
                Modal content goes here. Supports Header, Title, Description, Body, Footer, and Close sub-components.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Section>
    </div>
  )
}
