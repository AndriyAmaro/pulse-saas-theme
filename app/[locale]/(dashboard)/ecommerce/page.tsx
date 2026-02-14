'use client'

import * as React from 'react'
import {
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  TrendingUp,
  Download,
  Plus,
  Package,
  Eye,
  RefreshCw,
  Truck,
  AlertTriangle,
  Clock,
  Zap,
  Star,
  ArrowRight,
  Filter,
  BarChart3,
  Tag,
  CheckCircle,
  XCircle,
  RotateCcw,
  Coins,
  type LucideIcon,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { MetricCardAdvanced } from '@core/patterns/MetricCardAdvanced'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { ProductCard } from '@core/patterns/ProductCard'
import { RegionStats, type RegionItem } from '@core/patterns/RegionStats'
import { LeaderboardList, type LeaderboardItem } from '@core/patterns/LeaderboardList'
import { CountdownTimer } from '@core/patterns/CountdownTimer'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ProgressBar } from '@core/patterns/ProgressBar'

// ============================================================================
// MOCK DATA
// ============================================================================

// KPI Data
const kpiData = {
  totalSales: {
    value: '$127,432',
    change: 18.2,
    sparkline: [8200, 9100, 8800, 10200, 11500, 10800, 12400, 11900, 13200, 14100, 12700, 14800],
  },
  orders: {
    value: '1,847',
    change: 12.5,
    sparkline: [145, 168, 152, 178, 192, 184, 201, 195, 218, 224, 198, 232],
  },
  customers: {
    value: '3,291',
    change: 8.7,
    breakdown: [
      { label: 'new', value: '+127', isPositive: true },
      { label: 'returning', value: '2,164' },
    ],
  },
  avgOrderValue: {
    value: '$68.94',
    change: 3.2,
    progress: 69,
    target: 100,
    progressLabel: 'Target: $100',
  },
}

// Sales over time
const salesOverTimeData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 29 + i)
  const baseRevenue = 3500 + Math.sin(i / 4) * 1500
  const orders = Math.round((baseRevenue / 68) + Math.random() * 20)
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Math.round(baseRevenue + Math.random() * 800),
    orders: orders,
  }
})

// Sales by category
const salesByCategoryData = [
  { category: 'Electronics', sales: 42500, color: '#3B82F6' },
  { category: 'Clothing', sales: 31200, color: '#10B981' },
  { category: 'Home & Garden', sales: 24800, color: '#8B5CF6' },
  { category: 'Sports', sales: 18600, color: '#F59E0B' },
  { category: 'Books', sales: 12400, color: '#EF4444' },
]

// Payment methods
const paymentMethodsData = [
  { method: 'Credit Card', count: 842, percentage: 45.6, icon: CreditCard },
  { method: 'PIX', count: 524, percentage: 28.4, icon: Zap },
  { method: 'PayPal', count: 287, percentage: 15.5, icon: DollarSign },
  { method: 'Bank Transfer', count: 124, percentage: 6.7, icon: TrendingUp },
  { method: 'Apple Pay', count: 70, percentage: 3.8, icon: Star },
  { method: 'USDT (Tether)', count: 48, percentage: 2.6, icon: Coins },
]

// Order status with icons
const orderStatusData: { status: string; count: number; icon: LucideIcon; bgColor: string; iconColor: string }[] = [
  { status: 'Completed', count: 892, icon: CheckCircle, bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
  { status: 'Processing', count: 456, icon: Clock, bgColor: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { status: 'Shipped', count: 321, icon: Truck, bgColor: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400' },
  { status: 'Cancelled', count: 98, icon: XCircle, bgColor: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
  { status: 'Refunded', count: 80, icon: RotateCcw, bgColor: 'bg-slate-200 dark:bg-slate-700', iconColor: 'text-slate-700 dark:text-slate-300' },
]
const totalOrders = orderStatusData.reduce((sum, s) => sum + s.count, 0)

// Sales by region
const salesByRegionData: RegionItem[] = [
  { id: '1', name: 'California', flag: '🇺🇸', value: 28450 },
  { id: '2', name: 'Texas', flag: '🇺🇸', value: 22180 },
  { id: '3', name: 'New York', flag: '🇺🇸', value: 19870 },
  { id: '4', name: 'Florida', flag: '🇺🇸', value: 15640 },
  { id: '5', name: 'Ontario', flag: '🇨🇦', value: 12890 },
]

// Top products
interface TopProduct {
  id: string
  name: string
  image?: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  sales: number
  badge?: 'bestseller' | 'sale' | 'new'
}

const topProductsData: TopProduct[] = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 342,
    sales: 1247,
    badge: 'bestseller',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 299.99,
    rating: 4.6,
    reviewCount: 287,
    sales: 856,
    badge: 'bestseller',
  },
  {
    id: '3',
    name: 'Premium Yoga Mat',
    price: 49.99,
    rating: 4.9,
    reviewCount: 256,
    sales: 723,
    badge: 'new',
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 234,
    sales: 612,
    badge: 'sale',
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    rating: 4.7,
    reviewCount: 198,
    sales: 534,
  },
  {
    id: '6',
    name: 'Bluetooth Speaker Mini',
    price: 59.99,
    rating: 4.4,
    reviewCount: 176,
    sales: 487,
    badge: 'new',
  },
]

// Recent orders
interface RecentOrder {
  id: string
  orderId: string
  customer: string
  customerAvatar?: string
  products: string
  total: number
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled' | 'Refunded'
  date: string
}

const recentOrdersData: RecentOrder[] = [
  { id: '1', orderId: '#ORD-7829', customer: 'Sarah Johnson', products: 'Wireless Earbuds Pro, Phone Case', total: 124.99, status: 'Completed', date: '2026-02-06' },
  { id: '2', orderId: '#ORD-7828', customer: 'Michael Chen', products: 'Smart Watch Series X', total: 299.99, status: 'Processing', date: '2026-02-06' },
  { id: '3', orderId: '#ORD-7827', customer: 'Emily Davis', products: 'Premium Yoga Mat, Resistance Bands', total: 67.50, status: 'Shipped', date: '2026-02-05' },
  { id: '4', orderId: '#ORD-7826', customer: 'James Wilson', products: 'Organic Cotton T-Shirt (x2)', total: 59.98, status: 'Completed', date: '2026-02-05' },
  { id: '5', orderId: '#ORD-7825', customer: 'Lisa Anderson', products: 'Stainless Steel Water Bottle, Lunch Box', total: 45.99, status: 'Cancelled', date: '2026-02-05' },
  { id: '6', orderId: '#ORD-7824', customer: 'Robert Martinez', products: 'Running Shoes, Athletic Socks', total: 189.99, status: 'Shipped', date: '2026-02-04' },
  { id: '7', orderId: '#ORD-7823', customer: 'Jennifer Brown', products: 'Skincare Set', total: 79.99, status: 'Completed', date: '2026-02-04' },
  { id: '8', orderId: '#ORD-7822', customer: 'David Lee', products: 'Bluetooth Speaker, USB-C Cable', total: 94.98, status: 'Refunded', date: '2026-02-04' },
  { id: '9', orderId: '#ORD-7821', customer: 'Amanda Taylor', products: 'Coffee Maker, Coffee Beans', total: 156.50, status: 'Completed', date: '2026-02-03' },
  { id: '10', orderId: '#ORD-7820', customer: 'Chris Garcia', products: 'Gaming Mouse, Mouse Pad', total: 89.99, status: 'Processing', date: '2026-02-03' },
]

// Top customers
const topCustomersData: LeaderboardItem[] = [
  { id: '1', rank: 1, name: 'Sarah Johnson', value: 2847.50 },
  { id: '2', rank: 2, name: 'Michael Chen', value: 2156.80 },
  { id: '3', rank: 3, name: 'Emily Davis', value: 1892.30 },
  { id: '4', rank: 4, name: 'James Wilson', value: 1654.90 },
  { id: '5', rank: 5, name: 'Lisa Anderson', value: 1423.75 },
]

// Low stock items
interface LowStockItem {
  id: string
  name: string
  sku: string
  stock: number
  threshold: number
  status: 'critical' | 'warning'
}

const lowStockData: LowStockItem[] = [
  { id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001', stock: 3, threshold: 10, status: 'critical' },
  { id: '2', name: 'Smart Watch Series X', sku: 'SWX-002', stock: 8, threshold: 15, status: 'warning' },
  { id: '3', name: 'USB-C Fast Charger', sku: 'UFC-003', stock: 5, threshold: 20, status: 'critical' },
  { id: '4', name: 'Laptop Stand Aluminum', sku: 'LSA-004', stock: 12, threshold: 15, status: 'warning' },
  { id: '5', name: 'Webcam HD 1080p', sku: 'WHD-005', stock: 2, threshold: 10, status: 'critical' },
]

// Inventory stats
const inventoryStats = {
  total: 1234,
  inStock: 1156,
  lowStock: 56,
  outOfStock: 22,
}

// Flash sale end time (3 days from now)
const flashSaleEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

// Table columns
const orderColumns: ColumnDef<RecentOrder>[] = [
  {
    id: 'orderId',
    accessorKey: 'orderId',
    header: 'Order ID',
    sortable: true,
    cell: ({ value }) => (
      <span className="font-medium text-[var(--text-primary)]">{value as string}</span>
    ),
  },
  {
    id: 'customer',
    accessorKey: 'customer',
    header: 'Customer',
    sortable: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size="xs" initials={row.customer} />
        <span>{row.customer}</span>
      </div>
    ),
  },
  {
    id: 'products',
    accessorKey: 'products',
    header: 'Products',
    cell: ({ value }) => (
      <span className="text-[var(--text-muted)] truncate max-w-[180px] block">
        {value as string}
      </span>
    ),
  },
  {
    id: 'total',
    accessorKey: 'total',
    header: 'Total',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-semibold">${(value as number).toFixed(2)}</span>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => {
      const statusConfig = {
        Completed: 'success',
        Processing: 'warning',
        Shipped: 'info',
        Cancelled: 'error',
        Refunded: 'default',
      } as const
      return (
        <Badge variant={statusConfig[value as RecentOrder['status']]} size="sm">
          {value as string}
        </Badge>
      )
    },
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Date',
    sortable: true,
    cell: ({ value }) => new Date(value as string).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function EcommercePage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const totalPayments = paymentMethodsData.reduce((sum, p) => sum + p.count, 0)

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
            E-commerce
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Monitor your store performance, track orders, and manage inventory
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* ====== FLASH SALE BANNER ====== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-6 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-white/5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Flash Sale Active!</h2>
              <p className="text-white/80">Up to 50% off on selected items</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-white/70 mb-1">Ends in</p>
              <CountdownTimer
                targetDate={flashSaleEndDate}
                variant="compact"
                size="sm"
                showLabels={false}
                separator=":"
              />
            </div>
            <Button className="bg-white text-pink-600 hover:bg-white/90 border-0">
              View Deals
            </Button>
          </div>
        </div>
      </div>

      {/* ====== KPI CARDS ====== */}
      <DashboardGrid preset="4col" gap="lg" className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-3 pb-3 sm:grid sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <MetricCardAdvanced
              title="Total Sales"
              value={kpiData.totalSales.value}
              change={kpiData.totalSales.change}
              changeLabel="vs last month"
              sparkline={kpiData.totalSales.sparkline}
              sparklineColor="#10B981"
              icon={<DollarSign className="h-5 w-5" />}
              iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
              variant="elevated"
            />
            </div>
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <MetricCardAdvanced
              title="Orders"
              value={kpiData.orders.value}
              change={kpiData.orders.change}
              changeLabel="vs last month"
              sparkline={kpiData.orders.sparkline}
              sparklineColor="#3B82F6"
              icon={<ShoppingCart className="h-5 w-5" />}
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              variant="elevated"
            />
            </div>
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <MetricCardAdvanced
              title="Customers"
              value={kpiData.customers.value}
              change={kpiData.customers.change}
              changeLabel="vs last month"
              breakdown={kpiData.customers.breakdown}
              icon={<Users className="h-5 w-5" />}
              iconBgColor="bg-violet-100 dark:bg-violet-900/30"
              variant="elevated"
            />
            </div>
            <div className="snap-start shrink-0 w-[75vw] sm:w-auto sm:shrink">
            <MetricCardAdvanced
              title="Avg Order Value"
              value={kpiData.avgOrderValue.value}
              change={kpiData.avgOrderValue.change}
              changeLabel="vs last month"
              progress={kpiData.avgOrderValue.progress}
              target={kpiData.avgOrderValue.target}
              progressLabel={kpiData.avgOrderValue.progressLabel}
              icon={<TrendingUp className="h-5 w-5" />}
              iconBgColor="bg-amber-100 dark:bg-amber-900/30"
              variant="elevated"
            />
            </div>
          </>
        )}
      </DashboardGrid>

      {/* ====== ROW 2: Sales Overview + Category ====== */}
      <DashboardGrid preset="content-sidebar" gap="lg">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary-500" />
                  Sales Overview
                </Card.Title>
                <Card.Description>Revenue and orders for the last 30 days</Card.Description>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" size="sm">Daily</Badge>
                <Badge variant="info" size="sm">Weekly</Badge>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-[320px] rounded-lg" />
            ) : (
              <div className="-ml-7 -mr-5 sm:ml-0 sm:mr-0">
                <ChartWrapper
                  type="area"
                  data={salesOverTimeData}
                  series={[
                    { dataKey: 'revenue', name: 'Revenue', fillOpacity: 0.4 },
                    { dataKey: 'orders', name: 'Orders', fillOpacity: 0.2 },
                  ]}
                  xAxisKey="date"
                  height={320}
                  showLegend
                  showTooltip
                  showGrid
                  tooltipFormatter={(value, name) =>
                    name === 'Revenue' ? `$${value.toLocaleString()}` : value.toString()
                  }
                />
              </div>
            )}
          </Card.Content>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 to-purple-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary-500" />
              Sales by Category
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-[300px] rounded-lg" />
            ) : (
              <ChartWrapper
                type="donut"
                data={salesByCategoryData}
                series={[{ dataKey: 'sales', name: 'Sales' }]}
                xAxisKey="category"
                height={280}
                showLegend
                showTooltip
                showLabels={false}
                tooltipFormatter={(value) => `$${value.toLocaleString()}`}
              />
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 3: Payment Methods + Order Status + Region ====== */}
      <DashboardGrid preset="3col" gap="lg">
        {/* Payment Methods */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary-500" />
              Payment Methods
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-0 lg:divide-y lg:divide-[var(--border-default)]">
                {paymentMethodsData.map((payment, index) => {
                  const PaymentIcon = payment.icon
                  return (
                    <div key={payment.method} className="flex items-center gap-3 lg:py-3.5 lg:first:pt-0 lg:last:pb-0">
                      <div className={`hidden lg:block w-1 self-stretch rounded-full ${['bg-blue-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500', 'bg-slate-400', 'bg-teal-500'][index]}`} />
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-subtle)]">
                        <PaymentIcon className="h-4 w-4 text-[var(--text-muted)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--text-primary)]">
                            {payment.method}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {payment.count} ({payment.percentage}%)
                          </span>
                        </div>
                        <ProgressBar value={payment.percentage} size="sm" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Order Status - Pipeline Style */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-primary-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary-500" />
                Order Status
              </Card.Title>
              <span className="text-xs text-[var(--text-muted)]">{totalOrders.toLocaleString()} total</span>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {orderStatusData.map((status) => {
                  const StatusIcon = status.icon
                  const percentage = ((status.count / totalOrders) * 100).toFixed(1)
                  return (
                    <div
                      key={status.status}
                      className="flex items-center gap-3 rounded-lg border border-[var(--border-default)] p-3 transition-all hover:border-primary-300 hover:bg-[var(--bg-subtle)] dark:hover:border-primary-700"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${status.bgColor}`}>
                        <StatusIcon className={`h-5 w-5 ${status.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[var(--text-primary)]">
                            {status.status}
                          </span>
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {status.count.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${status.iconColor.replace('text-', 'bg-')}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-[var(--text-muted)] w-10 text-right">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Sales by Region */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-rose-500 to-pink-400" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary-500" />
              Top Regions
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-8 rounded" />
                ))}
              </div>
            ) : (
              <>
                <RegionStats
                  items={salesByRegionData}
                  maxVisible={5}
                  formatValue={(v) => `$${v.toLocaleString()}`}
                  sortable={false}
                />
                {/* Desktop: additional summary */}
                <div className="hidden lg:block mt-4 pt-4 border-t border-[var(--border-default)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">Total Revenue</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">$99,030</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">Top Region</span>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">California (28.7%)</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500" style={{ width: '28.7%' }} />
                    <div className="bg-emerald-500" style={{ width: '22.4%' }} />
                    <div className="bg-violet-500" style={{ width: '20.1%' }} />
                    <div className="bg-amber-500" style={{ width: '15.8%' }} />
                    <div className="bg-rose-500" style={{ width: '13%' }} />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {salesByRegionData.map((region, i) => {
                      const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500']
                      return (
                        <div key={region.id} className="flex items-center gap-1.5">
                          <div className={`h-2 w-2 rounded-full ${colors[i]}`} />
                          <span className="text-xs text-[var(--text-muted)]">{region.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>
      </DashboardGrid>

      {/* ====== ROW 4: Top Products Grid ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-400" />
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary-500" />
                Top Selling Products
              </Card.Title>
              <Card.Description>Best performing products this month</Card.Description>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Products
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[280px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:overflow-visible sm:snap-none sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {topProductsData.map((product) => (
                <div key={product.id} className="snap-start shrink-0 w-[70vw] sm:w-auto sm:shrink">
                <ProductCard
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  badge={product.badge}
                  size="full"
                  onAddToCart={() => console.log('Add to cart:', product.name)}
                  onWishlist={() => console.log('Wishlist:', product.name)}
                />
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* ====== ROW 5: Orders Table + Sidebar ====== */}
      <DashboardGrid preset="content-sidebar" gap="lg">
        {/* Recent Orders */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-400" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary-500" />
                  Recent Orders
                </Card.Title>
                <Card.Description>Latest customer orders and their status</Card.Description>
              </div>
              <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
                Filter
              </Button>
            </div>
          </Card.Header>
          <Card.Content padding="none">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Mobile: horizontal scroll cards */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 p-4 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {recentOrdersData.slice(0, 6).map((order) => {
                    const statusColors: Record<string, string> = {
                      Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                      Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                      Shipped: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
                      Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                      Refunded: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
                    }
                    return (
                      <div key={order.id} className="snap-start shrink-0 w-[72vw] rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[var(--text-primary)]">{order.orderId}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status] || ''}`}>{order.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar size="xs" initials={order.customer} />
                          <span className="text-sm text-[var(--text-primary)]">{order.customer}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] truncate">{order.products}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-default)]">
                          <span className="text-lg font-bold text-[var(--text-primary)]">${order.total.toFixed(2)}</span>
                          <span className="text-xs text-[var(--text-muted)]">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* Desktop: full data table */}
                <div className="hidden sm:block">
                  <DataTable
                    data={recentOrdersData}
                    columns={orderColumns}
                    sortable
                    filterable
                    filterPlaceholder="Search orders..."
                    pagination
                    pageSize={5}
                    hoverable
                    rowActions={[
                      {
                        label: 'View',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: (row) => console.log('View:', row),
                      },
                    ]}
                  />
                </div>
                {/* Desktop: summary metrics */}
                <div className="hidden sm:block border-t border-[var(--border-default)] bg-[var(--bg-subtle)]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-xs text-[var(--text-muted)]">Total Orders</span>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{recentOrdersData.length}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--text-muted)]">Total Revenue</span>
                        <p className="text-sm font-bold text-[var(--text-primary)]">${recentOrdersData.reduce((s, o) => s + o.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--text-muted)]">Avg Value</span>
                        <p className="text-sm font-bold text-[var(--text-primary)]">${(recentOrdersData.reduce((s, o) => s + o.total, 0) / recentOrdersData.length).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {(['Completed', 'Processing', 'Shipped'] as const).map(status => {
                        const count = recentOrdersData.filter(o => o.status === status).length
                        const colors: Record<string, string> = { Completed: 'bg-emerald-500', Processing: 'bg-blue-500', Shipped: 'bg-violet-500' }
                        return (
                          <div key={status} className="flex items-center gap-1.5">
                            <div className={`h-2 w-2 rounded-full ${colors[status]}`} />
                            <span className="text-xs text-[var(--text-muted)]">{status}: {count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-default)]">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs text-[var(--text-muted)]">Highest: <span className="font-semibold text-[var(--text-primary)]">$299.99</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShoppingCart className="h-3.5 w-3.5 text-blue-500" />
                        <span className="text-xs text-[var(--text-muted)]">Most ordered: <span className="font-semibold text-[var(--text-primary)]">Smart Watch</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-violet-500" />
                        <span className="text-xs text-[var(--text-muted)]">Repeat rate: <span className="font-semibold text-[var(--text-primary)]">34%</span></span>
                      </div>
                    </div>
                    <div className="flex h-1.5 w-32 rounded-full overflow-hidden">
                      <div className="bg-emerald-500" style={{ width: '40%' }} />
                      <div className="bg-blue-500" style={{ width: '20%' }} />
                      <div className="bg-violet-500" style={{ width: '20%' }} />
                      <div className="bg-red-400" style={{ width: '10%' }} />
                      <div className="bg-slate-400" style={{ width: '10%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-default)]">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-xs text-[var(--text-muted)]">Avg fulfillment: <span className="font-semibold text-[var(--text-primary)]">1.8 days</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5 text-red-400" />
                        <span className="text-xs text-[var(--text-muted)]">Cancel rate: <span className="font-semibold text-[var(--text-primary)]">5.3%</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs text-[var(--text-muted)]">Top buyer: <span className="font-semibold text-[var(--text-primary)]">Sarah J.</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--text-muted)] mr-1">7d trend</span>
                      {[35, 52, 48, 61, 45, 58, 67].map((h, i) => (
                        <div key={i} className="w-1.5 rounded-full bg-primary-400" style={{ height: `${h * 0.2}px` }} />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-px border-t border-[var(--border-default)] bg-[var(--border-default)]">
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Conversion</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">3.2%</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Refunds</p>
                      <p className="text-sm font-bold text-red-500 dark:text-red-400 mt-0.5">$174.97</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Items/Order</p>
                      <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">1.7</p>
                    </div>
                    <div className="bg-[var(--bg-subtle)] px-3 py-2.5 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Peak Hour</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">2 PM</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Sidebar: Top Customers + Low Stock */}
        <div className="space-y-6">
          {/* Top Customers */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-400" />
            <Card.Header>
              <Card.Title className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-500" />
                Top Customers
              </Card.Title>
              <Card.Description>Highest spending customers</Card.Description>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <LeaderboardList
                  items={topCustomersData}
                  showMedals
                  maxVisible={5}
                  expandable={false}
                  valueFormatter={(v) => `$${Number(v).toLocaleString()}`}
                />
              )}
            </Card.Content>
          </Card>

          {/* Low Stock Alert */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-rose-400" />
            <Card.Header>
              <Card.Title className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning-base" />
                Low Stock Alert
              </Card.Title>
              <Card.Description>Products that need restocking</Card.Description>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {lowStockData.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-muted)] transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          SKU: {item.sku}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-semibold ${item.status === 'critical' ? 'text-error-base' : 'text-warning-base'}`}>
                          {item.stock} left
                        </span>
                        <Badge variant={item.status === 'critical' ? 'error' : 'warning'} size="sm">
                          {item.status === 'critical' ? 'Critical' : 'Warning'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </DashboardGrid>

      {/* ====== ROW 6: Inventory Overview ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-emerald-400" />
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary-500" />
            Inventory Overview
          </Card.Title>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Products</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-300 mt-1">
                  {inventoryStats.total.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">In Stock</p>
                <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-300 mt-1">
                  {inventoryStats.inStock.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Low Stock</p>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-300 mt-1">
                  {inventoryStats.lowStock}
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 p-4 border border-rose-200 dark:border-rose-800">
                <p className="text-sm font-medium text-rose-700 dark:text-rose-400">Out of Stock</p>
                <p className="text-3xl font-bold text-rose-900 dark:text-rose-300 mt-1">
                  {inventoryStats.outOfStock}
                </p>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
