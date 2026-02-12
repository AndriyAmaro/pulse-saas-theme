'use client'

import * as React from 'react'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { useRouter, usePathname } from '@/i18n/navigation'
import { locales, localeFlags, localeNames, type Locale } from '@/i18n/config'
import { DropdownMenu } from '@core/organisms/DropdownMenu'

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center gap-1.5 p-2 rounded-lg',
            'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
            'hover:bg-[var(--bg-muted)]',
            'transition-colors duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
            className
          )}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">{localeFlags[locale]}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-44">
        {locales.map((loc) => (
          <DropdownMenu.Item
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={cn(locale === loc && 'bg-primary-500/10 text-primary-500')}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
