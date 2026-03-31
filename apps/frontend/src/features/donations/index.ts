/**
 * Donations Feature - Public API
 */

// Routes
export { CampaignDetailPage } from './routes/CampaignDetailPage'
export { CampaignListPage } from './routes/CampaignListPage'

// Services
export { donationsService } from './api/donationsService'
export type { IDonationsService, CampaignListParams } from './api/IDonationsService'

// Hooks
export { useDonations, useDonation, useDonationBySlug } from './hooks/useDonations'

// Public components
export { CampaignCard } from './components/CampaignCard'
export { CampaignProgress } from './components/CampaignProgress'
