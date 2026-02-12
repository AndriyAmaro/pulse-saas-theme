'use client'

import * as React from 'react'
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  SubmitErrorHandler,
  Path,
  FieldError,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormProps,
  UseFormStateReturn,
  Resolver,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodType } from 'zod'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { Spinner } from '@core/primitives/Spinner'

// ============ TYPES ============

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
  // Form configuration
  form: UseFormReturn<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  onError?: SubmitErrorHandler<TFieldValues>
  // Submission state
  isSubmitting?: boolean
  // Form layout
  layout?: 'vertical' | 'horizontal'
  size?: 'sm' | 'md' | 'lg'
  // Children
  children: React.ReactNode
}

export interface FormFieldContextValue {
  name: string
  error?: FieldError
  formItemId: string
  formDescriptionId: string
  formMessageId: string
}

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between'
  sticky?: boolean
  children: React.ReactNode
}

export interface UseFormWithSchemaOptions<TFieldValues extends FieldValues = FieldValues>
  extends Omit<UseFormProps<TFieldValues>, 'resolver'> {
  schema: ZodType<TFieldValues>
}

// ============ CONTEXT ============

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

function useFormField() {
  const context = React.useContext(FormFieldContext)
  if (!context) {
    throw new Error('useFormField must be used within a FormField')
  }
  return context
}

const FormContext = React.createContext<{
  layout: 'vertical' | 'horizontal'
  size: 'sm' | 'md' | 'lg'
} | null>(null)

function useFormContext() {
  const context = React.useContext(FormContext)
  return context ?? { layout: 'vertical', size: 'md' }
}

// ============ VARIANTS ============

const formSectionVariants = cva('', {
  variants: {
    size: {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const formLabelVariants = cva('font-medium text-[var(--text-primary)]', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-error-base",
      false: '',
    },
    disabled: {
      true: 'text-[var(--text-disabled)] cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    required: false,
    disabled: false,
  },
})

const formDescriptionVariants = cva('text-[var(--text-muted)]', {
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

const formMessageVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    variant: {
      error: 'text-error-base',
      success: 'text-success-base',
      warning: 'text-warning-base',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'error',
  },
})

const formActionsVariants = cva('flex items-center gap-3', {
  variants: {
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
    sticky: {
      true: 'sticky bottom-0 bg-[var(--bg-base)] py-4 border-t border-[var(--border-default)] -mx-6 px-6 mt-6',
      false: 'pt-4',
    },
  },
  defaultVariants: {
    align: 'right',
    sticky: false,
  },
})

// ============ HOOK ============

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormWithSchema<TFieldValues extends FieldValues = FieldValues>({
  schema,
  ...options
}: UseFormWithSchemaOptions<TFieldValues>) {
  return useForm<TFieldValues>({
    resolver: zodResolver(schema as any) as Resolver<TFieldValues>,
    ...options,
  })
}

// ============ MAIN FORM COMPONENT ============

function FormRoot<TFieldValues extends FieldValues>(
  {
    form,
    onSubmit,
    onError,
    isSubmitting: externalIsSubmitting,
    layout = 'vertical',
    size = 'md',
    className,
    children,
    ...props
  }: FormProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLFormElement>
) {
  const isSubmitting = externalIsSubmitting ?? form.formState.isSubmitting

  return (
    <FormContext.Provider value={{ layout, size }}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn('space-y-6', className)}
        {...props}
      >
        <fieldset disabled={isSubmitting} className="min-w-0">
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  )
}

export const Form = React.forwardRef(FormRoot) as <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLFormElement> }
) => React.ReactElement

// ============ CONTROLLED FIELD ============

interface ControlledFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  children: (props: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactNode
}

function ControlledField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>({ name, control, children, ...props }: ControlledFieldProps<TFieldValues, TName>) {
  const id = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      {...props}
      render={({ field, fieldState, formState }) => (
        <FormFieldContext.Provider
          value={{
            name,
            error: fieldState.error,
            formItemId: `${id}-form-item`,
            formDescriptionId: `${id}-form-description`,
            formMessageId: `${id}-form-message`,
          }}
        >
          {children({ field, fieldState, formState })}
        </FormFieldContext.Provider>
      )}
    />
  )
}

// ============ FORM ITEM ============

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, ...props }, ref) => {
    const { layout, size } = useFormContext()

    return (
      <div
        ref={ref}
        className={cn(
          layout === 'horizontal' ? 'grid grid-cols-[200px_1fr] gap-4 items-start' : 'flex flex-col gap-1.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormItem.displayName = 'FormItem'

// ============ FORM LABEL ============

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optional?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, optional, children, ...props }, ref) => {
    const { formItemId, error } = useFormField()
    const { size } = useFormContext()

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          formLabelVariants({ size, required, disabled: props['aria-disabled'] === true }),
          error && 'text-error-base',
          className
        )}
        {...props}
      >
        {children}
        {optional && (
          <span className="ml-1 text-[var(--text-muted)] font-normal">(optional)</span>
        )}
      </label>
    )
  }
)

FormLabel.displayName = 'FormLabel'

// ============ FORM CONTROL ============

interface FormControlProps {
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>
}

const FormControl = ({ children }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return React.cloneElement(children, {
    id: formItemId,
    'aria-describedby': error ? formMessageId : formDescriptionId,
    'aria-invalid': !!error,
  } as React.InputHTMLAttributes<HTMLInputElement>)
}

// ============ FORM DESCRIPTION ============

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()
    const { size } = useFormContext()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn(formDescriptionVariants({ size }), className)}
        {...props}
      />
    )
  }
)

FormDescription.displayName = 'FormDescription'

// ============ FORM MESSAGE ============

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'error' | 'success' | 'warning'
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, variant = 'error', children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const { size } = useFormContext()

    const message = error?.message ?? children

    if (!message) return null

    return (
      <p
        ref={ref}
        id={formMessageId}
        role={variant === 'error' ? 'alert' : undefined}
        className={cn(formMessageVariants({ size, variant }), className)}
        {...props}
      >
        {message}
      </p>
    )
  }
)

FormMessage.displayName = 'FormMessage'

// ============ FORM SECTION ============

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      className,
      title,
      description,
      children,
      collapsible = false,
      defaultCollapsed = false,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
    const { size } = useFormContext()

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)]',
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div
            className={cn(
              'border-b border-[var(--border-default)] px-6 py-4',
              collapsible && 'cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors'
            )}
            onClick={() => collapsible && setCollapsed(!collapsed)}
          >
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
                )}
              </div>
              {collapsible && (
                <svg
                  className={cn(
                    'h-5 w-5 text-[var(--text-muted)] transition-transform',
                    collapsed && '-rotate-90'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>
        )}

        {!collapsed && (
          <div className={cn('p-6', formSectionVariants({ size }))}>
            {children}
          </div>
        )}
      </div>
    )
  }
)

FormSection.displayName = 'FormSection'

// ============ FORM ACTIONS ============

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = 'right', sticky = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formActionsVariants({ align, sticky }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FormActions.displayName = 'FormActions'

// ============ SUBMIT BUTTON ============

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  isSubmitting?: boolean
  loadingText?: string
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ isSubmitting, loadingText = 'Submitting...', children, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="submit"
        disabled={disabled || isSubmitting}
        {...props}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" className="mr-2" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)

SubmitButton.displayName = 'SubmitButton'

// ============ EXPORTS ============

export {
  ControlledField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormActions,
  SubmitButton,
  useFormField,
  formLabelVariants,
  formDescriptionVariants,
  formMessageVariants,
  formActionsVariants,
  formSectionVariants,
}
