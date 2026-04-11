import { useState } from 'react'
import { PageWrapper } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Clock,
  CheckCircle,
  LayoutList,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { AdminFoundationRequest } from '@patitas/types'
import { useAdminRequests, useAdminStats } from '../hooks/useAdmin'
import type { AdminRequestsParams } from '../api/IAdminService'
import { RequestCard } from '../components/RequestCard'

type StatusFilter = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'Todas' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'APPROVED', label: 'Aprobado' },
  { value: 'REJECTED', label: 'Rechazado' },
]

const ALL_CITIES_VALUE = '__all__'

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}

function countApprovedToday(requests: AdminFoundationRequest[]): number {
  const today = getTodayDateString()
  return requests.filter(
    (r) => r.status === 'APPROVED' && r.reviewed_at?.slice(0, 10) === today,
  ).length
}

function getUniqueCities(requests: AdminFoundationRequest[]): string[] {
  const set = new Set(requests.map((r) => r.city))
  return Array.from(set).sort()
}

interface KpiCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
}

function KpiCard({ icon, label, value }: KpiCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 flex items-start gap-3 shadow-sm">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  )
}

/**
 * Panel de administración — Bandeja de solicitudes de verificación de fundaciones.
 * Solo accesible para usuarios con rol SUPER_ADMIN (protegido en el router).
 */
export function AdminRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [cityFilter, setCityFilter] = useState<string>(ALL_CITIES_VALUE)
  const [page, setPage] = useState(1)

  const params: AdminRequestsParams = {
    ...(statusFilter !== 'ALL' ? { status: statusFilter } : {}),
    ...(cityFilter !== ALL_CITIES_VALUE ? { city: cityFilter } : {}),
    page,
    limit: 15,
  }

  const { data, isLoading, isFetching } = useAdminRequests(params)
  const { data: stats } = useAdminStats()

  const requests = data?.data ?? []
  const meta = data?.meta

  const uniqueCities = getUniqueCities(requests)

  function handleStatusChange(value: string) {
    setStatusFilter(value as StatusFilter)
    setPage(1)
    setCityFilter(ALL_CITIES_VALUE)
  }

  function handleCityChange(value: string) {
    setCityFilter(value)
    setPage(1)
  }

  return (
    <PageWrapper>
      <div className="container px-4 md:px-6 pb-16">
        {/* Header */}
        <div className="py-8 md:py-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-1">
            Panel de Control
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">Gestión de Solicitudes</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Revisa, aprueba o rechaza las solicitudes de verificación enviadas por las
            fundaciones que quieren unirse a Patitas Unidas.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <KpiCard
            icon={<Clock className="h-5 w-5" />}
            label="Pendientes"
            value={stats?.pending ?? '—'}
          />
          <KpiCard
            icon={<CheckCircle className="h-5 w-5" />}
            label="Aprobadas hoy"
            value={countApprovedToday(requests)}
          />
          <KpiCard
            icon={<LayoutList className="h-5 w-5" />}
            label="Total solicitudes"
            value={stats?.total ?? '—'}
          />
          <KpiCard
            icon={<MapPin className="h-5 w-5" />}
            label="Ciudades"
            value={stats?.uniqueCities ?? '—'}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Tabs
            value={statusFilter}
            onValueChange={handleStatusChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto">
              {STATUS_TABS.map(({ value, label }) => (
                <TabsTrigger key={value} value={value} className="flex-1 sm:flex-none">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="sm:ml-auto w-full sm:w-48">
            <Select value={cityFilter} onValueChange={handleCityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CITIES_VALUE}>Todas las ciudades</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count + fetching indicator */}
        <div className="flex items-center gap-2 mb-4">
          {meta && (
            <p className="text-sm text-muted-foreground">
              {meta.total} solicitud{meta.total !== 1 ? 'es' : ''} encontrada
              {meta.total !== 1 ? 's' : ''}
            </p>
          )}
          {isFetching && !isLoading && (
            <Badge variant="secondary" className="text-xs">
              Actualizando...
            </Badge>
          )}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-5 space-y-3">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                  <div className="hidden sm:flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-16 text-center">
            <LayoutList className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="font-medium text-muted-foreground">
              No hay solicitudes con estos filtros
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Prueba cambiando el estado o la ciudad seleccionada.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || isFetching}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {meta.page} de {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page >= meta.totalPages || isFetching}
              className="gap-1"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
