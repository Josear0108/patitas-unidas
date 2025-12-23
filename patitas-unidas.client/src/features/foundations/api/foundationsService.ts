import type { Foundation } from '../types/foundation';
import { mockFoundations } from '@/data/mockFoundations';

/**
 * Servicio para operaciones relacionadas con fundaciones
 * TODO: Reemplazar con llamadas API reales
 */
export const foundationsService = {
  /**
   * Obtener todas las fundaciones
   */
  getAll: async (): Promise<Foundation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFoundations), 500);
    });
  },

  /**
   * Obtener fundación por ID
   */
  getById: async (id: number): Promise<Foundation | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundation = mockFoundations.find((f) => f.id === id);
        resolve(foundation);
      }, 500);
    });
  },

  /**
   * Buscar fundaciones verificadas
   */
  getVerified: async (): Promise<Foundation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const verified = mockFoundations.filter((f) => f.verified);
        resolve(verified);
      }, 500);
    });
  },
};
