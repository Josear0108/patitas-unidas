import { CampaignDetailSchema, CampaignListResponseSchema } from '@patitas/types'
import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockCampaigns } from '@/data/mockDonations'
import type { IDonationsService, CampaignListParams } from './IDonationsService'
import type { CampaignDetail, CampaignSummary, PaginatedResponse } from '@patitas/types'

function mockPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    data: items,
    meta: { total: items.length, page: 1, limit: items.length, totalPages: 1 },
  }
}

export const donationsService: IDonationsService = {
  async getAll(params?: CampaignListParams) {
    if (USE_REAL_API) {
      const res = await apiClient.get('/campaigns', { params })
      return CampaignListResponseSchema.parse(res.data)
    }

    let items = mockCampaigns as unknown as CampaignSummary[]
    if (params?.is_urgent) items = items.filter((c) => c.isUrgent)
    if (params?.foundation_id) items = items.filter((c) => c.foundationId === params.foundation_id)
    if (params?.status) items = items.filter((c) => c.status === params.status)
    return mockPaginated(items)
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get(`/campaigns/${id}`)
      return CampaignDetailSchema.parse(res.data)
    }
    return mockCampaigns.find((c) => c.id === id) as CampaignDetail | undefined
  },

  async getBySlug(slug) {
    if (USE_REAL_API) {
      const res = await apiClient.get(`/campaigns/slug/${slug}`)
      return CampaignDetailSchema.parse(res.data)
    }
    return mockCampaigns.find((c) => c.slug === slug) as CampaignDetail | undefined
  },
}
