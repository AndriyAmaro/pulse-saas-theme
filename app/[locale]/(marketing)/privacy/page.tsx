'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@shared/utils/cn'
import { List, Shield, Mail } from 'lucide-react'

// ============================================================================
// TOC SIDEBAR
// ============================================================================

interface TocItem {
  id: string
  title: string
}

const tocIds = [
  'introduction', 'information-collected', 'how-we-use', 'information-sharing',
  'data-security', 'your-rights', 'cookies', 'third-party',
  'children', 'international', 'changes', 'contact',
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
// PRIVACY PAGE
// ============================================================================

export default function PrivacyPage() {
  const t = useTranslations('privacy')

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
          <path d="M0 450 L360 450 L390 350 L420 550 L450 300 L480 600 L510 450 L1440 450" className="pv-ecg-line" stroke="url(#pv-ecg-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="pv-ecg-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
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
          <path d="M0 300 L125 300 L145 230 L165 370 L185 200 L205 400 L225 300 L500 300" className="pv-ecg-line" stroke="url(#pv-ecg-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="pv-ecg-grad-m" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B89A" stopOpacity="0" />
              <stop offset="20%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#14B89A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14B89A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <style>{`
          .pv-ecg-line {
            stroke-dasharray: 2200;
            stroke-dashoffset: 2200;
            animation: pv-ecg-draw 3s ease-in-out forwards;
          }
          @keyframes pv-ecg-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-500/10">
              <Shield className="h-5 w-5 text-primary-500" />
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
                  At Pulse, created by Andri Amaro (&ldquo;Creator,&rdquo; &ldquo;I,&rdquo; &ldquo;me&rdquo;), your privacy is taken seriously. This Privacy Policy explains how information is collected, used, and safeguarded when you use the Pulse dashboard theme and related services (the &ldquo;Product&rdquo;).
                </p>
                <p>
                  Please read this privacy policy carefully. By using the Service, you consent to the data practices described in this policy. If you do not agree with the terms of this policy, please do not access the Service.
                </p>
              </Section>

              <Section id="information-collected" title={t('s2')}>
                <p>We collect information in several ways:</p>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-4 mb-2">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Name and email address when you create an account</li>
                  <li>Billing information (processed securely via Stripe)</li>
                  <li>Profile information you choose to provide</li>
                  <li>Communications you send to us</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-4 mb-2">Usage Information</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information (hardware model, operating system)</li>
                  <li>Feature usage patterns and preferences</li>
                  <li>Performance metrics and error reports</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-4 mb-2">Data You Upload</h3>
                <p>
                  Any data you upload to the Service for analysis and visualization remains your property. We access it only to provide the Service to you.
                </p>
              </Section>

              <Section id="how-we-use" title={t('s3')}>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Provide, maintain, and improve the Service</li>
                  <li>Process transactions and manage your subscription</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
                  <li>Personalize and improve your experience</li>
                  <li>Send you marketing communications (with your consent)</li>
                </ul>
              </Section>

              <Section id="information-sharing" title={t('s4')}>
                <p>
                  We do not sell, rent, or trade your personal information. We may share information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating the Service (hosting, analytics, payment processing)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
                  <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data that cannot identify you</li>
                </ul>
              </Section>

              <Section id="data-security" title={t('s5')}>
                <p>
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 encryption for data in transit</li>
                  <li>SOC 2 Type II certified infrastructure</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Role-based access controls and multi-factor authentication</li>
                  <li>24/7 infrastructure monitoring and incident response</li>
                </ul>
                <p className="mt-3">
                  While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </Section>

              <Section id="your-rights" title={t('s6')}>
                <p>
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact me at andrifullstackdev@gmail.com. I will respond within 30 days.
                </p>
              </Section>

              <Section id="cookies" title={t('s7')}>
                <p>
                  We use cookies and similar tracking technologies to collect and track information and improve the Service. Types of cookies we use:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use the Service</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (opt-in only)</li>
                </ul>
                <p className="mt-3">
                  You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, some features of the Service may not function properly without cookies.
                </p>
              </Section>

              <Section id="third-party" title={t('s8')}>
                <p>
                  Our Service may contain links to or integrate with third-party services. We use the following categories of third-party services:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Infrastructure:</strong> AWS, Vercel (hosting and compute)</li>
                  <li><strong>Payments:</strong> Stripe (payment processing)</li>
                  <li><strong>Analytics:</strong> Mixpanel (product analytics)</li>
                  <li><strong>Communication:</strong> Intercom (customer support)</li>
                  <li><strong>Email:</strong> SendGrid (transactional emails)</li>
                </ul>
                <p className="mt-3">
                  These services have their own privacy policies. We recommend reviewing them separately.
                </p>
              </Section>

              <Section id="children" title={t('s9')}>
                <p>
                  The Service is not intended for children under the age of 13 (or 16 in the European Economic Area). We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information.
                </p>
                <p>
                  If you believe that a child has provided us with personal information, please contact us immediately.
                </p>
              </Section>

              <Section id="international" title={t('s10')}>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from your country.
                </p>
                <p>
                  When we transfer data internationally, we use appropriate safeguards including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Data Processing Agreements with all sub-processors</li>
                  <li>Adherence to the EU-US Data Privacy Framework</li>
                </ul>
              </Section>

              <Section id="changes" title={t('s11')}>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
                </p>
                <p>
                  For material changes, we will provide additional notice through email or a prominent notice on the Service. Your continued use of the Service after changes constitutes acceptance of the updated policy.
                </p>
              </Section>

              <Section id="contact" title={t('s12')}>
                <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                <div className="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="font-medium text-slate-900 dark:text-white">Andri Amaro</p>
                  <div className="mt-2 space-y-1">
                    <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> andrifullstackdev@gmail.com</p>
                    <p>Brazil (Remote)</p>
                  </div>
                </div>
                <p className="mt-3">
                  For EU residents, you also have the right to lodge a complaint with your local data protection authority.
                </p>
              </Section>

              {/* Footer links */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
                <Link href="/terms" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Terms of Service →
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
