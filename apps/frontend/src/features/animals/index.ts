/**
 * Animals Feature - Public API
 *
 * Export ONLY what other features need to use.
 * Internal components stay private.
 */

// Routes (Pages)
export { AnimalListPage } from './routes/AnimalListPage'
export { AnimalDetailPage } from './routes/AnimalDetailPage'

// Services
export { animalsService } from './api/animalsService'
export type { IAnimalsService, AnimalListParams } from './api/IAnimalsService'

// Types (display helpers — los tipos de datos vienen de @patitas/types)
export type { AnimalFilters } from './types/animal'
export { ANIMAL_TYPE_LABEL, ANIMAL_SIZE_LABEL, ANIMAL_GENDER_LABEL } from './types/animal'

// Hooks
export { useAnimals, useAnimal } from './hooks/useAnimals'
export { useAnimalListParams } from './hooks/useAnimalFilters'

// Public components (if needed by other features)
export { AnimalCard } from './components/AnimalCard'
