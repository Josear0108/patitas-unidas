/**
 * Estadísticas de la fundación
 */
export interface FoundationStats {
  animalsRescued: number;
  currentAnimals: number;
  yearsActive: number;
}

/**
 * Información de contacto
 */
export interface ContactInfo {
  phone?: string | null;
  email?: string | null;
  website?: string | null;
}

/**
 * Animal resumido para mostrar en la página de fundación
 */
export interface FoundationAnimal {
  id: string;
  name: string;
  imageUrl?: string | null;
  isUrgent: boolean;
}

/**
 * Resumen de una campaña activa (para mostrar en el perfil de fundación)
 */
export interface CampaignSummary {
  id: string;
  title: string;
  raisedAmount: number;
  goalAmount?: number | null;
  daysLeft?: number | null;
}

/**
 * Fundación completa con toda su información
 */
export interface Foundation {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  location: string;
  foundedYear?: number | null;
  description?: string | null;
  mission?: string | null;
  vision?: string | null;
  isVerified: boolean;
  stats?: FoundationStats;
  contact?: ContactInfo;
  achievements?: string[];
  animals?: FoundationAnimal[];
  activeCampaigns?: CampaignSummary[];
}
