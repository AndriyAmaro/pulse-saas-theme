'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { ChevronRight, Play } from 'lucide-react'

// ============================================================================
// HERO SECTION - Landing Page Hero Component
// ============================================================================

const heroVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      variant: {
        centered: 'text-center',
        split: 'text-left',
        'video-background': 'text-center',
      },
      background: {
        solid: 'bg-white dark:bg-slate-900',
        gradient: 'bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
        pattern: 'bg-white dark:bg-slate-900',
        image: '',
      },
      size: {
        sm: 'py-16 md:py-20',
        md: 'py-20 md:py-28',
        lg: 'py-24 md:py-36',
        xl: 'py-32 md:py-48',
        fullscreen: 'min-h-screen flex items-center py-20',
      },
    },
    defaultVariants: {
      variant: 'centered',
      background: 'gradient',
      size: 'lg',
    },
  }
)

// Grid pattern background
const GridPattern = () => (
  <div className="absolute inset-0 -z-10">
    <svg className="absolute h-full w-full stroke-slate-200/50 dark:stroke-slate-700/30" aria-hidden="true">
      <defs>
        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M.5 40V.5H40" fill="none" strokeDasharray="0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-900" />
  </div>
)

// Radial gradient overlay
const RadialGlow = () => (
  <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
    <div
      className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-primary-200 to-accent-200 opacity-20 dark:from-primary-900 dark:to-accent-900 dark:opacity-10"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
)

// ============================================================================
// Types
// ============================================================================

interface HeroCTA {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  icon?: React.ReactNode
}

interface TrustedLogo {
  name: string
  logo: React.ReactNode | string
  href?: string
}

export interface HeroSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof heroVariants> {
  /** Badge shown above title (e.g., "🚀 New Feature") */
  badge?: string
  /** Main hero title */
  title: string | React.ReactNode
  /** Optional subtitle (larger than description) */
  subtitle?: string
  /** Description text below title */
  description?: string
  /** Primary call-to-action button */
  primaryCTA?: HeroCTA
  /** Secondary call-to-action button */
  secondaryCTA?: HeroCTA
  /** Hero image (for split variant) */
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  /** Video background URL (for video-background variant) */
  video?: string
  /** Background image URL (for image background) */
  backgroundImage?: string
  /** Trusted by section with logos */
  trustedBy?: {
    title?: string
    logos: TrustedLogo[]
  }
  /** Whether to show animated gradient text */
  gradientText?: boolean
  /** Disable animations */
  disableAnimations?: boolean
}

// ============================================================================
// Animated Text Component
// ============================================================================

const AnimatedTitle = React.forwardRef<
  HTMLHeadingElement,
  { children: React.ReactNode; gradient?: boolean; className?: string }
>(({ children, gradient, className }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
        'animate-in fade-in slide-in-from-bottom-4 duration-700',
        gradient && [
          'bg-gradient-to-r from-slate-900 via-primary-600 to-slate-900',
          'dark:from-white dark:via-primary-400 dark:to-white',
          'bg-clip-text text-transparent',
          'bg-[length:200%_100%] animate-gradient',
        ],
        !gradient && 'text-slate-900 dark:text-white',
        className
      )}
    >
      {children}
    </h1>
  )
})
AnimatedTitle.displayName = 'AnimatedTitle'

// ============================================================================
// Hero Content Component
// ============================================================================

const HeroContent = React.forwardRef<
  HTMLDivElement,
  {
    badge?: string
    title: string | React.ReactNode
    subtitle?: string
    description?: string
    primaryCTA?: HeroCTA
    secondaryCTA?: HeroCTA
    trustedBy?: HeroSectionProps['trustedBy']
    centered?: boolean
    gradientText?: boolean
    disableAnimations?: boolean
  }
>(({
  badge,
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  trustedBy,
  centered,
  gradientText,
  disableAnimations,
}, ref) => {
  const animationClass = disableAnimations ? '' : 'animate-in fade-in slide-in-from-bottom-4 duration-700'

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-6',
        centered && 'items-center'
      )}
    >
      {/* Badge */}
      {badge && (
        <Badge
          variant="default"
          className={cn(
            'w-fit gap-1.5 px-4 py-1.5 text-sm font-medium',
            'bg-primary-50 text-primary-700 hover:bg-primary-100',
            'dark:bg-primary-950 dark:text-primary-300 dark:hover:bg-primary-900',
            'border border-primary-200 dark:border-primary-800',
            disableAnimations ? '' : 'animate-in fade-in duration-500'
          )}
        >
          {badge}
        </Badge>
      )}

      {/* Title */}
      <AnimatedTitle gradient={gradientText}>
        {title}
      </AnimatedTitle>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'text-xl font-medium text-primary-600 dark:text-primary-400 sm:text-2xl',
            animationClass,
            '[animation-delay:100ms]'
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            'max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl',
            centered && 'text-center',
            animationClass,
            '[animation-delay:200ms]'
          )}
        >
          {description}
        </p>
      )}

      {/* CTAs */}
      {(primaryCTA || secondaryCTA) && (
        <div
          className={cn(
            'flex flex-wrap gap-4 pt-2',
            centered && 'justify-center',
            animationClass,
            '[animation-delay:300ms]'
          )}
        >
          {primaryCTA && (
            <Button
              size="lg"
              variant={primaryCTA.variant || 'primary'}
              onClick={primaryCTA.onClick}
              className="group gap-2 px-8"
            >
              {primaryCTA.label}
              {primaryCTA.icon || (
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </Button>
          )}
          {secondaryCTA && (
            <Button
              size="lg"
              variant={secondaryCTA.variant || 'outline'}
              onClick={secondaryCTA.onClick}
              className="gap-2 px-8"
            >
              {secondaryCTA.icon}
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      )}

      {/* Trusted By */}
      {trustedBy && trustedBy.logos.length > 0 && (
        <div
          className={cn(
            'mt-8 flex flex-col gap-4 pt-8 border-t border-slate-200 dark:border-slate-700',
            centered && 'items-center',
            animationClass,
            '[animation-delay:400ms]'
          )}
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {trustedBy.title || 'Trusted by leading companies'}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {trustedBy.logos.map((logo, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-center',
                  'grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100'
                )}
              >
                {typeof logo.logo === 'string' ? (
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <div className="h-8 flex items-center">{logo.logo}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})
HeroContent.displayName = 'HeroContent'

// ============================================================================
// Hero Image Component
// ============================================================================

const HeroImage = React.forwardRef<
  HTMLDivElement,
  {
    image: HeroSectionProps['image']
    disableAnimations?: boolean
  }
>(({ image, disableAnimations }, ref) => {
  if (!image) return null

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        disableAnimations ? '' : 'animate-in fade-in slide-in-from-right-8 duration-1000 [animation-delay:200ms]'
      )}
    >
      {/* Decorative elements */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-2xl dark:from-primary-500/10 dark:to-accent-500/10" />

      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl dark:border-slate-700/50 dark:bg-slate-800">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  )
})
HeroImage.displayName = 'HeroImage'

// ============================================================================
// Video Background Component
// ============================================================================

const VideoBackground = ({ video }: { video: string }) => (
  <div className="absolute inset-0 -z-20 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
    >
      <source src={video} type="video/mp4" />
    </video>
    {/* Overlay */}
    <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80" />
  </div>
)

// ============================================================================
// Main Hero Section Component
// ============================================================================

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      variant = 'centered',
      background = 'gradient',
      size = 'lg',
      badge,
      title,
      subtitle,
      description,
      primaryCTA,
      secondaryCTA,
      image,
      video,
      backgroundImage,
      trustedBy,
      gradientText = true,
      disableAnimations = false,
      ...props
    },
    ref
  ) => {
    const isVideoBackground = variant === 'video-background' && video
    const isSplit = variant === 'split'
    const isCentered = variant === 'centered'

    return (
      <section
        ref={ref}
        className={cn(
          heroVariants({ variant, background, size }),
          isVideoBackground && 'text-white',
          className
        )}
        style={
          background === 'image' && backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
        {...props}
      >
        {/* Background decorations */}
        {background === 'pattern' && <GridPattern />}
        {(background === 'gradient' || background === 'solid') && <RadialGlow />}
        {isVideoBackground && <VideoBackground video={video} />}

        {/* Background image overlay */}
        {background === 'image' && backgroundImage && (
          <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70" />
        )}

        {/* Content container */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isSplit ? (
            // Split layout
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <HeroContent
                badge={badge}
                title={title}
                subtitle={subtitle}
                description={description}
                primaryCTA={primaryCTA}
                secondaryCTA={secondaryCTA}
                trustedBy={trustedBy}
                centered={false}
                gradientText={gradientText}
                disableAnimations={disableAnimations}
              />
              <HeroImage image={image} disableAnimations={disableAnimations} />
            </div>
          ) : (
            // Centered layout
            <div className="flex flex-col items-center">
              <HeroContent
                badge={badge}
                title={title}
                subtitle={subtitle}
                description={description}
                primaryCTA={primaryCTA}
                secondaryCTA={secondaryCTA}
                trustedBy={trustedBy}
                centered={true}
                gradientText={gradientText}
                disableAnimations={disableAnimations}
              />

              {/* Optional centered image below */}
              {image && (
                <div
                  className={cn(
                    'mt-16 w-full max-w-5xl',
                    disableAnimations ? '' : 'animate-in fade-in slide-in-from-bottom-8 duration-1000 [animation-delay:500ms]'
                  )}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-2xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl dark:border-slate-700/50 dark:bg-slate-800">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    )
  }
)
HeroSection.displayName = 'HeroSection'

// ============================================================================
// Exports
// ============================================================================

export { HeroSection, heroVariants }
