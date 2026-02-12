'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Pagination } from '@core/patterns/Pagination'
import { Skeleton } from '@core/primitives/Skeleton'
import { EmptyState } from '@core/patterns/EmptyState'
import { Checkbox } from '@core/primitives/Checkbox'
import { Input } from '@core/primitives/Input'
import { DropdownMenu } from '@core/organisms/DropdownMenu'

// ============ TYPES ============

export type SortDirection = 'asc' | 'desc' | null

export interface SortState<TData> {
  column: keyof TData | null
  direction: SortDirection
}

export interface ColumnDef<TData, TValue = unknown> {
  id: keyof TData | string
  accessorKey?: keyof TData
  accessorFn?: (row: TData) => TValue
  header: string | ((props: { column: ColumnDef<TData, TValue>; sortState?: SortState<TData> }) => React.ReactNode)
  cell?: (props: { row: TData; value: TValue; rowIndex: number }) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  filterFn?: (row: TData, filterValue: string) => boolean
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
  enableHiding?: boolean
  meta?: Record<string, unknown>
}

export interface RowAction<TData> {
  label: string
  icon?: React.ReactNode
  onClick: (row: TData, rowIndex: number) => void
  destructive?: boolean
  disabled?: boolean | ((row: TData) => boolean)
  hidden?: boolean | ((row: TData) => boolean)
}

export interface DataTableProps<TData> extends VariantProps<typeof tableVariants> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  // Sorting
  sortable?: boolean
  defaultSort?: SortState<TData>
  onSortChange?: (sort: SortState<TData>) => void
  manualSorting?: boolean
  // Filtering
  filterable?: boolean
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  filterPlaceholder?: string
  // Pagination
  pagination?: boolean
  pageSize?: number
  currentPage?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  manualPagination?: boolean
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  // Selection
  selectable?: boolean
  selectionMode?: 'single' | 'multiple'
  selectedRows?: TData[]
  onSelectionChange?: (rows: TData[]) => void
  getRowId?: (row: TData) => string | number
  // Row Actions
  rowActions?: RowAction<TData>[]
  // States
  loading?: boolean
  loadingRows?: number
  emptyState?: {
    title: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
  }
  // Responsive
  responsiveMode?: 'scroll' | 'cards' | 'auto'
  mobileBreakpoint?: number
  cardRenderer?: (row: TData, rowIndex: number) => React.ReactNode
  // Styling
  className?: string
  tableClassName?: string
  headerClassName?: string
  bodyClassName?: string
  rowClassName?: string | ((row: TData, rowIndex: number) => string)
  cellClassName?: string
  stickyHeader?: boolean
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  compact?: boolean
}

// ============ VARIANTS ============

const tableVariants = cva(
  'w-full text-sm',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const tableCellVariants = cva(
  '[color:var(--text-secondary)]',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'left',
    },
  }
)

// ============ HELPER FUNCTIONS ============

function getNestedValue<TData>(obj: TData, key: keyof TData | string): unknown {
  const keys = String(key).split('.')
  let result: unknown = obj
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return undefined
    }
  }
  return result
}

function defaultSort<TData>(a: TData, b: TData, column: keyof TData | string, direction: SortDirection): number {
  if (!direction) return 0

  const aVal = getNestedValue(a, column)
  const bVal = getNestedValue(b, column)

  if (aVal === bVal) return 0
  if (aVal === null || aVal === undefined) return direction === 'asc' ? 1 : -1
  if (bVal === null || bVal === undefined) return direction === 'asc' ? -1 : 1

  const comparison = aVal < bVal ? -1 : 1
  return direction === 'asc' ? comparison : -comparison
}

function defaultFilter<TData>(row: TData, filterValue: string, columns: ColumnDef<TData, unknown>[]): boolean {
  if (!filterValue) return true

  const searchLower = filterValue.toLowerCase()

  return columns.some((col) => {
    if (col.filterable === false) return false

    const value = col.accessorFn
      ? col.accessorFn(row)
      : col.accessorKey
        ? getNestedValue(row, col.accessorKey)
        : getNestedValue(row, col.id as keyof TData)

    if (value === null || value === undefined) return false

    return String(value).toLowerCase().includes(searchLower)
  })
}

// ============ SUB-COMPONENTS ============

interface SortIndicatorProps {
  direction: SortDirection
  className?: string
}

function SortIndicator({ direction, className }: SortIndicatorProps) {
  if (!direction) {
    return <ChevronsUpDown className={cn('h-4 w-4 text-[var(--text-muted)]', className)} />
  }

  return direction === 'asc'
    ? <ChevronUp className={cn('h-4 w-4 text-primary-500', className)} />
    : <ChevronDown className={cn('h-4 w-4 text-primary-500', className)} />
}

// ============ LOADING SKELETON ============

interface TableSkeletonProps {
  rows: number
  columns: number
  size?: 'sm' | 'md' | 'lg'
  hasSelection?: boolean
  hasActions?: boolean
}

function TableSkeleton({ rows, columns, size = 'md', hasSelection, hasActions }: TableSkeletonProps) {
  const totalCols = columns + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b border-[var(--border-default)]">
          {hasSelection && (
            <td className={cn(tableCellVariants({ size }))}>
              <Skeleton width={20} height={20} className="rounded" />
            </td>
          )}
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className={cn(tableCellVariants({ size }))}>
              <Skeleton
                width={colIdx === 0 ? '60%' : colIdx === columns - 1 ? '40%' : '80%'}
                height={16}
              />
            </td>
          ))}
          {hasActions && (
            <td className={cn(tableCellVariants({ size, align: 'right' }))}>
              <Skeleton width={32} height={32} className="rounded-md" />
            </td>
          )}
        </tr>
      ))}
    </>
  )
}

// ============ MOBILE CARD ============

interface MobileCardProps<TData> {
  row: TData
  rowIndex: number
  columns: ColumnDef<TData, unknown>[]
  selectable?: boolean
  selectionMode?: 'single' | 'multiple'
  selected?: boolean
  onSelect?: () => void
  rowActions?: RowAction<TData>[]
}

function MobileCard<TData>({
  row,
  rowIndex,
  columns,
  selectable,
  selectionMode,
  selected,
  onSelect,
  rowActions,
}: MobileCardProps<TData>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4',
        'transition-colors duration-fast',
        selected && 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {selectable && (
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            aria-label={`Select row ${rowIndex + 1}`}
          />
        )}

        <div className="flex-1 space-y-2">
          {columns.map((column) => {
            const value = column.accessorFn
              ? column.accessorFn(row)
              : column.accessorKey
                ? getNestedValue(row, column.accessorKey)
                : getNestedValue(row, column.id as keyof TData)

            const header = typeof column.header === 'function'
              ? column.header({ column })
              : column.header

            const cellContent = column.cell
              ? column.cell({ row, value, rowIndex })
              : String(value ?? '')

            return (
              <div key={String(column.id)} className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-secondary-600 dark:text-secondary-400">
                  {header}
                </span>
                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                  {cellContent}
                </span>
              </div>
            )
          })}
        </div>

        {rowActions && rowActions.length > 0 && (
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <button
                className={cn(
                  'rounded-md p-2',
                  'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  'hover:bg-[var(--bg-muted)]',
                  'transition-colors duration-fast'
                )}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {rowActions.map((action, idx) => {
                const isHidden = typeof action.hidden === 'function'
                  ? action.hidden(row)
                  : action.hidden
                const isDisabled = typeof action.disabled === 'function'
                  ? action.disabled(row)
                  : action.disabled

                if (isHidden) return null

                return (
                  <DropdownMenu.Item
                    key={idx}
                    onClick={() => action.onClick(row, rowIndex)}
                    disabled={isDisabled}
                    destructive={action.destructive}
                  >
                    {action.icon && <DropdownMenu.Icon>{action.icon}</DropdownMenu.Icon>}
                    {action.label}
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.Content>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

// ============ MAIN COMPONENT ============

function DataTableInner<TData>(
  {
    data,
    columns,
    // Sorting
    sortable = false,
    defaultSort: defaultSortProp,
    onSortChange,
    manualSorting = false,
    // Filtering
    filterable = false,
    globalFilter: controlledGlobalFilter,
    onGlobalFilterChange,
    filterPlaceholder = 'Search...',
    // Pagination
    pagination = false,
    pageSize: controlledPageSize = 10,
    currentPage: controlledCurrentPage = 1,
    totalItems: controlledTotalItems,
    onPageChange,
    manualPagination = false,
    pageSizeOptions = [10, 25, 50, 100],
    onPageSizeChange,
    // Selection
    selectable = false,
    selectionMode = 'multiple',
    selectedRows: controlledSelectedRows,
    onSelectionChange,
    getRowId = (row: TData) => JSON.stringify(row),
    // Row Actions
    rowActions,
    // States
    loading = false,
    loadingRows = 5,
    emptyState,
    // Responsive
    responsiveMode = 'auto',
    mobileBreakpoint = 768,
    cardRenderer,
    // Styling
    size = 'md',
    className,
    tableClassName,
    headerClassName,
    bodyClassName,
    rowClassName,
    cellClassName,
    stickyHeader = false,
    striped = false,
    hoverable = true,
    bordered = false,
    compact = false,
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  // ============ STATE ============

  const [sortState, setSortState] = React.useState<SortState<TData>>(
    defaultSortProp || { column: null, direction: null }
  )

  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState('')
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter

  const [internalPageSize, setInternalPageSize] = React.useState(controlledPageSize)
  const pageSize = controlledPageSize ?? internalPageSize

  const [internalCurrentPage, setInternalCurrentPage] = React.useState(controlledCurrentPage)
  const currentPage = controlledCurrentPage ?? internalCurrentPage

  const [internalSelectedRows, setInternalSelectedRows] = React.useState<TData[]>([])
  const selectedRows = controlledSelectedRows ?? internalSelectedRows

  const [isMobile, setIsMobile] = React.useState(false)

  // ============ EFFECTS ============

  React.useEffect(() => {
    if (responsiveMode === 'auto' || responsiveMode === 'cards') {
      const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [responsiveMode, mobileBreakpoint])

  // ============ COMPUTED ============

  const processedData = React.useMemo(() => {
    let result = [...data]

    // Apply filtering
    if (!manualPagination && globalFilter) {
      result = result.filter((row) => defaultFilter(row, globalFilter, columns))
    }

    // Apply sorting
    if (!manualSorting && sortState.column && sortState.direction) {
      result.sort((a, b) => defaultSort(a, b, sortState.column as keyof TData, sortState.direction))
    }

    return result
  }, [data, globalFilter, sortState, columns, manualPagination, manualSorting])

  const totalItems = controlledTotalItems ?? processedData.length
  const totalPages = Math.ceil(totalItems / pageSize)

  const paginatedData = React.useMemo(() => {
    if (!pagination || manualPagination) return processedData

    const start = (currentPage - 1) * pageSize
    return processedData.slice(start, start + pageSize)
  }, [processedData, pagination, manualPagination, currentPage, pageSize])

  const selectedRowIds = React.useMemo(() => {
    return new Set(selectedRows.map(getRowId))
  }, [selectedRows, getRowId])

  const allRowsSelected = paginatedData.length > 0 && paginatedData.every((row) => selectedRowIds.has(getRowId(row)))
  const someRowsSelected = paginatedData.some((row) => selectedRowIds.has(getRowId(row)))

  // ============ HANDLERS ============

  const handleSort = React.useCallback((column: ColumnDef<TData, unknown>) => {
    if (!sortable || column.sortable === false) return

    const columnKey = column.accessorKey ?? column.id

    setSortState((prev) => {
      let newDirection: SortDirection = 'asc'

      if (prev.column === columnKey) {
        if (prev.direction === 'asc') newDirection = 'desc'
        else if (prev.direction === 'desc') newDirection = null
      }

      const newState: SortState<TData> = {
        column: newDirection ? columnKey as keyof TData : null,
        direction: newDirection,
      }

      onSortChange?.(newState)
      return newState
    })
  }, [sortable, onSortChange])

  const handleGlobalFilterChange = React.useCallback((value: string) => {
    if (controlledGlobalFilter === undefined) {
      setInternalGlobalFilter(value)
    }
    onGlobalFilterChange?.(value)

    // Reset to first page on filter change
    if (!manualPagination) {
      setInternalCurrentPage(1)
      onPageChange?.(1)
    }
  }, [controlledGlobalFilter, onGlobalFilterChange, manualPagination, onPageChange])

  const handlePageChange = React.useCallback((page: number) => {
    if (controlledCurrentPage === undefined) {
      setInternalCurrentPage(page)
    }
    onPageChange?.(page)
  }, [controlledCurrentPage, onPageChange])

  const handlePageSizeChange = React.useCallback((newSize: number) => {
    if (controlledPageSize === undefined) {
      setInternalPageSize(newSize)
    }
    onPageSizeChange?.(newSize)
    handlePageChange(1)
  }, [controlledPageSize, onPageSizeChange, handlePageChange])

  const handleRowSelect = React.useCallback((row: TData) => {
    const rowId = getRowId(row)
    const isSelected = selectedRowIds.has(rowId)

    let newSelection: TData[]

    if (selectionMode === 'single') {
      newSelection = isSelected ? [] : [row]
    } else {
      newSelection = isSelected
        ? selectedRows.filter((r) => getRowId(r) !== rowId)
        : [...selectedRows, row]
    }

    if (controlledSelectedRows === undefined) {
      setInternalSelectedRows(newSelection)
    }
    onSelectionChange?.(newSelection)
  }, [selectedRowIds, selectionMode, selectedRows, getRowId, controlledSelectedRows, onSelectionChange])

  const handleSelectAll = React.useCallback(() => {
    let newSelection: TData[]

    if (allRowsSelected) {
      // Deselect all paginated rows
      newSelection = selectedRows.filter((r) => !paginatedData.some((pr) => getRowId(pr) === getRowId(r)))
    } else {
      // Select all paginated rows
      const newRows = paginatedData.filter((row) => !selectedRowIds.has(getRowId(row)))
      newSelection = [...selectedRows, ...newRows]
    }

    if (controlledSelectedRows === undefined) {
      setInternalSelectedRows(newSelection)
    }
    onSelectionChange?.(newSelection)
  }, [allRowsSelected, selectedRows, paginatedData, getRowId, selectedRowIds, controlledSelectedRows, onSelectionChange])

  // ============ RENDER ============

  const showMobileCards = responsiveMode === 'cards' || (responsiveMode === 'auto' && isMobile)
  const effectiveSize = compact ? 'sm' : (size ?? 'md')

  const renderTable = () => (
    <div className={cn('overflow-x-auto', responsiveMode === 'scroll' && 'overflow-x-auto')}>
      <table className={cn(tableVariants({ size: effectiveSize }), tableClassName)}>
        <thead
          className={cn(
            'bg-[var(--bg-subtle)] border-b border-[var(--border-default)]',
            stickyHeader && 'sticky top-0 z-10',
            headerClassName
          )}
        >
          <tr>
            {selectable && selectionMode === 'multiple' && (
              <th className={cn(tableCellVariants({ size: effectiveSize }), 'w-12')}>
                <Checkbox
                  checked={allRowsSelected}
                  indeterminate={someRowsSelected && !allRowsSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {selectable && selectionMode === 'single' && (
              <th className={cn(tableCellVariants({ size: effectiveSize }), 'w-12')} />
            )}

            {columns.map((column) => {
              const isSortable = sortable && column.sortable !== false
              const isSorted = sortState.column === (column.accessorKey ?? column.id)

              const headerContent = typeof column.header === 'function'
                ? column.header({ column, sortState })
                : column.header

              return (
                <th
                  key={String(column.id)}
                  className={cn(
                    tableCellVariants({ size: effectiveSize, align: column.align }),
                    'font-semibold',
                    isSortable && 'cursor-pointer select-none',
                    column.headerClassName
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    color: 'var(--text-primary)',
                  }}
                  onClick={() => isSortable && handleSort(column)}
                >
                  <div className={cn('flex items-center gap-2', column.align === 'right' && 'justify-end')}>
                    <span>{headerContent}</span>
                    {isSortable && (
                      <SortIndicator direction={isSorted ? sortState.direction : null} />
                    )}
                  </div>
                </th>
              )
            })}

            {rowActions && rowActions.length > 0 && (
              <th className={cn(tableCellVariants({ size: effectiveSize, align: 'right' }), 'w-12')}>
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>

        <tbody className={bodyClassName}>
          {loading ? (
            <TableSkeleton
              rows={loadingRows}
              columns={columns.length}
              size={effectiveSize}
              hasSelection={selectable}
              hasActions={!!rowActions?.length}
            />
          ) : paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0) + (rowActions?.length ? 1 : 0)}
                className="p-0"
              >
                <EmptyState
                  title={emptyState?.title ?? 'No data'}
                  description={emptyState?.description ?? 'There are no items to display.'}
                  icon={emptyState?.icon}
                  action={emptyState?.action}
                  size="sm"
                  className="py-12"
                />
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => {
              const rowId = getRowId(row)
              const isSelected = selectedRowIds.has(rowId)
              const rowClassNameValue = typeof rowClassName === 'function'
                ? rowClassName(row, rowIndex)
                : rowClassName

              return (
                <tr
                  key={rowId}
                  className={cn(
                    'border-b border-[var(--border-default)] transition-colors duration-fast',
                    striped && rowIndex % 2 === 1 && 'bg-[var(--bg-subtle)]',
                    hoverable && 'hover:bg-[var(--bg-muted)]',
                    isSelected && 'bg-primary-50 dark:bg-primary-950/20',
                    bordered && 'border border-[var(--border-default)]',
                    rowClassNameValue
                  )}
                >
                  {selectable && (
                    <td className={cn(tableCellVariants({ size: effectiveSize }))}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleRowSelect(row)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}

                  {columns.map((column) => {
                    const value = column.accessorFn
                      ? column.accessorFn(row)
                      : column.accessorKey
                        ? getNestedValue(row, column.accessorKey)
                        : getNestedValue(row, column.id as keyof TData)

                    const cellContent = column.cell
                      ? column.cell({ row, value, rowIndex })
                      : String(value ?? '')

                    return (
                      <td
                        key={String(column.id)}
                        className={cn(
                          tableCellVariants({ size: effectiveSize, align: column.align }),
                          column.className,
                          cellClassName
                        )}
                      >
                        {cellContent}
                      </td>
                    )
                  })}

                  {rowActions && rowActions.length > 0 && (
                    <td className={cn(tableCellVariants({ size: effectiveSize, align: 'right' }))}>
                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <button
                            className={cn(
                              'rounded-md p-2',
                              'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                              'hover:bg-[var(--bg-muted)]',
                              'transition-colors duration-fast'
                            )}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                          {rowActions.map((action, idx) => {
                            const isHidden = typeof action.hidden === 'function'
                              ? action.hidden(row)
                              : action.hidden
                            const isDisabled = typeof action.disabled === 'function'
                              ? action.disabled(row)
                              : action.disabled

                            if (isHidden) return null

                            return (
                              <DropdownMenu.Item
                                key={idx}
                                onClick={() => action.onClick(row, rowIndex)}
                                disabled={isDisabled}
                                destructive={action.destructive}
                              >
                                {action.icon && <DropdownMenu.Icon>{action.icon}</DropdownMenu.Icon>}
                                {action.label}
                              </DropdownMenu.Item>
                            )
                          })}
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )

  const renderCards = () => (
    <div className="space-y-3">
      {loading ? (
        Array.from({ length: loadingRows }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4"
          >
            <div className="space-y-3">
              {columns.slice(0, 4).map((col, colIdx) => (
                <div key={colIdx} className="space-y-1">
                  <Skeleton width={80} height={12} />
                  <Skeleton width={colIdx === 0 ? '70%' : '50%'} height={16} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : paginatedData.length === 0 ? (
        <EmptyState
          title={emptyState?.title ?? 'No data'}
          description={emptyState?.description ?? 'There are no items to display.'}
          icon={emptyState?.icon}
          action={emptyState?.action}
          size="sm"
        />
      ) : (
        paginatedData.map((row, rowIndex) => {
          if (cardRenderer) {
            return <React.Fragment key={getRowId(row)}>{cardRenderer(row, rowIndex)}</React.Fragment>
          }

          return (
            <MobileCard
              key={getRowId(row)}
              row={row}
              rowIndex={rowIndex}
              columns={columns}
              selectable={selectable}
              selectionMode={selectionMode}
              selected={selectedRowIds.has(getRowId(row))}
              onSelect={() => handleRowSelect(row)}
              rowActions={rowActions}
            />
          )
        })
      )}
    </div>
  )

  return (
    <div ref={ref} className={cn('space-y-4', className)}>
      {/* Toolbar */}
      {(filterable || selectedRows.length > 0) && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {filterable && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <Input
                type="search"
                placeholder={filterPlaceholder}
                value={globalFilter}
                onChange={(e) => handleGlobalFilterChange(e.target.value)}
                onClear={() => handleGlobalFilterChange('')}
                showClearButton
                leftIcon={<Search className="h-4 w-4" />}
                inputSize="sm"
              />
            </div>
          )}

          {selectable && selectedRows.length > 0 && (
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected
            </div>
          )}
        </div>
      )}

      {/* Table or Cards */}
      {showMobileCards ? renderCards() : renderTable()}

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-300">
            <span>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
            </span>

            {pageSizeOptions.length > 1 && (
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className={cn(
                  'rounded-md border border-[var(--border-default)] bg-[var(--bg-base)]',
                  'px-2 py-1 text-sm text-secondary-700 dark:text-secondary-300',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                )}
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / page
                  </option>
                ))}
              </select>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="sm"
          />
        </div>
      )}
    </div>
  )
}

// ============ FORWARD REF WITH GENERICS ============

export const DataTable = React.forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement

// ============ EXPORTS ============

export { tableVariants, tableCellVariants }
