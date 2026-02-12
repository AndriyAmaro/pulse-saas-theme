'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { Twitter, Linkedin } from 'lucide-react'

export interface TeamMember {
  name: string
  role: string
  bio: string
  avatar?: string
  initials?: string
  socials?: {
    twitter?: string
    linkedin?: string
  }
}

export interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  member: TeamMember
}

export const teamMemberCardVariants = cva(
  'group relative overflow-hidden rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1'
)

export const TeamMemberCard = React.forwardRef<HTMLDivElement, TeamMemberCardProps>(
  ({ member, className, ...props }, ref) => {
    const initials = member.initials || member.name.split(' ').map(n => n[0]).join('')

    return (
      <div ref={ref} className={cn(teamMemberCardVariants(), className)} {...props}>
        <div className="h-24 bg-gradient-to-br from-primary-500/10 via-primary-400/5 to-accent-500/10 dark:from-primary-500/20 dark:via-primary-400/10 dark:to-accent-500/20" />
        <div className="flex justify-center -mt-12">
          <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {initials}
          </div>
        </div>
        <div className="px-5 pt-4 pb-5 text-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{member.name}</h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-0.5">{member.role}</p>
          <div className="mt-3 overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{member.bio}</p>
          </div>
          {member.socials && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {member.socials.twitter && (
                <a href={member.socials.twitter} className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label={`${member.name} on Twitter`}>
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label={`${member.name} on LinkedIn`}>
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

TeamMemberCard.displayName = 'TeamMemberCard'
