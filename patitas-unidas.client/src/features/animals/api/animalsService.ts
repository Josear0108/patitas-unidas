import type { Animal } from '../types/animal';
import { mockAnimals } from '@/data/mockAnimals';

/**
 * Servicio para operaciones relacionadas con animales
 * TODO: Reemplazar con llamadas API reales
 */
export const animalsService = {
  /**
   * Obtener todos los animales
   */
  getAll: async (): Promise<Animal[]> => {
    // Simulando latencia de red
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAnimals), 500);
    });
  },

  /**
   * Obtener animal por ID
   */
  getById: async (id: number): Promise<Animal | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const animal = mockAnimals.find((a) => a.id === id);
        resolve(animal);
      }, 500);
    });
  },

  /**
   * Buscar animales por fundación
   */
  getByFoundation: async (foundationId: number): Promise<Animal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const animals = mockAnimals.filter((a) => a.foundationId === foundationId);
        resolve(animals);
      }, 500);
    });
  },

  /**
   * Buscar animales urgentes
   */
  getUrgent: async (): Promise<Animal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const urgentAnimals = mockAnimals.filter((a) => a.urgent);
        resolve(urgentAnimals);
      }, 500);
    });
  },
};
