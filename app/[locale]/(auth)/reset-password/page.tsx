'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { KeyRound, CheckCircle } from 'lucide-react'
import { Button } from '@core/primitives/Button/Button'
import { AuthCard } from '@core/patterns/AuthCard/AuthCard'
import { PasswordInput } from '@core/patterns/PasswordInput/PasswordInput'
import { Link } from '@/i18n/navigation'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [passwordStrength, setPasswordStrength] = React.useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    // Handle password reset submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSuccess(true)
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <AuthCard title={t('passwordResetSuccess')} showLogo>
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
            <CheckCircle className="h-8 w-8 text-success-base" />
          </div>

          {/* Message */}
          <p className="mb-6 text-[var(--text-secondary)] whitespace-pre-line">
            {t('passwordResetSuccessText')}
          </p>

          {/* Continue to Login Button */}
          <Button asChild fullWidth>
            <Link href="/login">{t('continueToLogin')}</Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title={t('setNewPassword')}
      subtitle={t('mustBeAtLeast8')}
    >
      {/* Key Icon */}
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10">
          <KeyRound className="h-7 w-7 text-primary-500" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {t('newPasswordLabel')}
          </label>
          <PasswordInput
            id="password"
            placeholder={t('enterNewPasswordPlaceholder')}
            autoComplete="new-password"
            state={errors.password ? 'error' : 'default'}
            showStrength
            value={password}
            onStrengthChange={setPasswordStrength}
            {...register('password')}
          />
          {errors.password && (
            <p role="alert" className="text-xs text-error-base">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {t('confirmNewPassword')}
          </label>
          <PasswordInput
            id="confirmPassword"
            placeholder={t('confirmNewPasswordPlaceholder')}
            autoComplete="new-password"
            state={errors.confirmPassword ? 'error' : 'default'}
            value={confirmPassword}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p role="alert" className="text-xs text-error-base">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          disabled={passwordStrength < 4}
        >
          {t('resetPassword')}
        </Button>
      </form>

      {/* Back to Login Link */}
      <p className="text-center text-sm text-[var(--text-muted)]">
        {t('rememberYourPassword')}{' '}
        <Link
          href="/login"
          className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          {t('backToLogin')}
        </Link>
      </p>
    </AuthCard>
  )
}
