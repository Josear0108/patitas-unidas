/**
 * Helpers de display para mostrar etiquetas legibles en español.
 * Los tipos AnimalSummary y AnimalDetail vienen de @patitas/types.
 */

export const ANIMAL_TYPE_LABEL: Record<'DOG' | 'CAT' | 'OTHER', string> = {
  DOG: 'Perro',
  CAT: 'Gato',
  OTHER: 'Otro',
}

export const ANIMAL_SIZE_LABEL: Record<'SMALL' | 'MEDIUM' | 'LARGE', string> = {
  SMALL: 'Pequeño',
  MEDIUM: 'Mediano',
  LARGE: 'Grande',
}

export const ANIMAL_GENDER_LABEL: Record<'MALE' | 'FEMALE', string> = {
  MALE: 'Macho',
  FEMALE: 'Hembra',
}

/**
 * Estado de los filtros de la UI (local, no viaja a la API directamente).
 * useAnimalFilters los convierte a AnimalListParams antes de llamar al servicio.
 */
export interface AnimalFilters {
  type: 'DOG' | 'CAT' | 'OTHER' | 'all'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'all'
  urgentOnly: boolean
  searchQuery: string
}
