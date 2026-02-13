'use client'

import * as React from 'react'
import {
  Search,
  Edit3,
  Phone,
  Video,
  Info,
  MoreVertical,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  BellOff,
  Ban,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Users as UsersIcon,
  Clock,
  TrendingUp,
  Zap,
  Hash,
  Star,
  Shield,
  Paperclip,
  Smile,
  Mic,
} from 'lucide-react'

import { cn } from '@shared/utils/cn'
import {
  ChatContainer,
  ChatHeader,
  ChatMessagesList,
  ChatInput,
  TypingIndicator,
  type ChatMessageData,
  type ChatUser,
} from '@core/patterns/ChatUI'
import { Avatar } from '@core/primitives/Avatar'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// TYPES
// ============================================================================

interface Conversation {
  id: string
  name: string
  avatar?: string
  isGroup?: boolean
  isOnline?: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  members?: { name: string; avatar?: string }[]
  messages: ChatMessageData[]
}

type ConversationTab = 'all' | 'unread' | 'groups' | 'archived'

// ============================================================================
// MOCK DATA
// ============================================================================

const ME: ChatUser = { id: 'me', name: 'You', isOnline: true }

function makeUser(id: string, name: string, online = false): ChatUser {
  return { id, name, isOnline: online }
}

const sarah = makeUser('sarah', 'Sarah Chen', true)
const mike = makeUser('mike', 'Mike Johnson', true)
const emily = makeUser('emily', 'Emily Davis', false)
const john = makeUser('john', 'John Doe', false)
const alex = makeUser('alex', 'Alex Kim', true)
const lisa = makeUser('lisa', 'Lisa Wang', false)
const david = makeUser('david', 'David Park', true)
const rachel = makeUser('rachel', 'Rachel Green', false)

const chatStats = {
  totalConversations: 10,
  totalMessages: 47,
  onlineContacts: 4,
  unreadMessages: 3,
  activityTrend: [2, 5, 3, 8, 12, 6, 4, 9, 14, 7, 3, 5],
}

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    isOnline: true,
    lastMessage: 'Hey, did you see the new designs?',
    lastMessageTime: '2m',
    unreadCount: 2,
    messages: [
      { id: 'm1', content: 'Hey! How are you doing?', timestamp: new Date(2026, 1, 8, 9, 0), position: 'received', user: sarah, status: 'read' },
      { id: 'm2', content: "I'm good, thanks! Working on the new dashboard.", timestamp: new Date(2026, 1, 8, 9, 5), position: 'sent', status: 'read' },
      { id: 'm3', content: 'Nice! I just finished the wireframes for the calendar feature.', timestamp: new Date(2026, 1, 8, 9, 10), position: 'received', user: sarah, status: 'read' },
      { id: 'm4', content: "That sounds great! Can you share them?", timestamp: new Date(2026, 1, 8, 9, 12), position: 'sent', status: 'read' },
      { id: 'm5', content: "Sure! Let me upload them to Figma first. I'll send you the link in a few minutes.", timestamp: new Date(2026, 1, 8, 9, 15), position: 'received', user: sarah, status: 'read' },
      { id: 'm6', content: 'Perfect, take your time! 😊', timestamp: new Date(2026, 1, 8, 9, 16), position: 'sent', status: 'read' },
      { id: 'm7', content: "Here's the Figma link: figma.com/file/abc123", timestamp: new Date(2026, 1, 8, 10, 0), position: 'received', user: sarah, status: 'read' },
      { id: 'm8', content: 'The navigation flow is really clean. I especially like the sidebar transitions.', timestamp: new Date(2026, 1, 8, 10, 5), position: 'sent', status: 'read' },
      { id: 'm9', content: 'Thanks! I spent a lot of time on the micro-interactions. Did you notice the hover states?', timestamp: new Date(2026, 1, 8, 10, 8), position: 'received', user: sarah, status: 'read' },
      { id: 'm10', content: "Yes! They're smooth. We should schedule a design review with the team.", timestamp: new Date(2026, 1, 8, 10, 10), position: 'sent', status: 'delivered' },
      { id: 'm11', content: 'Agreed. How about tomorrow at 2pm?', timestamp: new Date(2026, 1, 8, 10, 12), position: 'received', user: sarah, status: 'read' },
      { id: 'm12', content: 'Works for me! I\'ll set up the meeting.', timestamp: new Date(2026, 1, 8, 10, 15), position: 'sent', status: 'delivered' },
      { id: 'm13', content: 'Hey, did you see the new designs? I updated the color palette based on your feedback 🎨', timestamp: new Date(2026, 1, 8, 14, 30), position: 'received', user: sarah, status: 'read' },
      { id: 'm14', content: "The teal is much better now! Let me review them properly after lunch.", timestamp: new Date(2026, 1, 8, 14, 35), position: 'sent', status: 'sent' },
    ],
  },
  {
    id: '2',
    name: 'Design Team',
    isGroup: true,
    lastMessage: "John: I'll send the files by end of day",
    lastMessageTime: '1h',
    unreadCount: 0,
    members: [{ name: 'Sarah Chen' }, { name: 'John Doe' }, { name: 'Emily Davis' }, { name: 'Alex Kim' }],
    messages: [
      { id: 'm1', content: 'Hey team, just pushed the latest component updates to the repo.', timestamp: new Date(2026, 1, 8, 8, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: 'Great work! The button variants look much better now.', timestamp: new Date(2026, 1, 8, 8, 15), position: 'received', user: sarah, status: 'read' },
      { id: 'm3', content: 'I noticed the dark mode needs some tweaks on the card shadows.', timestamp: new Date(2026, 1, 8, 8, 30), position: 'received', user: emily, status: 'read' },
      { id: 'm4', content: "Good catch Emily. I'll look into it.", timestamp: new Date(2026, 1, 8, 8, 45), position: 'sent', status: 'read' },
      { id: 'm5', content: 'Also, the DataTable pagination is acting weird on mobile.', timestamp: new Date(2026, 1, 8, 9, 0), position: 'received', user: john, status: 'read' },
      { id: 'm6', content: "I'll send the files by end of day with all the fixes included.", timestamp: new Date(2026, 1, 8, 13, 0), position: 'received', user: john, status: 'read' },
    ],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    isOnline: true,
    lastMessage: 'Thanks for the update!',
    lastMessageTime: '3h',
    unreadCount: 0,
    messages: [
      { id: 'm1', content: 'Hey Mike, the API integration is done.', timestamp: new Date(2026, 1, 8, 7, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: "Awesome! That was fast. Any issues with the auth flow?", timestamp: new Date(2026, 1, 8, 7, 10), position: 'received', user: mike, status: 'read' },
      { id: 'm3', content: 'Nope, everything is working smoothly. The refresh token logic handles edge cases well.', timestamp: new Date(2026, 1, 8, 7, 15), position: 'sent', status: 'read' },
      { id: 'm4', content: "I'll run the full test suite this afternoon.", timestamp: new Date(2026, 1, 8, 7, 20), position: 'received', user: mike, status: 'read' },
      { id: 'm5', content: 'Sounds good. Let me know if anything breaks.', timestamp: new Date(2026, 1, 8, 7, 25), position: 'sent', status: 'read' },
      { id: 'm6', content: 'Thanks for the update! 👍', timestamp: new Date(2026, 1, 8, 11, 0), position: 'received', user: mike, status: 'read' },
    ],
  },
  {
    id: '4',
    name: 'Project Alpha',
    isGroup: true,
    lastMessage: 'Meeting at 3pm tomorrow',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    members: [{ name: 'Mike Johnson' }, { name: 'Lisa Wang' }, { name: 'David Park' }],
    messages: [
      { id: 'm1', content: "Team, we need to finalize the Q1 deliverables.", timestamp: new Date(2026, 1, 7, 14, 0), position: 'received', user: mike, status: 'read' },
      { id: 'm2', content: "I've updated the project board with the remaining tasks.", timestamp: new Date(2026, 1, 7, 14, 15), position: 'sent', status: 'read' },
      { id: 'm3', content: 'The backend migration is 80% complete. Should be done by Friday.', timestamp: new Date(2026, 1, 7, 14, 30), position: 'received', user: lisa, status: 'read' },
      { id: 'm4', content: 'Frontend is on track too. Just need to finish the email template.', timestamp: new Date(2026, 1, 7, 14, 45), position: 'received', user: david, status: 'read' },
      { id: 'm5', content: 'Meeting at 3pm tomorrow to go over everything.', timestamp: new Date(2026, 1, 7, 15, 0), position: 'received', user: mike, status: 'read' },
    ],
  },
  {
    id: '5',
    name: 'Emily Davis',
    isOnline: false,
    lastMessage: 'The presentation looks great!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm1', content: 'Hey Emily, can you review my presentation slides?', timestamp: new Date(2026, 1, 7, 10, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: 'Sure! Send them over.', timestamp: new Date(2026, 1, 7, 10, 30), position: 'received', user: emily, status: 'read' },
      { id: 'm3', content: 'Here are the slides for the quarterly review.', timestamp: new Date(2026, 1, 7, 10, 35), position: 'sent', status: 'read', attachments: [{ id: 'a1', name: 'Q1_Review.pdf', type: 'file', size: 2400000 }] },
      { id: 'm4', content: 'The presentation looks great! Just a few minor suggestions on slide 5 and 8.', timestamp: new Date(2026, 1, 7, 12, 0), position: 'received', user: emily, status: 'read' },
    ],
  },
  {
    id: '6',
    name: 'Alex Kim',
    isOnline: true,
    lastMessage: 'Can you help me with the TypeScript config?',
    lastMessageTime: 'Feb 5',
    unreadCount: 1,
    messages: [
      { id: 'm1', content: "Hey, I'm having issues with the TypeScript paths.", timestamp: new Date(2026, 1, 5, 16, 0), position: 'received', user: alex, status: 'read' },
      { id: 'm2', content: "What's the error you're getting?", timestamp: new Date(2026, 1, 5, 16, 5), position: 'sent', status: 'read' },
      { id: 'm3', content: "Module not found for @core/* imports", timestamp: new Date(2026, 1, 5, 16, 10), position: 'received', user: alex, status: 'read' },
      { id: 'm4', content: 'Check your tsconfig.json paths configuration. Make sure baseUrl is set correctly.', timestamp: new Date(2026, 1, 5, 16, 15), position: 'sent', status: 'read' },
      { id: 'm5', content: 'Can you help me with the TypeScript config? I still cant figure it out 😅', timestamp: new Date(2026, 1, 5, 17, 0), position: 'received', user: alex, status: 'read' },
    ],
  },
  {
    id: '7',
    name: 'Lisa Wang',
    isOnline: false,
    lastMessage: 'See you at the standup!',
    lastMessageTime: 'Feb 4',
    unreadCount: 0,
    messages: [
      { id: 'm1', content: 'Hey Lisa, are you joining the standup tomorrow?', timestamp: new Date(2026, 1, 4, 18, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: 'Yes! See you at the standup! 🙋‍♀️', timestamp: new Date(2026, 1, 4, 18, 15), position: 'received', user: lisa, status: 'read' },
    ],
  },
  {
    id: '8',
    name: 'David Park',
    isOnline: true,
    lastMessage: 'The deployment went smoothly',
    lastMessageTime: 'Feb 3',
    unreadCount: 0,
    messages: [
      { id: 'm1', content: 'Deployment to staging is done.', timestamp: new Date(2026, 1, 3, 15, 0), position: 'received', user: david, status: 'read' },
      { id: 'm2', content: 'Nice! Any issues?', timestamp: new Date(2026, 1, 3, 15, 5), position: 'sent', status: 'read' },
      { id: 'm3', content: 'The deployment went smoothly. All tests passing.', timestamp: new Date(2026, 1, 3, 15, 10), position: 'received', user: david, status: 'read' },
    ],
  },
  {
    id: '9',
    name: 'Rachel Green',
    isOnline: false,
    lastMessage: "Let's sync next week about the UX audit",
    lastMessageTime: 'Feb 2',
    unreadCount: 0,
    messages: [
      { id: 'm1', content: "Hi Rachel! How's the UX audit going?", timestamp: new Date(2026, 1, 2, 11, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: "It's going well. Found some interesting patterns in user flows.", timestamp: new Date(2026, 1, 2, 11, 30), position: 'received', user: rachel, status: 'read' },
      { id: 'm3', content: "Let's sync next week about the UX audit. I have some detailed findings to share.", timestamp: new Date(2026, 1, 2, 12, 0), position: 'received', user: rachel, status: 'read' },
    ],
  },
  {
    id: '10',
    name: 'Engineering',
    isGroup: true,
    lastMessage: 'Alex: PR merged! 🎉',
    lastMessageTime: 'Feb 1',
    unreadCount: 0,
    members: [{ name: 'Alex Kim' }, { name: 'David Park' }, { name: 'Mike Johnson' }, { name: 'Lisa Wang' }],
    messages: [
      { id: 'm1', content: 'The new build system is ready for testing.', timestamp: new Date(2026, 1, 1, 10, 0), position: 'sent', status: 'read' },
      { id: 'm2', content: "I'll run the benchmarks.", timestamp: new Date(2026, 1, 1, 10, 15), position: 'received', user: david, status: 'read' },
      { id: 'm3', content: 'Build times improved by 40%! 🚀', timestamp: new Date(2026, 1, 1, 11, 0), position: 'received', user: alex, status: 'read' },
      { id: 'm4', content: 'PR merged! 🎉', timestamp: new Date(2026, 1, 1, 14, 0), position: 'received', user: alex, status: 'read' },
    ],
  },
]

// ============================================================================
// CONVERSATION LIST ITEM
// ============================================================================

function ConversationItem({ conversation, isActive, onClick }: {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200',
        isActive
          ? 'bg-gradient-to-r from-sky-500/10 to-cyan-500/10 dark:from-sky-500/15 dark:to-cyan-500/15 shadow-sm border border-sky-200/50 dark:border-sky-800/30'
          : 'hover:bg-sky-50/50 dark:hover:bg-sky-900/10 border border-transparent'
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar
          fallback={conversation.isGroup ? conversation.name.slice(0, 2) : conversation.name.charAt(0)}
          size="md"
          alt={conversation.name}
          className={conversation.isGroup ? 'bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-400' : undefined}
        />
        {!conversation.isGroup && conversation.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-base)] bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
        )}
        {conversation.isGroup && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-500 shadow-sm">
            <UsersIcon size={8} className="text-white" />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className={cn(
            'truncate text-sm',
            conversation.unreadCount > 0 ? 'font-semibold text-[var(--text-primary)]' : 'font-medium text-[var(--text-primary)]'
          )}>
            {conversation.name}
          </span>
          <span className={cn(
            'ml-2 shrink-0 text-[11px]',
            conversation.unreadCount > 0 ? 'text-sky-500 font-medium' : 'text-[var(--text-muted)]'
          )}>
            {conversation.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className={cn(
            'truncate text-xs',
            conversation.unreadCount > 0 ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'
          )}>
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="ml-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-1.5 text-[10px] font-bold text-white shadow-sm shadow-sky-500/25">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

// ============================================================================
// INFO SIDEBAR
// ============================================================================

function InfoSidebar({ conversation, onClose }: {
  conversation: Conversation
  onClose: () => void
}) {
  return (
    <div className="flex h-full w-[300px] shrink-0 flex-col border-l border-[var(--border-default)] bg-[var(--bg-base)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-sky-500 to-cyan-500" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Details</h3>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Profile — premium gradient card */}
        <div className="relative flex flex-col items-center rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-sky-50/50 to-cyan-50/50 dark:from-sky-950/20 dark:to-cyan-950/20 p-5 text-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-500" />
          <Avatar
            fallback={conversation.isGroup ? conversation.name.slice(0, 2) : conversation.name.charAt(0)}
            size="xl"
            alt={conversation.name}
            className={cn('mb-3 ring-2 ring-offset-2 ring-offset-[var(--bg-base)]', conversation.isGroup ? 'bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-400 ring-purple-300 dark:ring-purple-700' : 'ring-sky-300 dark:ring-sky-700')}
          />
          <h4 className="text-base font-semibold text-[var(--text-primary)]">{conversation.name}</h4>
          {!conversation.isGroup && (
            <div className="mt-1 flex items-center gap-1.5">
              <span className={cn('h-2 w-2 rounded-full', conversation.isOnline ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]' : 'bg-[var(--text-muted)]')} />
              <p className={cn('text-sm', conversation.isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-muted)]')}>
                {conversation.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          )}
          {/* Quick actions */}
          <div className="mt-4 flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-muted)] hover:text-sky-500 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-sm">
              <Phone size={14} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-muted)] hover:text-sky-500 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-sm">
              <Video size={14} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-muted)] hover:text-sky-500 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-sm">
              <BellOff size={14} />
            </button>
          </div>
        </div>

        {/* Group Members */}
        {conversation.isGroup && conversation.members && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-purple-500 to-violet-500" />
              <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Members ({conversation.members.length})</h5>
            </div>
            <div className="space-y-1">
              {conversation.members.map((m, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-colors">
                  <Avatar size="sm" fallback={m.name.charAt(0)} alt={m.name} />
                  <span className="text-sm text-[var(--text-primary)]">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shared Media */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-sky-500 to-cyan-500" />
            <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Shared Media</h5>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="group/media aspect-square rounded-lg bg-gradient-to-br from-[var(--bg-muted)] to-[var(--bg-subtle)] flex items-center justify-center cursor-pointer transition-all hover:shadow-sm hover:scale-[1.03]">
                <ImageIcon size={16} className="text-[var(--text-muted)] transition-colors group-hover/media:text-sky-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Shared Files */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-amber-500 to-orange-500" />
            <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Shared Files</h5>
          </div>
          <div className="space-y-1.5">
            {[
              { name: 'Q1_Review.pdf', size: '2.4 MB', color: 'from-red-500 to-rose-500' },
              { name: 'Design_System.fig', size: '8.1 MB', color: 'from-purple-500 to-violet-500' },
              { name: 'Meeting_Notes.docx', size: '340 KB', color: 'from-blue-500 to-indigo-500' },
            ].map(file => (
              <div key={file.name} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-all cursor-pointer group/file">
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm', file.color)}>
                  <FileText size={14} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-[var(--text-primary)] truncate group-hover/file:text-sky-600 dark:group-hover/file:text-sky-400 transition-colors">{file.name}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{file.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Links */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-sky-500 to-blue-500" />
            <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Shared Links</h5>
          </div>
          <div className="space-y-1.5">
            {['figma.com/file/abc123', 'github.com/pulse/repo'].map(link => (
              <div key={link} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-all cursor-pointer">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                  <LinkIcon size={12} className="text-sky-500" />
                </div>
                <span className="text-sm text-sky-600 dark:text-sky-400 truncate">{link}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-1.5">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors">
            <BellOff size={16} />
            Mute Notifications
          </button>
          {!conversation.isGroup && (
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <Ban size={16} />
              Block User
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY STATE
// ============================================================================

function ChatEmptyState({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-xl shadow-sky-500/25">
          <MessageSquare size={36} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
          <Sparkles size={12} className="text-white" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">Start a Conversation</h3>
      <p className="mb-6 max-w-[280px] text-sm text-[var(--text-muted)]">Select a chat from the sidebar or start a new conversation to begin messaging your team.</p>
      <button
        onClick={onNewChat}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:from-sky-600 hover:to-cyan-600 hover:shadow-xl"
      >
        <Edit3 size={14} /> New Chat
      </button>
    </div>
  )
}

// ============================================================================
// MAIN CHAT PAGE
// ============================================================================

export default function ChatPage() {
  const [conversations, setConversations] = React.useState<Conversation[]>(CONVERSATIONS)
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<ConversationTab>('all')
  const [showInfo, setShowInfo] = React.useState(false)
  const [showTyping, setShowTyping] = React.useState(false)

  const activeConversation = conversations.find(c => c.id === activeConversationId)

  // Filter conversations
  const filteredConversations = React.useMemo(() => {
    let filtered = conversations

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)
      )
    }

    // Tab filter
    switch (activeTab) {
      case 'unread':
        filtered = filtered.filter(c => c.unreadCount > 0)
        break
      case 'groups':
        filtered = filtered.filter(c => c.isGroup)
        break
      case 'archived':
        filtered = []
        break
    }

    return filtered
  }, [conversations, searchQuery, activeTab])

  // Total unread count
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!activeConversationId || !content.trim()) return

    const newMessage: ChatMessageData = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      position: 'sent',
      status: 'sent',
    }

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== activeConversationId) return c
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: content,
          lastMessageTime: 'Just now',
        }
      })
    )

    // Simulate typing response
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      const responseMessage: ChatMessageData = {
        id: `msg-${Date.now() + 1}`,
        content: getAutoResponse(),
        timestamp: new Date(),
        position: 'received',
        user: activeConversation
          ? { id: activeConversation.id, name: activeConversation.name, isOnline: activeConversation.isOnline }
          : undefined,
        status: 'read',
      }

      setConversations(prev =>
        prev.map(c => {
          if (c.id !== activeConversationId) return c
          return {
            ...c,
            messages: [...c.messages, responseMessage],
            lastMessage: responseMessage.content,
            lastMessageTime: 'Just now',
          }
        })
      )
    }, 2000)
  }

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id)
    // Clear unread
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c)
    )
  }

  const tabs: { key: ConversationTab; label: string; count?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread', count: totalUnread },
    { key: 'groups', label: 'Groups' },
    { key: 'archived', label: 'Archived' },
  ]

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] shadow-sm">
      {/* ════════════════ SIDEBAR (Conversations) ════════════════ */}
      <aside className={cn(
        'flex w-full flex-col border-r border-[var(--border-default)] md:w-[340px] md:shrink-0 relative',
        activeConversationId ? 'hidden md:flex' : 'flex'
      )}>
        {/* Left gradient accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-cyan-500 to-blue-500 hidden md:block" />

        {/* Hero Header — premium */}
        <div className="relative overflow-hidden border-b border-[var(--border-default)] bg-gradient-to-br from-sky-50/60 via-[var(--bg-base)] to-cyan-50/40 dark:from-sky-950/20 dark:via-[var(--bg-base)] dark:to-cyan-950/15 px-4 py-4">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500" />

          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">Messages</h1>
                <p className="text-xs text-[var(--text-muted)]">{chatStats.onlineContacts} contacts online</p>
              </div>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-sky-500 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-sm">
              <Edit3 size={16} />
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="rounded-lg bg-[var(--bg-base)]/80 backdrop-blur-sm border border-[var(--border-default)] px-2.5 py-2 text-center">
              <div className="text-base font-bold text-[var(--text-primary)]">{chatStats.totalConversations}</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Chats</div>
            </div>
            <div className="rounded-lg bg-[var(--bg-base)]/80 backdrop-blur-sm border border-[var(--border-default)] px-2.5 py-2 text-center">
              <div className="text-base font-bold text-sky-600 dark:text-sky-400">{totalUnread}</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Unread</div>
            </div>
            <div className="rounded-lg bg-[var(--bg-base)]/80 backdrop-blur-sm border border-[var(--border-default)] px-2.5 py-2 text-center">
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{chatStats.onlineContacts}</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Online</div>
            </div>
          </div>
        </div>

        {/* Search — premium */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] pl-9 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
            />
          </div>
        </div>

        {/* Tabs — premium gradient active */}
        <div className="flex gap-1 border-b border-[var(--border-default)] px-4 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-sm shadow-sky-500/25'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              {tab.label}
              {tab.count != null && tab.count > 0 && (
                <span className={cn(
                  'ml-1.5 text-[10px]',
                  activeTab === tab.key ? 'text-white/80' : 'text-[var(--text-muted)]'
                )}>
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900/20 dark:to-cyan-900/20">
                <MessageSquare size={24} className="text-sky-500" />
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                {activeTab === 'archived' ? 'No archived conversations' : 'No conversations found'}
              </p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === activeConversationId}
                onClick={() => handleSelectConversation(conv.id)}
              />
            ))
          )}
        </div>
      </aside>

      {/* ════════════════ CHAT AREA ════════════════ */}
      <div className={cn(
        'flex flex-1 flex-col',
        !activeConversationId ? 'hidden md:flex' : 'flex'
      )}>
        {activeConversation ? (
          <>
            {/* Chat Header — premium */}
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3 lg:px-6 bg-gradient-to-r from-transparent via-sky-50/20 to-transparent dark:via-sky-950/10">
              <div className="flex items-center gap-3">
                {/* Back button mobile */}
                <button
                  className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition-colors md:hidden"
                  onClick={() => setActiveConversationId(null)}
                >
                  <X size={18} />
                </button>
                <div className="relative">
                  <Avatar
                    fallback={activeConversation.isGroup ? activeConversation.name.slice(0, 2) : activeConversation.name.charAt(0)}
                    size="md"
                    alt={activeConversation.name}
                    className={activeConversation.isGroup ? 'bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-400' : undefined}
                  />
                  {!activeConversation.isGroup && activeConversation.isOnline && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-base)] bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">{activeConversation.name}</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {activeConversation.isGroup
                      ? `${activeConversation.members?.length ?? 0} members`
                      : activeConversation.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-500 transition-all">
                  <Phone size={18} />
                </button>
                <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-500 transition-all">
                  <Video size={18} />
                </button>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={cn(
                    'rounded-lg p-2 transition-all',
                    showInfo
                      ? 'bg-gradient-to-r from-sky-500/10 to-cyan-500/10 text-sky-500'
                      : 'text-[var(--text-muted)] hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-500'
                  )}
                >
                  <Info size={18} />
                </button>
              </div>
            </div>

            {/* Messages + Info Panel */}
            <div className="flex flex-1 overflow-hidden">
              {/* Messages */}
              <div className="flex flex-1 flex-col">
                {/* Date Separator + Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {/* Group by date */}
                    {(() => {
                      const grouped: { date: string; messages: ChatMessageData[] }[] = []
                      let currentGroup: { date: string; messages: ChatMessageData[] } | null = null

                      activeConversation.messages.forEach(msg => {
                        const d = new Date(msg.timestamp)
                        const dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        const today = new Date()
                        const yesterday = new Date(today)
                        yesterday.setDate(yesterday.getDate() - 1)

                        let label = dateStr
                        if (d.toDateString() === today.toDateString()) label = 'Today'
                        else if (d.toDateString() === yesterday.toDateString()) label = 'Yesterday'

                        if (!currentGroup || currentGroup.date !== label) {
                          currentGroup = { date: label, messages: [] }
                          grouped.push(currentGroup)
                        }
                        currentGroup.messages.push(msg)
                      })

                      return grouped.map((group, gi) => (
                        <div key={gi}>
                          <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
                            <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)] shadow-sm">{group.date}</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
                          </div>
                          <div className="space-y-3">
                            {group.messages.map(msg => (
                              <div
                                key={msg.id}
                                className={cn(
                                  'flex gap-3',
                                  msg.position === 'sent' ? 'flex-row-reverse' : 'flex-row'
                                )}
                              >
                                {msg.position === 'received' && msg.user && (
                                  <Avatar
                                    fallback={msg.user.name.charAt(0)}
                                    size="sm"
                                    alt={msg.user.name}
                                    className="shrink-0 mt-1"
                                  />
                                )}
                                <div className={cn('flex max-w-[75%] flex-col gap-1', msg.position === 'sent' ? 'items-end' : 'items-start')}>
                                  {msg.position === 'received' && activeConversation.isGroup && msg.user && (
                                    <span className="text-xs font-medium text-[var(--text-muted)]">{msg.user.name}</span>
                                  )}
                                  <div className={cn(
                                    'rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all',
                                    msg.position === 'sent'
                                      ? 'rounded-br-md bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sky-500/15'
                                      : 'rounded-bl-md bg-[var(--bg-muted)] text-[var(--text-primary)]'
                                  )}>
                                    {/* Attachments */}
                                    {msg.attachments?.map(att => (
                                      <div key={att.id} className={cn(
                                        'mb-2 flex items-center gap-2 rounded-lg p-2',
                                        msg.position === 'sent' ? 'bg-white/10' : 'bg-[var(--bg-emphasis)]'
                                      )}>
                                        <FileText size={16} />
                                        <span className="truncate text-sm">{att.name}</span>
                                      </div>
                                    ))}
                                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <time className="text-[10px] text-[var(--text-muted)]">
                                      {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                                    </time>
                                    {msg.position === 'sent' && msg.status && (
                                      <span className={cn(
                                        'text-[10px]',
                                        msg.status === 'read' ? 'text-sky-500' : 'text-[var(--text-muted)]'
                                      )}>
                                        {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    })()}

                    {/* Typing Indicator */}
                    {showTyping && (
                      <TypingIndicator
                        users={[{
                          id: activeConversation.id,
                          name: activeConversation.name,
                          isOnline: true,
                        }]}
                      />
                    )}
                  </div>
                </div>

                {/* Chat Input — premium */}
                <div className="border-t border-[var(--border-default)] bg-gradient-to-r from-transparent via-sky-50/10 to-transparent dark:via-sky-950/5">
                  <ChatInput
                    onSubmit={handleSendMessage}
                    placeholder="Type a message..."
                  />
                </div>
              </div>

              {/* Info Sidebar */}
              {showInfo && (
                <InfoSidebar
                  conversation={activeConversation}
                  onClose={() => setShowInfo(false)}
                />
              )}
            </div>
          </>
        ) : (
          <ChatEmptyState onNewChat={() => handleSelectConversation('1')} />
        )}
      </div>
    </div>
  )
}

// Auto-response helper
function getAutoResponse(): string {
  const responses = [
    'Got it, thanks for letting me know! 👍',
    "That sounds like a great plan. Let's do it!",
    "I'll take a look at it and get back to you.",
    'Perfect, I agree with that approach.',
    'Sure thing! Let me check on that.',
    "Interesting, I hadn't thought about it that way.",
    "Thanks for sharing! I'll review it shortly.",
    'Sounds good to me! 😊',
  ]
  return responses[Math.floor(Math.random() * responses.length)]!
}
