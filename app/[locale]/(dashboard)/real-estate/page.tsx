'use client'

import { useState, useEffect } from 'react'
import {
  Home,
  DollarSign,
  Clock,
  Plus,
  Map,
  Filter,
  MapPin,
  CheckCircle2,
  Timer,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Star,
  Building2,
  Key,
  Eye,
  Heart,
  Bed,
  Bath,
  Maximize,
  Crown,
  Flame,
  Target,
  Users,
  CalendarDays,
  BarChart3,
  Download,
} from 'lucide-react'

import { PageHeader } from '@core/layouts/PageHeader'
import { DashboardGrid } from '@core/layouts/DashboardGrid'
import { Card } from '@core/organisms/Card'
import { DataTable } from '@core/organisms/DataTable'
import { ChartWrapper } from '@core/organisms/ChartWrapper'
import { Button } from '@core/primitives/Button'
import { Badge } from '@core/primitives/Badge'
import { Avatar } from '@core/primitives/Avatar'
import { Skeleton } from '@core/primitives/Skeleton'
import { ProgressBar } from '@core/patterns/ProgressBar'
import { SparklineChart } from '@core/patterns/SparklineChart'
import { ActivityTimeline } from '@core/patterns/ActivityTimeline'
import { LeaderboardList } from '@core/patterns/LeaderboardList'
import { PropertyCard } from '@core/patterns/PropertyCard'

// ============================================================================
// MOCK DATA — Brazilian / Universal Cities
// ============================================================================

// Hero Data
const heroData = {
  totalRevenue: 4850000,
  propertiesSold: 12,
  avgDaysOnMarket: 23,
  conversionRate: 34.2,
  revenueSparkline: [
    2800000, 3100000, 2900000, 3400000, 3200000, 3600000, 3800000, 3500000,
    4000000, 4200000, 3900000, 4500000, 4300000, 4700000, 4850000,
  ],
}

// KPI sparklines
const kpiSparklines = {
  listings: [32, 35, 38, 36, 40, 42, 39, 44, 41, 45, 43, 47],
  sold: [5, 7, 6, 8, 9, 7, 10, 8, 11, 9, 12, 12],
  daysOnMarket: [35, 32, 30, 28, 27, 25, 26, 24, 23, 25, 22, 23],
  commission: [45000, 52000, 68000, 72000, 85000, 78000, 92000, 98000, 105000, 112000, 118000, 126400],
}

// Featured Listings Data — Brazilian Cities
const featuredListings = [
  {
    id: 1,
    address: 'Rua Oscar Freire, 1245',
    city: 'São Paulo, SP',
    price: 1850000,
    status: 'for-sale' as const,
    type: 'house' as const,
    beds: 4,
    baths: 3,
    sqft: 320,
    daysOnMarket: 12,
    isFavorite: true,
  },
  {
    id: 2,
    address: 'Av. Vieira Souto, 420',
    city: 'Rio de Janeiro, RJ',
    price: 2750000,
    status: 'under-contract' as const,
    type: 'condo' as const,
    beds: 3,
    baths: 2,
    sqft: 180,
    daysOnMarket: 28,
    isFavorite: false,
  },
  {
    id: 3,
    address: 'Rua das Palmeiras, 78',
    city: 'Florianópolis, SC',
    price: 1250000,
    status: 'for-sale' as const,
    type: 'house' as const,
    beds: 5,
    baths: 4,
    sqft: 450,
    daysOnMarket: 5,
    isFavorite: true,
  },
  {
    id: 4,
    address: 'Av. Beira Mar, 1500',
    city: 'Fortaleza, CE',
    price: 680000,
    status: 'sold' as const,
    type: 'apartment' as const,
    beds: 2,
    baths: 1,
    sqft: 95,
    daysOnMarket: 45,
    isFavorite: false,
  },
  {
    id: 5,
    address: 'Rua XV de Novembro, 300',
    city: 'Curitiba, PR',
    price: 920000,
    status: 'for-sale' as const,
    type: 'house' as const,
    beds: 3,
    baths: 2,
    sqft: 210,
    daysOnMarket: 18,
    isFavorite: false,
  },
  {
    id: 6,
    address: 'Av. Atlântica, 890',
    city: 'Balneário Camboriú, SC',
    price: 1450000,
    status: 'for-rent' as const,
    type: 'condo' as const,
    beds: 2,
    baths: 2,
    sqft: 140,
    daysOnMarket: 8,
    isFavorite: true,
  },
]

// Sales Pipeline Data
const pipelineData = [
  { stage: 'Novos Leads', count: 34, value: 12500000, color: '#6366F1', icon: Users },
  { stage: 'Visitas Agendadas', count: 18, value: 6800000, color: '#06B6D4', icon: Eye },
  { stage: 'Propostas Feitas', count: 8, value: 3200000, color: '#F59E0B', icon: Target },
  { stage: 'Em Contrato', count: 5, value: 2100000, color: '#F97316', icon: Key },
  { stage: 'Fechados', count: 12, value: 4850000, color: '#22C55E', icon: CheckCircle2 },
]

// Price Distribution Data (in R$)
const priceDistribution = [
  { range: 'Até R$500K', count: 8, color: '#6366F1' },
  { range: 'R$500K–R$800K', count: 15, color: '#06B6D4' },
  { range: 'R$800K–R$1.2M', count: 12, color: '#14B89A' },
  { range: 'R$1.2M–R$2M', count: 8, color: '#F59E0B' },
  { range: 'R$2M+', count: 4, color: '#EF4444' },
]

// Sales Trend Data (monthly)
const salesTrendData = [
  { month: 'Jul', vendas: 8, receita: 2800 },
  { month: 'Ago', vendas: 10, receita: 3400 },
  { month: 'Set', vendas: 7, receita: 2600 },
  { month: 'Out', vendas: 12, receita: 4100 },
  { month: 'Nov', vendas: 9, receita: 3200 },
  { month: 'Dez', vendas: 14, receita: 4800 },
  { month: 'Jan', vendas: 11, receita: 3900 },
  { month: 'Fev', vendas: 12, receita: 4850 },
]

// Property Type Distribution
const propertyTypes = [
  { type: 'Casas', count: 18, percentage: 38, color: '#F59E0B', icon: Home },
  { type: 'Apartamentos', count: 14, percentage: 30, color: '#3B82F6', icon: Building2 },
  { type: 'Coberturas', count: 8, percentage: 17, color: '#8B5CF6', icon: Crown },
  { type: 'Terrenos', count: 7, percentage: 15, color: '#22C55E', icon: Maximize },
]

// Recent Activity Data
const recentActivity = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Imóvel vendido por R$680K',
    description: 'Av. Beira Mar, 1500 — Fortaleza',
    timestamp: '2 horas atrás',
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'Novo imóvel cadastrado',
    description: 'Av. Vieira Souto, 420 — R$2.750.000',
    timestamp: '5 horas atrás',
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'Visita agendada',
    description: 'Carlos Silva — Rua das Palmeiras, 78',
    timestamp: '1 dia atrás',
  },
  {
    id: '4',
    type: 'info' as const,
    title: 'Proposta recebida',
    description: 'R$900K pela Rua XV de Novembro, 300',
    timestamp: '1 dia atrás',
  },
  {
    id: '5',
    type: 'default' as const,
    title: 'Consulta de cliente',
    description: 'Ana Beatriz interessada em coberturas',
    timestamp: '2 dias atrás',
  },
  {
    id: '6',
    type: 'default' as const,
    title: 'Tour virtual assistido',
    description: '15 visualizações em Oscar Freire',
    timestamp: '2 dias atrás',
  },
  {
    id: '7',
    type: 'warning' as const,
    title: 'Redução de preço',
    description: 'Av. Atlântica reduzido em R$50K',
    timestamp: '3 dias atrás',
  },
  {
    id: '8',
    type: 'info' as const,
    title: 'Open house concluído',
    description: '12 visitantes em Oscar Freire, 1245',
    timestamp: '3 dias atrás',
  },
  {
    id: '9',
    type: 'success' as const,
    title: 'Contrato assinado',
    description: 'Cobertura Vieira Souto — R$2.750.000',
    timestamp: '3 dias atrás',
  },
  {
    id: '10',
    type: 'warning' as const,
    title: 'Vistoria agendada',
    description: 'Rafael Mendes — Rua Augusta, 2100',
    timestamp: '4 dias atrás',
  },
  {
    id: '11',
    type: 'info' as const,
    title: 'Fotos profissionais entregues',
    description: '24 fotos para Av. Boa Viagem, Recife',
    timestamp: '4 dias atrás',
  },
  {
    id: '12',
    type: 'success' as const,
    title: 'Aluguel renovado',
    description: 'Apt 302 — Rua Haddock Lobo, São Paulo',
    timestamp: '4 dias atrás',
  },
  {
    id: '13',
    type: 'default' as const,
    title: 'Lead qualificado',
    description: 'João Pedro — orçamento R$1.2M, zona sul',
    timestamp: '5 dias atrás',
  },
  {
    id: '14',
    type: 'warning' as const,
    title: 'Documento pendente',
    description: 'Matrícula atualizada — Rua Oscar Freire',
    timestamp: '5 dias atrás',
  },
  {
    id: '15',
    type: 'info' as const,
    title: 'Avaliação solicitada',
    description: 'Cobertura duplex — Leblon, 280m²',
    timestamp: '5 dias atrás',
  },
  {
    id: '16',
    type: 'success' as const,
    title: 'Comissão liberada',
    description: 'R$42K — venda Av. Beira Mar',
    timestamp: '6 dias atrás',
  },
  {
    id: '17',
    type: 'default' as const,
    title: 'Comparativo de mercado',
    description: 'Relatório gerado — Jardins, SP',
    timestamp: '6 dias atrás',
  },
  {
    id: '18',
    type: 'info' as const,
    title: 'Parceria com corretor',
    description: 'Mariana Oliveira — co-broker Ipanema',
    timestamp: '6 dias atrás',
  },
  {
    id: '19',
    type: 'warning' as const,
    title: 'Prazo de exclusividade',
    description: 'Expira em 7 dias — Rua Augusta, 1500',
    timestamp: '7 dias atrás',
  },
  {
    id: '20',
    type: 'success' as const,
    title: 'Meta mensal atingida',
    description: 'Ana Beatriz — 96% da meta cumprida',
    timestamp: '7 dias atrás',
  },
]

// Top Agents Data
const topAgents = [
  { id: '1', rank: 1, name: 'Ana Beatriz Santos', avatar: '', value: 'R$1.8M', change: 3 },
  { id: '2', rank: 2, name: 'Carlos Eduardo Silva', avatar: '', value: 'R$1.4M', change: 1 },
  { id: '3', rank: 3, name: 'Mariana Oliveira', avatar: '', value: 'R$1.1M', change: -1 },
  { id: '4', rank: 4, name: 'Rafael Mendes', avatar: '', value: 'R$920K', change: 2 },
  { id: '5', rank: 5, name: 'Juliana Costa', avatar: '', value: 'R$780K', change: 0 },
]

// Extended Agent Performance Data
const agentPerformance = [
  { name: 'Ana Beatriz Santos', initials: 'AB', sold: 5, listings: 8, avgDays: 18, rating: 4.9, goalPercent: 96, commission: 54000, sparkline: [3, 4, 2, 5, 4, 6, 5, 7, 5, 6, 7, 5], color: 'from-yellow-500 to-amber-600', speciality: 'Casas de Luxo' },
  { name: 'Carlos Eduardo Silva', initials: 'CE', sold: 4, listings: 6, avgDays: 22, rating: 4.7, goalPercent: 88, commission: 42000, sparkline: [2, 3, 4, 3, 5, 4, 3, 5, 4, 6, 4, 4], color: 'from-blue-500 to-indigo-600', speciality: 'Coberturas' },
  { name: 'Mariana Oliveira', initials: 'MO', sold: 3, listings: 7, avgDays: 25, rating: 4.8, goalPercent: 82, commission: 33000, sparkline: [1, 2, 3, 2, 4, 3, 4, 3, 5, 3, 4, 3], color: 'from-rose-500 to-pink-600', speciality: 'Apartamentos' },
  { name: 'Rafael Mendes', initials: 'RM', sold: 3, listings: 5, avgDays: 20, rating: 4.6, goalPercent: 78, commission: 27600, sparkline: [2, 1, 3, 2, 3, 4, 2, 3, 4, 3, 5, 3], color: 'from-teal-500 to-emerald-600', speciality: 'Terrenos' },
  { name: 'Juliana Costa', initials: 'JC', sold: 2, listings: 4, avgDays: 28, rating: 4.5, goalPercent: 71, commission: 23400, sparkline: [1, 2, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2], color: 'from-violet-500 to-purple-600', speciality: 'Comercial' },
]

// All Listings Table Data — Brazilian Cities
const allListings = [
  { id: 1, address: 'Rua Oscar Freire, 1245', city: 'São Paulo, SP', type: 'Casa', price: 1850000, status: 'À Venda', beds: 4, baths: 3, sqft: 320, daysListed: 12, agent: 'Ana Beatriz Santos' },
  { id: 2, address: 'Av. Vieira Souto, 420', city: 'Rio de Janeiro, RJ', type: 'Cobertura', price: 2750000, status: 'Em Contrato', beds: 3, baths: 2, sqft: 180, daysListed: 28, agent: 'Carlos Eduardo Silva' },
  { id: 3, address: 'Rua das Palmeiras, 78', city: 'Florianópolis, SC', type: 'Casa', price: 1250000, status: 'À Venda', beds: 5, baths: 4, sqft: 450, daysListed: 5, agent: 'Ana Beatriz Santos' },
  { id: 4, address: 'Av. Beira Mar, 1500', city: 'Fortaleza, CE', type: 'Apartamento', price: 680000, status: 'Vendido', beds: 2, baths: 1, sqft: 95, daysListed: 45, agent: 'Mariana Oliveira' },
  { id: 5, address: 'Rua XV de Novembro, 300', city: 'Curitiba, PR', type: 'Casa', price: 920000, status: 'À Venda', beds: 3, baths: 2, sqft: 210, daysListed: 18, agent: 'Rafael Mendes' },
  { id: 6, address: 'Av. Atlântica, 890', city: 'Balneário Camboriú, SC', type: 'Cobertura', price: 1450000, status: 'Para Alugar', beds: 2, baths: 2, sqft: 140, daysListed: 8, agent: 'Juliana Costa' },
  { id: 7, address: 'Rua Augusta, 2100', city: 'São Paulo, SP', type: 'Apartamento', price: 580000, status: 'À Venda', beds: 3, baths: 2, sqft: 120, daysListed: 22, agent: 'Carlos Eduardo Silva' },
  { id: 8, address: 'Av. Boa Viagem, 3200', city: 'Recife, PE', type: 'Terreno', price: 350000, status: 'À Venda', beds: 0, baths: 0, sqft: 800, daysListed: 35, agent: 'Mariana Oliveira' },
  { id: 9, address: 'Rua Padre Chagas, 180', city: 'Porto Alegre, RS', type: 'Apartamento', price: 720000, status: 'À Venda', beds: 2, baths: 2, sqft: 110, daysListed: 14, agent: 'Rafael Mendes' },
  { id: 10, address: 'Av. Brasil, 4500', city: 'Belo Horizonte, MG', type: 'Casa', price: 1650000, status: 'Em Contrato', beds: 5, baths: 4, sqft: 380, daysListed: 20, agent: 'Ana Beatriz Santos' },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'success' | 'warning' | 'info' | 'default' | 'error'> = {
    'À Venda': 'info',
    'Para Alugar': 'default',
    'Em Contrato': 'warning',
    'Vendido': 'success',
    'Fora do Mercado': 'error',
  }
  return <Badge variant={variants[status] ?? 'default'}>{status}</Badge>
}

const listingsColumns = [
  {
    id: 'address',
    header: 'Endereço',
    sortable: true,
    cell: ({ row, value }: { row: any; value: any }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/20 shadow-sm">
          <Home className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="font-medium text-[var(--text-primary)]">{value}</p>
          <p className="text-xs text-[var(--text-muted)]">{row.city} · {row.type}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'price',
    header: 'Preço',
    sortable: true,
    cell: ({ value }: { value: any }) => (
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
        {formatCurrency(value)}
      </span>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }: { value: any }) => getStatusBadge(value),
  },
  {
    id: 'beds',
    header: 'Quartos',
    sortable: true,
    cell: ({ value }: { value: any }) => (
      <div className="flex items-center gap-1.5">
        <Bed className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    id: 'baths',
    header: 'Banheiros',
    sortable: true,
    cell: ({ value }: { value: any }) => (
      <div className="flex items-center gap-1.5">
        <Bath className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    id: 'sqft',
    header: 'Área (m²)',
    sortable: true,
    cell: ({ value }: { value: any }) => (
      <span className="font-medium">{Number(value).toLocaleString()} m²</span>
    ),
  },
  {
    id: 'daysListed',
    header: 'Dias no Mercado',
    sortable: true,
    cell: ({ value }: { value: any }) => {
      const days = Number(value)
      return (
        <div className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span className={days > 30 ? 'font-medium text-red-600 dark:text-red-400' : days < 10 ? 'font-medium text-green-600 dark:text-green-400' : ''}>
            {days}d
          </span>
        </div>
      )
    },
  },
  {
    id: 'agent',
    header: 'Corretor',
    sortable: true,
    cell: ({ value }: { value: any }) => {
      const name = String(value)
      return (
        <div className="flex items-center gap-2">
          <Avatar size="xs" fallback={name.split(' ').map((n: string) => n[0] ?? '').join('').slice(0, 2)} />
          <span className="text-sm">{name}</span>
        </div>
      )
    },
  },
]

// ============================================================================
// PROPERTY MAP — Brazilian Cities
// ============================================================================
function PropertyMapPremium({ isLoading }: { isLoading: boolean }) {
  const areas = [
    { name: 'São Paulo', state: 'SP', available: 12, underContract: 3, sold: 8, avgPrice: 1200000, color: 'from-amber-500 to-orange-600', trend: 12.5 },
    { name: 'Rio de Janeiro', state: 'RJ', available: 9, underContract: 2, sold: 5, avgPrice: 1800000, color: 'from-blue-500 to-indigo-600', trend: 8.3 },
    { name: 'Florianópolis', state: 'SC', available: 7, underContract: 1, sold: 4, avgPrice: 950000, color: 'from-teal-500 to-emerald-600', trend: 15.7 },
    { name: 'Curitiba', state: 'PR', available: 6, underContract: 2, sold: 3, avgPrice: 720000, color: 'from-violet-500 to-purple-600', trend: 6.2 },
    { name: 'Fortaleza', state: 'CE', available: 5, underContract: 1, sold: 3, avgPrice: 580000, color: 'from-cyan-500 to-sky-600', trend: 9.8 },
    { name: 'Belo Horizonte', state: 'MG', available: 4, underContract: 2, sold: 2, avgPrice: 680000, color: 'from-rose-500 to-pink-600', trend: 7.1 },
    { name: 'Porto Alegre', state: 'RS', available: 3, underContract: 1, sold: 2, avgPrice: 620000, color: 'from-emerald-500 to-green-600', trend: 4.5 },
    { name: 'Recife', state: 'PE', available: 4, underContract: 1, sold: 2, avgPrice: 490000, color: 'from-pink-500 to-rose-600', trend: 11.3 },
  ]

  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
      <Card.Header className="relative">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm shadow-amber-500/25">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <Card.Title>Mapa de Imóveis</Card.Title>
              <Card.Description className="mt-1">47 imóveis em 8 cidades brasileiras</Card.Description>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm" />
              <span className="text-[var(--text-muted)]">Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm" />
              <span className="text-[var(--text-muted)]">Em Contrato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-sm" />
              <span className="text-[var(--text-muted)]">Vendido</span>
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="relative">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile: 2-column carousel */}
            <div className="sm:hidden">
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {(() => {
                  const pages: typeof areas extends (infer T)[] ? T[][] : never = []
                  for (let i = 0; i < areas.length; i += 2) {
                    pages.push(areas.slice(i, i + 2))
                  }
                  return pages.map((page, pi) => (
                    <div key={pi} className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col gap-3">
                      {page.map((area) => (
                        <div
                          key={area.name}
                          className="relative overflow-hidden rounded-xl border border-[var(--border-default)] p-3"
                        >
                          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.color} opacity-[0.04]`} />
                          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${area.color}`} />
                          <div className="relative">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${area.color} shadow-sm`}>
                                  <MapPin className="h-3 w-3 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{area.name}</h4>
                                  <span className="text-[10px] text-[var(--text-muted)]">{area.state}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                                <TrendingUp className="h-3 w-3" />
                                {area.trend}%
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-[11px]">
                              <span><strong className="text-blue-600 dark:text-blue-400">{area.available}</strong> <span className="text-[var(--text-muted)]">disp.</span></span>
                              <span><strong className="text-amber-600 dark:text-amber-400">{area.underContract}</strong> <span className="text-[var(--text-muted)]">contrato</span></span>
                              <span><strong className="text-green-600 dark:text-green-400">{area.sold}</strong> <span className="text-[var(--text-muted)]">vend.</span></span>
                            </div>
                            <div className="mt-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 px-2 py-1 text-center">
                              <p className="text-[10px] text-[var(--text-muted)]">Preço Médio</p>
                              <p className="text-xs font-bold text-amber-700 dark:text-amber-300">{formatCurrency(area.avgPrice)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                })()}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid grid-cols-2 gap-4 md:grid-cols-4">
              {areas.map((area) => (
                <div
                  key={area.name}
                  className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-amber-300 dark:hover:border-amber-700"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.color} opacity-[0.04] transition-opacity group-hover:opacity-[0.08]`} />
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${area.color}`} />
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${area.color} shadow-sm`}>
                          <MapPin className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[var(--text-primary)]">{area.name}</h4>
                          <span className="text-[10px] font-medium text-[var(--text-muted)]">{area.state}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                        <TrendingUp className="h-3 w-3" />
                        {area.trend}%
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Disponível</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{area.available}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Em Contrato</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">{area.underContract}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Vendido</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{area.sold}</span>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 px-2 py-1.5 text-center">
                      <p className="text-[10px] font-medium text-[var(--text-muted)]">Preço Médio</p>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-300">{formatCurrency(area.avgPrice)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card.Content>
    </Card>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function RealEstatePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const totalPipelineValue = pipelineData.reduce((sum, stage) => sum + stage.value, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block sm:w-48" />
          <div className="text-center sm:flex-1">
            <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Real Estate Dashboard</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Gerencie seus imóveis, acompanhe vendas e monitore performance</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Exportar
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Map className="h-4 w-4" />}>
            Ver Mapa
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Novo Imóvel
          </Button>
        </div>
      </div>

      {/* ====== HERO CARD ====== */}
      {isLoading ? (
        <Skeleton className="h-52 w-full rounded-2xl" />
      ) : (
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 p-0">
          {/* Background overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.3),transparent_50%)]" />

          <div className="relative p-4 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Revenue + Badges */}
              <div className="space-y-3 text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm text-xs">
                    <Building2 className="mr-1 h-3 w-3" />
                    Receita do Mês
                  </Badge>
                  <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm text-xs">
                    <Flame className="mr-1 h-3 w-3" />
                    +22.8%
                  </Badge>
                </div>
                <div>
                  <span className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {formatCurrency(heroData.totalRevenue)}
                  </span>
                </div>
                <p className="flex items-center justify-center gap-1 text-sm text-white/80 lg:justify-start">
                  <TrendingUp className="h-4 w-4" />
                  +R$880K comparado ao mês anterior
                </p>
              </div>

              {/* Center: Vertical metrics with circular progress */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                {[
                  { label: 'Vendidos', value: heroData.propertiesSold, max: 20, suffix: '', color: '#FFFFFF', icon: CheckCircle2 },
                  { label: 'Dias Mercado', value: heroData.avgDaysOnMarket, max: 60, suffix: 'd', color: '#A7F3D0', icon: Timer },
                  { label: 'Conversão', value: heroData.conversionRate, max: 100, suffix: '%', color: '#99F6E4', icon: Target },
                ].map((metric) => {
                  const r = 26
                  const circ = 2 * Math.PI * r
                  const progress = circ - (Math.min(metric.value / metric.max, 1)) * circ
                  const Icon = metric.icon
                  return (
                    <div key={metric.label} className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <svg width="68" height="68" className="-rotate-90">
                          <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                          <circle
                            cx="34" cy="34" r={r} fill="none"
                            stroke={metric.color} strokeWidth="5" strokeLinecap="round"
                            strokeDasharray={circ} strokeDashoffset={progress}
                            style={{ filter: `drop-shadow(0 0 6px ${metric.color}80)`, transition: 'stroke-dashoffset 1s ease-out' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-white/80" />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">{metric.value}{metric.suffix}</span>
                      <span className="text-[10px] text-white/60">{metric.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Right: Quick stats panel */}
              <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm lg:min-w-[260px]">
                {[
                  { label: 'Ticket Médio', value: 'R$404K', change: '+12%', icon: DollarSign, iconColor: 'text-emerald-300', bg: 'bg-emerald-400/20' },
                  { label: 'Visitas Agendadas', value: '47', change: '+8', icon: CalendarDays, iconColor: 'text-cyan-300', bg: 'bg-cyan-400/20' },
                  { label: 'Leads Ativos', value: '186', change: '+23%', icon: Users, iconColor: 'text-teal-200', bg: 'bg-teal-400/20' },
                  { label: 'Taxa Ocupação', value: '91.3%', change: '+2.1%', icon: Home, iconColor: 'text-green-300', bg: 'bg-green-400/20' },
                ].map((stat) => {
                  const SIcon = stat.icon
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                          <SIcon className={`h-3.5 w-3.5 ${stat.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-xs text-white/60">{stat.label}</p>
                          <p className="text-sm font-bold text-white">{stat.value}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${stat.iconColor}`}>{stat.change}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ====== KPI CARDS ====== */}
      {(() => {
        const kpiCards = [
          { label: 'Imóveis Ativos', value: '47', sub: '+8.2% vs mês anterior', subIcon: TrendingUp, icon: Home, color: 'from-emerald-500 to-teal-600', bgLight: 'from-emerald-500/5', sparkData: kpiSparklines.listings, sparkColor: '#10B981' },
          { label: 'Vendidos (Mês)', value: '12', sub: 'R$4.85M em valor total', subIcon: null, icon: CheckCircle2, color: 'from-teal-500 to-cyan-600', bgLight: 'from-teal-500/5', sparkData: kpiSparklines.sold, sparkColor: '#14B8A6' },
          { label: 'Média Dias no Mercado', value: '23', sub: '-12.5% mais rápido', subIcon: TrendingDown, icon: Clock, color: 'from-cyan-500 to-blue-600', bgLight: 'from-cyan-500/5', sparkData: kpiSparklines.daysOnMarket, sparkColor: '#06B6D4' },
          { label: 'Comissão Recebida', value: 'R$126K', sub: '+22.8% vs mês anterior', subIcon: TrendingUp, icon: DollarSign, color: 'from-green-500 to-emerald-600', bgLight: 'from-green-500/5', sparkData: kpiSparklines.commission, sparkColor: '#22C55E' },
        ]

        const renderKpiCard = (kpi: typeof kpiCards[number], className?: string) => {
          const Icon = kpi.icon
          const SubIcon = kpi.subIcon
          return (
            <Card key={kpi.label} className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${className ?? ''}`}>
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${kpi.bgLight} via-transparent to-transparent`} />
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.color}`} />
              <Card.Content className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">{kpi.label}</p>
                    <p className="mt-1 text-3xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      {SubIcon && <SubIcon className="h-3 w-3" />}
                      {kpi.sub}
                    </div>
                  </div>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-3">
                  <SparklineChart data={kpi.sparkData} type="area" color={kpi.sparkColor} height={32} gradient animated />
                </div>
              </Card.Content>
            </Card>
          )
        }

        return (
          <>
            {/* Mobile: Carousel */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 py-1 sm:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-[150px] w-[70vw] max-w-[250px] shrink-0 snap-start rounded-xl" />
                  ))
                : kpiCards.map((kpi) => renderKpiCard(kpi, 'w-[70vw] max-w-[250px] shrink-0 snap-start'))
              }
            </div>
            {/* Desktop: Grid */}
            <div className="hidden sm:block">
              <DashboardGrid preset="4col" gap="lg">
                {isLoading
                  ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[150px] rounded-xl" />)
                  : kpiCards.map((kpi) => renderKpiCard(kpi))
                }
              </DashboardGrid>
            </div>
          </>
        )
      })()}

      {/* ====== PROPERTY MAP ====== */}
      <PropertyMapPremium isLoading={isLoading} />

      {/* ====== FEATURED LISTINGS ====== */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 dark:from-orange-950/20 dark:to-amber-950/20" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 shadow-sm shadow-orange-500/25">
                  <Star className="h-4 w-4 text-white" />
                </div>
                Imóveis em Destaque
              </Card.Title>
              <Card.Description className="mt-1">Seus melhores imóveis atualmente no mercado</Card.Description>
            </div>
            <Badge variant="warning" size="sm">{featuredListings.length} imóveis</Badge>
          </div>
        </Card.Header>
        <Card.Content className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  address={listing.address}
                  city={listing.city}
                  price={listing.price}
                  status={listing.status}
                  type={listing.type}
                  beds={listing.beds}
                  baths={listing.baths}
                  sqft={listing.sqft}
                  daysOnMarket={listing.daysOnMarket}
                  isFavorite={listing.isFavorite}
                  onViewClick={() => {}}
                  onEditClick={() => {}}
                  onFavoriteClick={() => {}}
                />
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* ====== ROW: SALES PIPELINE + PROPERTY TYPE DISTRIBUTION ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Pipeline */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 dark:from-indigo-950/20 dark:to-violet-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm shadow-indigo-500/25">
                <Target className="h-4 w-4 text-white" />
              </div>
              Pipeline de Vendas
            </Card.Title>
            <Card.Description className="mt-1">
              Valor total: <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">{formatCurrency(totalPipelineValue)}</span>
            </Card.Description>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {pipelineData.map((stage, index) => {
                  const StageIcon = stage.icon
                  const maxCount = pipelineData[0]?.count ?? 1
                  return (
                    <div key={index} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${stage.color}20, ${stage.color}40)` }}
                          >
                            <StageIcon className="h-4 w-4" style={{ color: stage.color }} />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-[var(--text-primary)]">{stage.stage}</span>
                            <span className="ml-2 text-xs text-[var(--text-muted)]">{formatCurrency(stage.value)}</span>
                          </div>
                        </div>
                        <span className="text-lg font-bold" style={{ color: stage.color }}>{stage.count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${(stage.count / maxCount) * 100}%`,
                            background: `linear-gradient(to right, ${stage.color}, ${stage.color}90)`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Property Type Distribution */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 dark:from-amber-950/20 dark:to-yellow-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 shadow-sm shadow-amber-500/25">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              Tipos de Imóveis
            </Card.Title>
            <Card.Description className="mt-1">Distribuição por categoria</Card.Description>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <div className="space-y-4">
                {propertyTypes.map((type) => {
                  const TypeIcon = type.icon
                  return (
                    <div key={type.type} className="group rounded-xl border border-[var(--border-default)] p-3.5 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${type.color}20, ${type.color}40)` }}
                          >
                            <TypeIcon className="h-4.5 w-4.5" style={{ color: type.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{type.type}</p>
                            <p className="text-xs text-[var(--text-muted)]">{type.count} imóveis</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold" style={{ color: type.color }}>{type.percentage}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${type.percentage}%`,
                            background: `linear-gradient(to right, ${type.color}, ${type.color}90)`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}

                {/* Total summary */}
                <div className="rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/15 dark:via-orange-900/10 dark:to-yellow-900/15 border border-amber-200/50 dark:border-amber-800/30 p-3 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm">
                        <BarChart3 className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Total</span>
                    </div>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                      {propertyTypes.reduce((s, p) => s + p.count, 0)} imóveis
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ROW: SALES TREND CHART + PRICE DISTRIBUTION ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Trend */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-emerald-500/5 dark:from-teal-950/20 dark:to-emerald-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-sm shadow-teal-500/25">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Tendência de Vendas
            </Card.Title>
            <Card.Description className="mt-1">Vendas e receita dos últimos 8 meses</Card.Description>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <ChartWrapper
                type="bar"
                data={salesTrendData}
                series={[
                  { dataKey: 'vendas', name: 'Vendas', color: '#14B89A' },
                  { dataKey: 'receita', name: 'Receita (K)', color: '#F59E0B' },
                ]}
                xAxisKey="month"
                height={280}
                showGrid
                showLegend
              />
            )}
          </Card.Content>
        </Card>

        {/* Price Distribution */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 dark:from-rose-950/20 dark:to-pink-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />
          <Card.Header className="relative">
            <Card.Title className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm shadow-rose-500/25">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              Distribuição de Preços
            </Card.Title>
            <Card.Description className="mt-1">Imóveis por faixa de preço</Card.Description>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {priceDistribution.map((range) => {
                  const maxCount = Math.max(...priceDistribution.map(r => r.count))
                  const percentage = (range.count / maxCount) * 100
                  return (
                    <div key={range.range} className="group rounded-xl border border-[var(--border-default)] p-3 transition-all duration-200 hover:shadow-sm hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text-secondary)]">{range.range}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: range.color }}>{range.count}</span>
                          <span className="text-xs text-[var(--text-muted)]">imóveis</span>
                        </div>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${percentage}%`,
                            background: `linear-gradient(to right, ${range.color}, ${range.color}90)`,
                          }}
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

      {/* ====== ROW: RECENT ACTIVITY + TOP AGENTS ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-950/20 dark:to-cyan-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-sm shadow-blue-500/25">
                    <CalendarDays className="h-4 w-4 text-white" />
                  </div>
                  Atividade Recente
                </Card.Title>
                <Card.Description className="mt-1">Últimas atualizações dos imóveis</Card.Description>
              </div>
              <Badge variant="info" size="sm">{recentActivity.length} eventos</Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Marquee scroll area */}
                <div className="relative overflow-hidden flex-1" style={{ minHeight: '240px' }}>
                  <div className="animate-marquee-vertical space-y-0">
                    {[...recentActivity, ...recentActivity].map((item, i) => {
                      const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
                        success: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800/40', icon: 'text-green-600 dark:text-green-400' },
                        info: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/40', icon: 'text-blue-600 dark:text-blue-400' },
                        warning: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/40', icon: 'text-amber-600 dark:text-amber-400' },
                        default: { bg: 'bg-gray-50 dark:bg-gray-900/20', border: 'border-gray-200 dark:border-gray-800/40', icon: 'text-gray-600 dark:text-gray-400' },
                      }
                      const style = typeStyles[item.type] ?? typeStyles.default!
                      return (
                        <div key={`${item.id}-${i}`} className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} p-3 mb-3`}>
                          <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                            {item.type === 'success' && <CheckCircle2 className={`h-4 w-4 ${style.icon}`} />}
                            {item.type === 'info' && <ArrowUpRight className={`h-4 w-4 ${style.icon}`} />}
                            {item.type === 'warning' && <Clock className={`h-4 w-4 ${style.icon}`} />}
                            {item.type === 'default' && <Eye className={`h-4 w-4 ${style.icon}`} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{item.description}</p>
                          </div>
                          <span className="shrink-0 text-[10px] text-[var(--text-muted)]">{item.timestamp}</span>
                        </div>
                      )
                    })}
                  </div>
                  {/* Fade overlays */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                  <style>{`
                    @keyframes marquee-vertical {
                      0% { transform: translateY(0); }
                      100% { transform: translateY(-50%); }
                    }
                    .animate-marquee-vertical {
                      animation: marquee-vertical 50s linear infinite;
                    }
                    .animate-marquee-vertical:hover {
                      animation-play-state: paused;
                    }
                  `}</style>
                </div>

                {/* Activity Summary */}
                <div className="mt-4 grid grid-cols-4 gap-2.5">
                  <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/15 dark:to-emerald-900/15 p-2.5 border border-green-200/50 dark:border-green-800/30 text-center">
                    <p className="text-[10px] font-medium text-green-600 dark:text-green-400">Vendas</p>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">8</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/15 dark:to-cyan-900/15 p-2.5 border border-blue-200/50 dark:border-blue-800/30 text-center">
                    <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Visitas</p>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">23</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/15 dark:to-yellow-900/15 p-2.5 border border-amber-200/50 dark:border-amber-800/30 text-center">
                    <p className="text-[10px] font-medium text-amber-600 dark:text-amber-400">Propostas</p>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">12</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/15 p-2.5 border border-violet-200/50 dark:border-violet-800/30 text-center">
                    <p className="text-[10px] font-medium text-violet-600 dark:text-violet-400">Leads</p>
                    <p className="text-sm font-bold text-violet-700 dark:text-violet-300">34</p>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Top Agents */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 dark:from-yellow-950/20 dark:to-amber-950/20" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
          <Card.Header className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shadow-sm shadow-yellow-500/25">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  Top Corretores
                </Card.Title>
                <Card.Description className="mt-1">Melhores performances do mês</Card.Description>
              </div>
              <Badge variant="warning" size="sm">{topAgents.length} corretores</Badge>
            </div>
          </Card.Header>
          <Card.Content className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Agent Detail Cards */}
                <div className="space-y-3">
                  {agentPerformance.map((agent, index) => (
                    <div
                      key={agent.name}
                      className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] p-3.5 transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                    >
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${agent.color} opacity-[0.03] transition-opacity group-hover:opacity-[0.06]`} />
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${agent.color}`} />
                      <div className="relative">
                        {/* Agent header row */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${agent.color} shadow-sm text-white text-sm font-bold`}>
                                {agent.initials}
                              </div>
                              {index === 0 && (
                                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-sm">
                                  <Crown className="h-2.5 w-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-[var(--text-primary)]">{agent.name}</p>
                                {index < 3 && (
                                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">#{index + 1}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--text-muted)]">{agent.speciality}</span>
                                <span className="text-[10px] text-[var(--text-muted)]">·</span>
                                <div className="flex items-center gap-0.5">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">{agent.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                              {topAgents[index]?.value ?? '—'}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)]">vendas totais</p>
                          </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                          <div className="rounded-lg bg-[var(--bg-subtle)] px-2 py-1.5 text-center">
                            <p className="text-[10px] text-[var(--text-muted)]">Vendidos</p>
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">{agent.sold}</p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-subtle)] px-2 py-1.5 text-center">
                            <p className="text-[10px] text-[var(--text-muted)]">Ativos</p>
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{agent.listings}</p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-subtle)] px-2 py-1.5 text-center">
                            <p className="text-[10px] text-[var(--text-muted)]">Dias Méd.</p>
                            <p className="text-sm font-bold text-[var(--text-primary)]">{agent.avgDays}d</p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-subtle)] px-2 py-1.5 text-center">
                            <p className="text-[10px] text-[var(--text-muted)]">Comissão</p>
                            <p className="text-sm font-bold text-violet-600 dark:text-violet-400">R${(agent.commission / 1000).toFixed(0)}K</p>
                          </div>
                        </div>

                        {/* Goal progress bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-medium text-[var(--text-muted)]">Meta mensal</span>
                              <span className={`text-xs font-bold ${agent.goalPercent >= 90 ? 'text-green-600 dark:text-green-400' : agent.goalPercent >= 75 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>
                                {agent.goalPercent}%
                              </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                              <div
                                className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${agent.goalPercent >= 90 ? 'from-green-500 to-emerald-500' : agent.goalPercent >= 75 ? 'from-amber-500 to-yellow-500' : 'from-red-500 to-orange-500'}`}
                                style={{ width: `${agent.goalPercent}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-24 shrink-0">
                            <SparklineChart data={agent.sparkline} type="line" color={index === 0 ? '#F59E0B' : index === 1 ? '#3B82F6' : index === 2 ? '#F43F5E' : index === 3 ? '#14B89A' : '#8B5CF6'} width={90} height={28} strokeWidth={1.5} animated />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Summary */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/15 dark:to-amber-900/15 p-2.5 border border-yellow-200/50 dark:border-yellow-800/30 text-center">
                    <p className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400">Média Vendas</p>
                    <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">R$1.2M</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/15 dark:to-emerald-900/15 p-2.5 border border-green-200/50 dark:border-green-800/30 text-center">
                    <p className="text-[10px] font-medium text-green-600 dark:text-green-400">Comissão Total</p>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">R$180K</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 p-2.5 border border-blue-200/50 dark:border-blue-800/30 text-center">
                    <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Meta Equipe</p>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">87%</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/15 dark:to-purple-900/15 p-2.5 border border-violet-200/50 dark:border-violet-800/30 text-center">
                    <p className="text-[10px] font-medium text-violet-600 dark:text-violet-400">Satisfação</p>
                    <p className="text-sm font-bold text-violet-700 dark:text-violet-300">4.7 <Star className="inline h-3 w-3 text-yellow-500 fill-yellow-500" /></p>
                  </div>
                </div>
              </>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* ====== ALL LISTINGS TABLE ====== */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-amber-950/20 dark:to-orange-950/20" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
        <Card.Header className="relative">
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm shadow-amber-500/25">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                Todos os Imóveis
              </Card.Title>
              <Card.Description className="mt-1">Inventário completo de propriedades</Card.Description>
            </div>
            <div className="flex items-center gap-2">
              {/* Summary Stats */}
              <div className="hidden items-center gap-3 sm:flex">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 border border-blue-200/50 dark:border-blue-800/30">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {allListings.filter(l => l.status === 'À Venda').length} à venda
                  </span>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 border border-amber-200/50 dark:border-amber-800/30">
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {allListings.filter(l => l.status === 'Em Contrato').length} em contrato
                  </span>
                </div>
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 px-2.5 py-1 border border-green-200/50 dark:border-green-800/30">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    {allListings.filter(l => l.status === 'Vendido').length} vendido
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
                Filtrar
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="relative">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Mobile: 2-column carousel */}
              <div className="sm:hidden">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {(() => {
                    const pages: (typeof allListings)[] = []
                    for (let i = 0; i < allListings.length; i += 2) {
                      pages.push(allListings.slice(i, i + 2))
                    }
                    return pages.map((page, pi) => (
                      <div key={pi} className="flex w-[85vw] max-w-[320px] shrink-0 snap-start flex-col gap-3">
                        {page.map((listing) => (
                          <div key={listing.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{listing.address}</p>
                                <p className="text-[11px] text-[var(--text-muted)]">{listing.city} · {listing.type}</p>
                              </div>
                              {getStatusBadge(listing.status)}
                            </div>
                            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                              {formatCurrency(listing.price)}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                              {listing.beds > 0 && (
                                <span className="flex items-center gap-1">
                                  <Bed className="h-3 w-3" /> {listing.beds}
                                </span>
                              )}
                              {listing.baths > 0 && (
                                <span className="flex items-center gap-1">
                                  <Bath className="h-3 w-3" /> {listing.baths}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Maximize className="h-3 w-3" /> {listing.sqft}m²
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {listing.daysListed}d
                              </span>
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)]">Corretor: {listing.agent}</p>
                          </div>
                        ))}
                      </div>
                    ))
                  })()}
                </div>
              </div>

              {/* Desktop: Data Table */}
              <div className="hidden sm:block -mx-5 -mb-1">
                <DataTable
                  data={allListings}
                  columns={listingsColumns}
                  sortable
                  filterable
                  filterPlaceholder="Buscar imóveis..."
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
