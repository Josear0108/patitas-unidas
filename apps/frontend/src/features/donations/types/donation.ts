/**
 * Urgencia de la campaña (calculada en el frontend)
 */
export type CampaignUrgency = 'low' | 'medium' | 'high';

/**
 * Moneda
 */
export type Currency = 'USD' | 'COP';

/**
 * Actualización de campaña
 */
export interface CampaignUpdate {
  date: string;
  message: string;
}

/**
 * Donante destacado
 */
export interface TopDonor {
  name: string;
  amount: number;
  daysAgo: number;
}

/**
 * Recompensa por donación
 */
export interface DonationReward {
  minimumAmount: number;
  title: string;
  description: string;
}

/**
 * Campaña de donación completa
 */
export interface Campaign {
  id: string;
  title: string;
  slug: string;
  foundationId: string;
  animalId?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  type?: string;
  status?: string;
  raisedAmount: number;
  goalAmount?: number | null;
  currency: Currency;
  donorCount: number;
  daysLeft?: number | null;
  isUrgent?: boolean;
  createdAt: string;
  updates?: CampaignUpdate[];
  topDonors?: TopDonor[];
  rewards?: DonationReward[];
}
