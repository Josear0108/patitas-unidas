import { z } from 'zod'
import { PaginatedResponseSchema } from './pagination.schema.js'

// --- Inputs ---

export const AnimalQuerySchema = z.object({
  type: z.enum(['DOG', 'CAT', 'OTHER']).optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  is_urgent: z.coerce.boolean().optional(),
  foundation_id: z.string().uuid().optional(),
  search: z.string().max(100).optional(),
})

export const AnimalParamSchema = z.object({
  id: z.string().uuid(),
})

export type AnimalQuery = z.infer<typeof AnimalQuerySchema>
export type AnimalParam = z.infer<typeof AnimalParamSchema>

// --- Responses ---

export const AnimalSummarySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(['DOG', 'CAT', 'OTHER']),
  breed: z.string().nullable(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).nullable(),
  gender: z.enum(['MALE', 'FEMALE']),
  ageText: z.string(),
  location: z.string().nullable(),
  imageUrl: z.string().nullable(),
  isUrgent: z.boolean(),
  daysWaiting: z.number(),
  foundationId: z.string().uuid(),
})

export const AnimalDetailSchema = AnimalSummarySchema.extend({
  birthDate: z.string().nullable(),
  imageUrls: z.array(z.string()),
  description: z.string().nullable(),
  isVaccinated: z.boolean(),
  isNeutered: z.boolean(),
  isDewormed: z.boolean(),
  hasMicrochip: z.boolean(),
  lastCheckupAt: z.string().nullable(),
  personality: z.array(z.string()),
  requirements: z.array(z.string()),
  foundation: z.object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    animalsRescued: z.number(),
  }),
})

export const AnimalListResponseSchema = PaginatedResponseSchema(AnimalSummarySchema)

export type AnimalSummary = z.infer<typeof AnimalSummarySchema>
export type AnimalDetail = z.infer<typeof AnimalDetailSchema>
export type AnimalListResponse = z.infer<typeof AnimalListResponseSchema>
