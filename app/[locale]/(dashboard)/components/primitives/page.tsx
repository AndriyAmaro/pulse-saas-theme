'use client'

import * as React from 'react'
import {
  Search,
  Mail,
  ArrowRight,
  Download,
  Plus,
  Heart,
  Star,
  Trash2,
  ExternalLink,
  User,
  Bell,
  Check,
  X,
  Settings,
  Copy,
  Share,
  Zap,
  Globe,
  Lock,
} from 'lucide-react'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar, AvatarGroup } from '@core/primitives/Avatar'
import { Input } from '@core/primitives/Input'
import { Checkbox, CheckboxWithLabel } from '@core/primitives/Checkbox'
import { RadioGroup, RadioGroupItemWithLabel } from '@core/primitives/Radio'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@core/primitives/Select'
import { Switch, SwitchWithLabel } from '@core/primitives/Switch'
import { Textarea } from '@core/primitives/Textarea'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '@core/primitives/Skeleton'
import { Spinner } from '@core/primitives/Spinner'
import { Tag, TagGroup } from '@core/primitives/Tag'
import { Divider } from '@core/primitives/Divider'
import { ThemeToggle } from '@core/primitives/ThemeToggle'
import { SimpleTooltip, TooltipProvider } from '@core/primitives/Tooltip'
import { Card } from '@core/organisms/Card'
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
        <Badge variant="primary" size="sm">Primitive</Badge>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
      <Card>
        <Card.Content className="space-y-6">{children}</Card.Content>
      </Card>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PrimitivesShowcasePage() {
  const [checkboxChecked, setCheckboxChecked] = React.useState(true)
  const [radioValue, setRadioValue] = React.useState('option1')
  const [switchOn, setSwitchOn] = React.useState(true)
  const [textareaValue, setTextareaValue] = React.useState('Hello, world!')
  const [ratingValue, setRatingValue] = React.useState(3)
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'Next.js', 'Tailwind'])

  return (
    <TooltipProvider>
      <div className="space-y-12">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
            Primitives
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            15 atomic building blocks — the foundation of the Pulse design system
          </p>
        </div>

        {/* ─── BUTTON ─────────────────────────────────────────────────────── */}
        <Section id="button" name="Button" description="Versatile button component with 7 variants, 6 sizes, loading state, and icon support.">
          <SubSection title="Variants">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger-outline">Danger Outline</Button>
              <Button variant="link">Link</Button>
            </div>
          </SubSection>

          <SubSection title="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </SubSection>

          <SubSection title="With Icons">
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
              <Button variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>Next Step</Button>
              <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Download</Button>
              <Button variant="ghost" leftIcon={<Heart className="h-4 w-4" />}>Like</Button>
            </div>
          </SubSection>

          <SubSection title="States">
            <div className="flex flex-wrap items-center gap-3">
              <Button loading>Loading...</Button>
              <Button disabled>Disabled</Button>
              <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
              <Button size="icon"><Star className="h-4 w-4" /></Button>
              <Button size="icon-sm" variant="outline"><Settings className="h-4 w-4" /></Button>
            </div>
          </SubSection>
        </Section>

        {/* ─── BADGE ─────────────────────────────────────────────────────── */}
        <Section id="badge" name="Badge" description="Status indicators with 8 color variants, 3 sizes, and optional dot indicator.">
          <SubSection title="Variants">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </SubSection>

          <SubSection title="Sizes">
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </SubSection>

          <SubSection title="With Dot">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="error" dot>Offline</Badge>
              <Badge variant="warning" dot>Away</Badge>
              <Badge variant="info" dot>Busy</Badge>
            </div>
          </SubSection>
        </Section>

        {/* ─── AVATAR ────────────────────────────────────────────────────── */}
        <Section id="avatar" name="Avatar" description="User avatars with image, initials fallback, 6 sizes, status indicators, and grouping.">
          <SubSection title="Sizes">
            <div className="flex items-end gap-3">
              <Avatar size="xs" initials="XS" />
              <Avatar size="sm" initials="SM" />
              <Avatar size="md" initials="MD" />
              <Avatar size="lg" initials="LG" />
              <Avatar size="xl" initials="XL" />
              <Avatar size="2xl" initials="2X" />
            </div>
          </SubSection>

          <SubSection title="Status">
            <div className="flex items-center gap-3">
              <Avatar size="lg" initials="ON" status="online" />
              <Avatar size="lg" initials="OF" status="offline" />
              <Avatar size="lg" initials="BS" status="busy" />
              <Avatar size="lg" initials="AW" status="away" />
            </div>
          </SubSection>

          <SubSection title="Avatar Group">
            <AvatarGroup max={4} size="md">
              <Avatar initials="AB" />
              <Avatar initials="CD" />
              <Avatar initials="EF" />
              <Avatar initials="GH" />
              <Avatar initials="IJ" />
              <Avatar initials="KL" />
            </AvatarGroup>
          </SubSection>
        </Section>

        {/* ─── INPUT ─────────────────────────────────────────────────────── */}
        <Section id="input" name="Input" description="Text input with icon slots, error state, and full ref forwarding.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Default</label>
              <Input placeholder="Enter your name..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">With Icon</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <Input className="pl-9" placeholder="Search..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Error State</label>
              <Input placeholder="Email address" className="border-error-base focus:ring-error-base/30" />
              <p className="text-xs text-error-base" role="alert">Please enter a valid email address.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Disabled</label>
              <Input placeholder="Cannot edit" disabled />
            </div>
          </div>
        </Section>

        {/* ─── SELECT ────────────────────────────────────────────────────── */}
        <Section id="select" name="Select" description="Dropdown select built on Radix UI with search, groups, and custom items.">
          <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Choose Framework</label>
              <Select defaultValue="react">
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Disabled</label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Cannot select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">X</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        {/* ─── CHECKBOX ──────────────────────────────────────────────────── */}
        <Section id="checkbox" name="Checkbox" description="Checkbox with label, indeterminate state, and accessible Radix UI base.">
          <div className="flex flex-wrap gap-6">
            <CheckboxWithLabel
              id="cb-checked"
              label="Checked"
              checked={checkboxChecked}
              onCheckedChange={(v) => setCheckboxChecked(v === true)}
            />
            <CheckboxWithLabel
              id="cb-unchecked"
              label="Unchecked"
              checked={false}
              onCheckedChange={() => {}}
            />
            <CheckboxWithLabel
              id="cb-indeterminate"
              label="Indeterminate"
              checked="indeterminate"
              onCheckedChange={() => {}}
            />
            <CheckboxWithLabel
              id="cb-disabled"
              label="Disabled"
              checked={false}
              disabled
              onCheckedChange={() => {}}
            />
          </div>
        </Section>

        {/* ─── RADIO ─────────────────────────────────────────────────────── */}
        <Section id="radio" name="Radio" description="Radio group with individual labels, built on Radix UI.">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex flex-wrap gap-6">
              <RadioGroupItemWithLabel value="option1" id="r1" label="Option A" />
              <RadioGroupItemWithLabel value="option2" id="r2" label="Option B" />
              <RadioGroupItemWithLabel value="option3" id="r3" label="Option C" />
              <RadioGroupItemWithLabel value="option4" id="r4" label="Disabled" disabled />
            </div>
          </RadioGroup>
        </Section>

        {/* ─── SWITCH ────────────────────────────────────────────────────── */}
        <Section id="switch" name="Switch" description="Toggle switch with label support, multiple sizes.">
          <div className="flex flex-wrap gap-6">
            <SwitchWithLabel
              id="sw-on"
              label="Enabled"
              checked={switchOn}
              onCheckedChange={setSwitchOn}
            />
            <SwitchWithLabel
              id="sw-off"
              label="Disabled State"
              checked={false}
              disabled
              onCheckedChange={() => {}}
            />
          </div>
        </Section>

        {/* ─── TEXTAREA ──────────────────────────────────────────────────── */}
        <Section id="textarea" name="Textarea" description="Multi-line text input with auto-resize and character count.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Default</label>
              <Textarea
                placeholder="Write your message..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <p className="text-xs text-[var(--text-muted)]">{textareaValue.length} characters</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Disabled</label>
              <Textarea placeholder="Cannot edit" disabled />
            </div>
          </div>
        </Section>

        {/* ─── SKELETON ──────────────────────────────────────────────────── */}
        <Section id="skeleton" name="Skeleton" description="Loading placeholders with text, avatar, and card variants.">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-muted)]">Text</h4>
              <SkeletonText lines={3} />
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-muted)]">Avatar + Text</h4>
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-muted)]">Card</h4>
              <SkeletonCard />
            </div>
          </div>
        </Section>

        {/* ─── SPINNER ───────────────────────────────────────────────────── */}
        <Section id="spinner" name="Spinner" description="Loading indicator with configurable size and color.">
          <div className="flex items-end gap-6">
            <div className="text-center">
              <Spinner size="sm" />
              <p className="text-xs text-[var(--text-muted)] mt-2">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <p className="text-xs text-[var(--text-muted)] mt-2">Medium</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-xs text-[var(--text-muted)] mt-2">Large</p>
            </div>
          </div>
        </Section>

        {/* ─── TAG ───────────────────────────────────────────────────────── */}
        <Section id="tag" name="Tag" description="Inline labels with 8 color variants, dismissible functionality, and grouping.">
          <SubSection title="Variants">
            <div className="flex flex-wrap gap-2">
              <Tag variant="default">Default</Tag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="secondary">Secondary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="error">Error</Tag>
              <Tag variant="info">Info</Tag>
            </div>
          </SubSection>

          <SubSection title="Dismissible">
            <TagGroup>
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  variant="primary"
                  removable
                  onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
                >
                  {tag}
                </Tag>
              ))}
            </TagGroup>
          </SubSection>
        </Section>

        {/* ─── DIVIDER ───────────────────────────────────────────────────── */}
        <Section id="divider" name="Divider" description="Visual separator — horizontal, vertical, with optional label.">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">Horizontal</p>
              <Divider spacing="md" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">With Label</p>
              <Divider spacing="md" label="OR" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">Vertical</p>
              <div className="flex items-center gap-4 h-8">
                <span className="text-sm text-[var(--text-secondary)]">Item A</span>
                <Divider orientation="vertical" />
                <span className="text-sm text-[var(--text-secondary)]">Item B</span>
                <Divider orientation="vertical" />
                <span className="text-sm text-[var(--text-secondary)]">Item C</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── THEME TOGGLE ──────────────────────────────────────────────── */}
        <Section id="theme-toggle" name="ThemeToggle" description="Dark/Light mode toggle with animated sun/moon icons.">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-[var(--text-secondary)]">Click to toggle between light and dark mode</span>
          </div>
        </Section>

        {/* ─── TOOLTIP ───────────────────────────────────────────────────── */}
        <Section id="tooltip" name="Tooltip" description="Contextual overlay positioned around a trigger element.">
          <div className="flex flex-wrap gap-4">
            <SimpleTooltip content="Tooltip on top" side="top">
              <Button variant="outline" size="sm">Top</Button>
            </SimpleTooltip>
            <SimpleTooltip content="Tooltip on right" side="right">
              <Button variant="outline" size="sm">Right</Button>
            </SimpleTooltip>
            <SimpleTooltip content="Tooltip on bottom" side="bottom">
              <Button variant="outline" size="sm">Bottom</Button>
            </SimpleTooltip>
            <SimpleTooltip content="Tooltip on left" side="left">
              <Button variant="outline" size="sm">Left</Button>
            </SimpleTooltip>
          </div>
        </Section>
      </div>
    </TooltipProvider>
  )
}
