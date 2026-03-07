'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { List, FileText, Mail } from 'lucide-react'

// ============================================================================
// TOC SIDEBAR (Inline)
// ============================================================================

interface TocItem {
  id: string
  title: string
}

const tocIds = [
  'introduction', 'acceptance', 'description', 'accounts', 'conduct',
  'intellectual-property', 'payment', 'termination', 'disclaimers',
  'liability', 'governing-law', 'changes', 'contact',
]

const TocSidebar = ({ tocTitle, items }: { tocTitle: string; items: TocItem[] }) => {
  const [activeId, setActiveId] = React.useState('')

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(item.id)
          })
        },
        { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
    }
  }

  return (
    <nav className="hidden lg:block sticky top-24 shrink-0 w-64">
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <List className="h-4 w-4 text-primary-500" />
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{tocTitle}</h4>
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'flex items-center gap-2 py-1.5 pl-3 text-[13px] rounded-md transition-all duration-200',
                  activeId === item.id
                    ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
              >
                <span className={cn('w-1 h-1 rounded-full shrink-0', activeId === item.id ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600')} />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ============================================================================
// SECTION COMPONENT
// ============================================================================

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
      {children}
    </div>
  </section>
)

// ============================================================================
// TERMS PAGE
// ============================================================================

export default function TermsPage() {
  const t = useTranslations('terms')

  const tocItems: TocItem[] = tocIds.map((id, i) => ({
    id,
    title: t(`s${i + 1}`),
  }))

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-x-clip">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-x-16 inset-y-0 opacity-20 dark:opacity-30 bg-no-repeat bg-center bg-cover md:inset-x-0 md:opacity-30 md:dark:opacity-40" style={{ backgroundImage: 'url(/fundo-blackground.png)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/70" />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        {/* ECG heartbeat — Desktop */}
        <svg className="hidden md:block absolute inset-0 z-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 450 L360 450 L390 350 L420 550 L450 300 L480 600 L510 450 L1440 450" className="tm-ecg-line" stroke="url(#tm-ecg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="tm-ecg-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
              <stop offset="15%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {/* ECG heartbeat — Mobile */}
        <svg className="md:hidden absolute inset-0 z-0 w-full h-full" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300 L125 300 L145 230 L165 370 L185 200 L205 400 L225 300 L500 300" className="tm-ecg-line" stroke="url(#tm-ecg-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="tm-ecg-grad-m" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
              <stop offset="20%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <style>{`
          .tm-ecg-line {
            stroke-dasharray: 2200;
            stroke-dashoffset: 2200;
            animation: tm-ecg-draw 3s ease-in-out forwards;
          }
          @keyframes tm-ecg-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10">
              <FileText className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                {t('title').split(' ').slice(0, -1).join(' ')}{' '}
                <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-cyan-600 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                  {t('title').split(' ').slice(-1)}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{t('lastUpdated')}: February 1, 2026</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>{t('version')} 2.0</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-16">
            <TocSidebar tocTitle={t('toc')} items={tocItems} />

            <div className="flex-1 min-w-0 max-w-3xl">
              <Section id="introduction" title={t('s1')}>
                <p>
                  Welcome to Pulse (&ldquo;Theme,&rdquo; &ldquo;Product&rdquo;), created by Andri Amaro (&ldquo;Creator,&rdquo; &ldquo;I,&rdquo; &ldquo;me&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Pulse dashboard theme, including any related assets, components, and documentation (collectively, the &ldquo;Product&rdquo;).
                </p>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
              </Section>

              <Section id="acceptance" title={t('s2')}>
                <p>
                  By creating an account, accessing, or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are using the Service on behalf of an organization, you represent and warrant that you have authority to bind that organization to these Terms.
                </p>
                <p>
                  You must be at least 18 years of age or the age of majority in your jurisdiction to use the Service. By using the Service, you represent and warrant that you meet this requirement.
                </p>
              </Section>

              <Section id="description" title={t('s3')}>
                <p>
                  Pulse is a premium dashboard theme for React/Next.js that provides a comprehensive set of components and templates. The Product includes, but is not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Interactive dashboard creation and management</li>
                  <li>Data visualization tools and chart components</li>
                  <li>Real-time collaboration features</li>
                  <li>AI-powered insights and analytics</li>
                  <li>API access for integrations</li>
                  <li>Data import and export functionality</li>
                </ul>
              </Section>

              <Section id="accounts" title={t('s4')}>
                <p>
                  To access certain features of the Service, you must register for an account. When you register, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and accept responsibility for all activities under your account</li>
                  <li>Immediately notify us of any unauthorized use of your account</li>
                </ul>
                <p className="mt-3">
                  We reserve the right to suspend or terminate accounts that violate these Terms or that have been inactive for an extended period.
                </p>
              </Section>

              <Section id="conduct" title={t('s5')}>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Upload or transmit viruses, malware, or other malicious code</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the integrity or performance of the Service</li>
                  <li>Collect or harvest user data without consent</li>
                  <li>Use the Service for any illegal, harmful, or fraudulent purpose</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                </ul>
              </Section>

              <Section id="intellectual-property" title={t('s6')}>
                <p>
                  The Product and its original content, design, components, and functionality are created by Andri Amaro and are protected by international copyright and other intellectual property laws.
                </p>
                <p>
                  You retain ownership of any data and content you upload to the Service. By uploading content, you grant us a limited license to use, store, and process that content solely for the purpose of providing the Service to you.
                </p>
              </Section>

              <Section id="payment" title={t('s7')}>
                <p>
                  Certain features of the Service require a paid subscription. By subscribing to a paid plan, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Pay all applicable fees as described at the time of purchase</li>
                  <li>Provide valid payment information and authorize recurring charges</li>
                  <li>Accept that fees are non-refundable except as required by law or our refund policy</li>
                </ul>
                <p className="mt-3">
                  We reserve the right to change our pricing with 30 days&apos; notice. Price changes will not affect current billing periods.
                </p>
              </Section>

              <Section id="termination" title={t('s8')}>
                <p>
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we determine violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. You may export your data within 30 days of termination. After 30 days, we reserve the right to delete your data.
                </p>
              </Section>

              <Section id="disclaimers" title={t('s9')}>
                <p>
                  THE PRODUCT IS PROVIDED ON AN &ldquo;AS IS&rdquo; BASIS. THE CREATOR EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that the Service will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.
                </p>
              </Section>

              <Section id="liability" title={t('s10')}>
                <p>
                  IN NO EVENT SHALL THE CREATOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p>
                  Our total liability for all claims related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </Section>

              <Section id="governing-law" title={t('s11')}>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Brazil. Any disputes arising under these Terms shall be subject to the jurisdiction of Brazilian courts.
                </p>
              </Section>

              <Section id="changes" title={t('s12')}>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms.
                </p>
              </Section>

              <Section id="contact" title={t('s13')}>
                <p>If you have any questions about these Terms, please contact us:</p>
                <div className="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="font-medium text-slate-900 dark:text-white">Andri Amaro</p>
                  <div className="mt-2 space-y-1">
                    <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> andrifullstackdev@gmail.com</p>
                    <p>Brazil (Remote)</p>
                  </div>
                </div>
              </Section>

              {/* Footer links */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
                <Link href="/privacy" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Privacy Policy →
                </Link>
                <Link href="/contact" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
