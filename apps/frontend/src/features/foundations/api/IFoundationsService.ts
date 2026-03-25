import type { Foundation } from '../types/foundation';

/**
 * Contrato del servicio de fundaciones.
 * Los componentes dependen de esta interfaz, no de la implementación concreta.
 */
export interface IFoundationsService {
  getAll(): Promise<Foundation[]>;
  getById(id: string): Promise<Foundation | undefined>;
  getVerified(): Promise<Foundation[]>;
}
