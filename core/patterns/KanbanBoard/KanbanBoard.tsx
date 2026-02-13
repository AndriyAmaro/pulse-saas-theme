'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Avatar } from '@core/primitives/Avatar'
import { Badge } from '@core/primitives/Badge'
import {
  Plus,
  GripVertical,
  Calendar,
  MoreHorizontal,
  X,
  Flame,
  AlertCircle,
  ArrowUp,
  Minus,
} from 'lucide-react'

// ============================================================================
// CVA Variants
// ============================================================================

const kanbanBoardVariants = cva('flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory md:snap-none', {
  variants: {
    variant: {
      default: '',
      compact: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const kanbanColumnVariants = cva(
  'flex shrink-0 flex-col rounded-xl bg-[var(--bg-subtle)] transition-colors snap-start',
  {
    variants: {
      variant: {
        default: 'w-[85vw] sm:w-80 p-4',
        compact: 'w-[80vw] sm:w-72 p-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const kanbanCardVariants = cva(
  'group relative cursor-grab overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-[var(--primary-300)] dark:hover:border-[var(--primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)] active:cursor-grabbing',
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-3',
      },
      isDragging: {
        true: 'opacity-50 shadow-lg scale-105',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      isDragging: false,
    },
  }
)

const priorityBadgeVariants = cva('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md', {
  variants: {
    priority: {
      low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      medium: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-700/30',
      high: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200/50 dark:border-red-700/30',
      urgent: 'bg-gradient-to-r from-red-600 to-rose-600 text-white dark:from-red-700 dark:to-rose-700 shadow-sm',
    },
  },
  defaultVariants: {
    priority: 'medium',
  },
})

// Priority left-border color mapping
const priorityBorderColors: Record<KanbanPriority, string> = {
  low: 'bg-slate-300 dark:bg-slate-600',
  medium: 'bg-amber-400 dark:bg-amber-500',
  high: 'bg-red-500 dark:bg-red-400',
  urgent: 'bg-gradient-to-b from-red-500 to-rose-600',
}

// Priority icon mapping
const PriorityIcon: React.FC<{ priority: KanbanPriority }> = ({ priority }) => {
  switch (priority) {
    case 'urgent':
      return <Flame size={10} />
    case 'high':
      return <AlertCircle size={10} />
    case 'medium':
      return <ArrowUp size={10} />
    case 'low':
      return <Minus size={10} />
  }
}

// Column color mapping
const columnColors: Record<string, { dot: string; border: string; count: string }> = {
  'todo': { dot: 'bg-slate-400', border: 'from-slate-400 to-slate-300', count: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  'in-progress': { dot: 'bg-blue-500', border: 'from-blue-500 to-blue-400', count: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'review': { dot: 'bg-violet-500', border: 'from-violet-500 to-purple-400', count: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' },
  'done': { dot: 'bg-emerald-500', border: 'from-emerald-500 to-green-400', count: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
}

// ============================================================================
// Types
// ============================================================================

export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanTag {
  id: string
  label: string
  color?: string
}

export interface KanbanAssignee {
  id: string
  name: string
  avatar?: string
}

export interface KanbanCard {
  id: string
  title: string
  description?: string
  priority?: KanbanPriority
  dueDate?: Date | string
  assignee?: KanbanAssignee
  tags?: KanbanTag[]
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanBoardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kanbanBoardVariants> {
  columns: KanbanColumn[]
  onColumnsChange?: (columns: KanbanColumn[]) => void
  onCardAdd?: (columnId: string) => void
  onCardClick?: (card: KanbanCard, columnId: string) => void
  onCardDelete?: (cardId: string, columnId: string) => void
  renderCardActions?: (card: KanbanCard, columnId: string) => React.ReactNode
}

// ============================================================================
// Sortable Card Component
// ============================================================================

interface SortableCardProps {
  card: KanbanCard
  columnId: string
  variant: 'default' | 'compact' | null | undefined
  onClick?: () => void
  onDelete?: () => void
  renderActions?: () => React.ReactNode
}

const SortableCard = React.forwardRef<HTMLDivElement, SortableCardProps>(
  ({ card, columnId, variant, onClick, onDelete, renderActions }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: card.id,
      data: { type: 'card', card, columnId },
    })

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    const formattedDate = card.dueDate
      ? new Date(card.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      : null

    const isOverdue =
      card.dueDate && new Date(card.dueDate) < new Date() ? true : false

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          kanbanCardVariants({ variant, isDragging }),
          isDragging && 'z-50'
        )}
        onClick={onClick}
        {...attributes}
      >
        {/* Priority left border accent */}
        {card.priority && (
          <div
            className={cn(
              'absolute left-0 top-0 h-full w-1 rounded-l-xl',
              priorityBorderColors[card.priority]
            )}
          />
        )}

        {/* Header with drag handle and actions */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <button
            className="mt-0.5 cursor-grab text-[var(--text-muted)] opacity-0 transition-opacity hover:text-[var(--text-secondary)] group-hover:opacity-100"
            {...listeners}
            aria-label="Drag card"
          >
            <GripVertical size={16} />
          </button>
          <div className="flex items-center gap-1">
            {renderActions?.()}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="rounded p-1 text-[var(--text-muted)] opacity-0 transition-opacity hover:bg-[var(--bg-muted)] hover:text-error group-hover:opacity-100"
                aria-label="Delete card"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
          {card.title}
        </h4>

        {/* Description */}
        {card.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
            {card.description}
          </p>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}12`
                    : 'var(--bg-muted)',
                  borderColor: tag.color
                    ? `${tag.color}30`
                    : 'var(--border-default)',
                  color: tag.color || 'var(--text-secondary)',
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Assignee, Due Date, Priority */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-default)]/50 pt-3">
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            {/* Assignee */}
            {card.assignee && (
              <div className="flex items-center gap-1.5">
                <Avatar
                  src={card.assignee.avatar}
                  fallback={card.assignee.name.charAt(0)}
                  size="xs"
                  alt={card.assignee.name}
                />
                <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                  {card.assignee.name}
                </span>
              </div>
            )}

            {/* Due Date */}
            {formattedDate && (
              <span
                className={cn(
                  'flex items-center gap-1 text-xs whitespace-nowrap rounded-md px-1.5 py-0.5',
                  isOverdue
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : 'text-[var(--text-muted)]'
                )}
              >
                <Calendar size={11} className="flex-shrink-0" />
                {formattedDate}
              </span>
            )}
          </div>

          {/* Priority */}
          {card.priority && (
            <Badge
              className={cn(priorityBadgeVariants({ priority: card.priority }), 'flex-shrink-0 whitespace-nowrap')}
              size="sm"
            >
              <PriorityIcon priority={card.priority} />
              {card.priority}
            </Badge>
          )}
        </div>
      </div>
    )
  }
)

SortableCard.displayName = 'SortableCard'

// ============================================================================
// Drag Overlay Card
// ============================================================================

interface DragOverlayCardProps {
  card: KanbanCard
  variant: 'default' | 'compact' | null | undefined
}

const DragOverlayCard: React.FC<DragOverlayCardProps> = ({ card, variant }) => {
  const formattedDate = card.dueDate
    ? new Date(card.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <div
      className={cn(
        kanbanCardVariants({ variant }),
        'rotate-2 scale-105 shadow-2xl ring-2 ring-[var(--primary-500)]/20'
      )}
    >
      {/* Priority left border accent */}
      {card.priority && (
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-1 rounded-l-xl',
            priorityBorderColors[card.priority]
          )}
        />
      )}

      <h4 className="text-sm font-semibold text-[var(--text-primary)]">
        {card.title}
      </h4>
      {card.description && (
        <p className="mt-1.5 line-clamp-2 text-xs text-[var(--text-secondary)]">
          {card.description}
        </p>
      )}
      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: tag.color ? `${tag.color}12` : 'var(--bg-muted)',
                borderColor: tag.color ? `${tag.color}30` : 'var(--border-default)',
                color: tag.color || 'var(--text-secondary)',
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
      {/* Footer: Assignee, Due Date, Priority */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-default)]/50 pt-3">
        <div className="flex items-center gap-2 min-w-0 flex-shrink">
          {card.assignee && (
            <Avatar
              src={card.assignee.avatar}
              fallback={card.assignee.name.charAt(0)}
              size="xs"
              alt={card.assignee.name}
            />
          )}
          {formattedDate && (
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] whitespace-nowrap">
              <Calendar size={11} className="flex-shrink-0" />
              {formattedDate}
            </span>
          )}
        </div>
        {card.priority && (
          <Badge
            className={cn(priorityBadgeVariants({ priority: card.priority }), 'flex-shrink-0 whitespace-nowrap')}
            size="sm"
          >
            <PriorityIcon priority={card.priority} />
            {card.priority}
          </Badge>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Kanban Column Component
// ============================================================================

interface KanbanColumnComponentProps {
  column: KanbanColumn
  variant: 'default' | 'compact' | null | undefined
  onCardAdd?: () => void
  onCardClick?: (card: KanbanCard) => void
  onCardDelete?: (cardId: string) => void
  renderCardActions?: (card: KanbanCard) => React.ReactNode
}

const KanbanColumnComponent: React.FC<KanbanColumnComponentProps> = ({
  column,
  variant,
  onCardAdd,
  onCardClick,
  onCardDelete,
  renderCardActions,
}) => {
  const cardIds = column.cards.map((card) => card.id)

  const colors = columnColors[column.id] ?? { dot: 'bg-slate-400', border: 'from-slate-400 to-slate-300', count: 'bg-[var(--bg-muted)] text-[var(--text-muted)]' }

  return (
    <div className={cn(kanbanColumnVariants({ variant }), 'relative')}>
      {/* Column top gradient bar */}
      <div className={cn('absolute top-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r', colors.border)} />

      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className={cn('h-2.5 w-2.5 rounded-full', colors.dot)} />
          <h3 className="font-semibold text-[var(--text-primary)]">
            {column.title}
          </h3>
          <span className={cn('flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold', colors.count)}>
            {column.cards.length}
          </span>
        </div>
        <button
          className="rounded-lg p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
          aria-label="Column options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Cards Container */}
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-3">
          {column.cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              columnId={column.id}
              variant={variant}
              onClick={() => onCardClick?.(card)}
              onDelete={() => onCardDelete?.(card.id)}
              renderActions={() => renderCardActions?.(card)}
            />
          ))}
        </div>
      </SortableContext>

      {/* Add Card Button */}
      {onCardAdd && (
        <button
          onClick={onCardAdd}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-default)] py-2.5 text-sm text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--primary-500)] hover:bg-[var(--primary-500)]/5 hover:text-[var(--primary-500)] hover:shadow-sm"
        >
          <Plus size={16} />
          Add Card
        </button>
      )}
    </div>
  )
}

// ============================================================================
// Main KanbanBoard Component
// ============================================================================

const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      className,
      variant = 'default',
      columns,
      onColumnsChange,
      onCardAdd,
      onCardClick,
      onCardDelete,
      renderCardActions,
      ...props
    },
    ref
  ) => {
    const [activeCard, setActiveCard] = React.useState<KanbanCard | null>(null)

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    )

    const findColumnByCardId = (cardId: string): KanbanColumn | undefined => {
      return columns.find((col) => col.cards.some((card) => card.id === cardId))
    }

    const handleDragStart = (event: DragStartEvent) => {
      const { active } = event
      const activeData = active.data.current as { type: string; card: KanbanCard }
      if (activeData?.type === 'card') {
        setActiveCard(activeData.card)
      }
    }

    const handleDragOver = (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      const activeColumn = findColumnByCardId(activeId)
      const overColumn = findColumnByCardId(overId) || columns.find((col) => col.id === overId)

      if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return

      // Moving to a different column
      const activeCardIndex = activeColumn.cards.findIndex((c) => c.id === activeId)
      const activeCard = activeColumn.cards[activeCardIndex]

      if (!activeCard) return

      const newColumns = columns.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== activeId),
          }
        }
        if (col.id === overColumn.id) {
          const overCardIndex = col.cards.findIndex((c) => c.id === overId)
          const insertIndex = overCardIndex >= 0 ? overCardIndex : col.cards.length
          const newCards = [...col.cards]
          newCards.splice(insertIndex, 0, activeCard)
          return {
            ...col,
            cards: newCards,
          }
        }
        return col
      })

      onColumnsChange?.(newColumns)
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      setActiveCard(null)

      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      const activeColumn = findColumnByCardId(activeId)
      if (!activeColumn) return

      // Reordering within the same column
      const oldIndex = activeColumn.cards.findIndex((c) => c.id === activeId)
      const newIndex = activeColumn.cards.findIndex((c) => c.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newColumns = columns.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              cards: arrayMove(col.cards, oldIndex, newIndex),
            }
          }
          return col
        })
        onColumnsChange?.(newColumns)
      }
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={ref}
          className={cn(kanbanBoardVariants({ variant }), className)}
          role="region"
          aria-label="Kanban board"
          {...props}
        >
          {columns.map((column) => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
              variant={variant}
              onCardAdd={onCardAdd ? () => onCardAdd(column.id) : undefined}
              onCardClick={
                onCardClick
                  ? (card) => onCardClick(card, column.id)
                  : undefined
              }
              onCardDelete={
                onCardDelete
                  ? (cardId) => onCardDelete(cardId, column.id)
                  : undefined
              }
              renderCardActions={
                renderCardActions
                  ? (card) => renderCardActions(card, column.id)
                  : undefined
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <DragOverlayCard card={activeCard} variant={variant} />
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }
)

KanbanBoard.displayName = 'KanbanBoard'

export {
  KanbanBoard,
  kanbanBoardVariants,
  kanbanColumnVariants,
  kanbanCardVariants,
  priorityBadgeVariants,
}
