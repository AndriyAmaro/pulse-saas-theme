'use client'

import * as React from 'react'
import {
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Search,
  Bell,
  User,
  Home,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Card } from '@core/organisms/Card'
import { PageHeader } from '@core/layouts/PageHeader'
import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { cn } from '@shared/utils/cn'

// ─── Shared ──────────────────────────────────────────────────────────────────

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
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">{name}</h2>
        <Badge variant="secondary" size="sm">Layout</Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
      <Card>
        <Card.Content className="space-y-4">{children}</Card.Content>
      </Card>
    </section>
  )
}

// Mini schematic block for visual grid demonstrations
function GridBlock({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-md border-2 border-dashed border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-500/10 p-3 text-center text-xs font-medium text-primary-700 dark:text-primary-300',
        className
      )}
    >
      {label}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LayoutsShowcasePage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
          Layouts
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          6 structural components — grids, sidebars, headers, and content areas
        </p>
      </div>

      {/* ─── DASHBOARD GRID ──────────────────────────────────────────── */}
      <Section id="dashboard-grid" name="DashboardGrid" description="Responsive grid system with 7 presets — 1col, 2col, 3col, 4col, sidebar-content, content-sidebar, responsive.">
        <div className="space-y-6">
          {/* 2col */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">2 Columns</p>
            <DashboardGrid preset="2col" gap="md">
              <GridBlock label="Column 1" />
              <GridBlock label="Column 2" />
            </DashboardGrid>
          </div>

          {/* 3col */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">3 Columns</p>
            <DashboardGrid preset="3col" gap="md">
              <GridBlock label="Column 1" />
              <GridBlock label="Column 2" />
              <GridBlock label="Column 3" />
            </DashboardGrid>
          </div>

          {/* 4col */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">4 Columns</p>
            <DashboardGrid preset="4col" gap="md">
              <GridBlock label="1" />
              <GridBlock label="2" />
              <GridBlock label="3" />
              <GridBlock label="4" />
            </DashboardGrid>
          </div>

          {/* sidebar-content */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">Sidebar + Content</p>
            <DashboardGrid preset="sidebar-content" gap="md">
              <GridBlock label="Sidebar (320px)" className="min-h-[80px]" />
              <GridBlock label="Content (1fr)" className="min-h-[80px]" />
            </DashboardGrid>
          </div>

          {/* content-sidebar */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">Content + Sidebar</p>
            <DashboardGrid preset="content-sidebar" gap="md">
              <GridBlock label="Content (1fr)" className="min-h-[80px]" />
              <GridBlock label="Sidebar (320px)" className="min-h-[80px]" />
            </DashboardGrid>
          </div>
        </div>
      </Section>

      {/* ─── PAGE HEADER ─────────────────────────────────────────────── */}
      <Section id="page-header" name="PageHeader" description="Page title bar with description, breadcrumbs, action buttons, and optional tabs.">
        <div className="border border-[var(--border-default)] rounded-lg overflow-hidden">
          <PageHeader
            title="Dashboard Overview"
            description="Monitor your key metrics and performance indicators."
            actions={
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export</Button>
                <Button size="sm">New Report</Button>
              </div>
            }
          />
        </div>
      </Section>

      {/* ─── SIDEBAR ─────────────────────────────────────────────────── */}
      <Section id="sidebar" name="Sidebar" description="Collapsible navigation sidebar with hover expand, mobile drawer, and localStorage persistence.">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Expanded */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">Expanded</p>
            <div className="border border-[var(--border-default)] rounded-lg bg-[var(--bg-base)] p-3 w-[220px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-default)]">
                <div className="h-7 w-7 rounded-md bg-primary-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Pulse</span>
              </div>
              <div className="space-y-1">
                {['Overview', 'Analytics', 'E-commerce', 'Finance'].map((item, i) => (
                  <div
                    key={item}
                    className={cn(
                      'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
                      i === 0
                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 font-medium'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collapsed */}
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-2">Collapsed</p>
            <div className="border border-[var(--border-default)] rounded-lg bg-[var(--bg-base)] p-3 w-[56px]">
              <div className="flex justify-center mb-4 pb-3 border-b border-[var(--border-default)]">
                <div className="h-7 w-7 rounded-md bg-primary-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                {[LayoutDashboard, LayoutDashboard, LayoutDashboard, LayoutDashboard].map((Icon, i) => (
                  <div
                    key={i}
                    className={cn(
                      'p-1.5 rounded-md',
                      i === 0
                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300'
                        : 'text-[var(--text-secondary)]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Features: collapse/expand, hover expand, mobile drawer, active state tracking, localStorage persistence, custom link renderer.
        </p>
      </Section>

      {/* ─── HEADER ──────────────────────────────────────────────────── */}
      <Section id="header" name="Header" description="Sticky top bar with breadcrumbs, search, notifications, user menu, and mobile hamburger.">
        <div className="border border-[var(--border-default)] rounded-lg bg-[var(--bg-base)] px-4 py-3 flex items-center gap-4">
          <Menu className="h-5 w-5 text-[var(--text-muted)] lg:hidden" />
          <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
            <Home className="h-3.5 w-3.5" />
            <ChevronRight className="h-3 w-3" />
            <span>Components</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--text-primary)] font-medium">Layouts</span>
          </div>
          <div className="flex-1" />
          <Search className="h-4 w-4 text-[var(--text-muted)]" />
          <div className="relative">
            <Bell className="h-4 w-4 text-[var(--text-muted)]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-error-base rounded-full" />
          </div>
          <div className="h-7 w-7 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-primary-700 dark:text-primary-300" />
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Features: sticky positioning, breadcrumb auto-generation, search bar, notification dropdown, user menu, mobile menu button.
        </p>
      </Section>

      {/* ─── MAIN CONTENT ────────────────────────────────────────────── */}
      <Section id="main-content" name="MainContent" description="Scrollable content wrapper with configurable padding and max-width.">
        <div className="border border-[var(--border-default)] rounded-lg overflow-hidden">
          <div className="bg-[var(--bg-subtle)] p-4">
            <div className="bg-[var(--bg-base)] rounded-lg border border-dashed border-[var(--border-default)] p-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                MainContent wraps page children with consistent padding (sm/md/lg) and independent scroll.
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Padding options: sm (12px), md (16px), lg (24px)
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <Section id="footer" name="Footer" description="Dashboard footer with customizable link slots and copyright text.">
        <div className="border border-[var(--border-default)] rounded-lg bg-[var(--bg-base)] px-4 py-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>2026 Pulse. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </Section>
    </div>
  )
}
