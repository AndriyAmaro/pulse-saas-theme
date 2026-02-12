'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm',
    'transition-colors duration-150',
    'placeholder:text-[var(--text-muted)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-default)] bg-[var(--bg-base)]',
          'text-[var(--text-primary)]',
          'focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
          'hover:border-[var(--secondary-400)]',
        ],
        filled: [
          'border-transparent bg-[var(--bg-muted)]',
          'text-[var(--text-primary)]',
          'focus-visible:bg-[var(--bg-base)] focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
          'hover:bg-[var(--bg-emphasis)]',
        ],
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: [
          'border-error-base',
          'focus-visible:border-error-base focus-visible:ring-error-base/20',
        ],
        success: [
          'border-success-base',
          'focus-visible:border-success-base focus-visible:ring-success-base/20',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      state: 'default',
    },
  }
)

const strengthColors = {
  0: 'bg-[var(--border-default)]',
  1: 'bg-error-base',
  2: 'bg-warning-base',
  3: 'bg-accent-500',
  4: 'bg-success-base',
}

const strengthLabels = {
  0: 'Too weak',
  1: 'Weak',
  2: 'Fair',
  3: 'Good',
  4: 'Strong',
}

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const defaultRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) },
  { label: 'One special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof inputVariants> {
  showStrength?: boolean
  requirements?: PasswordRequirement[]
  onStrengthChange?: (strength: number) => void
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      variant,
      inputSize,
      state,
      showStrength = false,
      requirements = defaultRequirements,
      onStrengthChange,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState('')

    const password = (value as string) ?? internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const togglePassword = () => setShowPassword((prev) => !prev)

    const passedRequirements = requirements.filter((req) => req.test(password))
    const strength = passedRequirements.length

    React.useEffect(() => {
      onStrengthChange?.(strength)
    }, [strength, onStrengthChange])

    return (
      <div className="w-full space-y-3">
        <div className="relative flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              inputVariants({ variant, inputSize, state }),
              'pr-10',
              className
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 flex items-center justify-center rounded-sm p-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {showStrength && password.length > 0 && (
          <div className="space-y-3">
            {/* Strength bar */}
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors duration-200',
                      strength >= level
                        ? strengthColors[strength as keyof typeof strengthColors]
                        : 'bg-[var(--border-default)]'
                    )}
                  />
                ))}
              </div>
              <p
                className={cn(
                  'text-xs font-medium',
                  strength === 0 && 'text-[var(--text-muted)]',
                  strength === 1 && 'text-error-base',
                  strength === 2 && 'text-warning-base',
                  strength === 3 && 'text-accent-600 dark:text-accent-500',
                  strength === 4 && 'text-success-base'
                )}
              >
                {strengthLabels[strength as keyof typeof strengthLabels]}
              </p>
            </div>

            {/* Requirements checklist */}
            <ul className="space-y-1.5">
              {requirements.map((req, index) => {
                const passed = req.test(password)
                return (
                  <li
                    key={index}
                    className={cn(
                      'flex items-center gap-2 text-xs transition-colors duration-150',
                      passed
                        ? 'text-success-base'
                        : 'text-[var(--text-muted)]'
                    )}
                  >
                    {passed ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <X className="h-3.5 w-3.5" />
                    )}
                    {req.label}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput, defaultRequirements }
export type { PasswordRequirement }
