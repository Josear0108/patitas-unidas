import { useMemo } from 'react'
import type { AnimalFilters } from '../types/animal'
import type { AnimalListParams } from '../api/IAnimalsService'

/**
 * Convierte el estado de filtros de la UI (AnimalFilters) en query params
 * para la API (AnimalListParams).
 *
 * Este hook ya no filtra un array en memoria. En cambio, produce el objeto
 * de params que useAnimals() pasa a la API como query string.
 * Ventaja: la base de datos filtra eficientemente con índices, no cargamos
 * todos los registros al frontend.
 */
export function useAnimalListParams(filters: AnimalFilters): AnimalListParams {
  return useMemo(() => {
    const params: AnimalListParams = {}
    if (filters.type !== 'all') params.type = filters.type
    if (filters.size !== 'all') params.size = filters.size
    if (filters.urgentOnly) params.is_urgent = true
    if (filters.searchQuery.trim() !== '') params.search = filters.searchQuery.trim()
    return params
  }, [filters.type, filters.size, filters.urgentOnly, filters.searchQuery])
}
