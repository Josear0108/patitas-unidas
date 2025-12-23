/**
 * Tamaño del animal
 */
export type AnimalSize = 'Pequeño' | 'Mediano' | 'Grande';

/**
 * Tipo de animal
 */
export type AnimalType = 'Perro' | 'Gato';

/**
 * Género del animal
 */
export type AnimalGender = 'Macho' | 'Hembra';

/**
 * Estado de salud del animal
 */
export interface HealthStatus {
  vaccinated: boolean;
  sterilized: boolean;
  dewormed: boolean;
  microchipped: boolean;
  specialNeeds: string;
  lastCheckup: string;
}

/**
 * Información básica de la fundación del animal
 */
export interface AnimalFoundation {
  name: string;
  id: number;
  location: string;
  animalsRescued: number;
}

/**
 * Animal completo con toda su información
 */
export interface Animal {
  id: number;
  name: string;
  type: AnimalType;
  breed: string;
  age: string;
  size: AnimalSize;
  weight?: string;
  gender?: AnimalGender;
  location: string;
  image?: string; // Para lista
  images?: string[]; // Para detalle
  urgent: boolean;
  daysWaiting: number;
  story?: string;
  personality?: string[];
  health?: HealthStatus;
  requirements?: string[];
  foundationId: number;
  foundation?: AnimalFoundation;
  vaccinated?: boolean; // Mantenido para retrocompatibilidad con la lista
  sterilized?: boolean; // Mantenido para retrocompatibilidad con la lista
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
