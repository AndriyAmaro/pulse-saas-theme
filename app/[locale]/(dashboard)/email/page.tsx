'use client'

import * as React from 'react'
import {
  Inbox,
  Star,
  Send as SendIcon,
  FileEdit,
  Trash2,
  AlertTriangle,
  Search,
  Archive,
  MailOpen,
  MoreHorizontal,
  Paperclip,
  Reply,
  ReplyAll,
  Forward,
  Tag,
  X,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  AlignLeft,
  Smile,
  ChevronDown,
  Mail,
  FolderOpen,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  FileText,
  Image as ImageIcon,
  BarChart3,
  Shield,
} from 'lucide-react'

import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Avatar } from '@core/primitives/Avatar'
import { Badge } from '@core/primitives/Badge'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// TYPES
// ============================================================================

type EmailFolder = 'inbox' | 'starred' | 'sent' | 'drafts' | 'trash' | 'spam'
type EmailLabel = 'work' | 'personal' | 'finance' | 'travel'
type EmailFilter = 'all' | 'unread' | 'starred'

interface EmailData {
  id: string
  from: { name: string; email: string; avatar?: string }
  to: string
  subject: string
  preview: string
  body: string
  date: Date
  read: boolean
  starred: boolean
  folder: EmailFolder
  labels: EmailLabel[]
  hasAttachment: boolean
  attachments?: { name: string; size: string; type: string }[]
  thread?: { id: string; from: string; body: string; date: Date }[]
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FOLDER_CONFIG: Record<EmailFolder, { icon: React.ElementType; label: string; count?: number; gradient: string }> = {
  inbox: { icon: Inbox, label: 'Inbox', count: 24, gradient: 'from-rose-500 to-pink-500' },
  starred: { icon: Star, label: 'Starred', count: 3, gradient: 'from-amber-500 to-orange-500' },
  sent: { icon: SendIcon, label: 'Sent', gradient: 'from-blue-500 to-indigo-500' },
  drafts: { icon: FileEdit, label: 'Drafts', count: 2, gradient: 'from-violet-500 to-purple-500' },
  trash: { icon: Trash2, label: 'Trash', gradient: 'from-slate-400 to-slate-500' },
  spam: { icon: AlertTriangle, label: 'Spam', count: 5, gradient: 'from-red-500 to-rose-500' },
}

const LABEL_COLORS: Record<EmailLabel, { bg: string; text: string; dot: string; gradient: string }> = {
  work: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500', gradient: 'from-blue-500 to-indigo-500' },
  personal: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
  finance: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500', gradient: 'from-purple-500 to-violet-500' },
  travel: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500', gradient: 'from-orange-500 to-amber-500' },
}

// ============================================================================
// STATS DATA
// ============================================================================

const emailStats = {
  received: { value: 148, change: '+12%', trend: [45, 52, 38, 61, 55, 72, 68, 80, 75, 90, 85, 95] },
  sent: { value: 64, change: '+8%', trend: [20, 25, 18, 30, 28, 35, 32, 40, 38, 42, 45, 48] },
  responseTime: { value: '24m', change: '-15%', trend: [45, 42, 38, 35, 40, 32, 28, 30, 26, 25, 22, 24] },
  unread: { value: 12, change: '-5%', trend: [25, 22, 28, 20, 18, 24, 16, 15, 18, 14, 13, 12] },
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_EMAILS: EmailData[] = [
  {
    id: '1', from: { name: 'GitHub', email: 'noreply@github.com' }, to: 'me@pulse.dev',
    subject: 'Your weekly digest - Pulse repository activity',
    preview: 'Here is your weekly summary for pulse/theme. 12 commits, 5 PRs merged, 3 issues closed...',
    body: `<p>Here is your weekly summary for <strong>pulse/theme</strong>.</p>
<p>This week's highlights:</p>
<ul>
<li>12 commits pushed to main</li>
<li>5 pull requests merged</li>
<li>3 issues closed</li>
<li>2 new contributors joined</li>
</ul>
<p>Top contributors this week: Sarah Chen, Mike Johnson, Emily Davis</p>
<p>Keep up the great work! 🚀</p>`,
    date: new Date(2026, 1, 7, 9, 30), read: true, starred: false, folder: 'inbox',
    labels: ['work'], hasAttachment: true,
    attachments: [{ name: 'weekly-report.pdf', size: '2.4 MB', type: 'pdf' }],
  },
  {
    id: '2', from: { name: 'Sarah Chen', email: 'sarah@company.com' }, to: 'me@pulse.dev',
    subject: 'Re: Project proposal - Q1 Dashboard Redesign',
    preview: "I've reviewed the proposal and have some feedback. The timeline looks ambitious but doable...",
    body: `<p>Hi,</p>
<p>I've reviewed the proposal and have some feedback.</p>
<p>The timeline looks ambitious but doable if we prioritize correctly. Here are my thoughts:</p>
<ol>
<li>The component library phase should start immediately</li>
<li>We can parallelize the dashboard work with the auth system</li>
<li>The testing phase needs at least 2 extra days</li>
</ol>
<p>Can we schedule a meeting to discuss?</p>
<p>Best,<br/>Sarah</p>`,
    date: new Date(2026, 1, 7, 14, 15), read: false, starred: true, folder: 'inbox',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '3', from: { name: 'Stripe', email: 'receipts@stripe.com' }, to: 'me@pulse.dev',
    subject: 'Your invoice for February 2026 is ready',
    preview: 'Invoice #INV-2026-0215 for $49.00 has been generated. Payment will be processed...',
    body: `<p>Your monthly invoice is ready.</p>
<p><strong>Invoice #INV-2026-0215</strong></p>
<p>Amount: $49.00<br/>Plan: Pro Monthly<br/>Period: Feb 1 - Feb 28, 2026<br/>Status: Payment will be processed on Feb 10</p>
<p>View your invoice and payment history in your Stripe dashboard.</p>`,
    date: new Date(2026, 1, 6, 8, 0), read: true, starred: false, folder: 'inbox',
    labels: ['finance'], hasAttachment: true,
    attachments: [{ name: 'invoice-2026-02.pdf', size: '156 KB', type: 'pdf' }],
  },
  {
    id: '4', from: { name: 'John Doe', email: 'john.doe@work.com' }, to: 'me@pulse.dev',
    subject: 'Meeting tomorrow at 3pm - Sprint Planning',
    preview: "Just a reminder about our sprint planning meeting. Please come prepared with your task estimates...",
    body: `<p>Hey,</p>
<p>Just a reminder about our sprint planning meeting tomorrow at 3pm.</p>
<p>Please come prepared with:</p>
<ul>
<li>Your task estimates for the next sprint</li>
<li>Any blockers or dependencies</li>
<li>Status update on current tasks</li>
</ul>
<p>Meeting link: https://meet.example.com/sprint-24</p>
<p>Cheers,<br/>John</p>`,
    date: new Date(2026, 1, 6, 16, 30), read: false, starred: false, folder: 'inbox',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '5', from: { name: 'LinkedIn', email: 'notifications@linkedin.com' }, to: 'me@pulse.dev',
    subject: 'You have 5 new notifications',
    preview: '3 people viewed your profile, 1 new connection request, 1 message from a recruiter...',
    body: `<p>Here's a summary of your recent LinkedIn activity:</p>
<ul>
<li>3 people viewed your profile</li>
<li>1 new connection request from Alex Kim</li>
<li>1 message from a recruiter at TechCorp</li>
</ul>
<p>Sign in to LinkedIn to view all your notifications.</p>`,
    date: new Date(2026, 1, 5, 12, 0), read: true, starred: false, folder: 'inbox',
    labels: [], hasAttachment: false,
  },
  {
    id: '6', from: { name: 'AWS', email: 'no-reply@aws.amazon.com' }, to: 'me@pulse.dev',
    subject: 'Your AWS cost report for January 2026',
    preview: 'Total cost: $127.45. Top services: EC2 ($68.20), S3 ($23.10), RDS ($36.15)...',
    body: `<p>Your AWS cost report for January 2026:</p>
<p><strong>Total: $127.45</strong></p>
<p>Top services:</p>
<ul>
<li>EC2: $68.20</li>
<li>S3: $23.10</li>
<li>RDS: $36.15</li>
</ul>
<p>This is a 5% decrease from last month. Your reserved instances savings are $42.00.</p>`,
    date: new Date(2026, 1, 5, 7, 0), read: true, starred: false, folder: 'inbox',
    labels: ['finance'], hasAttachment: true,
    attachments: [{ name: 'aws-cost-jan-2026.csv', size: '45 KB', type: 'csv' }],
  },
  {
    id: '7', from: { name: 'Emily Davis', email: 'emily@design.com' }, to: 'me@pulse.dev',
    subject: 'Design system updates - New color palette',
    preview: "I've updated the design system with the new Pulse teal color palette. Let me know your thoughts...",
    body: `<p>Hey!</p>
<p>I've updated the design system with the new Pulse teal color palette. The changes include:</p>
<ul>
<li>New primary color: Pulse Teal (#14B89A)</li>
<li>Updated secondary palette with slate tones</li>
<li>New accent color: Amber (#FBBF24)</li>
<li>Improved dark mode contrast ratios</li>
</ul>
<p>I've attached the Figma export. Let me know your thoughts!</p>
<p>Emily</p>`,
    date: new Date(2026, 1, 4, 15, 45), read: false, starred: true, folder: 'inbox',
    labels: ['work'], hasAttachment: true,
    attachments: [
      { name: 'design-system-v2.fig', size: '8.2 MB', type: 'fig' },
      { name: 'color-palette.png', size: '420 KB', type: 'png' },
    ],
  },
  {
    id: '8', from: { name: 'Vercel', email: 'notifications@vercel.com' }, to: 'me@pulse.dev',
    subject: 'Deployment successful - pulse-theme.vercel.app',
    preview: 'Your deployment to production was successful. Build time: 32s. Preview: pulse-theme.vercel.app...',
    body: `<p>Your deployment was successful! ✅</p>
<p><strong>Project:</strong> pulse-theme<br/>
<strong>Branch:</strong> main<br/>
<strong>Build time:</strong> 32s<br/>
<strong>URL:</strong> pulse-theme.vercel.app</p>
<p>View deployment details in your Vercel dashboard.</p>`,
    date: new Date(2026, 1, 4, 11, 0), read: true, starred: false, folder: 'inbox',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '9', from: { name: 'Booking.com', email: 'noreply@booking.com' }, to: 'me@pulse.dev',
    subject: 'Your reservation is confirmed - Hotel Azure, Lisbon',
    preview: 'Your booking #BK-456789 is confirmed. Check-in: Mar 15, Check-out: Mar 20, 2026...',
    body: `<p>Your reservation is confirmed!</p>
<p><strong>Hotel Azure, Lisbon</strong><br/>
Booking #BK-456789</p>
<p>Check-in: March 15, 2026<br/>
Check-out: March 20, 2026<br/>
Room: Deluxe Ocean View<br/>
Total: €825.00</p>
<p>We look forward to welcoming you!</p>`,
    date: new Date(2026, 1, 3, 10, 0), read: true, starred: true, folder: 'inbox',
    labels: ['travel', 'personal'], hasAttachment: true,
    attachments: [{ name: 'booking-confirmation.pdf', size: '340 KB', type: 'pdf' }],
  },
  {
    id: '10', from: { name: 'Alex Kim', email: 'alex.kim@dev.com' }, to: 'me@pulse.dev',
    subject: 'Code review request - feat/calendar-component',
    preview: "Hey, could you review my PR for the calendar component? It adds month/week/day views...",
    body: `<p>Hey!</p>
<p>Could you review my PR for the calendar component? Here's what it adds:</p>
<ul>
<li>Month view with event rendering</li>
<li>Week view with time grid</li>
<li>Day view with detailed events</li>
<li>Event creation modal</li>
</ul>
<p>PR link: github.com/pulse/theme/pull/42</p>
<p>Let me know if you have any questions!</p>
<p>Alex</p>`,
    date: new Date(2026, 1, 3, 14, 30), read: false, starred: false, folder: 'inbox',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '11', from: { name: 'Mike Johnson', email: 'mike@company.com' }, to: 'me@pulse.dev',
    subject: 'Re: Backend API documentation',
    preview: "I've updated the API docs with the new endpoints. The auth flow section is now complete...",
    body: `<p>Updated the API docs:</p>
<ul>
<li>Added authentication flow documentation</li>
<li>New CRUD endpoints for calendar events</li>
<li>WebSocket real-time chat endpoints</li>
<li>Email API integration docs</li>
</ul>
<p>Check it out at docs.pulse.dev/api</p>`,
    date: new Date(2026, 1, 2, 9, 15), read: true, starred: false, folder: 'inbox',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '12', from: { name: 'Newsletter', email: 'weekly@techdigest.com' }, to: 'me@pulse.dev',
    subject: 'This Week in Tech: React 20, Next.js 17, and more',
    preview: "The biggest news this week: React 20 is now stable with the new compiler, Next.js 17 brings...",
    body: `<p><strong>This Week in Tech</strong></p>
<p>Top stories:</p>
<ol>
<li>React 20 is now stable with the new compiler</li>
<li>Next.js 17 brings improved server components</li>
<li>Tailwind CSS v5 announced with native container queries</li>
<li>TypeScript 6.0 beta released</li>
</ol>
<p>Read more at techdigest.com</p>`,
    date: new Date(2026, 1, 1, 6, 0), read: true, starred: false, folder: 'inbox',
    labels: [], hasAttachment: false,
  },
  // Sent emails
  {
    id: '20', from: { name: 'You', email: 'me@pulse.dev' }, to: 'sarah@company.com',
    subject: 'Project proposal - Q1 Dashboard Redesign',
    preview: "Hi Sarah, here's the project proposal for the Q1 dashboard redesign...",
    body: `<p>Hi Sarah,</p><p>Here's the project proposal for Q1. Looking forward to your feedback.</p>`,
    date: new Date(2026, 1, 7, 10, 0), read: true, starred: false, folder: 'sent',
    labels: ['work'], hasAttachment: true,
    attachments: [{ name: 'proposal-q1-2026.pdf', size: '1.8 MB', type: 'pdf' }],
  },
  // Drafts
  {
    id: '30', from: { name: 'You', email: 'me@pulse.dev' }, to: 'team@company.com',
    subject: 'Draft: Weekly team update',
    preview: 'Team, here are the highlights from this week...',
    body: `<p>Team, here are the highlights from this week...</p><p>[Draft - incomplete]</p>`,
    date: new Date(2026, 1, 8, 8, 0), read: true, starred: false, folder: 'drafts',
    labels: ['work'], hasAttachment: false,
  },
  {
    id: '31', from: { name: 'You', email: 'me@pulse.dev' }, to: '',
    subject: 'Draft: Conference talk outline',
    preview: 'Building Premium SaaS Themes: Lessons from Pulse...',
    body: `<p>Building Premium SaaS Themes: Lessons from Pulse</p><p>[Draft - needs more content]</p>`,
    date: new Date(2026, 1, 6, 20, 0), read: true, starred: false, folder: 'drafts',
    labels: [], hasAttachment: false,
  },
  // Spam
  {
    id: '40', from: { name: 'Free Money', email: 'scam@fake.com' }, to: 'me@pulse.dev',
    subject: 'You won $1,000,000!!!', preview: 'Click here to claim your prize...',
    body: '<p>Spam content</p>', date: new Date(2026, 1, 7, 3, 0),
    read: false, starred: false, folder: 'spam', labels: [], hasAttachment: false,
  },
]

// ============================================================================
// HELPERS
// ============================================================================

function formatEmailDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = diff / (1000 * 60 * 60 * 24)

  if (days < 1 && now.getDate() === date.getDate()) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }
  if (days < 2) return 'Yesterday'
  if (days < 7) return date.toLocaleDateString('en-US', { weekday: 'short' })
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function getFileIcon(type: string): { icon: React.ElementType; gradient: string } {
  switch (type) {
    case 'pdf': return { icon: FileText, gradient: 'from-red-500 to-rose-500' }
    case 'doc': case 'docx': return { icon: FileEdit, gradient: 'from-blue-500 to-indigo-500' }
    case 'png': case 'jpg': case 'jpeg': return { icon: ImageIcon, gradient: 'from-emerald-500 to-teal-500' }
    case 'fig': return { icon: Sparkles, gradient: 'from-purple-500 to-violet-500' }
    case 'csv': case 'xlsx': return { icon: BarChart3, gradient: 'from-green-500 to-emerald-500' }
    default: return { icon: Paperclip, gradient: 'from-slate-400 to-slate-500' }
  }
}

// ============================================================================
// COMPOSE MODAL — Premium Diamond
// ============================================================================

function ComposeModal({ onClose, replyTo }: { onClose: () => void; replyTo?: EmailData }) {
  const [to, setTo] = React.useState(replyTo ? replyTo.from.email : '')
  const [subject, setSubject] = React.useState(replyTo ? `Re: ${replyTo.subject}` : '')
  const [body, setBody] = React.useState('')
  const [showCc, setShowCc] = React.useState(false)
  const [showBcc, setShowBcc] = React.useState(false)

  return (
    <div className="fixed bottom-0 right-4 z-50 w-full max-w-[560px] md:right-8">
      <div className="rounded-t-xl border border-b-0 border-[var(--border-default)] bg-[var(--bg-base)] shadow-2xl overflow-hidden">
        {/* Gradient Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />

        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-pink-500 shadow-sm">
              <Mail size={12} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">New Message</h3>
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded p-1 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors">
              <ChevronDown size={16} />
            </button>
            <button onClick={onClose} className="rounded p-1 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[500px] overflow-y-auto">
          {/* To */}
          <div className="flex items-center border-b border-[var(--border-default)] px-4">
            <label className="shrink-0 text-sm font-medium text-rose-500 dark:text-rose-400 w-10">To</label>
            <input
              type="text"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="flex-1 bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
              placeholder="Recipients"
            />
            <div className="flex gap-1.5 text-xs">
              {!showCc && <button onClick={() => setShowCc(true)} className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-colors">Cc</button>}
              {!showBcc && <button onClick={() => setShowBcc(true)} className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-colors">Bcc</button>}
            </div>
          </div>

          {/* Cc */}
          {showCc && (
            <div className="flex items-center border-b border-[var(--border-default)] px-4">
              <label className="shrink-0 text-sm font-medium text-rose-500 dark:text-rose-400 w-10">Cc</label>
              <input
                type="text"
                className="flex-1 bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                placeholder="Cc recipients"
              />
            </div>
          )}

          {/* Bcc */}
          {showBcc && (
            <div className="flex items-center border-b border-[var(--border-default)] px-4">
              <label className="shrink-0 text-sm font-medium text-rose-500 dark:text-rose-400 w-10">Bcc</label>
              <input
                type="text"
                className="flex-1 bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                placeholder="Bcc recipients"
              />
            </div>
          )}

          {/* Subject */}
          <div className="flex items-center border-b border-[var(--border-default)] px-4">
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="flex-1 bg-transparent py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
              placeholder="Subject"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-0.5 border-b border-[var(--border-default)] px-2 py-1.5 bg-gradient-to-r from-rose-50/50 to-transparent dark:from-rose-950/10">
            {[Bold, Italic, Underline, LinkIcon, List, AlignLeft].map((Icon, i) => (
              <button key={i} className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                <Icon size={15} />
              </button>
            ))}
          </div>

          {/* Body */}
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your message..."
            rows={8}
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-default)] bg-gradient-to-r from-rose-50/30 to-transparent dark:from-rose-950/10 px-4 py-2.5">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1.5 text-sm font-medium text-white shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/30 transition-all hover:scale-[1.02]">
              <SendIcon size={14} /> Send
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-500 transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-500 transition-colors">
              <Smile size={16} />
            </button>
            <button onClick={onClose} className="rounded-lg p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EMAIL PREVIEW — Premium Diamond
// ============================================================================

function EmailPreview({ email, onReply, onStar }: {
  email: EmailData
  onReply: () => void
  onStar: () => void
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Gradient Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />

      {/* Header */}
      <div className="border-b border-[var(--border-default)] bg-gradient-to-b from-rose-50/50 to-transparent dark:from-rose-950/10 p-4 lg:p-6">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-lg font-bold text-[var(--text-primary)] pr-4 leading-tight">{email.subject}</h2>
          <div className="flex shrink-0 items-center gap-0.5">
            {[
              { icon: Archive, label: 'Archive' },
              { icon: Trash2, label: 'Delete' },
              { icon: Tag, label: 'Label' },
              { icon: MoreHorizontal, label: 'More' },
            ].map((action) => (
              <button
                key={action.label}
                className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-500 transition-colors"
                title={action.label}
              >
                <action.icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Labels — Premium gradient badges */}
        {email.labels.length > 0 && (
          <div className="mb-3 flex gap-1.5">
            {email.labels.map(label => {
              const c = LABEL_COLORS[label]
              return (
                <span
                  key={label}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize',
                    c.bg, c.text
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', c.gradient)} />
                  {label}
                </span>
              )
            })}
          </div>
        )}

        {/* From/To — Premium avatar ring */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 opacity-60" />
            <Avatar fallback={email.from.name.charAt(0)} size="md" alt={email.from.name} className="relative" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--text-primary)]">{email.from.name}</span>
              <span className="text-xs text-[var(--text-muted)]">&lt;{email.from.email}&gt;</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <span>To: {email.to}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">{formatFullDate(email.date)}</span>
            <button
              onClick={onStar}
              className={cn(
                'rounded-lg p-1 transition-all',
                email.starred
                  ? 'text-amber-500 hover:scale-110'
                  : 'text-[var(--text-muted)] hover:text-amber-500'
              )}
            >
              <Star size={16} fill={email.starred ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-[var(--text-secondary)] [&_p]:mb-3 [&_ul]:mb-3 [&_ol]:mb-3 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />

        {/* Attachments — Premium gradient file icons */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-rose-200 via-pink-200 to-transparent dark:from-rose-800/30 dark:via-pink-800/30" />
              <h4 className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                Attachments ({email.attachments.length})
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-rose-200 via-pink-200 to-transparent dark:from-rose-800/30 dark:via-pink-800/30" />
            </div>
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((att, i) => {
                const fileInfo = getFileIcon(att.type)
                const FileIcon = fileInfo.icon
                return (
                  <div
                    key={i}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-gradient-to-r from-[var(--bg-subtle)] to-[var(--bg-base)] px-3.5 py-2.5 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md hover:shadow-rose-500/5 transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', fileInfo.gradient)}>
                      <FileIcon size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{att.name}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{att.size}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Reply Footer — Premium gradient buttons */}
      <div className="border-t border-[var(--border-default)] bg-gradient-to-r from-rose-50/30 to-transparent dark:from-rose-950/10 p-4">
        <div className="flex gap-2">
          <button
            onClick={onReply}
            className="flex items-center gap-1.5 rounded-lg border border-rose-200 dark:border-rose-800 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:shadow-md hover:shadow-rose-500/10 transition-all hover:scale-[1.02]"
          >
            <Reply size={14} /> Reply
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:border-rose-200 dark:hover:border-rose-800 hover:text-rose-600 dark:hover:text-rose-400 transition-all">
            <ReplyAll size={14} /> Reply All
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:border-rose-200 dark:hover:border-rose-800 hover:text-rose-600 dark:hover:text-rose-400 transition-all">
            <Forward size={14} /> Forward
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EMAIL LIST ITEM — Premium Diamond
// ============================================================================

function EmailListItem({ email, isActive, onSelect, onStar, onToggleRead }: {
  email: EmailData
  isActive: boolean
  onSelect: () => void
  onStar: () => void
  onToggleRead: () => void
}) {
  const [checked, setChecked] = React.useState(false)

  return (
    <div
      className={cn(
        'group relative flex items-center gap-2 border-b border-[var(--border-default)] px-3 py-2.5 transition-all cursor-pointer',
        isActive
          ? 'bg-gradient-to-r from-rose-50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-950/10 border-l-2 border-l-rose-500'
          : 'hover:bg-gradient-to-r hover:from-rose-50/30 hover:to-transparent dark:hover:from-rose-950/5 border-l-2 border-l-transparent',
        !email.read && !isActive && 'bg-[var(--bg-subtle)]'
      )}
      onClick={onSelect}
    >
      {/* Unread indicator dot */}
      {!email.read && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-0.5 rounded-r bg-gradient-to-b from-rose-500 to-pink-500" />
      )}

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={e => { e.stopPropagation(); setChecked(!checked) }}
        onClick={e => e.stopPropagation()}
        className="h-3.5 w-3.5 shrink-0 rounded border-[var(--border-default)] accent-rose-500"
      />

      {/* Star */}
      <button
        onClick={e => { e.stopPropagation(); onStar() }}
        className={cn(
          'shrink-0 rounded p-0.5 transition-all',
          email.starred
            ? 'text-amber-500 hover:scale-110'
            : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100'
        )}
      >
        <Star size={14} fill={email.starred ? 'currentColor' : 'none'} />
      </button>

      {/* Avatar */}
      <Avatar
        fallback={email.from.name.charAt(0)}
        size="sm"
        alt={email.from.name}
        className="shrink-0"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn(
            'truncate text-sm',
            !email.read ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]'
          )}>
            {email.from.name}
          </span>
          {/* Labels — gradient dots */}
          {email.labels.slice(0, 1).map(label => {
            const c = LABEL_COLORS[label]
            return (
              <span
                key={label}
                className={cn(
                  'hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold capitalize sm:inline-flex',
                  c.bg, c.text
                )}
              >
                <span className={cn('h-1 w-1 rounded-full bg-gradient-to-r', c.gradient)} />
                {label}
              </span>
            )
          })}
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            'truncate text-xs',
            !email.read ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
          )}>
            {email.subject}
          </span>
        </div>
        <p className="truncate text-xs text-[var(--text-muted)]">{email.preview}</p>
      </div>

      {/* Meta */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={cn(
          'text-[11px]',
          !email.read ? 'font-bold text-rose-500' : 'text-[var(--text-muted)]'
        )}>
          {formatEmailDate(email.date)}
        </span>
        <div className="flex items-center gap-1.5">
          {email.hasAttachment && (
            <Paperclip size={12} className="text-rose-400 dark:text-rose-500" />
          )}
          {!email.read && (
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm shadow-rose-500/50" />
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN EMAIL PAGE — Premium Diamond
// ============================================================================

export default function EmailPage() {
  const [emails, setEmails] = React.useState<EmailData[]>(MOCK_EMAILS)
  const [activeFolder, setActiveFolder] = React.useState<EmailFolder>('inbox')
  const [selectedEmailId, setSelectedEmailId] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [emailFilter, setEmailFilter] = React.useState<EmailFilter>('all')
  const [showCompose, setShowCompose] = React.useState(false)
  const [replyTo, setReplyTo] = React.useState<EmailData | undefined>()

  const selectedEmail = emails.find(e => e.id === selectedEmailId)

  // Filtered emails
  const filteredEmails = React.useMemo(() => {
    let filtered = emails.filter(e => e.folder === activeFolder)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(e =>
        e.subject.toLowerCase().includes(q) ||
        e.from.name.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      )
    }

    switch (emailFilter) {
      case 'unread':
        filtered = filtered.filter(e => !e.read)
        break
      case 'starred':
        filtered = filtered.filter(e => e.starred)
        break
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [emails, activeFolder, searchQuery, emailFilter])

  // Folder counts
  const folderCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    emails.forEach(e => {
      if (!e.read) {
        counts[e.folder] = (counts[e.folder] ?? 0) + 1
      }
    })
    return counts
  }, [emails])

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id)
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e))
  }

  const handleStarEmail = (id: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e))
  }

  const handleToggleRead = (id: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: !e.read } : e))
  }

  const handleReply = () => {
    if (selectedEmail) {
      setReplyTo(selectedEmail)
      setShowCompose(true)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ════════════════ PREMIUM HERO HEADER ════════════════ */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-rose-50/40 to-transparent dark:from-rose-950/10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
              <Mail size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Email</h1>
              <p className="text-sm text-[var(--text-muted)]">Manage your inbox and conversations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/10 px-3 py-1.5 border border-rose-200/50 dark:border-rose-800/30">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse" />
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{emails.filter(e => !e.read).length} unread</span>
            </div>
            <button
              onClick={() => { setReplyTo(undefined); setShowCompose(true) }}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all hover:scale-[1.02]"
            >
              <Mail size={16} /> Compose
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ PREMIUM STATS BAR ════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {/* Received */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-rose-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 shadow-md shadow-rose-500/25">
                <Inbox size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Received</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{emailStats.received.value}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">{emailStats.received.change}</span>
                </div>
              </div>
            </div>
            <SparklineChart data={emailStats.received.trend} color="#f43f5e" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Sent */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-pink-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-500 shadow-md shadow-pink-500/25">
                <SendIcon size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Sent</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{emailStats.sent.value}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">{emailStats.sent.change}</span>
                </div>
              </div>
            </div>
            <SparklineChart data={emailStats.sent.trend} color="#ec4899" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Response Time */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-violet-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-md shadow-violet-500/25">
                <Clock size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Avg. Response</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{emailStats.responseTime.value}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">{emailStats.responseTime.change}</span>
                </div>
              </div>
            </div>
            <SparklineChart data={emailStats.responseTime.trend} color="#8b5cf6" width={64} height={28} showDot animated gradient />
          </div>
        </div>

        {/* Unread */}
        <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 shadow-sm hover:shadow-md hover:shadow-amber-500/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-md shadow-amber-500/25">
                <MailOpen size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Unread</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[var(--text-primary)]">{emailStats.unread.value}</p>
                  <span className="text-[10px] font-semibold text-emerald-500">{emailStats.unread.change}</span>
                </div>
              </div>
            </div>
            <SparklineChart data={emailStats.unread.trend} color="#f59e0b" width={64} height={28} showDot animated gradient />
          </div>
        </div>
      </div>

      {/* ════════════════ MAIN EMAIL CONTAINER ════════════════ */}
      <div className="flex h-[calc(100vh-210px)] overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
        {/* ════════════════ SIDEBAR (Folders) — Premium Diamond ════════════════ */}
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[var(--border-default)] lg:flex relative overflow-hidden">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-fuchsia-500" />

          <div className="flex flex-col gap-4 overflow-y-auto p-4 pl-3">
            {/* Compose Button — Premium gradient */}
            <button
              onClick={() => { setReplyTo(undefined); setShowCompose(true) }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all hover:scale-[1.02]"
            >
              <Mail size={16} /> Compose
            </button>

            {/* Folders — Premium with gradient active state */}
            <div className="space-y-0.5">
              {(Object.entries(FOLDER_CONFIG) as [EmailFolder, typeof FOLDER_CONFIG[EmailFolder]][]).map(([key, config]) => {
                const Icon = config.icon
                const count = key === 'inbox' || key === 'spam' ? (folderCounts[key] ?? 0) : (key === 'drafts' ? emails.filter(e => e.folder === 'drafts').length : (key === 'starred' ? emails.filter(e => e.starred).length : 0))
                const isActive = activeFolder === key
                return (
                  <button
                    key={key}
                    onClick={() => { setActiveFolder(key); setSelectedEmailId(null) }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20 text-rose-600 dark:text-rose-400 font-semibold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    <div className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-md transition-all',
                      isActive
                        ? `bg-gradient-to-br ${config.gradient} shadow-sm`
                        : 'bg-[var(--bg-muted)]'
                    )}>
                      <Icon size={14} className={isActive ? 'text-white' : 'text-[var(--text-muted)]'} />
                    </div>
                    <span className="flex-1 text-left">{config.label}</span>
                    {count > 0 && (
                      <span className={cn(
                        'min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold',
                        isActive
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                          : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Labels — Premium with gradient dots */}
            <div>
              <div className="mb-2 flex items-center gap-2 px-2">
                <div className="h-px flex-1 bg-gradient-to-r from-rose-200 to-transparent dark:from-rose-800/30" />
                <h3 className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest">Labels</h3>
                <div className="h-px flex-1 bg-gradient-to-l from-rose-200 to-transparent dark:from-rose-800/30" />
              </div>
              <div className="space-y-0.5">
                {(Object.entries(LABEL_COLORS) as [EmailLabel, typeof LABEL_COLORS[EmailLabel]][]).map(([key, config]) => {
                  const labelCount = emails.filter(e => e.labels.includes(key)).length
                  return (
                    <button
                      key={key}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all capitalize"
                    >
                      <span className={cn('h-3 w-3 rounded-full bg-gradient-to-r shadow-sm', config.gradient)} />
                      <span className="flex-1 text-left">{key}</span>
                      <span className="text-[10px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                        {labelCount}
                      </span>
                    </button>
                  )
                })}
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-sm text-[var(--text-muted)] hover:bg-rose-50 dark:hover:bg-rose-950/10 hover:text-rose-500 transition-all">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full border border-dashed border-rose-300 dark:border-rose-700 text-[8px] leading-none">+</span>
                  Create Label
                </button>
              </div>
            </div>

            {/* Storage — Premium gradient bar */}
            <div className="mt-auto rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/10 dark:to-pink-950/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-rose-500" />
                <span className="text-[11px] font-semibold text-[var(--text-secondary)]">Storage</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--bg-muted)] overflow-hidden">
                <div className="h-2 w-[16%] rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm shadow-rose-500/50" />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-muted)]">2.4 GB used</span>
                <span className="text-[10px] font-medium text-rose-500">15 GB</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ════════════════ EMAIL LIST — Premium Diamond ════════════════ */}
        <div className={cn(
          'flex w-full flex-col border-r border-[var(--border-default)] lg:w-[400px] lg:shrink-0',
          selectedEmailId ? 'hidden lg:flex' : 'flex'
        )}>
          {/* List Header */}
          <div className="border-b border-[var(--border-default)] bg-gradient-to-r from-rose-50/30 to-transparent dark:from-rose-950/5 p-3">
            <div className="mb-2 flex items-center gap-2">
              <input type="checkbox" className="h-3.5 w-3.5 rounded border-[var(--border-default)] accent-rose-500" />
              {[Archive, Trash2, MailOpen, MoreHorizontal].map((Icon, i) => (
                <button key={i} className="rounded-md p-1 text-[var(--text-muted)] hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-500 transition-colors">
                  <Icon size={15} />
                </button>
              ))}

              <div className="ml-auto flex items-center gap-1">
                {/* Mobile compose */}
                <button
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-rose-500/25 lg:hidden"
                  onClick={() => { setReplyTo(undefined); setShowCompose(true) }}
                >
                  <Mail size={14} /> Compose
                </button>
              </div>
            </div>

            {/* Search — Premium */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search emails..."
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] pl-8 pr-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400 transition-all"
              />
            </div>

            {/* Filter Tabs — Premium gradient active */}
            <div className="mt-2 flex gap-1">
              {(['all', 'unread', 'starred'] as EmailFilter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setEmailFilter(f)}
                  className={cn(
                    'rounded-lg px-3 py-1 text-xs font-semibold capitalize transition-all',
                    emailFilter === f
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
                  <Inbox size={28} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {activeFolder === 'inbox' ? 'Your inbox is empty' : `No emails in ${FOLDER_CONFIG[activeFolder].label}`}
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Emails you receive will appear here
                </p>
              </div>
            ) : (
              filteredEmails.map(email => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  isActive={email.id === selectedEmailId}
                  onSelect={() => handleSelectEmail(email.id)}
                  onStar={() => handleStarEmail(email.id)}
                  onToggleRead={() => handleToggleRead(email.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* ════════════════ EMAIL PREVIEW — Premium Diamond ════════════════ */}
        <div className={cn(
          'flex-1',
          !selectedEmailId ? 'hidden lg:flex' : 'flex'
        )}>
          {selectedEmail ? (
            <div className="flex flex-1 flex-col">
              {/* Mobile back button */}
              <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-gradient-to-r from-rose-50/50 to-transparent dark:from-rose-950/10 p-2 lg:hidden">
                <button
                  onClick={() => setSelectedEmailId(null)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors"
                >
                  ← Back
                </button>
              </div>
              <EmailPreview
                email={selectedEmail}
                onReply={handleReply}
                onStar={() => handleStarEmail(selectedEmail.id)}
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              {/* Premium empty state */}
              <div className="relative mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-xl shadow-rose-500/25">
                  <FolderOpen size={36} className="text-white" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
                  <Sparkles size={14} className="text-white" />
                </div>
              </div>
              <h3 className="mb-1 text-xl font-bold text-[var(--text-primary)]">Select an email to read</h3>
              <p className="text-sm text-[var(--text-muted)] max-w-[260px]">Choose a message from the list to view its contents</p>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/10 px-3 py-2">
                <TrendingUp size={14} className="text-rose-500" />
                <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
                  {emails.filter(e => !e.read).length} unread messages waiting
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════ COMPOSE MODAL ════════════════ */}
      {showCompose && (
        <ComposeModal onClose={() => setShowCompose(false)} replyTo={replyTo} />
      )}
    </div>
  )
}
