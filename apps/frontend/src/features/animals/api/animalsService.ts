import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockAnimals } from '@/data/mockAnimals'
import type { IAnimalsService } from './IAnimalsService'
import type { Animal } from '../types/animal'

export const animalsService: IAnimalsService = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await apiClient.get<Animal[]>('/animals')
      return res.data
    }
    return mockAnimals
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Animal>(`/animals/${id}`)
      return res.data
    }
    return mockAnimals.find((a) => a.id === id)
  },

  async getByFoundation(foundationId) {
    if (USE_REAL_API) {
      const res = await apiClient.get<Animal[]>('/animals', { params: { foundation_id: foundationId } })
      return res.data
    }
    return mockAnimals.filter((a) => a.foundationId === foundationId)
  },

  async getUrgent() {
    if (USE_REAL_API) {
      const res = await apiClient.get<Animal[]>('/animals', { params: { is_urgent: true } })
      return res.data
    }
    return mockAnimals.filter((a) => a.isUrgent)
  },
}
