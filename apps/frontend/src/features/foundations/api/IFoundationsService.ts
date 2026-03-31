import type { FoundationDetail, FoundationSummary, PaginatedResponse } from '@patitas/types'

export interface FoundationListParams {
  page?: number
  limit?: number
}

/**
 * Contrato del servicio de fundaciones.
 * Los componentes dependen de esta interfaz, no de la implementación concreta.
 */
export interface IFoundationsService {
  getAll(params?: FoundationListParams): Promise<PaginatedResponse<FoundationSummary>>
  getById(id: string): Promise<FoundationDetail | undefined>
}
