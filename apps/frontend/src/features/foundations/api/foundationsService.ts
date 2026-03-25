import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockFoundations } from '@/data/mockFoundations'
import type { IFoundationsService } from './IFoundationsService'
import type { Foundation } from '../types/foundation'

export const foundationsService: IFoundationsService = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await apiClient.get<Foundation[]>('/foundations')
      return res.data
    }
    return mockFoundations
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Foundation>(`/foundations/${id}`)
      return res.data
    }
    return mockFoundations.find((f) => f.id === id)
  },

  async getVerified() {
    const all = await foundationsService.getAll()
    return all.filter((f) => f.isVerified)
  },
}
