import type { Animal } from '../types/animal';

/**
 * Contrato del servicio de animales.
 * Los componentes dependen de esta interfaz, no de la implementación concreta,
 * lo que permite swapear la implementación (mock → API real) sin tocar los consumidores.
 */
export interface IAnimalsService {
  getAll(): Promise<Animal[]>;
  getById(id: string): Promise<Animal | undefined>;
  getByFoundation(foundationId: string): Promise<Animal[]>;
  getUrgent(): Promise<Animal[]>;
}
