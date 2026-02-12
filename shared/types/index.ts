/**
 * Common size variants used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Common status variants
 */
export type Status = 'success' | 'warning' | 'error' | 'info'

/**
 * Base props that most components accept
 */
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean
}

/**
 * Props for components that can show loading state
 */
export interface LoadableProps {
  isLoading?: boolean
}
