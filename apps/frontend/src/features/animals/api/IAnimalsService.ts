import type { AnimalDetail, AnimalSummary, PaginatedResponse } from '@patitas/types'

export interface AnimalListParams {
  type?: 'DOG' | 'CAT' | 'OTHER'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  is_urgent?: boolean
  foundation_id?: string
  search?: string
  page?: number
  limit?: number
}

/**
 * Contrato del servicio de animales.
 * Los componentes dependen de esta interfaz, no de la implementación concreta,
 * lo que permite swapear la implementación (mock → API real) sin tocar los consumidores.
 */
export interface IAnimalsService {
  getAll(params?: AnimalListParams): Promise<PaginatedResponse<AnimalSummary>>
  getById(id: string): Promise<AnimalDetail | undefined>
}
