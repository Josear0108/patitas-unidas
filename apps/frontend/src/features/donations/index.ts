/**
 * Donations Feature - Public API
 */

// Routes
export { CampaignDetailPage } from './routes/CampaignDetailPage';
export { CampaignListPage } from './routes/CampaignListPage';

// Services
export { donationsService } from './api/donationsService';
export type { IDonationsService } from './api/IDonationsService';

// Types
export type {
  Campaign,
  CampaignUrgency,
  Currency,
  CampaignUpdate,
  TopDonor,
  DonationReward,
} from './types/donation';

// Public components
export { CampaignCard } from './components/CampaignCard';
export { CampaignProgress } from './components/CampaignProgress';
