import type { FoundationRequest, FoundationRequestCreate } from '@patitas/types'

/**
 * Contrato del servicio de verificación de fundaciones.
 * Los componentes dependen de esta interfaz, no de la implementación concreta,
 * lo que permite swapear entre mock y API real sin tocar los consumidores.
 */
export interface IVerificationService {
  getMyRequest(): Promise<FoundationRequest | null>
  createRequest(data: FoundationRequestCreate): Promise<FoundationRequest>
  cancelRequest(): Promise<FoundationRequest>
}
