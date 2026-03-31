import { useQuery } from '@tanstack/react-query'
import { animalsService } from '../api/animalsService'
import type { AnimalListParams } from '../api/IAnimalsService'

export const animalKeys = {
  all: ['animals'] as const,
  list: (params?: AnimalListParams) => ['animals', 'list', params ?? {}] as const,
  detail: (id: string) => ['animals', id] as const,
}

/**
 * Obtiene la lista paginada de animales, opcionalmente filtrada.
 * Los filtros se envían como query params a la API (no se filtran en memoria).
 *
 * Ejemplo: useAnimals({ type: 'DOG', is_urgent: true })
 */
export function useAnimals(params?: AnimalListParams) {
  return useQuery({
    queryKey: animalKeys.list(params),
    queryFn: () => animalsService.getAll(params),
  })
}

export function useAnimal(id: string) {
  return useQuery({
    queryKey: animalKeys.detail(id),
    queryFn: () => animalsService.getById(id),
    enabled: !!id,
  })
}
