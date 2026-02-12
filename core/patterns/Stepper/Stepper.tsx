'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '@shared/utils/cn'

const stepperVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

const stepVariants = cva(
  'flex items-center justify-center rounded-full font-medium transition-all duration-150',
  {
    variants: {
      status: {
        pending: [
          'bg-[var(--bg-muted)] text-[var(--text-muted)]',
          'border-2 border-[var(--border-default)]',
        ],
        current: [
          'bg-primary-500 text-white',
          'border-2 border-primary-500',
          'ring-4 ring-primary-500/20',
        ],
        completed: [
          'bg-primary-500 text-white',
          'border-2 border-primary-500',
        ],
        error: [
          'bg-error-base text-white',
          'border-2 border-error-base',
        ],
      },
      size: {
        sm: 'h-7 w-7 text-xs',
        md: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base',
      },
    },
    defaultVariants: {
      status: 'pending',
      size: 'md',
    },
  }
)

const connectorVariants = cva('transition-all duration-300', {
  variants: {
    orientation: {
      horizontal: 'h-0.5 flex-1 min-w-8',
      vertical: 'w-0.5 flex-1 min-h-8 ml-4',
    },
    status: {
      pending: 'bg-[var(--border-default)]',
      completed: 'bg-primary-500',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    status: 'pending',
  },
})

export interface StepItem {
  label: string
  description?: string
  icon?: React.ReactNode
  optional?: boolean
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  steps: StepItem[]
  currentStep: number
  onStepClick?: (step: number) => void
  showStepNumber?: boolean
  allowClickOnCompleted?: boolean
  errorSteps?: number[]
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      orientation = 'horizontal',
      size = 'md',
      steps,
      currentStep,
      onStepClick,
      showStepNumber = true,
      allowClickOnCompleted = true,
      errorSteps = [],
      ...props
    },
    ref
  ) => {
    const getStepStatus = (index: number) => {
      if (errorSteps.includes(index)) return 'error'
      if (index < currentStep) return 'completed'
      if (index === currentStep) return 'current'
      return 'pending'
    }

    const handleStepClick = (index: number) => {
      if (!onStepClick) return
      const status = getStepStatus(index)
      if (status === 'completed' && allowClickOnCompleted) {
        onStepClick(index)
      }
      if (status === 'current' || status === 'error') {
        onStepClick(index)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        role="navigation"
        aria-label="Progress"
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const isClickable =
            onStepClick &&
            (status === 'current' ||
              status === 'error' ||
              (status === 'completed' && allowClickOnCompleted))

          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  'flex items-center',
                  orientation === 'vertical' && 'flex-col items-start',
                  orientation === 'horizontal' && 'flex-col'
                )}
              >
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    stepVariants({ status, size }),
                    isClickable && 'cursor-pointer hover:opacity-80',
                    !isClickable && 'cursor-default'
                  )}
                  aria-current={status === 'current' ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                >
                  {status === 'completed' ? (
                    <Check className={size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
                  ) : step.icon ? (
                    step.icon
                  ) : showStepNumber ? (
                    index + 1
                  ) : null}
                </button>

                <div
                  className={cn(
                    'mt-2 text-center',
                    orientation === 'vertical' && 'ml-3 mt-0 text-left'
                  )}
                >
                  <p
                    className={cn(
                      'font-medium',
                      size === 'sm' && 'text-xs',
                      size === 'md' && 'text-sm',
                      size === 'lg' && 'text-base',
                      status === 'current' && 'text-primary-500',
                      status === 'completed' && 'text-[var(--text-primary)]',
                      status === 'pending' && 'text-[var(--text-muted)]',
                      status === 'error' && 'text-error-base'
                    )}
                  >
                    {step.label}
                    {step.optional && (
                      <span className="ml-1 text-[var(--text-muted)] font-normal">
                        (Optional)
                      </span>
                    )}
                  </p>
                  {step.description && (
                    <p
                      className={cn(
                        'text-[var(--text-muted)]',
                        size === 'sm' && 'text-xs',
                        size === 'md' && 'text-xs',
                        size === 'lg' && 'text-sm'
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    connectorVariants({
                      orientation,
                      status: index < currentStep ? 'completed' : 'pending',
                    })
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)

Stepper.displayName = 'Stepper'

export { Stepper, stepperVariants, stepVariants, connectorVariants }
