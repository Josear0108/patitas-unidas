import { useQuery } from '@tanstack/react-query'
import { donationsService } from '../api/donationsService'
import type { IDonationsService } from '../api/IDonationsService'

const service: IDonationsService = donationsService

export const donationKeys = {
  all: ['donations'] as const,
  detail: (id: string) => ['donations', id] as const,
  bySlug: (slug: string) => ['donations', 'slug', slug] as const,
  byFoundation: (foundationId: string) => ['donations', 'foundation', foundationId] as const,
  urgent: ['donations', 'urgent'] as const,
}

export function useDonations() {
  return useQuery({
    queryKey: donationKeys.all,
    queryFn: () => service.getAll(),
  })
}

export function useDonation(id: string) {
  return useQuery({
    queryKey: donationKeys.detail(id),
    queryFn: () => service.getById(id),
    enabled: !!id,
  })
}

export function useDonationBySlug(slug: string) {
  return useQuery({
    queryKey: donationKeys.bySlug(slug),
    queryFn: () => service.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useDonationsByFoundation(foundationId: string) {
  return useQuery({
    queryKey: donationKeys.byFoundation(foundationId),
    queryFn: () => service.getByFoundation(foundationId),
    enabled: !!foundationId,
  })
}

export function useUrgentDonations() {
  return useQuery({
    queryKey: donationKeys.urgent,
    queryFn: () => service.getUrgent(),
  })
}
