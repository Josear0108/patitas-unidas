/**
 * Foundations Feature - Public API
 */

// Routes
export { FoundationListPage } from './routes/FoundationListPage';
export { FoundationDetailPage } from './routes/FoundationDetailPage';

// Services
export { foundationsService } from './api/foundationsService';
export type { IFoundationsService } from './api/IFoundationsService';

// Types
export type {
  Foundation,
  FoundationStats,
  ContactInfo,
  FoundationAnimal,
  CampaignSummary,
} from './types/foundation';

// Public components
export { FoundationCard } from './components/FoundationCard';
