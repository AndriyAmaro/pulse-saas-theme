'use client'

import * as React from 'react'
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  PictureInPicture,
  SkipForward,
  SkipBack,
  X,
  Check,
  ListVideo,
  Subtitles,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// VARIANTS
// ============================================================================

export const videoPlayerVariants = cva(
  [
    'relative w-full overflow-hidden rounded-lg',
    'bg-black group',
  ],
  {
    variants: {
      aspectRatio: {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '21:9': 'aspect-[21/9]',
      },
    },
    defaultVariants: {
      aspectRatio: '16:9',
    },
  }
)

export const videoControlsVariants = cva([
  'absolute bottom-0 left-0 right-0',
  'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
  'p-4 pt-16',
  'opacity-0 group-hover:opacity-100',
  'transition-opacity duration-300',
])

export const controlButtonVariants = cva(
  [
    'flex items-center justify-center',
    'text-white transition-all duration-150',
    'hover:scale-110 hover:text-primary-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
  ],
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export const progressBarVariants = cva([
  'relative w-full h-1 bg-white/30 rounded-full cursor-pointer',
  'group/progress',
])

export const playlistVariants = cva([
  'absolute right-0 top-0 bottom-0 w-80',
  'bg-black/90 backdrop-blur-sm',
  'border-l border-white/10',
  'overflow-y-auto',
  'transition-transform duration-300',
])

// ============================================================================
// TYPES
// ============================================================================

export interface VideoSource {
  src: string
  type?: string
  quality?: string
}

export interface VideoCaption {
  src: string
  srclang: string
  label: string
  default?: boolean
}

export interface PlaylistItem {
  id: string | number
  title: string
  thumbnail?: string
  duration?: string
  src: string | VideoSource[]
}

export interface VideoPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof videoPlayerVariants> {
  src: string | VideoSource[]
  poster?: string
  title?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  captions?: VideoCaption[]
  playlist?: PlaylistItem[]
  currentPlaylistIndex?: number
  onPlaylistChange?: (index: number) => void
  showPlaylist?: boolean
  onEnded?: () => void
}

type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface ProgressBarProps {
  currentTime: number
  duration: number
  buffered: number
  onSeek: (time: number) => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  buffered,
  onSeek,
}) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)

  const calculateTime = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!progressRef.current || !duration) return 0
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      return Math.max(0, Math.min(duration, pos * duration))
    },
    [duration]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    onSeek(calculateTime(e))
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    setHoverPosition(Math.max(0, Math.min(100, pos * 100)))
    setHoverTime(calculateTime(e))
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent) => {
      onSeek(calculateTime(e))
    }

    const handleUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging, calculateTime, onSeek])

  const progress = duration ? (currentTime / duration) * 100 : 0
  const bufferedProgress = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={progressRef}
      className={cn(progressBarVariants())}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverTime(null)}
    >
      {/* Buffered */}
      <div
        className="absolute left-0 top-0 h-full bg-white/40 rounded-full transition-all"
        style={{ width: `${bufferedProgress}%` }}
      />
      {/* Progress */}
      <div
        className="absolute left-0 top-0 h-full bg-primary-500 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
        style={{ left: `calc(${progress}% - 6px)` }}
      />
      {/* Hover preview */}
      {hoverTime !== null && (
        <div
          className="absolute -top-8 -translate-x-1/2 px-2 py-1 bg-black rounded text-xs text-white"
          style={{ left: `${hoverPosition}%` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  )
}

interface VolumeControlProps {
  volume: number
  muted: boolean
  onVolumeChange: (volume: number) => void
  onMuteToggle: () => void
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  muted,
  onVolumeChange,
  onMuteToggle,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={onMuteToggle}
        className={cn(controlButtonVariants({ size: 'sm' }))}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted || volume === 0 ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isHovered ? 'w-20 opacity-100' : 'w-0 opacity-0'
        )}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={muted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

interface SpeedSelectorProps {
  speed: PlaybackSpeed
  onSpeedChange: (speed: PlaybackSpeed) => void
}

const SpeedSelector: React.FC<SpeedSelectorProps> = ({ speed, onSpeedChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const speeds: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          controlButtonVariants({ size: 'sm' }),
          'text-xs font-medium px-2'
        )}
        aria-label="Playback speed"
      >
        {speed}x
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 py-1 bg-black/90 rounded-lg min-w-[80px]">
          {speeds.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onSpeedChange(s)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-3 py-1.5 text-sm text-left hover:bg-white/10 flex items-center justify-between',
                s === speed && 'text-primary-400'
              )}
            >
              <span>{s}x</span>
              {s === speed && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface PlaylistPanelProps {
  playlist: PlaylistItem[]
  currentIndex: number
  onSelect: (index: number) => void
  onClose: () => void
}

const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  playlist,
  currentIndex,
  onSelect,
  onClose,
}) => (
  <div className={cn(playlistVariants())}>
    <div className="flex items-center justify-between p-3 border-b border-white/10">
      <span className="text-white font-medium">Playlist</span>
      <button
        type="button"
        onClick={onClose}
        className={cn(controlButtonVariants({ size: 'sm' }))}
        aria-label="Close playlist"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className="p-2">
      {playlist.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(index)}
          className={cn(
            'w-full flex gap-3 p-2 rounded-lg text-left transition-colors',
            index === currentIndex
              ? 'bg-primary-500/20 text-primary-400'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          )}
        >
          <div className="relative w-24 aspect-video bg-white/10 rounded overflow-hidden flex-shrink-0">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {index === currentIndex && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.title}</p>
            {item.duration && (
              <p className="text-xs text-white/50 mt-1">{item.duration}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      className,
      src,
      poster,
      title,
      autoPlay = false,
      muted: initialMuted = false,
      loop = false,
      captions,
      playlist,
      currentPlaylistIndex = 0,
      onPlaylistChange,
      showPlaylist: initialShowPlaylist = false,
      aspectRatio,
      onEnded,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [buffered, setBuffered] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(initialMuted)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1)
    const [showControls, setShowControls] = useState(true)
    const [showPlaylist, setShowPlaylist] = useState(initialShowPlaylist)
    const [showCaptions, setShowCaptions] = useState(false)
    const [isPiP, setIsPiP] = useState(false)

    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Get current video source
    const getCurrentSource = (): string | undefined => {
      if (playlist && playlist.length > currentPlaylistIndex) {
        const playlistItem = playlist[currentPlaylistIndex]
        if (playlistItem) {
          return typeof playlistItem.src === 'string'
            ? playlistItem.src
            : (playlistItem.src as VideoSource[])[0]?.src
        }
      }
      if (typeof src === 'string') return src
      if (Array.isArray(src) && src.length > 0) return src[0]?.src
      return undefined
    }
    const currentSrc = getCurrentSource()

    // Play/Pause
    const togglePlay = useCallback(() => {
      if (!videoRef.current) return
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }, [isPlaying])

    // Seek
    const handleSeek = useCallback((time: number) => {
      if (!videoRef.current) return
      videoRef.current.currentTime = time
    }, [])

    // Skip forward/backward
    const skip = useCallback((seconds: number) => {
      if (!videoRef.current) return
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(duration, videoRef.current.currentTime + seconds)
      )
    }, [duration])

    // Volume
    const handleVolumeChange = useCallback((newVolume: number) => {
      if (!videoRef.current) return
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      if (newVolume > 0) setIsMuted(false)
    }, [])

    const toggleMute = useCallback(() => {
      if (!videoRef.current) return
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }, [isMuted])

    // Fullscreen
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

    // Picture-in-Picture
    const togglePiP = useCallback(async () => {
      if (!videoRef.current) return

      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
          setIsPiP(false)
        } else {
          await videoRef.current.requestPictureInPicture()
          setIsPiP(true)
        }
      } catch (err) {
        console.error('PiP error:', err)
      }
    }, [])

    // Playback speed
    const handleSpeedChange = useCallback((speed: PlaybackSpeed) => {
      if (!videoRef.current) return
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
    }, [])

    // Captions
    const toggleCaptions = useCallback(() => {
      if (!videoRef.current) return
      const tracks = videoRef.current.textTracks
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        if (track) {
          track.mode = showCaptions ? 'hidden' : 'showing'
        }
      }
      setShowCaptions(!showCaptions)
    }, [showCaptions])

    // Playlist navigation
    const handlePlaylistSelect = useCallback((index: number) => {
      onPlaylistChange?.(index)
    }, [onPlaylistChange])

    // Video events
    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleTimeUpdate = () => setCurrentTime(video.currentTime)
      const handleLoadedMetadata = () => setDuration(video.duration)
      const handleProgress = () => {
        if (video.buffered.length > 0) {
          setBuffered(video.buffered.end(video.buffered.length - 1))
        }
      }
      const handleEnded = () => {
        setIsPlaying(false)
        // Auto-play next in playlist
        if (playlist && currentPlaylistIndex < playlist.length - 1) {
          onPlaylistChange?.(currentPlaylistIndex + 1)
        } else {
          onEnded?.()
        }
      }

      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('progress', handleProgress)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('progress', handleProgress)
        video.removeEventListener('ended', handleEnded)
      }
    }, [playlist, currentPlaylistIndex, onPlaylistChange, onEnded])

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement) return

        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault()
            togglePlay()
            break
          case 'ArrowLeft':
            e.preventDefault()
            skip(-10)
            break
          case 'ArrowRight':
            e.preventDefault()
            skip(10)
            break
          case 'ArrowUp':
            e.preventDefault()
            handleVolumeChange(Math.min(1, volume + 0.1))
            break
          case 'ArrowDown':
            e.preventDefault()
            handleVolumeChange(Math.max(0, volume - 0.1))
            break
          case 'm':
            toggleMute()
            break
          case 'f':
            toggleFullscreen()
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [togglePlay, skip, handleVolumeChange, volume, toggleMute, toggleFullscreen])

    // Hide controls after inactivity
    const resetControlsTimeout = useCallback(() => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }, [isPlaying])

    return (
      <div
        ref={(node) => {
          ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(videoPlayerVariants({ aspectRatio }), className)}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        {...props}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          onClick={togglePlay}
        >
          {typeof currentSrc === 'string' ? (
            <source src={currentSrc} />
          ) : (
            Array.isArray(src) &&
            (src as VideoSource[]).map((source, i) => (
              <source key={i} src={source.src} type={source.type} />
            ))
          )}
          {captions?.map((caption, i) => (
            <track
              key={i}
              src={caption.src}
              kind="subtitles"
              srcLang={caption.srclang}
              label={caption.label}
              default={caption.default}
            />
          ))}
        </video>

        {/* Play button overlay (when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
            aria-label="Play video"
          >
            <div className="w-20 h-20 rounded-full bg-primary-500/90 flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </button>
        )}

        {/* Title overlay */}
        {title && showControls && (
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
            <h3 className="text-white font-medium text-lg">{title}</h3>
          </div>
        )}

        {/* Controls */}
        <div
          className={cn(
            videoControlsVariants(),
            showControls && 'opacity-100'
          )}
        >
          {/* Progress bar */}
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            buffered={buffered}
            onSeek={handleSeek}
          />

          {/* Control buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={cn(controlButtonVariants({ size: 'md' }))}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              {/* Skip buttons */}
              <button
                type="button"
                onClick={() => skip(-10)}
                className={cn(controlButtonVariants({ size: 'sm' }))}
                aria-label="Skip back 10 seconds"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => skip(10)}
                className={cn(controlButtonVariants({ size: 'sm' }))}
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Volume */}
              <VolumeControl
                volume={volume}
                muted={isMuted}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={toggleMute}
              />

              {/* Time */}
              <span className="text-white text-sm tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed selector */}
              <SpeedSelector
                speed={playbackSpeed}
                onSpeedChange={handleSpeedChange}
              />

              {/* Captions */}
              {captions && captions.length > 0 && (
                <button
                  type="button"
                  onClick={toggleCaptions}
                  className={cn(
                    controlButtonVariants({ size: 'sm' }),
                    showCaptions && 'text-primary-400'
                  )}
                  aria-label={showCaptions ? 'Hide captions' : 'Show captions'}
                >
                  <Subtitles className="w-5 h-5" />
                </button>
              )}

              {/* PiP */}
              {'pictureInPictureEnabled' in document && (
                <button
                  type="button"
                  onClick={togglePiP}
                  className={cn(
                    controlButtonVariants({ size: 'sm' }),
                    isPiP && 'text-primary-400'
                  )}
                  aria-label={isPiP ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'}
                >
                  <PictureInPicture className="w-5 h-5" />
                </button>
              )}

              {/* Playlist toggle */}
              {playlist && playlist.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={cn(
                    controlButtonVariants({ size: 'sm' }),
                    showPlaylist && 'text-primary-400'
                  )}
                  aria-label={showPlaylist ? 'Hide playlist' : 'Show playlist'}
                >
                  <ListVideo className="w-5 h-5" />
                </button>
              )}

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className={cn(controlButtonVariants({ size: 'sm' }))}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Playlist panel */}
        {playlist && playlist.length > 1 && showPlaylist && (
          <PlaylistPanel
            playlist={playlist}
            currentIndex={currentPlaylistIndex}
            onSelect={handlePlaylistSelect}
            onClose={() => setShowPlaylist(false)}
          />
        )}
      </div>
    )
  }
)

VideoPlayer.displayName = 'VideoPlayer'
