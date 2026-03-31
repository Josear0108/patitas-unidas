/**
 * Foundations Feature - Public API
 */

// Routes
export { FoundationListPage } from './routes/FoundationListPage'
export { FoundationDetailPage } from './routes/FoundationDetailPage'

// Services
export { foundationsService } from './api/foundationsService'
export type { IFoundationsService, FoundationListParams } from './api/IFoundationsService'

// Hooks
export { useFoundations, useFoundation } from './hooks/useFoundations'

// Public components
export { FoundationCard } from './components/FoundationCard'
