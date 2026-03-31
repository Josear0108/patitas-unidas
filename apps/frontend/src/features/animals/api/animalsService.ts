import { AnimalDetailSchema, AnimalListResponseSchema } from '@patitas/types'
import { apiClient } from '../../../lib/api'
import { USE_REAL_API } from '../../../lib/env'
import { mockAnimals } from '@/data/mockAnimals'
import type { IAnimalsService, AnimalListParams } from './IAnimalsService'
import type { AnimalDetail, AnimalSummary, PaginatedResponse } from '@patitas/types'

// Respuesta mock envuelta en el mismo shape paginado que la API real.
// Así el código que consume el servicio no necesita saber si estamos en mock o real.
function mockPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    data: items,
    meta: { total: items.length, page: 1, limit: items.length, totalPages: 1 },
  }
}

export const animalsService: IAnimalsService = {
  async getAll(params?: AnimalListParams) {
    if (USE_REAL_API) {
      const res = await apiClient.get('/animals', { params })
      // parse() valida la respuesta contra el schema de Zod.
      // Si el backend cambia algo inesperadamente, obtenemos un error claro aquí.
      return AnimalListResponseSchema.parse(res.data)
    }

    // Filtrado mock equivalente a lo que haría la API
    let items = mockAnimals as unknown as AnimalSummary[]
    if (params?.type) items = items.filter((a) => a.type === params.type)
    if (params?.size) items = items.filter((a) => a.size === params.size)
    if (params?.is_urgent) items = items.filter((a) => a.isUrgent)
    if (params?.foundation_id) items = items.filter((a) => a.foundationId === params.foundation_id)
    if (params?.search) {
      const q = params.search.toLowerCase()
      items = items.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.location ?? '').toLowerCase().includes(q),
      )
    }
    return mockPaginated(items)
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await apiClient.get(`/animals/${id}`)
      return AnimalDetailSchema.parse(res.data)
    }
    const found = mockAnimals.find((a) => a.id === id)
    return found as AnimalDetail | undefined
  },
}
