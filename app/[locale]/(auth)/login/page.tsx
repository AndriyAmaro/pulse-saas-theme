'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { Button } from '@core/primitives/Button/Button'
import { Input } from '@core/primitives/Input/Input'
import { Checkbox } from '@core/primitives/Checkbox/Checkbox'
import { AuthCard, AuthDivider, AuthLink } from '@core/patterns/AuthCard/AuthCard'
import { SocialLoginButtons } from '@core/patterns/SocialLoginButtons/SocialLoginButtons'
import { Link } from '@/i18n/navigation'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const rememberMe = watch('rememberMe')

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    // Handle login submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)
    // Handle social login
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSocialLoading(null)
  }

  return (
    <AuthCard
      title={t('welcomeBack')}
      subtitle={t('enterCredentials')}
      footer={
        <AuthLink
          text={t('dontHaveAccount')}
          linkText={t('signUp')}
          href="/register"
        />
      }
    >
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
            placeholder={t('emailPlaceholder')}
            autoComplete="email"
            state={errors.email ? 'error' : 'default'}
            {...register('email')}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-error-base">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text-primary)]"
            >
              {t('password')}
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              {t('forgotPassword')}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder={t('enterPasswordPlaceholder')}
            autoComplete="current-password"
            state={errors.password ? 'error' : 'default'}
            {...register('password')}
          />
          {errors.password && (
            <p role="alert" className="text-xs text-error-base">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue('rememberMe', checked === true)}
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-[var(--text-secondary)] cursor-pointer"
          >
            {t('rememberMe')}
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth loading={isLoading}>
          {t('signIn')}
        </Button>
      </form>

      {/* Divider */}
      <AuthDivider text={t('orContinueWith')} />

      {/* Social Login */}
      <SocialLoginButtons
        providers={['google', 'github', 'apple']}
        onProviderClick={handleSocialLogin}
        loading={socialLoading as 'google' | 'github' | 'apple' | null}
        disabled={isLoading}
      />
    </AuthCard>
  )
}
