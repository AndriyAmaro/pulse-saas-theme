'use client'

import * as React from 'react'
import {
  Bitcoin,
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  RefreshCw,
  Download,
  Plus,
  Star,
  StarOff,
  MoreHorizontal,
  Bell,
  ArrowRightLeft,
  Clock,
  Zap,
  Globe,
  Gem,
} from 'lucide-react'

import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Skeleton } from '@core/primitives/Skeleton'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { DataTable, type ColumnDef } from '@core/organisms/DataTable'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { CryptoCard } from '@core/patterns/CryptoCard'
import { CandlestickChart, type CandleData } from '@core/patterns/CandlestickChart'
import { PriceAlertCard, type PriceAlert } from '@core/patterns/PriceAlertCard'
import { QuickTradeForm, type CryptoOption } from '@core/patterns/QuickTradeForm'

// ============================================================================
// CRYPTO ICONS
// ============================================================================

const BitcoinIcon = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6">
    <circle cx="16" cy="16" r="16" fill="#F7931A" />
    <path
      fill="#FFF"
      d="M22.5 14.1c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.2v-.1l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2 0-.1 0-.1 0-.2 0l-1.1 4.5c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.3c-.5 2.1-4.1 1-5.3.7l.9-3.8c1.2.3 4.9.9 4.4 3.1zm.6-5.4c-.5 1.9-3.5.9-4.4.7l.8-3.4c1 .2 4.1.7 3.6 2.7z"
    />
  </svg>
)

const EthereumIcon = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6">
    <circle cx="16" cy="16" r="16" fill="#627EEA" />
    <path fill="#FFF" fillOpacity=".6" d="M16 4v8.9l7.5 3.3z" />
    <path fill="#FFF" d="M16 4L8.5 16.2l7.5-3.3z" />
    <path fill="#FFF" fillOpacity=".6" d="M16 21.5v6.5l7.5-10.4z" />
    <path fill="#FFF" d="M16 28v-6.5L8.5 17.6z" />
    <path fill="#FFF" fillOpacity=".2" d="M16 20.1l7.5-3.9L16 13z" />
    <path fill="#FFF" fillOpacity=".6" d="M8.5 16.2l7.5 3.9V13z" />
  </svg>
)

const SolanaIcon = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6">
    <defs>
      <linearGradient id="sol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFA3" />
        <stop offset="100%" stopColor="#DC1FFF" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#sol-grad)" />
    <path
      fill="#FFF"
      d="M10.5 19.7c.1-.1.3-.2.5-.2h10.8c.3 0 .5.4.3.6l-2.1 2.1c-.1.1-.3.2-.5.2H8.7c-.3 0-.5-.4-.3-.6l2.1-2.1zm0-7.4c.1-.1.3-.2.5-.2h10.8c.3 0 .5.4.3.6l-2.1 2.1c-.1.1-.3.2-.5.2H8.7c-.3 0-.5-.4-.3-.6l2.1-2.1zm11.4 3.5c-.1-.1-.3-.2-.5-.2H10.6c-.3 0-.5.4-.3.6l2.1 2.1c.1.1.3.2.5.2h10.8c.3 0 .5-.4.3-.6l-2.1-2.1z"
    />
  </svg>
)

const CardanoIcon = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6">
    <circle cx="16" cy="16" r="16" fill="#0033AD" />
    <circle cx="16" cy="16" r="7" fill="none" stroke="#FFF" strokeWidth="1.5" />
    <circle cx="16" cy="9" r="1.5" fill="#FFF" />
    <circle cx="22" cy="13" r="1.5" fill="#FFF" />
    <circle cx="22" cy="19" r="1.5" fill="#FFF" />
    <circle cx="16" cy="23" r="1.5" fill="#FFF" />
    <circle cx="10" cy="19" r="1.5" fill="#FFF" />
    <circle cx="10" cy="13" r="1.5" fill="#FFF" />
  </svg>
)

// ============================================================================
// MOCK DATA
// ============================================================================

// Portfolio Data
const portfolioData = {
  total: 127432.56,
  change: 4234.12,
  changePercent: 3.44,
  sparkline: [
    120000, 118500, 122000, 121000, 123500, 125000, 124000, 126500, 125500, 127000,
    126000, 128500, 127500, 129000, 128000, 130500, 129500, 131000, 130000, 127432.56,
  ],
  allocation: [
    { name: 'BTC', value: 45, color: '#F7931A' },
    { name: 'ETH', value: 30, color: '#627EEA' },
    { name: 'SOL', value: 12, color: '#14F195' },
    { name: 'ADA', value: 8, color: '#0033AD' },
    { name: 'Others', value: 5, color: '#64748B' },
  ],
}

// Top Cryptos
const topCryptos: CryptoOption[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67432.12,
    balance: 0.85,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    balance: 12.5,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 142.35,
    balance: 45.2,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.58,
    balance: 15000,
  },
]

const cryptoCards = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67432.12,
    change: 2.34,
    holdings: 0.85,
    holdingsValue: 57317,
    sparkline: [64500, 65200, 64800, 66000, 65500, 67000, 66500, 67800, 67200, 67432],
    icon: <BitcoinIcon />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change: -1.23,
    holdings: 12.5,
    holdingsValue: 43209,
    sparkline: [3550, 3520, 3480, 3510, 3450, 3490, 3420, 3470, 3440, 3456],
    icon: <EthereumIcon />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 142.35,
    change: 5.67,
    holdings: 45.2,
    holdingsValue: 6434,
    sparkline: [128, 132, 135, 130, 138, 140, 136, 142, 139, 142],
    icon: <SolanaIcon />,
    iconBg: 'bg-gradient-to-br from-green-100 to-purple-100 dark:from-green-900/30 dark:to-purple-900/30',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.58,
    change: 0.86,
    holdings: 15000,
    holdingsValue: 8700,
    sparkline: [0.55, 0.56, 0.54, 0.57, 0.55, 0.58, 0.56, 0.59, 0.57, 0.58],
    icon: <CardanoIcon />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
]

// Candlestick Data (24h BTC/USD)
const candlestickData: CandleData[] = [
  { time: '00:00', open: 66800, high: 67200, low: 66600, close: 67000, volume: 125000000 },
  { time: '01:00', open: 67000, high: 67400, low: 66900, close: 67300, volume: 98000000 },
  { time: '02:00', open: 67300, high: 67500, low: 67100, close: 67150, volume: 75000000 },
  { time: '03:00', open: 67150, high: 67300, low: 66800, close: 66900, volume: 68000000 },
  { time: '04:00', open: 66900, high: 67100, low: 66700, close: 67050, volume: 82000000 },
  { time: '05:00', open: 67050, high: 67400, low: 67000, close: 67350, volume: 95000000 },
  { time: '06:00', open: 67350, high: 67600, low: 67200, close: 67500, volume: 110000000 },
  { time: '07:00', open: 67500, high: 67700, low: 67300, close: 67400, volume: 125000000 },
  { time: '08:00', open: 67400, high: 67800, low: 67350, close: 67750, volume: 145000000 },
  { time: '09:00', open: 67750, high: 68000, low: 67600, close: 67900, volume: 165000000 },
  { time: '10:00', open: 67900, high: 68100, low: 67700, close: 67800, volume: 155000000 },
  { time: '11:00', open: 67800, high: 67950, low: 67500, close: 67600, volume: 140000000 },
  { time: '12:00', open: 67600, high: 67800, low: 67400, close: 67700, volume: 130000000 },
  { time: '13:00', open: 67700, high: 67900, low: 67550, close: 67850, volume: 120000000 },
  { time: '14:00', open: 67850, high: 68050, low: 67700, close: 67950, volume: 135000000 },
  { time: '15:00', open: 67950, high: 68200, low: 67850, close: 68100, volume: 150000000 },
  { time: '16:00', open: 68100, high: 68300, low: 67900, close: 68000, volume: 145000000 },
  { time: '17:00', open: 68000, high: 68150, low: 67700, close: 67750, volume: 160000000 },
  { time: '18:00', open: 67750, high: 67900, low: 67500, close: 67600, volume: 140000000 },
  { time: '19:00', open: 67600, high: 67800, low: 67450, close: 67700, volume: 125000000 },
  { time: '20:00', open: 67700, high: 67850, low: 67550, close: 67650, volume: 115000000 },
  { time: '21:00', open: 67650, high: 67800, low: 67500, close: 67550, volume: 105000000 },
  { time: '22:00', open: 67550, high: 67700, low: 67400, close: 67500, volume: 95000000 },
  { time: '23:00', open: 67500, high: 67600, low: 67350, close: 67432, volume: 88000000 },
]

// Price Alerts
const priceAlerts: PriceAlert[] = [
  { id: '1', crypto: 'Bitcoin', symbol: 'BTC', condition: 'above', targetPrice: 70000, currentPrice: 67432, status: 'active' },
  { id: '2', crypto: 'Ethereum', symbol: 'ETH', condition: 'below', targetPrice: 3000, currentPrice: 3456, status: 'triggered' },
  { id: '3', crypto: 'Solana', symbol: 'SOL', condition: 'above', targetPrice: 150, currentPrice: 142, status: 'active' },
  { id: '4', crypto: 'Bitcoin', symbol: 'BTC', condition: 'below', targetPrice: 60000, currentPrice: 67432, status: 'disabled' },
]

// Market Movers
const marketMovers = {
  gainers: [
    { symbol: 'PEPE', name: 'Pepe', price: 0.0000089, change: 24.5 },
    { symbol: 'BONK', name: 'Bonk', price: 0.000023, change: 18.3 },
    { symbol: 'INJ', name: 'Injective', price: 28.45, change: 15.2 },
    { symbol: 'FET', name: 'Fetch.ai', price: 2.34, change: 12.8 },
    { symbol: 'RNDR', name: 'Render', price: 8.92, change: 11.5 },
  ],
  losers: [
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.142, change: -8.5 },
    { symbol: 'SHIB', name: 'Shiba Inu', price: 0.000024, change: -7.2 },
    { symbol: 'XRP', name: 'Ripple', price: 0.58, change: -5.8 },
    { symbol: 'AVAX', name: 'Avalanche', price: 35.67, change: -4.9 },
    { symbol: 'LINK', name: 'Chainlink', price: 14.23, change: -3.7 },
  ],
}

// Watchlist
interface WatchlistItem {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  sparkline: number[]
  favorite: boolean
}

const watchlistData: WatchlistItem[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 67432.12, change24h: 2.34, volume24h: 28500000000, marketCap: 1320000000000, sparkline: [64500, 65200, 66000, 66500, 67000, 67432], favorite: true },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3456.78, change24h: -1.23, volume24h: 15200000000, marketCap: 415000000000, sparkline: [3550, 3520, 3480, 3450, 3470, 3456], favorite: true },
  { id: '3', symbol: 'BNB', name: 'BNB', price: 584.23, change24h: 1.45, volume24h: 1250000000, marketCap: 89000000000, sparkline: [570, 575, 578, 580, 582, 584], favorite: false },
  { id: '4', symbol: 'SOL', name: 'Solana', price: 142.35, change24h: 5.67, volume24h: 3200000000, marketCap: 62000000000, sparkline: [128, 132, 138, 140, 141, 142], favorite: true },
  { id: '5', symbol: 'XRP', name: 'Ripple', price: 0.58, change24h: -2.34, volume24h: 1800000000, marketCap: 31000000000, sparkline: [0.60, 0.59, 0.58, 0.57, 0.58, 0.58], favorite: false },
  { id: '6', symbol: 'ADA', name: 'Cardano', price: 0.58, change24h: 0.86, volume24h: 450000000, marketCap: 20500000000, sparkline: [0.55, 0.56, 0.57, 0.57, 0.58, 0.58], favorite: true },
  { id: '7', symbol: 'DOGE', name: 'Dogecoin', price: 0.142, change24h: -3.45, volume24h: 890000000, marketCap: 20000000000, sparkline: [0.15, 0.148, 0.145, 0.143, 0.142, 0.142], favorite: false },
  { id: '8', symbol: 'AVAX', name: 'Avalanche', price: 35.67, change24h: 3.21, volume24h: 520000000, marketCap: 13500000000, sparkline: [33, 34, 34.5, 35, 35.5, 35.67], favorite: false },
  { id: '9', symbol: 'DOT', name: 'Polkadot', price: 7.23, change24h: 1.89, volume24h: 320000000, marketCap: 9800000000, sparkline: [6.9, 7.0, 7.1, 7.15, 7.2, 7.23], favorite: false },
  { id: '10', symbol: 'LINK', name: 'Chainlink', price: 14.23, change24h: -0.56, volume24h: 410000000, marketCap: 8300000000, sparkline: [14.5, 14.4, 14.3, 14.25, 14.2, 14.23], favorite: false },
]

// Recent Transactions
interface Transaction {
  id: string
  type: 'buy' | 'sell'
  crypto: string
  symbol: string
  amount: number
  price: number
  total: number
  timestamp: string
}

const recentTransactions: Transaction[] = [
  { id: '1', type: 'buy', crypto: 'Bitcoin', symbol: 'BTC', amount: 0.05, price: 67200, total: 3360, timestamp: '2026-02-07 14:32' },
  { id: '2', type: 'sell', crypto: 'Ethereum', symbol: 'ETH', amount: 2, price: 3450, total: 6900, timestamp: '2026-02-07 12:15' },
  { id: '3', type: 'buy', crypto: 'Solana', symbol: 'SOL', amount: 10, price: 140, total: 1400, timestamp: '2026-02-07 09:45' },
  { id: '4', type: 'buy', crypto: 'Cardano', symbol: 'ADA', amount: 5000, price: 0.56, total: 2800, timestamp: '2026-02-06 18:20' },
  { id: '5', type: 'sell', crypto: 'Bitcoin', symbol: 'BTC', amount: 0.1, price: 66800, total: 6680, timestamp: '2026-02-06 11:30' },
]

// Watchlist Table Columns
const watchlistColumns: ColumnDef<WatchlistItem>[] = [
  {
    id: 'favorite',
    accessorKey: 'favorite',
    header: '',
    cell: ({ value }) => (
      <button className="text-amber-500 hover:text-amber-600 transition-colors">
        {value ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
      </button>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Coin',
    sortable: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
          {row.symbol.substring(0, 2)}
        </div>
        <div>
          <p className="font-medium text-[var(--text-primary)]">{row.name}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.symbol}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: 'Price',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="font-medium text-[var(--text-primary)]">
        ${(value as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: value as number < 1 ? 6 : 2 })}
      </span>
    ),
  },
  {
    id: 'change24h',
    accessorKey: 'change24h',
    header: '24h Change',
    sortable: true,
    align: 'right',
    cell: ({ value }) => {
      const change = value as number
      const isPositive = change >= 0
      return (
        <span className={`flex items-center justify-end gap-1 font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </span>
      )
    },
  },
  {
    id: 'volume24h',
    accessorKey: 'volume24h',
    header: '24h Volume',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="text-[var(--text-secondary)]">
        ${((value as number) / 1000000000).toFixed(2)}B
      </span>
    ),
  },
  {
    id: 'marketCap',
    accessorKey: 'marketCap',
    header: 'Market Cap',
    sortable: true,
    align: 'right',
    cell: ({ value }) => (
      <span className="text-[var(--text-secondary)]">
        ${((value as number) / 1000000000).toFixed(0)}B
      </span>
    ),
  },
  {
    id: 'sparkline',
    accessorKey: 'sparkline',
    header: '7d Chart',
    cell: ({ row }) => (
      <SparklineChart
        data={row.sparkline}
        type="line"
        color={row.change24h >= 0 ? '#22C55E' : '#EF4444'}
        width={80}
        height={24}
        showDot={false}
        curve="smooth"
      />
    ),
  },
  {
    id: 'actions',
    accessorKey: 'id',
    header: '',
    cell: () => (
      <Button variant="outline" size="sm">
        Trade
      </Button>
    ),
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function CryptoDashboard() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('1D')
  const [selectedPair, setSelectedPair] = React.useState('BTC/USD')
  const [moverTab, setMoverTab] = React.useState<'gainers' | 'losers'>('gainers')
  const [lastUpdate, setLastUpdate] = React.useState(new Date())

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const timeframes = ['1H', '4H', '1D', '1W', '1M']
  const pairs = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'ADA/USD']

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden sm:block sm:w-48" />
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">Crypto Trading</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Market Open
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Updated {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <Button variant="primary" size="sm" leftIcon={<ArrowRightLeft className="h-4 w-4" />}>
            Trade
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Deposit
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Withdraw
          </Button>
        </div>
      </div>

      {/* ====== ROW 1: PORTFOLIO OVERVIEW (Hero Card) ====== */}
      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : (
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950 text-white dark:from-purple-950 dark:via-slate-950 dark:to-blue-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_50%)]" />
          <Card.Content className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-purple-200">Total Portfolio Value</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold md:text-5xl">
                    ${portfolioData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{portfolioData.changePercent}%
                  </Badge>
                </div>
                <p className="flex items-center gap-1 text-sm text-green-300">
                  <ArrowUpRight className="h-4 w-4" />
                  +${portfolioData.change.toLocaleString()} (24h)
                </p>

                {/* Mini Allocation */}
                <div className="flex items-center gap-3 mt-4">
                  {portfolioData.allocation.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-white/70">{item.name}</span>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Trading Stats */}
              <div className="grid grid-cols-2 gap-3 lg:min-w-[320px]">
                {[
                  { label: '24h Volume', value: '$2.8B', change: '+12.4%', positive: true },
                  { label: 'Open Orders', value: '3', change: 'Active', positive: true },
                  { label: 'Win Rate', value: '74%', change: '+2.1%', positive: true },
                  { label: 'Avg. Entry', value: '$52.4K', change: '-8.2%', positive: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/8 p-3 backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-medium text-purple-300/70 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold text-white mt-0.5">{stat.value}</p>
                    <span className={`text-[10px] font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ====== ROW 2: CRYPTO CARDS ====== */}
      {/* Mobile: Carousel */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 py-1 sm:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-[75vw] max-w-[280px] shrink-0 snap-start rounded-xl" />
          ))
        ) : (
          cryptoCards.map((crypto) => (
            <div key={crypto.symbol} className="w-[75vw] max-w-[280px] shrink-0 snap-start">
              <CryptoCard
                name={crypto.name}
                symbol={crypto.symbol}
                price={crypto.price}
                change={crypto.change}
                icon={crypto.icon}
                iconBg={crypto.iconBg}
                sparklineData={crypto.sparkline}
                holdings={crypto.holdings}
                holdingsValue={crypto.holdingsValue}
              />
            </div>
          ))
        )}
      </div>
      {/* Desktop: Grid */}
      <div className="hidden sm:block">
        <DashboardGrid preset="4col" gap="lg">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </>
          ) : (
            cryptoCards.map((crypto) => (
              <CryptoCard
                key={crypto.symbol}
                name={crypto.name}
                symbol={crypto.symbol}
                price={crypto.price}
                change={crypto.change}
                icon={crypto.icon}
                iconBg={crypto.iconBg}
                sparklineData={crypto.sparkline}
                holdings={crypto.holdings}
                holdingsValue={crypto.holdingsValue}
              />
            ))
          )}
        </DashboardGrid>
      </div>

      {/* ====== ROW 3: CANDLESTICK CHART ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />
        <Card.Header>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="h-9 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 text-sm font-medium text-[var(--text-primary)] focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                {pairs.map((pair) => (
                  <option key={pair} value={pair}>{pair}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">$67,432.12</span>
                <Badge variant="success" size="sm">+2.34%</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-[var(--border-default)] p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedTimeframe === tf
                        ? 'bg-primary-500 text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <Skeleton className="h-80 rounded-lg" />
          ) : (
            <CandlestickChart
              data={candlestickData}
              size="lg"
              showVolume
              showMA
              maPeriods={[7, 25]}
              currentPrice={67432.12}
              animated
            />
          )}
        </Card.Content>
      </Card>

      {/* ====== ROW 4: ALLOCATION + QUICK TRADE ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Portfolio Allocation */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500" />
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary-500" />
              Portfolio Allocation
            </Card.Title>
            <Card.Description>Asset distribution</Card.Description>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-80">
                  <ChartWrapper
                    type="donut"
                    data={portfolioData.allocation}
                    series={[{ dataKey: 'value', name: 'Allocation' }]}
                    xAxisKey="name"
                    height={300}
                    showTooltip
                    tooltipFormatter={(value) => `${value}%`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 w-full">
                  {portfolioData.allocation.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{item.value}%</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        ${((portfolioData.total * item.value) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Quick Trade */}
        {isLoading ? (
          <Skeleton className="h-96 rounded-xl" />
        ) : (
          <QuickTradeForm
            cryptos={topCryptos}
            defaultCrypto="BTC"
            usdBalance={15000}
            feePercent={0.1}
            onTrade={(data) => console.log('Trade:', data)}
          />
        )}
      </div>

      {/* ====== ROW 5: PRICE ALERTS + MARKET MOVERS ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Alerts */}
        {isLoading ? (
          <Skeleton className="h-80 rounded-xl" />
        ) : (
          <PriceAlertCard
            alerts={priceAlerts.map(alert => ({
              ...alert,
              icon: alert.symbol === 'BTC' ? <BitcoinIcon /> :
                    alert.symbol === 'ETH' ? <EthereumIcon /> :
                    alert.symbol === 'SOL' ? <SolanaIcon /> : undefined
            }))}
            onAddAlert={() => console.log('Add alert')}
            onDeleteAlert={(id) => console.log('Delete:', id)}
            onToggleAlert={(id) => console.log('Toggle:', id)}
          />
        )}

        {/* Market Movers */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-500" />
                  Market Movers
                </Card.Title>
                <Card.Description>24h price changes</Card.Description>
              </div>
              <div className="flex rounded-lg border border-[var(--border-default)] p-1">
                <button
                  onClick={() => setMoverTab('gainers')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    moverTab === 'gainers'
                      ? 'bg-green-500 text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Top Gainers
                </button>
                <button
                  onClick={() => setMoverTab('losers')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    moverTab === 'losers'
                      ? 'bg-red-500 text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Top Losers
                </button>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {marketMovers[moverTab].map((coin, index) => (
                  <div
                    key={coin.symbol}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center text-xs font-medium text-[var(--text-muted)]">
                        {index + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                        {coin.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{coin.symbol}</p>
                        <p className="text-xs text-[var(--text-muted)]">{coin.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[var(--text-primary)]">
                        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 1 ? 6 : 2 })}
                      </p>
                      <p className={`text-sm font-medium flex items-center justify-end gap-1 ${
                        coin.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {coin.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div className="w-20 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ml-3">
                      <div
                        className={`h-full rounded-full ${coin.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(coin.change) * 4, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW 6: WATCHLIST TABLE ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary-500" />
                Watchlist
              </Card.Title>
              <Card.Description>Track your favorite cryptocurrencies</Card.Description>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Coin
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Mobile: 2-column carousel */}
              <div className="sm:hidden">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {(() => {
                    const pages: (typeof watchlistData)[] = []
                    for (let i = 0; i < watchlistData.length; i += 2) {
                      pages.push(watchlistData.slice(i, i + 2))
                    }
                    return pages.map((page, pi) => (
                      <div key={pi} className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col gap-3">
                        {page.map((coin) => {
                          const isPositive = coin.change24h >= 0
                          return (
                            <div key={coin.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {coin.favorite && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                  <span className="text-sm font-bold text-[var(--text-primary)]">{coin.symbol}</span>
                                  <span className="text-xs text-[var(--text-muted)]">{coin.name}</span>
                                </div>
                                <span className={`text-xs font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {isPositive ? '+' : ''}{coin.change24h}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-[var(--text-primary)]">
                                  ${coin.price < 1 ? coin.price.toFixed(3) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-[10px] text-[var(--text-muted)]">
                                  Vol: ${(coin.volume24h / 1e9).toFixed(1)}B
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ))
                  })()}
                </div>
              </div>
              {/* Desktop: DataTable */}
              <div className="hidden sm:block -mx-5 -mb-1">
                <DataTable
                  data={watchlistData}
                  columns={watchlistColumns}
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

      {/* ====== ROW 7: RECENT TRANSACTIONS ====== */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-500" />
                Recent Transactions
              </Card.Title>
              <Card.Description>Your latest trading activity</Card.Description>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-default)] hover:border-[var(--border-muted)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'buy'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {tx.type === 'buy'
                        ? <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                        : <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount} {tx.symbol}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        at ${tx.price.toLocaleString()} • {tx.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      tx.type === 'buy'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {tx.type === 'buy' ? '-' : '+'}${tx.total.toLocaleString()}
                    </p>
                    <Badge variant={tx.type === 'buy' ? 'success' : 'error'} size="sm">
                      {tx.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}
