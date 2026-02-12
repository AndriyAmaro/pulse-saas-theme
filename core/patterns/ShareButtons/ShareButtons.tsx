'use client'

import * as React from 'react'
import { forwardRef, useState, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  Share2,
  Link2,
  Check,
  Mail,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// ICONS
// ============================================================================

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

// ============================================================================
// VARIANTS
// ============================================================================

export const shareButtonsVariants = cva(
  'flex items-center',
  {
    variants: {
      variant: {
        'icons-only': 'gap-2',
        'with-labels': 'gap-3',
        'dropdown': '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'icons-only',
      size: 'md',
    },
  }
)

export const shareButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-secondary-100 dark:bg-secondary-800',
          'text-secondary-700 dark:text-secondary-300',
          'hover:bg-secondary-200 dark:hover:bg-secondary-700',
        ],
        outline: [
          'border border-secondary-200 dark:border-secondary-700',
          'text-secondary-700 dark:text-secondary-300',
          'hover:border-secondary-300 dark:hover:border-secondary-600',
          'hover:bg-secondary-50 dark:hover:bg-secondary-800/50',
        ],
        ghost: [
          'text-secondary-600 dark:text-secondary-400',
          'hover:bg-secondary-100 dark:hover:bg-secondary-800',
          'hover:text-secondary-900 dark:hover:text-secondary-100',
        ],
        colored: '',
      },
      size: {
        sm: 'w-8 h-8 rounded-lg text-sm',
        md: 'w-10 h-10 rounded-lg text-sm',
        lg: 'w-12 h-12 rounded-xl text-base',
      },
      withLabel: {
        true: 'px-4 w-auto',
        false: '',
      },
    },
    compoundVariants: [
      {
        withLabel: true,
        size: 'sm',
        className: 'h-8 px-3',
      },
      {
        withLabel: true,
        size: 'md',
        className: 'h-10 px-4',
      },
      {
        withLabel: true,
        size: 'lg',
        className: 'h-12 px-5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      withLabel: false,
    },
  }
)

// Network-specific colors for 'colored' variant
const NETWORK_COLORS: Record<string, string> = {
  twitter: 'bg-black text-white hover:bg-neutral-800',
  linkedin: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
  facebook: 'bg-[#1877F2] text-white hover:bg-[#0C63D4]',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#128C7E]',
  telegram: 'bg-[#26A5E4] text-white hover:bg-[#0088CC]',
  email: 'bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600',
  link: 'bg-primary-500 text-white hover:bg-primary-600',
}

// ============================================================================
// TYPES
// ============================================================================

export type ShareNetwork = 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'telegram' | 'email' | 'link'

export interface ShareData {
  url: string
  title?: string
  description?: string
  hashtags?: string[]
}

export interface ShareButtonsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof shareButtonsVariants> {
  data: ShareData
  networks?: ShareNetwork[]
  buttonVariant?: 'default' | 'outline' | 'ghost' | 'colored'
  showCount?: boolean
  counts?: Partial<Record<ShareNetwork, number>>
  showTooltips?: boolean
  useNativeShare?: boolean
  onShare?: (network: ShareNetwork) => void
}

// ============================================================================
// NETWORK CONFIG
// ============================================================================

const NETWORKS: Record<ShareNetwork, {
  name: string
  icon: React.ReactNode
  getUrl: (data: ShareData) => string
}> = {
  twitter: {
    name: 'Twitter',
    icon: <TwitterIcon className="w-4 h-4" />,
    getUrl: (data) => {
      const params = new URLSearchParams({
        url: data.url,
        text: data.title || '',
      })
      if (data.hashtags?.length) {
        params.set('hashtags', data.hashtags.join(','))
      }
      return `https://twitter.com/intent/tweet?${params}`
    },
  },
  linkedin: {
    name: 'LinkedIn',
    icon: <LinkedInIcon className="w-4 h-4" />,
    getUrl: (data) => {
      const params = new URLSearchParams({
        url: data.url,
      })
      return `https://www.linkedin.com/sharing/share-offsite/?${params}`
    },
  },
  facebook: {
    name: 'Facebook',
    icon: <FacebookIcon className="w-4 h-4" />,
    getUrl: (data) => {
      const params = new URLSearchParams({
        u: data.url,
      })
      return `https://www.facebook.com/sharer/sharer.php?${params}`
    },
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-4 h-4" />,
    getUrl: (data) => {
      const text = data.title ? `${data.title} ${data.url}` : data.url
      return `https://wa.me/?text=${encodeURIComponent(text)}`
    },
  },
  telegram: {
    name: 'Telegram',
    icon: <TelegramIcon className="w-4 h-4" />,
    getUrl: (data) => {
      const params = new URLSearchParams({
        url: data.url,
        text: data.title || '',
      })
      return `https://t.me/share/url?${params}`
    },
  },
  email: {
    name: 'Email',
    icon: <Mail className="w-4 h-4" />,
    getUrl: (data) => {
      const params = new URLSearchParams({
        subject: data.title || 'Check this out',
        body: data.description ? `${data.description}\n\n${data.url}` : data.url,
      })
      return `mailto:?${params}`
    },
  },
  link: {
    name: 'Copy Link',
    icon: <Link2 className="w-4 h-4" />,
    getUrl: (data) => data.url,
  },
}

const DEFAULT_NETWORKS: ShareNetwork[] = ['twitter', 'linkedin', 'facebook', 'whatsapp', 'email', 'link']

// ============================================================================
// SHARE BUTTON COMPONENT
// ============================================================================

interface SingleShareButtonProps {
  network: ShareNetwork
  data: ShareData
  variant: 'default' | 'outline' | 'ghost' | 'colored'
  size: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showCount?: boolean
  count?: number
  showTooltip?: boolean
  onShare?: () => void
}

const SingleShareButton: React.FC<SingleShareButtonProps> = ({
  network,
  data,
  variant,
  size,
  showLabel,
  showCount,
  count,
  showTooltip,
  onShare,
}) => {
  const [copied, setCopied] = useState(false)
  const config = NETWORKS[network]

  const handleClick = useCallback(async () => {
    if (network === 'link') {
      try {
        await navigator.clipboard.writeText(data.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    } else {
      window.open(config.getUrl(data), '_blank', 'noopener,noreferrer,width=600,height=400')
    }
    onShare?.()
  }, [network, data, config, onShare])

  const buttonContent = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        shareButtonVariants({
          variant: variant === 'colored' ? 'default' : variant,
          size,
          withLabel: showLabel,
        }),
        variant === 'colored' && NETWORK_COLORS[network]
      )}
      aria-label={`Share on ${config.name}`}
    >
      {network === 'link' && copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        config.icon
      )}
      {showLabel && (
        <span>{network === 'link' && copied ? 'Copied!' : config.name}</span>
      )}
      {showCount && count !== undefined && count > 0 && (
        <span className="text-xs opacity-70">{count}</span>
      )}
    </button>
  )

  if (showTooltip && !showLabel) {
    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>{buttonContent}</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="px-3 py-1.5 text-sm bg-secondary-900 dark:bg-secondary-100 text-white dark:text-secondary-900 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-100"
              sideOffset={5}
            >
              {network === 'link' && copied ? 'Copied!' : config.name}
              <Tooltip.Arrow className="fill-secondary-900 dark:fill-secondary-100" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  }

  return buttonContent
}

// ============================================================================
// DROPDOWN VARIANT
// ============================================================================

interface ShareDropdownProps {
  data: ShareData
  networks: ShareNetwork[]
  buttonVariant: 'default' | 'outline' | 'ghost' | 'colored'
  size: 'sm' | 'md' | 'lg'
  counts?: Partial<Record<ShareNetwork, number>>
  onShare?: (network: ShareNetwork) => void
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({
  data,
  networks,
  buttonVariant,
  size,
  counts,
  onShare,
}) => {
  const [copiedLink, setCopiedLink] = useState(false)

  const handleShare = async (network: ShareNetwork) => {
    const config = NETWORKS[network]

    if (network === 'link') {
      try {
        await navigator.clipboard.writeText(data.url)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    } else {
      window.open(config.getUrl(data), '_blank', 'noopener,noreferrer,width=600,height=400')
    }
    onShare?.(network)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            shareButtonVariants({ variant: buttonVariant, size, withLabel: true })
          )}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-lg p-1 animate-in fade-in zoom-in-95 duration-100"
          sideOffset={5}
          align="end"
        >
          {networks.map((network) => {
            const config = NETWORKS[network]
            const count = counts?.[network]

            return (
              <DropdownMenu.Item
                key={network}
                onClick={() => handleShare(network)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              >
                <span className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg',
                  buttonVariant === 'colored'
                    ? NETWORK_COLORS[network]
                    : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400'
                )}>
                  {network === 'link' && copiedLink ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    config.icon
                  )}
                </span>
                <span className="flex-1 text-sm text-secondary-700 dark:text-secondary-300">
                  {network === 'link' && copiedLink ? 'Copied!' : config.name}
                </span>
                {count !== undefined && count > 0 && (
                  <span className="text-xs text-secondary-400">{count}</span>
                )}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ShareButtons = forwardRef<HTMLDivElement, ShareButtonsProps>(
  (
    {
      className,
      variant = 'icons-only',
      size = 'md',
      data,
      networks = DEFAULT_NETWORKS,
      buttonVariant = 'default',
      showCount = false,
      counts,
      showTooltips = true,
      useNativeShare = true,
      onShare,
      ...props
    },
    ref
  ) => {
    // Check for native share API support
    const supportsNativeShare =
      typeof navigator !== 'undefined' && 'share' in navigator && useNativeShare

    const handleNativeShare = useCallback(async () => {
      try {
        await navigator.share({
          title: data.title,
          text: data.description,
          url: data.url,
        })
        onShare?.('link')
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err)
        }
      }
    }, [data, onShare])

    // On mobile with native share, show a single button
    if (supportsNativeShare && typeof window !== 'undefined' && window.innerWidth < 768) {
      return (
        <div ref={ref} className={className} {...props}>
          <button
            type="button"
            onClick={handleNativeShare}
            className={cn(
              shareButtonVariants({
                variant: buttonVariant,
                size,
                withLabel: variant === 'with-labels',
              })
            )}
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
            {variant === 'with-labels' && <span>Share</span>}
          </button>
        </div>
      )
    }

    // Dropdown variant
    if (variant === 'dropdown') {
      return (
        <div ref={ref} className={className} {...props}>
          <ShareDropdown
            data={data}
            networks={networks}
            buttonVariant={buttonVariant}
            size={size ?? 'md'}
            counts={counts}
            onShare={onShare}
          />
        </div>
      )
    }

    // Icons or with-labels variant
    return (
      <div
        ref={ref}
        className={cn(shareButtonsVariants({ variant, size }), className)}
        {...props}
      >
        {networks.map((network) => (
          <SingleShareButton
            key={network}
            network={network}
            data={data}
            variant={buttonVariant}
            size={size ?? 'md'}
            showLabel={variant === 'with-labels'}
            showCount={showCount}
            count={counts?.[network]}
            showTooltip={showTooltips}
            onShare={() => onShare?.(network)}
          />
        ))}
      </div>
    )
  }
)

ShareButtons.displayName = 'ShareButtons'
