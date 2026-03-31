import { z } from 'zod'
import { PaginatedResponseSchema } from './pagination.schema.js'

// --- Inputs ---

export const FoundationParamSchema = z.object({
  id: z.string().uuid(),
})

export type FoundationParam = z.infer<typeof FoundationParamSchema>

// --- Responses ---

const FoundationStatsSchema = z.object({
  currentAnimals: z.number(),
  animalsRescued: z.number(),
  yearsActive: z.number(),
})

export const FoundationSummarySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  tagline: z.string().nullable(),
  logoUrl: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  location: z.string(),
  isVerified: z.boolean(),
  stats: FoundationStatsSchema,
  achievements: z.array(z.string()),
})

export const FoundationDetailSchema = FoundationSummarySchema.extend({
  description: z.string().nullable(),
  mission: z.string().nullable(),
  vision: z.string().nullable(),
  foundedYear: z.number().nullable(),
  contact: z.object({
    phone: z.string().nullable(),
    email: z.string().nullable(),
    website: z.string().nullable(),
  }),
  animals: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    imageUrl: z.string().nullable(),
    isUrgent: z.boolean(),
  })),
  activeCampaigns: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    raisedAmount: z.number(),
    goalAmount: z.number().nullable(),
    daysLeft: z.number().nullable(),
  })),
})

export const FoundationListResponseSchema = PaginatedResponseSchema(FoundationSummarySchema)

export type FoundationSummary = z.infer<typeof FoundationSummarySchema>
export type FoundationDetail = z.infer<typeof FoundationDetailSchema>
export type FoundationListResponse = z.infer<typeof FoundationListResponseSchema>
