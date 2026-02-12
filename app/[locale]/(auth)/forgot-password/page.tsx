'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@core/primitives/Button/Button'
import { Input } from '@core/primitives/Input/Input'
import { AuthCard } from '@core/patterns/AuthCard/AuthCard'
import { Link } from '@/i18n/navigation'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [submittedEmail, setSubmittedEmail] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    console.log('Forgot password:', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmittedEmail(data.email)
    setIsSuccess(true)
    setIsLoading(false)
  }

  const handleResend = async () => {
    setIsLoading(true)
    console.log('Resending to:', submittedEmail)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <AuthCard title={t('checkYourEmail')} showLogo>
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
            <CheckCircle className="h-8 w-8 text-success-base" />
          </div>

          {/* Message */}
          <p className="mb-2 text-[var(--text-secondary)]">
            {t('weSentResetLink')}
          </p>
          <p className="mb-6 font-medium text-[var(--text-primary)]">
            {submittedEmail}
          </p>

          {/* Back to Login Button */}
          <Button asChild fullWidth className="mb-4">
            <Link href="/login">{t('backToLogin')}</Link>
          </Button>

          {/* Resend Link */}
          <p className="text-sm text-[var(--text-muted)]">
            {t('didntReceiveEmail')}{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="font-medium text-primary-500 hover:text-primary-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? t('sending') : t('clickToResend')}
            </button>
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title={t('forgotPasswordTitle')}
      subtitle={t('forgotPasswordSubtitle')}
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToLogin')}
        </Link>
      }
    >
      {/* Email Icon */}
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10">
          <Mail className="h-7 w-7 text-primary-500" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {t('email')}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t('enterEmailPlaceholder')}
            autoComplete="email"
            state={errors.email ? 'error' : 'default'}
            {...register('email')}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-error-base">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth loading={isLoading}>
          {t('sendResetLink')}
        </Button>
      </form>
    </AuthCard>
  )
}
