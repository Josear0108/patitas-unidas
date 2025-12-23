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

// Types
export type {
  Animal,
  AnimalType,
  AnimalSize,
  AnimalGender,
  AnimalFilters,
  HealthStatus,
  AnimalFoundation,
} from './types/animal';

// Public components (if needed by other features)
export { AnimalCard } from './components/AnimalCard';
