'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Avatar } from '@core/primitives/Avatar'
import {
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  Image as ImageIcon,
  File,
  X,
  MoreVertical,
} from 'lucide-react'

// ============================================================================
// CVA Variants
// ============================================================================

const chatContainerVariants = cva(
  'flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)]',
  {
    variants: {
      size: {
        sm: 'h-[400px]',
        md: 'h-[500px]',
        lg: 'h-[600px]',
        full: 'h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const chatMessageVariants = cva('flex gap-3', {
  variants: {
    position: {
      sent: 'flex-row-reverse',
      received: 'flex-row',
    },
  },
  defaultVariants: {
    position: 'received',
  },
})

const messageBubbleVariants = cva(
  'max-w-[75%] rounded-2xl px-4 py-2.5 transition-colors',
  {
    variants: {
      position: {
        sent: 'rounded-br-md bg-[var(--primary-500)] text-white',
        received:
          'rounded-bl-md bg-[var(--bg-muted)] text-[var(--text-primary)]',
      },
    },
    defaultVariants: {
      position: 'received',
    },
  }
)

const chatInputVariants = cva(
  'flex items-end gap-2 border-t border-[var(--border-default)] bg-[var(--bg-base)] p-4',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'border-0 pt-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const typingIndicatorVariants = cva(
  'flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-muted)]',
  {
    variants: {
      variant: {
        default: '',
        animated: '',
      },
    },
    defaultVariants: {
      variant: 'animated',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error'
export type MessagePosition = 'sent' | 'received'

export interface ChatAttachment {
  id: string
  name: string
  type: 'image' | 'file'
  url?: string
  size?: number
}

export interface ChatUser {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
}

export interface ChatMessageData {
  id: string
  content: string
  timestamp: Date | string
  position: MessagePosition
  status?: MessageStatus
  user?: ChatUser
  attachments?: ChatAttachment[]
}

export interface ChatContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatContainerVariants> {
  header?: React.ReactNode
}

export interface ChatMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatMessageVariants> {
  message: ChatMessageData
  showAvatar?: boolean
  showTimestamp?: boolean
  showStatus?: boolean
  onMessageAction?: (action: string, message: ChatMessageData) => void
}

export interface ChatInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onChange'>,
    VariantProps<typeof chatInputVariants> {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string, attachments?: File[]) => void
  placeholder?: string
  disabled?: boolean
  showEmoji?: boolean
  showAttach?: boolean
  maxLength?: number
}

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typingIndicatorVariants> {
  users: ChatUser[]
}

// ============================================================================
// Sub Components
// ============================================================================

// Typing Indicator
const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, variant, users, ...props }, ref) => {
    if (users.length === 0) return null

    const firstUser = users[0]
    const secondUser = users[1]

    const names =
      users.length === 1
        ? firstUser?.name ?? ''
        : users.length === 2
        ? `${firstUser?.name ?? ''} and ${secondUser?.name ?? ''}`
        : `${firstUser?.name ?? ''} and ${users.length - 1} others`

    return (
      <div
        ref={ref}
        className={cn(typingIndicatorVariants({ variant }), className)}
        aria-live="polite"
        {...props}
      >
        <span className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)]" />
        </span>
        <span>
          {names} {users.length === 1 ? 'is' : 'are'} typing...
        </span>
      </div>
    )
  }
)

TypingIndicator.displayName = 'TypingIndicator'

// Message Status Icon
const MessageStatusIcon: React.FC<{ status?: MessageStatus }> = ({ status }) => {
  switch (status) {
    case 'sending':
      return <Clock size={14} className="text-white/70" />
    case 'sent':
      return <Check size={14} className="text-white/70" />
    case 'delivered':
      return <CheckCheck size={14} className="text-white/70" />
    case 'read':
      return <CheckCheck size={14} className="text-[var(--primary-300)]" />
    case 'error':
      return <X size={14} className="text-error-light" />
    default:
      return null
  }
}

// Chat Message Component
const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      message,
      position = message.position,
      showAvatar = true,
      showTimestamp = true,
      showStatus = true,
      onMessageAction,
      ...props
    },
    ref
  ) => {
    const formattedTime = new Date(message.timestamp).toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }
    )

    return (
      <div
        ref={ref}
        className={cn(chatMessageVariants({ position }), className)}
        {...props}
      >
        {/* Avatar */}
        {showAvatar && message.user && position === 'received' && (
          <Avatar
            src={message.user.avatar}
            fallback={message.user.name.charAt(0)}
            size="sm"
            alt={message.user.name}
            className="shrink-0"
          />
        )}

        {/* Message Content */}
        <div className={cn('flex flex-col gap-1', position === 'sent' ? 'items-end' : 'items-start')}>
          {/* User Name for received messages */}
          {position === 'received' && message.user && (
            <span className="text-xs font-medium text-[var(--text-muted)]">
              {message.user.name}
            </span>
          )}

          {/* Message Bubble */}
          <div className="group relative">
            <div className={cn(messageBubbleVariants({ position }))}>
              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mb-2 space-y-2">
                  {message.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className={cn(
                        'flex items-center gap-2 rounded-lg p-2',
                        position === 'sent'
                          ? 'bg-white/10'
                          : 'bg-[var(--bg-emphasis)]'
                      )}
                    >
                      {attachment.type === 'image' ? (
                        <ImageIcon size={16} />
                      ) : (
                        <File size={16} />
                      )}
                      <span className="truncate text-sm">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Text Content */}
              <p className="whitespace-pre-wrap break-words text-sm">
                {message.content}
              </p>
            </div>

            {/* Actions Menu */}
            {onMessageAction && (
              <button
                onClick={() => onMessageAction('menu', message)}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100',
                  position === 'sent' ? '-left-8' : '-right-8',
                  'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]'
                )}
                aria-label="Message actions"
              >
                <MoreVertical size={16} />
              </button>
            )}
          </div>

          {/* Timestamp and Status */}
          <div className="flex items-center gap-1.5">
            {showTimestamp && (
              <time
                dateTime={new Date(message.timestamp).toISOString()}
                className="text-xs text-[var(--text-muted)]"
              >
                {formattedTime}
              </time>
            )}
            {showStatus && position === 'sent' && (
              <MessageStatusIcon status={message.status} />
            )}
          </div>
        </div>

        {/* Avatar placeholder for sent messages alignment */}
        {showAvatar && position === 'sent' && <div className="w-8 shrink-0" />}
      </div>
    )
  }
)

ChatMessage.displayName = 'ChatMessage'

// Chat Input Component
const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      className,
      variant,
      value = '',
      onChange,
      onSubmit,
      placeholder = 'Type a message...',
      disabled = false,
      showEmoji = true,
      showAttach = true,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value)
    const [attachments, setAttachments] = React.useState<File[]>([])
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      setInputValue(value)
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return
      setInputValue(newValue)
      onChange?.(newValue)

      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          120
        )}px`
      }
    }

    const handleSubmit = () => {
      if (!inputValue.trim() && attachments.length === 0) return
      onSubmit?.(inputValue, attachments.length > 0 ? attachments : undefined)
      setInputValue('')
      setAttachments([])
      onChange?.('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setAttachments((prev) => [...prev, ...files])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    const removeAttachment = (index: number) => {
      setAttachments((prev) => prev.filter((_, i) => i !== index))
    }

    return (
      <div
        ref={ref}
        className={cn(chatInputVariants({ variant }), className)}
        {...props}
      >
        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 flex flex-wrap gap-2 border-t border-[var(--border-default)] bg-[var(--bg-base)] p-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-[var(--bg-muted)] px-3 py-1.5"
              >
                {file.type.startsWith('image/') ? (
                  <ImageIcon size={14} className="text-[var(--text-muted)]" />
                ) : (
                  <File size={14} className="text-[var(--text-muted)]" />
                )}
                <span className="max-w-[120px] truncate text-sm text-[var(--text-secondary)]">
                  {file.name}
                </span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-[var(--text-muted)] hover:text-error"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Emoji Button */}
        {showEmoji && (
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
            disabled={disabled}
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
        )}

        {/* Attach Button */}
        {showAttach && (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
              disabled={disabled}
              aria-label="Attach file"
            >
              <Paperclip size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              aria-hidden="true"
            />
          </>
        )}

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="max-h-[120px] min-h-[40px] flex-1 resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]/20 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Message input"
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || (!inputValue.trim() && attachments.length === 0)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-500)] text-white transition-colors hover:bg-[var(--primary-600)] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    )
  }
)

ChatInput.displayName = 'ChatInput'

// Chat Messages List Component
interface ChatMessagesListProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessageData[]
  showAvatar?: boolean
  showTimestamp?: boolean
  showStatus?: boolean
  onMessageAction?: (action: string, message: ChatMessageData) => void
}

const ChatMessagesList = React.forwardRef<HTMLDivElement, ChatMessagesListProps>(
  (
    {
      className,
      messages,
      showAvatar = true,
      showTimestamp = true,
      showStatus = true,
      onMessageAction,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom on new messages
    React.useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }, [messages])

    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 space-y-4 overflow-y-auto p-4',
          className
        )}
        {...props}
      >
        <div ref={containerRef} className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              showAvatar={showAvatar}
              showTimestamp={showTimestamp}
              showStatus={showStatus}
              onMessageAction={onMessageAction}
            />
          ))}
        </div>
      </div>
    )
  }
)

ChatMessagesList.displayName = 'ChatMessagesList'

// Chat Header Component
interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: ChatUser
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  ({ className, user, title, subtitle, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {user && (
            <div className="relative">
              <Avatar
                src={user.avatar}
                fallback={user.name.charAt(0)}
                size="md"
                alt={user.name}
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-base)] bg-success" />
              )}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">
              {title || user?.name}
            </h3>
            {subtitle && (
              <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
            )}
            {!subtitle && user?.isOnline && (
              <p className="text-sm text-success">Online</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    )
  }
)

ChatHeader.displayName = 'ChatHeader'

// Main Chat Container Component
const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, size, header, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chatContainerVariants({ size }), className)}
        role="region"
        aria-label="Chat"
        {...props}
      >
        {header}
        {children}
      </div>
    )
  }
)

ChatContainer.displayName = 'ChatContainer'

export {
  ChatContainer,
  ChatHeader,
  ChatMessagesList,
  ChatMessage,
  ChatInput,
  TypingIndicator,
  chatContainerVariants,
  chatMessageVariants,
  messageBubbleVariants,
  chatInputVariants,
  typingIndicatorVariants,
}
