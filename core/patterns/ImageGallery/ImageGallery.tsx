'use client'

import * as React from 'react'
import { forwardRef, useState, useCallback, useEffect, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as Dialog from '@radix-ui/react-dialog'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  Minimize2,
  Loader2,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// VARIANTS
// ============================================================================

export const imageGalleryVariants = cva(
  'grid gap-4',
  {
    variants: {
      columns: {
        2: 'grid-cols-2',
        3: 'grid-cols-2 sm:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
)

export const thumbnailVariants = cva(
  [
    'relative aspect-square overflow-hidden rounded-lg cursor-pointer',
    'ring-1 ring-secondary-200 dark:ring-secondary-700',
    'transition-all duration-200',
    'hover:ring-2 hover:ring-primary-500 hover:shadow-lg',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  ],
  {
    variants: {
      loading: {
        true: 'animate-pulse bg-secondary-200 dark:bg-secondary-700',
        false: '',
      },
    },
    defaultVariants: {
      loading: false,
    },
  }
)

export const lightboxVariants = cva([
  'fixed inset-0 z-50',
  'flex items-center justify-center',
  'bg-black/95 backdrop-blur-sm',
])

export const lightboxImageVariants = cva([
  'max-h-[80vh] max-w-[90vw] object-contain',
  'transition-transform duration-200',
  'select-none',
])

export const lightboxControlsVariants = cva([
  'absolute flex items-center justify-center',
  'bg-black/50 text-white',
  'transition-all duration-200',
  'hover:bg-black/70',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  'disabled:opacity-50 disabled:cursor-not-allowed',
])

export const thumbnailStripVariants = cva([
  'absolute bottom-4 left-1/2 -translate-x-1/2',
  'flex gap-2 p-2 rounded-lg',
  'bg-black/50 backdrop-blur-sm',
  'max-w-[90vw] overflow-x-auto',
])

// ============================================================================
// TYPES
// ============================================================================

export interface GalleryImage {
  id: string | number
  src: string
  alt: string
  thumbnail?: string
  title?: string
  description?: string
}

export interface ImageGalleryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof imageGalleryVariants> {
  images: GalleryImage[]
  showThumbnailStrip?: boolean
  enableDownload?: boolean
  enableFullscreen?: boolean
  enableZoom?: boolean
  initialIndex?: number
  onImageChange?: (index: number) => void
}

// ============================================================================
// SKELETON
// ============================================================================

const ImageSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'aspect-square rounded-lg animate-pulse bg-secondary-200 dark:bg-secondary-700',
      className
    )}
    {...props}
  />
))
ImageSkeleton.displayName = 'ImageSkeleton'

// ============================================================================
// THUMBNAIL
// ============================================================================

interface ThumbnailProps {
  image: GalleryImage
  onClick: () => void
  index: number
}

const Thumbnail = React.forwardRef<HTMLButtonElement, ThumbnailProps>(
  ({ image, onClick, index }, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    return (
      <button
        ref={ref}
        type="button"
        className={cn(thumbnailVariants({ loading: isLoading }))}
        onClick={onClick}
        aria-label={`View image ${index + 1}: ${image.alt}`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-secondary-400 animate-spin" />
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary-100 dark:bg-secondary-800">
            <span className="text-sm text-secondary-500">Failed to load</span>
          </div>
        ) : (
          <img
            src={image.thumbnail || image.src}
            alt={image.alt}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            loading="lazy"
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200" />
      </button>
    )
  }
)
Thumbnail.displayName = 'Thumbnail'

// ============================================================================
// LIGHTBOX
// ============================================================================

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onIndexChange: (index: number) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  showThumbnailStrip?: boolean
  enableDownload?: boolean
  enableFullscreen?: boolean
  enableZoom?: boolean
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onIndexChange,
  open,
  onOpenChange,
  showThumbnailStrip = true,
  enableDownload = true,
  enableFullscreen = true,
  enableZoom = true,
}) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentImage = images[currentIndex]
  const totalImages = images.length

  const goToPrevious = useCallback(() => {
    setIsZoomed(false)
    setIsLoading(true)
    onIndexChange((currentIndex - 1 + totalImages) % totalImages)
  }, [currentIndex, totalImages, onIndexChange])

  const goToNext = useCallback(() => {
    setIsZoomed(false)
    setIsLoading(true)
    onIndexChange((currentIndex + 1) % totalImages)
  }, [currentIndex, totalImages, onIndexChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'Escape':
          onOpenChange(false)
          break
        case '+':
        case '=':
          if (enableZoom) setIsZoomed(true)
          break
        case '-':
          if (enableZoom) setIsZoomed(false)
          break
      }
    },
    [open, goToPrevious, goToNext, onOpenChange, enableZoom]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }, [])

  const handleDownload = useCallback(async () => {
    if (!currentImage) return
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = currentImage.title || `image-${currentIndex + 1}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      // Fallback: open in new tab
      window.open(currentImage.src, '_blank')
    }
  }, [currentImage, currentIndex])

  // Handle swipe on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    const touch = e.targetTouches.item(0)
    if (touch) setTouchStart(touch.clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches.item(0)
    if (touch) setTouchEnd(touch.clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrevious()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 animate-in fade-in duration-200" />
        <Dialog.Content
          ref={containerRef}
          className={cn(lightboxVariants())}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Dialog.Title className="sr-only">
            Image {currentIndex + 1} of {totalImages}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {currentImage?.alt}
          </Dialog.Description>

          {/* Close button */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              lightboxControlsVariants(),
              'top-4 right-4 w-10 h-10 rounded-full'
            )}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm font-medium">
            {currentIndex + 1} of {totalImages}
          </div>

          {/* Top right controls */}
          <div className="absolute top-4 right-16 flex gap-2">
            {enableZoom && (
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className={cn(
                  lightboxControlsVariants(),
                  'w-10 h-10 rounded-full'
                )}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5" />
                ) : (
                  <ZoomIn className="w-5 h-5" />
                )}
              </button>
            )}
            {enableFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className={cn(
                  lightboxControlsVariants(),
                  'w-10 h-10 rounded-full'
                )}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
            )}
            {enableDownload && (
              <button
                type="button"
                onClick={handleDownload}
                className={cn(
                  lightboxControlsVariants(),
                  'w-10 h-10 rounded-full'
                )}
                aria-label="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation arrows */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className={cn(
                  lightboxControlsVariants(),
                  'left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full'
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className={cn(
                  lightboxControlsVariants(),
                  'right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full'
                )}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main image */}
          <div className="relative flex items-center justify-center w-full h-full p-16">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            )}
            <img
              src={currentImage?.src}
              alt={currentImage?.alt}
              className={cn(
                lightboxImageVariants(),
                isZoomed && 'scale-150 cursor-zoom-out',
                !isZoomed && 'cursor-zoom-in',
                isLoading && 'opacity-0'
              )}
              onClick={() => enableZoom && setIsZoomed(!isZoomed)}
              onLoad={() => setIsLoading(false)}
              draggable={false}
            />
          </div>

          {/* Image info */}
          {(currentImage?.title || currentImage?.description) && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-2xl text-center px-4">
              {currentImage.title && (
                <h3 className="text-white font-semibold text-lg mb-1">
                  {currentImage.title}
                </h3>
              )}
              {currentImage.description && (
                <p className="text-white/70 text-sm">
                  {currentImage.description}
                </p>
              )}
            </div>
          )}

          {/* Thumbnail strip */}
          {showThumbnailStrip && totalImages > 1 && (
            <div className={cn(thumbnailStripVariants())}>
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setIsLoading(true)
                    onIndexChange(index)
                  }}
                  className={cn(
                    'w-12 h-12 rounded overflow-hidden flex-shrink-0',
                    'ring-2 transition-all duration-200',
                    index === currentIndex
                      ? 'ring-primary-500 opacity-100'
                      : 'ring-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      className,
      images,
      columns,
      showThumbnailStrip = true,
      enableDownload = true,
      enableFullscreen = true,
      enableZoom = true,
      initialIndex = 0,
      onImageChange,
      ...props
    },
    ref
  ) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const handleThumbnailClick = (index: number) => {
      setCurrentIndex(index)
      setLightboxOpen(true)
    }

    const handleIndexChange = (index: number) => {
      setCurrentIndex(index)
      onImageChange?.(index)
    }

    if (images.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center p-8 rounded-lg',
            'bg-secondary-100 dark:bg-secondary-800',
            'text-secondary-500 dark:text-secondary-400'
          )}
          {...props}
        >
          No images to display
        </div>
      )
    }

    return (
      <>
        <div
          ref={ref}
          className={cn(imageGalleryVariants({ columns }), className)}
          role="grid"
          aria-label="Image gallery"
          {...props}
        >
          {images.map((image, index) => (
            <Thumbnail
              key={image.id}
              image={image}
              index={index}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>

        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          showThumbnailStrip={showThumbnailStrip}
          enableDownload={enableDownload}
          enableFullscreen={enableFullscreen}
          enableZoom={enableZoom}
        />
      </>
    )
  }
)

ImageGallery.displayName = 'ImageGallery'

// ============================================================================
// LOADING SKELETON
// ============================================================================

export interface ImageGallerySkeletonProps
  extends VariantProps<typeof imageGalleryVariants> {
  count?: number
  className?: string
}

export const ImageGallerySkeleton: React.FC<ImageGallerySkeletonProps> = ({
  count = 6,
  columns,
  className,
}) => (
  <div className={cn(imageGalleryVariants({ columns }), className)}>
    {Array.from({ length: count }).map((_, i) => (
      <ImageSkeleton key={i} />
    ))}
  </div>
)

ImageGallerySkeleton.displayName = 'ImageGallerySkeleton'
