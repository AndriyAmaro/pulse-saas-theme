'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Button } from '@core/primitives/Button'
import { ProgressBar } from '@core/patterns/ProgressBar'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from 'lucide-react'

// ============================================================================
// CVA Variants
// ============================================================================

const wizardVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      card: 'rounded-2xl border border-[var(--border-default)] bg-[var(--bg-base)] p-6 shadow-sm',
      minimal: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const stepsIndicatorVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row justify-between',
      vertical: 'flex-col items-start',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const stepItemVariants = cva(
  'relative flex items-center gap-3 transition-colors',
  {
    variants: {
      orientation: {
        horizontal: 'flex-col text-center',
        vertical: 'flex-row text-left py-4',
      },
      status: {
        completed: 'text-[var(--primary-500)]',
        current: 'text-[var(--primary-500)]',
        upcoming: 'text-[var(--text-muted)]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      status: 'upcoming',
    },
  }
)

const stepCircleVariants = cva(
  'relative z-10 flex items-center justify-center rounded-full border-2 font-semibold transition-all',
  {
    variants: {
      status: {
        completed:
          'border-[var(--primary-500)] bg-[var(--primary-500)] text-white',
        current:
          'border-[var(--primary-500)] bg-[var(--bg-base)] text-[var(--primary-500)] ring-4 ring-[var(--primary-500)]/20',
        upcoming:
          'border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-muted)]',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
)

const wizardConnectorVariants = cva('bg-[var(--border-default)] transition-colors', {
  variants: {
    orientation: {
      horizontal: 'h-0.5 flex-1',
      vertical: 'absolute left-5 top-14 h-[calc(100%-3.5rem)] w-0.5',
    },
    completed: {
      true: 'bg-[var(--primary-500)]',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    completed: false,
  },
})

const contentVariants = cva('transition-all', {
  variants: {
    animation: {
      fade: 'data-[state=entering]:animate-in data-[state=entering]:fade-in data-[state=exiting]:animate-out data-[state=exiting]:fade-out',
      slide:
        'data-[state=entering]:animate-in data-[state=entering]:slide-in-from-right data-[state=exiting]:animate-out data-[state=exiting]:slide-out-to-left',
      none: '',
    },
  },
  defaultVariants: {
    animation: 'fade',
  },
})

// ============================================================================
// Types
// ============================================================================

export type StepStatus = 'completed' | 'current' | 'upcoming'

export interface WizardStep {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  content?: React.ReactNode
  optional?: boolean
  validator?: () => boolean | Promise<boolean>
}

export interface OnboardingWizardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof wizardVariants> {
  steps: WizardStep[]
  currentStep?: number
  onChange?: (step: number) => void
  onComplete?: () => void
  onSkip?: (step: WizardStep) => void
  showProgress?: boolean
  showSkip?: boolean
  showStepNumbers?: boolean
  orientation?: 'horizontal' | 'vertical'
  circleSize?: 'sm' | 'md' | 'lg'
  animation?: 'fade' | 'slide' | 'none'
  backLabel?: string
  nextLabel?: string
  skipLabel?: string
  finishLabel?: string
  allowStepClick?: boolean
}

export interface StepsIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepsIndicatorVariants> {
  steps: WizardStep[]
  currentStep: number
  showNumbers?: boolean
  circleSize?: 'sm' | 'md' | 'lg'
  onStepClick?: (index: number) => void
  allowClick?: boolean
}

// ============================================================================
// Sub Components
// ============================================================================

// Steps Indicator Component
const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      steps,
      currentStep,
      showNumbers = true,
      circleSize = 'md',
      onStepClick,
      allowClick = false,
      ...props
    },
    ref
  ) => {
    const getStatus = (index: number): StepStatus => {
      if (index < currentStep) return 'completed'
      if (index === currentStep) return 'current'
      return 'upcoming'
    }

    return (
      <div
        ref={ref}
        className={cn(stepsIndicatorVariants({ orientation }), className)}
        role="list"
        aria-label="Progress steps"
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStatus(index)
          const Icon = step.icon
          const isClickable = allowClick && index < currentStep

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div
                className={cn(
                  stepItemVariants({ orientation, status }),
                  isClickable && 'cursor-pointer'
                )}
                onClick={() => isClickable && onStepClick?.(index)}
                role="listitem"
                aria-current={status === 'current' ? 'step' : undefined}
              >
                {/* Step Circle */}
                <div className={cn(stepCircleVariants({ status, size: circleSize }))}>
                  {status === 'completed' ? (
                    <Check size={circleSize === 'sm' ? 14 : circleSize === 'lg' ? 20 : 16} />
                  ) : Icon ? (
                    <Icon size={circleSize === 'sm' ? 14 : circleSize === 'lg' ? 20 : 16} />
                  ) : showNumbers ? (
                    index + 1
                  ) : null}
                </div>

                {/* Step Info */}
                <div
                  className={cn(
                    orientation === 'horizontal'
                      ? 'mt-2'
                      : 'flex-1'
                  )}
                >
                  <div
                    className={cn(
                      'font-medium',
                      status === 'current'
                        ? 'text-[var(--text-primary)]'
                        : status === 'completed'
                        ? 'text-[var(--primary-500)]'
                        : 'text-[var(--text-muted)]',
                      orientation === 'horizontal' ? 'text-sm' : 'text-base'
                    )}
                  >
                    {step.title}
                    {step.optional && (
                      <span className="ml-1 text-xs text-[var(--text-muted)]">
                        (Optional)
                      </span>
                    )}
                  </div>
                  {step.description && orientation === 'vertical' && (
                    <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Vertical Connector */}
                {orientation === 'vertical' && index < steps.length - 1 && (
                  <div
                    className={cn(
                      wizardConnectorVariants({
                        orientation,
                        completed: index < currentStep,
                      })
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Horizontal Connector */}
              {orientation === 'horizontal' && index < steps.length - 1 && (
                <div
                  className={cn(
                    wizardConnectorVariants({
                      orientation,
                      completed: index < currentStep,
                    }),
                    'mx-4'
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

StepsIndicator.displayName = 'StepsIndicator'

// ============================================================================
// Main OnboardingWizard Component
// ============================================================================

const OnboardingWizard = React.forwardRef<HTMLDivElement, OnboardingWizardProps>(
  (
    {
      className,
      variant = 'default',
      steps,
      currentStep: controlledStep,
      onChange,
      onComplete,
      onSkip,
      showProgress = true,
      showSkip = true,
      showStepNumbers = true,
      orientation = 'horizontal',
      circleSize = 'md',
      animation = 'fade',
      backLabel = 'Back',
      nextLabel = 'Next',
      skipLabel = 'Skip',
      finishLabel = 'Finish',
      allowStepClick = true,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = React.useState(0)
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [animationState, setAnimationState] = React.useState<
      'idle' | 'entering' | 'exiting'
    >('idle')

    const currentStep = controlledStep ?? internalStep
    const totalSteps = steps.length
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === totalSteps - 1
    const activeStep = steps[currentStep]
    const progress = ((currentStep + 1) / totalSteps) * 100

    const goToStep = React.useCallback(
      async (newStep: number) => {
        if (newStep < 0 || newStep >= totalSteps || isAnimating) return

        // Validate current step before moving forward
        if (newStep > currentStep && activeStep?.validator) {
          const isValid = await activeStep.validator()
          if (!isValid) return
        }

        // Animation
        if (animation !== 'none') {
          setIsAnimating(true)
          setAnimationState('exiting')
          await new Promise((resolve) => setTimeout(resolve, 150))
        }

        if (onChange) {
          onChange(newStep)
        } else {
          setInternalStep(newStep)
        }

        if (animation !== 'none') {
          setAnimationState('entering')
          await new Promise((resolve) => setTimeout(resolve, 150))
          setAnimationState('idle')
          setIsAnimating(false)
        }
      },
      [currentStep, totalSteps, isAnimating, animation, onChange, activeStep]
    )

    const handleBack = () => {
      if (!isFirstStep) {
        goToStep(currentStep - 1)
      }
    }

    const handleNext = async () => {
      if (isLastStep) {
        // Validate last step before completing
        if (activeStep?.validator) {
          const isValid = await activeStep.validator()
          if (!isValid) return
        }
        onComplete?.()
      } else {
        goToStep(currentStep + 1)
      }
    }

    const handleSkip = () => {
      if (activeStep?.optional && !isLastStep) {
        onSkip?.(activeStep)
        goToStep(currentStep + 1)
      }
    }

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        handleBack()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape' && activeStep?.optional) {
        handleSkip()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(wizardVariants({ variant }), className)}
        role="region"
        aria-label="Onboarding wizard"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        {...props}
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-6">
            <ProgressBar
              value={progress}
              showValue={false}
              size="sm"
              variant="default"
            />
            <p className="mt-2 text-right text-sm text-[var(--text-muted)]">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
        )}

        {/* Steps Indicator */}
        <StepsIndicator
          steps={steps}
          currentStep={currentStep}
          orientation={orientation}
          showNumbers={showStepNumbers}
          circleSize={circleSize}
          allowClick={allowStepClick}
          onStepClick={goToStep}
          className="mb-8"
        />

        {/* Step Content */}
        <div
          className={cn(contentVariants({ animation }))}
          data-state={animationState}
        >
          {/* Step Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {activeStep?.title}
            </h2>
            {activeStep?.description && (
              <p className="mt-2 text-[var(--text-secondary)]">
                {activeStep.description}
              </p>
            )}
          </div>

          {/* Step Content */}
          <div className="min-h-[200px]">{activeStep?.content}</div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-[var(--border-default)] pt-6">
          <div>
            {!isFirstStep && (
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isAnimating}
              >
                <ChevronLeft size={18} className="mr-1" />
                {backLabel}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {showSkip && activeStep?.optional && !isLastStep && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={isAnimating}
              >
                {skipLabel}
              </Button>
            )}

            <Button onClick={handleNext} disabled={isAnimating}>
              {isLastStep ? finishLabel : nextLabel}
              {!isLastStep && <ChevronRight size={18} className="ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

OnboardingWizard.displayName = 'OnboardingWizard'

export {
  OnboardingWizard,
  StepsIndicator,
  wizardVariants,
  stepsIndicatorVariants,
  stepItemVariants,
  stepCircleVariants,
  wizardConnectorVariants,
  contentVariants,
}
