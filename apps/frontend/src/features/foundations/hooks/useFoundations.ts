import { useQuery } from '@tanstack/react-query'
import { foundationsService } from '../api/foundationsService'
import type { IFoundationsService } from '../api/IFoundationsService'

const service: IFoundationsService = foundationsService

export const foundationKeys = {
  all: ['foundations'] as const,
  detail: (id: string) => ['foundations', id] as const,
  verified: ['foundations', 'verified'] as const
}

export function useFoundations() {
  return useQuery({
    queryKey: foundationKeys.all,
    queryFn: () => service.getAll(),
  })
}

export function useFoundation(id: string) {
  return useQuery({
    queryKey: foundationKeys.detail(id),
    queryFn: () => service.getById(id),
    enabled: !!id,
  })
}

export function useVerifiedFoundations() {
  return useQuery({
    queryKey: foundationKeys.verified,
    queryFn: () => service.getVerified(),
  })
}
