'use client'

import * as React from 'react'
import { forwardRef, useState, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal as TerminalIcon,
  Minus,
  X,
  Maximize2,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ============================================================================
// VARIANTS
// ============================================================================

export const codeBlockVariants = cva(
  [
    'relative overflow-hidden rounded-lg',
    'font-mono text-sm',
    'ring-1 ring-secondary-200 dark:ring-secondary-700',
  ],
  {
    variants: {
      variant: {
        default: 'bg-secondary-50 dark:bg-secondary-900',
        terminal: 'bg-secondary-900 dark:bg-black',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const codeHeaderVariants = cva(
  [
    'flex items-center justify-between px-4 py-2',
    'border-b',
  ],
  {
    variants: {
      variant: {
        default: 'bg-secondary-100 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700',
        terminal: 'bg-secondary-800 border-secondary-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export const codeContentVariants = cva(
  [
    'overflow-x-auto',
    'p-4',
  ],
  {
    variants: {
      collapsed: {
        true: 'max-h-[200px] overflow-hidden',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

export const lineVariants = cva(
  'table-row',
  {
    variants: {
      highlighted: {
        true: 'bg-primary-500/10 dark:bg-primary-500/20',
        false: '',
      },
      diff: {
        add: 'bg-green-500/10 dark:bg-green-500/20',
        remove: 'bg-red-500/10 dark:bg-red-500/20',
        none: '',
      },
    },
    defaultVariants: {
      highlighted: false,
      diff: 'none',
    },
  }
)

// ============================================================================
// TYPES
// ============================================================================

export type DiffType = 'add' | 'remove' | 'none'

export interface CodeBlockLine {
  content: string
  highlighted?: boolean
  diff?: DiffType
}

export interface CodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof codeBlockVariants> {
  code: string | CodeBlockLine[]
  language?: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  collapsible?: boolean
  defaultCollapsed?: boolean
  maxHeight?: number | string
  showCopy?: boolean
}

// ============================================================================
// SYNTAX HIGHLIGHTING (Simple built-in patterns)
// ============================================================================

interface SyntaxToken {
  type: 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'operator' | 'punctuation' | 'text'
  value: string
}

const LANGUAGE_PATTERNS = {
  javascript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined'],
    commentStart: '//',
    commentMulti: ['/*', '*/'] as [string, string],
  },
  typescript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined', 'type', 'interface', 'enum', 'as', 'extends', 'implements', 'private', 'public', 'protected', 'readonly'],
    commentStart: '//',
    commentMulti: ['/*', '*/'] as [string, string],
  },
  jsx: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined'],
    commentStart: '//',
    commentMulti: ['/*', '*/'] as [string, string],
  },
  tsx: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined', 'type', 'interface', 'enum', 'as', 'extends', 'implements'],
    commentStart: '//',
    commentMulti: ['/*', '*/'] as [string, string],
  },
  python: {
    keywords: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'raise', 'with', 'lambda', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'pass', 'break', 'continue', 'global', 'nonlocal', 'assert', 'yield', 'async', 'await'],
    commentStart: '#',
    commentMulti: undefined,
  },
  bash: {
    keywords: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'exit', 'export', 'local', 'echo', 'cd', 'ls', 'rm', 'mkdir', 'cp', 'mv', 'cat', 'grep', 'sed', 'awk'],
    commentStart: '#',
    commentMulti: undefined,
  },
  css: {
    keywords: ['@import', '@media', '@keyframes', '@font-face', '@supports', '!important'],
    commentStart: '',
    commentMulti: ['/*', '*/'] as [string, string],
  },
  html: {
    keywords: [] as string[],
    commentStart: '',
    commentMulti: ['<!--', '-->'] as [string, string],
  },
  json: {
    keywords: ['true', 'false', 'null'],
    commentStart: '',
    commentMulti: undefined,
  },
}

type LanguagePattern = {
  keywords: string[]
  commentStart: string
  commentMulti?: [string, string]
}

const getLanguagePatterns = (language: string): LanguagePattern => {
  const langKey = language.toLowerCase()
  switch (langKey) {
    case 'javascript': return LANGUAGE_PATTERNS.javascript
    case 'typescript': return LANGUAGE_PATTERNS.typescript
    case 'jsx': return LANGUAGE_PATTERNS.jsx
    case 'tsx': return LANGUAGE_PATTERNS.tsx
    case 'python': return LANGUAGE_PATTERNS.python
    case 'bash': return LANGUAGE_PATTERNS.bash
    case 'css': return LANGUAGE_PATTERNS.css
    case 'html': return LANGUAGE_PATTERNS.html
    case 'json': return LANGUAGE_PATTERNS.json
    default: return LANGUAGE_PATTERNS.javascript
  }
}

const tokenize = (code: string, language: string): SyntaxToken[] => {
  const tokens: SyntaxToken[] = []
  const patterns = getLanguagePatterns(language)

  let remaining = code

  while (remaining.length > 0) {
    // Check for comments
    if (patterns.commentStart && remaining.startsWith(patterns.commentStart)) {
      const endIndex = remaining.indexOf('\n')
      const comment = endIndex === -1 ? remaining : remaining.slice(0, endIndex)
      tokens.push({ type: 'comment', value: comment })
      remaining = remaining.slice(comment.length)
      continue
    }

    // Check for multi-line comments
    if (patterns.commentMulti && remaining.startsWith(patterns.commentMulti[0])) {
      const endIndex = remaining.indexOf(patterns.commentMulti[1], patterns.commentMulti[0].length)
      const comment = endIndex === -1 ? remaining : remaining.slice(0, endIndex + patterns.commentMulti[1].length)
      tokens.push({ type: 'comment', value: comment })
      remaining = remaining.slice(comment.length)
      continue
    }

    // Check for strings
    const stringMatch = remaining.match(/^(['"`])(?:(?!\1)[^\\]|\\.)*\1/)
    if (stringMatch) {
      tokens.push({ type: 'string', value: stringMatch[0] })
      remaining = remaining.slice(stringMatch[0].length)
      continue
    }

    // Check for numbers
    const numberMatch = remaining.match(/^-?\d+\.?\d*(?:[eE][+-]?\d+)?/)
    if (numberMatch) {
      tokens.push({ type: 'number', value: numberMatch[0] })
      remaining = remaining.slice(numberMatch[0].length)
      continue
    }

    // Check for keywords and identifiers
    const wordMatch = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/)
    if (wordMatch) {
      const word = wordMatch[0]
      if (patterns.keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word })
      } else if (remaining.slice(word.length).match(/^\s*\(/)) {
        tokens.push({ type: 'function', value: word })
      } else {
        tokens.push({ type: 'text', value: word })
      }
      remaining = remaining.slice(word.length)
      continue
    }

    // Check for operators
    const operatorMatch = remaining.match(/^[+\-*/%=<>!&|^~?:]+/)
    if (operatorMatch) {
      tokens.push({ type: 'operator', value: operatorMatch[0] })
      remaining = remaining.slice(operatorMatch[0].length)
      continue
    }

    // Check for punctuation
    const punctuationMatch = remaining.match(/^[{}[\]();,.]/)
    if (punctuationMatch) {
      tokens.push({ type: 'punctuation', value: punctuationMatch[0] })
      remaining = remaining.slice(1)
      continue
    }

    // Default: take one character as text
    const char = remaining.charAt(0)
    tokens.push({ type: 'text', value: char })
    remaining = remaining.slice(1)
  }

  return tokens
}

const TOKEN_COLORS: Record<SyntaxToken['type'], string> = {
  keyword: 'text-purple-600 dark:text-purple-400',
  string: 'text-green-600 dark:text-green-400',
  number: 'text-orange-600 dark:text-orange-400',
  comment: 'text-secondary-400 dark:text-secondary-500 italic',
  function: 'text-blue-600 dark:text-blue-400',
  operator: 'text-secondary-600 dark:text-secondary-400',
  punctuation: 'text-secondary-500 dark:text-secondary-400',
  text: 'text-secondary-900 dark:text-secondary-100',
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface TerminalHeaderProps {
  title?: string
  onCopy: () => void
  copied: boolean
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title, onCopy, copied }) => (
  <div className={cn(codeHeaderVariants({ variant: 'terminal' }))}>
    <div className="flex items-center gap-4">
      {/* macOS style buttons */}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      {title && (
        <div className="flex items-center gap-2 text-secondary-400">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-xs">{title}</span>
        </div>
      )}
    </div>
    <button
      type="button"
      onClick={onCopy}
      className="flex items-center gap-1.5 px-2 py-1 text-xs text-secondary-400 hover:text-white transition-colors rounded"
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  </div>
)

interface DefaultHeaderProps {
  title?: string
  language?: string
  onCopy: () => void
  copied: boolean
  collapsible?: boolean
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  title,
  language,
  onCopy,
  copied,
  collapsible,
  collapsed,
  onToggleCollapse,
}) => (
  <div className={cn(codeHeaderVariants({ variant: 'default' }))}>
    <div className="flex items-center gap-2">
      {title && (
        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {title}
        </span>
      )}
      {language && (
        <span className="px-2 py-0.5 text-xs rounded bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400">
          {language}
        </span>
      )}
    </div>
    <div className="flex items-center gap-2">
      {collapsible && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex items-center gap-1 px-2 py-1 text-xs text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors rounded"
          aria-label={collapsed ? 'Expand code' : 'Collapse code'}
        >
          {collapsed ? (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expand</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      )}
      <button
        type="button"
        onClick={onCopy}
        className="flex items-center gap-1.5 px-2 py-1 text-xs text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors rounded"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-500">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  </div>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language = 'plaintext',
      title,
      variant,
      size,
      showLineNumbers = true,
      highlightLines = [],
      collapsible = false,
      defaultCollapsed = false,
      maxHeight,
      showCopy = true,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false)
    const [collapsed, setCollapsed] = useState(defaultCollapsed)

    // Parse code into lines
    const lines: CodeBlockLine[] = Array.isArray(code)
      ? code
      : code.split('\n').map((content, i) => ({
          content,
          highlighted: highlightLines.includes(i + 1),
        }))

    // Get raw code for copying
    const rawCode = Array.isArray(code)
      ? code.map((l) => l.content).join('\n')
      : code

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(rawCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }, [rawCode])

    const isTerminal = variant === 'terminal'

    return (
      <div
        ref={ref}
        className={cn(codeBlockVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header */}
        {(title || language || showCopy || collapsible) && (
          isTerminal ? (
            <TerminalHeader
              title={title}
              onCopy={handleCopy}
              copied={copied}
            />
          ) : (
            <DefaultHeader
              title={title}
              language={language}
              onCopy={handleCopy}
              copied={copied}
              collapsible={collapsible}
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed(!collapsed)}
            />
          )
        )}

        {/* Code content */}
        <div
          className={cn(
            codeContentVariants({ collapsed: collapsible && collapsed }),
            isTerminal && 'text-secondary-100'
          )}
          style={{ maxHeight: !collapsed && maxHeight ? maxHeight : undefined }}
        >
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, i) => {
                const tokens = tokenize(line.content, language)
                const lineNumber = i + 1
                const isHighlighted = line.highlighted || highlightLines.includes(lineNumber)
                const diffType = line.diff || 'none'

                return (
                  <tr
                    key={i}
                    className={cn(lineVariants({ highlighted: isHighlighted, diff: diffType }))}
                  >
                    {/* Line number */}
                    {showLineNumbers && (
                      <td className="table-cell w-12 pr-4 text-right select-none text-secondary-400 dark:text-secondary-500 sticky left-0 bg-inherit">
                        {lineNumber}
                      </td>
                    )}

                    {/* Diff indicator */}
                    {line.diff && line.diff !== 'none' && (
                      <td className="table-cell w-4 select-none">
                        {line.diff === 'add' && (
                          <span className="text-green-500">+</span>
                        )}
                        {line.diff === 'remove' && (
                          <span className="text-red-500">-</span>
                        )}
                      </td>
                    )}

                    {/* Code */}
                    <td className="table-cell whitespace-pre">
                      {tokens.map((token, j) => (
                        <span
                          key={j}
                          className={cn(
                            isTerminal
                              ? token.type === 'keyword'
                                ? 'text-cyan-400'
                                : token.type === 'string'
                                ? 'text-green-400'
                                : token.type === 'number'
                                ? 'text-orange-400'
                                : token.type === 'comment'
                                ? 'text-secondary-500 italic'
                                : token.type === 'function'
                                ? 'text-yellow-400'
                                : ''
                              : TOKEN_COLORS[token.type]
                          )}
                        >
                          {token.value}
                        </span>
                      ))}
                      {line.content === '' && '\n'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Collapse gradient overlay */}
        {collapsible && collapsed && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary-50 dark:from-secondary-900 to-transparent pointer-events-none" />
        )}
      </div>
    )
  }
)

CodeBlock.displayName = 'CodeBlock'

// ============================================================================
// TERMINAL VARIANT SHORTHAND
// ============================================================================

export interface TerminalBlockProps extends Omit<CodeBlockProps, 'variant'> {}

export const TerminalBlock = forwardRef<HTMLDivElement, TerminalBlockProps>(
  (props, ref) => <CodeBlock ref={ref} variant="terminal" language="bash" {...props} />
)

TerminalBlock.displayName = 'TerminalBlock'
