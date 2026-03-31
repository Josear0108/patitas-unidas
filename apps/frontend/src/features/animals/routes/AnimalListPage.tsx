import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAnimals } from '../hooks/useAnimals'
import { AnimalFilters } from '../components/AnimalFilters'
import { AnimalGrid } from '../components/AnimalGrid'
import { useAnimalListParams } from '../hooks/useAnimalFilters'
import { PageWrapper } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { AnimalFilters as FiltersType } from '../types/animal'

export function AnimalListPage() {
  const [filters, setFilters] = useState<FiltersType>({
    type: 'all',
    size: 'all',
    urgentOnly: false,
    searchQuery: '',
  })

  // Convierte los filtros de UI en query params para la API
  const params = useAnimalListParams(filters)

  // data ahora es { data: AnimalSummary[], meta: { total, page, limit, totalPages } }
  const { data, isLoading, error } = useAnimals(params)

  const animals = data?.data ?? []
  const meta = data?.meta

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
          <Spinner className="h-8 w-8" />
          <p className="text-muted-foreground text-sm">Cargando animales...</p>
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-destructive font-medium">No pudimos cargar los animales</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reintentar
          </Button>
          <Button asChild variant="ghost">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </PageWrapper>
    )
  }

  const hasActiveFilters =
    filters.searchQuery || filters.type !== 'all' || filters.size !== 'all' || filters.urgentOnly

  return (
    <PageWrapper>
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-6 md:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            Animales Disponibles
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Encuentra a tu compañero ideal
          </p>
        </div>

        <div className="flex items-center justify-between mb-6 md:mb-8">
          <AnimalFilters filters={filters} onFilterChange={setFilters} />
          {meta && (
            <p className="text-sm text-muted-foreground">
              {meta.total} {meta.total === 1 ? 'animal' : 'animales'}
            </p>
          )}
        </div>

        <AnimalGrid
          animals={animals}
          emptyMessage={
            hasActiveFilters
              ? 'No se encontraron animales con estos filtros.'
              : 'No hay animales disponibles en este momento.'
          }
        />

        {/* Indicador de paginación — listo para implementar cuando se necesite */}
        {meta && meta.totalPages > 1 && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Página {meta.page} de {meta.totalPages}
          </p>
        )}
      </div>
    </PageWrapper>
  )
}
