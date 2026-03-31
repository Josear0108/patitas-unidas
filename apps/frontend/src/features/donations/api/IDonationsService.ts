import type { CampaignDetail, CampaignSummary, PaginatedResponse } from '@patitas/types'

export interface CampaignListParams {
  status?: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  type?: 'DONATION' | 'ADOPTION' | 'VOLUNTEERING' | 'SPONSORSHIP'
  is_urgent?: boolean
  foundation_id?: string
  page?: number
  limit?: number
}

/**
 * Contrato del servicio de campañas de donación.
 * Los componentes dependen de esta interfaz, no de la implementación concreta.
 */
export interface IDonationsService {
  getAll(params?: CampaignListParams): Promise<PaginatedResponse<CampaignSummary>>
  getById(id: string): Promise<CampaignDetail | undefined>
  getBySlug(slug: string): Promise<CampaignDetail | undefined>
}
