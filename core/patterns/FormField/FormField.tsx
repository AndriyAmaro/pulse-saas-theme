'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'

const formFieldVariants = cva('flex flex-col', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const labelVariants = cva(
  'font-medium text-[var(--text-primary)] transition-colors',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      disabled: {
        true: 'text-[var(--text-disabled)] cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
)

const descriptionVariants = cva('text-[var(--text-muted)]', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const errorVariants = cva('text-error-base', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  children: React.ReactNode
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      required,
      disabled,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => {
    const id = React.useId()
    const fieldId = htmlFor || id
    const descriptionId = description ? `${fieldId}-description` : undefined
    const errorId = error ? `${fieldId}-error` : undefined

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ size }), className)}
        {...props}
      >
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(labelVariants({ size, disabled }))}
          >
            {label}
            {required && (
              <span className="ml-0.5 text-error-base" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {description && !error && (
          <p id={descriptionId} className={cn(descriptionVariants({ size }))}>
            {description}
          </p>
        )}

        <div className="relative">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                id: fieldId,
                'aria-describedby': error
                  ? errorId
                  : description
                    ? descriptionId
                    : undefined,
                'aria-invalid': error ? true : undefined,
                disabled: disabled,
              })
            : children}
        </div>

        {error && (
          <p id={errorId} className={cn(errorVariants({ size }))} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export { FormField, formFieldVariants, labelVariants }
