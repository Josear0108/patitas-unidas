import { FoundationDetailSchema, FoundationListResponseSchema } from '@patitas/types'
import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockFoundations } from '@/data/mockFoundations'
import type { IFoundationsService, FoundationListParams } from './IFoundationsService'
import type { FoundationDetail, FoundationSummary, PaginatedResponse } from '@patitas/types'

function mockPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    data: items,
    meta: { total: items.length, page: 1, limit: items.length, totalPages: 1 },
  }
}

export const foundationsService: IFoundationsService = {
  async getAll(params?: FoundationListParams) {
    if (USE_REAL_API) {
      const res = await apiClient.get('/foundations', { params })
      return FoundationListResponseSchema.parse(res.data)
    }
    return mockPaginated(mockFoundations as unknown as FoundationSummary[])
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get(`/foundations/${id}`)
      return FoundationDetailSchema.parse(res.data)
    }
    return mockFoundations.find((f) => f.id === id) as FoundationDetail | undefined
  },
}
