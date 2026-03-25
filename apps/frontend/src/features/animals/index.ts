/**
 * Animals Feature - Public API
 *
 * Export ONLY what other features need to use.
 * Internal components stay private.
 */

// Routes (Pages)
export { AnimalListPage } from './routes/AnimalListPage';
export { AnimalDetailPage } from './routes/AnimalDetailPage';

// Services
export { animalsService } from './api/animalsService';
export type { IAnimalsService } from './api/IAnimalsService';

// Types
export type {
  Animal,
  AnimalType,
  AnimalSize,
  AnimalGender,
  AnimalFilters,
  AnimalFoundation,
} from './types/animal';

export {
  ANIMAL_TYPE_LABEL,
  ANIMAL_SIZE_LABEL,
  ANIMAL_GENDER_LABEL,
} from './types/animal';

// Hooks
export { useAnimalFilters } from './hooks/useAnimalFilters';

// Public components (if needed by other features)
export { AnimalCard } from './components/AnimalCard';
