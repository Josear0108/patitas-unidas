import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockCampaigns } from '@/data/mockDonations'
import type { IDonationsService } from './IDonationsService'
import type { Campaign } from '../types/donation'

export const donationsService: IDonationsService = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await apiClient.get<Campaign[]>('/campaigns')
      return res.data
    }
    return mockCampaigns
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Campaign>(`/campaigns/${id}`)
      return res.data
    }
    return mockCampaigns.find((c) => c.id === id)
  },

  async getBySlug(slug) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Campaign>(`/campaigns/slug/${slug}`)
      return res.data
    }
    return mockCampaigns.find((c) => c.slug === slug)
  },

  async getByFoundation(foundationId) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Campaign[]>('/campaigns', { params: { foundation_id: foundationId } })
      return res.data
    }
    return mockCampaigns.filter((c) => c.foundationId === foundationId)
  },

  async getUrgent() {
    if (USE_REAL_API) {
      const res = await apiClient.get<Campaign[]>('/campaigns', { params: { is_urgent: true } })
      return res.data
    }
    return mockCampaigns.filter((c) => c.isUrgent === true)
  },
}
