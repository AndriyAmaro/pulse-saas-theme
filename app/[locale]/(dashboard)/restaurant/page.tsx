'use client'

import * as React from 'react'
import {
  UtensilsCrossed,
  Users,
  ChefHat,
  DollarSign,
  Clock,
  CalendarDays,
  Plus,
  Bell,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MapPin,
  Coffee,
  Flame,
  Star,
  Timer,
  Package,
  MoreHorizontal,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { TableGrid, type RestaurantTable } from '@core/patterns/TableGrid'
import { OrderTicket, OrderTicketList, type KitchenOrder } from '@core/patterns/OrderTicket'
import { ReservationTimeline, type Reservation } from '@core/patterns/ReservationTimeline'
import { SparklineChart } from '@core/patterns/SparklineChart'

// ============================================================================
// MOCK DATA
// ============================================================================

// Hero: Daily Restaurant Performance
const heroData = {
  todayRevenue: 4234.50,
  changePercent: 12.5,
  changeValue: 472,
  ordersToday: 68,
  avgOrderValue: 62.27,
  last24Hours: [
    120, 180, 250, 420, 680, 1100, 1580, 1420, 980, 650, 380, 220,
    180, 350, 580, 920, 1250, 1580, 1820, 1680, 1450, 1120, 780, 420,
  ],
}

// Sparkline data for KPI cards
const kpiSparklines = {
  tablesOccupied: [8, 10, 14, 12, 16, 14, 11, 13, 15, 12, 14, 12],
  guestsNow: [28, 32, 38, 42, 48, 44, 36, 40, 45, 38, 44, 42],
  ordersInKitchen: [4, 6, 8, 5, 7, 10, 8, 6, 9, 7, 5, 8],
  todayRevenue: [450, 1250, 2200, 2800, 3100, 3400, 3600, 3800, 3950, 4050, 4150, 4234],
}

// Live Stats
const liveStats = {
  tablesOccupied: { value: 12, total: 18, change: 2 },
  guestsNow: { value: 42, change: 8 },
  ordersInKitchen: { value: 8, isUrgent: true },
  todayRevenue: { value: 4234.50, change: 12.5 },
}

// Restaurant Tables
const restaurantTables: RestaurantTable[] = [
  { id: 't1', number: 'T1', seats: 2, status: 'available', size: 'small' },
  { id: 't2', number: 'T2', seats: 2, status: 'occupied', occupiedTime: '45min', guestCount: 2, size: 'small' },
  { id: 't3', number: 'T3', seats: 4, status: 'occupied', occupiedTime: '25min', guestCount: 4, orderTotal: 78.50 },
  { id: 't4', number: 'T4', seats: 4, status: 'reserved', reservationTime: '7:30 PM', guestName: 'Johnson' },
  { id: 't5', number: 'T5', seats: 4, status: 'paying', guestCount: 3, orderTotal: 124.00 },
  { id: 't6', number: 'T6', seats: 6, status: 'available', size: 'medium' },
  { id: 't7', number: 'T7', seats: 4, status: 'occupied', occupiedTime: '15min', guestCount: 4 },
  { id: 't8', number: 'T8', seats: 2, status: 'available', size: 'small' },
  { id: 't9', number: 'T9', seats: 8, status: 'reserved', reservationTime: '8:00 PM', guestName: 'Smith Party', size: 'large' },
  { id: 't10', number: 'T10', seats: 4, status: 'occupied', occupiedTime: '55min', guestCount: 2 },
  { id: 't11', number: 'T11', seats: 4, status: 'closed' },
  { id: 't12', number: 'T12', seats: 6, status: 'occupied', occupiedTime: '35min', guestCount: 6, size: 'medium' },
  { id: 't13', number: 'T13', seats: 2, status: 'paying', guestCount: 2, orderTotal: 45.00, size: 'small' },
  { id: 't14', number: 'T14', seats: 4, status: 'available' },
  { id: 't15', number: 'T15', seats: 4, status: 'occupied', occupiedTime: '10min', guestCount: 3 },
  { id: 't16', number: 'T16', seats: 2, status: 'reserved', reservationTime: '6:45 PM', guestName: 'Davis', size: 'small' },
  { id: 't17', number: 'T17', seats: 4, status: 'occupied', occupiedTime: '40min', guestCount: 4 },
  { id: 't18', number: 'T18', seats: 6, status: 'available', size: 'medium' },
]

// Kitchen Orders
const kitchenOrders: KitchenOrder[] = [
  {
    id: 'o1',
    orderNumber: '1234',
    tableNumber: 'T3',
    items: [
      { id: 'i1', name: 'Grilled Salmon', quantity: 2, modifiers: ['Medium rare', 'No sauce'] },
      { id: 'i2', name: 'Caesar Salad', quantity: 1, notes: 'Dressing on side' },
      { id: 'i3', name: 'Truffle Fries', quantity: 1 },
    ],
    status: 'preparing',
    priority: 'normal',
    createdAt: '14:25',
    elapsedMinutes: 12,
    serverName: 'Maria',
  },
  {
    id: 'o2',
    orderNumber: '1235',
    tableNumber: 'T7',
    items: [
      { id: 'i4', name: 'Ribeye Steak', quantity: 1, modifiers: ['Well done'] },
      { id: 'i5', name: 'Mashed Potatoes', quantity: 1 },
      { id: 'i6', name: 'Grilled Vegetables', quantity: 1 },
    ],
    status: 'pending',
    priority: 'high',
    createdAt: '14:32',
    elapsedMinutes: 8,
    serverName: 'John',
    specialInstructions: 'VIP guest - allergic to shellfish',
  },
  {
    id: 'o3',
    orderNumber: '1236',
    tableNumber: 'T10',
    items: [
      { id: 'i7', name: 'Margherita Pizza', quantity: 1 },
      { id: 'i8', name: 'Pasta Carbonara', quantity: 1, modifiers: ['Extra bacon'] },
    ],
    status: 'pending',
    priority: 'rush',
    createdAt: '14:15',
    elapsedMinutes: 25,
    serverName: 'Sarah',
  },
  {
    id: 'o4',
    orderNumber: '1237',
    tableNumber: 'T12',
    items: [
      { id: 'i9', name: 'Fish & Chips', quantity: 2 },
      { id: 'i10', name: 'Onion Rings', quantity: 1 },
      { id: 'i11', name: 'Coleslaw', quantity: 2 },
    ],
    status: 'ready',
    priority: 'normal',
    createdAt: '14:10',
    elapsedMinutes: 30,
    serverName: 'Mike',
  },
  {
    id: 'o5',
    orderNumber: '1238',
    tableNumber: 'T15',
    items: [
      { id: 'i12', name: 'Chicken Wings', quantity: 2, modifiers: ['Extra spicy'] },
      { id: 'i13', name: 'Nachos Supreme', quantity: 1 },
    ],
    status: 'preparing',
    priority: 'normal',
    createdAt: '14:35',
    elapsedMinutes: 5,
    serverName: 'Lisa',
  },
]

// Recent Completed Orders
interface CompletedOrder {
  id: string
  orderNumber: string
  tableNumber: string
  items: number
  total: number
  status: 'preparing' | 'ready' | 'served' | 'paid'
  time: string
}

const recentOrders: CompletedOrder[] = [
  { id: 'r1', orderNumber: '#1230', tableNumber: 'T5', items: 4, total: 124.00, status: 'paid', time: '14:20' },
  { id: 'r2', orderNumber: '#1229', tableNumber: 'T8', items: 2, total: 45.50, status: 'served', time: '14:15' },
  { id: 'r3', orderNumber: '#1228', tableNumber: 'T2', items: 3, total: 78.00, status: 'served', time: '14:10' },
  { id: 'r4', orderNumber: '#1227', tableNumber: 'T14', items: 5, total: 156.00, status: 'paid', time: '14:05' },
  { id: 'r5', orderNumber: '#1226', tableNumber: 'T1', items: 2, total: 34.00, status: 'paid', time: '13:55' },
  { id: 'r6', orderNumber: '#1225', tableNumber: 'T6', items: 6, total: 189.50, status: 'paid', time: '13:45' },
  { id: 'r7', orderNumber: '#1224', tableNumber: 'T11', items: 3, total: 67.00, status: 'paid', time: '13:30' },
  { id: 'r8', orderNumber: '#1223', tableNumber: 'T9', items: 8, total: 245.00, status: 'paid', time: '13:15' },
  { id: 'r9', orderNumber: '#1222', tableNumber: 'T3', items: 3, total: 89.00, status: 'paid', time: '13:00' },
  { id: 'r10', orderNumber: '#1221', tableNumber: 'T7', items: 4, total: 112.50, status: 'paid', time: '12:45' },
  { id: 'r11', orderNumber: '#1220', tableNumber: 'T15', items: 2, total: 52.00, status: 'paid', time: '12:30' },
  { id: 'r12', orderNumber: '#1219', tableNumber: 'T4', items: 5, total: 167.00, status: 'paid', time: '12:15' },
  { id: 'r13', orderNumber: '#1218', tableNumber: 'T10', items: 3, total: 94.50, status: 'paid', time: '12:00' },
  { id: 'r14', orderNumber: '#1217', tableNumber: 'T6', items: 4, total: 136.00, status: 'paid', time: '11:45' },
  { id: 'r15', orderNumber: '#1216', tableNumber: 'T2', items: 2, total: 58.00, status: 'paid', time: '11:30' },
  { id: 'r16', orderNumber: '#1215', tableNumber: 'T14', items: 6, total: 198.50, status: 'paid', time: '11:15' },
]

// Recent Orders Summary
const recentOrdersSummary = {
  totalOrders: 16,
  totalRevenue: 1848.50,
  avgOrderValue: 115.53,
  paidCount: 14,
  servedCount: 2,
  hourlyTrend: [2, 3, 1, 4, 2, 3, 2, 4, 3, 2, 3, 2],
}

// Payment Method Breakdown
const paymentMethods = [
  { method: 'Credit Card', icon: CreditCard, amount: 724.50, count: 5, percent: 53, color: 'blue' },
  { method: 'Cash', icon: Banknote, amount: 412.00, count: 4, percent: 30, color: 'green' },
  { method: 'Pix / Mobile', icon: Smartphone, amount: 225.00, count: 3, percent: 17, color: 'violet' },
]

// Order Type Distribution
const orderTypes = [
  { type: 'Dine-in', percent: 58, count: 7, color: 'blue' },
  { type: 'Takeout', percent: 25, count: 3, color: 'amber' },
  { type: 'Delivery', percent: 17, count: 2, color: 'green' },
]

// Best Order of the Day
const bestOrder = {
  orderNumber: '#1223',
  tableNumber: 'T9',
  items: 8,
  total: 245.00,
  time: '13:15',
  server: 'Sarah',
}

// Sales Data (hourly)
const salesData = [
  { hour: '11:00', sales: 450 },
  { hour: '12:00', sales: 1250 },
  { hour: '13:00', sales: 1580 },
  { hour: '14:00', sales: 980 },
  { hour: '15:00', sales: 320 },
  { hour: '16:00', sales: 180 },
  { hour: '17:00', sales: 420 },
  { hour: '18:00', sales: 890 },
  { hour: '19:00', sales: 1450 },
  { hour: '20:00', sales: 1680 },
  { hour: '21:00', sales: 1120 },
  { hour: '22:00', sales: 580 },
]

// Popular Items
const popularItems = [
  { id: 'p1', name: 'Grilled Salmon', quantity: 32, revenue: 896, image: '🐟' },
  { id: 'p2', name: 'Ribeye Steak', quantity: 28, revenue: 1120, image: '🥩' },
  { id: 'p3', name: 'Caesar Salad', quantity: 45, revenue: 540, image: '🥗' },
  { id: 'p4', name: 'Margherita Pizza', quantity: 38, revenue: 608, image: '🍕' },
  { id: 'p5', name: 'Pasta Carbonara', quantity: 25, revenue: 450, image: '🍝' },
]

// Today's Reservations
const todayReservations: Reservation[] = [
  { id: 'res1', guestName: 'John Smith', partySize: 4, time: '12:00', tableNumber: 'T3', status: 'completed', phone: '+1 555-0101' },
  { id: 'res2', guestName: 'Emily Johnson', partySize: 2, time: '12:30', tableNumber: 'T2', status: 'seated', phone: '+1 555-0102' },
  { id: 'res3', guestName: 'Michael Brown', partySize: 6, time: '13:00', tableNumber: 'T6', status: 'completed', phone: '+1 555-0103' },
  { id: 'res4', guestName: 'Sarah Davis', partySize: 2, time: '18:30', tableNumber: 'T1', status: 'confirmed', phone: '+1 555-0104' },
  { id: 'res5', guestName: 'Robert Wilson', partySize: 4, time: '19:00', tableNumber: 'T4', status: 'confirmed', phone: '+1 555-0105', notes: 'Anniversary dinner' },
  { id: 'res6', guestName: 'Jennifer Taylor', partySize: 8, time: '19:30', tableNumber: 'T9', status: 'confirmed', phone: '+1 555-0106', notes: 'Birthday celebration' },
  { id: 'res7', guestName: 'David Martinez', partySize: 3, time: '20:00', tableNumber: 'T7', status: 'pending', phone: '+1 555-0107' },
  { id: 'res8', guestName: 'Lisa Anderson', partySize: 2, time: '20:30', tableNumber: 'T8', status: 'confirmed', phone: '+1 555-0108' },
  { id: 'res9', guestName: 'James Thomas', partySize: 5, time: '21:00', tableNumber: 'T12', status: 'pending', phone: '+1 555-0109' },
]

// Staff on Duty
interface StaffMember {
  id: string
  name: string
  role: 'waiter' | 'chef' | 'host' | 'manager' | 'bartender'
  status: 'active' | 'break'
  section?: string
  avatar?: string
}

const staffOnDuty: StaffMember[] = [
  { id: 's1', name: 'Maria Santos', role: 'waiter', status: 'active', section: 'Section A' },
  { id: 's2', name: 'John Chen', role: 'waiter', status: 'active', section: 'Section B' },
  { id: 's3', name: 'Sarah Kim', role: 'waiter', status: 'break', section: 'Section A' },
  { id: 's4', name: 'Chef Marco', role: 'chef', status: 'active' },
  { id: 's5', name: 'Lisa Park', role: 'host', status: 'active' },
  { id: 's6', name: 'Mike Johnson', role: 'bartender', status: 'active' },
]

// Delivery Orders
const deliveryOrders = {
  pending: 3,
  preparing: 2,
  outForDelivery: 4,
  orders: [
    { id: 'd1', orderNumber: '#D-4521', status: 'preparing', eta: '15 min', total: 45.00 },
    { id: 'd2', orderNumber: '#D-4520', status: 'out', eta: '10 min', total: 32.50 },
    { id: 'd3', orderNumber: '#D-4519', status: 'out', eta: '5 min', total: 28.00 },
    { id: 'd4', orderNumber: '#D-4518', status: 'pending', eta: '25 min', total: 67.00 },
  ],
}

// Order History
interface OrderHistory {
  id: string
  orderNumber: string
  type: 'dine-in' | 'delivery' | 'takeaway'
  tableNumber?: string
  items: number
  subtotal: number
  tip: number
  total: number
  payment: 'cash' | 'card' | 'pix'
  status: 'completed' | 'refunded'
  time: string
}

const orderHistory: OrderHistory[] = [
  { id: 'h1', orderNumber: '#1230', type: 'dine-in', tableNumber: 'T5', items: 4, subtotal: 112.00, tip: 12.00, total: 124.00, payment: 'card', status: 'completed', time: '14:20' },
  { id: 'h2', orderNumber: '#1229', type: 'dine-in', tableNumber: 'T8', items: 2, subtotal: 42.00, tip: 3.50, total: 45.50, payment: 'cash', status: 'completed', time: '14:15' },
  { id: 'h3', orderNumber: '#D-4517', type: 'delivery', items: 3, subtotal: 56.00, tip: 5.00, total: 61.00, payment: 'pix', status: 'completed', time: '14:10' },
  { id: 'h4', orderNumber: '#1228', type: 'dine-in', tableNumber: 'T2', items: 3, subtotal: 70.00, tip: 8.00, total: 78.00, payment: 'card', status: 'completed', time: '14:05' },
  { id: 'h5', orderNumber: '#T-892', type: 'takeaway', items: 2, subtotal: 28.00, tip: 0, total: 28.00, payment: 'card', status: 'completed', time: '13:55' },
  { id: 'h6', orderNumber: '#1227', type: 'dine-in', tableNumber: 'T14', items: 5, subtotal: 140.00, tip: 16.00, total: 156.00, payment: 'card', status: 'completed', time: '13:50' },
  { id: 'h7', orderNumber: '#D-4516', type: 'delivery', items: 4, subtotal: 72.00, tip: 8.00, total: 80.00, payment: 'pix', status: 'completed', time: '13:45' },
  { id: 'h8', orderNumber: '#1226', type: 'dine-in', tableNumber: 'T1', items: 2, subtotal: 30.00, tip: 4.00, total: 34.00, payment: 'cash', status: 'completed', time: '13:40' },
  { id: 'h9', orderNumber: '#1225', type: 'dine-in', tableNumber: 'T6', items: 6, subtotal: 170.00, tip: 19.50, total: 189.50, payment: 'card', status: 'completed', time: '13:30' },
  { id: 'h10', orderNumber: '#T-891', type: 'takeaway', items: 1, subtotal: 15.00, tip: 0, total: 15.00, payment: 'cash', status: 'refunded', time: '13:25' },
]

// Order History Columns
const orderHistoryColumns: ColumnDef<OrderHistory>[] = [
  {
    id: 'orderNumber',
    accessorKey: 'orderNumber',
    header: 'Order #',
    sortable: true,
    cell: ({ value }) => (
      <span className="font-medium text-[var(--text-primary)]">{value as string}</span>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.type === 'dine-in' && <UtensilsCrossed className="h-4 w-4 text-blue-500" />}
        {row.type === 'delivery' && <Truck className="h-4 w-4 text-green-500" />}
        {row.type === 'takeaway' && <Package className="h-4 w-4 text-amber-500" />}
        <span className="capitalize text-[var(--text-secondary)]">
          {row.type === 'dine-in' ? `Table ${row.tableNumber}` : row.type}
        </span>
      </div>
    ),
  },
  {
    id: 'items',
    accessorKey: 'items',
    header: 'Items',
    align: 'center',
    cell: ({ value }) => (
      <Badge variant="default" size="sm">{value as number} items</Badge>
    ),
  },
  {
    id: 'subtotal',
    accessorKey: 'subtotal',
    header: 'Subtotal',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="text-[var(--text-secondary)]">${(value as number).toFixed(2)}</span>
    ),
  },
  {
    id: 'tip',
    accessorKey: 'tip',
    header: 'Tip',
    align: 'right',
    cell: ({ row }) => {
      const tipPercent = row.subtotal > 0 ? ((row.tip / row.subtotal) * 100).toFixed(0) : 0
      return (
        <span className="text-green-600 dark:text-green-400">
          ${row.tip.toFixed(2)}
          {row.tip > 0 && <span className="text-xs text-[var(--text-muted)] ml-1">({tipPercent}%)</span>}
        </span>
      )
    },
  },
  {
    id: 'total',
    accessorKey: 'total',
    header: 'Total',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-semibold text-[var(--text-primary)]">${(value as number).toFixed(2)}</span>
    ),
  },
  {
    id: 'payment',
    accessorKey: 'payment',
    header: 'Payment',
    cell: ({ value }) => {
      const PaymentIcon = value === 'card' ? CreditCard : value === 'cash' ? Banknote : Smartphone
      return (
        <div className="flex items-center gap-1.5">
          <PaymentIcon className="h-4 w-4 text-[var(--text-muted)]" />
          <span className="capitalize text-[var(--text-secondary)]">{value as string}</span>
        </div>
      )
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ value }) => (
      <Badge variant={value === 'completed' ? 'success' : 'error'} size="sm">
        {value as string}
      </Badge>
    ),
  },
  {
    id: 'time',
    accessorKey: 'time',
    header: 'Time',
    sortable: true,
    cell: ({ value }) => (
      <span className="text-[var(--text-muted)]">{value as string}</span>
    ),
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function RestaurantDashboard() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const [isOpen, setIsOpen] = React.useState(true)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Update current time
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const currentTimeString = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`

  const roleColors: Record<StaffMember['role'], string> = {
    waiter: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    chef: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    host: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    manager: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    bartender: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  }

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden sm:block sm:w-48" />
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">Restaurant Manager</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] flex items-center justify-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {isOpen ? 'Open' : 'Closed'}
            </span>
            <span className="text-xl font-mono font-semibold text-[var(--text-primary)]">
              {formattedTime}
            </span>
            <Badge variant="default" size="sm">
              <Users className="h-3 w-3 mr-1" />
              {liveStats.guestsNow.value} guests
            </Badge>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Order
          </Button>
          <Button variant="outline" size="sm" leftIcon={<CalendarDays className="h-4 w-4" />}>
            Reservations
          </Button>
        </div>
      </div>

      {/* ====== HERO: DAILY PERFORMANCE ====== */}
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/20 dark:via-slate-900 dark:to-rose-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.08),transparent_60%)]" />
          <Card.Content className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                    <DollarSign className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">Today&apos;s Revenue</p>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{heroData.changePercent}%
                  </Badge>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                    ${heroData.todayRevenue.toLocaleString()}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                  <TrendingUp className="h-4 w-4" />
                  +${heroData.changeValue.toLocaleString()} vs yesterday at this time
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{heroData.ordersToday} orders served</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>${heroData.avgOrderValue.toFixed(2)} avg ticket</span>
                  </div>
                </div>
              </div>

              {/* Center: Mini Hourly Revenue Chart */}
              <div className="hidden lg:flex flex-col items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Revenue by Hour</p>
                <svg viewBox="0 0 200 80" className="w-72 h-36" fill="none">
                  <defs>
                    <linearGradient id="heroBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                    <linearGradient id="heroBarPeak" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[20, 40, 60].map((y) => (
                    <line key={y} x1="8" y1={y} x2="196" y2={y} stroke="var(--border-default)" strokeWidth="0.5" opacity="0.3" />
                  ))}
                  {/* Bars */}
                  {[
                    { x: 12, h: 18, label: '11' },
                    { x: 28, h: 48, label: '12' },
                    { x: 44, h: 58, label: '13', peak: true },
                    { x: 60, h: 38, label: '14' },
                    { x: 76, h: 14, label: '15' },
                    { x: 92, h: 8, label: '16' },
                    { x: 108, h: 16, label: '17' },
                    { x: 124, h: 34, label: '18' },
                    { x: 140, h: 54, label: '19' },
                    { x: 156, h: 62, label: '20', peak: true },
                    { x: 172, h: 42, label: '21' },
                    { x: 188, h: 22, label: '22' },
                  ].map((bar) => (
                    <g key={bar.label}>
                      <rect
                        x={bar.x - 5}
                        y={68 - bar.h}
                        width="10"
                        height={bar.h}
                        rx="3"
                        fill={bar.peak ? 'url(#heroBarPeak)' : 'url(#heroBarGrad)'}
                        opacity={bar.peak ? 1 : 0.75}
                      />
                      <text x={bar.x} y={76} textAnchor="middle" fontSize="5" fill="var(--text-muted)" opacity="0.5">{bar.label}</text>
                    </g>
                  ))}
                </svg>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" />Peak hours</span>
                  <span>Lunch 12-14h • Dinner 19-21h</span>
                </div>
              </div>

              {/* Right: Service Stats */}
              <div className="grid grid-cols-2 gap-3 lg:min-w-[300px]">
                {[
                  { label: 'Table Turnover', value: '3.2x', icon: <ArrowUpRight className="h-3.5 w-3.5" />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
                  { label: 'Avg Service', value: '42min', icon: <Clock className="h-3.5 w-3.5" />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                  { label: 'Kitchen Speed', value: '18min', icon: <ChefHat className="h-3.5 w-3.5" />, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
                  { label: 'Satisfaction', value: '4.8★', icon: <Star className="h-3.5 w-3.5" />, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/60 dark:bg-white/5 p-3 border border-red-200/30 dark:border-red-800/20">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-md ${stat.bg}`}>
                        <span className={stat.color}>{stat.icon}</span>
                      </div>
                      <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
                    </div>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 1: LIVE STATS ====== */}
      {(() => {
        const kpiCards = [
          {
            key: 'tables',
            label: 'Tables Occupied',
            value: `${liveStats.tablesOccupied.value}/${liveStats.tablesOccupied.total}`,
            sub: null,
            progress: (liveStats.tablesOccupied.value / liveStats.tablesOccupied.total) * 100,
            icon: <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
            gradient: 'from-blue-500 to-blue-400',
            sparkData: kpiSparklines.tablesOccupied,
            sparkColor: '#3B82F6',
            sparkType: 'area' as const,
            urgent: false,
          },
          {
            key: 'guests',
            label: 'Guests Now',
            value: String(liveStats.guestsNow.value),
            sub: { text: `+${liveStats.guestsNow.change} from last hour`, positive: true },
            progress: null,
            icon: <Users className="h-5 w-5 text-green-600 dark:text-green-400" />,
            iconBg: 'bg-green-100 dark:bg-green-900/30',
            gradient: 'from-green-500 to-emerald-400',
            sparkData: kpiSparklines.guestsNow,
            sparkColor: '#22C55E',
            sparkType: 'area' as const,
            urgent: false,
          },
          {
            key: 'kitchen',
            label: 'Orders in Kitchen',
            value: String(liveStats.ordersInKitchen.value),
            sub: liveStats.ordersInKitchen.isUrgent ? { text: '2 orders over 20min', positive: false } : null,
            progress: null,
            icon: <ChefHat className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
            iconBg: 'bg-amber-100 dark:bg-amber-900/30',
            gradient: 'from-amber-500 to-orange-400',
            sparkData: kpiSparklines.ordersInKitchen,
            sparkColor: '#F59E0B',
            sparkType: 'bar' as const,
            urgent: liveStats.ordersInKitchen.isUrgent,
          },
          {
            key: 'revenue',
            label: "Today's Revenue",
            value: `$${liveStats.todayRevenue.value.toLocaleString()}`,
            sub: { text: `+${liveStats.todayRevenue.change}% vs yesterday`, positive: true },
            progress: null,
            icon: <DollarSign className="h-5 w-5 text-red-600 dark:text-red-400" />,
            iconBg: 'bg-red-100 dark:bg-red-900/30',
            gradient: 'from-red-500 to-rose-400',
            sparkData: kpiSparklines.todayRevenue,
            sparkColor: '#EF4444',
            sparkType: 'area' as const,
            urgent: false,
          },
        ]

        const renderKpiCard = (kpi: typeof kpiCards[number]) => (
          <Card key={kpi.key} className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${kpi.urgent ? 'ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-slate-900' : ''}`}>
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${kpi.gradient}`} />
            <Card.Content className="relative p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">{kpi.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${kpi.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-[var(--text-primary)]'}`}>{kpi.value}</p>
                  {kpi.sub && (
                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${kpi.urgent ? 'text-amber-600 dark:text-amber-400 animate-pulse' : kpi.sub.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {kpi.urgent ? <Flame className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                      {kpi.sub.text}
                    </p>
                  )}
                </div>
                <div className={`rounded-lg p-2 ${kpi.iconBg} ${kpi.urgent ? 'animate-pulse' : ''}`}>{kpi.icon}</div>
              </div>
              {kpi.progress !== null && (
                <div className="mt-2">
                  <ProgressBar value={kpi.progress} size="sm" variant="default" />
                </div>
              )}
              <div className="mt-2">
                <SparklineChart data={kpi.sparkData} type={kpi.sparkType} color={kpi.sparkColor} width={140} height={32} gradient />
              </div>
            </Card.Content>
          </Card>
        )

        return (
          <>
            {/* Mobile: Carousel */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 py-1 sm:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {isLoading
                ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-36 w-[75vw] max-w-[280px] shrink-0 snap-start rounded-xl" />)
                : kpiCards.map((kpi) => (
                    <div key={kpi.key} className="w-[75vw] max-w-[280px] shrink-0 snap-start">
                      {renderKpiCard(kpi)}
                    </div>
                  ))
              }
            </div>
            {/* Desktop: Grid */}
            <div className="hidden sm:block">
              <DashboardGrid preset="4col" gap="lg">
                {isLoading
                  ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)
                  : kpiCards.map((kpi) => renderKpiCard(kpi))
                }
              </DashboardGrid>
            </div>
          </>
        )
      })()}

      {/* ====== ROW 2: TABLE MAP ====== */}
      {isLoading ? (
        <Skeleton className="h-80 rounded-xl" />
      ) : (
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 rounded-t-xl z-10" />
          {/* Mobile: 3 columns */}
          <div className="sm:hidden">
            <TableGrid
              tables={restaurantTables}
              columns={3}
              onTableClick={() => {/* Handle table click */}}
              showLegend
              title="Floor Plan"
              variant="compact"
            />
          </div>
          {/* Desktop: 6 columns */}
          <div className="hidden sm:block">
            <TableGrid
              tables={restaurantTables}
              columns={6}
              onTableClick={() => {/* Handle table click */}}
              showLegend
              title="Floor Plan"
            />
          </div>
        </div>
      )}

      {/* ====== ROW 3: KITCHEN ORDERS + RECENT ORDERS ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Kitchen Orders */}
        <Card className="relative overflow-hidden lg:col-span-3">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm shadow-amber-500/25">
                    <ChefHat className="h-4 w-4 text-white" />
                  </div>
                  Kitchen Orders
                </Card.Title>
                <Card.Description className="mt-1">
                  {kitchenOrders.filter(o => o.status === 'pending').length} pending, {kitchenOrders.filter(o => o.status === 'preparing').length} preparing
                </Card.Description>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 rounded-lg" />
                ))}
              </div>
            ) : (
              <OrderTicketList
                orders={kitchenOrders}
                onMarkReady={() => {/* Handle mark order ready */}}
                onStartPreparing={() => {/* Handle start preparing */}}
                maxVisible={4}
              />
            )}
          </Card.Content>
        </Card>

        {/* Recent Orders */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-950/20 dark:to-indigo-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm shadow-blue-500/25">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  Recent Orders
                </Card.Title>
                <Card.Description className="mt-1">Completed today</Card.Description>
              </div>
              <Badge variant="default" size="sm">{recentOrdersSummary.totalOrders} orders</Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 p-2.5 border border-blue-200/50 dark:border-blue-800/30 text-center">
                    <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Revenue</p>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">${recentOrdersSummary.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/15 dark:to-emerald-900/15 p-2.5 border border-green-200/50 dark:border-green-800/30 text-center">
                    <p className="text-[10px] font-medium text-green-600 dark:text-green-400">Avg Ticket</p>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">${recentOrdersSummary.avgOrderValue.toFixed(0)}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/15 p-2.5 border border-violet-200/50 dark:border-violet-800/30 text-center">
                    <p className="text-[10px] font-medium text-violet-600 dark:text-violet-400">Paid</p>
                    <p className="text-sm font-bold text-violet-700 dark:text-violet-300">{recentOrdersSummary.paidCount}/{recentOrdersSummary.totalOrders}</p>
                  </div>
                </div>

                {/* Hourly Sparkline */}
                <div className="rounded-lg bg-[var(--bg-subtle)] p-2.5 mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Orders / Hour</span>
                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Today</span>
                  </div>
                  <SparklineChart
                    data={recentOrdersSummary.hourlyTrend}
                    type="bar"
                    color="#3B82F6"
                    height={36}
                    gradient
                    animated
                  />
                </div>

                {/* Payment Methods */}
                <div className="rounded-lg bg-[var(--bg-subtle)] p-2.5 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Payment Methods</span>
                  <div className="mt-2 space-y-2">
                    {paymentMethods.map((pm) => (
                      <div key={pm.method} className="flex items-center gap-2">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-md ${
                          pm.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          pm.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                          'bg-violet-100 dark:bg-violet-900/30'
                        }`}>
                          <pm.icon className={`h-3 w-3 ${
                            pm.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            pm.color === 'green' ? 'text-green-600 dark:text-green-400' :
                            'text-violet-600 dark:text-violet-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-medium text-[var(--text-primary)]">{pm.method}</span>
                            <span className="text-xs font-semibold text-[var(--text-primary)]">${pm.amount.toFixed(0)}</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-[var(--bg-muted)]">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                pm.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                                pm.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-violet-500 to-purple-500'
                              }`}
                              style={{ width: `${pm.percent}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-[var(--text-muted)] w-8 text-right">{pm.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Type Distribution */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  {orderTypes.map((ot) => (
                    <div key={ot.type} className={`rounded-lg p-2 text-center border ${
                      ot.color === 'blue' ? 'bg-blue-50/50 border-blue-200/40 dark:bg-blue-900/10 dark:border-blue-800/30' :
                      ot.color === 'amber' ? 'bg-amber-50/50 border-amber-200/40 dark:bg-amber-900/10 dark:border-amber-800/30' :
                      'bg-green-50/50 border-green-200/40 dark:bg-green-900/10 dark:border-green-800/30'
                    }`}>
                      <p className={`text-lg font-bold ${
                        ot.color === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                        ot.color === 'amber' ? 'text-amber-700 dark:text-amber-300' :
                        'text-green-700 dark:text-green-300'
                      }`}>{ot.percent}%</p>
                      <p className="text-[10px] font-medium text-[var(--text-muted)]">{ot.type}</p>
                      <p className={`text-[10px] font-semibold ${
                        ot.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        ot.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>{ot.count} orders</p>
                    </div>
                  ))}
                </div>

                {/* Best Order Highlight */}
                <div className="rounded-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/15 dark:via-yellow-900/10 dark:to-orange-900/15 p-3 mb-3 border border-amber-200/50 dark:border-amber-800/30">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">Best Order Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-amber-800 dark:text-amber-200">${bestOrder.total.toFixed(2)}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-amber-600/80 dark:text-amber-400/80">{bestOrder.orderNumber}</span>
                        <span className="text-xs text-amber-600/60 dark:text-amber-400/60">•</span>
                        <span className="text-xs text-amber-600/80 dark:text-amber-400/80">{bestOrder.tableNumber}</span>
                        <span className="text-xs text-amber-600/60 dark:text-amber-400/60">•</span>
                        <span className="text-xs text-amber-600/80 dark:text-amber-400/80">{bestOrder.items} items</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-300">{bestOrder.server}</p>
                      <p className="text-[10px] text-amber-600/70 dark:text-amber-400/70">{bestOrder.time}</p>
                    </div>
                  </div>
                </div>

                {/* Order List */}
                {/* Mobile: 2-column carousel */}
                <div className="sm:hidden">
                  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {(() => {
                      const pages: (typeof recentOrders)[] = []
                      for (let i = 0; i < recentOrders.length; i += 2) {
                        pages.push(recentOrders.slice(i, i + 2))
                      }
                      return pages.map((page, pi) => (
                        <div key={pi} className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col gap-2">
                          {page.map((order) => (
                            <div key={order.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 w-2 rounded-full ${order.status === 'paid' ? 'bg-green-500' : order.status === 'served' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                  <span className="text-sm font-bold text-[var(--text-primary)]">{order.orderNumber}</span>
                                  <span className="text-xs text-[var(--text-muted)]">{order.tableNumber}</span>
                                </div>
                                <Badge variant={order.status === 'paid' ? 'success' : order.status === 'served' ? 'warning' : 'default'} size="sm">
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--text-muted)]">{order.items} itens • {order.time}</span>
                                <span className="text-sm font-semibold text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))
                    })()}
                  </div>
                </div>
                {/* Desktop: List */}
                <div className="hidden sm:block space-y-1">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="group flex items-center justify-between p-2 rounded-lg border border-transparent hover:border-blue-200/50 hover:bg-blue-50/50 dark:hover:border-blue-800/30 dark:hover:bg-blue-900/10 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`h-2 w-2 rounded-full ${
                          order.status === 'paid' ? 'bg-green-500' : order.status === 'served' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-sm font-medium text-[var(--text-primary)]">{order.orderNumber}</span>
                        <span className="text-xs text-[var(--text-muted)]">{order.tableNumber}</span>
                        <Badge variant="default" size="sm">{order.items} itens</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">{order.time}</span>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                        <Badge variant={order.status === 'paid' ? 'success' : order.status === 'served' ? 'warning' : 'default'} size="sm">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 4: SALES CHART + POPULAR ITEMS ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Today's Sales */}
        <Card className="relative overflow-hidden lg:col-span-3">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5 dark:from-red-950/20 dark:to-rose-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-sm shadow-red-500/25">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  Today&apos;s Sales
                </Card.Title>
                <Card.Description className="mt-1">Revenue by hour</Card.Description>
              </div>
              <Badge variant="default" size="sm">Hourly</Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-[350px] rounded-lg" />
            ) : (
              <ChartWrapper
                type="area"
                data={salesData}
                series={[
                  { dataKey: 'sales', name: 'Sales', fillOpacity: 0.4, color: '#EF4444' },
                ]}
                xAxisKey="hour"
                height={350}
                showTooltip
                showGrid
                tooltipFormatter={(value) => `$${value.toLocaleString()}`}
              />
            )}
          </Card.Content>
        </Card>

        {/* Popular Items */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 dark:from-orange-950/20 dark:to-amber-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm shadow-orange-500/25">
                    <Flame className="h-4 w-4 text-white" />
                  </div>
                  Popular Items
                </Card.Title>
                <Card.Description className="mt-1">Today&apos;s best sellers</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {popularItems.map((item, index) => {
                  const maxQuantity = Math.max(...popularItems.map(i => i.quantity))
                  const percentage = (item.quantity / maxQuantity) * 100

                  return (
                    <div key={item.id} className="group space-y-1.5 p-2.5 rounded-xl border border-transparent hover:border-orange-200/50 hover:bg-orange-50/30 dark:hover:border-orange-800/30 dark:hover:bg-orange-900/10 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100/80 dark:bg-orange-900/20 text-xl">
                            {item.image}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-1">
                              {item.name}
                              {index === 0 && (
                                <Badge variant="warning" size="sm" className="ml-1">
                                  <Flame className="h-3 w-3 mr-0.5" /> #1
                                </Badge>
                              )}
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">{item.quantity} sold</p>
                          </div>
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          ${item.revenue}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 5: RESERVATIONS + STAFF ====== */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Reservations Timeline */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <Skeleton className="h-96 rounded-xl" />
          ) : (
            <ReservationTimeline
              reservations={todayReservations}
              startTime="11:00"
              endTime="22:00"
              interval={30}
              currentTime={currentTimeString}
              onReservationClick={() => {/* Handle reservation click */}}
            />
          )}
        </div>

        {/* Staff on Duty */}
        <Card className="relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 dark:from-violet-950/20 dark:to-purple-950/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-sm shadow-violet-500/25">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Staff on Duty
                </Card.Title>
                <Card.Description className="mt-1">{staffOnDuty.length} team members</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {staffOnDuty.map((staff) => (
                  <div
                    key={staff.id}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-violet-200/50 hover:bg-violet-50/30 dark:hover:border-violet-800/30 dark:hover:bg-violet-900/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar
                          fallback={staff.name.split(' ').map(n => n[0] ?? '').join('')}
                          size="sm"
                        />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                          staff.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{staff.name}</p>
                        {staff.section && (
                          <p className="text-xs text-[var(--text-muted)]">{staff.section}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={roleColors[staff.role]} size="sm">
                      {staff.role}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 6: DELIVERY ORDERS ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 dark:from-green-950/20 dark:to-emerald-950/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm shadow-green-500/25">
                  <Truck className="h-4 w-4 text-white" />
                </div>
                Delivery Orders
              </Card.Title>
              <Card.Description className="mt-1">
                {deliveryOrders.pending} pending, {deliveryOrders.preparing} preparing, {deliveryOrders.outForDelivery} out for delivery
              </Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="relative">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryOrders.orders.map((order) => (
                <div
                  key={order.id}
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                    order.status === 'pending'
                      ? 'border-amber-200 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-900/10'
                      : order.status === 'preparing'
                        ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-900/10'
                        : 'border-green-200 bg-green-50/50 dark:border-green-800/50 dark:bg-green-900/10'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    order.status === 'pending'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                      : order.status === 'preparing'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        : 'bg-gradient-to-r from-green-500 to-emerald-400'
                  }`} />
                  <div className="relative p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[var(--text-primary)]">{order.orderNumber}</span>
                      <Badge
                        variant={order.status === 'pending' ? 'warning' : order.status === 'preparing' ? 'info' : 'success'}
                        size="sm"
                      >
                        {order.status === 'out' ? 'On the way' : order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-[var(--text-muted)]">
                        <Timer className="h-4 w-4" />
                        ETA: {order.eta}
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* ====== ROW 7: ORDER HISTORY TABLE ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-gray-500/5 dark:from-slate-950/20 dark:to-gray-950/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-400" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-sm shadow-red-500/25">
                  <Coffee className="h-4 w-4 text-white" />
                </div>
                Order History
              </Card.Title>
              <Card.Description className="mt-1">All orders from today</Card.Description>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              Export
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="relative" padding="none">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Mobile: Auto-scroll marquee */}
              <div className="sm:hidden relative h-[320px] overflow-hidden px-4 py-2">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
                <div className="animate-restaurant-marquee hover:[animation-play-state:paused]">
                  {[...orderHistory, ...orderHistory].map((order, idx) => (
                    <div key={`${order.id}-${idx}`} className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-default)] mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`h-2 w-2 rounded-full shrink-0 ${order.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-medium text-[var(--text-primary)]">{order.orderNumber}</span>
                        {order.tableNumber && <span className="text-xs text-[var(--text-muted)]">{order.tableNumber}</span>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-[var(--text-muted)]">{order.time}</span>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <style>{`
                  @keyframes restaurant-marquee {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                  }
                  .animate-restaurant-marquee {
                    animation: restaurant-marquee 40s linear infinite;
                  }
                  .animate-restaurant-marquee:hover {
                    animation-play-state: paused;
                  }
                `}</style>
              </div>
              {/* Desktop: DataTable */}
              <div className="hidden sm:block">
                <DataTable
                  data={orderHistory}
                  columns={orderHistoryColumns}
                  sortable
                  pagination
                  pageSize={10}
                  hoverable
                />
              </div>
            </>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
