'use client'

import * as React from 'react'
import {
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Download,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Warehouse,
  MapPin,
  ShoppingCart,
  RefreshCw,
  Clock,
  Tag,
  Truck,
  BarChart3,
  AlertCircle,
  X,
  Eye,
  Edit,
  Repeat,
  Flame,
  Archive,
  Box,
  Activity,
  Zap,
  PieChart,
  Layers,
} from 'lucide-react'

import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { GaugeChart } from '@core/patterns/GaugeChart'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/patterns/Tabs'

// ============================================================================
// MOCK DATA - Inventory Management
// ============================================================================

// Alerts
const alerts = {
  outOfStock: 5,
  lowStock: 12,
  pendingShipment: 3,
}

// Stats
const inventoryStats = {
  totalProducts: 1847,
  categories: 23,
  inStockValue: 284500,
  avgItemValue: 154,
  lowStockItems: 23,
  outOfStockItems: 8,
}

// Hero Data
const heroData = {
  totalValue: 284500,
  changePercent: 12.6,
  changeValue: 31800,
  last30Days: [245, 252, 258, 261, 265, 268, 272, 275, 278, 280, 282, 284.5],
}

// KPI Sparklines
const kpiSparklines = {
  totalProducts: [1720, 1745, 1780, 1810, 1830, 1847],
  inStockValue: [245, 258, 265, 278, 282, 284.5],
  lowStock: [31, 28, 25, 27, 24, 23],
  outOfStock: [12, 10, 9, 11, 9, 8],
}

// Stock Level Distribution (for Gauge)
const stockDistribution = {
  healthy: 72, // >50% stock
  warning: 18, // 10-50% stock
  critical: 10, // <10% stock
}

// Inventory Value Trend (6 months)
const inventoryValueTrend = [
  { month: 'Sep', value: 245000 },
  { month: 'Oct', value: 258000 },
  { month: 'Nov', value: 265000 },
  { month: 'Dec', value: 278000 },
  { month: 'Jan', value: 282000 },
  { month: 'Feb', value: 284500 },
]

// Stock Alert Products
interface AlertProduct {
  id: string
  name: string
  sku: string
  image: string
  currentStock: number
  reorderPoint: number
  status: 'out' | 'low' | 'ok'
  price: number
  category: string
}

const stockAlertProducts: AlertProduct[] = [
  { id: '1', name: 'Wireless Bluetooth Earbuds', sku: 'WBE-001', image: '', currentStock: 0, reorderPoint: 50, status: 'out', price: 79.99, category: 'Electronics' },
  { id: '2', name: 'USB-C Charging Cable 2m', sku: 'UCC-002', image: '', currentStock: 0, reorderPoint: 100, status: 'out', price: 14.99, category: 'Electronics' },
  { id: '3', name: 'Premium Laptop Stand', sku: 'PLS-003', image: '', currentStock: 5, reorderPoint: 30, status: 'low', price: 49.99, category: 'Accessories' },
  { id: '4', name: 'Mechanical Keyboard RGB', sku: 'MKR-004', image: '', currentStock: 8, reorderPoint: 25, status: 'low', price: 129.99, category: 'Electronics' },
  { id: '5', name: 'Wireless Mouse Ergonomic', sku: 'WME-005', image: '', currentStock: 12, reorderPoint: 40, status: 'low', price: 39.99, category: 'Electronics' },
  { id: '6', name: 'Monitor Arm Dual', sku: 'MAD-006', image: '', currentStock: 3, reorderPoint: 20, status: 'low', price: 89.99, category: 'Accessories' },
]

// Top Moving Products
interface TopProduct {
  id: string
  name: string
  sku: string
  image: string
  soldLast30Days: number
  revenue: number
  trend: number[]
  isHot?: boolean
}

const topMovingProducts: TopProduct[] = [
  { id: '1', name: 'Wireless Charger Pad', sku: 'WCP-101', image: '', soldLast30Days: 342, revenue: 10260, trend: [280, 295, 310, 325, 330, 342], isHot: true },
  { id: '2', name: 'USB Hub 7-Port', sku: 'UH7-102', image: '', soldLast30Days: 287, revenue: 8610, trend: [240, 255, 268, 275, 280, 287] },
  { id: '3', name: 'Webcam HD 1080p', sku: 'WHD-103', image: '', soldLast30Days: 234, revenue: 11700, trend: [200, 210, 220, 225, 230, 234] },
  { id: '4', name: 'Desk Organizer Set', sku: 'DOS-104', image: '', soldLast30Days: 198, revenue: 4950, trend: [165, 175, 182, 190, 195, 198] },
  { id: '5', name: 'LED Desk Lamp', sku: 'LDL-105', image: '', soldLast30Days: 176, revenue: 7040, trend: [150, 158, 165, 170, 173, 176] },
  { id: '6', name: 'Mechanical Keyboard', sku: 'MKB-106', image: '', soldLast30Days: 164, revenue: 13120, trend: [130, 140, 148, 155, 160, 164] },
  { id: '7', name: 'Noise Cancelling Earbuds', sku: 'NCE-107', image: '', soldLast30Days: 152, revenue: 9120, trend: [120, 128, 135, 142, 148, 152] },
  { id: '8', name: 'Portable SSD 1TB', sku: 'SSD-108', image: '', soldLast30Days: 143, revenue: 11440, trend: [110, 118, 126, 133, 138, 143] },
]

// Slow Moving Products
interface SlowProduct {
  id: string
  name: string
  sku: string
  daysWithoutSale: number
  stockValue: number
  currentStock: number
  suggestion: string
}

const slowMovingProducts: SlowProduct[] = [
  { id: '1', name: 'Vintage Phone Case', sku: 'VPC-201', daysWithoutSale: 45, stockValue: 1250, currentStock: 50, suggestion: 'Consider 30% discount' },
  { id: '2', name: 'Floppy Disk Holder', sku: 'FDH-202', daysWithoutSale: 38, stockValue: 480, currentStock: 120, suggestion: 'Discontinue' },
  { id: '3', name: 'CD/DVD Case Pack', sku: 'CDP-203', daysWithoutSale: 32, stockValue: 890, currentStock: 178, suggestion: 'Bundle with other items' },
  { id: '4', name: 'VGA Cable 3m', sku: 'VGA-204', daysWithoutSale: 28, stockValue: 420, currentStock: 84, suggestion: 'Clearance sale' },
  { id: '5', name: 'Parallel Port Adapter', sku: 'PPA-205', daysWithoutSale: 25, stockValue: 350, currentStock: 35, suggestion: 'Liquidate inventory' },
]

// Warehouse/Locations
interface WarehouseData {
  id: string
  name: string
  items: number
  capacity: number
  icon: typeof Warehouse
  color: string
}

const warehouseData: WarehouseData[] = [
  { id: '1', name: 'Main Warehouse', items: 1234, capacity: 1450, icon: Warehouse, color: 'cyan' },
  { id: '2', name: 'Store Front', items: 234, capacity: 520, icon: MapPin, color: 'emerald' },
  { id: '3', name: 'Distribution Center', items: 567, capacity: 788, icon: Truck, color: 'blue' },
  { id: '4', name: 'Returns', items: 45, capacity: 200, icon: Repeat, color: 'violet' },
]

// Full Inventory List
interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  reorderPoint: number
  status: 'in-stock' | 'low' | 'out'
  value: number
  image: string
}

const inventoryList: InventoryItem[] = [
  { id: '1', name: 'Wireless Charger Pad', sku: 'WCP-101', category: 'Electronics', currentStock: 156, reorderPoint: 50, status: 'in-stock', value: 4680, image: '' },
  { id: '2', name: 'USB Hub 7-Port', sku: 'UH7-102', category: 'Electronics', currentStock: 89, reorderPoint: 30, status: 'in-stock', value: 2670, image: '' },
  { id: '3', name: 'Webcam HD 1080p', sku: 'WHD-103', category: 'Electronics', currentStock: 67, reorderPoint: 25, status: 'in-stock', value: 3350, image: '' },
  { id: '4', name: 'Desk Organizer Set', sku: 'DOS-104', category: 'Accessories', currentStock: 45, reorderPoint: 40, status: 'in-stock', value: 1125, image: '' },
  { id: '5', name: 'LED Desk Lamp', sku: 'LDL-105', category: 'Lighting', currentStock: 23, reorderPoint: 30, status: 'low', value: 920, image: '' },
  { id: '6', name: 'Mechanical Keyboard RGB', sku: 'MKR-004', category: 'Electronics', currentStock: 8, reorderPoint: 25, status: 'low', value: 1040, image: '' },
  { id: '7', name: 'Wireless Mouse Ergonomic', sku: 'WME-005', category: 'Electronics', currentStock: 12, reorderPoint: 40, status: 'low', value: 480, image: '' },
  { id: '8', name: 'Monitor Arm Dual', sku: 'MAD-006', category: 'Accessories', currentStock: 3, reorderPoint: 20, status: 'low', value: 270, image: '' },
  { id: '9', name: 'Wireless Bluetooth Earbuds', sku: 'WBE-001', category: 'Electronics', currentStock: 0, reorderPoint: 50, status: 'out', value: 0, image: '' },
  { id: '10', name: 'USB-C Charging Cable 2m', sku: 'UCC-002', category: 'Electronics', currentStock: 0, reorderPoint: 100, status: 'out', value: 0, image: '' },
]

// Categories for filtering
const categories = ['All', 'Electronics', 'Accessories', 'Lighting', 'Office', 'Storage']

// Category data for Categories tab
const categoryData = [
  { name: 'Electronics', count: 842, value: 125400, percentage: 46, color: 'cyan', trend: [780, 800, 815, 830, 838, 842] },
  { name: 'Accessories', count: 412, value: 52300, percentage: 22, color: 'teal', trend: [370, 385, 392, 400, 408, 412] },
  { name: 'Lighting', count: 189, value: 28500, percentage: 10, color: 'amber', trend: [165, 172, 178, 182, 186, 189] },
  { name: 'Office', count: 234, value: 45200, percentage: 13, color: 'blue', trend: [210, 218, 224, 228, 231, 234] },
  { name: 'Storage', count: 112, value: 21100, percentage: 6, color: 'violet', trend: [95, 100, 104, 107, 110, 112] },
  { name: 'Other', count: 58, value: 12000, percentage: 3, color: 'rose', trend: [48, 50, 52, 54, 56, 58] },
]

// Table Columns
const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Product',
    sortable: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30">
          <Package className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <p className="font-medium text-[var(--text-primary)]">{row.name}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.sku}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: 'Category',
    sortable: true,
    cell: ({ value }) => (
      <Badge variant="default" size="sm">{value as string}</Badge>
    ),
  },
  {
    id: 'currentStock',
    accessorKey: 'currentStock',
    header: 'Stock',
    sortable: true,
    cell: ({ value, row }) => {
      const percentage = Math.min((value as number) / row.reorderPoint * 100, 100)
      const color = row.status === 'out' ? 'error' : row.status === 'low' ? 'warning' : 'success'
      return (
        <div className="flex items-center gap-2">
          <div className="w-16">
            <ProgressBar value={percentage} size="sm" variant={color} />
          </div>
          <span className="text-sm font-medium text-[var(--text-primary)]">{value as number}</span>
        </div>
      )
    },
  },
  {
    id: 'reorderPoint',
    accessorKey: 'reorderPoint',
    header: 'Reorder Point',
    sortable: true,
    align: 'center',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => {
      const variants: Record<string, 'success' | 'warning' | 'error'> = {
        'in-stock': 'success',
        'low': 'warning',
        'out': 'error',
      }
      const labels: Record<string, string> = {
        'in-stock': 'In Stock',
        'low': 'Low Stock',
        'out': 'Out of Stock',
      }
      return <Badge variant={variants[value as string]} size="sm">{labels[value as string]}</Badge>
    },
  },
  {
    id: 'value',
    accessorKey: 'value',
    header: 'Value',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-semibold text-[var(--text-primary)]">
        ${(value as number).toLocaleString()}
      </span>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'id',
    header: '',
    cell: () => (
      <div className="flex items-center gap-1 justify-end">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Stock Alert Card - Premium
function StockAlertCard({ product }: { product: AlertProduct }) {
  const isOut = product.status === 'out'
  return (
    <div className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
      isOut
        ? 'border-red-400 dark:border-red-600'
        : 'border-amber-400 dark:border-amber-600'
    }`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 ${
        isOut
          ? 'bg-gradient-to-br from-red-50 via-rose-50/50 to-white dark:from-red-950/30 dark:via-rose-950/20 dark:to-transparent'
          : 'bg-gradient-to-br from-amber-50 via-yellow-50/50 to-white dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-transparent'
      }`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${
            isOut
              ? 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40'
              : 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40'
          }`}>
            <Package className={`h-6 w-6 ${isOut ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`} />
          </div>
          <Badge variant={isOut ? 'error' : 'warning'} size="sm">
            {isOut ? 'Out of Stock' : 'Low Stock'}
          </Badge>
        </div>
        <h4 className="font-semibold text-[var(--text-primary)] line-clamp-1">{product.name}</h4>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{product.sku} · ${product.price}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Stock: <span className={isOut ? 'text-red-600 dark:text-red-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>{product.currentStock}</span></span>
          <span className="text-[var(--text-muted)]">Reorder: {product.reorderPoint}</span>
        </div>
        {/* Stock level visual bar */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOut ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-amber-500 to-yellow-500'
            }`}
            style={{ width: `${Math.min((product.currentStock / product.reorderPoint) * 100, 100)}%` }}
          />
        </div>
        <Button
          variant={isOut ? 'primary' : 'outline'}
          size="sm"
          className="w-full mt-3"
          leftIcon={<ShoppingCart className="h-4 w-4" />}
        >
          Reorder Now
        </Button>
      </div>
    </div>
  )
}

// Warehouse Card - Premium
function WarehouseCard({ warehouse }: { warehouse: WarehouseData }) {
  const percentage = Math.round((warehouse.items / warehouse.capacity) * 100)
  const Icon = warehouse.icon

  const colorMap: Record<string, { gradient: string; text: string; ring: string }> = {
    cyan: { gradient: 'from-cyan-500 to-teal-500', text: 'text-cyan-600 dark:text-cyan-400', ring: 'ring-cyan-200 dark:ring-cyan-800' },
    emerald: { gradient: 'from-emerald-500 to-green-500', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-800' },
    blue: { gradient: 'from-blue-500 to-indigo-500', text: 'text-blue-600 dark:text-blue-400', ring: 'ring-blue-200 dark:ring-blue-800' },
    violet: { gradient: 'from-violet-500 to-purple-500', text: 'text-violet-600 dark:text-violet-400', ring: 'ring-violet-200 dark:ring-violet-800' },
  }
  const colors = colorMap[warehouse.color] ?? colorMap['cyan']!

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--bg-subtle)] via-white/50 to-[var(--bg-subtle)] dark:from-secondary-900/50 dark:via-secondary-900/30 dark:to-secondary-900/50" />
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${colors.gradient} shadow-sm`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)]">{warehouse.name}</h4>
            <p className="text-xs text-[var(--text-muted)]">{warehouse.items.toLocaleString()} items</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)]">Capacity</span>
            <span className={percentage > 90 ? 'text-red-600 dark:text-red-400 font-semibold' : percentage > 70 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-green-600 dark:text-green-400 font-semibold'}>
              {percentage}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${
                percentage > 90 ? 'from-red-500 to-rose-500' : percentage > 70 ? 'from-amber-500 to-yellow-500' : `${colors.gradient}`
              } transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] text-right">
            {warehouse.items.toLocaleString()} / {warehouse.capacity.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function InventoryDashboard() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [showAlertStrip, setShowAlertStrip] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState('overview')
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredInventory = selectedCategory === 'All'
    ? inventoryList
    : inventoryList.filter(item => item.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hidden md:block md:w-32" />
        <div className="text-center">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Inventory Management
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Stock levels, warehouse capacity, and product management
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* ====== ALERT STRIP (PREMIUM!) ====== */}
      {showAlertStrip && (alerts.outOfStock > 0 || alerts.lowStock > 0 || alerts.pendingShipment > 0) && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 p-3 text-white shadow-lg">
          {/* Animated shimmer effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <XCircle className="h-4 w-4" />
                </div>
                <span className="font-semibold">{alerts.outOfStock} items out of stock</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <span className="font-semibold">{alerts.lowStock} items low stock</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="font-semibold">{alerts.pendingShipment} orders pending shipment</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                View Details
              </Button>
              <button
                onClick={() => setShowAlertStrip(false)}
                className="rounded-lg p-1 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== HERO CARD (NEW!) ====== */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50 shadow-lg dark:from-cyan-950/30 dark:via-[var(--bg-base)] dark:to-teal-950/30">
        {/* Radial gradient overlays */}
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-200/30 to-teal-200/30 blur-3xl dark:from-cyan-800/20 dark:to-teal-800/20" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-tr from-teal-200/20 to-emerald-200/20 blur-3xl dark:from-teal-800/10 dark:to-emerald-800/10" />
        <Card.Content>
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/25">
                  <Warehouse className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Total Inventory Value</p>
                  <Badge variant="default" size="sm" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    Last 30 days
                  </Badge>
                </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-5xl">
                  ${heroData.totalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">+{heroData.changePercent}%</span>
                </div>
                <span className="text-sm text-[var(--text-muted)]">
                  +${heroData.changeValue.toLocaleString()} from last month
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-cyan-500" />
                  {inventoryStats.totalProducts.toLocaleString()} products
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4 text-teal-500" />
                  {inventoryStats.categories} categories
                </span>
                <span className="flex items-center gap-1">
                  <Warehouse className="h-4 w-4 text-emerald-500" />
                  4 locations
                </span>
              </div>
            </div>
            {/* Premium Visual - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-8 -ml-8">
              {/* Circular Progress */}
              <div className="relative">
                <div className="relative h-28 w-28">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-cyan-100 dark:text-cyan-900/40" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="url(#inventoryGradient)" strokeWidth="3" strokeDasharray="88 22" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="10" fill="none" stroke="currentColor" className="text-teal-100 dark:text-teal-900/40" strokeWidth="2" />
                    <circle cx="18" cy="18" r="10" fill="none" stroke="url(#stockGradient)" strokeWidth="2" strokeDasharray="56 8" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="inventoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                      <linearGradient id="stockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14B8A6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[var(--text-muted)]">Health</span>
                    <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">92%</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/90 dark:bg-slate-900/90 px-3 py-1 shadow-lg border border-cyan-200/50 dark:border-cyan-800/30">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span className="text-[9px] font-medium text-cyan-600 dark:text-cyan-400">$284K</span>
                  </div>
                  <div className="h-3 w-px bg-cyan-200 dark:bg-cyan-800" />
                  <span className="text-[9px] text-[var(--text-muted)]">Optimal</span>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="flex items-center gap-6">
                {[
                  { icon: CheckCircle2, label: 'In Stock', value: '1,847', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
                  { icon: AlertTriangle, label: 'Low Stock', value: '23', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
                  { icon: XCircle, label: 'Out of Stock', value: '8', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</p>
                      <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend Bars */}
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3">30 Day Trend</p>
                <div className="flex items-end gap-1 h-16 group cursor-pointer">
                  {heroData.last30Days.slice(-12).map((v, i) => (
                    <div
                      key={i}
                      className={`w-4 rounded-t-sm transition-all duration-300 group-hover:scale-110 ${i === 11 ? 'bg-cyan-500' : i >= 9 ? 'bg-cyan-400 dark:bg-cyan-500/80' : 'bg-cyan-200 dark:bg-cyan-700/50'}`}
                      style={{ height: `${((v - 240) / (285 - 240)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: compact version */}
            <div className="lg:hidden flex flex-col gap-3 w-full">
              <div className="flex items-end gap-1 h-14 group cursor-pointer">
                {heroData.last30Days.slice(-12).map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all duration-300 ${i === 11 ? 'bg-cyan-500' : i >= 9 ? 'bg-cyan-400 dark:bg-cyan-500/80' : 'bg-cyan-200 dark:bg-cyan-700/50'}`}
                    style={{ height: `${((v - 240) / (285 - 240)) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[var(--text-muted)]">30 days ago</span>
                <span className="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400">Today</span>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* ====== STATS ROW (PREMIUM!) ====== */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-1 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none sm:pb-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl snap-start shrink-0 w-[75vw] sm:w-auto" />
          ))
        ) : (
          <>
            {/* Total Products */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
              <Card.Content>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Total Products</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {inventoryStats.totalProducts.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      {inventoryStats.categories} categories
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Premium Mini Bars */}
                <div className="mt-3 flex items-end gap-1 h-6">
                  {kpiSparklines.totalProducts.map((v, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${i === kpiSparklines.totalProducts.length - 1 ? 'bg-cyan-500' : 'bg-cyan-200 dark:bg-cyan-700/50'}`}
                      style={{ height: `${((v - 1700) / (1850 - 1700)) * 100}%` }}
                    />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* In Stock Value */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
              <Card.Content>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">In Stock Value</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      ${inventoryStats.inStockValue.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      Avg item: ${inventoryStats.avgItemValue}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-sm">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Premium Mini Bars */}
                <div className="mt-3 flex items-end gap-1 h-6">
                  {kpiSparklines.inStockValue.map((v, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${i === kpiSparklines.inStockValue.length - 1 ? 'bg-emerald-500' : 'bg-emerald-200 dark:bg-emerald-700/50'}`}
                      style={{ height: `${((v - 240) / (285 - 240)) * 100}%` }}
                    />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Low Stock Items */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
              <Card.Content>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Low Stock Items</p>
                    <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {inventoryStats.lowStockItems}
                    </p>
                    {inventoryStats.lowStockItems > 20 && (
                      <Badge variant="warning" size="sm" className="mt-1 animate-pulse">
                        Attention Needed
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 shadow-sm">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Premium Mini Bars (downward trend is good) */}
                <div className="mt-3 flex items-end gap-1 h-6">
                  {kpiSparklines.lowStock.map((v, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${i === kpiSparklines.lowStock.length - 1 ? 'bg-amber-500' : 'bg-amber-200 dark:bg-amber-700/50'}`}
                      style={{ height: `${((v - 20) / (35 - 20)) * 100}%` }}
                    />
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Out of Stock */}
            <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] snap-start shrink-0 w-[75vw] sm:w-auto">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500" />
              <Card.Content>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Out of Stock</p>
                    <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                      {inventoryStats.outOfStockItems}
                    </p>
                    {inventoryStats.outOfStockItems > 5 && (
                      <Badge variant="error" size="sm" className="mt-1 animate-pulse">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-sm">
                      <XCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Premium Mini Bars (downward trend is good) */}
                <div className="mt-3 flex items-end gap-1 h-6">
                  {kpiSparklines.outOfStock.map((v, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${i === kpiSparklines.outOfStock.length - 1 ? 'bg-red-500' : 'bg-red-200 dark:bg-red-700/50'}`}
                      style={{ height: `${((v - 7) / (13 - 7)) * 100}%` }}
                    />
                  ))}
                </div>
              </Card.Content>
            </Card>
          </>
        )}
      </div>

      {/* ====== TABS NAVIGATION ====== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-1.5" />
            Products
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tag className="h-4 w-4 mr-1.5" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="locations">
            <MapPin className="h-4 w-4 mr-1.5" />
            Locations
          </TabsTrigger>
        </TabsList>

        {/* ====== TAB: OVERVIEW ====== */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Row 1: Gauge + Value Trend */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Stock Level Distribution - Premium Gauge */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-200/20 to-teal-200/20 blur-2xl dark:from-cyan-800/10 dark:to-teal-800/10" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-200/20 to-cyan-200/20 blur-2xl dark:from-emerald-800/10 dark:to-cyan-800/10" />
              <Card.Header>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/25">
                      <PieChart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <Card.Title className="text-lg">Stock Level Distribution</Card.Title>
                      <Card.Description className="mt-0.5">Products by stock health</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" size="sm" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    {inventoryStats.totalProducts.toLocaleString()} items
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content>
                {isLoading ? (
                  <Skeleton className="h-64 rounded-lg" />
                ) : (
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    {/* Premium Donut Chart */}
                    <div className="relative flex-shrink-0">
                      <div className="relative h-48 w-48">
                        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                          {/* Background ring */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-secondary-100 dark:text-secondary-800" strokeWidth="12" />
                          {/* Healthy segment (72%) */}
                          <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke="url(#healthyGradient)"
                            strokeWidth="12"
                            strokeDasharray={`${stockDistribution.healthy * 2.51} 251.2`}
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                          {/* Warning segment (18%) */}
                          <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke="url(#warningGradient)"
                            strokeWidth="12"
                            strokeDasharray={`${stockDistribution.warning * 2.51} 251.2`}
                            strokeDashoffset={`${-stockDistribution.healthy * 2.51}`}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                          {/* Critical segment (10%) */}
                          <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke="url(#criticalGradient)"
                            strokeWidth="12"
                            strokeDasharray={`${stockDistribution.critical * 2.51} 251.2`}
                            strokeDashoffset={`${-(stockDistribution.healthy + stockDistribution.warning) * 2.51}`}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="healthyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22C55E" />
                              <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                            <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#F59E0B" />
                              <stop offset="100%" stopColor="#EAB308" />
                            </linearGradient>
                            <linearGradient id="criticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#EF4444" />
                              <stop offset="100%" stopColor="#F43F5E" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Center content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-green-600 dark:text-green-400">{stockDistribution.healthy}%</span>
                          <span className="text-xs text-[var(--text-muted)] mt-0.5">Healthy</span>
                        </div>
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-3 py-1.5 shadow-lg border border-green-200 dark:border-green-800">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Stock Optimal</span>
                      </div>
                    </div>

                    {/* Premium Stats */}
                    <div className="flex-1 w-full space-y-3">
                      {/* Healthy */}
                      <div className="group relative overflow-hidden rounded-xl border border-green-200 dark:border-green-800 p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/20" />
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm">
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">Healthy Stock</p>
                              <p className="text-xs text-[var(--text-muted)]">&gt;50% of reorder point</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stockDistribution.healthy}%</p>
                            <p className="text-xs text-[var(--text-muted)]">1,330 items</p>
                          </div>
                        </div>
                        <div className="relative mt-2 h-1.5 w-full rounded-full bg-green-100 dark:bg-green-900/40 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700" style={{ width: `${stockDistribution.healthy}%` }} />
                        </div>
                      </div>

                      {/* Warning */}
                      <div className="group relative overflow-hidden rounded-xl border border-amber-200 dark:border-amber-800 p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/20" />
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 shadow-sm">
                              <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">Warning Level</p>
                              <p className="text-xs text-[var(--text-muted)]">10-50% of reorder point</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stockDistribution.warning}%</p>
                            <p className="text-xs text-[var(--text-muted)]">332 items</p>
                          </div>
                        </div>
                        <div className="relative mt-2 h-1.5 w-full rounded-full bg-amber-100 dark:bg-amber-900/40 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-700" style={{ width: `${stockDistribution.warning}%` }} />
                        </div>
                      </div>

                      {/* Critical */}
                      <div className="group relative overflow-hidden rounded-xl border border-red-200 dark:border-red-800 p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-50 to-rose-50/50 dark:from-red-950/30 dark:to-rose-950/20" />
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-sm">
                              <XCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">Critical Level</p>
                              <p className="text-xs text-[var(--text-muted)]">&lt;10% of reorder point</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stockDistribution.critical}%</p>
                            <p className="text-xs text-[var(--text-muted)]">185 items</p>
                          </div>
                        </div>
                        <div className="relative mt-2 h-1.5 w-full rounded-full bg-red-100 dark:bg-red-900/40 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-700" style={{ width: `${stockDistribution.critical}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Inventory Value Trend - Premium */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <Card.Header>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Inventory Value Trend</Card.Title>
                      <Card.Description className="mt-1">Total stock value over 6 months</Card.Description>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    +16.1%
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                {isLoading ? (
                  <Skeleton className="h-48 rounded-lg" />
                ) : (
                  <div className="-mx-4 sm:mx-0">
                    <ChartWrapper
                      type="area"
                      data={inventoryValueTrend}
                      series={[{ dataKey: 'value', name: 'Value', color: '#3B82F6', fillOpacity: 0.3 }]}
                      xAxisKey="month"
                      height={280}
                      showTooltip
                      showGrid
                      tooltipFormatter={(value) => '$' + (value as number).toLocaleString()}
                    />
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* Row 2: Stock Alerts - Premium */}
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500" />
            <Card.Header>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-500 shadow-sm">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Stock Alerts</Card.Title>
                    <Card.Description className="mt-1">Products requiring immediate attention</Card.Description>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm" className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800">
                    {stockAlertProducts.length} alerts
                  </Badge>
                  <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    View All
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                  ))}
                </div>
              ) : (
                <>
                  {/* Mobile: 2-column horizontal carousel */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 sm:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Group products in pairs for 2-column layout */}
                    {Array.from({ length: Math.ceil(stockAlertProducts.length / 2) }).map((_, groupIdx) => (
                      <div key={groupIdx} className="flex-shrink-0 snap-start w-[85vw] flex flex-col gap-3">
                        {stockAlertProducts.slice(groupIdx * 2, groupIdx * 2 + 2).map((product) => (
                          <StockAlertCard key={product.id} product={product} />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Mobile scroll indicator */}
                  <div className="flex justify-center gap-1.5 mt-2 sm:hidden">
                    {Array.from({ length: Math.ceil(stockAlertProducts.length / 2) }).map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-4 bg-red-500' : 'w-1.5 bg-secondary-300 dark:bg-secondary-600'}`} />
                    ))}
                  </div>
                  {/* Desktop: Grid layout */}
                  <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stockAlertProducts.map((product) => (
                      <StockAlertCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Row 3: Top Moving + Slow Moving - Premium */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Moving - Premium */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
              <Card.Header>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm">
                      <Flame className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Top Moving Products</Card.Title>
                      <Card.Description className="mt-1">Best sellers in the last 30 days</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" size="sm" className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                    8 products
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content>
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topMovingProducts.map((product, idx) => (
                      <div key={product.id} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white text-sm ${
                          idx === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                          idx === 1 ? 'bg-gradient-to-br from-secondary-400 to-secondary-500' :
                          idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                          'bg-secondary-200 dark:bg-secondary-700 text-[var(--text-muted)]'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 shadow-sm">
                          <Package className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[var(--text-primary)] truncate">{product.name}</p>
                            {product.isHot && (
                              <Badge variant="error" size="sm" className="flex items-center gap-0.5 shrink-0">
                                <Flame className="h-3 w-3" />
                                Hot
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">{product.soldLast30Days} sold · ${product.revenue.toLocaleString()}</p>
                        </div>
                        <div className="w-16 shrink-0">
                          <SparklineChart
                            data={product.trend}
                            type="line"
                            color="#22C55E"
                            width={64}
                            height={24}
                            gradient
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Slow Moving - Premium */}
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
              <Card.Header>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 shadow-sm">
                      <Archive className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Card.Title>Slow Moving Products</Card.Title>
                      <Card.Description className="mt-1">Products with no recent sales</Card.Description>
                    </div>
                  </div>
                  <Badge variant="default" size="sm" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    5 items
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content>
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {slowMovingProducts.map((product) => (
                      <div key={product.id} className="relative overflow-hidden rounded-xl border border-amber-200 dark:border-amber-800 p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/30 to-transparent dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-transparent" />
                        <div className="relative">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-[var(--text-primary)]">{product.name}</p>
                              <p className="text-xs text-[var(--text-muted)]">{product.sku}</p>
                            </div>
                            <Badge variant="warning" size="sm">
                              <Clock className="h-3 w-3 mr-0.5" />
                              {product.daysWithoutSale}d idle
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">Stock value: <span className="font-semibold">${product.stockValue.toLocaleString()}</span></span>
                            <span className="text-[var(--text-muted)]">{product.currentStock} units</span>
                          </div>
                          <div className="mt-2 flex items-center gap-2 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 px-2 py-1">
                            <Zap className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                              {product.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* Row 4: Warehouse Overview - Premium */}
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
            <Card.Header>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-sm">
                    <Warehouse className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Warehouse Overview</Card.Title>
                    <Card.Description className="mt-1">Capacity and items by location</Card.Description>
                  </div>
                </div>
                <Badge variant="default" size="sm" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  4 locations
                </Badge>
              </div>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-36 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {warehouseData.map((warehouse) => (
                    <WarehouseCard key={warehouse.id} warehouse={warehouse} />
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </TabsContent>

        {/* ====== TAB: PRODUCTS - Premium ====== */}
        <TabsContent value="products" className="space-y-6 mt-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-secondary)]">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Inventory Table - Premium */}
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
            <Card.Header>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm">
                    <Box className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Inventory List</Card.Title>
                    <Card.Description className="mt-1">
                      {filteredInventory.length} products {selectedCategory !== 'All' && `in ${selectedCategory}`}
                    </Card.Description>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm" className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    {filteredInventory.length} items
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Content padding="none">
              {isLoading ? (
                <div className="space-y-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-lg" />
                  ))}
                </div>
              ) : (
                <DataTable
                  data={filteredInventory}
                  columns={inventoryColumns}
                  sortable
                  filterable
                  filterPlaceholder="Search products..."
                  pagination
                  pageSize={10}
                  hoverable
                />
              )}
            </Card.Content>
          </Card>
        </TabsContent>

        {/* ====== TAB: CATEGORIES - Premium ====== */}
        <TabsContent value="categories" className="space-y-6 mt-6">
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
            <Card.Header>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-sm">
                    <Layers className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Card.Title>Product Categories</Card.Title>
                    <Card.Description className="mt-1">Distribution of products by category</Card.Description>
                  </div>
                </div>
                <Badge variant="default" size="sm" className="bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {categoryData.length} categories
                </Badge>
              </div>
            </Card.Header>
            <Card.Content>
              {isLoading ? (
                <Skeleton className="h-64 rounded-lg" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryData.map((cat) => {
                    const colorStyles: Record<string, { bg: string; bar: string; text: string }> = {
                      cyan: { bg: 'from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20', bar: 'from-cyan-500 to-teal-500', text: 'text-cyan-600 dark:text-cyan-400' },
                      teal: { bg: 'from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20', bar: 'from-teal-500 to-emerald-500', text: 'text-teal-600 dark:text-teal-400' },
                      amber: { bg: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20', bar: 'from-amber-500 to-yellow-500', text: 'text-amber-600 dark:text-amber-400' },
                      blue: { bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20', bar: 'from-blue-500 to-indigo-500', text: 'text-blue-600 dark:text-blue-400' },
                      violet: { bg: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20', bar: 'from-violet-500 to-purple-500', text: 'text-violet-600 dark:text-violet-400' },
                      rose: { bg: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20', bar: 'from-rose-500 to-pink-500', text: 'text-rose-600 dark:text-rose-400' },
                    }
                    const style = colorStyles[cat.color] ?? colorStyles['cyan']!
                    return (
                      <div key={cat.name} className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.bg}`} />
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.bar}`} />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-[var(--text-primary)]">{cat.name}</h4>
                            <Badge variant="default" size="sm">{cat.percentage}%</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-[var(--text-primary)]">{cat.count}</p>
                              <p className="text-xs text-[var(--text-muted)]">Products</p>
                            </div>
                            <div>
                              <p className={`text-2xl font-bold ${style.text}`}>${(cat.value / 1000).toFixed(1)}K</p>
                              <p className="text-xs text-[var(--text-muted)]">Value</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${style.bar} transition-all duration-500`}
                                style={{ width: `${cat.percentage}%` }}
                              />
                            </div>
                            <div className="w-16 shrink-0">
                              <SparklineChart
                                data={cat.trend}
                                type="line"
                                color="#06B6D4"
                                width={60}
                                height={20}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card.Content>
          </Card>
        </TabsContent>

        {/* ====== TAB: LOCATIONS - Premium ====== */}
        <TabsContent value="locations" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {warehouseData.map((warehouse) => {
              const percentage = Math.round((warehouse.items / warehouse.capacity) * 100)
              const Icon = warehouse.icon
              const colorMap: Record<string, { gradient: string; bg: string; bar: string }> = {
                cyan: { gradient: 'from-cyan-500/5 to-teal-500/5', bg: 'from-cyan-500 to-teal-500', bar: 'from-cyan-500 to-teal-500' },
                emerald: { gradient: 'from-emerald-500/5 to-green-500/5', bg: 'from-emerald-500 to-green-500', bar: 'from-emerald-500 to-green-500' },
                blue: { gradient: 'from-blue-500/5 to-indigo-500/5', bg: 'from-blue-500 to-indigo-500', bar: 'from-blue-500 to-indigo-500' },
                violet: { gradient: 'from-violet-500/5 to-purple-500/5', bg: 'from-violet-500 to-purple-500', bar: 'from-violet-500 to-purple-500' },
              }
              const colors = colorMap[warehouse.color] ?? colorMap['cyan']!
              return (
                <Card key={warehouse.id} className="relative overflow-hidden">
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bar}`} />
                  <Card.Header>
                    <div className="relative flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg} shadow-sm`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Card.Title>{warehouse.name}</Card.Title>
                        <Card.Description>{warehouse.items.toLocaleString()} items stored</Card.Description>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    {isLoading ? (
                      <Skeleton className="h-32 rounded-lg" />
                    ) : (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[var(--text-secondary)]">Capacity Usage</span>
                          <span className={`text-lg font-bold ${
                            percentage > 90 ? 'text-red-600 dark:text-red-400' :
                            percentage > 70 ? 'text-amber-600 dark:text-amber-400' :
                            'text-green-600 dark:text-green-400'
                          }`}>
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              percentage > 90 ? 'from-red-500 to-rose-500' :
                              percentage > 70 ? 'from-amber-500 to-yellow-500' :
                              colors.bar
                            } transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                          <div className="rounded-lg bg-[var(--bg-subtle)] p-2">
                            <p className="text-xl font-bold text-[var(--text-primary)]">{warehouse.items.toLocaleString()}</p>
                            <p className="text-xs text-[var(--text-muted)]">Current</p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-subtle)] p-2">
                            <p className="text-xl font-bold text-[var(--text-primary)]">{warehouse.capacity.toLocaleString()}</p>
                            <p className="text-xs text-[var(--text-muted)]">Capacity</p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-subtle)] p-2">
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">{(warehouse.capacity - warehouse.items).toLocaleString()}</p>
                            <p className="text-xs text-[var(--text-muted)]">Available</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card.Content>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
