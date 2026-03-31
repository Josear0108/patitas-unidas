import { z } from 'zod'
import { PaginatedResponseSchema } from './pagination.schema.js'

// --- Inputs ---

export const CampaignQuerySchema = z.object({
  status: z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']).optional(),
  type: z.enum(['DONATION', 'ADOPTION', 'VOLUNTEERING', 'SPONSORSHIP']).optional(),
  is_urgent: z.coerce.boolean().optional(),
  foundation_id: z.string().uuid().optional(),
})

export const CampaignParamSchema = z.object({
  id: z.string().uuid(),
})

export const CampaignSlugParamSchema = z.object({
  slug: z.string().min(1).max(255),
})

export type CampaignQuery = z.infer<typeof CampaignQuerySchema>
export type CampaignParam = z.infer<typeof CampaignParamSchema>
export type CampaignSlugParam = z.infer<typeof CampaignSlugParamSchema>

// --- Responses ---

export const CampaignSummarySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  foundationId: z.string().uuid(),
  animalId: z.string().uuid().nullable(),
  imageUrl: z.string().nullable(),
  description: z.string().nullable(),
  type: z.enum(['DONATION', 'ADOPTION', 'VOLUNTEERING', 'SPONSORSHIP']),
  status: z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']),
  raisedAmount: z.number(),
  goalAmount: z.number().nullable(),
  currency: z.string(),
  donorCount: z.number(),
  daysLeft: z.number().nullable(),
  isUrgent: z.boolean(),
  createdAt: z.string(),
})

export const CampaignDetailSchema = CampaignSummarySchema.extend({
  updates: z.array(z.object({
    date: z.string(),
    message: z.string(),
  })),
  rewards: z.array(z.object({
    minimumAmount: z.number(),
    title: z.string(),
    description: z.string(),
  })),
  topDonors: z.array(z.object({
    name: z.string(),
    amount: z.number(),
    daysAgo: z.number(),
  })),
})

export const CampaignListResponseSchema = PaginatedResponseSchema(CampaignSummarySchema)

export type CampaignSummary = z.infer<typeof CampaignSummarySchema>
export type CampaignDetail = z.infer<typeof CampaignDetailSchema>
export type CampaignListResponse = z.infer<typeof CampaignListResponseSchema>
