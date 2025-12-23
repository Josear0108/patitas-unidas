/**
 * Urgencia de la campaña
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
  days: number;
}

/**
 * Recompensa por donación
 */
export interface DonationReward {
  amount: number;
  title: string;
  description: string;
}

/**
 * Campaña de donación completa
 */
export interface Campaign {
  id: number;
  title: string;
  slug: string;
  foundationId: number;
  animalId?: number;
  coverImage: string;
  description: string;
  raised: number;
  goal: number;
  currency: Currency;
  donors: number;
  daysLeft: number;
  createdAt: string;
  urgency: CampaignUrgency;
  updates?: CampaignUpdate[];
  topDonors?: TopDonor[];
  rewards?: DonationReward[];
}
