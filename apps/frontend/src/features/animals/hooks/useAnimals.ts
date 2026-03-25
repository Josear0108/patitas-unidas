import { useQuery } from '@tanstack/react-query'
import { animalsService } from '../api/animalsService'
import type { IAnimalsService } from '../api/IAnimalsService'

const service: IAnimalsService = animalsService

export const animalKeys = {
  all: ['animals'] as const,
  detail: (id: string) => ['animals', id] as const,
  byFoundation: (foundationId: string) => ['animals', 'foundation', foundationId] as const,
  urgent: ['animals', 'urgent'] as const,
}

export function useAnimals() {
  return useQuery({
    queryKey: animalKeys.all,
    queryFn: () => service.getAll(),
  })
}

export function useAnimal(id: string) {
  return useQuery({
    queryKey: animalKeys.detail(id),
    queryFn: () => service.getById(id),
    enabled: !!id,
  })
}

export function useAnimalsByFoundation(foundationId: string) {
  return useQuery({
    queryKey: animalKeys.byFoundation(foundationId),
    queryFn: () => service.getByFoundation(foundationId),
    enabled: !!foundationId,
  })
}

export function useUrgentAnimals() {
  return useQuery({
    queryKey: animalKeys.urgent,
    queryFn: () => service.getUrgent(),
  })
}
