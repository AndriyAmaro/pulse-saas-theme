'use client'

import * as React from 'react'
import {
  BookOpen,
  Trophy,
  Clock,
  CheckCircle2,
  Award,
  Flame,
  Star,
  Play,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Target,
  GraduationCap,
  FileText
} from 'lucide-react'

import { PageHeader } from '@core/layouts/PageHeader'
import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { DataTable } from '@core/organisms/DataTable'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { LeaderboardList } from '@core/patterns/LeaderboardList'
import { MiniCalendar } from '@core/patterns/MiniCalendar'
import { HeatmapCalendar } from '@core/patterns/HeatmapCalendar'
import { RatingStars } from '@core/patterns/RatingStars'
import { CourseCard } from '@core/patterns/CourseCard'
import { CertificateCard } from '@core/patterns/CertificateCard'
import { AchievementBadge } from '@core/patterns/AchievementBadge'
import { Skeleton } from '@core/primitives/Skeleton'

// Learning Stats
const learningStats = {
  overallProgress: 67,
  coursesEnrolled: 8,
  coursesCompleted: 5,
  coursesInProgress: 3,
  certificates: 4,
  streak: 12,
  xpPoints: 4280,
  totalHours: 124,
  lessonsCompleted: 187,
  quizzesPassed: 34,
}

// Continue Learning Courses
const inProgressCourses = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    instructor: { name: 'Sarah Chen' },
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    duration: '12h',
    remainingTime: '3h remaining',
    category: 'development' as const,
    status: 'in-progress' as const,
    thumbnailGradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    instructor: { name: 'Dr. Michael Brown' },
    progress: 45,
    totalLessons: 36,
    completedLessons: 16,
    duration: '24h',
    remainingTime: '13h remaining',
    category: 'data-science' as const,
    status: 'in-progress' as const,
    thumbnailGradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 3,
    title: 'UX Design Masterclass',
    instructor: { name: 'Emma Wilson' },
    progress: 92,
    totalLessons: 18,
    completedLessons: 17,
    duration: '8h',
    remainingTime: '45m remaining',
    category: 'design' as const,
    status: 'in-progress' as const,
    thumbnailGradient: 'from-pink-500 to-rose-600',
  },
]

// Achievements Data
const achievements = [
  { type: 'first-course' as const, title: 'First Course', tier: 'gold' as const, earned: true },
  { type: 'streak-7' as const, title: '7 Day Streak', tier: 'bronze' as const, earned: true },
  { type: 'streak-30' as const, title: '30 Day Streak', tier: 'silver' as const, earned: false, progress: 40 },
  { type: 'quiz-master' as const, title: 'Quiz Master', tier: 'gold' as const, earned: true },
  { type: 'night-owl' as const, title: 'Night Owl', tier: 'bronze' as const, earned: true },
  { type: 'bookworm' as const, title: 'Bookworm', tier: 'silver' as const, earned: true },
  { type: 'fast-learner' as const, title: 'Fast Learner', tier: 'platinum' as const, earned: false, progress: 75 },
  { type: 'perfectionist' as const, title: 'Perfectionist', tier: 'legendary' as const, earned: false, locked: true },
]

// Certificates Data
const certificates = [
  {
    courseName: 'React Developer Certification',
    issueDate: 'January 2026',
    credentialId: 'RC-2026-1234',
    instructorName: 'Sarah Chen',
    skills: ['React', 'Hooks', 'Redux', 'Testing'],
    variant: 'gold' as const,
  },
  {
    courseName: 'Python for Data Science',
    issueDate: 'December 2025',
    credentialId: 'PY-2025-5678',
    instructorName: 'Dr. Michael Brown',
    skills: ['Python', 'Pandas', 'NumPy'],
    variant: 'default' as const,
  },
]

// Recommended Courses
const recommendedCourses = [
  {
    title: 'Node.js Backend Development',
    instructor: { name: 'James Miller' },
    rating: 4.8,
    studentsEnrolled: 15420,
    totalLessons: 28,
    duration: '16h',
    category: 'development' as const,
    isPopular: true,
  },
  {
    title: 'Machine Learning A-Z',
    instructor: { name: 'Dr. Andrew Liu' },
    rating: 4.9,
    studentsEnrolled: 45600,
    totalLessons: 42,
    duration: '32h',
    category: 'data-science' as const,
    isNew: true,
  },
  {
    title: 'Digital Marketing Strategy',
    instructor: { name: 'Lisa Johnson' },
    rating: 4.6,
    studentsEnrolled: 8900,
    totalLessons: 20,
    duration: '10h',
    category: 'marketing' as const,
  },
  {
    title: 'UI Animation with Framer',
    instructor: { name: 'Alex Rivera' },
    rating: 4.7,
    studentsEnrolled: 6200,
    totalLessons: 15,
    duration: '6h',
    category: 'design' as const,
    isNew: true,
  },
]

// Leaderboard Data
const leaderboard = [
  { id: '1', rank: 1, name: 'Alex Thompson', avatar: '', value: '5,280 XP', change: 0 },
  { id: '2', rank: 2, name: 'Maria Garcia', avatar: '', value: '4,950 XP', change: 2 },
  { id: '3', rank: 3, name: 'David Kim', avatar: '', value: '4,720 XP', change: -1 },
  { id: '4', rank: 4, name: 'Sophie Martin', avatar: '', value: '4,580 XP', change: 1 },
  { id: '5', rank: 5, name: 'James Wilson', avatar: '', value: '4,450 XP', change: -2 },
  { id: '6', rank: 6, name: 'Emma Davis', avatar: '', value: '4,320 XP', change: 0 },
  { id: '7', rank: 7, name: 'You', avatar: '', value: '4,280 XP', change: 3, isCurrentUser: true },
]

// Upcoming Schedule
const upcomingEvents = [
  { type: 'live', title: 'Live Session: React Advanced', date: 'Tomorrow', time: '3:00 PM', instructor: 'Sarah Chen' },
  { type: 'assignment', title: 'Assignment Due: Python Basics', date: 'Feb 10', time: '11:59 PM', course: 'Data Science Fundamentals' },
  { type: 'quiz', title: 'Quiz: Data Visualization', date: 'Feb 12', time: '2:00 PM', course: 'Data Science Fundamentals' },
  { type: 'live', title: 'Office Hours: UX Design', date: 'Feb 14', time: '10:00 AM', instructor: 'Emma Wilson' },
]

// Activity Heatmap Data (last 12 weeks)
const generateHeatmapData = () => {
  const data: Array<{ date: string; value: number }> = []
  const today = new Date()
  for (let i = 0; i < 252; i++) { // 36 weeks of data
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0] ?? ''
    data.push({
      date: dateStr,
      value: Math.floor(Math.random() * 5),
    })
  }
  return data
}

// All Courses Table Data
const allCourses = [
  { id: 1, title: 'Advanced React Patterns', category: 'Development', progress: 75, lessons: '18/24', duration: '12h', status: 'In Progress' },
  { id: 2, title: 'Data Science Fundamentals', category: 'Data Science', progress: 45, lessons: '16/36', duration: '24h', status: 'In Progress' },
  { id: 3, title: 'UX Design Masterclass', category: 'Design', progress: 92, lessons: '17/18', duration: '8h', status: 'In Progress' },
  { id: 4, title: 'React Basics', category: 'Development', progress: 100, lessons: '20/20', duration: '10h', status: 'Completed' },
  { id: 5, title: 'JavaScript Essentials', category: 'Development', progress: 100, lessons: '25/25', duration: '15h', status: 'Completed' },
  { id: 6, title: 'HTML & CSS Fundamentals', category: 'Development', progress: 100, lessons: '18/18', duration: '8h', status: 'Completed' },
  { id: 7, title: 'Python Basics', category: 'Development', progress: 100, lessons: '22/22', duration: '12h', status: 'Completed' },
  { id: 8, title: 'SQL for Beginners', category: 'Data Science', progress: 100, lessons: '15/15', duration: '6h', status: 'Completed' },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'success' | 'warning' | 'info'> = {
    'Completed': 'success',
    'In Progress': 'info',
    'Not Started': 'warning',
  }
  return <Badge variant={variants[status] || 'default'}>{status}</Badge>
}

const coursesColumns = [
  {
    id: 'title',
    header: 'Course',
    sortable: true,
    cell: ({ row, value }: { row: any; value: any }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{row.category}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'progress',
    header: 'Progress',
    sortable: true,
    cell: ({ value }: { value: any }) => (
      <div className="flex items-center gap-3 min-w-[120px]">
        <ProgressBar value={value} size="sm" variant={value === 100 ? 'success' : 'default'} className="flex-1" />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 w-10">{value}%</span>
      </div>
    ),
  },
  {
    id: 'lessons',
    header: 'Lessons',
    sortable: true,
  },
  {
    id: 'duration',
    header: 'Duration',
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }: { value: any }) => getStatusBadge(value),
  },
]

export default function EducationPage() {
  const heatmapData = generateHeatmapData()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block sm:w-48" />
          <div className="text-center sm:flex-1">
            <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">Learning Dashboard</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Welcome back, John! Keep learning and achieve your goals.</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            My Certificates
          </Button>
          <Button variant="primary" className="gap-2 bg-purple-600 hover:bg-purple-700">
            <BookOpen className="h-4 w-4" />
            Browse Courses
          </Button>
        </div>
      </div>

      {/* Progress Overview - Hero Card */}
      {isLoading ? (
        <Skeleton className="h-[240px] rounded-xl" />
      ) : (
      <>
        {/* ===== MOBILE: 2 Cards ===== */}
        <div className="flex flex-col gap-4 sm:hidden">
          {/* Mobile Card 1: Title + Progress Circle + Stats Grid */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative p-4">
              <h2 className="text-center text-xl font-bold mb-1">Your Learning Journey</h2>
              <p className="text-center text-sm text-purple-200 mb-4">You're making great progress!</p>
              <div className="flex justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${learningStats.overallProgress * 2.64} ${264 - learningStats.overallProgress * 2.64}`}
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{learningStats.overallProgress}%</span>
                    <span className="text-[10px] text-purple-200">Complete</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{learningStats.coursesEnrolled}</div>
                  <div className="text-[10px] text-purple-200">Enrolled</div>
                </div>
                <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{learningStats.coursesCompleted}</div>
                  <div className="text-[10px] text-purple-200">Completed</div>
                </div>
                <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{learningStats.coursesInProgress}</div>
                  <div className="text-[10px] text-purple-200">In Progress</div>
                </div>
                <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{learningStats.certificates}</div>
                  <div className="text-[10px] text-purple-200">Certificates</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Mobile Card 2: Streak + XP */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="relative p-4 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-base font-bold">{learningStats.streak} day streak!</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-base font-bold">{learningStats.xpPoints.toLocaleString()} XP</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ===== DESKTOP: Single Card ===== */}
        <Card className="hidden sm:block bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white border-0">
          <Card.Content className="py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-2">Your Learning Journey</h2>
                <p className="text-purple-200 mb-6">You're making great progress! Keep it up.</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{learningStats.coursesEnrolled}</div>
                    <div className="text-sm text-purple-200">Courses Enrolled</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{learningStats.coursesCompleted}</div>
                    <div className="text-sm text-purple-200">Completed</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{learningStats.coursesInProgress}</div>
                    <div className="text-sm text-purple-200">In Progress</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{learningStats.certificates}</div>
                    <div className="text-sm text-purple-200">Certificates</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${learningStats.overallProgress * 2.64} ${264 - learningStats.overallProgress * 2.64}`}
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{learningStats.overallProgress}%</span>
                    <span className="text-sm text-purple-200">Complete</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-end gap-4">
                <div className="flex items-center gap-3 bg-white/10 rounded-full px-5 py-2 backdrop-blur-sm">
                  <Flame className="h-6 w-6 text-orange-400" />
                  <span className="text-xl font-bold">{learningStats.streak} day streak!</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-full px-5 py-2 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span className="text-xl font-bold">{learningStats.xpPoints.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </>
      )}

      {/* Continue Learning */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>Continue Learning</Card.Title>
              <Card.Description>Pick up where you left off</Card.Description>
            </div>
            <Button variant="ghost" className="gap-2">
              View All
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[280px] rounded-xl" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                totalLessons={course.totalLessons}
                completedLessons={course.completedLessons}
                duration={course.duration}
                remainingTime={course.remainingTime}
                category={course.category}
                status={course.status}
                thumbnailGradient={course.thumbnailGradient}
                onContinueClick={() => {}}
              />
            ))}
          </div>
          )}
        </Card.Content>
      </Card>

      {/* Activity & Stats Row */}
      <DashboardGrid preset="2col">
        {/* Weekly Activity Heatmap */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500" />
          <Card.Header>
            <Card.Title>Weekly Activity</Card.Title>
            <Card.Description>Your learning activity over the last 6 months</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <HeatmapCalendar
                data={heatmapData}
                weeks={36}
                colorScale={['#f3e8ff', '#d8b4fe', '#a855f7', '#7c3aed', '#5b21b6']}
                showWeekdayLabels
                showMonthLabels
                showLegend
              />
            </div>
          </Card.Content>
        </Card>

        {/* Learning Stats */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
          <Card.Header>
            <Card.Title>Learning Stats</Card.Title>
            <Card.Description>Your all-time achievements</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {learningStats.totalHours}h
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Total Hours</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {learningStats.lessonsCompleted}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Lessons Done</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <Award className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {learningStats.quizzesPassed}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Quizzes Passed</div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* Achievements & Certificates */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />
        <Card.Header>
          <Card.Title>Achievements & Certificates</Card.Title>
          <Card.Description>Your earned badges and certifications</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-8">
            {/* Achievements */}
            <div>
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
                Achievement Badges
              </h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    type={achievement.type}
                    title={achievement.title}
                    tier={achievement.tier}
                    size="sm"
                    locked={achievement.locked}
                    progress={achievement.progress}
                    state={achievement.earned ? 'earned' : achievement.progress ? 'progress' : 'locked'}
                  />
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
                Certificates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <CertificateCard
                    key={index}
                    courseName={cert.courseName}
                    issueDate={cert.issueDate}
                    credentialId={cert.credentialId}
                    instructorName={cert.instructorName}
                    skills={cert.skills}
                    variant={cert.variant}
                    onDownload={() => {}}
                    onShare={() => {}}
                    onView={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Recommended & Leaderboard */}
      <DashboardGrid preset="2col">
        {/* Recommended Courses */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500" />
          <Card.Header>
            <Card.Title>Recommended For You</Card.Title>
            <Card.Description>Based on your learning history</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                        {course.title}
                      </h4>
                      {course.isPopular && (
                        <Badge variant="warning" className="flex-shrink-0">Popular</Badge>
                      )}
                      {course.isNew && (
                        <Badge variant="success" className="flex-shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {course.instructor.name} • {course.duration}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {course.studentsEnrolled.toLocaleString()} students
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enroll
                  </Button>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Leaderboard */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500" />
          <Card.Header>
            <Card.Title>Top Learners This Week</Card.Title>
            <Card.Description>Compete with fellow learners</Card.Description>
          </Card.Header>
          <Card.Content>
            <LeaderboardList
              items={leaderboard}
              showChange
            />
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                You're <span className="font-semibold text-purple-600 dark:text-purple-400">#7</span> this week!
                <span className="ml-1 text-green-500">+3 positions</span>
              </p>
            </div>
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* Upcoming Schedule */}
      <DashboardGrid preset="2col">
        {/* Calendar */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />
          <Card.Header>
            <Card.Title>Upcoming Schedule</Card.Title>
            <Card.Description>Your planned learning activities</Card.Description>
          </Card.Header>
          <Card.Content>
            {/* Mobile: Stack vertically (calendar above, events below) */}
            <div className="flex flex-col gap-4 sm:hidden">
              <div className="flex justify-center">
                <MiniCalendar
                  events={[
                    { date: new Date(2026, 1, 8), color: 'bg-purple-500' },
                    { date: new Date(2026, 1, 10), color: 'bg-amber-500' },
                    { date: new Date(2026, 1, 12), color: 'bg-green-500' },
                    { date: new Date(2026, 1, 14), color: 'bg-purple-500' },
                  ]}
                />
              </div>
              <div className="space-y-2.5">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === 'live' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                      event.type === 'assignment' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {event.type === 'live' ? <Play className="h-4 w-4" /> :
                       event.type === 'assignment' ? <FileText className="h-4 w-4" /> :
                       <Target className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: Side by side */}
            <div className="hidden sm:flex gap-6">
              <MiniCalendar
                events={[
                  { date: new Date(2026, 1, 8), color: 'bg-purple-500' },
                  { date: new Date(2026, 1, 10), color: 'bg-amber-500' },
                  { date: new Date(2026, 1, 12), color: 'bg-green-500' },
                  { date: new Date(2026, 1, 14), color: 'bg-purple-500' },
                ]}
              />
              <div className="flex-1 space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === 'live' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                      event.type === 'assignment' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {event.type === 'live' ? <Play className="h-5 w-5" /> :
                       event.type === 'assignment' ? <FileText className="h-5 w-5" /> :
                       <Target className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
          <Card.Header>
            <Card.Title>This Week's Goals</Card.Title>
            <Card.Description>Track your weekly progress</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Learning Hours
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    8/10 hours
                  </span>
                </div>
                <ProgressBar value={80} variant="default" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lessons Completed
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    12/15 lessons
                  </span>
                </div>
                <ProgressBar value={80} variant="default" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Quiz Score Average
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    92%
                  </span>
                </div>
                <ProgressBar value={92} variant="success" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Daily Streak
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    12/30 days (goal)
                  </span>
                </div>
                <ProgressBar value={40} variant="warning" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* All Courses Table */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
        <Card.Header>
          <Card.Title>All Courses</Card.Title>
          <Card.Description>Your complete course library</Card.Description>
        </Card.Header>
        <Card.Content>
          {/* Mobile: 2-column carousel */}
          <div className="sm:hidden">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {(() => {
                const pages: (typeof allCourses)[] = []
                for (let i = 0; i < allCourses.length; i += 2) {
                  pages.push(allCourses.slice(i, i + 2))
                }
                return pages.map((page, pi) => (
                  <div key={pi} className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col gap-3">
                    {page.map((course) => (
                      <div key={course.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{course.title}</p>
                            <p className="text-[11px] text-[var(--text-muted)]">{course.category} · {course.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--border-primary)] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-purple-500'}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[var(--text-primary)] w-8 text-right">{course.progress}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[var(--text-muted)]">{course.lessons} lessons</span>
                          {getStatusBadge(course.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              })()}
            </div>
          </div>
          {/* Desktop: DataTable */}
          <div className="hidden sm:block">
            <DataTable
              data={allCourses}
              columns={coursesColumns}
              sortable
              filterable
              filterPlaceholder="Search courses..."
              pagination
              pageSize={8}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
