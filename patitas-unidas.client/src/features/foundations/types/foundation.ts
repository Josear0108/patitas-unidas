/**
 * Estadísticas de la fundación
 */
export interface FoundationStats {
  animalsRescued: number;
  currentAnimals: number;
  adoptionsCompleted: number;
  volunteers: number;
  yearsActive: number;
}

/**
 * Contacto de redes sociales
 */
export interface Contact {
  socialMedia: string;
  url: string;
}

/**
 * Información de contacto
 */
export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  socialContacts?: Contact[];
}

/**
 * Animal resumido para mostrar en la página de fundación
 */
export interface FoundationAnimal {
  id: number;
  name: string;
  image: string;
  urgent: boolean;
}

/**
 * Campaña activa de donación
 */
export interface Campaign {
  id: number;
  name: string;
  raised: number;
  goal: number;
  daysLeft: number;
}

/**
 * Fundación completa con toda su información
 */
export interface Foundation {
  id: number;
  name: string;
  tagline?: string;
  logo: string;
  coverImage?: string;
  location: string;
  city?: string; // Para compatibilidad con código anterior
  email?: string; // Para compatibilidad con código anterior
  founded?: number;
  description?: string;
  mission?: string;
  vision?: string;
  stats?: FoundationStats;
  contact?: ContactInfo;
  achievements?: string[];
  verified: boolean;
  currentAnimals?: FoundationAnimal[];
  activeCampaigns?: Campaign[];
  // Propiedades simplificadas para la lista
  animalsRescued?: number;
  volunteers?: number;
}
