import { useQuery } from '@tanstack/react-query'
import { donationsService } from '../api/donationsService'
import type { CampaignListParams } from '../api/IDonationsService'

export const donationKeys = {
  all: ['donations'] as const,
  list: (params?: CampaignListParams) => ['donations', 'list', params ?? {}] as const,
  detail: (id: string) => ['donations', id] as const,
  bySlug: (slug: string) => ['donations', 'slug', slug] as const,
}

export function useDonations(params?: CampaignListParams) {
  return useQuery({
    queryKey: donationKeys.list(params),
    queryFn: () => donationsService.getAll(params),
  })
}

export function useDonation(id: string) {
  return useQuery({
    queryKey: donationKeys.detail(id),
    queryFn: () => donationsService.getById(id),
    enabled: !!id,
  })
}

export function useDonationBySlug(slug: string) {
  return useQuery({
    queryKey: donationKeys.bySlug(slug),
    queryFn: () => donationsService.getBySlug(slug),
    enabled: !!slug,
  })
}
