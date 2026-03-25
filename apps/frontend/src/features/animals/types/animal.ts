/**
 * Tipo de animal
 */
export type AnimalType = 'DOG' | 'CAT' | 'OTHER';

/**
 * Tamaño del animal
 */
export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE';

/**
 * Género del animal
 */
export type AnimalGender = 'MALE' | 'FEMALE';

/**
 * Helpers de display para mostrar etiquetas legibles en español
 */
export const ANIMAL_TYPE_LABEL: Record<AnimalType, string> = {
  DOG: 'Perro',
  CAT: 'Gato',
  OTHER: 'Otro',
};

export const ANIMAL_SIZE_LABEL: Record<AnimalSize, string> = {
  SMALL: 'Pequeño',
  MEDIUM: 'Mediano',
  LARGE: 'Grande',
};

export const ANIMAL_GENDER_LABEL: Record<AnimalGender, string> = {
  MALE: 'Macho',
  FEMALE: 'Hembra',
};

/**
 * Información básica de la fundación del animal
 */
export interface AnimalFoundation {
  id: string;
  name: string;
  location: string;
  animalsRescued: number;
}

/**
 * Animal completo con toda su información
 */
export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  breed?: string | null;
  size?: AnimalSize | null;
  gender?: AnimalGender | null;
  ageText: string;
  location?: string | null;
  imageUrl?: string | null;
  imageUrls?: string[];
  isUrgent: boolean;
  daysWaiting: number;
  description?: string | null;
  isVaccinated?: boolean;
  isNeutered?: boolean;
  isDewormed?: boolean;
  hasMicrochip?: boolean;
  lastCheckupAt?: string | null;
  personality?: string[];
  requirements?: string[];
  foundationId: string;
  foundation?: AnimalFoundation;
}

/**
 * Filtros de búsqueda de animales
 */
export interface AnimalFilters {
  type: AnimalType | 'all';
  size: AnimalSize | 'all';
  urgentOnly: boolean;
  searchQuery: string;
}
