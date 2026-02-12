'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Upload, X, File, Image, FileText, FileArchive, Loader2 } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const fileUploadVariants = cva(
  [
    'relative flex flex-col items-center justify-center',
    'rounded-lg border-2 border-dashed',
    'transition-all duration-150',
    'cursor-pointer',
  ],
  {
    variants: {
      size: {
        sm: 'p-4 gap-2',
        md: 'p-6 gap-3',
        lg: 'p-8 gap-4',
      },
      state: {
        default: [
          'border-[var(--border-default)] bg-[var(--bg-subtle)]',
          'hover:border-primary-500 hover:bg-primary-500/5',
        ],
        dragging: [
          'border-primary-500 bg-primary-500/10',
          'ring-2 ring-primary-500/20',
        ],
        error: [
          'border-error-base bg-error-light/20',
          'hover:border-error-dark',
        ],
        disabled: [
          'border-[var(--border-default)] bg-[var(--bg-muted)]',
          'cursor-not-allowed opacity-50',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
)

const fileItemVariants = cva(
  [
    'flex items-center gap-3 rounded-lg border bg-[var(--bg-base)] p-3',
    'transition-all duration-150',
  ],
  {
    variants: {
      status: {
        pending: 'border-[var(--border-default)]',
        uploading: 'border-primary-500/50 bg-primary-500/5',
        success: 'border-success-base/50 bg-success-light/20',
        error: 'border-error-base/50 bg-error-light/20',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
)

export interface FileItem {
  id: string
  file: File
  progress?: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  accept?: string
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  files?: FileItem[]
  onChange?: (files: FileItem[]) => void
  onUpload?: (files: File[]) => Promise<void>
  onRemove?: (fileId: string) => void
  showFileList?: boolean
  label?: string
  description?: string
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image
  if (type.includes('pdf') || type.includes('document')) return FileText
  if (type.includes('zip') || type.includes('archive')) return FileArchive
  return File
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      size = 'md',
      accept,
      maxSize = 10 * 1024 * 1024,
      maxFiles = 5,
      multiple = true,
      disabled = false,
      files = [],
      onChange,
      onUpload,
      onRemove,
      showFileList = true,
      label = 'Upload files',
      description = 'Drag and drop files here, or click to select',
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const state = disabled ? 'disabled' : error ? 'error' : isDragging ? 'dragging' : 'default'

    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`
      }
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim())
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.replace('/*', '/'))
          }
          return file.type === type
        })
        if (!isAccepted) {
          return `File type not accepted`
        }
      }
      return null
    }

    const handleFiles = async (fileList: FileList | null) => {
      if (!fileList || disabled) return

      setError(null)
      const newFiles: FileItem[] = []
      const filesToUpload: File[] = []

      for (let i = 0; i < fileList.length; i++) {
        if (!multiple && files.length + newFiles.length >= 1) break
        if (files.length + newFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`)
          break
        }

        const file = fileList[i]
        if (!file) continue
        const validationError = validateFile(file)

        const fileItem: FileItem = {
          id: `${Date.now()}-${i}-${file.name}`,
          file,
          status: validationError ? 'error' : 'pending',
          error: validationError || undefined,
        }

        newFiles.push(fileItem)

        if (!validationError) {
          filesToUpload.push(file)
        }
      }

      const updatedFiles = [...files, ...newFiles]
      onChange?.(updatedFiles)

      if (onUpload && filesToUpload.length > 0) {
        const uploadingFiles = updatedFiles.map((f) =>
          filesToUpload.some((uf) => uf === f.file)
            ? { ...f, status: 'uploading' as const }
            : f
        )
        onChange?.(uploadingFiles)

        try {
          await onUpload(filesToUpload)
          const successFiles = uploadingFiles.map((f) =>
            f.status === 'uploading' ? { ...f, status: 'success' as const } : f
          )
          onChange?.(successFiles)
        } catch {
          const errorFiles = uploadingFiles.map((f) =>
            f.status === 'uploading'
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          )
          onChange?.(errorFiles)
        }
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    }

    const handleClick = () => {
      if (!disabled) inputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      e.target.value = ''
    }

    const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'
    const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

    return (
      <div ref={ref} className={cn('w-full space-y-3', className)} {...props}>
        <div
          className={cn(fileUploadVariants({ size, state }))}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick()
            }
          }}
          aria-label={label}
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            aria-hidden="true"
          />

          <div className={cn('rounded-full bg-primary-500/10 p-3 text-primary-500', size === 'sm' && 'p-2')}>
            <Upload className={iconSize} />
          </div>

          <div className="text-center">
            <p className={cn('font-medium text-[var(--text-primary)]', textSize)}>
              {label}
            </p>
            <p className={cn('text-[var(--text-muted)]', size === 'lg' ? 'text-sm' : 'text-xs')}>
              {description}
            </p>
          </div>

          {accept && (
            <p className="text-xs text-[var(--text-muted)]">
              Accepted: {accept}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-error-base" role="alert">
            {error}
          </p>
        )}

        {showFileList && files.length > 0 && (
          <div className="space-y-2">
            {files.map((fileItem) => {
              const FileIcon = getFileIcon(fileItem.file.type)

              return (
                <div key={fileItem.id} className={cn(fileItemVariants({ status: fileItem.status }))}>
                  <div className="flex-shrink-0 text-[var(--text-muted)]">
                    <FileIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {formatFileSize(fileItem.file.size)}
                      {fileItem.error && (
                        <span className="ml-2 text-error-base">{fileItem.error}</span>
                      )}
                    </p>

                    {fileItem.status === 'uploading' && fileItem.progress !== undefined && (
                      <div className="mt-1 h-1 w-full rounded-full bg-[var(--bg-muted)]">
                        <div
                          className="h-full rounded-full bg-primary-500 transition-all duration-300"
                          style={{ width: `${fileItem.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    {fileItem.status === 'uploading' ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove?.(fileItem.id)
                        }}
                        className={cn(
                          'rounded-sm p-1',
                          'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                          'hover:bg-[var(--bg-muted)]',
                          'transition-colors duration-150',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                        )}
                        aria-label={`Remove ${fileItem.file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'

export { FileUpload, fileUploadVariants, fileItemVariants }
