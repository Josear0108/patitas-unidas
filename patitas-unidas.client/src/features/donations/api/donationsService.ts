import type { Campaign } from '../types/donation';
import { mockCampaigns } from '@/data/mockDonations';

/**
 * Servicio para operaciones relacionadas con campañas de donación
 * TODO: Reemplazar con llamadas API reales
 */
export const donationsService = {
  /**
   * Obtener todas las campañas
   */
  getAll: async (): Promise<Campaign[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampaigns), 500);
    });
  },

  /**
   * Obtener campaña por ID
   */
  getById: async (id: number): Promise<Campaign | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campaign = mockCampaigns.find((c) => c.id === id);
        resolve(campaign);
      }, 500);
    });
  },

  /**
   * Obtener campaña por slug
   */
  getBySlug: async (slug: string): Promise<Campaign | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campaign = mockCampaigns.find((c) => c.slug === slug);
        resolve(campaign);
      }, 500);
    });
  },

  /**
   * Buscar campañas por fundación
   */
  getByFoundation: async (foundationId: number): Promise<Campaign[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campaigns = mockCampaigns.filter((c) => c.foundationId === foundationId);
        resolve(campaigns);
      }, 500);
    });
  },

  /**
   * Buscar campañas urgentes
   */
  getUrgent: async (): Promise<Campaign[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const urgentCampaigns = mockCampaigns.filter((c) => c.urgency === 'high');
        resolve(urgentCampaigns);
      }, 500);
    });
  },
};
