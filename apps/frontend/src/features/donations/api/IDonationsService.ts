import type { Campaign } from '../types/donation';

/**
 * Contrato del servicio de campañas de donación.
 * Los componentes dependen de esta interfaz, no de la implementación concreta.
 */
export interface IDonationsService {
  getAll(): Promise<Campaign[]>;
  getById(id: string): Promise<Campaign | undefined>;
  getBySlug(slug: string): Promise<Campaign | undefined>;
  getByFoundation(foundationId: string): Promise<Campaign[]>;
  getUrgent(): Promise<Campaign[]>;
}
