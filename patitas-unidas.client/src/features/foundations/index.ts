/**
 * Foundations Feature - Public API
 */

// Routes
export { FoundationListPage } from './routes/FoundationListPage';
export { FoundationDetailPage } from './routes/FoundationDetailPage';

// Services
export { foundationsService } from './api/foundationsService';

// Types
export type {
  Foundation,
  FoundationStats,
  ContactInfo,
  FoundationAnimal,
  Campaign,
} from './types/foundation';

// Public components
export { FoundationCard } from './components/FoundationCard';
