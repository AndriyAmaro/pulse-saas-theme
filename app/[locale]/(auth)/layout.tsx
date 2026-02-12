'use client'

import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { ThemeToggle } from '@core/primitives/ThemeToggle/ThemeToggle'
import { LanguageSwitcher } from '@core/patterns/LanguageSwitcher'
import { PulseLogo } from '@core/primitives/PulseLogo'
import { AuthBackground } from '@core/patterns/AuthBackground'

function AuthEcgIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="auth-ecg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
        <linearGradient id="auth-ecg-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="50%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect
        width="56"
        height="56"
        rx="16"
        fill="url(#auth-ecg-bg)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />
      <path
        d="M12 28H18L22 16L28 40L32 22L36 28H44"
        stroke="url(#auth-ecg-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form Area */}
      <div className="relative flex w-full flex-col lg:w-[45%]">
        {/* Header */}
        <header className="flex items-center justify-between p-6 lg:p-8">
          <Link href="/" className="flex items-center">
            <PulseLogo variant="full" />
          </Link>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Form Content */}
        <main className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-12">
          <div className="w-full max-w-[400px]">{children}</div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-sm text-[var(--text-muted)] lg:p-8">
          <p>
            &copy; {new Date().getFullYear()} Pulse. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Right Side - Premium Branding Area */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-[55%] lg:flex-col">
        <AuthBackground />

        <div className="relative z-10 flex flex-1 flex-col justify-between px-10 py-12 xl:px-16">
          {/* Main Content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center text-white">
            {/* Premium Logo Icon */}
            <div className="mb-8 xl:mb-10">
              <AuthEcgIcon className="h-16 w-16 drop-shadow-lg xl:h-20 xl:w-20" />
            </div>

            {/* Brand Name — large elegant typography */}
            <h1 className="mb-2 text-5xl font-bold tracking-tight xl:text-6xl">
              Pulse
            </h1>

            {/* Tagline — with subtle separator */}
            <div className="mb-8 flex items-center gap-3 xl:mb-10">
              <span className="h-px w-8 bg-white/30" />
              <p className="text-lg font-light tracking-[0.15em] uppercase text-white/80 xl:text-xl">
                Data that breathes
              </p>
              <span className="h-px w-8 bg-white/30" />
            </div>

            {/* Description */}
            <p className="mb-10 max-w-sm text-base leading-relaxed text-white/80 xl:mb-12 xl:max-w-md xl:text-lg">
              Transform your analytics experience with real-time insights,
              beautiful visualizations, and powerful data management tools.
            </p>

            {/* Feature highlights — premium glassmorphism cards */}
            <div className="flex gap-5 xl:gap-6">
              {/* Real-time */}
              <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.1] to-white/[0.03] px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md xl:px-7 xl:py-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/15 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] xl:h-14 xl:w-14">
                  <svg
                    className="h-6 w-6 text-white/90 xl:h-7 xl:w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="relative text-sm font-medium tracking-wide text-white/80 xl:text-base">
                  Real-time
                </span>
              </div>

              {/* Analytics */}
              <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.1] to-white/[0.03] px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md xl:px-7 xl:py-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/15 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] xl:h-14 xl:w-14">
                  <svg
                    className="h-6 w-6 text-white/90 xl:h-7 xl:w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="relative text-sm font-medium tracking-wide text-white/80 xl:text-base">
                  Analytics
                </span>
              </div>

              {/* Secure */}
              <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.1] to-white/[0.03] px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md xl:px-7 xl:py-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/15 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] xl:h-14 xl:w-14">
                  <svg
                    className="h-6 w-6 text-white/90 xl:h-7 xl:w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="relative text-sm font-medium tracking-wide text-white/80 xl:text-base">
                  Secure
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial — premium glassmorphism card */}
          <div className="mt-8 flex-shrink-0">
            <blockquote className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md xl:p-8">
              {/* Quote mark */}
              <svg
                className="mb-3 h-7 w-7 text-white/15 xl:mb-4 xl:h-8 xl:w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <p className="mb-5 text-base leading-relaxed text-white/70 xl:text-lg">
                Pulse has completely transformed how we understand our
                data. The insights are incredible.
              </p>
              <footer className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-gradient-to-br from-white/15 to-white/5 text-sm font-semibold text-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] xl:h-12 xl:w-12">
                  AA
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic text-white/90 xl:text-base">
                    Adri Amaro
                  </cite>
                  <p className="text-xs tracking-wide text-white/45 xl:text-sm">
                    CEO at TechFlow
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
