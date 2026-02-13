'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Building2,
  Users,
  Briefcase,
  Clock,
  Shield,
  Share2,
  Edit,
  CheckCircle2,
  Twitter,
  Linkedin,
  Github,
  ExternalLink,
} from 'lucide-react'

import { PageHeader } from '@core/layouts/PageHeader'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Avatar } from '@core/primitives/Avatar'
import { Badge } from '@core/primitives/Badge'
import { Tag, TagGroup } from '@core/primitives/Tag'
import { Divider } from '@core/primitives/Divider'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'
import { cn } from '@shared/utils/cn'

// Mock user data
const userData = {
  name: 'John Doe',
  role: 'Senior Product Designer',
  location: 'San Francisco, CA',
  email: 'john.doe@acme.com',
  phone: '+1 (555) 123-4567',
  birthday: 'March 15, 1992',
  gender: 'Male',
  language: 'English',
  timezone: 'PST (UTC-8)',
  company: 'Acme Inc',
  department: 'Design',
  position: 'Senior Designer',
  startDate: 'January 2022',
  reportsTo: 'Jane Smith',
  employeeId: 'EMP-2847',
  avatar: undefined,
  coverImage: undefined,
  isPro: true,
  isVerified: true,
  stats: {
    projects: 24,
    followers: 1200,
    following: 340,
  },
  bio: 'Passionate product designer with 8+ years of experience creating intuitive and beautiful digital experiences. I believe in user-centered design and data-driven decision making. Currently leading the design system team at Acme Inc.',
  skills: [
    'UI Design',
    'UX Research',
    'Figma',
    'Prototyping',
    'User Testing',
    'Design Systems',
    'Interaction Design',
  ],
  social: {
    website: 'https://johndoe.design',
    twitter: 'johndoe',
    linkedin: 'johndoe',
    github: 'johndoe',
    dribbble: 'johndoe',
  },
}

// Mock activity data
const activityItems: ActivityItem[] = [
  {
    id: '1',
    title: 'Completed project "Dashboard Redesign"',
    description: 'Successfully delivered the new analytics dashboard design.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'success',
  },
  {
    id: '2',
    title: 'Commented on "Mobile App v2.0"',
    description: 'Left feedback on the new onboarding flow designs.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    type: 'info',
  },
  {
    id: '3',
    title: 'Updated profile information',
    description: 'Changed bio and added new skills.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: 'default',
  },
  {
    id: '4',
    title: 'Joined the Design Systems team',
    description: 'Now part of the core design systems initiative.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    type: 'success',
  },
  {
    id: '5',
    title: 'Uploaded new design files',
    description: '15 new component designs added to the library.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    type: 'info',
  },
  {
    id: '6',
    title: 'Received feedback on "Component Library"',
    description: 'Review comments from the development team.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: 'warning',
  },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Info Row Component
function InfoRow({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ElementType
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 py-2', className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-muted)]">
        <Icon className="h-4 w-4 text-[var(--text-muted)]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  )
}

// Social Link Component
function SocialLink({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-[var(--bg-muted)] text-[var(--text-muted)]',
        'transition-all duration-200',
        'hover:bg-primary-100 hover:text-primary-600',
        'dark:hover:bg-primary-900/30 dark:hover:text-primary-400'
      )}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Profile"
        description="View and manage your profile information"
        actions={
          <>
            <Button variant="ghost" size="sm" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />}>
              Edit Profile
            </Button>
          </>
        }
      />

      {/* Profile Hero Card */}
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div
          className={cn(
            'relative h-32 sm:h-40',
            'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500'
          )}
        >
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="relative px-4 pb-6 sm:px-6">
          {/* Avatar */}
          <div className="-mt-12 sm:-mt-16">
            <div className="relative inline-block">
              <Avatar
                src={userData.avatar}
                initials={userData.name}
                size="2xl"
                className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-[var(--bg-base)]"
              />
              {userData.isVerified && (
                <div className="absolute -right-1 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 ring-2 ring-[var(--bg-base)]">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Role */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {userData.name}
                </h2>
                {userData.isPro && (
                  <Badge variant="primary" size="sm">
                    Pro Member
                  </Badge>
                )}
              </div>
              <p className="text-[var(--text-muted)]">{userData.role}</p>
              <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                <MapPin className="h-4 w-4" />
                <span>{userData.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                Follow
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-6 flex items-center gap-6 border-t border-[var(--border-default)] pt-6">
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {userData.stats.projects}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Projects</p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {formatNumber(userData.stats.followers)}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Followers</p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {userData.stats.following}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Following</p>
            </div>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card>
        <Card.Header>
          <Card.Title>About</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {userData.bio}
          </p>

          {/* Skills */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
              Skills
            </h4>
            <TagGroup gap="sm">
              {userData.skills.map((skill) => (
                <Tag key={skill} variant="primary" size="md">
                  {skill}
                </Tag>
              ))}
            </TagGroup>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
              Social Links
            </h4>
            <div className="flex flex-wrap gap-2">
              {userData.social.website && (
                <SocialLink
                  icon={Globe}
                  href={userData.social.website}
                  label="Website"
                />
              )}
              {userData.social.twitter && (
                <SocialLink
                  icon={Twitter}
                  href={`https://twitter.com/${userData.social.twitter}`}
                  label="Twitter"
                />
              )}
              {userData.social.linkedin && (
                <SocialLink
                  icon={Linkedin}
                  href={`https://linkedin.com/in/${userData.social.linkedin}`}
                  label="LinkedIn"
                />
              )}
              {userData.social.github && (
                <SocialLink
                  icon={Github}
                  href={`https://github.com/${userData.social.github}`}
                  label="GitHub"
                />
              )}
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Two Column Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Info */}
        <Card>
          <Card.Header>
            <Card.Title>Personal Information</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-1">
            <InfoRow icon={Mail} label="Email" value={userData.email} />
            <InfoRow icon={Phone} label="Phone" value={userData.phone} />
            <InfoRow icon={Calendar} label="Birthday" value={userData.birthday} />
            <InfoRow icon={Users} label="Gender" value={userData.gender} />
            <InfoRow icon={Globe} label="Language" value={userData.language} />
            <InfoRow icon={Clock} label="Timezone" value={userData.timezone} />
          </Card.Content>
        </Card>

        {/* Work Info */}
        <Card>
          <Card.Header>
            <Card.Title>Work Information</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-1">
            <InfoRow icon={Building2} label="Company" value={userData.company} />
            <InfoRow icon={Users} label="Department" value={userData.department} />
            <InfoRow icon={Briefcase} label="Position" value={userData.position} />
            <InfoRow icon={Calendar} label="Start Date" value={userData.startDate} />
            <InfoRow icon={Users} label="Reports to" value={userData.reportsTo} />
            <InfoRow icon={Shield} label="Employee ID" value={userData.employeeId} />
          </Card.Content>
        </Card>
      </div>

      {/* Activity Section */}
      <Card>
        <Card.Header className="flex flex-row items-center justify-between">
          <Card.Title>Recent Activity</Card.Title>
          <Button variant="link" size="sm" rightIcon={<ExternalLink className="h-3 w-3" />}>
            View All
          </Button>
        </Card.Header>
        <Card.Content>
          <ActivityTimeline items={activityItems} />
        </Card.Content>
      </Card>
    </div>
  )
}
