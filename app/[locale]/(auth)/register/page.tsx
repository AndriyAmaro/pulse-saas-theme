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
import { PasswordInput } from '@core/patterns/PasswordInput/PasswordInput'
import { Link } from '@/i18n/navigation'

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
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
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = React.useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const acceptTerms = watch('acceptTerms')
  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    console.log('Register data:', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)
    console.log('Social login:', provider)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSocialLoading(null)
  }

  return (
    <AuthCard
      title={t('createAnAccount')}
      subtitle={t('startFreeTrial')}
      footer={
        <AuthLink
          text={t('alreadyHaveAccount')}
          linkText={t('signIn')}
          href="/login"
        />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {t('fullName')}
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder={t('namePlaceholder')}
            autoComplete="name"
            state={errors.fullName ? 'error' : 'default'}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p role="alert" className="text-xs text-error-base">{errors.fullName.message}</p>
          )}
        </div>

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

        {/* Password Field with Strength Indicator */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {t('password')}
          </label>
          <PasswordInput
            id="password"
            placeholder={t('createPasswordPlaceholder')}
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
            {t('confirmPassword')}
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder={t('confirmPasswordPlaceholder')}
            autoComplete="new-password"
            state={errors.confirmPassword ? 'error' : 'default'}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p role="alert" className="text-xs text-error-base">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onCheckedChange={(checked) =>
                setValue('acceptTerms', checked === true)
              }
              variant={errors.acceptTerms ? 'error' : 'default'}
              className="mt-0.5"
            />
            <label
              htmlFor="acceptTerms"
              className="text-sm text-[var(--text-secondary)] cursor-pointer leading-relaxed"
            >
              {t('termsAgree')}{' '}
              <Link
                href="/terms"
                className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                {t('termsOfService')}
              </Link>{' '}
              {t('and')}{' '}
              <Link
                href="/privacy"
                className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                {t('privacyPolicy')}
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p role="alert" className="text-xs text-error-base">
              {errors.acceptTerms.message}
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
          {t('createAccount')}
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
