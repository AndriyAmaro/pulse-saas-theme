'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Checkbox } from '@core/primitives/Checkbox'
import { Button } from '@core/primitives/Button'
import {
  Folder,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileArchive,
  FileType2,
  Upload,
  FolderPlus,
  List,
  Grid3X3,
  ChevronRight,
  Home,
  MoreVertical,
  Download,
  Trash2,
  Pencil,
  Copy,
  Move,
  Share,
  SortAsc,
  SortDesc,
  type LucideIcon,
} from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

// ============================================================================
// CVA Variants
// ============================================================================

const fileManagerVariants = cva(
  'flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)]',
  {
    variants: {
      size: {
        sm: 'min-h-[400px]',
        md: 'min-h-[500px]',
        lg: 'min-h-[600px]',
        full: 'min-h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const fileManagerToolbarVariants = cva(
  'flex items-center justify-between gap-4 border-b border-[var(--border-default)] px-4 py-3',
  {
    variants: {
      variant: {
        default: '',
        compact: 'py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const fileManagerBreadcrumbsVariants = cva(
  'flex items-center gap-1 border-b border-[var(--border-default)] px-4 py-2 text-sm',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const fileListItemVariants = cva(
  'group flex cursor-pointer items-center gap-4 border-b border-[var(--border-default)] px-4 py-3 transition-colors last:border-b-0 hover:bg-[var(--bg-subtle)]',
  {
    variants: {
      selected: {
        true: 'bg-[var(--primary-50)] hover:bg-[var(--primary-100)] dark:bg-[var(--primary-500)]/10 dark:hover:bg-[var(--primary-500)]/20',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

const fileGridItemVariants = cva(
  'group flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 transition-all hover:border-[var(--primary-500)] hover:shadow-md',
  {
    variants: {
      selected: {
        true: 'border-[var(--primary-500)] bg-[var(--primary-50)] ring-2 ring-[var(--primary-500)]/20 dark:bg-[var(--primary-500)]/10',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export type FileType =
  | 'folder'
  | 'file'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'pdf'
  | 'code'
  | 'archive'

export type FileSortField = 'name' | 'size' | 'date' | 'type'
export type FileSortDirection = 'asc' | 'desc'
export type FileViewMode = 'list' | 'grid'

export interface FileItem {
  id: string
  name: string
  type: FileType
  size?: number
  modifiedAt: Date | string
  path?: string
  extension?: string
  thumbnail?: string
}

export interface BreadcrumbItem {
  id: string
  name: string
  path: string
}

export interface FileManagerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileManagerVariants> {
  files: FileItem[]
  selectedFiles?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  onFileOpen?: (file: FileItem) => void
  onFileAction?: (action: string, files: FileItem[]) => void
  onUpload?: () => void
  onNewFolder?: () => void
  breadcrumbs?: BreadcrumbItem[]
  onNavigate?: (path: string) => void
  viewMode?: FileViewMode
  onViewModeChange?: (mode: FileViewMode) => void
  sortField?: FileSortField
  sortDirection?: FileSortDirection
  onSortChange?: (field: FileSortField, direction: FileSortDirection) => void
  selectable?: boolean
}

// ============================================================================
// Helpers
// ============================================================================

const FILE_ICONS: Record<FileType, LucideIcon> = {
  folder: Folder,
  file: File,
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  document: FileText,
  pdf: FileType2,
  code: FileCode,
  archive: FileArchive,
}

const FILE_COLORS: Record<FileType, string> = {
  folder: 'text-[var(--accent-500)]',
  file: 'text-[var(--text-muted)]',
  image: 'text-success',
  video: 'text-error',
  audio: 'text-[var(--primary-500)]',
  document: 'text-info',
  pdf: 'text-error',
  code: 'text-[var(--primary-500)]',
  archive: 'text-warning',
}

function formatFileSize(bytes?: number): string {
  if (bytes === undefined) return '-'
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ============================================================================
// Sub Components
// ============================================================================

// Context Menu
interface FileContextMenuProps {
  children: React.ReactNode
  file: FileItem
  onAction?: (action: string, file: FileItem) => void
}

const FileContextMenu: React.FC<FileContextMenuProps> = ({
  children,
  file,
  onAction,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[180px] rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-1 shadow-lg"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => onAction?.('open', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <File size={16} />
            Open
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => onAction?.('download', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <Download size={16} />
            Download
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-[var(--border-default)]" />
          <DropdownMenu.Item
            onClick={() => onAction?.('rename', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <Pencil size={16} />
            Rename
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => onAction?.('copy', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <Copy size={16} />
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => onAction?.('move', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <Move size={16} />
            Move
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => onAction?.('share', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-primary)] outline-none hover:bg-[var(--bg-muted)]"
          >
            <Share size={16} />
            Share
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-[var(--border-default)]" />
          <DropdownMenu.Item
            onClick={() => onAction?.('delete', file)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-error outline-none hover:bg-error-light"
          >
            <Trash2 size={16} />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

// File List View
interface FileListProps {
  files: FileItem[]
  selectedFiles: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  onFileOpen?: (file: FileItem) => void
  onFileAction?: (action: string, files: FileItem[]) => void
  selectable?: boolean
  sortField?: FileSortField
  sortDirection?: FileSortDirection
  onSortChange?: (field: FileSortField) => void
}

const FileList: React.FC<FileListProps> = ({
  files,
  selectedFiles,
  onSelectionChange,
  onFileOpen,
  onFileAction,
  selectable = true,
  sortField,
  sortDirection,
  onSortChange,
}) => {
  const toggleSelection = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!selectable) return
    const isSelected = selectedFiles.includes(id)
    if (isSelected) {
      onSelectionChange?.(selectedFiles.filter((f) => f !== id))
    } else {
      onSelectionChange?.([...selectedFiles, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(files.map((f) => f.id))
    }
  }

  const SortIcon = sortDirection === 'asc' ? SortAsc : SortDesc

  const renderSortHeader = (field: FileSortField, label: string, className?: string) => (
    <button
      onClick={() => onSortChange?.(field)}
      className={cn(
        'flex items-center gap-1 text-xs font-medium uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)]',
        className
      )}
    >
      {label}
      {sortField === field && <SortIcon size={14} />}
    </button>
  )

  return (
    <div className="flex-1 overflow-auto">
      {/* Table Header */}
      <div className="sticky top-0 flex items-center gap-4 border-b border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-2">
        {selectable && (
          <Checkbox
            checked={selectedFiles.length === files.length && files.length > 0}
            onCheckedChange={handleSelectAll}
            aria-label="Select all files"
          />
        )}
        <div className="flex-1">{renderSortHeader('name', 'Name')}</div>
        <div className="w-24 text-right">{renderSortHeader('size', 'Size')}</div>
        <div className="w-32">{renderSortHeader('date', 'Modified')}</div>
        <div className="w-8" />
      </div>

      {/* File List */}
      {files.map((file) => {
        const Icon = FILE_ICONS[file.type]
        const iconColor = FILE_COLORS[file.type]
        const isSelected = selectedFiles.includes(file.id)

        return (
          <div
            key={file.id}
            className={cn(fileListItemVariants({ selected: isSelected }))}
            onClick={() => onFileOpen?.(file)}
            onDoubleClick={() => onFileOpen?.(file)}
          >
            {selectable && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => {}}
                onClick={(e) => toggleSelection(file.id, e)}
                aria-label={`Select ${file.name}`}
              />
            )}
            <Icon size={20} className={iconColor} />
            <div className="flex-1 truncate">
              <span className="font-medium text-[var(--text-primary)]">
                {file.name}
              </span>
            </div>
            <div className="w-24 text-right text-sm text-[var(--text-muted)]">
              {formatFileSize(file.size)}
            </div>
            <div className="w-32 text-sm text-[var(--text-muted)]">
              {formatDate(file.modifiedAt)}
            </div>
            <FileContextMenu
              file={file}
              onAction={(action) => onFileAction?.(action, [file])}
            >
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-[var(--text-muted)] opacity-0 transition-opacity hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)] group-hover:opacity-100"
                aria-label="File actions"
              >
                <MoreVertical size={16} />
              </button>
            </FileContextMenu>
          </div>
        )
      })}
    </div>
  )
}

// File Grid View
interface FileGridProps {
  files: FileItem[]
  selectedFiles: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  onFileOpen?: (file: FileItem) => void
  onFileAction?: (action: string, files: FileItem[]) => void
  selectable?: boolean
}

const FileGrid: React.FC<FileGridProps> = ({
  files,
  selectedFiles,
  onSelectionChange,
  onFileOpen,
  onFileAction,
  selectable = true,
}) => {
  const toggleSelection = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!selectable) return
    const isSelected = selectedFiles.includes(id)
    if (isSelected) {
      onSelectionChange?.(selectedFiles.filter((f) => f !== id))
    } else {
      onSelectionChange?.([...selectedFiles, id])
    }
  }

  return (
    <div className="grid flex-1 grid-cols-2 gap-4 overflow-auto p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {files.map((file) => {
        const Icon = FILE_ICONS[file.type]
        const iconColor = FILE_COLORS[file.type]
        const isSelected = selectedFiles.includes(file.id)

        return (
          <div
            key={file.id}
            className={cn(fileGridItemVariants({ selected: isSelected }))}
            onClick={() => onFileOpen?.(file)}
            onDoubleClick={() => onFileOpen?.(file)}
          >
            {/* Selection checkbox */}
            {selectable && (
              <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => {}}
                  onClick={(e) => toggleSelection(file.id, e)}
                  aria-label={`Select ${file.name}`}
                />
              </div>
            )}

            {/* Icon or Thumbnail */}
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--bg-muted)]">
              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <Icon size={32} className={iconColor} />
              )}
            </div>

            {/* File Name */}
            <span className="max-w-full truncate text-center text-sm font-medium text-[var(--text-primary)]">
              {file.name}
            </span>

            {/* File Size */}
            <span className="text-xs text-[var(--text-muted)]">
              {formatFileSize(file.size)}
            </span>

            {/* Context Menu */}
            <FileContextMenu
              file={file}
              onAction={(action) => onFileAction?.(action, [file])}
            >
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute right-2 bottom-2 rounded p-1 text-[var(--text-muted)] opacity-0 transition-opacity hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)] group-hover:opacity-100"
                aria-label="File actions"
              >
                <MoreVertical size={16} />
              </button>
            </FileContextMenu>
          </div>
        )
      })}
    </div>
  )
}

// ============================================================================
// Main FileManager Component
// ============================================================================

const FileManager = React.forwardRef<HTMLDivElement, FileManagerProps>(
  (
    {
      className,
      size,
      files,
      selectedFiles = [],
      onSelectionChange,
      onFileOpen,
      onFileAction,
      onUpload,
      onNewFolder,
      breadcrumbs = [],
      onNavigate,
      viewMode = 'list',
      onViewModeChange,
      sortField = 'name',
      sortDirection = 'asc',
      onSortChange,
      selectable = true,
      ...props
    },
    ref
  ) => {
    const handleSortChange = (field: FileSortField) => {
      if (field === sortField) {
        onSortChange?.(field, sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        onSortChange?.(field, 'asc')
      }
    }

    const selectedCount = selectedFiles.length

    return (
      <div
        ref={ref}
        className={cn(fileManagerVariants({ size }), className)}
        role="region"
        aria-label="File manager"
        {...props}
      >
        {/* Toolbar */}
        <div className={cn(fileManagerToolbarVariants())}>
          <div className="flex items-center gap-2">
            {onUpload && (
              <Button size="sm" onClick={onUpload}>
                <Upload size={16} className="mr-2" />
                Upload
              </Button>
            )}
            {onNewFolder && (
              <Button size="sm" variant="outline" onClick={onNewFolder}>
                <FolderPlus size={16} className="mr-2" />
                New Folder
              </Button>
            )}
            {selectedCount > 0 && (
              <span className="ml-4 text-sm text-[var(--text-muted)]">
                {selectedCount} selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            {onViewModeChange && (
              <div className="flex rounded-lg border border-[var(--border-default)] p-1">
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    'rounded-md p-1.5 transition-colors',
                    viewMode === 'list'
                      ? 'bg-[var(--bg-muted)] text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  )}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    'rounded-md p-1.5 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-[var(--bg-muted)] text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  )}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid3X3 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className={cn(fileManagerBreadcrumbsVariants())} aria-label="Breadcrumbs">
            <button
              onClick={() => onNavigate?.('/')}
              className="text-[var(--text-muted)] hover:text-[var(--primary-500)]"
              aria-label="Home"
            >
              <Home size={16} />
            </button>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight size={14} className="text-[var(--text-muted)]" />
                <button
                  onClick={() => onNavigate?.(crumb.path)}
                  className={cn(
                    'hover:text-[var(--primary-500)]',
                    index === breadcrumbs.length - 1
                      ? 'font-medium text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* File List/Grid */}
        {viewMode === 'list' ? (
          <FileList
            files={files}
            selectedFiles={selectedFiles}
            onSelectionChange={onSelectionChange}
            onFileOpen={onFileOpen}
            onFileAction={onFileAction}
            selectable={selectable}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        ) : (
          <FileGrid
            files={files}
            selectedFiles={selectedFiles}
            onSelectionChange={onSelectionChange}
            onFileOpen={onFileOpen}
            onFileAction={onFileAction}
            selectable={selectable}
          />
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Folder size={48} className="mb-4 text-[var(--text-muted)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              No files
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Upload files or create a new folder to get started
            </p>
          </div>
        )}
      </div>
    )
  }
)

FileManager.displayName = 'FileManager'

export {
  FileManager,
  FileList,
  FileGrid,
  fileManagerVariants,
  fileManagerToolbarVariants,
  fileManagerBreadcrumbsVariants,
  fileListItemVariants,
  fileGridItemVariants,
}
