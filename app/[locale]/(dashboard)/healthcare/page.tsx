'use client'

import * as React from 'react'
import {
  Stethoscope,
  Heart,
  Activity,
  Calendar,
  Clock,
  Users,
  Bed,
  Pill,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  User,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Thermometer,
  Syringe,
  Clipboard,
  HeartPulse,
  BedDouble,
  Ambulance,
  TestTube,
  Brain,
  Bone,
  Eye as EyeIcon,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Zap,
  Star,
  ArrowUpRight,
  Droplets,
  Microscope,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { ActivityTimeline, type ActivityItem } from '@core/patterns/ActivityTimeline'

// ============================================================================
// MOCK DATA - Healthcare / Medical (Premium Diamond)
// ============================================================================

// Department Stats
const departmentStats = [
  { id: 'emergency', name: 'Emergency', icon: Ambulance, patients: 24, capacity: 30, color: 'from-red-500 to-rose-600', lightBg: 'from-red-500/5 to-rose-500/5', darkBg: 'dark:from-red-950/20 dark:to-rose-950/20', wait: '12 min', trend: [18, 22, 20, 25, 24, 22, 24], admitted: 8, discharged: 3 },
  { id: 'icu', name: 'ICU', icon: HeartPulse, patients: 18, capacity: 20, color: 'from-purple-500 to-violet-600', lightBg: 'from-purple-500/5 to-violet-500/5', darkBg: 'dark:from-purple-950/20 dark:to-violet-950/20', wait: 'N/A', trend: [16, 17, 18, 19, 18, 17, 18], admitted: 3, discharged: 2 },
  { id: 'surgery', name: 'Surgery', icon: Syringe, patients: 8, capacity: 12, color: 'from-blue-500 to-indigo-600', lightBg: 'from-blue-500/5 to-indigo-500/5', darkBg: 'dark:from-blue-950/20 dark:to-indigo-950/20', wait: '45 min', trend: [6, 8, 7, 9, 8, 7, 8], admitted: 4, discharged: 5 },
  { id: 'pediatrics', name: 'Pediatrics', icon: Heart, patients: 15, capacity: 25, color: 'from-pink-500 to-rose-600', lightBg: 'from-pink-500/5 to-rose-500/5', darkBg: 'dark:from-pink-950/20 dark:to-rose-950/20', wait: '20 min', trend: [12, 14, 13, 16, 15, 14, 15], admitted: 5, discharged: 4 },
  { id: 'cardiology', name: 'Cardiology', icon: Activity, patients: 12, capacity: 15, color: 'from-amber-500 to-orange-600', lightBg: 'from-amber-500/5 to-orange-500/5', darkBg: 'dark:from-amber-950/20 dark:to-orange-950/20', wait: '30 min', trend: [10, 11, 12, 11, 13, 12, 12], admitted: 2, discharged: 1 },
  { id: 'neurology', name: 'Neurology', icon: Brain, patients: 9, capacity: 12, color: 'from-teal-500 to-emerald-600', lightBg: 'from-teal-500/5 to-emerald-500/5', darkBg: 'dark:from-teal-950/20 dark:to-emerald-950/20', wait: '25 min', trend: [7, 8, 9, 8, 10, 9, 9], admitted: 3, discharged: 2 },
]

// KPIs with sparkline data (deterministic)
const healthcareKPIs = [
  {
    id: 'patients', label: 'Total Patients', value: '847', change: 12, icon: Users,
    gradient: 'from-rose-500 to-pink-600', iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
    lightOverlay: 'from-rose-500/5 via-transparent to-pink-500/5',
    darkOverlay: 'dark:from-rose-950/20 dark:via-transparent dark:to-pink-950/20',
    sparkColor: '#F43F5E',
    sparkData: [780, 795, 810, 822, 830, 815, 838, 847],
  },
  {
    id: 'appointments', label: 'Today Appointments', value: '156', change: 8, icon: Calendar,
    gradient: 'from-blue-500 to-indigo-600', iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    lightOverlay: 'from-blue-500/5 via-transparent to-indigo-500/5',
    darkOverlay: 'dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/20',
    sparkColor: '#3B82F6',
    sparkData: [120, 135, 142, 148, 130, 145, 152, 156],
  },
  {
    id: 'admissions', label: 'New Admissions', value: '28', change: -5, icon: BedDouble,
    gradient: 'from-purple-500 to-violet-600', iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    lightOverlay: 'from-purple-500/5 via-transparent to-violet-500/5',
    darkOverlay: 'dark:from-purple-950/20 dark:via-transparent dark:to-violet-950/20',
    sparkColor: '#8B5CF6',
    sparkData: [35, 32, 30, 28, 33, 29, 26, 28],
  },
  {
    id: 'discharges', label: 'Discharges Today', value: '22', change: 15, icon: CheckCircle2,
    gradient: 'from-emerald-500 to-green-600', iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    lightOverlay: 'from-emerald-500/5 via-transparent to-green-500/5',
    darkOverlay: 'dark:from-emerald-950/20 dark:via-transparent dark:to-green-950/20',
    sparkColor: '#10B981',
    sparkData: [15, 18, 16, 20, 19, 21, 18, 22],
  },
]

// Bed Occupancy by Ward
const bedOccupancy = [
  { ward: 'General Ward A', occupied: 42, total: 50, critical: 3, color: 'from-blue-500 to-blue-600' },
  { ward: 'General Ward B', occupied: 38, total: 50, critical: 1, color: 'from-indigo-500 to-indigo-600' },
  { ward: 'ICU', occupied: 18, total: 20, critical: 8, color: 'from-red-500 to-red-600' },
  { ward: 'Pediatric Ward', occupied: 15, total: 25, critical: 2, color: 'from-pink-500 to-pink-600' },
  { ward: 'Maternity', occupied: 12, total: 20, critical: 0, color: 'from-purple-500 to-purple-600' },
  { ward: 'Orthopedic', occupied: 28, total: 30, critical: 1, color: 'from-amber-500 to-amber-600' },
]

// Today's Appointments
type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
type Appointment = {
  id: string
  patient: string
  patientAvatar: string
  doctor: string
  doctorAvatar: string
  department: string
  time: string
  status: AppointmentStatus
  type: string
}

const todayAppointments: Appointment[] = [
  { id: '1', patient: 'Maria Garcia', patientAvatar: '', doctor: 'Dr. James Wilson', doctorAvatar: '', department: 'Cardiology', time: '09:00', status: 'completed', type: 'Check-up' },
  { id: '2', patient: 'John Smith', patientAvatar: '', doctor: 'Dr. Sarah Chen', doctorAvatar: '', department: 'Neurology', time: '09:30', status: 'completed', type: 'Follow-up' },
  { id: '3', patient: 'Emily Davis', patientAvatar: '', doctor: 'Dr. Michael Brown', doctorAvatar: '', department: 'Orthopedic', time: '10:00', status: 'in-progress', type: 'Surgery Prep' },
  { id: '4', patient: 'Robert Johnson', patientAvatar: '', doctor: 'Dr. Lisa Anderson', doctorAvatar: '', department: 'General', time: '10:30', status: 'scheduled', type: 'Consultation' },
  { id: '5', patient: 'Sarah Williams', patientAvatar: '', doctor: 'Dr. James Wilson', doctorAvatar: '', department: 'Cardiology', time: '11:00', status: 'scheduled', type: 'ECG Test' },
  { id: '6', patient: 'Michael Lee', patientAvatar: '', doctor: 'Dr. Emily White', doctorAvatar: '', department: 'Pediatrics', time: '11:30', status: 'scheduled', type: 'Vaccination' },
  { id: '7', patient: 'Jennifer Brown', patientAvatar: '', doctor: 'Dr. Sarah Chen', doctorAvatar: '', department: 'Neurology', time: '14:00', status: 'cancelled', type: 'MRI Scan' },
  { id: '8', patient: 'David Miller', patientAvatar: '', doctor: 'Dr. Michael Brown', doctorAvatar: '', department: 'Emergency', time: '14:30', status: 'no-show', type: 'Follow-up' },
  { id: '9', patient: 'Ana Torres', patientAvatar: '', doctor: 'Dr. James Wilson', doctorAvatar: '', department: 'Cardiology', time: '15:00', status: 'scheduled', type: 'Stress Test' },
  { id: '10', patient: 'Carlos Mendez', patientAvatar: '', doctor: 'Dr. Lisa Anderson', doctorAvatar: '', department: 'General', time: '15:30', status: 'scheduled', type: 'Annual Checkup' },
]

// Staff On Duty
const staffOnDuty = [
  { id: '1', name: 'Dr. James Wilson', role: 'Cardiologist', avatar: '', status: 'available', patients: 8, rating: 4.9 },
  { id: '2', name: 'Dr. Sarah Chen', role: 'Neurologist', avatar: '', status: 'busy', patients: 6, rating: 4.8 },
  { id: '3', name: 'Dr. Michael Brown', role: 'Surgeon', avatar: '', status: 'in-surgery', patients: 2, rating: 4.9 },
  { id: '4', name: 'Dr. Lisa Anderson', role: 'General Physician', avatar: '', status: 'available', patients: 12, rating: 4.7 },
  { id: '5', name: 'Dr. Emily White', role: 'Pediatrician', avatar: '', status: 'available', patients: 9, rating: 4.8 },
  { id: '6', name: 'Nurse Rachel Green', role: 'Head Nurse', avatar: '', status: 'available', patients: 15, rating: 4.6 },
  { id: '7', name: 'Dr. David Kim', role: 'Orthopedic', avatar: '', status: 'busy', patients: 5, rating: 4.7 },
  { id: '8', name: 'Nurse Tom Harris', role: 'ICU Nurse', avatar: '', status: 'busy', patients: 4, rating: 4.5 },
]

// Pending Lab Tests
const pendingTests = [
  { id: '1', patient: 'Maria Garcia', test: 'Blood Panel', priority: 'urgent', requestedBy: 'Dr. Wilson', time: '2h ago', icon: Droplets },
  { id: '2', patient: 'John Smith', test: 'MRI Brain', priority: 'high', requestedBy: 'Dr. Chen', time: '3h ago', icon: Brain },
  { id: '3', patient: 'Emily Davis', test: 'X-Ray Chest', priority: 'normal', requestedBy: 'Dr. Brown', time: '4h ago', icon: Bone },
  { id: '4', patient: 'Robert Johnson', test: 'ECG', priority: 'normal', requestedBy: 'Dr. Anderson', time: '5h ago', icon: HeartPulse },
  { id: '5', patient: 'Sarah Williams', test: 'CT Scan', priority: 'high', requestedBy: 'Dr. Wilson', time: '1h ago', icon: EyeIcon },
  { id: '6', patient: 'Ana Torres', test: 'Urinalysis', priority: 'normal', requestedBy: 'Dr. Anderson', time: '30 min ago', icon: Microscope },
  { id: '7', patient: 'Carlos Mendez', test: 'Lipid Panel', priority: 'urgent', requestedBy: 'Dr. Wilson', time: '45 min ago', icon: TestTube },
]

// Vital Signs Alerts
const vitalAlerts = [
  { id: '1', patient: 'ICU-12 (John Doe)', alert: 'Heart rate elevated', value: '125 bpm', severity: 'critical', time: '2 min ago', icon: HeartPulse },
  { id: '2', patient: 'ICU-08 (Jane Smith)', alert: 'Blood pressure low', value: '85/55 mmHg', severity: 'critical', time: '5 min ago', icon: Activity },
  { id: '3', patient: 'Ward A-15 (Mike Wilson)', alert: 'Temperature high', value: '39.2°C', severity: 'warning', time: '10 min ago', icon: Thermometer },
  { id: '4', patient: 'ICU-03 (Sarah Lee)', alert: 'Oxygen saturation', value: '91%', severity: 'warning', time: '8 min ago', icon: Droplets },
  { id: '5', patient: 'ICU-05 (Tom Harris)', alert: 'Respiratory rate', value: '28/min', severity: 'warning', time: '12 min ago', icon: Activity },
  { id: '6', patient: 'Ward B-07 (Ana Costa)', alert: 'Glucose spike', value: '310 mg/dL', severity: 'critical', time: '3 min ago', icon: Droplets },
  { id: '7', patient: 'Ward C-11 (David Park)', alert: 'ECG irregular rhythm', value: 'AFib', severity: 'warning', time: '15 min ago', icon: HeartPulse },
]

// Patient Flow Chart Data (deterministic - no Math.random!)
const patientFlowData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  admissions: ((i * 7 + 3) % 8) + 2,
  discharges: ((i * 5 + 1) % 6) + 1,
  emergency: ((i * 3 + 2) % 5) + 1,
}))

// Department Performance
const departmentPerformance = [
  { name: 'Emergency', avgWait: 12, satisfaction: 4.2, cases: 145, icon: Ambulance, color: 'from-red-500 to-rose-600', trend: [130, 135, 140, 138, 142, 145] },
  { name: 'Cardiology', avgWait: 18, satisfaction: 4.7, cases: 89, icon: HeartPulse, color: 'from-amber-500 to-orange-600', trend: [78, 82, 85, 80, 86, 89] },
  { name: 'Neurology', avgWait: 25, satisfaction: 4.5, cases: 56, icon: Brain, color: 'from-teal-500 to-emerald-600', trend: [48, 50, 52, 54, 55, 56] },
  { name: 'Orthopedic', avgWait: 30, satisfaction: 4.4, cases: 78, icon: Bone, color: 'from-blue-500 to-indigo-600', trend: [65, 68, 72, 70, 75, 78] },
  { name: 'Pediatrics', avgWait: 15, satisfaction: 4.8, cases: 112, icon: Heart, color: 'from-pink-500 to-rose-600', trend: [95, 100, 102, 106, 108, 112] },
]

// Recent Activity (expanded)
const recentActivity: ActivityItem[] = [
  { id: '1', title: 'Emergency admission', description: 'Patient John Doe admitted to ICU — cardiac arrest', timestamp: new Date(Date.now() - 5 * 60 * 1000), type: 'warning', icon: Ambulance },
  { id: '2', title: 'Surgery completed', description: 'Dr. Brown completed appendectomy successfully', timestamp: new Date(Date.now() - 15 * 60 * 1000), type: 'success', icon: CheckCircle2 },
  { id: '3', title: 'Lab results ready', description: 'Blood panel for Maria Garcia — all normal', timestamp: new Date(Date.now() - 30 * 60 * 1000), type: 'info', icon: TestTube },
  { id: '4', title: 'Discharge processed', description: 'Patient Sarah Williams discharged — Ward A', timestamp: new Date(Date.now() - 45 * 60 * 1000), type: 'success', icon: CheckCircle2 },
  { id: '5', title: 'Critical alert resolved', description: 'ICU-08 stabilized — blood pressure normalized', timestamp: new Date(Date.now() - 60 * 60 * 1000), type: 'success', icon: ShieldCheck },
  { id: '6', title: 'New prescription', description: 'Dr. Wilson prescribed Metoprolol for ICU-12', timestamp: new Date(Date.now() - 75 * 60 * 1000), type: 'info', icon: Pill },
  { id: '7', title: 'Equipment maintenance', description: 'MRI scanner #2 scheduled for maintenance', timestamp: new Date(Date.now() - 90 * 60 * 1000), type: 'warning', icon: AlertTriangle },
  { id: '8', title: 'Shift change', description: 'Night shift team checked in — 12 nurses, 4 doctors', timestamp: new Date(Date.now() - 120 * 60 * 1000), type: 'info', icon: Users },
]

// Hospital Overview Stats (for hero card)
const hospitalOverview = {
  totalBeds: 195,
  occupiedBeds: 153,
  availableBeds: 42,
  occupancyRate: 78.5,
  avgStayDays: 4.2,
  satisfactionScore: 4.6,
  surgeriesToday: 12,
  emergencyVisits: 34,
}

// Status colors and variants
const statusColors: Record<AppointmentStatus, { bg: string; text: string; variant: 'success' | 'warning' | 'error' | 'default' }> = {
  completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', variant: 'success' },
  'in-progress': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', variant: 'default' },
  scheduled: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', variant: 'warning' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', variant: 'error' },
  'no-show': { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', variant: 'default' },
}

const staffStatusColors: Record<string, { dot: string; text: string; label: string }> = {
  available: { dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', label: 'Available' },
  busy: { dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', label: 'Busy' },
  'in-surgery': { dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400', label: 'In Surgery' },
}

const priorityColors: Record<string, { bg: string; border: string }> = {
  urgent: { bg: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', border: 'border-l-red-500' },
  high: { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', border: 'border-l-amber-500' },
  normal: { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', border: 'border-l-blue-500' },
}

// ============================================================================
// HEALTHCARE DASHBOARD PAGE — PREMIUM DIAMOND
// ============================================================================

export default function HealthcareDashboardPage() {
  // Appointments table columns
  const appointmentColumns: ColumnDef<Appointment>[] = [
    {
      id: 'time',
      header: 'Time',
      accessorKey: 'time',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500/10 to-pink-500/10">
            <Clock className="h-3.5 w-3.5 text-rose-500" />
          </div>
          <span className="font-semibold text-[var(--text-primary)]">{row.time}</span>
        </div>
      ),
    },
    {
      id: 'patient',
      header: 'Patient',
      accessorKey: 'patient',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" fallback={row.patient.split(' ').map(n => n[0] ?? '').join('')} />
          <span className="font-medium text-[var(--text-primary)]">{row.patient}</span>
        </div>
      ),
    },
    {
      id: 'doctor',
      header: 'Doctor',
      accessorKey: 'doctor',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar size="sm" fallback={row.doctor.split(' ').slice(1).map(n => n[0] ?? '').join('')} />
          <span className="text-[var(--text-secondary)]">{row.doctor}</span>
        </div>
      ),
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      cell: ({ row }) => (
        <span className="text-sm text-[var(--text-secondary)]">{row.department}</span>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      cell: ({ row }) => (
        <Badge variant="default" className="text-xs">
          {row.type}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = statusColors[row.status]
        return (
          <Badge variant={status.variant} className="capitalize">
            {row.status === 'in-progress' && <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400" />}
            {row.status.replace('-', ' ')}
          </Badge>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* ================================================================ */}
      {/* PREMIUM HERO CARD */}
      {/* ================================================================ */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-white to-pink-50 p-0 shadow-lg dark:from-rose-950/20 dark:via-[var(--bg-base)] dark:to-pink-950/20">
        {/* Radial gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-400/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-400/10 via-transparent to-transparent" />

        {/* Gradient top bar */}
        <div className="h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />

        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Title + description */}
            <div className="hidden lg:block lg:w-48" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-2xl font-bold lg:text-3xl bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent">Healthcare Dashboard</h1>
                <Badge variant="default" className="border-rose-200 bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-700 dark:border-rose-800 dark:text-rose-300">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Live
                </Badge>
              </div>
              <p className="mt-1 text-[var(--text-muted)]">
                Real-time hospital monitoring — patients, appointments & operations
              </p>
            </div>

            {/* Right: Quick stats + sparkline */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <SparklineChart
                  data={[72, 75, 74, 78, 76, 79, 78, 80]}
                  type="area"
                  width={120}
                  height={48}
                  color="#F43F5E"
                  gradient
                  animated
                  strokeWidth={2}
                  showDot
                />
                <p className="mt-1 text-center text-xs text-[var(--text-muted)]">Occupancy trend</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="primary" size="sm" className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Patient
                </Button>
              </div>
            </div>
          </div>

          {/* Hospital overview quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-rose-200/50 bg-white/60 p-3 backdrop-blur-sm dark:border-rose-800/30 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-medium text-[var(--text-muted)]">Available Beds</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">{hospitalOverview.availableBeds}<span className="text-sm font-normal text-[var(--text-muted)]">/{hospitalOverview.totalBeds}</span></p>
            </div>
            <div className="rounded-xl border border-pink-200/50 bg-white/60 p-3 backdrop-blur-sm dark:border-pink-800/30 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Syringe className="h-4 w-4 text-pink-500" />
                <span className="text-xs font-medium text-[var(--text-muted)]">Surgeries Today</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">{hospitalOverview.surgeriesToday}</p>
            </div>
            <div className="rounded-xl border border-fuchsia-200/50 bg-white/60 p-3 backdrop-blur-sm dark:border-fuchsia-800/30 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Ambulance className="h-4 w-4 text-fuchsia-500" />
                <span className="text-xs font-medium text-[var(--text-muted)]">Emergency Visits</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">{hospitalOverview.emergencyVisits}</p>
            </div>
            <div className="rounded-xl border border-rose-200/50 bg-white/60 p-3 backdrop-blur-sm dark:border-rose-800/30 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium text-[var(--text-muted)]">Satisfaction</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">{hospitalOverview.satisfactionScore}<span className="text-sm font-normal text-[var(--text-muted)]">/5.0</span></p>
            </div>
          </div>
        </div>
      </Card>

      {/* ================================================================ */}
      {/* VITAL ALERTS BANNER */}
      {/* ================================================================ */}
      {vitalAlerts.filter(a => a.severity === 'critical').length > 0 && (
        <Card className="relative overflow-hidden border-red-200 bg-gradient-to-r from-red-50 via-white to-red-50 p-0 dark:border-red-900 dark:from-red-950/50 dark:via-[var(--bg-base)] dark:to-red-950/30">
          <div className="h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Critical Alert — Immediate Attention Required</h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {vitalAlerts.filter(a => a.severity === 'critical').length} patient(s) in critical condition
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-200 dark:border-red-800 dark:text-red-300">
              View All Alerts
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* ================================================================ */}
      {/* DEPARTMENT OVERVIEW — Premium Cards */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {departmentStats.map((dept) => {
          const Icon = dept.icon
          const occupancyRate = (dept.patients / dept.capacity) * 100

          return (
            <Card key={dept.id} className="group relative cursor-pointer overflow-hidden p-0 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              {/* Gradient overlay */}
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${dept.lightBg} ${dept.darkBg}`} />

              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${dept.color}`} />

              <div className="relative p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${dept.color} shadow-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-muted)]">{dept.wait}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{dept.name}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[var(--text-primary)]">{dept.patients}</span>
                  <span className="text-sm text-[var(--text-muted)]">/ {dept.capacity}</span>
                </div>

                {/* Sparkline */}
                <div className="mt-2">
                  <SparklineChart
                    data={dept.trend}
                    type="area"
                    width={100}
                    height={24}
                    color={dept.color.includes('red') ? '#EF4444' : dept.color.includes('purple') ? '#8B5CF6' : dept.color.includes('blue') ? '#3B82F6' : dept.color.includes('pink') ? '#EC4899' : dept.color.includes('amber') ? '#F59E0B' : '#14B8A6'}
                    gradient
                    strokeWidth={1.5}
                  />
                </div>

                {/* Occupancy bar */}
                <div className="mt-2">
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
                    <div
                      className={`h-full bg-gradient-to-r ${dept.color} transition-all duration-500`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-[var(--text-muted)]">
                      {Math.round(occupancyRate)}% full
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      +{dept.admitted} / -{dept.discharged}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* ================================================================ */}
      {/* KPIs — Premium with Sparklines */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {healthcareKPIs.map((kpi) => {
          const Icon = kpi.icon
          const isPositive = kpi.change > 0

          return (
            <Card key={kpi.id} className="group relative overflow-hidden p-0 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
              {/* Gradient overlay */}
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${kpi.lightOverlay} ${kpi.darkOverlay}`} />

              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${kpi.gradient}`} />

              <div className="relative p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.iconBg} shadow-sm`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                    isPositive
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {Math.abs(kpi.change)}%
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
                  <p className="mt-0.5 text-sm text-[var(--text-muted)]">{kpi.label}</p>
                </div>
                {/* Sparkline */}
                <div className="mt-3">
                  <SparklineChart
                    data={kpi.sparkData}
                    type="area"
                    width={160}
                    height={36}
                    color={kpi.sparkColor}
                    gradient
                    animated
                    strokeWidth={2}
                    showDot
                  />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* ================================================================ */}
      {/* ROW: Bed Occupancy Gauge + Patient Flow Chart */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bed Occupancy by Ward */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 dark:from-purple-950/20 dark:to-violet-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500" />

          <Card.Header className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 shadow-sm">
                <Bed className="h-4 w-4 text-white" />
              </div>
              <div>
                <Card.Title>Bed Occupancy by Ward</Card.Title>
                <Card.Description className="mt-1">Real-time bed availability across wards</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <div className="space-y-4">
              {bedOccupancy.map((ward) => {
                const occupancy = (ward.occupied / ward.total) * 100
                const isFull = occupancy > 90
                const isHigh = occupancy > 75

                return (
                  <div key={ward.ward} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{ward.ward}</span>
                        {ward.critical > 0 && (
                          <Badge variant="error" className="text-xs">
                            {ward.critical} critical
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${
                          isFull ? 'text-red-600 dark:text-red-400' :
                          isHigh ? 'text-amber-600 dark:text-amber-400' :
                          'text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {Math.round(occupancy)}%
                        </span>
                        <span className="text-sm text-[var(--text-muted)]">
                          {ward.occupied}/{ward.total}
                        </span>
                      </div>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                          isHigh ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                          `bg-gradient-to-r ${ward.color}`
                        }`}
                        style={{ width: `${occupancy}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary with Gauge */}
            <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-gradient-to-br from-purple-500/5 to-violet-500/5 p-4 dark:from-purple-950/20 dark:to-violet-950/20">
              <div className="flex items-center justify-center gap-8">
                <GaugeChart
                  value={78}
                  max={100}
                  size="lg"
                  variant="semicircle"
                  className="lg:-mt-3"
                  colorRanges={[
                    { color: '#22C55E', from: 0, to: 60 },
                    { color: '#FBBF24', from: 60, to: 85 },
                    { color: '#EF4444', from: 85, to: 100 },
                  ]}
                  showValue
                  label="Overall Occupancy"
                />
                <div className="hidden space-y-3 sm:block">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-[var(--text-muted)]">Normal (&lt;60%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-[var(--text-muted)]">High (60-85%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-xs text-[var(--text-muted)]">Critical (&gt;85%)</span>
                  </div>
                  <div className="mt-2 rounded-lg bg-white/60 px-3 py-2 dark:bg-white/5">
                    <p className="text-xs text-[var(--text-muted)]">Avg Stay</p>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{hospitalOverview.avgStayDays} <span className="text-xs font-normal">days</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Patient Flow Chart */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-950/20 dark:to-indigo-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

          <Card.Header className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <Card.Title>Patient Flow (24h)</Card.Title>
                <Card.Description className="mt-1">Admissions, discharges, and emergency visits</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {/* Quick summary stats */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-blue-200/50 bg-blue-50/50 p-2.5 text-center dark:border-blue-800/30 dark:bg-blue-950/20">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">94</p>
                <p className="text-xs text-[var(--text-muted)]">Admissions</p>
              </div>
              <div className="rounded-lg border border-emerald-200/50 bg-emerald-50/50 p-2.5 text-center dark:border-emerald-800/30 dark:bg-emerald-950/20">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">78</p>
                <p className="text-xs text-[var(--text-muted)]">Discharges</p>
              </div>
              <div className="rounded-lg border border-red-200/50 bg-red-50/50 p-2.5 text-center dark:border-red-800/30 dark:bg-red-950/20">
                <p className="text-lg font-bold text-red-600 dark:text-red-400">56</p>
                <p className="text-xs text-[var(--text-muted)]">Emergency</p>
              </div>
            </div>

            <ChartWrapper
              type="area"
              data={patientFlowData}
              series={[
                { dataKey: 'admissions', name: 'Admissions', color: '#3B82F6' },
                { dataKey: 'discharges', name: 'Discharges', color: '#22C55E' },
                { dataKey: 'emergency', name: 'Emergency', color: '#EF4444' },
              ]}
              xAxisKey="hour"
              height={300}
              showGrid
              showLegend
            />

            {/* Peak Hours & Insights */}
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="group rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-100/40 p-3 transition-all duration-200 hover:shadow-sm dark:border-blue-800/30 dark:from-blue-950/30 dark:to-blue-900/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10">
                    <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">Peak Admissions</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-blue-700 dark:text-blue-300">10:00 - 12:00</p>
                <p className="text-xs text-[var(--text-muted)]">~12 patients/hr</p>
              </div>
              <div className="group rounded-lg border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 p-3 transition-all duration-200 hover:shadow-sm dark:border-emerald-800/30 dark:from-emerald-950/30 dark:to-emerald-900/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">Peak Discharges</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">14:00 - 16:00</p>
                <p className="text-xs text-[var(--text-muted)]">~9 patients/hr</p>
              </div>
              <div className="group rounded-lg border border-red-200/50 bg-gradient-to-br from-red-50/80 to-red-100/40 p-3 transition-all duration-200 hover:shadow-sm dark:border-red-800/30 dark:from-red-950/30 dark:to-red-900/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/10">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">Avg Emergency</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-red-700 dark:text-red-300">3.2 / hour</p>
                <p className="text-xs text-[var(--text-muted)]">+8% vs yesterday</p>
              </div>
              <div className="group rounded-lg border border-violet-200/50 bg-gradient-to-br from-violet-50/80 to-violet-100/40 p-3 transition-all duration-200 hover:shadow-sm dark:border-violet-800/30 dark:from-violet-950/30 dark:to-violet-900/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/10">
                    <Activity className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">Net Flow</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-violet-700 dark:text-violet-300">+16 patients</p>
                <p className="text-xs text-[var(--text-muted)]">Admissions − Discharges</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* ================================================================ */}
      {/* ROW: Staff On Duty + Pending Lab Tests + Vital Alerts */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Staff On Duty */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 dark:from-rose-950/20 dark:to-pink-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />

          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Staff On Duty</Card.Title>
                  <Card.Description className="mt-1">{staffOnDuty.length} staff members active</Card.Description>
                </div>
              </div>
              <Badge variant="default" className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                {staffOnDuty.filter(s => s.status === 'available').length} available
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <div className="space-y-2.5">
              {staffOnDuty.map((staff) => (
                <div
                  key={staff.id}
                  className="group/item flex items-center justify-between rounded-xl border border-[var(--border-default)] p-3 transition-all hover:border-rose-200 hover:bg-gradient-to-r hover:from-rose-500/5 hover:to-pink-500/5 dark:hover:border-rose-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar size="sm" fallback={staff.name.split(' ').map(n => n[0] ?? '').join('')} />
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-secondary-900 ${staffStatusColors[staff.status]?.dot ?? 'bg-gray-500'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{staff.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium capitalize ${staffStatusColors[staff.status]?.text ?? 'text-gray-600'}`}>
                      {staffStatusColors[staff.status]?.label ?? staff.status}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-xs text-[var(--text-muted)]">{staff.patients} pts</span>
                      <span className="text-xs text-amber-500">★ {staff.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Pending Lab Tests */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />

          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm">
                  <TestTube className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Pending Lab Tests</Card.Title>
                  <Card.Description className="mt-1">{pendingTests.length} tests awaiting results</Card.Description>
                </div>
              </div>
              <Badge variant="error" className="text-xs">
                {pendingTests.filter(t => t.priority === 'urgent').length} urgent
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <div className="space-y-2.5">
              {pendingTests.map((test) => {
                const TestIcon = test.icon
                return (
                  <div
                    key={test.id}
                    className={`rounded-xl border-l-4 border border-[var(--border-default)] p-3 transition-all hover:shadow-sm ${priorityColors[test.priority]?.border ?? 'border-l-gray-500'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          test.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30' :
                          test.priority === 'high' ? 'bg-amber-100 dark:bg-amber-900/30' :
                          'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                          <TestIcon className={`h-3.5 w-3.5 ${
                            test.priority === 'urgent' ? 'text-red-600 dark:text-red-400' :
                            test.priority === 'high' ? 'text-amber-600 dark:text-amber-400' :
                            'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-[var(--text-primary)]">{test.test}</p>
                            <Badge className={`text-xs ${priorityColors[test.priority]?.bg ?? ''}`}>
                              {test.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">
                            {test.patient} • {test.requestedBy}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-[var(--text-muted)]">{test.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Vital Signs Alerts */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5 dark:from-red-950/20 dark:to-rose-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />

          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 shadow-sm">
                  <HeartPulse className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Vital Alerts</Card.Title>
                  <Card.Description className="mt-1">Active patient monitoring alerts</Card.Description>
                </div>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md shadow-red-500/30">
                {vitalAlerts.length}
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <div className="space-y-2.5">
              {vitalAlerts.map((alert) => {
                const AlertIcon = alert.icon
                const isCritical = alert.severity === 'critical'

                return (
                  <div
                    key={alert.id}
                    className={`rounded-xl border p-3 transition-all hover:shadow-sm ${
                      isCritical
                        ? 'border-red-200 bg-gradient-to-r from-red-50 to-rose-50 dark:border-red-900 dark:from-red-950/30 dark:to-rose-950/20'
                        : 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:border-amber-900 dark:from-amber-950/30 dark:to-yellow-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          isCritical
                            ? 'bg-red-100 dark:bg-red-900/40'
                            : 'bg-amber-100 dark:bg-amber-900/40'
                        }`}>
                          {isCritical ? (
                            <AlertTriangle className="h-3.5 w-3.5 animate-pulse text-red-500" />
                          ) : (
                            <AlertIcon className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{alert.alert}</p>
                          <p className="text-xs text-[var(--text-muted)]">{alert.patient}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className={`text-sm font-bold ${isCritical ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {alert.value}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Alert Summary */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-[var(--text-muted)]">{vitalAlerts.filter(a => a.severity === 'critical').length} Critical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-[var(--text-muted)]">{vitalAlerts.filter(a => a.severity === 'warning').length} Warning</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* ================================================================ */}
      {/* ROW: Appointments Table + Recent Activity */}
      {/* ================================================================ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Appointments */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-950/20 dark:to-indigo-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Card.Title>Today&apos;s Appointments</Card.Title>
                  <Card.Description className="mt-1">Scheduled appointments for today</Card.Description>
                </div>
              </div>
              {/* Status summary badges */}
              <div className="hidden items-center gap-2 sm:flex">
                <Badge variant="success" className="text-xs">
                  {todayAppointments.filter(a => a.status === 'completed').length} done
                </Badge>
                <Badge variant="default" className="bg-blue-100 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {todayAppointments.filter(a => a.status === 'in-progress').length} active
                </Badge>
                <Badge variant="warning" className="text-xs">
                  {todayAppointments.filter(a => a.status === 'scheduled').length} upcoming
                </Badge>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <DataTable
              data={todayAppointments}
              columns={appointmentColumns}
              sortable
              pagination
              pageSize={6}
            />
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-950/20 dark:to-teal-950/20" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          <Card.Header className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <Card.Title>Recent Activity</Card.Title>
                <Card.Description className="mt-1">Latest hospital events</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            <ActivityTimeline items={recentActivity} variant="compact" />
          </Card.Content>
        </Card>
      </div>

      {/* ================================================================ */}
      {/* DEPARTMENT PERFORMANCE — Premium Cards */}
      {/* ================================================================ */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 dark:from-rose-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />

        <Card.Header className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm">
              <Clipboard className="h-4 w-4 text-white" />
            </div>
            <div>
              <Card.Title>Department Performance</Card.Title>
              <Card.Description className="mt-1">Average wait times, patient satisfaction & case volume</Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="relative">
          <div className="grid gap-4 md:grid-cols-5">
            {departmentPerformance.map((dept) => {
              const DeptIcon = dept.icon
              return (
                <div key={dept.name} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-4 text-center transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                  {/* Top gradient bar */}
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dept.color}`} />

                  <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${dept.color} shadow-sm`}>
                    <DeptIcon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{dept.name}</h4>

                  {/* Wait time */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <Timer className="h-4 w-4 text-[var(--text-muted)]" />
                    <span className="text-xl font-bold text-[var(--text-primary)]">{dept.avgWait}</span>
                    <span className="text-xs text-[var(--text-muted)]">min</span>
                  </div>

                  {/* Stars */}
                  <div className="mt-2 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(dept.satisfaction) ? 'text-amber-400' : 'text-secondary-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-sm font-medium text-[var(--text-muted)]">{dept.satisfaction}</span>
                  </div>

                  {/* Cases + Sparkline */}
                  <p className="mt-2 text-xs text-[var(--text-muted)]">{dept.cases} cases today</p>
                  <div className="mt-2 flex justify-center">
                    <SparklineChart
                      data={dept.trend}
                      type="area"
                      width={80}
                      height={24}
                      color={dept.color.includes('red') ? '#EF4444' : dept.color.includes('amber') ? '#F59E0B' : dept.color.includes('teal') ? '#14B8A6' : dept.color.includes('blue') ? '#3B82F6' : '#EC4899'}
                      gradient
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Overall Performance Summary */}
          <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-fuchsia-500/5 p-4 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-fuchsia-950/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Overall Performance</p>
                  <p className="text-xs text-[var(--text-muted)]">Across all departments today</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-[var(--text-primary)]">20 <span className="text-xs font-normal text-[var(--text-muted)]">min</span></p>
                  <p className="text-xs text-[var(--text-muted)]">Avg Wait</p>
                </div>
                <div className="h-8 w-px bg-[var(--border-default)]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-500">4.5 <span className="text-xs font-normal">★</span></p>
                  <p className="text-xs text-[var(--text-muted)]">Avg Rating</p>
                </div>
                <div className="h-8 w-px bg-[var(--border-default)]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-[var(--text-primary)]">480</p>
                  <p className="text-xs text-[var(--text-muted)]">Total Cases</p>
                </div>
                <div className="h-8 w-px bg-[var(--border-default)]" />
                <div className="text-center">
                  <p className="flex items-center gap-1 text-lg font-bold text-emerald-500">
                    <ArrowUpRight className="h-4 w-4" />
                    12%
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">vs Last Week</p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
