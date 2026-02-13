/**
 * Pulse Design System - Design Tokens
 * All design tokens are defined in globals.css as CSS variables
 * This file exports TypeScript constants for programmatic access
 */

export const colors = {
  primary: {
    50: '#EFFCF9',
    100: '#C7F7EC',
    200: '#9AF0DD',
    300: '#5DE4C8',
    400: '#2DD1B1',
    500: '#14B89A',
    600: '#109580',
    700: '#0D7768',
    800: '#0A5E53',
    900: '#074A42',
  },
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  success: {
    light: '#DCFCE7',
    base: '#22C55E',
    dark: '#15803D',
  },
  warning: {
    light: '#FEF3C7',
    base: '#F97316',
    dark: '#C2410C',
  },
  error: {
    light: '#FEE2E2',
    base: '#EF4444',
    dark: '#B91C1C',
  },
  info: {
    light: '#DBEAFE',
    base: '#3B82F6',
    dark: '#1D4ED8',
  },
} as const

export const spacing = {
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const

export const radius = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const

export const duration = {
  instant: '50ms',
  fast: '100ms',
  normal: '150ms',
  slow: '300ms',
  slower: '500ms',
} as const

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const
