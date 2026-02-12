'use client'

import * as React from 'react'
import { forwardRef, useState, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Cookie,
  X,
  Settings,
  Shield,
  BarChart3,
  Target,
  Sliders,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// VARIANTS
// ============================================================================

export const cookieConsentVariants = cva(
  [
    'fixed z-50',
    'bg-white dark:bg-secondary-900',
    'shadow-xl',
    'animate-in slide-in-from-bottom-4 duration-300',
  ],
  {
    variants: {
      position: {
        'bottom-bar': 'bottom-0 left-0 right-0 border-t border-secondary-200 dark:border-secondary-700',
        'bottom-left': 'bottom-4 left-4 max-w-md rounded-xl border border-secondary-200 dark:border-secondary-700',
        'bottom-right': 'bottom-4 right-4 max-w-md rounded-xl border border-secondary-200 dark:border-secondary-700',
        'modal': '',
      },
    },
    defaultVariants: {
      position: 'bottom-bar',
    },
  }
)

export const cookieButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'px-4 py-2 rounded-lg',
    'font-medium text-sm',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'active:bg-primary-700',
        ],
        secondary: [
          'bg-secondary-100 dark:bg-secondary-800',
          'text-secondary-700 dark:text-secondary-300',
          'hover:bg-secondary-200 dark:hover:bg-secondary-700',
        ],
        ghost: [
          'text-secondary-600 dark:text-secondary-400',
          'hover:bg-secondary-100 dark:hover:bg-secondary-800',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export const categoryToggleVariants = cva(
  [
    'relative w-11 h-6 rounded-full',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      enabled: {
        true: 'bg-primary-500',
        false: 'bg-secondary-300 dark:bg-secondary-600',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      enabled: false,
      disabled: false,
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export interface CookieConsentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof cookieConsentVariants> {
  privacyUrl?: string
  cookiePolicyUrl?: string
  onAccept?: (preferences: CookiePreferences) => void
  onDecline?: () => void
  onCustomize?: (preferences: CookiePreferences) => void
  storageKey?: string
  expirationDays?: number
  showManageLink?: boolean
  companyName?: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const COOKIE_CATEGORIES: {
  id: CookieCategory
  name: string
  description: string
  icon: React.ReactNode
  required: boolean
}[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'Essential cookies required for the website to function. Cannot be disabled.',
    icon: <Shield className="w-5 h-5" />,
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Cookies that help us understand how you use our website to improve it.',
    icon: <BarChart3 className="w-5 h-5" />,
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies used to deliver personalized advertisements and track campaigns.',
    icon: <Target className="w-5 h-5" />,
    required: false,
  },
  {
    id: 'preferences',
    name: 'Preferences',
    description: 'Cookies that remember your settings and preferences for a better experience.',
    icon: <Sliders className="w-5 h-5" />,
    required: false,
  },
]

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getStoredPreferences = (key: string): CookiePreferences | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.timestamp) {
        return parsed.preferences
      }
    }
    return null
  } catch {
    return null
  }
}

const storePreferences = (key: string, preferences: CookiePreferences, days: number) => {
  if (typeof window === 'undefined') return
  try {
    const data = {
      preferences,
      timestamp: Date.now(),
      expiration: Date.now() + days * 24 * 60 * 60 * 1000,
    }
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.error('Failed to store cookie preferences:', err)
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface CategoryToggleProps {
  category: typeof COOKIE_CATEGORIES[0]
  enabled: boolean
  onChange: (enabled: boolean) => void
}

const CategoryToggle: React.FC<CategoryToggleProps> = ({
  category,
  enabled,
  onChange,
}) => (
  <div className="flex items-start gap-4 py-4 border-b border-secondary-200 dark:border-secondary-700 last:border-0">
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-secondary-600 dark:text-secondary-400">
      {category.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-medium text-secondary-900 dark:text-secondary-100">
          {category.name}
          {category.required && (
            <span className="ml-2 text-xs text-secondary-500">(Required)</span>
          )}
        </h4>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={category.required}
          onClick={() => !category.required && onChange(!enabled)}
          className={cn(
            categoryToggleVariants({
              enabled,
              disabled: category.required,
            })
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
              enabled && 'translate-x-5'
            )}
          />
        </button>
      </div>
      <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
        {category.description}
      </p>
    </div>
  </div>
)

interface CustomizeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preferences: CookiePreferences
  onPreferencesChange: (preferences: CookiePreferences) => void
  onSave: () => void
  privacyUrl?: string
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({
  open,
  onOpenChange,
  preferences,
  onPreferencesChange,
  onSave,
  privacyUrl,
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" />
      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-secondary-900 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                  Cookie Preferences
                </Dialog.Title>
                <Dialog.Description className="text-sm text-secondary-500 dark:text-secondary-400">
                  Manage how we use cookies
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-0">
            {COOKIE_CATEGORIES.map((category) => (
              <CategoryToggle
                key={category.id}
                category={category}
                enabled={preferences[category.id]}
                onChange={(enabled) =>
                  onPreferencesChange({ ...preferences, [category.id]: enabled })
                }
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onSave}
              className={cn(cookieButtonVariants({ variant: 'primary' }), 'flex-1')}
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={() => {
                onPreferencesChange({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                  preferences: true,
                })
              }}
              className={cn(cookieButtonVariants({ variant: 'secondary' }), 'flex-1')}
            >
              Accept All
            </button>
          </div>

          {privacyUrl && (
            <p className="mt-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
              Learn more in our{' '}
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
              >
                Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

// ============================================================================
// MANAGE PREFERENCES BUTTON (for footer)
// ============================================================================

export interface ManageCookiesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storageKey?: string
}

export const ManageCookiesButton = forwardRef<HTMLButtonElement, ManageCookiesButtonProps>(
  ({ storageKey = 'pulse-cookie-consent', className, children, ...props }, ref) => {
    const [showModal, setShowModal] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

    useEffect(() => {
      const stored = getStoredPreferences(storageKey)
      if (stored) {
        setPreferences(stored)
      }
    }, [storageKey])

    const handleSave = () => {
      storePreferences(storageKey, preferences, 365)
      setShowModal(false)
    }

    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={() => setShowModal(true)}
          className={cn(
            'text-sm text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 hover:underline',
            className
          )}
          {...props}
        >
          {children || 'Manage Cookies'}
        </button>
        <CustomizeModal
          open={showModal}
          onOpenChange={setShowModal}
          preferences={preferences}
          onPreferencesChange={setPreferences}
          onSave={handleSave}
        />
      </>
    )
  }
)

ManageCookiesButton.displayName = 'ManageCookiesButton'

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CookieConsent = forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      className,
      position,
      privacyUrl,
      cookiePolicyUrl,
      onAccept,
      onDecline,
      onCustomize,
      storageKey = 'pulse-cookie-consent',
      expirationDays = 365,
      showManageLink = true,
      companyName = 'We',
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false)
    const [showCustomize, setShowCustomize] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

    // Check for stored preferences on mount
    useEffect(() => {
      const stored = getStoredPreferences(storageKey)
      if (!stored) {
        // Small delay for animation
        setTimeout(() => setVisible(true), 500)
      }
    }, [storageKey])

    const handleAcceptAll = useCallback(() => {
      const allAccepted: CookiePreferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      }
      storePreferences(storageKey, allAccepted, expirationDays)
      setVisible(false)
      onAccept?.(allAccepted)
    }, [storageKey, expirationDays, onAccept])

    const handleDecline = useCallback(() => {
      const necessaryOnly: CookiePreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
      }
      storePreferences(storageKey, necessaryOnly, expirationDays)
      setVisible(false)
      onDecline?.()
    }, [storageKey, expirationDays, onDecline])

    const handleSavePreferences = useCallback(() => {
      storePreferences(storageKey, preferences, expirationDays)
      setShowCustomize(false)
      setVisible(false)
      onCustomize?.(preferences)
    }, [storageKey, preferences, expirationDays, onCustomize])

    if (!visible) return null

    // Modal position renders differently
    if (position === 'modal') {
      return (
        <Dialog.Root open={visible} onOpenChange={setVisible}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" />
            <Dialog.Content
              ref={ref}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white dark:bg-secondary-900 rounded-xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    Cookie Consent
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-secondary-500 dark:text-secondary-400">
                    {companyName} use cookies to enhance your experience
                  </Dialog.Description>
                </div>
              </div>

              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-6">
                {companyName} use cookies and similar technologies to provide, improve, and personalize our services.
                By clicking "Accept All", you consent to the use of all cookies.{' '}
                {privacyUrl && (
                  <a
                    href={privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Learn more
                  </a>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className={cn(cookieButtonVariants({ variant: 'primary' }), 'flex-1')}
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className={cn(cookieButtonVariants({ variant: 'secondary' }), 'flex-1')}
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => setShowCustomize(true)}
                  className={cn(cookieButtonVariants({ variant: 'ghost' }), 'flex-1')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>

          <CustomizeModal
            open={showCustomize}
            onOpenChange={setShowCustomize}
            preferences={preferences}
            onPreferencesChange={setPreferences}
            onSave={handleSavePreferences}
            privacyUrl={privacyUrl}
          />
        </Dialog.Root>
      )
    }

    return (
      <>
        <div
          ref={ref}
          className={cn(cookieConsentVariants({ position }), className)}
          role="dialog"
          aria-label="Cookie consent"
          {...props}
        >
          <div className={cn(
            'p-4',
            position === 'bottom-bar' && 'container mx-auto flex flex-col md:flex-row items-center justify-between gap-4'
          )}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                  {companyName} use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  {privacyUrl && (
                    <>
                      {' '}
                      <a
                        href={privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </>
                  )}
                  {cookiePolicyUrl && (
                    <>
                      {' '}
                      <a
                        href={cookiePolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Cookie Policy
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className={cn(
              'flex flex-wrap gap-2',
              (position === 'bottom-left' || position === 'bottom-right') && 'mt-4 w-full'
            )}>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={cn(
                  cookieButtonVariants({ variant: 'primary' }),
                  (position === 'bottom-left' || position === 'bottom-right') && 'flex-1'
                )}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className={cn(
                  cookieButtonVariants({ variant: 'secondary' }),
                  (position === 'bottom-left' || position === 'bottom-right') && 'flex-1'
                )}
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className={cn(
                  cookieButtonVariants({ variant: 'ghost' }),
                  (position === 'bottom-left' || position === 'bottom-right') && 'flex-1'
                )}
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </button>
            </div>
          </div>
        </div>

        <CustomizeModal
          open={showCustomize}
          onOpenChange={setShowCustomize}
          preferences={preferences}
          onPreferencesChange={setPreferences}
          onSave={handleSavePreferences}
          privacyUrl={privacyUrl}
        />
      </>
    )
  }
)

CookieConsent.displayName = 'CookieConsent'
