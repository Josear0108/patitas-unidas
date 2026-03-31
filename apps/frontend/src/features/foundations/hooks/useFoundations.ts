import { useQuery } from '@tanstack/react-query'
import { foundationsService } from '../api/foundationsService'

export const foundationKeys = {
  all: ['foundations'] as const,
  list: () => ['foundations', 'list'] as const,
  detail: (id: string) => ['foundations', id] as const,
}

export function useFoundations() {
  return useQuery({
    queryKey: foundationKeys.list(),
    queryFn: () => foundationsService.getAll(),
  })
}

export function useFoundation(id: string) {
  return useQuery({
    queryKey: foundationKeys.detail(id),
    queryFn: () => foundationsService.getById(id),
    enabled: !!id,
  })
}
