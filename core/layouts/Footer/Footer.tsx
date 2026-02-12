import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

// ============ VARIANTS ============

const footerVariants = cva(
  [
    'flex items-center justify-between px-6 py-4',
    'border-t border-[var(--border-default)]',
    'bg-[var(--bg-base)]',
    'text-sm text-[var(--text-muted)]',
  ],
  {
    variants: {
      position: {
        default: '',
        sticky: 'sticky bottom-0',
        fixed: 'fixed bottom-0 left-0 right-0',
      },
      size: {
        sm: 'py-2 text-xs',
        md: 'py-4',
        lg: 'py-6',
      },
    },
    defaultVariants: {
      position: 'default',
      size: 'md',
    },
  }
)

// ============ TYPES ============

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  /** Copyright text (e.g., "© 2024 Company Name") */
  copyright?: string
  /** Array of footer links */
  links?: FooterLink[]
  /** Custom render for links (for Next.js Link) */
  renderLink?: (link: FooterLink, children: React.ReactNode) => React.ReactNode
  /** Left slot content */
  leftSlot?: React.ReactNode
  /** Right slot content */
  rightSlot?: React.ReactNode
  /** Center slot content */
  centerSlot?: React.ReactNode
  /** Show divider between items */
  showDivider?: boolean
}

// ============ SUB-COMPONENTS ============

interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  links: FooterLink[]
  renderLink?: (link: FooterLink, children: React.ReactNode) => React.ReactNode
  showDivider?: boolean
}

const FooterLinks = React.forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ className, links, renderLink, showDivider = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4', className)}
        {...props}
      >
        {links.map((link, index) => {
          const linkContent = (
            <span
              className={cn(
                'hover:text-[var(--text-primary)] transition-colors duration-150',
                'cursor-pointer'
              )}
            >
              {link.label}
            </span>
          )

          const renderedLink = renderLink ? (
            renderLink(link, linkContent)
          ) : (
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {link.label}
            </a>
          )

          return (
            <React.Fragment key={link.href}>
              {showDivider && index > 0 && (
                <span className="text-[var(--border-default)]">·</span>
              )}
              {renderedLink}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)

FooterLinks.displayName = 'Footer.Links'

interface FooterCopyrightProps extends React.HTMLAttributes<HTMLSpanElement> {}

const FooterCopyright = React.forwardRef<HTMLSpanElement, FooterCopyrightProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(className)} {...props}>
        {children}
      </span>
    )
  }
)

FooterCopyright.displayName = 'Footer.Copyright'

// ============ MAIN COMPONENT ============

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      position,
      size,
      copyright,
      links,
      renderLink,
      leftSlot,
      rightSlot,
      centerSlot,
      showDivider = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ position, size }), className)}
        {...props}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {leftSlot}
          {!leftSlot && copyright && (
            <FooterCopyright>{copyright}</FooterCopyright>
          )}
        </div>

        {/* Center Section */}
        {centerSlot && <div className="flex items-center">{centerSlot}</div>}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {rightSlot}
          {!rightSlot && links && links.length > 0 && (
            <FooterLinks
              links={links}
              renderLink={renderLink}
              showDivider={showDivider}
            />
          )}
        </div>

        {/* Custom children */}
        {children}
      </footer>
    )
  }
)

Footer.displayName = 'Footer'

// ============ COMPOUND EXPORT ============

export const FooterComponent = Object.assign(Footer, {
  Links: FooterLinks,
  Copyright: FooterCopyright,
})

export {
  Footer,
  FooterLinks,
  FooterCopyright,
  footerVariants,
}
